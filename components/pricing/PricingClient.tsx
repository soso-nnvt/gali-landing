"use client";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion";
import { Illustration } from "@/components/Duotone";
import SellerRegistration from "@/components/seller/SellerRegistration";

type Interval = "monthly" | "semester";
type Billing = "SUBSCRIPTION" | "ONE_TIME";

const FREE_FEATURES = [
  "Up to 5 listings",
  "3 photos per item",
  "5% commission per sale",
  "Escrow-backed payouts",
  "Buyer chat",
];
const PRO_FEATURES = [
  "Unlimited listings",
  "Unlimited photos",
  "2% commission (lower fees)",
  "Verified seller badge",
  "Priority support",
  "Sales analytics",
];

export default function PricingClient() {
  const [interval, setInterval] = useState<Interval>("semester");
  const [billing, setBilling] = useState<Billing>("SUBSCRIPTION");
  const [modal, setModal] = useState<null | "FREE" | "PRO" | "PIONEER">(null);
  const [pioneer, setPioneer] = useState<{ name: string; durationDays: number; commissionPct: number; maxSubscribers: number } | null>(null);

  useEffect(() => {
    fetch("/api/gali/custom-plans/code/551079").then((r) => r.json()).then((d) => {
      if (d.success && d.plan) setPioneer(d.plan);
    }).catch(() => {});
  }, []);

  const proPrice = interval === "semester" ? "NGN 3,500" : "NGN 2,000";
  const proUnit = interval === "semester" ? "/ semester" : "/ month" + (billing === "ONE_TIME" ? " (one-time)" : "");

  const pioneerFeatures = [
    "Unlimited listings",
    pioneer ? `0% commission for ${pioneer.durationDays} days` : "0% commission for 30 days",
    "Verified seller badge",
    "Sales analytics",
    "Priority support",
    "Custom storefront",
  ];

  return (
    <section className="pt-32 pb-24 container-edge">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow">Pricing</span>
          <h1 className="display text-[clamp(2.4rem,6vw,4rem)] mt-4">Pick the plan that fits your hustle.</h1>
          <p className="mt-4 text-ink-faint text-lg">Standard listings stay free. Go Pro for lower fees, or claim the free Pioneer Plan while it lasts.</p>
        </Reveal>
      </div>

      <Reveal>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <ToggleGroup label="Interval" value={interval} onChange={(v) => setInterval(v as Interval)} options={[["monthly", "Monthly"], ["semester", "Semester"]]} />
          <ToggleGroup label="Billing" value={billing} onChange={(v) => setBilling(v as Billing)} options={[["SUBSCRIPTION", "Subscription"], ["ONE_TIME", "One-time"]]} />
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6 mt-12 items-stretch">
        <PlanCard name="Free" price="NGN 0" unit="forever" highlight={false}
          blurb="For buyers and casual sellers getting started."
          features={FREE_FEATURES}
          cta="Start selling free"
          onCta={() => setModal("FREE")} />

        <PlanCard name="Pro" price={proPrice} unit={proUnit} highlight={true}
          blurb="For sellers moving volume and wanting lower fees."
          features={PRO_FEATURES}
          cta="Get Pro"
          onCta={() => setModal("PRO")} />

        <PlanCard name={pioneer ? pioneer.name : "Pioneer Vendor Plan"} price="NGN 0" unit={pioneer ? `for ${pioneer.durationDays} days` : "for 30 days"} highlight={false} accent
          blurb="Our launch gift to early campus sellers. Verified, zero fees."
          features={pioneerFeatures}
          cta="Claim free plan"
          onCta={() => setModal("PIONEER")} />
      </div>

      <p className="text-center text-sm text-ink-faint mt-10">Prices are in Nigerian Naira. All plans include escrow-backed payouts and campus verification.</p>

      {modal && (
        <div className="fixed inset-0 z-[300] bg-ink/70 backdrop-blur-sm overflow-y-auto py-10 px-4" onClick={() => setModal(null)}>
          <div className="max-w-xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <SellerRegistration plan={modal} interval={interval} billing={billing} onCancel={() => setModal(null)} />
          </div>
        </div>
      )}
    </section>
  );
}

function ToggleGroup({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-ink-faint uppercase tracking-wide">{label}</span>
      <div className="flex p-1 rounded-xl bg-canvas border border-line">
        {options.map(([val, lab]) => (
          <button key={val} type="button" onClick={() => onChange(val)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${value === val ? "bg-ink text-white" : "text-ink-faint"}`}>
            {lab}
          </button>
        ))}
      </div>
    </div>
  );
}

function PlanCard({ name, price, unit, blurb, features, cta, onCta, highlight, accent }: {
  name: string; price: string; unit: string; blurb: string; features: string[];
  cta: string; onCta: () => void; highlight?: boolean; accent?: boolean;
}) {
  return (
    <div className={`card p-6 flex flex-col ${highlight ? "ring-2 ring-ink shadow-[10px_10px_0_0_#13EB66]" : accent ? "border-acid/60" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="eyebrow">{name}</span>
        {highlight && <span className="text-[10px] font-bold uppercase tracking-wide bg-ink text-acid px-2 py-1 rounded-full">Popular</span>}
        {accent && <span className="text-[10px] font-bold uppercase tracking-wide bg-acid text-ink px-2 py-1 rounded-full">Free launch</span>}
      </div>
      <div className="mt-4">
        <span className="display text-4xl">{price}</span>
        <span className="text-ink-faint text-sm ml-2">{unit}</span>
      </div>
      <p className="text-sm text-ink-faint mt-3">{blurb}</p>
      <ul className="mt-5 space-y-2.5 text-sm flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Illustration name="check" className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button onClick={onCta} className={`btn w-full justify-center mt-6 ${highlight ? "btn-lime" : "btn-outline"}`}>{cta}</button>
    </div>
  );
}
