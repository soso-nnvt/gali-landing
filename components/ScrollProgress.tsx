"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, reduce } from "@/lib/gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bar.current;
    if (!el || reduce()) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
    });
    return () => st.kill();
  }, []);
  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[70] origin-left pointer-events-none"
      style={{ transform: "scaleX(0)", background: "var(--gali-lime)" }}
    />
  );
}
