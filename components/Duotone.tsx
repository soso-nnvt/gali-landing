import { ReactNode } from "react";

// Mirrors the app's DuotoneIcon two-tone style (currentColor stroke + lime fill),
// using the site's --gali-lime token. viewBox 0 0 24 24.
const A = "var(--gali-lime)";

const sets: Record<string, ReactNode> = {
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill={A} fillOpacity="0.15" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={A} fillOpacity="0.15" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" fill={A} fillOpacity="0.15" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  wallet: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" fill={A} fillOpacity="0.15" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </>
  ),
  chat: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill={A} fillOpacity="0.15" />
  ),
  spark: (
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" fill={A} fillOpacity="0.15" />
  ),
  campus: (
    <>
      <path d="M3 9 12 3l9 6" />
      <path d="M5 9v10M9 9v10M15 9v10M19 9v10" />
      <path d="M3 19h18" />
      <rect x="10" y="12" width="4" height="7" fill={A} fillOpacity="0.18" />
    </>
  ),
  parcel: (
    <>
      <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
      <path d="M3 7l9 4 9-4" />
      <path d="M12 11v10" />
      <path d="M8 5l4 2 4-2" stroke={A} />
    </>
  ),
  handoff: (
    <>
      <path d="M17 3l4 4-4 4" />
      <path d="M21 7H8a4 4 0 0 0-4 4" />
      <path d="M7 21l-4-4 4-4" />
      <path d="M3 17h13a4 4 0 0 0 4-4" />
    </>
  ),
};

export function Illustration({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {sets[name] || sets.lock}
    </svg>
  );
}
