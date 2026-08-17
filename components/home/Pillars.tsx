"use client";
import { Accordion, AccordionItem } from "@/components/Accordion";
import { SplitReveal } from "@/components/SplitReveal";

const items: AccordionItem[] = [
  {
    id: "campus",
    icon: "campus",
    title: "Campus-verified",
    summary: "Real students, real schools.",
    detail:
      "Every seller is tied to a real school email and student ID. No random strangers, no fake shops hiding in a WhatsApp group. You see the campus before you trust - so the person on the other end is actually from your school.",
    variant: "verify",
  },
  {
    id: "escrow",
    icon: "lock",
    title: "Escrow custody",
    summary: "Money locked the second you pay.",
    detail:
      "The cash moves into escrow the moment you pay - not to the seller. It sits there safe until you meet, inspect, and tap release. You hold the keys the whole time. Only release when you're happy.",
    variant: "escrow",
  },
  {
    id: "cheap",
    icon: "wallet",
    title: "Easy and cheap",
    summary: "Free to list. Low fees. Naira.",
    detail:
      "Open a store in two minutes. List free, pay low fees, and trade in Naira straight from your phone. No shop rent, no stress, no foreign-currency wahala. Keep more of what you sell.",
    variant: "sell",
  },
  {
    id: "handoff",
    icon: "shield",
    title: "Safe handoff",
    summary: "Meet where everyone knows.",
    detail:
      "Every school has known meetup spots. Inspect the item in person, no pressure. Only release when it's right - and if it isn't, the money comes straight back to you. Safe by design.",
    variant: "buy",
  },
];

export default function Pillars() {
  return (
    <section className="relative bg-ink text-white overflow-hidden">
      <div className="container-edge py-20 md:py-28">
        <span className="eyebrow !text-acid">Why Gali is different</span>
        <SplitReveal as="h2" className="display text-4xl md:text-5xl mt-3 max-w-2xl">Not another marketplace. A campus one, done right.</SplitReveal>
        <p className="mt-4 text-white/60 max-w-xl">Tap any reason to see how it works - with the app right there beside it.</p>
        <div className="mt-12">
          <Accordion items={items} tone="dark" defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
