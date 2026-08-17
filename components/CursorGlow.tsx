"use client";

import { useEffect } from "react";

// Site-wide faint green glow that follows the cursor.
export default function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const el = document.getElementById("cursor-glow");
    if (!el) return;
    let raf = 0;
    let x = -100, y = -100;
    const apply = () => {
      el.style.setProperty("--gx", `${x}px`);
      el.style.setProperty("--gy", `${y}px`);
      raf = 0;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      id="cursor-glow"
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
        mixBlendMode: "screen",
        background:
          "radial-gradient(260px circle at var(--gx, -100px) var(--gy, -100px), rgba(19,235,102,0.16), rgba(19,235,102,0.06) 35%, transparent 62%)",
      }}
    />
  );
}
