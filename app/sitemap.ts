import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const base = "https://gali.com.ng";
const staticRoutes = ["", "/about", "/how-it-works", "/pricing", "/sell", "/faq", "/stories", "/signup", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: base + r,
    lastModified: new Date(),
    changeFrequency: (r === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: r === "" ? 1 : r === "/blog" ? 0.7 : 0.8,
  }));
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
