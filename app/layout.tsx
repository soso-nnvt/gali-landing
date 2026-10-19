import type { Metadata, Viewport } from "next";
import { Figtree, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import TransitionProvider from "@/components/transition";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import GA4 from "@/components/analytics/GA4";
import { siteConfig, sameAs } from "@/lib/site";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700", "800", "900"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"], display: "swap" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Gali - The Campus Marketplace with Escrow", template: "%s - Gali" },
  description: siteConfig.description,
  applicationName: "Gali",
  keywords: [
    "campus marketplace",
    "buy and sell on campus Nigeria",
    "student marketplace Nigeria",
    "escrow payment for students",
    "sell textbooks ABUAD",
    "ABUAD marketplace",
    "Nigerian student marketplace",
    "verified student sellers",
    "safe campus trading",
  ],
  authors: [{ name: "Gali Team" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Gali - The Campus Marketplace with Escrow",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Gali",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gali - The Campus Marketplace with Escrow",
    description: siteConfig.description,
    creator: siteConfig.twitter,
    site: siteConfig.twitter,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1A1A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      sameAs: sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/search?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteConfig.legalName,
      url: siteConfig.url,
      email: siteConfig.email,
      areaServed: { "@type": "Country", name: "Nigeria" },
      sameAs: sameAs,
    },
  ];

  return (
    <html lang="en" className={`${figtree.variable} ${manrope.variable} ${jbmono.variable}`}>
      <body>
        <CursorGlow />
        <ScrollProgress />
        <SmoothScroll>
          <TransitionProvider>
            <Nav />
            <main id="page-root">{children}</main>
            <Footer />
          </TransitionProvider>
        </SmoothScroll>
        <GA4 />
        {jsonLd.map((d, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
        ))}
      </body>
    </html>
  );
}
