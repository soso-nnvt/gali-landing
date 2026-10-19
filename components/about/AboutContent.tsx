"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, reduce } from "@/lib/gsap";
import { Reveal, CountUp } from "@/components/motion";
import { SplitReveal } from "@/components/SplitReveal";
import { Marquee } from "@/components/Marquee";
import EscrowAnimation from "@/components/EscrowAnimation";
import { Illustration } from "@/components/Duotone";
import { Magnetic } from "@/components/Magnetic";
import { TransitionLink } from "@/components/transition";

const PAINS = [
  { icon: "wallet", title: "Fake bank alerts", body: "Sellers screenshot 'credited' messages that never actually landed in your account." },
  { icon: "handoff", title: "Delivery ghosting", body: "Pay first, then the seller goes quiet. The item never shows up." },
  { icon: "lock", title: "Upfront scams", body: "Strangers asking you to send money before you have seen a single thing." },
];

const PRINCIPLES = [
  { icon: "lock", title: "Escrow-first", body: "Money is held until both sides meet and approve. No 'send and pray'." },
  { icon: "check", title: "Verified campuses", body: "Every seller is tied to a real school email and a verified payout account." },
  { icon: "spark", title: "Built for students", body: "Low fees, starter-free listings, and a Pioneer Plan that rewards early movers." },
];

const VALUES = [
  { icon: "lock", title: "Escrow by default", body: "Every payment is protected, not just the big ones." },
  { icon: "check", title: "Verified sellers", body: "School email plus payout account, or no store at all." },
  { icon: "tag", title: "Lowest fees", body: "2% on Pro, 5% on Free. No listing fees, ever." },
  { icon: "spark", title: "Pioneer Plan", body: "Free early-access plan for the first movers on each campus." },
  { icon: "search", title: "Campus-local", body: "Discover what is available right on your campus, not a sea of strangers." },
  { icon: "handoff", title: "WhatsApp quick-buy", body: "A ready-to-share store link your buyers can tap and trust." },
];

const CHAPTERS = [
  { n: "01", title: "The problem", body: "We started where campus trade actually happens - the group chats. The same chats where deals fell through and money quietly vanished." },
  { n: "02", title: "The fix", body: "So we built the trust layer first: escrow that locks funds, verification that proves who is behind a store, and fees that do not punish students." },
  { n: "03", title: "Now", body: "Gali is live at ABUAD and rolling out to federal, state, and private universities across Nigeria - structured, verified, localized trading infrastructure for every campus." },
];

const TESTIMONIALS = [
  { name: "Adaeze O.", role: "200L - ABUAD", quote: "Sold my mini-fridge the same day. The buyer paid into escrow, we met at the faculty, I tapped release. No drama." },
  { name: "Chidi M.", role: "300L - ABUAD", quote: "I used to get scammed on group chats. My first Gali deal felt weirdly calm - the money was just held. That is the whole point." },
  { name: "Ngozi E.", role: "100L - ABUAD", quote: "As a seller, verification took five minutes and my store looked real. My first sale came in two days." },
  { name: "Tunde B.", role: "400L - ABUAD", quote: "The Pioneer Plan got me zero fees while I tested the waters. Now I resell course packs every semester." },
];

const CAMPUSES = ["ABUAD", "University of Ibadan", "UNILAG", "UNN", "OAU", "UNIBEN", "ABU Zaria", "LASU", "UNILORIN", "FUNAAB", "UNIPORT", "UI"];

