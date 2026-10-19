import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) =>
        `<item><title>${escapeXml(p.title)}</title><link>https://gali.com.ng/blog/${p.slug}</link><guid>https://gali.com.ng/blog/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${escapeXml(p.description)}</description></item>`
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Gali Blog</title>
<link>https://gali.com.ng/blog</link>
<description>Campus marketplace guides, escrow safety, and student stories from Gali.</description>
<atom:link href="https://gali.com.ng/feed.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
