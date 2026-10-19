"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { useStore } from "./Providers";
import { CartDrawer } from "./CartDrawer";

const Icon = ({ d }: { d: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

export function Header() {
  const { count, setDrawerOpen, wishlist, hydrated } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { if (search) input.current?.focus(); }, [search]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); setSearch(false); } };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="overflow-hidden bg-volt text-[11px] font-bold uppercase tracking-[.2em] text-white">
        <p className="container-x py-2 text-center">{site.announcement}</p>
      </div>
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <button className="-ml-2 grid h-12 w-12 place-items-center lg:hidden" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
          <Icon d="M4 7h16M4 12h16M4 17h16" />
        </button>
        <Link href="/" className="font-display text-2xl font-extrabold tracking-[.18em] lg:text-[28px]" aria-label="HOODSCRAFT home">
          HOODS<span className="text-volt">C</span>RAFT
        </Link>
        <nav aria-label="Primary" className="hidden gap-8 lg:flex">
          {site.nav.map((n) => (
            <Link key={n.label} href={n.href} className="font-display text-[15px] font-semibold uppercase tracking-[.16em] text-bone/80 transition hover:text-volt">{n.label}</Link>
          ))}
        </nav>
        <div className="-mr-2 flex items-center">
          <button className="grid h-12 w-12 place-items-center hover:text-volt" aria-label="Search" onClick={() => setSearch((s) => !s)}><Icon d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4" /></button>
          <Link href="/account" className="hidden h-12 w-12 place-items-center hover:text-volt sm:grid" aria-label="Account"><Icon d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 8c0-4 3.6-6 8-6s8 2 8 6" /></Link>
          <Link href="/wishlist" className="relative hidden h-12 w-12 place-items-center hover:text-volt sm:grid" aria-label={`Wishlist (${hydrated ? wishlist.length : 0})`}>
            <Icon d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" />
          </Link>
          <button className="relative grid h-12 w-12 place-items-center hover:text-volt" aria-label={`Open cart, ${hydrated ? count : 0} items`} onClick={() => setDrawerOpen(true)}>
            <Icon d="M5 8h14l-1 12H6L5 8zm4 0V6a3 3 0 0 1 6 0v2" />
            {hydrated && count > 0 && <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-crimson px-1 text-[11px] font-bold text-white">{count}</span>}
          </button>
        </div>
      </div>
      {search && (
        <form role="search" className="border-t border-line bg-char" onSubmit={(e) => { e.preventDefault(); if (q.trim()) { router.push(`/shop?q=${encodeURIComponent(q.trim())}`); setSearch(false); } }}>
          <div className="container-x flex gap-3 py-3">
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <input id="site-search" ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search hoodies, tees…" className="input" />
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
      )}
    </header>
      <div className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${menu ? "" : "invisible pointer-events-none"}`} aria-hidden={!menu}>
        <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${menu ? "opacity-100" : "opacity-0"}`} onClick={() => setMenu(false)} />
        <nav aria-label="Mobile" className={`absolute inset-y-0 left-0 flex w-[84%] max-w-sm flex-col bg-ink p-6 transition-transform duration-300 ease-out ${menu ? "translate-x-0" : "-translate-x-full"}`}>
          <button className="-ml-2 mb-6 grid h-12 w-12 place-items-center" aria-label="Close menu" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}><Icon d="M6 6l12 12M18 6 6 18" /></button>
          {site.nav.map((n) => (
            <Link key={n.label} href={n.href} onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1} className="border-b border-line py-4 font-display text-3xl font-bold uppercase tracking-wider">{n.label}</Link>
          ))}
          <div className="mt-auto flex gap-6 text-sm text-silver">
            <Link href="/account" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>Account</Link>
            <Link href="/wishlist" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>Wishlist</Link>
          </div>
        </nav>
      </div>
    <CartDrawer />
    </>
  );
}
