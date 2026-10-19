import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Gali is a campus commerce platform where verified university students buy and sell through built-in escrow payments. Live at ABUAD, rolling out across Nigeria.",
};

export default function Page() {
  return <AboutContent />;
}
