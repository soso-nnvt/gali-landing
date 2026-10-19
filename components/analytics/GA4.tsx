"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export default function GA4() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    const url = window.location.pathname + window.location.search;
    (window as any).gtag?.("event", "page_view", { page_path: url });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_location: window.location.href });`}
      </Script>
    </>
  );
}
