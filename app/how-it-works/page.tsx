import type { Metadata } from "next";
import HowContent from "@/components/how/HowContent";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "See how Gali keeps campus trade safe: browse verified listings, pay into escrow, meet at your campus handoff spot, inspect, and release.",
};

export default function Page() {
  return <HowContent />;
}
