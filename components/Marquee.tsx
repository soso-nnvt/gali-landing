"use client";
import { ReactNode, useRef, useEffect } from "react";
import { gsap, reduce } from "@/lib/gsap";

export function Marquee({
  children,
  speed = 28,
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el || reduce()) return;
    const tween = gsap.to(el, { xPercent: -50, repeat: -1, ease: "none", duration: speed });
    if (pauseOnHover) {
      const slow = () => tween.timeScale(0.12);
      const norm = () => tween.timeScale(1);
      el.addEventListener("mouseenter", slow);
      el.addEventListener("mouseleave", norm);
      return () => {
        tween.kill();
        el.removeEventListener("mouseenter", slow);
        el.removeEventListener("mouseleave", norm);
      };
    }
    return () => tween.kill();
  }, [speed, pauseOnHover]);
  return (
    <div className={`overflow-hidden ${className || ""}`} aria-hidden={false}>
      <div ref={track} className="flex w-max" style={{ willChange: "transform" }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
