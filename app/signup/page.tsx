import type { Metadata } from "next";
import SignupForm from "@/components/signup/SignupForm";

export const metadata: Metadata = {
  title: "Get started",
  description:
    "Create your Gali account. Buyers get a safe campus marketplace; sellers get a verified storefront with escrow-backed payouts.",
};

export default function Page() {
  return (
    <section className="pt-32 pb-20 container-edge">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <span className="eyebrow">Get started</span>
        <h1 className="display text-[clamp(2.2rem,5.5vw,3.5rem)] mt-4">Join your campus marketplace.</h1>
        <p className="mt-3 text-ink-faint">Create an account in under a minute. Already have one? <a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="underline">Open the app</a>.</p>
      </div>
      <SignupForm />
    </section>
  );
}
