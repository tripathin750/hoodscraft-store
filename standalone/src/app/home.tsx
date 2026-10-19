import Link from "next/link";
import Image from "next/image";
import { products, collections, getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { site } from "@/lib/site";

const latest = products.slice(0, 4);
const featured = ["mentality", "hope", "scorpion", "shenlong"].map((s) => getProduct(s)!).filter(Boolean);
const igTiles = ["p09", "p12", "p14", "p23", "p27", "p31"];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="grid bg-black text-white lg:grid-cols-2">
        <div className="relative order-2 flex flex-col justify-center gap-6 px-4 py-14 md:px-10 lg:order-1 lg:min-h-[70svh]">
          <p className="label !text-white/60">{site.tagline}</p>
          <h1 className="text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[.98]">Crafted for the fearless.</h1>
          <p className="max-w-md text-white/70">Lightning hoodies and graphic tees. Oversized fits, 400 GSM heavyweight fabric, made in Pune.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="btn !bg-white !text-black">Shop now</Link>
            <Link href="/shop?category=hoodies" className="btn !border !border-white/60 !text-white">Hoodies</Link>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/5] lg:order-2 lg:aspect-auto">
          <Image src="/products/black-lightning.jpg" alt="Two models wearing the Black Lightning Hoodie" fill priority className="object-cover object-top" />
        </div>
      </section>

      <Row title="Latest" href="/shop" items={latest} priority />

      <section className="container-x mt-20" aria-labelledby="col-h">
        <h2 id="col-h" className="mb-5 text-3xl">Collections</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {collections.map((c) => (
            <li key={c.handle}>
              <Link href={`/collections#${c.handle}`} className="flex h-full flex-col justify-between gap-8 bg-panel p-6 transition hover:bg-char">
                <span className="text-2xl">{c.title}</span>
                <span className="text-sm text-silver">{c.blurb} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Row title="Featured tees" href="/shop?category=t-shirts" items={featured} />

      <section className="container-x mt-20 grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/5] max-w-sm bg-char">
          <Image src="/products/p14.jpg" alt="Model wearing the Mentality oversized tee" fill className="object-cover" />
        </div>
        <div>
          <p className="label">About</p>
          <h2 className="mt-3 text-4xl">Built to be noticed</h2>
          <p className="mt-5 max-w-lg text-silver">HOODSCRAFT is contemporary streetwear from Pune for people who want to stand out: bold graphics, minimalist embroidery and oversized silhouettes, with a focus on quality.</p>
          <Link href="/about" className="btn btn-ghost mt-8">About us</Link>
        </div>
      </section>

      <section className="container-x mt-20" aria-labelledby="ig-h">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="ig-h" className="text-3xl">On Instagram</h2>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="label hover:text-bone">{site.instagramHandle} ↗</a>
        </div>
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {igTiles.map((t, i) => (
            <li key={t}><a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="View HOODSCRAFT on Instagram" className="relative block aspect-square overflow-hidden bg-char"><Image src={`/products/${t}.jpg`} alt={`HOODSCRAFT design ${i + 1}`} fill className="object-cover object-top" /></a></li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Row({ title, href, items, priority = false }: { title: string; href: string; items: typeof products; priority?: boolean }) {
  return (
    <section className="container-x mt-20" aria-label={title}>
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-3xl">{title}</h2>
        <Link href={href} className="label hover:text-bone">View all →</Link>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.slug} product={p} priority={priority} />)}
      </div>
    </section>
  );
}
