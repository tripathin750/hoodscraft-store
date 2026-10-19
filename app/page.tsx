import Link from "next/link";
import { products, collections } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Bolt } from "@/components/Bolt";
import { site } from "@/lib/site";

const newArrivals = [...products].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 4);
const best = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="smoke grain absolute inset-0 -z-10" />
        <Bolt className="absolute right-0 top-0 -z-10 h-[120%] text-volt/25 md:right-[18%]" stroke="currentColor" />
        <div className="container-x grid min-h-[78svh] items-end gap-10 pb-14 pt-20 lg:grid-cols-12">
          <div className="reveal lg:col-span-8">
            <p className="label mb-4 text-volt">{site.tagline}</p>
            <h1 className="text-[clamp(3.5rem,13vw,11rem)] font-extrabold leading-[.86]">Crafted<br />for the<br /><span className="text-volt">fearless</span></h1>
            <p className="mt-6 max-w-md text-silver">Premium hoodies, graphic tees and statement pieces for people who’d rather stand out.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-primary">Shop now</Link>
              <Link href="/shop?category=hoodies" className="btn btn-ghost">Hoodies</Link>
            </div>
          </div>
          <div className="reveal hidden lg:col-span-4 lg:block" style={{ animationDelay: ".15s" }}>
            <div className="relative aspect-[4/5] border border-line bg-panel/60">
              <p className="absolute inset-0 grid place-content-center px-8 text-center text-xs uppercase tracking-[.2em] text-silver">Campaign photo placeholder<br />Replace with your hero image</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b border-line py-4" aria-hidden="true">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-[.2em] text-bone/30">
          {Array.from({ length: 12 }).map((_, i) => <span key={i}>Hoodscraft <span className="text-volt">⚡︎</span> Elite Streetwear</span>)}
        </div>
      </div>

      <Row title="New arrivals" href="/shop?sort=newest" items={newArrivals} priority />

      {/* COLLECTIONS */}
      <section className="container-x mt-24" aria-labelledby="col-h">
        <h2 id="col-h" className="mb-8 text-5xl font-extrabold">Collections</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {collections.map((c, i) => (
            <Link key={c.handle} href={`/collections#${c.handle}`} className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border border-line bg-char p-6 md:aspect-[3/4]">
              <div className="smoke absolute inset-0 opacity-60 transition-transform duration-700 group-hover:scale-110" />
              <span className="label relative">0{i + 1}</span>
              <span className="relative font-display text-5xl font-extrabold uppercase group-hover:text-volt">{c.title}</span>
              <span className="relative mt-1 text-sm text-silver">{c.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      <Row title="Best sellers" href="/shop?sort=popular" items={best} />

      {/* STATEMENT */}
      <section className="relative mt-24 overflow-hidden border-y border-line bg-char py-28 text-center">
        <Bolt className="absolute left-1/2 top-0 h-full -translate-x-1/2 text-volt/15" />
        <p className="label relative text-crimson">The statement</p>
        <h2 className="relative mx-auto mt-4 max-w-5xl px-4 text-[clamp(2.75rem,9vw,8rem)] font-extrabold leading-[.9]">{site.campaign}</h2>
      </section>

      {/* STORY */}
      <section className="container-x mt-24 grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[5/4] border border-line bg-panel/60">
          <p className="absolute inset-0 grid place-content-center px-8 text-center text-xs uppercase tracking-[.2em] text-silver">Editorial photo placeholder</p>
        </div>
        <div>
          <p className="label text-volt">Our story</p>
          <h2 className="mt-3 text-5xl font-extrabold">Built to be noticed</h2>
          <p className="mt-5 max-w-lg text-silver">HOODSCRAFT is contemporary streetwear for people who want to stand out — bold graphics, minimalist embroidery and oversized silhouettes, made with a focus on quality. [Brand story to be completed by HOODSCRAFT.]</p>
          <Link href="/about" className="btn btn-ghost mt-8">About us</Link>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="container-x mt-24" aria-labelledby="ig-h">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="ig-h" className="text-5xl font-extrabold">On Instagram</h2>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="label hover:text-volt">{site.instagramHandle} ↗</a>
        </div>
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="View HOODSCRAFT on Instagram" className="grid aspect-square place-items-center border border-line bg-char text-[10px] uppercase tracking-[.2em] text-silver transition hover:border-volt hover:text-volt">Post {i + 1} · placeholder</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Row({ title, href, items, priority = false }: { title: string; href: string; items: typeof products; priority?: boolean }) {
  return (
    <section className="container-x mt-24" aria-label={title}>
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-5xl font-extrabold">{title}</h2>
        <Link href={href} className="label hover:text-volt">View all →</Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.slug} product={p} priority={priority} />)}
      </div>
    </section>
  );
}
