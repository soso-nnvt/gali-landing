import type { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free, Pro, and the Pioneer Vendor Plan for campus sellers on Gali. Lower fees, verified stores, escrow payouts.",
};

export default function Page() {
  return <PricingClient />;
}
