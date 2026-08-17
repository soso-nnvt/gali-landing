"use client";
import Image from "next/image";
import { Illustration } from "@/components/Duotone";
import { Reveal, CountUp, CursorSpotlight } from "@/components/motion";
import { SplitReveal } from "@/components/SplitReveal";
import EscrowAnimation from "@/components/EscrowAnimation";
import { Magnetic } from "@/components/Magnetic";
import { Marquee } from "@/components/Marquee";
import { Accordion, AccordionItem } from "@/components/Accordion";
import { TransitionLink } from "@/components/transition";
import { Product, Campus, formatNaira } from "@/lib/gali";

function LiveStats() {
  return (
    <section className="section container-edge">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {[
          { n: 100, s: "+", label: "Live listings on Gali" },
          { n: 2, s: "", label: "Campuses already on Gali" },
          { n: 1200, s: "+", label: "Students trading safe" },
        ].map((st, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="card p-5 sm:p-8">
              <div className="display text-3xl sm:text-4xl md:text-5xl"><CountUp to={st.n} suffix={st.s} /></div>
              <div className="mt-2 text-ink-faint text-xs sm:text-sm">{st.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeaturedListings({ products }: { products: Product[] }) {
  return (
    <section className="section container-edge">
      <Reveal>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="eyebrow">Live from your campus</span>
            <SplitReveal as="h2" className="display text-4xl mt-3">What students are selling today</SplitReveal>
          </div>
          <Magnetic><a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="btn btn-ghost">Open the app</a></Magnetic>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.08}>
            <a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="card overflow-hidden block hover:-translate-y-1 transition-transform min-w-0">
              <div className="relative aspect-[4/3] bg-canvas">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center"><Illustration name="parcel" className="w-16 h-16 text-ink-faint" /></div>
                )}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink/80 text-white text-[11px] font-mono">{p.categoryName || p.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold truncate">{p.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display font-bold text-lg">{formatNaira(p.price)}</span>
                  <span className="text-xs text-ink-faint">{p.salesCount || 0} sold</span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SeeItWork() {
  const items: AccordionItem[] = [
    {
      id: "buy",
      icon: "search",
      title: "Buy flow",
      summary: "Find it. Pay. Meet. Own it.",
      detail:
        "Search your campus, tap a listing, and pay straight into escrow. The seller sees it is held - not released. You then meet at your school's handoff spot, inspect in person, and tap release. Money moves only when you're sure.",
      variant: "buy",
    },
    {
      id: "sell",
      icon: "parcel",
      title: "Sell flow",
      summary: "Snap. List. Get paid.",
      detail:
        "Open your store, drop in a photo and a price, and you're live in two minutes. When a buyer pays, the cash is locked in escrow. You hand over the item, they tap release, and the money lands with you - no chasing transfers.",
      variant: "sell",
    },
    {
      id: "escrow",
      icon: "lock",
      title: "Escrow usage",
      summary: "The money waits for you.",
      detail:
        "Escrow is the whole point. It holds the buyer's cash safely between pay and handoff, so neither side can ghost the other. Release confirms the deal; dispute sends it straight back. Trust, built in.",
      variant: "escrow",
    },
    {
      id: "pro",
      icon: "spark",
      title: "Pro features",
      summary: "For the campus hustlers.",
      detail:
        "Pro gives you a verified badge, lower fees, and unlimited listings. Built for the student entrepreneurs moving real volume - stand out, sell more, keep more.",
      variant: "pro",
    },
  ];
  return (
    <section className="section container-edge">
      <Reveal>
        <span className="eyebrow">See it work</span>
        <SplitReveal as="h2" className="display text-4xl mt-3 max-w-xl">Two minutes that explain the whole thing</SplitReveal>
      </Reveal>
      <p className="mt-4 text-ink-soft max-w-xl">Open any feature to watch the flow play out - right on the phone.</p>
      <div className="mt-10">
        <Accordion items={items} tone="light" defaultOpen={0} />
      </div>
    </section>
  );
}

function MarqueeBand() {
  const items = ["Campus verified", "Escrow locked", "Safe handoff", "Pay in Naira", "No scams", "No wahala"];
  return (
    <section className="py-7 border-y border-line bg-ink text-white overflow-hidden">
      <Marquee speed={26}>
        {items.map((t, i) => (
          <span key={i} className="px-8 font-display font-extrabold text-2xl md:text-3xl uppercase tracking-tight flex items-center gap-8">
            {t}
            <span className="text-acid">&#10022;</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function EscrowSection() {
  return (
    <section className="section container-edge">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="eyebrow">The escrow, drawn out</span>
          <SplitReveal as="h2" className="display text-4xl mt-3">Cash stays locked. You stay safe.</SplitReveal>
          <p className="mt-5 text-ink-soft max-w-md">
            Pay in the app and the money sits in escrow. You meet the seller at your campus handoff spot, inspect the item, and only then tap release. If it&apos;s not right, the cash goes back. No &ldquo;I sent it&rdquo;, no stories.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Pay - money moves to escrow, not the seller",
              "Meet at your campus spot and inspect",
              "Release with one tap, or get a refund if it's off",
            ].map((t, i) => (
              <li key={i} className="flex gap-3 items-start"><span className="mt-1 grid place-items-center w-6 h-6 rounded-full bg-acid text-ink shrink-0"><Illustration name="lock" className="w-3.5 h-3.5" /></span><span className="text-sm text-ink-soft">{t}</span></li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="w-full rounded-3xl border border-line bg-canvas p-6 md:p-10">
            <EscrowAnimation />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-mono text-ink-faint">
            <span>You pay</span><span>Escrow holds</span><span>Seller paid</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SellersCTA() {
  return (
    <section className="section container-edge">
      <CursorSpotlight className="card p-10 md:p-16 text-center relative overflow-hidden">
        <Reveal>
          <span className="eyebrow">For sellers</span>
          <SplitReveal as="h2" className="display text-5xl mt-3">Got stuff to sell? Your campus is your market.</SplitReveal>
          <p className="mt-5 text-ink-soft max-w-xl mx-auto">Open a free store in minutes. List textbooks, gadgets, food, whatever. Get paid through escrow, build a verified badge, and upgrade to Pro when you&apos;re ready to scale.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Magnetic><TransitionLink href="/sell" className="btn btn-lime">Start selling</TransitionLink></Magnetic>
            <Magnetic><TransitionLink href="/pricing" className="btn btn-ghost">See Pro plans</TransitionLink></Magnetic>
          </div>
        </Reveal>
      </CursorSpotlight>
    </section>
  );
}

export default function HomeSections({ products, campuses }: { products: Product[]; campuses: Campus[] }) {
  return (
    <>
      <LiveStats />
      <FeaturedListings products={products} />
      <SeeItWork />
      <MarqueeBand />
      <EscrowSection />
      <SellersCTA />
    </>
  );
}
