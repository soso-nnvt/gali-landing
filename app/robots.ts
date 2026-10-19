import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/search"] }],
    sitemap: "https://gali.com.ng/sitemap.xml",
    host: "gali.com.ng",
  };
}
