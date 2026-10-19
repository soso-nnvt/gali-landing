"use client";
import { Illustration } from "@/components/Duotone";

export default function SuccessScreen({
  title = "You're in!",
  message = "Your seller account is ready.",
  ctaLabel = "Go to your store",
  ctaHref = "https://app.gali.com.ng",
}: {
  title?: string;
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="text-center py-8">
      <span className="mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-acid text-ink mb-4">
        <Illustration name="spark" className="w-7 h-7" />
      </span>
      <h3 className="display text-2xl">{title}</h3>
      <p className="mt-2 text-ink-faint max-w-md mx-auto">{message}</p>
      <a
        href={ctaHref}
        target="_blank"
        rel="noreferrer"
        className="btn btn-lime mt-6 inline-flex"
      >
        {ctaLabel} <span aria-hidden>→</span>
      </a>
    </div>
  );
}
