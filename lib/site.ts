// Central, editable brand/site configuration. Replace placeholders with confirmed business details.
export const site = {
  name: "HOODSCRAFT",
  tagline: "Redefining Elite Streetwear",
  campaign: "CRAFTED FOR THE FEARLESS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagram: "https://www.instagram.com/hoodscraft/",
  instagramHandle: "@hoodscraft",
  // PLACEHOLDER: replace with the real announcement
  announcement: "NEW DROP — PLACEHOLDER MESSAGE · EDIT IN lib/site.ts",
  // PLACEHOLDER business details — not confirmed by the brand owner
  contact: {
    email: "hello@your-domain.example",
    phone: "[Phone number — to be confirmed]",
    address: "[Business address — to be confirmed]",
    hours: "[Support hours — to be confirmed]",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Hoodies", href: "/shop?category=hoodies" },
    { label: "T-Shirts", href: "/shop?category=t-shirts" },
    { label: "Collections", href: "/collections" },
    { label: "About Us", href: "/about" },
  ],
};
