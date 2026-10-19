import { PageShell } from "@/components/Prose";
import { waUrl } from "@/lib/whatsapp";
export default function SizeGuide() {
  return (
    <PageShell title="Size guide" intro="Our hoodies and tees are cut oversized.">
      <p>Take your usual size for the relaxed oversized look the pieces are designed for, or go one size down for a closer fit. Sizes run from S to XXL.</p>
      <p>Not sure? Send us your height and weight on WhatsApp and we&rsquo;ll recommend a size.</p>
      <p><a className="btn btn-primary" href={waUrl("Hi HOODSCRAFT! Can you help me choose a size? My height: __ cm, weight: __ kg.")} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a></p>
    </PageShell>
  );
}
