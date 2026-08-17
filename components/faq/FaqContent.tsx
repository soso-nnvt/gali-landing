"use client";
import { useState } from "react";
import { Illustration } from "@/components/Duotone";
import { Reveal } from "@/components/motion";
import { SplitReveal } from "@/components/SplitReveal";
import { TransitionLink } from "@/components/transition";

const faqs = [
  { q: "Is Gali really escrow-backed?", a: "Yes. When you pay, the money goes into escrow - not the seller's pocket. It only releases after you meet, inspect, and confirm the item is yours." },
  { q: "What if the item isn't as described?", a: "Don't release. The cash stays in escrow until you're satisfied. If it's off, open a dispute and the money comes back to you." },
  { q: "Which campuses are on Gali?", a: "We're live across several Nigerian universities and adding more. Your campus appears when you sign up." },
  { q: "How much does it cost to sell?", a: "Listing is free on the standard plan. Pro gives you a verified badge, lower fees, and unlimited listings." },
  { q: "Can I sell food or services?", a: "Yes - textbooks, gadgets, fashion, food, and more. As long as it's allowed on your campus, list it." },
  { q: "Is my money safe?", a: "Escrow protects both sides. You never pay a stranger directly; the release is always in your hands." },
];

export default function FaqContent() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="pt-32 pb-10 container-edge">
        <Reveal><span className="eyebrow">FAQ</span></Reveal>
        <SplitReveal as="h1" className="display text-[clamp(2.2rem,5.5vw,4rem)] mt-4 max-w-3xl">Questions, answered.</SplitReveal>
      </section>
      <section className="section container-edge grid lg:grid-cols-[1.4fr_1fr] gap-12">
        <div className="divide-y divide-line border-t border-line">
          {faqs.map((f, i) => (
            <div key={i} className="py-5">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 text-left">
                <span className="font-display font-semibold text-lg">{f.q}</span>
                <span className={`grid place-items-center w-8 h-8 rounded-full border border-ink shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`}><Illustration name="spark" className="w-4 h-4" /></span>
              </button>
              {open === i && <p className="mt-3 text-ink-soft max-w-2xl">{f.a}</p>}
            </div>
          ))}
        </div>
        <Reveal>
          <div className="card p-8 sticky top-24">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-acid text-ink mb-4"><Illustration name="shield" className="w-7 h-7" /></span>
            <h3 className="font-display text-2xl font-bold">Still unsure?</h3>
            <p className="mt-2 text-ink-faint text-sm">Reach the team or just open the app and poke around. Nothing to lose.</p>
            <div className="mt-5 flex flex-col gap-3">
              <a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="btn btn-lime justify-center">Open the app</a>
              <TransitionLink href="/signup" className="btn btn-ghost justify-center">Create account</TransitionLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
