"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/lib/products";

export type Line = { slug: string; size: string; colour: string; qty: number };
type Ctx = {
  lines: Line[];
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  add: (l: Line) => void;
  setQty: (l: Line, qty: number) => void;
  remove: (l: Line) => void;
  clear: () => void;
  wishlist: string[];
  toggleWish: (slug: string) => void;
  recent: string[];
  pushRecent: (slug: string) => void;
  hydrated: boolean;
};
const StoreCtx = createContext<Ctx | null>(null);
export const useStore = () => {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore must be inside Providers");
  return c;
};

const key = (l: Pick<Line, "slug" | "size" | "colour">) => `${l.slug}|${l.size}|${l.colour}`;
function read<T>(k: string, fallback: T): T {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch { return fallback; }
}
function write(k: string, v: unknown) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Drop lines whose product no longer exists in the catalogue.
    setLines(read<Line[]>("hc.cart", []).filter((l) => getProduct(l.slug) && l.qty > 0));
    setWishlist(read<string[]>("hc.wish", []));
    setRecent(read<string[]>("hc.recent", []));
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) write("hc.cart", lines); }, [lines, hydrated]);
  useEffect(() => { if (hydrated) write("hc.wish", wishlist); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) write("hc.recent", recent); }, [recent, hydrated]);

  const add = useCallback((l: Line) => {
    const p = getProduct(l.slug);
    const max = p?.stock[l.size] ?? 0;
    setLines((cur) => {
      const ex = cur.find((c) => key(c) === key(l));
      if (ex) return cur.map((c) => (key(c) === key(l) ? { ...c, qty: Math.min(max, c.qty + l.qty) } : c));
      return [...cur, { ...l, qty: Math.min(max, l.qty) }];
    });
    setDrawerOpen(true);
  }, []);
  const setQty = useCallback((l: Line, qty: number) => {
    const max = getProduct(l.slug)?.stock[l.size] ?? 0;
    setLines((cur) => cur.map((c) => (key(c) === key(l) ? { ...c, qty: Math.max(1, Math.min(max, qty)) } : c)));
  }, []);
  const remove = useCallback((l: Line) => setLines((cur) => cur.filter((c) => key(c) !== key(l))), []);
  const clear = useCallback(() => setLines([]), []);
  const toggleWish = useCallback((s: string) => setWishlist((w) => (w.includes(s) ? w.filter((x) => x !== s) : [...w, s])), []);
  const pushRecent = useCallback((s: string) => setRecent((r) => [s, ...r.filter((x) => x !== s)].slice(0, 8)), []);

  const value = useMemo<Ctx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
    return { lines, count, subtotal, drawerOpen, setDrawerOpen, add, setQty, remove, clear, wishlist, toggleWish, recent, pushRecent, hydrated };
  }, [lines, drawerOpen, add, setQty, remove, clear, wishlist, toggleWish, recent, pushRecent, hydrated]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
