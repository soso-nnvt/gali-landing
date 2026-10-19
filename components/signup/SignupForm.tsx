"use client";
import { useEffect, useState } from "react";
import SellerRegistration from "@/components/seller/SellerRegistration";

export default function SignupForm({ defaultRole = "buyer" }: { defaultRole?: "buyer" | "vendor" }) {
  const [role, setRole] = useState<"buyer" | "vendor">(defaultRole);

  return (
    <div className="card p-6 md:p-8 max-w-xl mx-auto">
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-canvas mb-6">
        {(["buyer", "vendor"] as const).map((r) => (
          <button key={r} type="button" onClick={() => setRole(r)}
            className={`py-2.5 rounded-lg text-sm font-semibold transition ${role === r ? "bg-ink text-white" : "text-ink-faint"}`}>
            {r === "buyer" ? "I want to buy" : "I want to sell"}
          </button>
        ))}
      </div>
      {role === "vendor" ? (
        <SellerRegistration plan="FREE" onCancel={() => setRole("buyer")} />
      ) : (
        <BuyerForm />
      )}
    </div>
  );
}

function BuyerForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "", mainCampus: "" });
  const [campuses, setCampuses] = useState<{ id: string; name: string; abbreviation: string }[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/gali/campuses").then((r) => r.json()).then((j) => setCampuses(j.campuses || [])).catch(() => {});
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.firstName && form.lastName && form.email && form.password.length >= 6 && form.password === form.confirm && form.mainCampus;
  const finish = (m: string) => {
    (window as any).gtag?.("event", "sign_up", { method: "email" });
    setMsg(m);
    setStatus("ok");
    setTimeout(() => { window.location.assign("https://app.gali.com.ng"); }, 1200);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) { setStatus("err"); setMsg("Please fill every required field and match the passwords."); return; }
    setStatus("loading"); setMsg("");
    try {
      const reg = await fetch("/api/gali/auth/session", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "register", email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName, mainCampus: form.mainCampus }),
      });
      const regJson = await reg.json();
      if (!reg.ok || !regJson.success) throw new Error(regJson.error || "Could not create your account.");
      finish("Account ready. Opening the app...");
    } catch (err: any) {
      setStatus("err"); setMsg(err.message || "Something went wrong. Try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="text-center py-8">
        <p className="font-medium">{msg}</p>
        <a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="btn btn-lime mt-6">Continue to the app</a>
      </div>
    );
  }

  return (
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
      {status === "err" && <p className="text-sm text-rose-600">{msg}</p>}
      <button type="submit" disabled={status === "loading"} className="btn btn-lime w-full justify-center disabled:opacity-60">
        {status === "loading" ? "Creating..." : "Create account"}
      </button>
      <p className="text-xs text-ink-faint text-center">By signing up you agree to trade safely on campus. Already have an account? <a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="underline">Open the app</a>.</p>
    </form>
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
