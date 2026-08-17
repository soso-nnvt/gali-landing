"use client";
import { useState } from "react";
import { Illustration } from "@/components/Duotone";
import AppMock from "@/components/AppMock";
import VideoPlayer from "@/components/VideoPlayer";

export type AccordionItem = {
  id: string;
  title: string;
  summary?: string;
  detail: string;
  icon?: string;
  variant?: "buy" | "sell" | "escrow" | "pro" | "verify";
};

export function Accordion({ items, tone = "light", defaultOpen = 0 }: { items: AccordionItem[]; tone?: "light" | "dark"; defaultOpen?: number }) {
  const [open, setOpen] = useState<string | null>(items[defaultOpen]?.id ?? null);
  const dark = tone === "dark";
  return (
    <div className={`divide-y ${dark ? "divide-white/15 border-white/15" : "divide-line border-line"} border-t`}>
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id}>
            <button
              onClick={() => setOpen(isOpen ? null : it.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-6 text-left group"
            >
              <span className="flex items-center gap-4 min-w-0">
                {it.icon && (
                  <span className={`grid place-items-center w-11 h-11 rounded-xl shrink-0 ${dark ? "bg-acid text-ink" : "bg-ink text-acid"}`}>
                    <Illustration name={it.icon} className="w-6 h-6" />
                  </span>
                )}
                <span className={`font-display font-bold text-xl md:text-2xl ${dark ? "text-white group-hover:text-acid" : "text-ink group-hover:text-acid-dim"} transition-colors`}>{it.title}</span>
              </span>
              <span className={`relative w-7 h-7 shrink-0 ${dark ? "text-acid" : "text-ink"}`} aria-hidden>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-[2px] bg-current" />
                <span className={`absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-7 bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : "scale-y-100"}`} />
              </span>
            </button>
            <div className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6 pb-8 pt-1 items-center">
                  <div>
                    {it.summary && <p className={`font-display text-lg font-semibold mb-2 ${dark ? "text-white" : "text-ink"}`}>{it.summary}</p>}
                    <p className={`text-sm md:text-base leading-relaxed ${dark ? "text-white/70" : "text-ink-soft"}`}>{it.detail}</p>
                  </div>
                  {it.variant && (
                    <div className="relative h-[330px] w-[190px] mx-auto rounded-[28px] overflow-hidden border-[1.5px] border-ink/15 bg-ink/5">
                      {it.variant === "pro" ? (
                        <img src="/videos/pro.jpg" alt={it.title} className="absolute inset-0 w-full h-full object-contain" />
                      ) : (
                        <VideoPlayer src={`videos/${it.variant}-flow.webm`} label={it.title} contain className="absolute inset-0 w-full h-full" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
