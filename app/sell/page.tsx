import type { Metadata } from "next";
import SellContent from "@/components/sell/SellContent";

export const metadata: Metadata = {
  title: "Sell on Gali",
  description:
    "Turn what you have into cash on your campus. List free, get a verified storefront, and get paid through escrow the moment a buyer confirms.",
};

export default function Page() {
  return <SellContent />;
}
