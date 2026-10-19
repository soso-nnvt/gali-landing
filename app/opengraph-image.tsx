import { GaliOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Gali - The Campus Marketplace with Escrow";

export default function Image() {
  return GaliOg({
    title: "Buy and sell safely on your campus",
    kicker: "Campus Marketplace",
  });
}
