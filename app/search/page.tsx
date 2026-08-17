import type { Metadata } from "next";
import Image from "next/image";
import { getSearch, formatNaira } from "@/lib/gali";
import { Illustration } from "@/components/Duotone";
import SearchPreview from "@/components/home/SearchPreview";

export const metadata: Metadata = {
  title: "Search - Gali",
  description: "Search textbooks, gadgets, food and more from verified students on your campus.",
};

const CATS = ["Academics & Books", "Beauty & Personal Care", "Fashion & Apparel", "Food & Drinks", "Tech & Gadgets"];

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const trimmed = q.trim();
  const search = trimmed ? await getSearch(trimmed, 48) : { products: [], vendors: [] };
  const products = search.products;
  const vendors = search.vendors;

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container-edge">
        <span className="eyebrow">Search Gali</span>
        <h1 className="display text-[clamp(2.2rem,5vw,3.5rem)] mt-3">What are you looking for?</h1>
        <div className="mt-6 max-w-xl">
          <SearchPreview />
        </div>

        {!trimmed ? (
          <div className="mt-16">
            <p className="text-ink-faint text-sm mb-4">Browse by category</p>
            <div className="flex flex-wrap gap-3">
              {CATS.map((c) => (
                <span key={c} className="px-4 py-2 rounded-full border border-line bg-paper text-sm">{c}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <p className="text-ink-soft mb-6">
              {products.length + vendors.length > 0 ? `${products.length + vendors.length} result${products.length + vendors.length === 1 ? "" : "s"} for ` : `No results for `}
              <span className="font-semibold text-ink">&ldquo;{trimmed}&rdquo;</span>

            </p>
            {products.length + vendors.length === 0 ? (
              <div className="card p-10 text-center max-w-md mx-auto">
                <Illustration name="search" className="w-12 h-12 text-ink-faint mx-auto" />
                <p className="mt-4 text-ink-soft">Nothing matched yet. Try another word, or open the app to see everything live on your campus.</p>
                <a href="https://app.gali.com.ng" target="_blank" rel="noreferrer" className="btn btn-lime mt-6">Open the app</a>
              </div>
            ) : (
              <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p: any) => (
                  <a key={p.id} href={`https://app.gali.com.ng/product/${p.slug || p.id}`} target="_blank" rel="noreferrer" className="card overflow-hidden block hover:-translate-y-1 transition-transform min-w-0">
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
                ))}
              </div>
              {vendors.length > 0 && (
                <div className="mt-12">
                  <p className="eyebrow mb-4">Campus stores</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendors.map((v: any) => (
                      <a key={v.id} href={`https://app.gali.com.ng/vendor/${v.slug || v.id}`} target="_blank" rel="noreferrer" className="card overflow-hidden block hover:-translate-y-1 transition-transform min-w-0">
                        <div className="relative aspect-[4/3] bg-canvas">
                          {v.storeLogo ? (
                            <Image src={v.storeLogo} alt={v.storeName} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 grid place-items-center"><Illustration name="campus" className="w-16 h-16 text-ink-faint" /></div>
                          )}
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink/80 text-white text-[11px] font-mono">{v.campusName || "Campus"}</span>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold truncate">{v.storeName}</h3>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-display font-bold text-lg">{v.productCount || 0} items</span>
                            <span className="text-xs text-ink-faint">Store</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
