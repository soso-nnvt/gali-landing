import { GaliOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "How Gali works";

export default function Image() {
  return GaliOg({ title: "Escrow in three simple steps", kicker: "How it works" });
}
