import { GaliOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "About Gali";

export default function Image() {
  return GaliOg({ title: "Built for Nigerian students", kicker: "About" });
}
