"use client";
import { Illustration } from "@/components/Duotone";
import { Reveal, Parallax } from "@/components/motion";
import { SplitReveal } from "@/components/SplitReveal";
import { Magnetic } from "@/components/Magnetic";
import VideoPlayer from "@/components/VideoPlayer";
import SignupForm from "@/components/signup/SignupForm";
import { TransitionLink } from "@/components/transition";

const steps = [
  { icon: "spark", title: "Open your store", body: "Sign up, pick your campus, name your shop. Takes two minutes." },
  { icon: "parcel", title: "List anything", body: "Textbooks, gadgets, food, fashion - snap a photo, set a price, done." },
  { icon: "lock", title: "Get paid safe", body: "Buyers pay into escrow. You're paid the moment they confirm in person." },
  { icon: "wallet", title: "Grow with Pro", body: "Verified badge, lower fees, no listing limits. Scale your side hustle." },
];

export default function SellContent() {
  return (
    <>
      <section className="relative pt-32 pb-12 container-edge overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60">
          <Parallax speed={0.15} className="absolute -top-20 right-0"><Illustration name="spark" className="w-72 h-72 text-acid/30" /></Parallax>
        </div>
        <Reveal><span className="eyebrow">Sell on Gali</span></Reveal>
        <SplitReveal as="h1" className="display text-[clamp(2.2rem,5.5vw,4rem)] mt-4 max-w-3xl">Turn what you have into cash on campus.</SplitReveal>
        <p className="mt-5 text-ink-soft max-w-xl">No shop rent. No risk of "I transferred". Just students buying from students, with escrow keeping everyone honest.</p>
        <div className="mt-8"><Magnetic><TransitionLink href="/pricing" className="btn btn-ghost">Compare Free vs Pro</TransitionLink></Magnetic></div>
      </section>
      <section className="section container-edge grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.06}><div className="card p-7 h-full"><span className="grid place-items-center w-12 h-12 rounded-2xl bg-acid text-ink mb-4"><Illustration name={s.icon} className="w-7 h-7" /></span><h3 className="font-display font-bold text-lg">{s.title}</h3><p className="mt-2 text-ink-faint text-sm">{s.body}</p></div></Reveal>
        ))}
      </section>
      <section className="section container-edge grid lg:grid-cols-2 gap-12 items-center">
        <Reveal><VideoPlayer src="videos/sell-flow.webm" label="Sell flow" contain dark className="aspect-video w-full" /></Reveal>
        <Reveal delay={0.1}>
          <span className="eyebrow">Pro features</span>
          <SplitReveal as="h2" className="display text-4xl mt-3">When you're ready to scale</SplitReveal>
          <p className="mt-4 text-ink-soft max-w-md">Pro gets you a verified badge, lower fees, and unlimited listings. Built for the campus entrepreneurs.</p>
          <div className="aspect-video w-full mt-6 rounded-[28px] overflow-hidden border-[1.5px] border-ink/15 bg-ink"><img src="/videos/pro.jpg" alt="Pro features" className="w-full h-full object-contain" /></div>
        </Reveal>
      </section>
      <section className="section container-edge">
        <Reveal><SplitReveal as="h2" className="display text-4xl text-center">Open your seller account</SplitReveal></Reveal>
        <div className="mt-8"><SignupForm defaultRole="vendor" /></div>
      </section>
    </>
  );
}
