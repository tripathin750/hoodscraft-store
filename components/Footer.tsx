import Link from "next/link";
import { site } from "@/lib/site";
import { SignupForm } from "./SignupForm";

const col = "grid gap-2 text-sm text-silver [&_a:hover]:text-volt";
export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-char">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl font-extrabold tracking-[.18em]">HOODSCRAFT</p>
          <p className="mt-2 text-silver">{site.tagline}.</p>
          <h2 className="mt-8 text-xl font-bold">Join the list</h2>
          <p className="mb-3 text-sm text-silver">First access to drops. No spam.</p>
          <SignupForm endpoint="/api/newsletter" fields={[{ name: "email", label: "Email address", type: "email" }]} cta="Subscribe" compact />
        </div>
        <nav aria-label="Shop" className={col}>
          <h2 className="mb-2 text-lg font-bold text-bone">Shop</h2>
          <Link href="/shop">Shop all</Link><Link href="/shop?category=hoodies">Hoodies</Link><Link href="/shop?category=t-shirts">T-shirts</Link><Link href="/collections">Collections</Link>
        </nav>
        <nav aria-label="Support" className={col}>
          <h2 className="mb-2 text-lg font-bold text-bone">Support</h2>
          <Link href="/contact">Contact</Link><Link href="/faq">FAQs</Link><Link href="/size-guide">Size guide</Link><Link href="/policies/shipping">Shipping</Link><Link href="/policies/returns">Returns &amp; refunds</Link>
        </nav>
        <div className={col}>
          <h2 className="mb-2 text-lg font-bold text-bone">Follow</h2>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram {site.instagramHandle}</a>
          <p className="mt-4">{site.contact.email}</p>
          <Link href="/policies/privacy">Privacy</Link><Link href="/policies/terms">Terms</Link>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-silver">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}
