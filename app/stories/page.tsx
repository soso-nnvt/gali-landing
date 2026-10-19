import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { Illustration } from "@/components/Duotone";

export const metadata: Metadata = {
  title: "Stories",
  description: "Real campus trades, sellers, and the students making moves with Gali.",
};

const STORIES = [
  {
    campus: "University of Lagos",
    name: "Adaeze, 300L",
    title: "Sold her mini-fridge in a day",
    body: "Moving out for the break, Adaeze listed her fridge with escrow. A buyer two hostels away paid, Gali held the money until pickup, and she cashed out the same evening.",
    tag: "Electronics",
  },
  {
    campus: "UNN",
    name: "Tunde, 200L",
    title: "From textbooks to side income",
    body: "Tunde started reselling past questions and used textbooks. With a verified store and lower Pro fees, what began as clearing his shelf became a steady semester hustle.",
    tag: "Books",
  },
  {
    campus: "OAU",
    name: "Zainab, 400L",
    title: "No more 'send money first'",
    body: "After a bad experience off-platform, Zainab only trades where payment is protected. On Gali she buys beauty products knowing the seller is only paid after she confirms delivery.",
    tag: "Beauty",
  },
  {
    campus: "UI",
    name: "Emeka, 300L",
    title: "Claimed the Pioneer Plan",
    body: "Emeka grabbed the free Pioneer Vendor Plan during launch. Zero fees for 30 days let him test his thrift drop without risk, and his first three sales covered his next restock.",
    tag: "Fashion",
  },
];

export default function Page() {
  return (
    <section className="pt-32 pb-24 container-edge">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow">Stories</span>
          <h1 className="display text-[clamp(2.4rem,6vw,4rem)] mt-4">Campus trade, told straight.</h1>
          <p className="mt-4 text-ink-faint text-lg">Students are buying, selling, and building side hustles on Gali every day. Here are a few we are watching.</p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-14">
        {STORIES.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.05}>
            <article className="card p-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wide text-ink-faint">{s.campus}</span>
                <span className="text-[10px] font-bold uppercase tracking-wide bg-acid/15 text-ink px-2 py-1 rounded-full">{s.tag}</span>
              </div>
              <h2 className="display text-xl mt-4">{s.title}</h2>
              <p className="text-ink-faint mt-3 text-sm flex-1">{s.body}</p>
              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-line">
                <span className="grid place-items-center w-8 h-8 rounded-full bg-ink text-acid text-sm font-bold">{s.name.charAt(0)}</span>
                <span className="text-sm font-medium">{s.name}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="card mt-14 p-8 text-center bg-ink text-white">
          <Illustration name="spark" className="w-8 h-8 mx-auto text-acid" />
          <h2 className="display text-2xl mt-4">Your story could be next.</h2>
          <p className="text-white/70 mt-2 max-w-xl mx-auto">List something this week. Make a sale, and you might be featured right here.</p>
          <a href="/signup" className="btn btn-lime mt-6 inline-flex">Start selling</a>
        </div>
      </Reveal>
    </section>
  );
}
