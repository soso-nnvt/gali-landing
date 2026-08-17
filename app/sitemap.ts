import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gali.com.ng";
  const routes = ["", "/how-it-works", "/sell", "/faq", "/signup"];
  return routes.map((r) => ({
    url: base + r,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));
}
