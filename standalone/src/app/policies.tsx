import { PageShell } from "@/components/Prose";
import { site } from "@/lib/site";
const policies: Record<string, { title: string; body: string[] }> = {
  shipping: { title: "Shipping policy", body: [
    "We ship across India. Orders are placed on WhatsApp, where we confirm availability, the delivery charge and the expected delivery time for your PIN code before you pay.",
    "Orders are dispatched after payment is confirmed, and you will receive tracking details on WhatsApp once your parcel is shipped.",
    `Questions about a delivery? Message us on WhatsApp at ${site.contact.phone} or email ${site.contact.email}.`] },
  returns: { title: "Returns & exchanges", body: [
    "If your order arrives damaged, defective or is not the item you ordered, contact us on WhatsApp within 48 hours of delivery with photos and we will arrange a replacement or refund.",
    "Size exchanges are available subject to stock. Items must be unworn, unwashed and have original tags. Contact us before sending anything back.",
    "Limited-drop items such as the Lightning hoodies may be exchange-only. Approved refunds are paid back to the original payment method.",
    `To start a return, message ${site.contact.phone} or email ${site.contact.email} with your order details.`] },
  privacy: { title: "Privacy policy", body: [
    "We collect only what is needed to fulfil your order: your name, phone number, delivery address and, if you give it, your email. This is shared with us through WhatsApp when you place an order.",
    "We use this information only to confirm, ship and support your order and, if you ask to join our drop list, to tell you about new releases. We do not sell your data.",
    "Your cart and wishlist are stored on your own device and are never sent to us. This website does not take card details.",
    `To ask us to delete your information, contact ${site.contact.email}.`] },
  terms: { title: "Terms & conditions", body: [
    `${site.name} is a streetwear brand based in Pune, Maharashtra, India. By ordering from us you agree to these terms.`,
    "Prices are in Indian rupees and may change without notice. An order is confirmed only when we reply on WhatsApp and receive payment.",
    "Colours may vary slightly from photos because of screen differences. Limited drops are available while stock lasts and we may cancel and refund an order we cannot fulfil.",
    "These terms are governed by the laws of India. Disputes fall under the courts of Pune, Maharashtra."] },
};
export default function Policy({ slug }: { slug: string }) { const p = policies[slug]; if (!p) throw new Error("NOT_FOUND"); return <PageShell title={p.title}>{p.body.map((t) => <p key={t}>{t}</p>)}</PageShell>; }
