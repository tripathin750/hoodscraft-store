"use client";
import Link from "next/link";
import { useStore } from "@/components/Providers";
import { CartLines } from "@/components/CartLines";
import { money } from "@/lib/format";

export default function CartPage() {
  const { lines, subtotal, hydrated, clear } = useStore();
  if (!hydrated) return <div className="container-x py-24 text-silver" role="status">Loading cart…</div>;
  if (!lines.length) return (
    <div className="container-x grid place-items-center gap-5 py-32 text-center">
      <h1 className="text-6xl font-extrabold">Your cart is empty</h1>
      <p className="text-silver">Nothing here yet. Fix that.</p>
      <Link href="/shop" className="btn btn-primary">Shop now</Link>
    </div>
  );
  return (
    <div className="container-x grid gap-12 py-10 lg:grid-cols-[1fr_380px]">
      <div><h1 className="mb-4 text-6xl font-extrabold">Cart</h1><CartLines /><button onClick={clear} className="label mt-4 underline hover:text-crimson">Empty cart</button></div>
      <aside className="h-fit border border-line bg-char p-6">
        <h2 className="text-2xl font-bold">Order summary</h2>
        <dl className="mt-4 grid gap-2 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd className="font-bold">{money(subtotal)}</dd></div><div className="flex justify-between text-silver"><dt>Shipping</dt><dd>Calculated at checkout</dd></div></dl>
        <p className="mt-4 text-xs text-silver">Discount codes require a connected commerce backend and are not available in this demo.</p>
        <Link href="/checkout" className="btn btn-primary mt-6 w-full">Checkout</Link>
      </aside>
    </div>
  );
}
