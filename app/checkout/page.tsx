"use client";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/components/Providers";
import { getProduct } from "@/lib/products";
import { money } from "@/lib/format";

export default function Checkout() {
  const { lines, subtotal, hydrated } = useStore();
  const [res, setRes] = useState<{ ok: boolean; message: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lines, customer: Object.fromEntries(new FormData(e.currentTarget)) }) });
      const j = await r.json();
      setRes({ ok: r.ok, message: j.message });
    } catch { setRes({ ok: false, message: "Network error." }); }
    setBusy(false);
  }

  if (!hydrated) return <div className="container-x py-24 text-silver" role="status">Loading…</div>;
  if (!lines.length) return <div className="container-x grid place-items-center gap-5 py-32 text-center"><h1 className="text-6xl font-extrabold">Nothing to check out</h1><Link href="/shop" className="btn btn-primary">Shop now</Link></div>;
  const f = (id: string, label: string, type = "text", ac?: string) => (<div><label htmlFor={id} className="label mb-1 block">{label}</label><input id={id} name={id} type={type} required autoComplete={ac} className="input" /></div>);
  return (
    <div className="container-x grid gap-12 py-10 lg:grid-cols-[1fr_380px]">
      <form onSubmit={submit} className="grid gap-6">
        <h1 className="text-6xl font-extrabold">Checkout</h1>
        <div role="note" className="border border-crimson/60 bg-crimson/10 p-4 text-sm">
          <strong>Payments are not connected.</strong> This build has no payment provider configured, so no order can be placed and no card details are collected. See the README to connect a provider.
        </div>
        <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-3 font-display text-2xl font-bold uppercase">Contact &amp; shipping</legend>
          <div className="sm:col-span-2">{f("email", "Email", "email", "email")}</div>
          {f("firstName", "First name", "text", "given-name")}{f("lastName", "Last name", "text", "family-name")}
          <div className="sm:col-span-2">{f("address", "Address", "text", "street-address")}</div>
          {f("city", "City", "text", "address-level2")}{f("postcode", "Postcode", "text", "postal-code")}
        </fieldset>
        <button className="btn btn-primary" disabled={busy}>{busy ? "Checking…" : "Place order"}</button>
        {res && <p role="alert" className={res.ok ? "text-bone" : "text-crimson"}>{res.message}</p>}
      </form>
      <aside className="h-fit border border-line bg-char p-6">
        <h2 className="text-2xl font-bold">Summary</h2>
        <ul className="mt-4 grid gap-2 text-sm">{lines.map((l) => <li key={`${l.slug}${l.size}${l.colour}`} className="flex justify-between gap-3"><span>{getProduct(l.slug)?.name} ({l.colour}, {l.size}) × {l.qty}</span><span>{money((getProduct(l.slug)?.price ?? 0) * l.qty)}</span></li>)}</ul>
        <div className="mt-4 flex justify-between border-t border-line pt-4 text-lg font-bold"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <p className="mt-2 text-xs text-silver">Shipping: [to be configured]</p>
      </aside>
    </div>
  );
}
