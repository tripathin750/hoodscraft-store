import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, inStock } from "@/lib/products";
import { ProductClient } from "@/components/ProductClient";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name, description: p.description, alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name} | ${site.name}`, description: p.description, type: "website", images: p.images[0] ? [p.images[0]] : undefined },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description,
    image: p.images.map((i) => new URL(i, site.url).toString()), brand: { "@type": "Brand", name: site.name },
    offers: { "@type": "Offer", priceCurrency: "GBP", price: p.price, availability: inStock(p) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: `${site.url}/products/${p.slug}` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <ProductClient product={p} />
    </>
  );
}
