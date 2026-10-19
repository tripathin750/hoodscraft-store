import type { Metadata } from "next";
import { PageShell } from "@/components/Prose";
export const metadata: Metadata = { title: "FAQs", description: "Frequently asked questions about HOODSCRAFT orders, sizing and returns.", alternates: { canonical: "/faq" } };
const faqs = [
  ["How long does delivery take?", "[Delivery times to be confirmed.]"],
  ["What is your returns policy?", "[Returns window and conditions to be confirmed.]"],
  ["How do I choose my size?", "See the size guide. Sizing figures there are placeholders until confirmed."],
  ["Do you restock sold-out pieces?", "[Restock policy to be confirmed.]"],
];
export default function FAQ() {
  return (
    <PageShell title="FAQs">
      <div className="divide-y divide-line border-y border-line">
        {faqs.map(([q, a]) => <details key={q} className="py-4"><summary className="min-h-8 cursor-pointer font-display text-xl font-bold uppercase tracking-wide text-bone">{q}</summary><p className="pt-2">{a}</p></details>)}
      </div>
    </PageShell>
  );
}
