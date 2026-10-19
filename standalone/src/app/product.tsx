import { getProduct } from "@/lib/products";
import { ProductClient } from "@/components/ProductClient";
export default function ProductPage({ slug }: { slug: string }) { const p = getProduct(slug); if (!p) throw new Error("NOT_FOUND"); return <ProductClient key={slug} product={p} />; }
