import Image from "next/image";
import type { Product } from "@/lib/products";

/** Shows the real image if one is listed in `product.images`; otherwise a clearly labelled placeholder. */
export function ProductImage({ product, view = 0, colourHex, priority = false, sizes = "(min-width:1024px) 25vw, 50vw" }: {
  product: Product; view?: number; colourHex?: string; priority?: boolean; sizes?: string;
}) {
  const src = product.images[view];
  if (src) {
    return <Image src={src} alt={`${product.name} — view ${view + 1}`} fill sizes={sizes} priority={priority} className="object-cover" />;
  }
  const fill = colourHex ?? product.colours[0].hex;
  const hoodie = product.category === "hoodies";
  const light = parseInt(fill.slice(1, 3), 16) > 150;
  const stroke = light ? "#07080b" : "#f2f0ea";
  return (
    <div role="img" aria-label={`${product.name} — placeholder image ${view + 1}. Replace with product photography.`} className="absolute inset-0 grid place-items-center bg-gradient-to-b from-[#1a1e27] to-[#0c0e13]">
      <svg viewBox="0 0 120 120" className="w-[70%]" aria-hidden="true">
        {hoodie ? (
          <>
            <path d="M36 26 Q60 40 84 26 L110 44 L102 98 L90 96 V108 H30 V96 L18 98 L10 44 Z" fill={fill} stroke="#3a4050" strokeWidth="1" />
            <path d="M38 26 Q60 4 82 26 Q60 36 38 26Z" fill={fill} stroke="#3a4050" strokeWidth="1" />
          </>
        ) : (
          <path d="M34 22 L8 40 L20 60 L32 52 V108 H88 V52 L100 60 L112 40 L86 22 Q60 40 34 22Z" fill={fill} stroke="#3a4050" strokeWidth="1" />
        )}
        {view === 0 && <path d="M64 52 L52 72 H62 L55 90 L72 66 H62 Z" fill="none" stroke={stroke} strokeWidth="1.2" opacity=".6" />}
        {view === 1 && <line x1="60" y1="46" x2="60" y2="100" stroke={stroke} strokeWidth="1" opacity=".3" />}
        {view >= 2 && <circle cx="60" cy="64" r="10" fill="none" stroke={stroke} strokeWidth="1" opacity=".4" />}
      </svg>
      <span className="absolute bottom-3 left-3 text-[10px] tracking-[.2em] uppercase text-silver/70">Photo placeholder · view {view + 1}</span>
    </div>
  );
}