export default function AboutContent() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const heroGhost = useRef<HTMLDivElement>(null);
  const storyWrap = useRef<HTMLDivElement>(null);
  const storyLine = useRef<SVGSVGElement>(null);
  const chapterLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // HERO: pinned scrub on desktop, light parallax on mobile
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: hero.current, start: "top top", end: "+=70%", scrub: true, pin: true },
        });
        tl.to(".about-hero-title", { yPercent: -16, scale: 0.92, autoAlpha: 0.85, ease: "none" }, 0)
          .to(heroGhost.current, { yPercent: 26, ease: "none" }, 0)
          .to(".about-hero-sub", { autoAlpha: 0, y: -20, ease: "none" }, 0);
      });
      mm.add("(max-width: 767px)", () => {
        gsap.to(heroGhost.current, {
          yPercent: 18, ease: "none",
          scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".about-hero-title", {
          yPercent: -6, ease: "none",
          scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // hero scroll cue
      gsap.to(".about-scrollcue", { y: 8, repeat: -1, yoyo: true, duration: 1, ease: "sine.inOut" });

      // STORY: scrub-drawn vertical line + chapter label swaps
      if (storyLine.current) {
        const paths = Array.from(storyLine.current.querySelectorAll("path")) as SVGPathElement[];
        paths.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
        gsap.to(paths, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: storyWrap.current, start: "top 70%", end: "bottom 80%", scrub: true },
        });
      }
      gsap.utils.toArray<HTMLElement>(".about-chapter").forEach((ch) => {
        ScrollTrigger.create({
          trigger: ch, start: "top center", end: "bottom center",
          onToggle: (self) => {
            if (self.isActive && chapterLabel.current) {
              chapterLabel.current.textContent = `${ch.dataset.chapter} - ${ch.dataset.title}`;
              gsap.fromTo(chapterLabel.current, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4 });
            }
          },
        });
      });

      // BATCHED reveals for grids (perf-friendly)
      gsap.set(".about-batch", { autoAlpha: 0, y: 60 });
      ScrollTrigger.batch(".about-batch", {
        start: "top 86%",
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", overwrite: true }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="overflow-x-hidden">
      {/* HERO */}
      <section ref={hero} className="relative min-h-screen flex items-center overflow-hidden">
        <div ref={heroGhost} aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
          <span className="display font-black leading-none text-[34vw] text-ink/5">GALI</span>
        </div>
        <div className="container-edge relative z-10 w-full">
          <Reveal>
            <span className="eyebrow">About Gali</span>
          </Reveal>
          <SplitReveal as="h1" className="about-hero-title display text-[clamp(2.6rem,7vw,5.5rem)] mt-4 max-w-4xl">
            Your Marketplace. Your Community. Your Gali.
          </SplitReveal>
          <p className="about-hero-sub mt-6 text-ink-soft text-lg max-w-xl">
            The campus commerce platform where payment is locked in escrow until you meet, inspect, and approve.
          </p>
          <div className="about-scrollcue mt-12 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-faint">
            <span>Scroll to read</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section container-edge">
        <Reveal><span className="eyebrow">The problem</span></Reveal>
        <SplitReveal as="h2" className="display text-[clamp(2rem,5vw,3.6rem)] mt-3 max-w-3xl">
          Campus trade was running on hope.
        </SplitReveal>
        <p className="mt-5 text-ink-soft max-w-2xl">
          For years, buying and selling on campus meant flooding WhatsApp broadcast groups with &ldquo;who has?&rdquo; and &ldquo;DM me&rdquo;. No structure. No proof. Just vibes - and a lot of risk.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {PAINS.map((p) => (
            <div key={p.title} className="about-batch card p-6">
              <span className="grid place-items-center w-11 h-11 rounded-2xl bg-acid text-ink">
                <Illustration name={p.icon as any} className="w-6 h-6" />
              </span>
              <h3 className="display text-lg mt-4">{p.title}</h3>
              <p className="text-ink-faint text-sm mt-2">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 -mx-6">
          <Marquee speed={26}>
            {["fake alert", "ghosted", "send first", "no refund", "is this legit?", "did it land?", "DM for price", "pay to see"].map((w) => (
              <span key={w} className="display text-2xl text-ink/15 px-6 whitespace-nowrap">{w}</span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* MISSION */}
      <section className="section container-edge">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <Reveal><span className="eyebrow">What Gali is</span></Reveal>
            <SplitReveal as="h2" className="display text-[clamp(2rem,5vw,3.6rem)] mt-3 max-w-2xl">
              A marketplace that puts trust before the transaction.
            </SplitReveal>
            <p className="mt-5 text-ink-soft max-w-md">
              Gali is a campus commerce platform where verified university students buy and sell through built-in escrow payments.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="about-batch card p-5 flex gap-4 items-start">
                <span className="grid place-items-center w-10 h-10 rounded-2xl bg-ink text-acid shrink-0">
                  <Illustration name={p.icon as any} className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="display text-base">{p.title}</h3>
                  <p className="text-ink-faint text-sm mt-1">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section ref={storyWrap} className="section container-edge">
        <div className="grid md:grid-cols-[240px_1fr] gap-10">
          <div className="hidden md:block">
            <div className="sticky top-32">
              <span className="eyebrow">Our story</span>
              <div ref={chapterLabel} className="display text-2xl mt-3">01 - The problem</div>
              <svg ref={storyLine} viewBox="0 0 4 320" className="mt-6 w-1 h-72" aria-hidden>
                <path d="M2 0 V320" fill="none" stroke="var(--gali-lime)" strokeWidth="4" />
              </svg>
            </div>
          </div>
          <div className="space-y-24">
            {CHAPTERS.map((c) => (
              <div key={c.n} className="about-chapter" data-chapter={c.n} data-title={c.title}>
                <span className="font-mono text-sm text-acid-dim">{c.n}</span>
                <SplitReveal as="h3" className="display text-3xl md:text-4xl mt-2 max-w-xl">{c.title}</SplitReveal>
                <p className="mt-4 text-ink-soft max-w-lg">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFE MONEY */}
      <section className="section container-edge">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="eyebrow">How the money stays safe</span>
            <SplitReveal as="h2" className="display text-[clamp(1.8rem,4.5vw,3rem)] mt-3 max-w-xl">
              Held the second you pay. Released when you are sure.
            </SplitReveal>
            <p className="mt-4 text-ink-soft max-w-md">
              Your cash is locked in escrow from the moment you pay. The seller sees it is held, meets you on campus, and only gets paid when you tap release. Dispute? The money comes straight back.
            </p>
            <Magnetic>
              <TransitionLink href="/how-it-works" className="btn btn-ghost mt-6 inline-flex">See the full flow</TransitionLink>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card p-6">
              <EscrowAnimation />
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="section container-edge">
        <Reveal><span className="eyebrow">What you get</span></Reveal>
        <SplitReveal as="h2" className="display text-[clamp(2rem,5vw,3.4rem)] mt-3 max-w-3xl">
          Built for the way campuses actually trade.
        </SplitReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {VALUES.map((v) => (
            <div key={v.title} className="about-batch card p-6">
              <span className="grid place-items-center w-11 h-11 rounded-2xl bg-acid text-ink">
                <Illustration name={v.icon as any} className="w-6 h-6" />
              </span>
              <h3 className="display text-lg mt-4">{v.title}</h3>
              <p className="text-ink-faint text-sm mt-2">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="section container-edge">
        <div className="card p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="display text-5xl text-ink"><CountUp to={1} /></div>
            <div className="text-xs uppercase tracking-wide text-ink-faint mt-2">Campus live (ABUAD)</div>
          </div>
          <div>
            <div className="display text-5xl text-ink"><CountUp to={12} /></div>
            <div className="text-xs uppercase tracking-wide text-ink-faint mt-2">Campuses launching</div>
          </div>
          <div>
            <div className="display text-5xl text-ink"><CountUp to={5000} suffix="+" /></div>
            <div className="text-xs uppercase tracking-wide text-ink-faint mt-2">Students on the waitlist</div>
          </div>
          <div>
            <div className="display text-5xl text-ink"><CountUp to={2} suffix="%" /></div>
            <div className="text-xs uppercase tracking-wide text-ink-faint mt-2">Pro seller fee</div>
          </div>
        </div>
        <p className="text-center text-xs text-ink-faint mt-4">Pre-launch figures - expanding fast across Nigeria.</p>
      </section>

      {/* CAMPUS */}
      <section className="section container-edge text-center">
        <Reveal><span className="eyebrow">Campus and community</span></Reveal>
        <SplitReveal as="h2" className="display text-[clamp(2rem,5vw,3.4rem)] mt-3 max-w-3xl mx-auto">
          Starting at ABUAD. Built for every campus.
        </SplitReveal>
        <p className="mt-4 text-ink-soft max-w-xl mx-auto">
          We are rolling out to federal, state, and private universities across Nigeria - so wherever you study, safe campus trade is close.
        </p>
        <div className="mt-10 -mx-6">
          <Marquee speed={30}>
            {CAMPUSES.map((c) => (
              <span key={c} className="display text-3xl text-ink/20 px-8 whitespace-nowrap">{c}</span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section container-edge">
        <Reveal><span className="eyebrow">From students at ABUAD</span></Reveal>
        <SplitReveal as="h2" className="display text-[clamp(2rem,5vw,3.4rem)] mt-3 max-w-3xl">
          Real trades, real calm.
        </SplitReveal>
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="about-batch card p-6">
              <div className="flex items-center gap-4">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-acid text-ink display text-lg">{t.name.charAt(0)}</span>
                <div>
                  <div className="display text-base">{t.name}</div>
                  <div className="text-xs uppercase tracking-wide text-ink-faint">{t.role}</div>
                </div>
              </div>
              <p className="text-ink-soft text-sm mt-4">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section container-edge text-center">
        <SplitReveal as="h2" className="display text-[clamp(2.4rem,6vw,4.5rem)] max-w-4xl mx-auto">
          Be inspired. Join Gali.
        </SplitReveal>
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <Magnetic><TransitionLink href="/signup" className="btn btn-lime">Create account</TransitionLink></Magnetic>
          <Magnetic><TransitionLink href="/sell" className="btn btn-ghost">Start selling</TransitionLink></Magnetic>
        </div>
      </section>


    </div>
  );
}
