// Central, editable brand/site configuration. Replace placeholders with confirmed business details.
export const site = {
  name: "HOODSCRAFT",
  tagline: "Redefining Elite Streetwear",
  campaign: "CRAFTED FOR THE FEARLESS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagram: "https://www.instagram.com/hoodscraft/",
  instagramHandle: "@hoodscraft",
  // WhatsApp number, international format, digits only (91 = India). Orders and enquiries are sent here.
  whatsapp: "917030189953",
  // PLACEHOLDER: replace with the real announcement
  announcement: "Limited drop · Lightning Hoodies · 400 GSM · 30 pcs only",
  // PLACEHOLDER business details — not confirmed by the brand owner
  contact: {
    email: "hoodscraft.work@gmail.com",
    phone: "+91 70301 89953",
    address: "Pune, Maharashtra",
    hours: "",
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
