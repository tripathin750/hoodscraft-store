import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { waUrl } from "@/lib/whatsapp";

// Drop a file named workshop.jpg (or .png/.webp) into src/assets to show your workshop image here.
const found = import.meta.glob("/src/assets/workshop.*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const workshop = Object.values(found)[0];

const pillars = [
  ["Heavyweight fabric", "Our Lightning hoodies are cut from 400 GSM French Terry and cotton fleece. Thick, structured and built to last."],
  ["Oversized by design", "Relaxed shoulders, a longer body and a drop that sits right. Every piece is made to be worn loose."],
  ["Graphics with a point", "Lightning cracks, bold back prints and minimal embroidery. Each design is made to be noticed, not to blend in."],
];

export default function About() {
  return (
    <div className="container-x py-12 md:py-20">
      <p className="label">About {site.name}</p>
      <h1 className="mt-3 max-w-4xl text-[clamp(2.4rem,6vw,5rem)] leading-[1]">Streetwear made for people who&rsquo;d rather stand out.</h1>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-char">
          <Image src={workshop ?? "/products/black-lightning.jpg"} alt="The HOODSCRAFT workshop in Pune: cutting tables, fabric rolls and garments in progress" fill priority className="object-cover" />
          {workshop && <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-[.14em] text-white/80">Illustrative image</span>}
        </div>
        <div className="grid gap-5 text-silver">
          <h2 className="text-3xl text-bone">From our Pune workshop</h2>
          <p>HOODSCRAFT started with a simple idea: premium streetwear shouldn&rsquo;t have to look like everyone else&rsquo;s. We design every piece in Pune, from the first sketch to the final stitch check, and release in small runs so the people wearing it stay one of few.</p>
          <p>We obsess over the details most brands skip: the weight of the fabric, the fall of the sleeve, the way a print sits on the chest. If a piece doesn&rsquo;t meet the standard, it doesn&rsquo;t ship.</p>
          <p>Our Lightning hoodies are the heart of the label: a limited run of 30 pieces in black and white, with lightning-crack graphics and 400 GSM fabric. Alongside them, our graphic tees carry bold designs inspired by mindset, anime, art and the road.</p>
        </div>
      </div>

      <div className="mt-20 grid gap-3 md:grid-cols-3">
        {pillars.map(([t, d], i) => (
          <Reveal key={t} delay={i * 100}><div className="h-full bg-panel p-6">
            <h3 className="text-xl text-bone">{t}</h3>
            <p className="mt-3 text-sm text-silver">{d}</p>
          </div></Reveal>
        ))}
      </div>

      <div className="mt-20 grid gap-6 bg-black p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
        <div>
          <h2 className="text-3xl">Crafted for the fearless.</h2>
          <p className="mt-2 max-w-xl text-white/70">Have a question, a bulk order or a custom idea? Message us and we&rsquo;ll get back to you.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/shop" className="btn !bg-white !text-black">Shop now</Link>
          <a href={waUrl("Hi HOODSCRAFT!")} target="_blank" rel="noopener noreferrer" className="btn !border !border-white/60 !text-white">WhatsApp us</a>
        </div>
      </div>
    </div>
  );
}
