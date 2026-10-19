/**
 * PRODUCT CATALOGUE (local demo data).
 *
 * Confirmed from the brand brief: Black Lightning Hoodie (black French Terry), White Lightning Hoodie
 * (white cotton fleece), Minimalist Embroidery Hoodie, graphic tees, and that the hoodie range has
 * included 400 GSM garments.
 *
 * EVERYTHING ELSE IS PLACEHOLDER: prices, sizes, stock, colours of non-Lightning items, tee names and
 * descriptions. Replace with real data (or a commerce backend) before launch. Items with
 * `placeholder: true` show a clearly labelled image placeholder until `images` is filled.
 */
export type Category = "hoodies" | "t-shirts";
export type Collection = "lightning" | "essentials" | "graphic";
export type Colour = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  collection: Collection;
  price: number; // PLACEHOLDER price (GBP)
  compareAt?: number;
  colours: Colour[];
  sizes: string[];
  stock: Record<string, number>; // PLACEHOLDER stock per size
  description: string;
  fabric: string;
  gsm?: string;
  details: string[];
  isNew: boolean;
  popularity: number;
  addedAt: string;
  images: string[]; // add files in /public/products and list them here
  confirmedProduct: boolean; // true = named in the brand brief
};

const HOODIE_SIZES = ["S", "M", "L", "XL", "XXL"];
const TEE_SIZES = ["S", "M", "L", "XL"];
const allStock = (sizes: string[], n = 20) => Object.fromEntries(sizes.map((s) => [s, n]));

export const products: Product[] = [
  {
    slug: "black-lightning-hoodie",
    name: "Black Lightning Hoodie",
    category: "hoodies",
    collection: "lightning",
    price: 69,
    colours: [{ name: "Black", hex: "#0b0c0f" }],
    sizes: HOODIE_SIZES,
    stock: { ...allStock(HOODIE_SIZES), XXL: 0 },
    description:
      "The signature Lightning hoodie in black French Terry. Oversized streetwear fit with the Lightning graphic. Final copy to be confirmed by HOODSCRAFT.",
    fabric: "French Terry (black version)",
    gsm: "[GSM to be confirmed for this item]",
    details: ["Black French Terry", "Lightning graphic", "[Fit details to be confirmed]"],
    isNew: true,
    popularity: 98,
    addedAt: "2026-09-20",
    images: [],
    confirmedProduct: true,
  },
  {
    slug: "white-lightning-hoodie",
    name: "White Lightning Hoodie",
    category: "hoodies",
    collection: "lightning",
    price: 69,
    colours: [{ name: "White", hex: "#eeece6" }],
    sizes: HOODIE_SIZES,
    stock: { ...allStock(HOODIE_SIZES), XL: 0 },
    description:
      "The Lightning hoodie in white cotton fleece. Final copy to be confirmed by HOODSCRAFT.",
    fabric: "Cotton fleece (white version)",
    gsm: "[GSM to be confirmed for this item]",
    details: ["White cotton fleece", "Lightning graphic", "[Fit details to be confirmed]"],
    isNew: true,
    popularity: 91,
    addedAt: "2026-09-18",
    images: [],
    confirmedProduct: true,
  },
  {
    slug: "minimalist-embroidery-hoodie",
    name: "Minimalist Embroidery Hoodie",
    category: "hoodies",
    collection: "essentials",
    price: 72,
    compareAt: 85,
    colours: [
      { name: "Black", hex: "#0b0c0f" },
      { name: "Charcoal", hex: "#3a3f48" },
    ],
    sizes: HOODIE_SIZES,
    stock: allStock(HOODIE_SIZES, 12),
    description:
      "A clean, minimalist embroidered hoodie. Colours, fabric and embroidery details are placeholders until confirmed.",
    fabric: "[Fabric to be confirmed]",
    gsm: "[GSM to be confirmed]",
    details: ["Embroidered detail", "[Colour options to be confirmed]"],
    isNew: false,
    popularity: 84,
    addedAt: "2026-08-30",
    images: [],
    confirmedProduct: true,
  },
  {
    slug: "graphic-tee-01",
    name: "Graphic Tee 01 — Placeholder",
    category: "t-shirts",
    collection: "graphic",
    price: 32,
    colours: [
      { name: "Black", hex: "#0b0c0f" },
      { name: "White", hex: "#eeece6" },
    ],
    sizes: TEE_SIZES,
    stock: allStock(TEE_SIZES, 30),
    description: "Placeholder for a HOODSCRAFT graphic T-shirt. Rename and replace with a real product.",
    fabric: "[Fabric to be confirmed]",
    details: ["[Design details to be confirmed]"],
    isNew: true,
    popularity: 70,
    addedAt: "2026-09-25",
    images: [],
    confirmedProduct: false,
  },
  {
    slug: "graphic-tee-02",
    name: "Graphic Tee 02 — Placeholder",
    category: "t-shirts",
    collection: "graphic",
    price: 32,
    colours: [{ name: "Black", hex: "#0b0c0f" }],
    sizes: TEE_SIZES,
    stock: { ...allStock(TEE_SIZES, 30), S: 0, M: 0, L: 0, XL: 0 },
    description: "Placeholder for a HOODSCRAFT graphic T-shirt (shown sold out to demonstrate the state).",
    fabric: "[Fabric to be confirmed]",
    details: ["[Design details to be confirmed]"],
    isNew: false,
    popularity: 55,
    addedAt: "2026-07-15",
    images: [],
    confirmedProduct: false,
  },
  {
    slug: "graphic-tee-03",
    name: "Graphic Tee 03 — Placeholder",
    category: "t-shirts",
    collection: "graphic",
    price: 34,
    compareAt: 40,
    colours: [
      { name: "White", hex: "#eeece6" },
      { name: "Charcoal", hex: "#3a3f48" },
    ],
    sizes: TEE_SIZES,
    stock: allStock(TEE_SIZES, 15),
    description: "Placeholder for a HOODSCRAFT graphic T-shirt.",
    fabric: "[Fabric to be confirmed]",
    details: ["[Design details to be confirmed]"],
    isNew: false,
    popularity: 63,
    addedAt: "2026-08-10",
    images: [],
    confirmedProduct: false,
  },
  {
    slug: "oversized-tee-placeholder",
    name: "Oversized Statement Tee — Placeholder",
    category: "t-shirts",
    collection: "essentials",
    price: 36,
    colours: [{ name: "Black", hex: "#0b0c0f" }],
    sizes: TEE_SIZES,
    stock: allStock(TEE_SIZES, 18),
    description: "Placeholder for an oversized statement tee.",
    fabric: "[Fabric to be confirmed]",
    details: ["Oversized fit", "[Details to be confirmed]"],
    isNew: true,
    popularity: 60,
    addedAt: "2026-09-28",
    images: [],
    confirmedProduct: false,
  },
];

export const collections = [
  { handle: "lightning", title: "Lightning", blurb: "The signature Lightning hoodies." },
  { handle: "essentials", title: "Essentials", blurb: "Minimalist, embroidered, everyday." },
  { handle: "graphic", title: "Graphic", blurb: "Statement graphic tees." },
] as const;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const inStock = (p: Product) => Object.values(p.stock).some((n) => n > 0);
export const allColours = Array.from(new Map(products.flatMap((p) => p.colours).map((c) => [c.name, c])).values());
export const allSizes = ["S", "M", "L", "XL", "XXL"];
