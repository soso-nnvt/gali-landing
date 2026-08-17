import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories",
  description: "Real trades, sellers, and campuses making moves on Gali.",
};

export default function Page() {
  return (
    <section className="pt-32 pb-20 container-edge">
      <div className="max-w-2xl mx-auto text-center">
        <span className="eyebrow">Coming soon</span>
        <h1 className="display text-[clamp(2.2rem,5.5vw,3.5rem)] mt-4">Stories on the way.</h1>
        <p className="mt-3 text-ink-faint">We&apos;re collecting the best campus trade stories to share here. List something, make a sale, and you might be featured.</p>
        <a href="/" className="btn btn-lime mt-8 inline-flex">Back home</a>
      </div>
    </section>
  );
}
