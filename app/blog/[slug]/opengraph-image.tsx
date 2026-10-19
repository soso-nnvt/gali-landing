import { GaliOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getPost, getAllPosts } from "@/lib/blog";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return GaliOg({
    title: post?.title ?? "Gali Blog",
    kicker: post?.category ?? "Blog",
  });
}
