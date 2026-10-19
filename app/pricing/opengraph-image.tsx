import { GaliOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Gali pricing";

export default function Image() {
  return GaliOg({ title: "Free to list. Lower fees for pros.", kicker: "Pricing" });
}
