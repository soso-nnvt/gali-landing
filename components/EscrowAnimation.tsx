"use client";
import { useRef, useEffect } from "react";
import { gsap, reduce } from "@/lib/gsap";

export default function EscrowAnimation() {
  const root = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (reduce()) return;
    const ctx = gsap.context(() => {
      const track = root.current!.querySelector("#e-track") as SVGPathElement;
      const L = track.getTotalLength();
      gsap.set(track, { strokeDasharray: L, strokeDashoffset: L });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current!, start: "top 75%", end: "bottom 65%", scrub: 0.6 },
      });
      tl.to("#e-track", { strokeDashoffset: 0, ease: "none", duration: 1.4 }, 0);
      tl.to("#e-token", { motionPath: { path: "#e-track", align: "#e-track", alignOrigin: [0.5, 0.5] }, ease: "none", duration: 1.4 }, 0);
      tl.to("#e-shackle", { y: 9, duration: 0.18 }, 0.5);
      tl.to("#e-lockbody", { fill: "var(--gali-lime)" }, 0.5);
      tl.to("#e-held", { opacity: 1, duration: 0.2 }, 0.56);
      tl.to("#e-shackle", { y: 0, duration: 0.18 }, 1.0);
      tl.to("#e-lockbody", { fill: "#1A1A1A" }, 1.0);
      tl.to("#e-held", { opacity: 0, duration: 0.2 }, 1.0);
      tl.to("#e-released", { opacity: 1, duration: 0.2 }, 1.05);
      tl.to("#e-seller", { fill: "var(--gali-lime)" }, 1.0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={root} viewBox="0 0 900 360" className="w-full h-auto" role="img" aria-label="Money flows from buyer into escrow, then to the seller on release">
      {/* track */}
      <path id="e-track" d="M120 210 C 320 120 580 120 780 210" fill="none" stroke="var(--gali-line, rgba(26,26,26,0.15))" strokeWidth="4" />
      {/* pay node */}
      <circle cx="120" cy="210" r="30" fill="var(--gali-lime)" />
      <text x="120" y="216" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="22" fill="#1A1A1A">₦</text>
      <text x="120" y="270" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="14" fill="#1A1A1A">You pay</text>
      {/* seller node */}
      <circle id="e-seller" cx="780" cy="210" r="30" fill="#1A1A1A" />
      <text x="780" y="216" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="18" fill="#fff">S</text>
      <text x="780" y="270" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="14" fill="#1A1A1A">Seller paid</text>
      {/* lock */}
      <g transform="translate(450 150)">
        <g id="e-shackle">
          <path d="M-16 6 V-6 a16 16 0 0 1 32 0 V6" fill="none" stroke="#1A1A1A" strokeWidth="5" />
        </g>
        <rect id="e-lockbody" x="-22" y="6" width="44" height="38" rx="8" fill="#1A1A1A" />
        <circle cx="0" cy="22" r="5" fill="#fff" />
        <rect x="-3" y="24" width="6" height="10" rx="3" fill="#fff" />
      </g>
      <text x="450" y="118" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="14" fill="#1A1A1A">Escrow</text>
      <text id="e-held" x="450" y="224" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="13" fontWeight="700" fill="var(--gali-lime-dim)" opacity="0">HELD</text>
      <text id="e-released" x="450" y="224" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="13" fontWeight="700" fill="var(--gali-lime-dim)" opacity="0">RELEASED</text>
      {/* token */}
      <g id="e-token">
        <circle r="17" fill="var(--gali-lime)" stroke="#1A1A1A" strokeWidth="2" />
        <text textAnchor="middle" y="6" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="18" fill="#1A1A1A">₦</text>
      </g>
    </svg>
  );
}
