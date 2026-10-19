"use client";
import Link from "next/link";
import { useStore } from "@/components/Providers";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function Wishlist() {
  const { wishlist, hydrated } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));
  return (
    <div className="container-x py-10">
      <h1 className="text-6xl font-extrabold">Wishlist</h1>
      <p className="mt-1 text-sm text-silver">Saved on this device only.</p>
      {!hydrated ? <p className="mt-10 text-silver" role="status">Loading…</p> : items.length === 0 ? (
        <div className="grid place-items-center gap-4 py-24 text-center"><p className="font-display text-4xl font-bold">Nothing saved yet</p><Link href="/shop" className="btn btn-primary">Browse the shop</Link></div>
      ) : <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.slug} product={p} />)}</div>}
    </div>
  );
}
