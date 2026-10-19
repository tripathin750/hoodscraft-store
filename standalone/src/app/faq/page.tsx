import { PageShell } from "@/components/Prose";
const faqs = [
  ["How long does delivery take?", "We ship across India. We confirm the delivery charge and timeline for your PIN code on WhatsApp when you order, and send tracking once your parcel ships."],
  ["What is your returns policy?", "Damaged or wrong items can be replaced or refunded if you contact us on WhatsApp within 48 hours of delivery. Size exchanges are subject to stock. See the returns page for details."],
  ["How do I choose my size?", "Our pieces are oversized. Take your usual size for a relaxed fit, or size down for a closer fit. Message us on WhatsApp if you want help choosing."],
  ["How do I place an order?", "Add items to your cart, check out and send the order to us on WhatsApp. We confirm availability and share UPI payment details there."],
  ["Do you restock sold-out pieces?", "Some designs are limited drops and may not return. Follow @hoodscraft on Instagram or message us on WhatsApp to hear first about restocks."],
];
export default function FAQ() {
  return (
    <PageShell title="FAQs">
      <div className="divide-y divide-line border-y border-line">
        {faqs.map(([q, a]) => <details key={q} className="py-4"><summary className="min-h-8 cursor-pointer text-lg font-medium text-bone">{q}</summary><p className="pt-2">{a}</p></details>)}
      </div>
    </PageShell>
  );
}
