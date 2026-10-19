"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { products, allColours, allSizes, inStock, priceRange } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const PAGE = 6;
const csv = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function ShopClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(PAGE);

  const q = sp.get("q")?.trim().toLowerCase() ?? "";
  const category = sp.get("category") ?? "";
  const sizes = csv(sp.get("size"));
  const colours = csv(sp.get("colour"));
  const maxPrice = Number(sp.get("max")) || 0;
  const onlyStock = sp.get("stock") === "1";
  const sort = sp.get("sort") ?? "newest";

  function set(k: string, v: string | null) {
    const n = new URLSearchParams(sp.toString());
    if (v) n.set(k, v); else n.delete(k);
    setShown(PAGE);
    router.replace(`/shop?${n.toString()}`, { scroll: false });
  }
  const toggle = (k: string, list: string[], v: string) => set(k, (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]).join(",") || null);

  const results = useMemo(() => {
    let r = products.filter((p) =>
      (!category || p.category === category) &&
      (!q || `${p.name} ${p.description} ${p.collection} ${p.category}`.toLowerCase().includes(q)) &&
      (!sizes.length || sizes.some((s) => (p.stock[s] ?? 0) > 0)) &&
      (!colours.length || p.colours.some((c) => colours.includes(c.name))) &&
      (!maxPrice || p.price <= maxPrice) &&
      (!onlyStock || inStock(p)));
    r = [...r].sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "popular" ? b.popularity - a.popularity : b.addedAt.localeCompare(a.addedAt));
    return r;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, category, sp.get("size"), sp.get("colour"), maxPrice, onlyStock, sort]);

  const chip = (active: boolean) => `min-h-11 min-w-11 border px-3 text-sm font-semibold transition ${active ? "border-volt bg-volt text-ink" : "border-line hover:border-silver"}`;
  const filters = (
    <div className="grid gap-7">
      <fieldset><legend className="label mb-3">Category</legend>
        <div className="flex flex-wrap gap-2">{[["", "All"], ["hoodies", "Hoodies"], ["t-shirts", "T-shirts"]].map(([v, l]) => <button key={l} aria-pressed={category === v} className={chip(category === v)} onClick={() => set("category", v || null)}>{l}</button>)}</div></fieldset>
      <fieldset><legend className="label mb-3">Size</legend>
        <div className="flex flex-wrap gap-2">{allSizes.map((s) => <button key={s} aria-pressed={sizes.includes(s)} className={chip(sizes.includes(s))} onClick={() => toggle("size", sizes, s)}>{s}</button>)}</div></fieldset>
      <fieldset><legend className="label mb-3">Colour</legend>
        <div className="flex flex-wrap gap-2">{allColours.map((c) => <button key={c.name} aria-pressed={colours.includes(c.name)} className={`${chip(colours.includes(c.name))} flex items-center gap-2`} onClick={() => toggle("colour", colours, c.name)}><span className="h-3 w-3 rounded-full border border-silver/50" style={{ background: c.hex }} />{c.name}</button>)}</div></fieldset>
      <div><label htmlFor="max" className="label mb-3 block">Max price {maxPrice ? `₹${maxPrice}` : "(any)"}</label>
        <input id="max" type="range" min={priceRange.min} max={priceRange.max} step={100} value={maxPrice || priceRange.max} onChange={(e) => set("max", Number(e.target.value) >= priceRange.max ? null : e.target.value)} className="w-full accent-[#bcdcff]" /></div>
      <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={onlyStock} onChange={(e) => set("stock", e.target.checked ? "1" : null)} className="h-5 w-5 accent-[#bcdcff]" />In stock only</label>
      <button className="label self-start underline hover:text-volt" onClick={() => router.replace("/shop")}>Clear all</button>
    </div>
  );

  return (
    <div className="container-x py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl ">{q ? `Search: “${sp.get("q")}”` : category === "hoodies" ? "Hoodies" : category === "t-shirts" ? "T-shirts" : "Shop all"}</h1>
          <p className="mt-1 text-silver" role="status" aria-live="polite">{results.length} {results.length === 1 ? "product" : "products"}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-ghost lg:hidden" aria-expanded={open} onClick={() => setOpen((o) => !o)}>Filters</button>
          <label className="sr-only" htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => set("sort", e.target.value)} className="input w-auto">
            <option value="newest">Newest</option><option value="popular">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Filters" className={`${open ? "block" : "hidden"} border border-line p-5 lg:block lg:border-0 lg:p-0`}>{filters}</aside>
        <div>
          {results.length === 0 ? (
            <div className="grid place-items-center gap-4 border border-line py-24 text-center">
              <p className="font-display text-2xl font-bold">No products match</p>
              <p className="text-silver">Try removing a filter or searching for something else.</p>
              <Link href="/shop" className="btn btn-primary">Clear filters</Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 xl:grid-cols-3">{results.slice(0, shown).map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 3} />)}</div>
              {shown < results.length && <div className="mt-12 text-center"><button className="btn btn-ghost" onClick={() => setShown((s) => s + PAGE)}>Load more</button></div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
