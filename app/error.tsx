"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Route error:", error); }, [error]);
  return (
    <div className="min-h-[80vh] grid place-items-center container-edge text-center">
      <div>
        <span className="eyebrow">Something tripped</span>
        <h1 className="display text-4xl mt-4">That page hiccupped.</h1>
        <p className="mt-3 text-ink-faint max-w-md mx-auto">No wahala - your data is safe. Give it another shot.</p>
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <button onClick={reset} className="btn btn-lime">Try again</button>
          <a href="/" className="btn btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}
