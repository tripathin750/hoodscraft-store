"use client";
import Link from "next/link";
import { useState } from "react";
import { Product, inStock } from "@/lib/products";
import { money } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { useStore } from "./Providers";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add, wishlist, toggleWish } = useStore();
  const [quick, setQuick] = useState(false);
  const [colourIdx, setColourIdx] = useState(0);
  const [msg, setMsg] = useState("");
  const sold = !inStock(product);
  const wished = wishlist.includes(product.slug);
  const colour = product.colours[colourIdx];

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-char">
        <Link href={`/products/${product.slug}`} aria-label={product.name} className="absolute inset-0 block transition-transform duration-500 ease-out md:group-hover:scale-[1.04]">
          <ProductImage product={product} colourHex={colour.hex} priority={priority} />
        </Link>
        <div className="absolute left-3 top-3 flex max-w-[calc(100%-3.25rem)] flex-col items-start gap-1 text-[9px] font-bold uppercase tracking-[.1em] sm:text-[11px] sm:tracking-[.14em]">
          {sold && <span className="bg-bone px-2 py-1 text-ink">Sold out</span>}
          {!sold && product.compareAt && <span className="bg-crimson px-2 py-1 text-white">-{Math.round((1 - product.price / product.compareAt) * 100)}%</span>}
          {!sold && product.badge && <span className="bg-volt px-2 py-1 text-ink">{product.badge}</span>}
          {!sold && product.isNew && <span className="bg-volt px-2 py-1 text-ink">New</span>}
        </div>
        <button onClick={() => toggleWish(product.slug)} aria-pressed={wished} aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-black">
          <svg key={String(wished)} className={wished ? "heart-pop" : ""} width="20" height="20" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" /></svg>
        </button>
        {!sold && (
          <div className={`absolute inset-x-0 bottom-0 bg-ink/95 p-3 transition duration-300 ${quick ? "translate-y-0" : "translate-y-full lg:group-hover:translate-y-0 lg:group-focus-within:translate-y-0"}`}>
            <p className="label mb-2">Quick add — select size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const out = (product.stock[s] ?? 0) <= 0;
                return (
                  <button key={s} disabled={out} onClick={() => { add({ slug: product.slug, size: s, colour: colour.name, qty: 1 }); setQuick(false); setMsg(`Added ${s}`); }}
                    className="min-h-11 min-w-11 border border-line px-2 text-sm font-semibold transition hover:border-volt hover:text-volt disabled:cursor-not-allowed disabled:text-silver/40 disabled:line-through">
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 flex min-w-0 flex-col items-start gap-1">
        <div className="min-w-0">
          <h3 className="text-xl leading-tight"><Link href={`/products/${product.slug}`} className="hover:text-volt">{product.name}</Link></h3>
          <p className="mt-1 flex items-center gap-2 text-sm">
            <span className="font-semibold">{money(product.price)}</span>
            {product.compareAt && <s className="text-silver">{money(product.compareAt)}</s>}
          </p>
        </div>
        {!sold && (
          <button onClick={() => setQuick((q) => !q)} aria-expanded={quick} className="-ml-2 min-h-11 px-2 text-xs font-bold uppercase tracking-[.14em] text-silver hover:text-volt lg:hidden">Quick add</button>
        )}
      </div>
      {product.colours.length > 1 && (
        <div className="mt-2 flex gap-2" role="group" aria-label="Colour">
          {product.colours.map((c, i) => (
            <button key={c.name} onClick={() => setColourIdx(i)} aria-label={c.name} aria-pressed={i === colourIdx} className="grid h-7 w-7 place-items-center">
              <span className={`h-4 w-4 rounded-full border ${i === colourIdx ? "ring-2 ring-volt ring-offset-2 ring-offset-ink" : ""}`} style={{ background: c.hex, borderColor: "#555" }} />
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">{msg}</p>
    </article>
  );
}
