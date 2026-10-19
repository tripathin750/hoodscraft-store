import { products, collections, getProduct } from "./products";
import { site } from "./site";

export type Meta = { title: string; description: string; index: boolean };

const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const hoodies = products.filter((p) => p.category === "hoodies");
const tees = products.filter((p) => p.category === "t-shirts");
const minPrice = (l: typeof products) => Math.min(...l.map((p) => p.price));

export const staticRoutes: Record<string, Meta> = {
  "/": { title: `${site.name} — Premium Oversized Streetwear from Pune`, description: `Oversized Lightning hoodies from ${rupee(minPrice(hoodies))} and bold graphic tees from ${rupee(minPrice(tees))}. Designed in Pune, India. Order on WhatsApp.`, index: true },
  "/shop": { title: `Shop All Hoodies & T-Shirts | ${site.name}`, description: `Browse all ${products.length} HOODSCRAFT pieces: heavyweight Lightning hoodies and oversized graphic tees. Prices from ${rupee(minPrice(tees))}.`, index: true },
  "/collections": { title: `Collections | ${site.name}`, description: `Shop HOODSCRAFT by collection: ${collections.map((c) => c.title).join(", ")}.`, index: true },
  "/about": { title: `About ${site.name} — Streetwear Designed in Pune`, description: "HOODSCRAFT is a Pune streetwear label making oversized, heavyweight hoodies and graphic tees in small runs.", index: true },
  "/contact": { title: `Contact ${site.name}`, description: `Contact HOODSCRAFT on WhatsApp ${site.contact.phone} or email ${site.contact.email}.`, index: true },
  "/faq": { title: `FAQs — Delivery, Returns & Sizing | ${site.name}`, description: "Answers about ordering, delivery across India, returns, sizing and restocks at HOODSCRAFT.", index: true },
  "/size-guide": { title: `Size Guide | ${site.name}`, description: "HOODSCRAFT hoodies and tees are cut oversized, sizes S to XXL. See how to choose your size.", index: true },
  "/policies/shipping": { title: `Shipping Policy | ${site.name}`, description: "How HOODSCRAFT ships orders across India.", index: true },
  "/policies/returns": { title: `Returns & Exchanges | ${site.name}`, description: "HOODSCRAFT returns and exchange policy.", index: true },
  "/policies/privacy": { title: `Privacy Policy | ${site.name}`, description: "How HOODSCRAFT handles your information.", index: true },
  "/policies/terms": { title: `Terms & Conditions | ${site.name}`, description: "Terms of ordering from HOODSCRAFT.", index: true },
  "/cart": { title: `Your Cart | ${site.name}`, description: "Your HOODSCRAFT cart.", index: false },
  "/checkout": { title: `Checkout | ${site.name}`, description: "Send your HOODSCRAFT order on WhatsApp.", index: false },
  "/wishlist": { title: `Wishlist | ${site.name}`, description: "Your saved HOODSCRAFT pieces.", index: false },
};

export const allPaths = () => [...Object.keys(staticRoutes), ...products.map((p) => `/products/${p.slug}`)];

export function metaFor(path: string): Meta {
  const m = path.match(/^\/products\/([\w-]+)$/);
  if (m) {
    const p = getProduct(m[1]);
    if (p) {
      const kind = p.category === "hoodies" ? "Oversized Hoodie" : "Oversized Graphic T-Shirt";
      return { title: `${p.name} ${kind} — ${rupee(p.price)} | ${site.name}`, description: `${p.name} ${kind.toLowerCase()} by HOODSCRAFT, ${rupee(p.price)} (MRP ${rupee(p.compareAt ?? p.price)}). ${p.description}`.slice(0, 300), index: true };
    }
  }
  return staticRoutes[path] ?? { title: `Page not found | ${site.name}`, description: "This page could not be found.", index: false };
}
