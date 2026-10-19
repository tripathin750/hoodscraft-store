import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/Prose";
export const metadata: Metadata = { title: "Account", robots: { index: false } };
export default function Account() {
  return (
    <PageShell title="Account" intro="Customer accounts are not available yet.">
      <p>Registration, login, password reset, order history and saved addresses need a connected commerce backend (for example Shopify customer accounts). This build runs on local demo data, so no accounts are created and no credentials are collected.</p>
      <p>Your wishlist and cart are stored on this device only.</p>
      <p><Link href="/wishlist" className="btn btn-ghost">View wishlist</Link></p>
    </PageShell>
  );
}
