import Link from "next/link";
import { PageShell } from "@/components/Prose";
import { site } from "@/lib/site";
export default function About() {
  return (
    <PageShell title="About HOODSCRAFT" intro={`${site.tagline}. ${site.campaign}.`}>
      <p>HOODSCRAFT is a premium streetwear label built around graphic T-shirts, premium hoodies, minimalist embroidered pieces and oversized silhouettes — made for people who want to stand out.</p>
      <h2>What we make</h2>
      <p>Statement designs and clean, considered pieces, including our Lightning hoodies. Quality is the focus of every release.</p>
      <h2>Based in Pune</h2>
      <p>HOODSCRAFT is designed in Pune, India. Questions or custom requests? Message us on WhatsApp or Instagram @hoodscraft.</p>
      <p><Link href="/shop" className="btn btn-primary">Shop the collection</Link></p>
    </PageShell>
  );
}
