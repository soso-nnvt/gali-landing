"use client";
import { useEffect, useState } from "react";
import { Illustration } from "@/components/Duotone";
import SuccessScreen from "./SuccessScreen";

type PlanKind = "FREE" | "PRO" | "PIONEER";
type Category = { id: string; name: string; slug: string };

export default function SellerRegistration({
  plan = "FREE",
  interval = "semester",
  billing = "SUBSCRIPTION",
  onCancel,
}: {
  plan?: PlanKind;
  interval?: "monthly" | "semester";
  billing?: "SUBSCRIPTION" | "ONE_TIME";
  onCancel?: () => void;
}) {
  const [campuses, setCampuses] = useState<{ id: string; name: string; abbreviation: string }[]>([]);
  const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: "",
    mainCampus: "", storeName: "", storeDescription: "", storeCategory: "",
    phoneNumber: "", bankCode: "", accountNumber: "", accountName: "",
  });
  const [resolved, setResolved] = useState<{ name: string; status: "ok" | "err" } | null>(null);
  const [resolving, setResolving] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  const [payBusy, setPayBusy] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [done, setDone] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/gali/campuses").then((r) => r.json()).then((j) => setCampuses(j.campuses || [])).catch(() => {});
    fetch("/api/gali/paystack/banks").then((r) => r.json()).then((j) => setBanks(j.banks || j.data || [])).catch(() => {});
    fetch("/api/gali/vendor/categories").then((r) => r.json()).then((j) => {
      if (j.success && Array.isArray(j.categories)) {
        setCategories(j.categories);
        setForm((f) => ({ ...f, storeCategory: f.storeCategory || (j.categories[0]?.id || "") }));
      }
    }).catch(() => {});
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid =
    form.firstName && form.lastName && form.email && form.password.length >= 6 &&
    form.password === form.confirm && form.mainCampus && form.storeName &&
    form.phoneNumber && form.bankCode && /^\d{10}$/.test(form.accountNumber) && resolved?.status === "ok";

  useEffect(() => {
    if (form.bankCode && /^\d{10}$/.test(form.accountNumber)) {
      const t = setTimeout(async () => {
        setResolving(true); setResolved(null);
        try {
          const r = await fetch("/api/gali/paystack/resolve-account", {
            method: "POST", headers: { "content-type": "application/json" },
            body: JSON.stringify({ accountNumber: form.accountNumber, bankCode: form.bankCode }),
          });
          const d = await r.json();
          if (d.success && d.accountName) { setResolved({ name: d.accountName, status: "ok" }); set("accountName", d.accountName); }
          else setResolved({ name: "", status: "err" });
        } catch { setResolved({ name: "", status: "err" }); }
        finally { setResolving(false); }
      }, 500);
      return () => clearTimeout(t);
    }
    setResolved(null);
  }, [form.bankCode, form.accountNumber]);

  async function confirmPlan(reference: string, kind: "PRO" | "CUSTOM", token: string) {
    const r = await fetch("/api/gali/billing/verify", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ reference, plan: kind, billing, interval }),
    });
    const d = await r.json();
    if (!r.ok || !d.success) throw new Error(d.error || "Could not confirm your plan.");
    return d;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) { setStatus("err"); setMsg("Please complete every required field and resolve your bank account."); return; }
    setStatus("loading"); setMsg("");
    try {
      const reg = await fetch("/api/gali/auth/session", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "register", email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName, mainCampus: form.mainCampus }),
      });
      const regJson = await reg.json();
      if (!reg.ok || !regJson.success) throw new Error(regJson.error || "Could not create your account.");
      const token = regJson.token;
      const bankName = banks.find((b) => b.code === form.bankCode)?.name || "";
      const up = await fetch("/api/gali/vendor/upgrade", {
        method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({
          storeName: form.storeName, storeDescription: form.storeDescription,
          storeCategoryIds: form.storeCategory ? [form.storeCategory] : [],
          phoneNumber: form.phoneNumber, accountNumber: form.accountNumber, accountName: form.accountName, bankName, bankCode: form.bankCode,
        }),
      });
      const upJson = await up.json().catch(() => ({}));
      if (!up.ok || !upJson.success) throw new Error(upJson.error || "Could not set up your store.");

      if (plan === "PRO") {
        setPayBusy(true);
        const r = await fetch("/api/gali/billing/subscribe", {
          method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
          body: JSON.stringify({ plan: "PRO", billing, interval }),
        });
        const d = await r.json();
        if (!d.success) throw new Error(d.error || "Could not start checkout.");
        if (d.dev) { setDone({ title: "Welcome to Gali Pro!", message: "Your Pro plan is active. Open the app to start selling." }); return; }
        if (d.accessCode) {
          try {
            const PaystackPop = (await import("@paystack/inline-js")).default;
            const pop = new PaystackPop();
            pop.resumeTransaction(d.accessCode, {
              onSuccess: async () => {
                try { setVerifying(true); await confirmPlan(d.reference, "PRO", token); setDone({ title: "Welcome to Gali Pro!", message: "Payment successful - your Pro plan is active." }); }
                catch (err: any) { setVerifying(false); setStatus("err"); setMsg(err.message || "Payment received but activation is still confirming. It will finish shortly - check the app."); }
              },
              onCancel: () => { setPayBusy(false); setStatus("err"); setMsg("Payment canceled. Your account is created - upgrade anytime in the app."); },
              onError: async () => {
                try { setVerifying(true); await confirmPlan(d.reference, "PRO", token); setDone({ title: "Welcome to Gali Pro!", message: "Your Pro plan is active." }); }
                catch (err: any) { setVerifying(false); setStatus("err"); setMsg(err.message || "Payment received but activation is still confirming. It will finish shortly - check the app."); }
              },
            });
            return;
          } catch { if (d.authorizationUrl) { window.location.href = d.authorizationUrl; return; } }
        }
        if (d.authorizationUrl) { window.location.href = d.authorizationUrl; return; }
        setDone({ title: "Welcome to Gali Pro!", message: "Your Pro plan is active." });
        return;
      }

      if (plan === "PIONEER") {
        const r = await fetch("/api/gali/custom-plans/code/551079/purchase", {
          method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        });
        const d = await r.json();
        if (!d.success) throw new Error(d.error || "Could not claim the plan.");
        if (d.dev || d.activated) { setDone({ title: "Pioneer Plan activated!", message: "Your free Pioneer Vendor Plan is live for 30 days. Open the app to start selling." }); return; }
        if (d.accessCode) {
          try {
            const PaystackPop = (await import("@paystack/inline-js")).default;
            const pop = new PaystackPop();
            pop.resumeTransaction(d.accessCode, {
              onSuccess: async () => {
                try { setVerifying(true); await confirmPlan(d.reference, "CUSTOM", token); setDone({ title: "Plan activated!", message: "Your plan is live. Open the app to start selling." }); }
                catch (err: any) { setVerifying(false); setStatus("err"); setMsg(err.message || "Payment received but activation is still confirming. It will finish shortly - check the app."); }
              },
              onCancel: () => { setPayBusy(false); setStatus("err"); setMsg("Payment canceled."); },
              onError: async () => {
                try { setVerifying(true); await confirmPlan(d.reference, "CUSTOM", token); setDone({ title: "Plan activated!", message: "Your plan is live. Open the app to start selling." }); }
                catch (err: any) { setVerifying(false); setStatus("err"); setMsg(err.message || "Payment received but activation is still confirming. It will finish shortly - check the app."); }
              },
            });
            return;
          } catch { if (d.authorizationUrl) { window.location.href = d.authorizationUrl; return; } }
        }
        if (d.authorizationUrl) { window.location.href = d.authorizationUrl; return; }
        setDone({ title: "Plan activated!", message: "Your plan is live. Open the app to start selling." });
        return;
      }

      setDone({ title: "You're in!", message: "Your seller account is live. Open the app to list your first item." });
    } catch (err: any) {
      setStatus("err"); setMsg(err.message || "Something went wrong.");
    } finally { setPayBusy(false); }
  }

  if (done) return <SuccessScreen title={done.title} message={done.message} />;
  if (verifying) {
    return (
      <div className="text-center py-10">
        <span className="mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-acid text-ink mb-4">
          <Illustration name="spark" className="w-7 h-7" />
        </span>
        <h3 className="display text-2xl">Activating your plan...</h3>
        <p className="mt-2 text-ink-faint max-w-md mx-auto">We are confirming your payment with the bank. This takes a few seconds.</p>
      </div>
    );
  }

  const submitLabel =
    plan === "PRO" ? (payBusy ? "Opening Paystack..." : "Continue to payment")
    : plan === "PIONEER" ? "Claim free plan"
    : "Create seller account";

  return (
    <div className="card p-6 md:p-8 w-full">
      {onCancel && (
        <div className="flex justify-end -mt-2 -mr-2 mb-1">
          <button onClick={onCancel} className="text-ink-faint hover:text-ink text-sm" aria-label="Close">x</button>
        </div>
      )}
      <div className="mb-5">
        <span className="eyebrow">Become a seller</span>
        <h2 className="display text-2xl mt-2">{plan === "PIONEER" ? "Claim your Pioneer Plan" : plan === "PRO" ? "Upgrade to Gali Pro" : "Open your store"}</h2>
        <p className="text-ink-faint text-sm mt-1">Verified payout details keep your earnings safe.</p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="First name" value={form.firstName} onChange={(v) => set("firstName", v)} />
          <Field label="Last name" value={form.lastName} onChange={(v) => set("lastName", v)} />
        </div>
        <Field label="School email" type="email" value={form.email} onChange={(v) => set("email", v)} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Password" type="password" value={form.password} onChange={(v) => set("password", v)} />
          <Field label="Confirm password" type="password" value={form.confirm} onChange={(v) => set("confirm", v)} />
        </div>
        <Select label="Your campus" value={form.mainCampus} onChange={(v) => set("mainCampus", v)} options={campuses.map((c) => ({ value: c.abbreviation, label: `${c.name} (${c.abbreviation})` }))} placeholder="Select campus" />
        <div className="pt-2 border-t border-line space-y-4">
          <p className="eyebrow">Store details</p>
          <Field label="Store name" value={form.storeName} onChange={(v) => set("storeName", v)} />
          <Field label="Store description" value={form.storeDescription} onChange={(v) => set("storeDescription", v)} />
          <Select label="Store category" value={form.storeCategory} onChange={(v) => set("storeCategory", v)} options={categories.map((c) => ({ value: c.id, label: c.name }))} placeholder={categories.length ? "Select category" : "Loading categories..."} />
          <Field label="Phone number" value={form.phoneNumber} onChange={(v) => set("phoneNumber", v)} />
          <p className="eyebrow">Payout account</p>
          <Select label="Bank" value={form.bankCode} onChange={(v) => set("bankCode", v)} options={banks.map((b) => ({ value: b.code, label: b.name }))} placeholder="Select bank" />
          <Field label="Account number" value={form.accountNumber} onChange={(v) => set("accountNumber", v.replace(/\D/g, "").slice(0, 10))} />
          {resolving && <p className="text-xs text-ink-faint">Resolving account...</p>}
          {resolved?.status === "ok" && (
            <div className="flex items-center gap-2 text-sm text-[#0c8a3e] bg-acid/10 border border-acid/40 rounded-xl px-3 py-2">
              <Illustration name="check" className="w-4 h-4" />
              <span>Verified: <strong>{resolved.name}</strong></span>
            </div>
          )}
          {resolved?.status === "err" && <p className="text-xs text-rose-600">Could not verify this account. Check the number and bank.</p>}
        </div>
        {status === "err" && <p className="text-sm text-rose-600">{msg}</p>}
        <button type="submit" disabled={status === "loading" || payBusy} className="btn btn-lime w-full justify-center disabled:opacity-60">
          {status === "loading" ? "Creating..." : submitLabel}
        </button>
        <p className="text-xs text-ink-faint text-center">By signing up you agree to trade safely on campus.</p>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-faint">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-ink/20 bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink" />
    </label>
  );
}

function Select({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-faint">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-ink/20 bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink">
        <option value="">{placeholder || "Select"}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
