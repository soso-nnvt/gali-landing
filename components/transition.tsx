"use client";
import { createContext, useContext, useRef, useEffect, useCallback, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenisStore";

type Ctx = { navigate: (href: string) => void };
const TransitionCtx = createContext<Ctx>({ navigate: () => {} });
export const useTransitionRouter = () => useContext(TransitionCtx);

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const first = useRef(true);
  const busy = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (!href || href === pathname || busy.current) return;
      busy.current = true;
      const ov = overlay.current!;
      gsap.set(ov, { display: "block", transformOrigin: "bottom", scaleY: 0 });
      gsap.to(ov, {
        scaleY: 1,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          // Kill all ScrollTriggers (reverting pins + removing pin-spacers) BEFORE
          // navigation so the DOM matches what React expects at unmount. This fixes
          // "Failed to execute 'removeChild' on 'Node'" during client navigation.
          ScrollTrigger.getAll().forEach((t) => t.kill());
          router.push(href);
        },
      });
    },
    [pathname, router]
  );

  useEffect(() => {
    const ov = overlay.current!;
    const l = getLenis();
    if (l) l.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const reveal = () => {
      const root = document.getElementById("page-root");
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power2.out", delay: 0.04, clearProps: "transform" });
    };
    if (first.current) {
      first.current = false;
      gsap.set(ov, { display: "none", scaleY: 0 });
      reveal();
      return;
    }
    gsap.set(ov, { display: "block", transformOrigin: "top", scaleY: 1 });
    gsap.to(ov, {
      scaleY: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(ov, { display: "none" });
        busy.current = false;
      },
    });
    reveal();
    // Recompute trigger positions for the freshly mounted page.
    requestAnimationFrame(() => ScrollTrigger.refresh());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}
      <div ref={overlay} className="transition-overlay" aria-hidden />
    </TransitionCtx.Provider>
  );
}

export function TransitionLink({ href, children, className, onClick, ...rest }: { href: string; children: ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void; [k: string]: any }) {
  const { navigate } = useTransitionRouter();
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.(e);
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
