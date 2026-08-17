"use client";
import { useEffect, useRef } from "react";
import WebGLBackground from "@/components/WebGLBackground";
import SearchPreview from "@/components/home/SearchPreview";
import PhoneMockup from "@/components/PhoneMockup";
import VideoPlayer from "@/components/VideoPlayer";
import { TransitionLink } from "@/components/transition";
import { Reveal } from "@/components/motion";
import { SplitReveal } from "@/components/SplitReveal";
import { Magnetic } from "@/components/Magnetic";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const phone = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !phone.current) return;
    const ctx = gsap.context(() => {
      gsap.to(phone.current, { y: -14, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, phone);
    return () => ctx.revert();
  }, []);
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10"><WebGLBackground className="absolute inset-0" /></div>
      <div className="absolute -z-10 inset-0 bg-gradient-to-b from-canvas/40 via-canvas/20 to-canvas" />
      <div className="container-edge pt-28 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <Reveal><span className="eyebrow">Campus marketplace - escrow backed</span></Reveal>
          <SplitReveal as="h1" className="display text-[clamp(2.4rem,6vw,4.6rem)] mt-4" stagger={0.05}>
            Your school&apos;s marketplace. <span className="text-acid-dim">Money locked till you&apos;re sure.</span>
          </SplitReveal>
          <p className="mt-6 text-lg text-ink-soft max-w-xl">
            Gali is the student marketplace that holds the cash in escrow until you meet, inspect, and collect your item at your campus handoff spot. No scams. No &ldquo;I already sent it&rdquo;. No wahala.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic><TransitionLink href="/signup" className="btn btn-lime">Start buying</TransitionLink></Magnetic>
            <Magnetic><TransitionLink href="/sell" className="btn btn-ghost">Sell your stuff</TransitionLink></Magnetic>
          </div>
          <div className="mt-10 max-w-md"><SearchPreview /></div>
        </div>
        <div className="relative hidden lg:block">
          <div ref={phone} className="relative">
            <PhoneMockup>
              <VideoPlayer src="videos/buy-flow.webm" label="Gali in action" className="w-full h-full" />
            </PhoneMockup>
            <div className="absolute -top-5 -right-5 z-30 px-4 py-2 rounded-2xl bg-acid text-ink font-mono text-xs border-[1.5px] border-ink shadow-brutal-sm">escrow: HELD</div>
            <div className="absolute -bottom-5 -left-5 z-30 px-4 py-2 rounded-2xl bg-ink text-white text-xs font-mono">pay &rarr; meet &rarr; release</div>
          </div>
        </div>
      </div>
    </section>
  );
}
