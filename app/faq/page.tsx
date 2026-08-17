import type { Metadata } from "next";
import FaqContent from "@/components/faq/FaqContent";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about escrow, campuses, selling, fees, and safety on Gali - the campus marketplace with escrow.",
};

const faqs = [
  { q: "Is Gali really escrow-backed?", a: "Yes. When you pay, the money goes into escrow - not the seller's pocket. It only releases after you meet, inspect, and confirm the item is yours." },
  { q: "What if the item isn't as described?", a: "Don't release. The cash stays in escrow until you're satisfied. If it's off, open a dispute and the money comes back to you." },
  { q: "Which campuses are on Gali?", a: "We're live across several Nigerian universities and adding more. Your campus appears when you sign up." },
  { q: "How much does it cost to sell?", a: "Listing is free on the standard plan. Pro gives you a verified badge, lower fees, and unlimited listings." },
  { q: "Can I sell food or services?", a: "Yes - textbooks, gadgets, fashion, food, and more. As long as it's allowed on your campus, list it." },
  { q: "Is my money safe?", a: "Escrow protects both sides. You never pay a stranger directly; the release is always in your hands." },
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
