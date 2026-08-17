"use client";
import { useRef, useEffect, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Reveal({ children, y = 28, delay = 0, className }: { children: ReactNode; y?: number; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || reduce()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, duration: 0.8, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } });
    }, el);
    return () => ctx.revert();
  }, [y, delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function Parallax({ children, speed = 0.2, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || reduce()) return;
    const ctx = gsap.context(() => {
      gsap.to(el, { yPercent: -speed * 100, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, [speed]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function CountUp({ to, duration = 1.6, prefix = "", suffix = "", className }: { to: number; duration?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduce()) { el.textContent = prefix + to.toLocaleString("en-NG") + suffix; return; }
    const obj = { v: 0 };
    const st = ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => {
      gsap.to(obj, { v: to, duration, ease: "power2.out", onUpdate: () => { el.textContent = prefix + Math.floor(obj.v).toLocaleString("en-NG") + suffix; } });
    } });
    return () => st.kill();
  }, [to, duration, prefix, suffix]);
  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}

export function LineDraw({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current; if (!svg || reduce()) return;
    const paths = Array.from(svg.querySelectorAll("path"));
    paths.forEach((p) => { const len = (p as SVGPathElement).getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len }); });
    const st = ScrollTrigger.create({ trigger: svg, start: "top 82%", once: true, onEnter: () => {
      paths.forEach((p, i) => gsap.to(p, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", delay: i * 0.12 }));
    } });
    return () => st.kill();
  }, []);
  return <svg ref={ref} className={className}>{children}</svg>;
}

export function TiltCard({ children, className, intensity = 8 }: { children: ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || reduce()) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * intensity, rotateX: -py * intensity, transformPerspective: 800, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [intensity]);
  return <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
}

export function CursorSpotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || reduce()) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div ref={ref} className={className} style={{ position: "relative" }}>
      {children}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgba(19,235,102,0.18), transparent 60%)" }} />
    </div>
  );
}
