import { GaliOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sell on Gali";

export default function Image() {
  return GaliOg({ title: "Open your campus storefront", kicker: "Sell on Gali" });
}
