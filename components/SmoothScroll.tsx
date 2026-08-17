"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenisStore";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = setTimeout(refresh, 350);
    const t2 = setTimeout(refresh, 1300);
    requestAnimationFrame(refresh);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return <>{children}</>;
}
