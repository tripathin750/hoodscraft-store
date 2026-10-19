import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/collections", "/about", "/contact", "/faq", "/size-guide", "/policies/shipping", "/policies/returns", "/policies/privacy", "/policies/terms"];
  return [...pages.map((p) => ({ url: `${site.url}${p}` })), ...products.map((p) => ({ url: `${site.url}/products/${p.slug}` }))];
}
