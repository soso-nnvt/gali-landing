import { TransitionLink } from "@/components/transition";
import { Marquee } from "@/components/Marquee";
import { WORDMARK_WHITE } from "@/lib/gali";

const COLS = [
  { h: "Product", links: [["How it works", "/how-it-works"], ["Sell on Gali", "/sell"], ["FAQ", "/faq"], ["Open app", "https://app.gali.com.ng"]] },
  { h: "Company", links: [["About", "/about"], ["Stories", "/stories"], ["Pricing", "/pricing"], ["Sign up", "/signup"]] },
  { h: "Trust", links: [["Safety & Escrow", "/faq"], ["Privacy", "#"], ["Terms", "#"], ["Campuses", "/how-it-works"]] },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white relative overflow-hidden grain border-t-[6px] border-acid">
      <div className="container-edge pt-16 pb-10">
        <div className="flex flex-col lg:flex-row justify-between gap-14">
          <div className="max-w-xl">
            <img src={WORDMARK_WHITE} alt="Gali" className="mt-6 w-full max-w-[460px]" />
            <p className="mt-6 text-white/55 text-base max-w-md">The campus marketplace with escrow. Buy and sell safely within your university - money stays locked until you meet and inspect in person.</p>
            <a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="btn btn-lime mt-7">Get the app</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 items-center">
            {COLS.map((c) => (
              <div key={c.h}>
                <h4 className="eyebrow !text-acid mb-4">{c.h}</h4>
                <ul className="space-y-3 text-sm">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      {href.startsWith("http") || href === "#" ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-white/70 hover:text-acid transition-colors">{label}</a>
                      ) : (
                        <TransitionLink href={href} className="text-white/70 hover:text-acid transition-colors">{label}</TransitionLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-y border-white/15 bg-acid text-ink">
        <Marquee speed={24}>
          {["Campus verified", "Escrow locked", "Safe handoff", "Pay in Naira", "No scams", "No wahala"].map((t, i) => (
            <span key={i} className="px-8 font-display font-extrabold text-2xl uppercase tracking-tight flex items-center gap-8">
              {t}
              <span className="text-ink/70">&#10022;</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-edge py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
        <span className="font-mono leading-tight">Gali Digital - RC 8662494<br />Made in Nigeria</span>
        <span className="font-mono"><a href="https://www.snapchat.com/@abdulsoburrr" target="_blank" rel="noreferrer" className="hover:text-acid transition-colors">Built with &#10084;&#65039; by Abdulsobur</a></span>
        <span className="font-mono">Trade on campus.</span>
      </div>
    </footer>
  );
}
