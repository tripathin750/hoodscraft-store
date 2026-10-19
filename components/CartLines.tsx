"use client";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { money } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { useStore } from "./Providers";

export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, setQty, remove } = useStore();
  return (
    <ul className="divide-y divide-line">
      {lines.map((l) => {
        const p = getProduct(l.slug)!;
        const hex = p.colours.find((c) => c.name === l.colour)?.hex;
        const max = p.stock[l.size] ?? 0;
        return (
          <li key={`${l.slug}${l.size}${l.colour}`} className="flex gap-4 py-4">
            <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-char"><ProductImage product={p} colourHex={hex} sizes="96px" /></div>
            <div className="flex flex-1 flex-col">
              <Link href={`/products/${p.slug}`} onClick={onNavigate} className="font-display text-lg font-bold leading-tight hover:text-volt">{p.name}</Link>
              <p className="text-sm text-silver">{l.colour} · {l.size}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex items-center border border-line" role="group" aria-label={`Quantity for ${p.name}`}>
                  <button className="h-11 w-11 hover:text-volt" aria-label="Decrease quantity" onClick={() => setQty(l, l.qty - 1)} disabled={l.qty <= 1}>−</button>
                  <span className="w-8 text-center text-sm" aria-live="polite">{l.qty}</span>
                  <button className="h-11 w-11 hover:text-volt disabled:opacity-40" aria-label="Increase quantity" onClick={() => setQty(l, l.qty + 1)} disabled={l.qty >= max}>+</button>
                </div>
                <p className="font-semibold">{money(p.price * l.qty)}</p>
              </div>
              <button className="mt-1 self-start text-xs uppercase tracking-[.14em] text-silver underline hover:text-crimson" onClick={() => remove(l)}>Remove</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
