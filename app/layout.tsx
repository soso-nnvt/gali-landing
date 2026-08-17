import type { Metadata } from "next";
import { Figtree, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import TransitionProvider from "@/components/transition";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700", "800", "900"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"], display: "swap" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://gali.com.ng"),
  title: { default: "Gali - The Campus Marketplace with Escrow", template: "%s - Gali" },
  description:
    "Buy and sell safely within your university. Gali locks payments in escrow until you inspect items in person at your campus handoff spot.",
  openGraph: {
    title: "Gali - The Campus Marketplace with Escrow",
    description: "Buy and sell safely within your university. Payments held in escrow until you meet and inspect in person.",
    url: "https://gali.com.ng",
    siteName: "Gali",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Gali - The Campus Marketplace with Escrow", description: "Campus marketplace with escrow." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gali",
    url: "https://gali.com.ng",
    description: "Campus marketplace with escrow.",
  };
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
