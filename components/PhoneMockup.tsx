"use client";
import { ReactNode } from "react";

export default function PhoneMockup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-[300px] max-w-full ${className || ""}`}>
      <div
        className="relative rounded-[44px] bg-ink p-3"
        style={{ boxShadow: "12px 12px 0 0 rgba(26,26,26,0.14)" }}
      >
        <div className="relative rounded-[32px] overflow-hidden bg-canvas aspect-[9/19]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-32 h-6 bg-ink rounded-b-2xl" />
          <div className="absolute inset-0 z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
