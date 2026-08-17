export const GALI_API = (process.env.GALI_API_BASE || "https://app.gali.com.ng").replace(/\/$/, "");
export const R2_BASE = (process.env.R2_PUBLIC || "https://pub-32cb790bb4ad44f18559fd6fdf139da7.r2.dev").replace(/\/$/, "");
export const LOGO = "https://assets.gali.com.ng/core/Gali_no-bg.png";
export const WORDMARK_BLACK = "https://assets.gali.com.ng/core/Gali%20Wordmark%20Blackmain.svg";
export const WORDMARK_WHITE = "https://assets.gali.com.ng/core/Gali%20Wordmark%20Whitemain.svg";

export type Product = {
  id: string; slug: string; title: string; description?: string;
  price: number; salePrice?: number | null; imageUrl?: string; images?: string[];
  isAvailable?: boolean; category?: string; categoryName?: string; categorySlug?: string;
  avgRating?: string; reviewsCount?: number; salesCount?: number; viewCount?: number; vendorEmail?: string;
};
export type Campus = { id: string; name: string; abbreviation: string; code: string; logo?: string; handoffZones?: string[] };

function normProduct(p: any): Product {
  return {
    id: p.id, slug: p.slug, title: p.title, description: p.description,
    price: Number(p.price || 0), salePrice: p.salePrice != null ? Number(p.salePrice) : null,
    imageUrl: p.imageUrl, images: p.images || [], isAvailable: p.isAvailable,
    category: p.category, categoryName: p.categoryName, categorySlug: p.categorySlug,
    avgRating: p.avgRating, reviewsCount: Number(p.reviewsCount || 0), salesCount: Number(p.salesCount || 0),
    viewCount: Number(p.viewCount || 0), vendorEmail: p.vendorEmail,
  };
}

export async function getProducts(limit = 12): Promise<Product[]> {
  try {
    const r = await fetch(`${GALI_API}/api/products`, { next: { revalidate: 300 }, headers: { accept: "application/json" } });
    if (!r.ok) return [];
    const j = await r.json();
    return (j?.data || []).slice(0, limit).map(normProduct);
  } catch { return []; }
}

export async function getCampuses(): Promise<Campus[]> {
  try {
    const r = await fetch(`${GALI_API}/api/campuses`, { next: { revalidate: 600 }, headers: { accept: "application/json" } });
    if (!r.ok) return [];
    const j = await r.json();
    return j?.campuses || [];
  } catch { return []; }
}

export type Vendor = {
  id: string; slug: string; storeName: string; storeDescription?: string;
  storeLogo?: string; storeCategory?: string; campusName?: string; productCount?: number;
};
export type SearchResult = { products: Product[]; vendors: Vendor[] };

export async function getSearch(q: string, limit = 24): Promise<SearchResult> {
  if (!q || !q.trim()) return { products: [], vendors: [] };
  try {
    const r = await fetch(`${GALI_API}/api/search?q=${encodeURIComponent(q)}`, { next: { revalidate: 120 }, headers: { accept: "application/json" } });
    if (!r.ok) return { products: [], vendors: [] };
    const j = await r.json();
    const products = (j?.products || []).slice(0, limit).map(normProduct);
    const vendors = (j?.vendors || []).map(normVendor);
    return { products, vendors };
  } catch {
    return { products: [], vendors: [] };
  }
}

function normVendor(v: any): Vendor {
  return {
    id: v.id, slug: v.slug, storeName: v.storeName, storeDescription: v.storeDescription,
    storeLogo: v.storeLogo, storeCategory: v.storeCategory, campusName: v.campusName, productCount: v.productCount,
  };
}

export function formatNaira(kobo: number) {
  return "₦" + Math.round(kobo / 100).toLocaleString("en-NG");
}
