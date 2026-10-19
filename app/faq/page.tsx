import type { Metadata } from "next";
import FaqContent from "@/components/faq/FaqContent";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about escrow, campuses, selling, fees, and safety on Gali - the campus marketplace with escrow for Nigerian students.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  { q: "Is Gali really escrow-backed?", a: "Yes. When you pay, the money goes into escrow - not the seller's pocket. It only releases after you meet, inspect, and confirm the item is yours." },
  { q: "What if the item isn't as described?", a: "Don't release. The cash stays in escrow until you're satisfied. If it's off, open a dispute and the money comes back to you." },
  { q: "Which campuses are on Gali?", a: "We're live across several Nigerian universities and adding more. Your campus appears when you sign up." },
  { q: "How much does it cost to sell?", a: "Listing is free on the standard plan. Pro gives you a verified badge, lower fees, and unlimited listings." },
  { q: "Can I sell food or services?", a: "Yes - textbooks, gadgets, fashion, food, and more. As long as it's allowed on your campus, list it." },
  { q: "Is my money safe?", a: "Escrow protects both sides. You never pay a stranger directly; the release is always in your hands." },
  { q: "How do I buy on campus safely?", a: "Meet in a public spot, inspect the item, and only confirm payment after you're happy. Gali locks the money in escrow so you stay protected the whole time." },
  { q: "What is escrow in simple terms?", a: "Escrow is a neutral hold on the money. The buyer pays into it, the seller delivers, and the funds release only after the buyer confirms the item is good." },
  { q: "Do I need a bank account to use Gali?", a: "Buyers can browse and trade once verified. Sellers connect payout details so escrow can release funds after a confirmed handoff." },
  { q: "Can I sell at ABUAD and other schools?", a: "Yes. Gali is built for Nigerian campuses. List your items and meet buyers at a nearby handoff spot on your own campus." },
  { q: "What if the seller never shows up?", a: "The money stays in escrow. Since it only releases on your confirmation, you never lose cash to a no-show - just cancel the trade." },
  { q: "How is Gali different from Facebook Marketplace?", a: "Gali verifies students and builds escrow into every trade, so you trade with real campus users and your money is protected until you confirm." },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqContent />
    </>
  );
}
