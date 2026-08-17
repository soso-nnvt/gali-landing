import type { Metadata } from "next";
import { getProducts, getCampuses } from "@/lib/gali";
import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import HomeSections from "@/components/home/HomeSections";

export const metadata: Metadata = {
  description:
    "Gali is the campus marketplace with escrow. Buy and sell safely within your university - money stays locked until you meet and inspect in person.",
};

export default async function Page() {
  const [products, campuses] = await Promise.all([getProducts(12), getCampuses()]);
  return (
    <>
      <Hero />
      <Pillars />
      <HomeSections products={products} campuses={campuses} />
    </>
  );
}
