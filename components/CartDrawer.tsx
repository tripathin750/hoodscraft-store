"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { money } from "@/lib/format";
import { useStore } from "./Providers";
import { CartLines } from "./CartLines";

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, subtotal, count } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (drawerOpen) closeRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [drawerOpen, setDrawerOpen]);
  const close = () => setDrawerOpen(false);
  return (
    <div className={`fixed inset-0 z-[60] overflow-hidden ${drawerOpen ? "" : "invisible pointer-events-none"}`} role="dialog" aria-modal="true" aria-label="Shopping cart" aria-hidden={!drawerOpen}>
      <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`} onClick={close} />
      <aside className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink shadow-2xl transition-transform duration-300 ease-out ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-2xl font-bold">Cart ({count})</h2>
          <button ref={closeRef} onClick={close} className="grid h-11 w-11 place-items-center hover:text-volt" aria-label="Close cart" tabIndex={drawerOpen ? 0 : -1}>✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 ? (
            <div className="grid h-full place-content-center gap-4 text-center">
              <p className="font-display text-3xl font-bold">Your cart is empty</p>
              <Link href="/shop" onClick={close} className="btn btn-primary" tabIndex={drawerOpen ? 0 : -1}>Shop now</Link>
            </div>
          ) : <CartLines onNavigate={close} />}
        </div>
        {lines.length > 0 && (
          <div className="space-y-3 border-t border-line p-5">
            <div className="flex justify-between text-lg"><span>Subtotal</span><span className="font-bold">{money(subtotal)}</span></div>
            <p className="text-xs text-silver">Shipping and taxes are calculated at checkout.</p>
            <Link href="/checkout" onClick={close} className="btn btn-primary w-full" tabIndex={drawerOpen ? 0 : -1}>Checkout</Link>
            <Link href="/cart" onClick={close} className="btn btn-ghost w-full" tabIndex={drawerOpen ? 0 : -1}>View cart</Link>
          </div>
        )}
      </aside>
    </div>
  );
}
