"use client";
import { useState, useRef, useEffect } from "react";
import { Illustration } from "@/components/Duotone";
import { useTransitionRouter } from "@/components/transition";

export default function SearchPreview() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLFormElement>(null);
  const { navigate } = useTransitionRouter();

  useEffect(() => {
    if (!q.trim()) { setRes([]); return; }
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/gali/search?q=${encodeURIComponent(q)}`);
        const j = await r.json();
        setRes((j?.products || []).slice(0, 5));
      } catch { setRes([]); }
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = q.trim();
    if (!t) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(t)}`);
  };

  return (
    <form ref={box} onSubmit={submit} className="relative">
      <div className="flex items-center gap-2 rounded-2xl border-[1.5px] border-ink bg-paper px-4 py-3 shadow-brutal-sm">
        <Illustration name="search" className="w-5 h-5 text-ink-faint" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          placeholder="Search your campus: textbooks, laptops, chairs..."
          className="bg-transparent outline-none w-full text-sm"
          aria-label="Search Gali"
        />
        <button type="submit" className="text-xs font-mono font-bold text-acid-dim hidden sm:block">ENTER</button>
      </div>
      {open && res.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-paper border border-line rounded-2xl overflow-hidden shadow-lg">
          {res.map((p) => (
            <a key={p.id} href={`https://app.gali.com.ng/product/${p.slug || p.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 hover:bg-canvas border-b border-line last:border-0">
              {p.imageUrl
                ? <img src={p.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                : <span className="w-10 h-10 rounded-lg bg-canvas grid place-items-center"><Illustration name="parcel" className="w-5 h-5 text-ink-faint" /></span>}
              <span className="flex-1 min-w-0">
                <span className="block truncate text-sm font-medium">{p.title}</span>
                <span className="block text-xs text-ink-faint">{p.categoryName || p.category}</span>
              </span>
              <span className="font-mono text-sm">{p.price ? "₦" + Math.round(p.price / 100).toLocaleString() : ""}</span>
            </a>
          ))}
        </div>
      )}
    </form>
  );
}
