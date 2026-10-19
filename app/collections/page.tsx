import type { Metadata } from "next";
import { collections, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = { title: "Collections", description: "Browse HOODSCRAFT collections.", alternates: { canonical: "/collections" } };

export default function Collections() {
  return (
    <div className="container-x py-10">
      <h1 className="text-6xl font-extrabold">Collections</h1>
      {collections.map((c) => (
        <section key={c.handle} id={c.handle} className="mt-16 scroll-mt-32" aria-labelledby={`${c.handle}-h`}>
          <h2 id={`${c.handle}-h`} className="text-4xl font-bold text-volt">{c.title}</h2>
          <p className="mb-6 text-silver">{c.blurb}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {products.filter((p) => p.collection === c.handle).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
