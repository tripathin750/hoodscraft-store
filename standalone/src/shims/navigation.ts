import { useEffect, useState } from "react";

// Real URLs (History API). Pages are prerendered per route at build time; this keeps client-side navigation instant.
const EV = "hc:nav";
const clean = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p) || "/";
export const parse = () => ({ path: clean(window.location.pathname), qs: window.location.search.slice(1) });

export function navigate(url: string, replace = false, scroll = true) {
  window.history[replace ? "replaceState" : "pushState"](null, "", url);
  window.dispatchEvent(new Event(EV));
  if (scroll && !replace) window.scrollTo(0, 0);
}

/** Re-renders when the URL changes; returns a key that changes with path or query. */
export function useHash() {
  const [k, set] = useState(window.location.pathname + window.location.search);
  useEffect(() => {
    const f = () => set(window.location.pathname + window.location.search);
    window.addEventListener("popstate", f); window.addEventListener(EV, f);
    return () => { window.removeEventListener("popstate", f); window.removeEventListener(EV, f); };
  }, []);
  return k;
}
export function useRouter() {
  return {
    push: (u: string) => navigate(u),
    replace: (u: string, o?: { scroll?: boolean }) => navigate(u, true, o?.scroll !== false),
  };
}
export function useSearchParams() { useHash(); return new URLSearchParams(window.location.search); }
export function usePathname() { useHash(); return parse().path; }
export function notFound(): never { throw new Error("NOT_FOUND"); }
