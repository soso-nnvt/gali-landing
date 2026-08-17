"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TransitionLink } from "@/components/transition";
import { Magnetic } from "@/components/Magnetic";
import { LOGO } from "@/lib/gali";
import { gsap } from "@/lib/gsap";

const LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Sell", href: "/sell" },
  { label: "FAQ", href: "/faq" },
  { label: "Sign up", href: "/signup" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onSc = () => setScrolled(window.scrollY > 24);
    onSc();
    window.addEventListener("scroll", onSc, { passive: true });
    return () => window.removeEventListener("scroll", onSc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    if (open) {
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        el.querySelectorAll("[data-mi]"),
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.07, delay: 0.12, ease: "power3.out" }
      );
    } else {
      gsap.to(el, { autoAlpha: 0, duration: 0.22, ease: "power2.in", onComplete: () => gsap.set(el, { display: "none" }) });
    }
  }, [open]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "bg-canvas/85 backdrop-blur border-b border-line" : "bg-transparent"}`}>
        <div className="container-edge flex items-center justify-between h-16">
          <TransitionLink href="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
            <img src={LOGO} alt="Gali" className="w-8 h-8 rounded-md object-contain" />
            GALI<span className="text-acid">.</span>
          </TransitionLink>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <TransitionLink href="/how-it-works">How it works</TransitionLink>
            <TransitionLink href="/sell">Sell</TransitionLink>
            <TransitionLink href="/faq">FAQ</TransitionLink>
            <TransitionLink href="/signup">Sign up</TransitionLink>
          </nav>
          <div className="flex items-center gap-3">
            <Magnetic><a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="hidden sm:inline-flex btn btn-lime !py-2.5 !px-4 text-sm">Get the app</a></Magnetic>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open} className="md:hidden grid place-items-center w-10 h-10 rounded-xl border border-line bg-canvas/80">
              {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {mounted && createPortal(
        <div ref={overlay} style={{ display: "none" }} className="fixed inset-0 z-[200] bg-ink text-white flex-col items-center justify-center gap-8">
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="absolute top-5 right-5 grid place-items-center w-11 h-11 rounded-xl border border-white/20">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          {LINKS.map((l) => (
            <div data-mi key={l.href}>
              <TransitionLink href={l.href} onClick={() => setOpen(false)} className="font-display text-4xl font-extrabold tracking-tight hover:text-acid transition-colors">
                {l.label}
              </TransitionLink>
            </div>
          ))}
          <div data-mi className="mt-4">
            <Magnetic>
              <a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="btn btn-lime text-base !px-8 !py-4">Get the app</a>
            </Magnetic>
          </div>
          <div data-mi className="absolute bottom-8 text-xs text-white/45 font-mono">Trade on campus.</div>
        </div>,
        document.body
      )}
    </>
  );
}
