import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Gali and the team building safer campus trade.",
};

export default function Page() {
  return (
    <section className="pt-32 pb-20 container-edge">
      <div className="max-w-2xl mx-auto text-center">
        <span className="eyebrow">Coming soon</span>
        <h1 className="display text-[clamp(2.2rem,5.5vw,3.5rem)] mt-4">We&apos;re just getting started.</h1>
        <p className="mt-3 text-ink-faint">Gali began as a fix for a simple problem: buying and selling on campus shouldn&apos;t feel risky. We&apos;re putting the final touches on our story - come back soon.</p>
        <a href="/" className="btn btn-lime mt-8 inline-flex">Back home</a>
      </div>
    </section>
  );
}
