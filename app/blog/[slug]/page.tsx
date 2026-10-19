import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/blog";
import { TransitionLink } from "@/components/transition";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `https://gali.com.ng/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      siteName: "Gali",
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    dateModified: post.date,
    url: `https://gali.com.ng/blog/${post.slug}`,
    publisher: { "@type": "Organization", name: "Gali", url: "https://gali.com.ng" },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <article className="pt-32 pb-20 container-edge">
      <div className="max-w-2xl mx-auto">
        <TransitionLink href="/blog" className="text-xs font-mono text-ink-faint hover:text-acid">
          ← All posts
        </TransitionLink>
        <div className="flex items-center gap-2 text-xs font-mono text-ink-faint mt-6">
          <span className="text-acid">{post.category}</span>
          <span>/</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="display text-[clamp(2rem,5vw,3rem)] mt-3">{post.title}</h1>
        <p className="mt-3 text-ink-faint">{post.description}</p>
        <div className="mt-4 text-xs text-ink-faint">
          By {post.author} ·{" "}
          {new Date(post.date).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
        <hr className="my-8 border-line" />
        <div className="blog-content">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-paper p-6 text-center">
          <p className="font-display font-extrabold text-lg">Ready to trade on your campus?</p>
          <a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="btn btn-lime mt-4 inline-flex">
            Get the app
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
