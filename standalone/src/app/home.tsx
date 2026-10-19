import Link from "next/link";
import Image from "next/image";
import { products, collections, getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Embers } from "@/components/Embers";
import { Marquee } from "@/components/Marquee";
import { Scramble } from "@/components/Scramble";
import { Kinetic } from "@/components/Kinetic";
import { site } from "@/lib/site";

const latest = products.slice(0, 4);
const featured = ["mentality", "hope", "shenlong", "samurai-cat"].map((s) => getProduct(s)!).filter(Boolean);
const igTiles = ["p09", "p12", "p14", "p23", "p27", "p31"];
const LINES = ["Crafted", "for the", "fearless"];

function Headline({ fill = false }: { fill?: boolean }) {
  return (
    <span className={`block font-display text-[clamp(3.4rem,9vw,8rem)] leading-[.88] ${fill ? "text-volt glow" : "outline-text"}`}>
      {LINES.map((l) => <span key={l} className={`block ${l === "fearless" ? "italic" : ""}`}>{l}</span>)}
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate grid overflow-hidden border-b border-line lg:grid-cols-[1.25fr_1fr]">
        <div className="fog fog-a -z-10" /><div className="fog fog-b -z-10" />
        <Embers />
        <div className="relative flex flex-col justify-between gap-14 px-4 py-14 md:px-10 lg:min-h-[78svh]">
          <p className="label text-volt flicker">{site.tagline} — Lightning drop</p>
          <div data-spot className="relative" role="heading" aria-level={1} aria-label="Crafted for the fearless">
            <Headline />
            <div className="spot-fill absolute inset-0" aria-hidden="true"><Headline fill /></div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/shop" className="btn btn-primary">Shop now</Link>
            <Link href="/shop?category=hoodies" className="btn btn-ghost">Hoodies</Link>
            <p className="label">Move your cursor. The dark answers.</p>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden border-t border-line lg:border-l lg:border-t-0">
          <div data-parallax="14" className="absolute inset-0 will-change-transform">
            <Image src="/products/black-lightning.jpg" alt="Two models wearing the Black Lightning Hoodie" fill priority className="object-cover object-top" />
          </div>
          <div className="flash" aria-hidden="true" />
          <div className="stripes absolute inset-x-0 top-0 h-3 opacity-80" aria-hidden="true" />
          <span className="absolute bottom-5 left-5 border border-bone/60 bg-black/60 px-3 py-1 font-display text-sm uppercase tracking-[.2em] backdrop-blur">Lightning · 400 GSM · 30 pcs</span>
        </div>
      </section>

      <div className="border-b border-line bg-char py-3 text-bone/80">
        <Marquee items={["Hoodscraft ✦ Elite Streetwear", "Crafted for the fearless ✦", "Lightning Hoodie · 400 GSM ✦", "Pune, India ✦"]} className="font-display text-xl italic" speed={55} />
      </div>

      <Row title="Latest drops" href="/shop" items={latest} />

      <section className="container-x mt-24" aria-labelledby="col-h" data-reveal>
        <h2 id="col-h" className="mb-6 text-4xl"><Scramble text="Collections" /></h2>
        <ul className="border-t border-bone/70">
          {collections.map((c, i) => (
            <li key={c.handle} className="border-b border-bone/70">
              <Link href={`/collections#${c.handle}`} className="group flex items-center gap-5 py-5 transition-all hover:bg-volt hover:px-5 hover:text-ink">
                <span className="font-display text-lg text-volt group-hover:text-ink">0{i + 1}</span>
                <span className="flex-1 font-display text-3xl uppercase md:text-5xl"><Scramble text={c.title} /></span>
                <span className="hidden text-sm text-silver group-hover:text-ink md:block">{c.blurb}</span>
                <span className="font-display text-2xl transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* kinetic outline type */}
      <div className="mt-20 border-y border-line py-6">
        <Marquee items={["Feel the fear and do it anyway", "Momento mori", "Observe", "Hope anchors the soul"]} className="outline-text font-display text-5xl uppercase md:text-7xl" speed={38} />
      </div>

      <Row title="Featured designs" href="/shop?category=t-shirts" items={featured} />

      {/* STATEMENT */}
      <section className="relative mt-24 overflow-hidden border-y border-line py-24 text-center">
        <div className="fog fog-a" /><Embers count={40} />
        <div className="container-x relative">
          <p className="label mb-5 text-volt flicker">Redefining Elite Streetwear</p>
          <Kinetic text={site.campaign} accent={["FEARLESS"]} className="block font-display text-[clamp(2rem,6.4vw,5.5rem)] uppercase leading-[.95]" />
        </div>
      </section>

      {/* STORY */}
      <section className="container-x mt-24 grid items-center gap-10 lg:grid-cols-2" data-reveal>
        <div>
          <p className="label text-volt">Our story</p>
          <h2 className="mt-3 text-4xl"><Scramble text="Built to be noticed" /></h2>
          <p className="mt-5 max-w-lg text-silver">HOODSCRAFT is contemporary streetwear for people who want to stand out — bold graphics, minimalist embroidery and oversized silhouettes, designed in Pune. [Full brand story to be completed by HOODSCRAFT.]</p>
          <Link href="/about" className="btn btn-ghost mt-8">About us</Link>
        </div>
        <div data-tilt className="relative aspect-[4/5] max-w-sm border border-line bg-panel will-change-transform lg:justify-self-end">
          <Image src="/products/p14.jpg" alt="Model wearing the Mentality oversized tee" fill className="object-cover" />
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="container-x mt-24" aria-labelledby="ig-h" data-reveal>
        <div className="mb-6 flex items-end justify-between">
          <h2 id="ig-h" className="text-4xl"><Scramble text="On Instagram" /></h2>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="label hover:text-volt">{site.instagramHandle} ↗</a>
        </div>
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-6">
          {igTiles.map((t, i) => (
            <li key={t}><a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="View HOODSCRAFT on Instagram" className="group relative block aspect-square overflow-hidden border border-line transition hover:border-volt"><Image src={`/products/${t}.jpg`} alt={`HOODSCRAFT design ${i + 1}`} fill className="object-cover object-top grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /></a></li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Row({ title, href, items }: { title: string; href: string; items: typeof products }) {
  return (
    <section className="container-x mt-24" aria-label={title}>
      <div className="mb-8 flex items-end justify-between border-b border-bone/70 pb-3" data-reveal>
        <h2 className="text-4xl"><Scramble text={title} /></h2>
        <Link href={href} className="label hover:text-volt">View all →</Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {items.map((p, i) => <div key={p.slug} data-reveal style={{ transitionDelay: `${i * 90}ms` }}><ProductCard product={p} priority /></div>)}
      </div>
    </section>
  );
}
