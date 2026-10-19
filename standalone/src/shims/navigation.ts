import { useEffect, useState } from "react";
export const parse = () => { const h = window.location.hash.slice(1) || "/"; const [path, qs = ""] = h.split("?"); return { path: path || "/", qs }; };
export function useHash() { const [h, set] = useState(window.location.hash); useEffect(() => { const f = () => set(window.location.hash); window.addEventListener("hashchange", f); return () => window.removeEventListener("hashchange", f); }, []); return h; }
export function useRouter() { return { push: (u: string) => { window.location.hash = u; }, replace: (u: string) => { history.replaceState(null, "", "#" + u); window.dispatchEvent(new HashChangeEvent("hashchange")); } }; }
export function useSearchParams() { useHash(); return new URLSearchParams(parse().qs); }
export function usePathname() { useHash(); return parse().path; }
export function notFound(): never { throw new Error("NOT_FOUND"); }
