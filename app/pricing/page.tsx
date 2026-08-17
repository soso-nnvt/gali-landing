import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Plans for buyers and sellers on Gali.",
};

export default function Page() {
  return (
    <section className="pt-32 pb-20 container-edge">
      <div className="max-w-2xl mx-auto text-center">
        <span className="eyebrow">Coming soon</span>
        <h1 className="display text-[clamp(2.2rem,5.5vw,3.5rem)] mt-4">Simple pricing, soon.</h1>
        <p className="mt-3 text-ink-faint">Standard listings stay free. Pro adds a verified badge, lower fees, and unlimited listings. Full pricing lands here shortly.</p>
        <a href="/sell" className="btn btn-lime mt-8 inline-flex">Start selling</a>
      </div>
    </section>
  );
}
