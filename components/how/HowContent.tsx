"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Illustration } from "@/components/Duotone";
import { Reveal } from "@/components/motion";
import { SplitReveal } from "@/components/SplitReveal";
import { Magnetic } from "@/components/Magnetic";
import AppMock from "@/components/AppMock";
import VideoPlayer from "@/components/VideoPlayer";
import { TransitionLink } from "@/components/transition";

type Step = { n: string; icon: string; title: string; body: string; bullets: string[]; variant: any; label: string; dark: boolean };

const steps: Step[] = [
  {
    n: "01", icon: "search", title: "Browse your campus", dark: false,
    body: "Find textbooks, gadgets, food and more from verified students on your campus. Filter by what you actually need, not a sea of strangers.",
    bullets: ["Verified campus sellers only", "Real photos, real prices", "Search by category or name"],
    variant: "buy", label: "Buy flow",
  },
  {
    n: "02", icon: "lock", title: "Pay into escrow", dark: true,
    body: "Your money is locked the moment you pay. The seller sees it is held - not released. Nobody moves until you say so.",
    bullets: ["Cash held safe in escrow", "Seller sees it is locked", "You stay in control"],
    variant: "escrow", label: "Escrow usage",
  },
  {
    n: "03", icon: "handoff", title: "Meet and inspect", dark: false,
    body: "Link up at your school's handoff spot. Check the item in person, no pressure. Only tap release when it is genuinely yours.",
    bullets: ["Known on-campus meet points", "Inspect before you commit", "No sketchy drop-offs"],
    variant: "verify", label: "Handoff",
  },
  {
    n: "04", icon: "wallet", title: "Release when happy", dark: true,
    body: "Tap release and the cash goes to the seller. Dispute? The money comes straight back to you. That is the whole point.",
    bullets: ["One-tap release", "Dispute sends cash back", "No &ldquo;I already sent it&rdquo;"],
    variant: "sell", label: "Sell flow",
  },
];

export default function HowContent() {
  const wrap = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      if (rail.current && wrap.current) {
        gsap.fromTo(rail.current, { scaleY: 0 }, {
          scaleY: 1, ease: "none", transformOrigin: "top",
          scrollTrigger: { trigger: wrap.current, start: "top top", end: "bottom bottom", scrub: true },
        });
      }
      gsap.utils.toArray<HTMLElement>(".how-card").forEach((card) => {
        gsap.fromTo(card, { scale: 1 }, {
          scale: 0.93, ease: "none",
          scrollTrigger: { trigger: card, start: "bottom bottom", end: "bottom top", scrub: true },
        });
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-16 container-edge">
        <Reveal><span className="eyebrow">How it works</span></Reveal>
        <SplitReveal as="h1" className="display text-[clamp(2.2rem,5.5vw,4rem)] mt-4 max-w-3xl">Money locked. You in control. Here&apos;s the whole flow.</SplitReveal>
        <p className="mt-5 text-ink-soft max-w-xl">Four steps from &ldquo;I want that&rdquo; to &ldquo;it&apos;s mine&rdquo; - with the cash safe in escrow the entire time.</p>
      </section>

      <section ref={wrap} className="relative">
        {/* progress rail */}
        <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40 h-40 w-[3px] rounded-full bg-line overflow-hidden">
          <div ref={rail} className="w-full h-full bg-acid origin-top" style={{ transform: "scaleY(0)" }} />
        </div>

        {steps.map((s, i) => (
          <article key={i} className="sticky top-0 min-h-screen flex items-center py-8" style={{ zIndex: i + 1 }}>
            <div className={`how-card mx-auto w-full max-w-6xl rounded-[34px] border-[1.5px] border-ink p-8 md:p-14 flex items-center shadow-brutal ${s.dark ? "bg-ink text-white" : "bg-paper text-ink"}`}>
              <div className="grid lg:grid-cols-2 gap-10 items-center w-full">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-sm ${s.dark ? "text-acid" : "text-acid-dim"}`}>{s.n}</span>
                    <span className={`grid place-items-center w-12 h-12 rounded-2xl ${s.dark ? "bg-acid text-ink" : "bg-ink text-acid"}`}>
                      <Illustration name={s.icon} className="w-6 h-6" />
                    </span>
                  </div>
                  <SplitReveal as="h2" className="display text-3xl md:text-5xl mt-5">{s.title}</SplitReveal>
                  <p className={`mt-4 max-w-md ${s.dark ? "text-white/70" : "text-ink-soft"}`}>{s.body}</p>
                  <ul className={`mt-6 space-y-3`}>
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <span className={`mt-1 grid place-items-center w-6 h-6 rounded-full shrink-0 ${s.dark ? "bg-acid text-ink" : "bg-ink text-acid"}`}>
                          <Illustration name="lock" className="w-3 h-3" />
                        </span>
                        <span className={`text-sm ${s.dark ? "text-white/80" : "text-ink-soft"}`} dangerouslySetInnerHTML={{ __html: b }} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative h-[375px] w-[215px] mx-auto rounded-[28px] overflow-hidden border-[1.5px] border-ink/15 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <VideoPlayer src={`videos/${s.variant}-flow.webm`} label={s.label} contain className="absolute inset-0 w-full h-full" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="section container-edge grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="eyebrow">Escrow, up close</span>
          <SplitReveal as="h2" className="display text-4xl mt-3">Watch the money move</SplitReveal>
          <p className="mt-4 text-ink-soft max-w-md">The escrow only releases when you say so. That&apos;s the whole point - no sending money into the void.</p>
          <ul className="mt-5 space-y-3">
            {["Held the second you pay", "Released only after inspection", "Refunded if it's not right"].map((t, i) => (
              <li key={i} className="flex gap-3 items-start"><span className="mt-1 grid place-items-center w-6 h-6 rounded-full bg-acid text-ink shrink-0"><Illustration name="lock" className="w-3.5 h-3.5" /></span><span className="text-sm text-ink-soft">{t}</span></li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}><VideoPlayer src="videos/escrow-flow.webm" label="Escrow usage" contain dark className="aspect-video w-full" /></Reveal>
      </section>

      <section className="section container-edge text-center">
        <Reveal>
          <SplitReveal as="h2" className="display text-4xl">Ready to trade without the fear?</SplitReveal>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <Magnetic><TransitionLink href="/signup" className="btn btn-lime">Create account</TransitionLink></Magnetic>
            <Magnetic><TransitionLink href="/sell" className="btn btn-ghost">Start selling</TransitionLink></Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
