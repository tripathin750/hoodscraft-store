"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Product, products, inStock } from "@/lib/products";
import { money } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { ProductCard } from "./ProductCard";
import { useStore } from "./Providers";
import { useRouter } from "next/navigation";



export function ProductClient({ product }: { product: Product }) {
  const { add, pushRecent, recent, wishlist, toggleWish } = useStore();
  const router = useRouter();
  const [view, setView] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState("");
  const [colour, setColour] = useState(product.colours[0].name);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const sizeRef = useRef<HTMLFieldSetElement>(null);
  const VIEWS = Math.max(product.images.length, 1);
  const hex = product.colours.find((c) => c.name === colour)?.hex;
  const sold = !inStock(product);
  const left = size ? product.stock[size] ?? 0 : 0;
  const wished = wishlist.includes(product.slug);

  useEffect(() => { pushRecent(product.slug); }, [product.slug, pushRecent]);

  function validate() {
    if (!size) { setError("Please select a size."); sizeRef.current?.focus(); return false; }
    setError("");
    return true;
  }
  const addToCart = () => validate() && add({ slug: product.slug, size, colour, qty });
  const buyNow = () => { if (validate()) { add({ slug: product.slug, size, colour, qty }); router.push("/checkout"); } };

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);
  const recentProducts = recent.filter((s) => s !== product.slug).map((s) => products.find((p) => p.slug === s)).filter(Boolean).slice(0, 4) as Product[];

  return (
    <div className="container-x py-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-silver"><Link href="/shop" className="hover:text-volt">Shop</Link> / <Link href={`/shop?category=${product.category}`} className="hover:text-volt capitalize">{product.category}</Link></nav>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-3 md:grid-cols-[88px_1fr]">
          <div className="order-2 flex gap-2 md:order-1 md:flex-col" role="group" aria-label="Product images">
            {Array.from({ length: VIEWS }).map((_, i) => (
              <button key={i} onClick={() => setView(i)} aria-label={`Show image ${i + 1}`} aria-pressed={view === i} className={`relative aspect-[4/5] w-20 overflow-hidden border md:w-full ${view === i ? "border-volt" : "border-line"}`}>
                <ProductImage product={product} view={i} colourHex={hex} sizes="88px" />
              </button>
            ))}
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] cursor-zoom-in overflow-hidden bg-char"
              onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
              onMouseLeave={() => setZoom(null)}>
              <div className="absolute inset-0 transition-transform duration-200" style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}>
                <ProductImage product={product} view={view} colourHex={hex} priority sizes="(min-width:1024px) 50vw, 100vw" />
              </div>
            </div>
            <p className="mt-2 text-xs text-silver">Hover to zoom on desktop.</p>
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <h1 className="text-3xl  leading-none">{product.name}</h1>
          <p className="mt-4 flex items-baseline gap-3 text-2xl">
            <span className="font-bold">{money(product.price)}</span>
            {product.compareAt && <s className="text-silver">{money(product.compareAt)}</s>}
          </p>
          {product.badge && <p className="mt-3 inline-block bg-volt px-3 py-1 font-display text-lg uppercase text-ink">{product.badge}</p>}
          <p className="mt-5 text-silver">{product.description}</p>

          {product.colours.length > 1 && (
            <fieldset className="mt-6"><legend className="label mb-2">Colour: <span className="text-bone">{colour}</span></legend>
              <div className="flex gap-2">{product.colours.map((c) => (
                <button key={c.name} onClick={() => setColour(c.name)} aria-pressed={colour === c.name} aria-label={c.name} className={`grid h-11 w-11 place-items-center border ${colour === c.name ? "border-volt" : "border-line"}`}><span className="h-6 w-6 rounded-full border border-silver/40" style={{ background: c.hex }} /></button>
              ))}</div>
            </fieldset>
          )}

          <fieldset ref={sizeRef} tabIndex={-1} className="mt-6 outline-none">
            <legend className="label mb-2 flex w-full justify-between"><span>Size {size && <span className="text-bone">: {size}</span>}</span><Link href="/size-guide" className="underline hover:text-volt">Size guide</Link></legend>
            <div className="flex flex-wrap gap-2">{product.sizes.map((s) => {
              const out = (product.stock[s] ?? 0) <= 0;
              return <button key={s} disabled={out} onClick={() => { setSize(s); setError(""); setQty(1); }} aria-pressed={size === s} className={`min-h-12 min-w-12 border px-3 font-semibold transition disabled:cursor-not-allowed disabled:text-silver/40 disabled:line-through ${size === s ? "border-volt bg-volt text-ink" : "border-line hover:border-silver"}`}>{s}</button>;
            })}</div>
            {error && <p role="alert" className="mt-2 text-sm text-volt">{error}</p>}
          </fieldset>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-line" role="group" aria-label="Quantity">
              <button className="h-12 w-12 hover:text-volt" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="w-10 text-center" aria-live="polite">{qty}</span>
              <button className="h-12 w-12 hover:text-volt" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(Math.max(left, 1), q + 1))}>+</button>
            </div>
            <p className={`text-sm ${sold ? "text-volt" : "text-silver"}`}>{sold ? "Sold out" : size ? (left <= 5 ? `Only ${left} left` : "In stock") : "Select a size to see availability"}</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button className="btn btn-primary" disabled={sold} onClick={addToCart}>{sold ? "Sold out" : "Add to cart"}</button>
            <button className="btn btn-ghost" disabled={sold} onClick={buyNow}>Buy now</button>
          </div>
          <button onClick={() => toggleWish(product.slug)} aria-pressed={wished} className="label mt-4 min-h-11 hover:text-volt">{wished ? "♥ In wishlist" : "♡ Add to wishlist"}</button>

          <div className="mt-8 divide-y divide-line border-y border-line">
            <Acc title="Specifications"><ul className="grid gap-1"><li>Fabric: {product.fabric}</li>{product.gsm && <li>GSM: {product.gsm}</li>}{product.details.map((d) => <li key={d}>{d}</li>)}</ul></Acc>
            <Acc title="Care instructions"><p>[Care instructions to be confirmed by HOODSCRAFT for this fabric.]</p></Acc>
            <Acc title="Shipping & returns"><p>[Shipping times, costs and returns window to be confirmed.] See the <Link className="underline" href="/policies/shipping">shipping</Link> and <Link className="underline" href="/policies/returns">returns</Link> policies.</p></Acc>
          </div>
        </div>
      </div>

      {related.length > 0 && <Strip title="You may also like" items={related} />}
      {recentProducts.length > 0 && <Strip title="Recently viewed" items={recentProducts} />}
    </div>
  );
}
const Acc = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <details className="group py-4 text-sm text-silver"><summary className="flex min-h-8 cursor-pointer list-none items-center justify-between font-display text-lg font-bold uppercase tracking-wider text-bone">{title}<span className="transition group-open:rotate-45">+</span></summary><div className="pt-3">{children}</div></details>
);
const Strip = ({ title, items }: { title: string; items: Product[] }) => (
  <section className="mt-24" aria-label={title}><h2 className="mb-6 text-2xl ">{title}</h2><div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.slug} product={p} />)}</div></section>
);
