import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { TransitionLink } from "@/components/transition";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Campus buying and selling guides, escrow safety tips, and real stories from Nigerian students trading on Gali.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 pb-20 container-edge">
      <header className="max-w-2xl mb-12">
        <span className="eyebrow">The Gali Blog</span>
        <h1 className="display text-[clamp(2.2rem,5vw,3.4rem)] mt-4">Campus trading, decoded.</h1>
        <p className="mt-3 text-ink-faint">
          Guides, safety tips, and stories to help you buy and sell smarter on your campus.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-ink-faint">Posts coming soon.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <TransitionLink
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card p-6 flex flex-col group hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-ink-faint mb-3">
                <span className="text-acid">{p.category}</span>
                <span>/</span>
                <span>{p.readingTime}</span>
              </div>
              <h2 className="font-display font-extrabold text-xl leading-snug group-hover:text-acid transition-colors">
                {p.title}
              </h2>
              <p className="mt-3 text-sm text-ink-faint line-clamp-3">{p.description}</p>
              <div className="mt-5 text-xs text-ink-faint">
                {p.author} ·{" "}
                {new Date(p.date).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </TransitionLink>
          ))}
        </div>
      )}
    </div>
  );
}
