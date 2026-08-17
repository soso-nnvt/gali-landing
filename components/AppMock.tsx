"use client";
import { useRef, useEffect } from "react";
import { gsap, reduce } from "@/lib/gsap";

type Variant = "buy" | "sell" | "escrow" | "pro" | "verify";

const CFG: Record<Variant, { title: string; meta: string; btn: string; steps: [string, string, string]; labels: [string, string, string] }> = {
  buy: { title: "MacBook Air '19", meta: "Verified - Moyo - UNILAG", btn: "Pay into escrow", steps: ["Pay", "Meet", "Release"], labels: ["Paying", "Inspecting", "Released"] },
  escrow: { title: "iPhone 12", meta: "Verified - Tobi - UI", btn: "Pay into escrow", steps: ["Pay", "Meet", "Release"], labels: ["Paying", "Inspecting", "Released"] },
  sell: { title: "List your textbook", meta: "Free - 2 min", btn: "Publish listing", steps: ["Add", "Verify", "Live"], labels: ["Adding", "Verifying", "Live"] },
  pro: { title: "Gali Pro", meta: "Lower fees - Verified", btn: "Upgrade to Pro", steps: ["Free", "Verified", "Pro"], labels: ["Setting up", "Verifying", "Pro"] },
  verify: { title: "Verified Seller", meta: "Campus ID - checked", btn: "Get verified", steps: ["ID", "Campus", "Live"], labels: ["Checking", "Matching", "Verified"] },
};

export default function AppMock({ variant = "buy", label }: { variant?: Variant; label?: string }) {
  const c = CFG[variant];
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const n1 = useRef<HTMLDivElement>(null);
  const n2 = useRef<HTMLDivElement>(null);
  const n3 = useRef<HTMLDivElement>(null);
  const l1 = useRef<HTMLSpanElement>(null);
  const l2 = useRef<HTMLSpanElement>(null);
  const l3 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce()) {
      gsap.set([n1.current, n2.current, n3.current], { background: "var(--gali-lime)" });
      gsap.set(fill.current, { scaleX: 1 });
      gsap.set([l1.current, l2.current], { opacity: 0 });
      gsap.set(l3.current, { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });
      gsap.set(n1.current, { background: "var(--gali-lime)" });
      tl.to(fill.current, { scaleX: 0.5, duration: 0.55, ease: "power2.inOut" })
        .set(n2.current, { background: "var(--gali-lime)" })
        .to(l1.current, { opacity: 0, duration: 0.2 }, ">")
        .to(l2.current, { opacity: 1, duration: 0.2 }, "<")
        .to(fill.current, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, ">+0.35")
        .set(n3.current, { background: "var(--gali-lime)" })
        .to(l2.current, { opacity: 0, duration: 0.2 }, ">")
        .to(l3.current, { opacity: 1, duration: 0.2 }, "<")
        .to({}, { duration: 1.3 })
        .set([n1.current, n2.current, n3.current], { clearProps: "background" })
        .set(fill.current, { scaleX: 0 })
        .set(l3.current, { opacity: 0 })
        .set(l1.current, { opacity: 1 });
    }, root);
    return () => ctx.revert();
  }, [variant]);

  return (
    <div ref={root} className="absolute inset-0 grid place-items-center bg-canvas p-5">
      <div className="w-full max-w-[260px]">
        <div className="flex items-center justify-between">
          <span className="font-display font-extrabold text-ink">GALI<span className="text-acid">.</span></span>
          <span className="px-2 py-0.5 rounded-full bg-ink/10 text-[10px] font-mono text-ink-soft">campus</span>
        </div>
        <div className="mt-4 rounded-2xl border border-ink/10 bg-white p-3 shadow-sm">
          <div className="h-24 rounded-xl bg-gradient-to-br from-acid/30 to-ink/10" />
          <div className="mt-2 font-display font-bold text-ink text-sm truncate">{c.title}</div>
          <div className="text-[10px] text-ink-faint truncate">{c.meta}</div>
        </div>
        <div className="mt-4 flex items-center justify-between relative">
          {[c.steps[0], c.steps[1], c.steps[2]].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 z-10">
              <div
                ref={i === 0 ? n1 : i === 1 ? n2 : n3}
                className="w-7 h-7 rounded-full grid place-items-center bg-ink/10 text-[10px] font-mono font-bold text-ink"
              >
                {i + 1}
              </div>
              <span className="text-[9px] font-mono text-ink-soft">{c.steps[i]}</span>
            </div>
          ))}
          <div className="absolute left-[14%] right-[14%] top-3.5 h-0.5 bg-ink/10 rounded">
            <div ref={fill} className="h-full bg-acid origin-left rounded" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
        <div className="mt-6 rounded-xl bg-ink text-white py-3 px-4 text-center font-display font-bold text-sm relative overflow-hidden">
          <span ref={l1} className="block">{c.btn}</span>
          <span ref={l2} className="block absolute inset-0 grid place-items-center opacity-0">{c.labels[1]}</span>
          <span ref={l3} className="block absolute inset-0 grid place-items-center opacity-0">{c.labels[2]}</span>
        </div>
        {label && <div className="mt-3 text-center text-[9px] font-mono text-ink-faint">{label}</div>}
      </div>
    </div>
  );
}
