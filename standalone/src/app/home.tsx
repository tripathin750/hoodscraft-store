import Link from "next/link";
import Image from "next/image";
import { products, collections, getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { waUrl } from "@/lib/whatsapp";
import { money } from "@/lib/format";
import { site } from "@/lib/site";

const latest = products.slice(0, 4);
const star = getProduct("scorpion")!;
const featured = ["scorpion", "mentality", "hope", "shenlong"].map((s) => getProduct(s)!).filter(Boolean);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="grid bg-black text-white lg:grid-cols-2">
        <div className="relative order-2 flex flex-col justify-center gap-6 px-4 py-14 md:px-10 lg:order-1 lg:min-h-[70svh]">
          <p className="hero-in label !text-white/60">{site.tagline}</p>
          <h1 style={{ animationDelay: ".1s" }} className="hero-in text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[.98]">Crafted for the fearless.</h1>
          <p style={{ animationDelay: ".25s" }} className="hero-in max-w-md text-white/70">Lightning hoodies and graphic tees. Oversized fits, 400 GSM heavyweight fabric, made in Pune.</p>
          <div style={{ animationDelay: ".4s" }} className="hero-in flex flex-wrap gap-3">
            <Link href="/shop" className="btn shine !bg-white !text-black">Shop now</Link>
            <Link href="/shop?category=hoodies" className="btn !border !border-white/60 !text-white">Hoodies</Link>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/5] lg:order-2 lg:aspect-auto">
          <div className="hero-zoom absolute inset-0"><Image src="/products/black-lightning.jpg" alt="Two models wearing the Black Lightning Hoodie" fill priority className="object-cover object-top" /></div>
        </div>
      </section>

      {/* BEST SELLER SPOTLIGHT */}
      <section className="container-x mt-16" aria-labelledby="bs-h">
        <Reveal>
          <div className="grid overflow-hidden bg-panel md:grid-cols-2">
            <Link href={`/products/${star.slug}`} className="relative block aspect-[4/5] bg-char md:aspect-auto md:min-h-[520px]" aria-label={`${star.name} tee`}>
              <Image src={star.images[0]} alt="Scorpion oversized graphic tee, our best seller" fill className="object-cover object-top" />
              <span className="shine absolute left-4 top-4 bg-black px-3 py-1.5 text-xs font-medium uppercase tracking-[.14em] text-white">Best seller</span>
            </Link>
            <div className="flex flex-col justify-center gap-5 p-6 md:p-12">
              <p className="label">Most loved by our customers</p>
              <h2 id="bs-h" className="text-5xl md:text-6xl">Scorpion</h2>
              <p className="max-w-md text-silver">Silver and red scorpion across the shoulder on an oversized graphic tee. The one everyone keeps coming back for.</p>
              <p className="flex items-baseline gap-3 text-2xl"><span className="font-semibold">{money(star.price)}</span>{star.compareAt && <s className="text-base text-silver">{money(star.compareAt)}</s>}{star.compareAt && <span className="text-sm font-medium text-crimson">-{Math.round((1 - star.price / star.compareAt) * 100)}%</span>}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/products/${star.slug}`} className="btn btn-primary shine">Shop Scorpion</Link>
                <a href={waUrl("Hi HOODSCRAFT! I want to order the Scorpion tee.")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Order on WhatsApp</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Row title="Latest" href="/shop" items={latest} priority />

      <section className="container-x mt-20" aria-labelledby="col-h">
        <h2 id="col-h" className="mb-5 text-3xl">Collections</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {collections.map((c, i) => (
            <li key={c.handle}><Reveal delay={i * 90} className="h-full">
              <Link href={`/collections?c=${c.handle}`} className="flex h-full flex-col justify-between gap-8 bg-panel p-6 transition hover:bg-char">
                <span className="text-2xl">{c.title}</span>
                <span className="text-sm text-silver">{c.blurb} →</span>
              </Link></Reveal>
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
        {items.map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 90}><ProductCard product={p} priority={priority} /></Reveal>)}
      </div>
    </section>
  );
}
