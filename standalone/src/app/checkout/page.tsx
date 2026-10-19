"use client";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/components/Providers";
import { getProduct } from "@/lib/products";
import { money } from "@/lib/format";
import { openWhatsApp } from "@/lib/whatsapp";
import { site } from "@/lib/site";

export default function Checkout() {
  const { lines, subtotal, hydrated, clear } = useStore();
  const [sent, setSent] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const items = lines.map((l, i) => `${i + 1}. ${getProduct(l.slug)?.name} - ${l.colour}, size ${l.size} x ${l.qty} = ${money((getProduct(l.slug)?.price ?? 0) * l.qty)}`).join("\n");
    const msg = `Hi ${site.name}! I'd like to place an order.\n\n${items}\n\nSubtotal: ${money(subtotal)}\n\nName: ${d.name}\nPhone: ${d.phone}${d.email ? `\nEmail: ${d.email}` : ""}\nAddress: ${d.address}, ${d.city} - ${d.pincode}${d.note ? `\nNote: ${d.note}` : ""}\n\nPlease confirm availability, delivery charge and UPI payment details.`;
    setSent(openWhatsApp(msg));
  }

  if (!hydrated) return <div className="container-x py-24 text-silver" role="status">Loading…</div>;
  if (sent) return (
    <div className="container-x grid max-w-xl place-items-center gap-5 py-28 text-center">
      <h1 className="text-5xl">Order sent to <em>WhatsApp</em></h1>
      <p className="text-silver">Your order message is ready in WhatsApp. Press send there and we&rsquo;ll confirm stock, delivery charge and UPI payment details with you. Your order is only confirmed once we reply.</p>
      <a href={sent} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open WhatsApp again</a>
      <button onClick={() => { clear(); setSent(null); }} className="label underline hover:text-volt">I&rsquo;ve sent it &mdash; clear my cart</button>
    </div>
  );
  if (!lines.length) return <div className="container-x grid place-items-center gap-5 py-32 text-center"><h1 className="text-5xl">Nothing to check out</h1><Link href="/shop" className="btn btn-primary">Shop now</Link></div>;
  const f = (id: string, label: string, type = "text", ac?: string, req = true) => (
    <div>
      <label htmlFor={id} className="label mb-1 block">{label}{req ? "" : " (optional)"}</label>
      <input id={id} name={id} type={type} required={req} autoComplete={ac} className="input"
        {...(id === "phone" ? { inputMode: "tel" as const, pattern: "[0-9+ ]{10,15}" } : {})}
        {...(id === "pincode" ? { inputMode: "numeric" as const, pattern: "[0-9]{6}", maxLength: 6 } : {})} />
    </div>
  );
  return (
    <div className="container-x grid gap-12 py-10 lg:grid-cols-[1fr_380px]">
      <form onSubmit={submit} className="grid gap-6">
        <h1 className="text-5xl">Checkout</h1>
        <p className="text-sm text-silver">Fill in your delivery details and we&rsquo;ll send your order to us on WhatsApp. We confirm availability and share UPI payment details there &mdash; no card details are collected on this site.</p>
        <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-3 font-display text-3xl">Delivery details</legend>
          {f("name", "Full name", "text", "name")}{f("phone", "WhatsApp / phone", "tel", "tel")}
          <div className="sm:col-span-2">{f("email", "Email", "email", "email", false)}</div>
          <div className="sm:col-span-2">{f("address", "Address", "text", "street-address")}</div>
          {f("city", "City", "text", "address-level2")}{f("pincode", "PIN code", "text", "postal-code")}
          <div className="sm:col-span-2"><label htmlFor="note" className="label mb-1 block">Order note (optional)</label><textarea id="note" name="note" className="input" /></div>
        </fieldset>
        <button className="btn btn-primary">Send order on WhatsApp</button>
      </form>
      <aside className="h-fit border border-line bg-char p-6">
        <h2 className="text-3xl">Summary</h2>
        <ul className="mt-4 grid gap-2 text-sm">{lines.map((l) => <li key={`${l.slug}${l.size}${l.colour}`} className="flex justify-between gap-3"><span>{getProduct(l.slug)?.name} ({l.colour}, {l.size}) × {l.qty}</span><span>{money((getProduct(l.slug)?.price ?? 0) * l.qty)}</span></li>)}</ul>
        <div className="mt-4 flex justify-between border-t border-line pt-4 text-lg font-bold"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <p className="mt-2 text-xs text-silver">Delivery charge confirmed on WhatsApp.</p>
      </aside>
    </div>
  );
}
