"use client";
import { useRef, useEffect, useState } from "react";
import AppMock from "@/components/AppMock";

export default function VideoPlayer({ src, poster, label, className, contain, dark }: { src: string; poster?: string; label?: string; className?: string; contain?: boolean; dark?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const url = src.startsWith("http") ? src : `/${src.replace(/^\//, "")}`;
  const vkey = src.includes("escrow") ? "escrow" : src.includes("sell") ? "sell" : src.includes("verify") ? "verify" : src.includes("pro") ? "pro" : "buy";

  useEffect(() => {
    const v = ref.current; const w = wrap.current; if (!v || !w) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    }, { threshold: 0.35 });
    io.observe(w);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={`relative overflow-hidden rounded-[28px] border-[1.5px] border-ink/15 ${contain ? (dark ? "bg-ink" : "bg-ink/5") : "bg-ink/5"} ${className || ""}`}>
      <video ref={ref} src={url} poster={poster} muted loop playsInline preload="metadata" onError={() => setFailed(true)} className={`w-full h-full ${contain ? "object-contain" : "object-cover"}`} />
      {failed && <AppMock variant={vkey} label={label} />}
      {!failed && label && (
        <div className="absolute left-4 bottom-4 px-3 py-1.5 rounded-full bg-ink/80 text-white text-xs font-mono">{label}</div>
      )}
    </div>
  );
}
