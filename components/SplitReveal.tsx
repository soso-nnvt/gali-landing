"use client";
import { ReactNode, useRef, useEffect, ElementType } from "react";
import { gsap, ScrollTrigger, SplitText, reduce } from "@/lib/gsap";

export function SplitReveal({
  as = "h2",
  className,
  children,
  stagger = 0.06,
  delay = 0,
  start = "top 85%",
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  stagger?: number;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce()) return;
    let split: any;
    const run = () => {
      split = new SplitText(el, { type: "words" });
      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      });
    };
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(run);
    } else {
      run();
    }
    return () => {
      split && split.revert();
    };
  }, []);
  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
