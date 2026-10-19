import Link from "next/link";
import { PageShell } from "@/components/Prose";
export default function Account() {
  return (
    <PageShell title="Account" intro="No account needed.">
      <p>You can order without signing up. Orders are placed over WhatsApp, and we reply there with confirmation and tracking details.</p>
      <p>Your cart and wishlist are saved on this device.</p>
      <p><Link href="/wishlist" className="btn btn-ghost">View wishlist</Link></p>
    </PageShell>
  );
}
