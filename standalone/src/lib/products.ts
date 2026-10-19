/**
 * PRODUCT CATALOGUE.
 * Designs, names and images come from the HOODSCRAFT catalogue PDF and Instagram (@hoodscraft).
 * Lightning hoodies: 400 GSM, limited drop of 30 pcs (per the Instagram captions).
 *
 * PLACEHOLDERS to replace: PRICES (not in the catalogue), sizes, stock, tee fabric/GSM, care text.
 */
export type Category = "hoodies" | "t-shirts";
export type Collection = "hoodies" | "front" | "back";
export type Colour = { name: string; hex: string };

export type Product = {
  slug: string; name: string; category: Category; collection: Collection;
  price: number; compareAt?: number; // PLACEHOLDER prices (INR)
  colours: Colour[]; sizes: string[]; stock: Record<string, number>; // PLACEHOLDER stock
  description: string; fabric: string; gsm?: string; details: string[];
  isNew: boolean; popularity: number; addedAt: string; images: string[];
  badge?: string; confirmedProduct: boolean;
};

const HOODIE_SIZES = ["S", "M", "L", "XL", "XXL"];
const TEE_SIZES = ["S", "M", "L", "XL", "XXL"];
const allStock = (sizes: string[], n = 10) => Object.fromEntries(sizes.map((s) => [s, n]));
const C = { White: { name: "White", hex: "#f1eee6" }, Black: { name: "Black", hex: "#0b0b0b" }, Sand: { name: "Sand", hex: "#d9c4a0" }, Charcoal: { name: "Charcoal", hex: "#3a3f48" } };
const img = (n: string) => `/products/${n}.jpg`;
const TEE_PRICE = 699;
const TEE_PRICE_HIGH = 799; // scorpion, mentality, hope
const TEE_MRP = 999;
const HOODIE_MRP = 2700;
const HOODIE_PRICE = 1799;

const rawProducts: Product[] = [
  {
    slug: "black-lightning-hoodie", name: "Black Lightning Hoodie", category: "hoodies", collection: "hoodies",
    price: HOODIE_PRICE, colours: [C.Black], sizes: HOODIE_SIZES, stock: allStock(HOODIE_SIZES),
    description: "400 GSM. Heavyweight. High-voltage vibe. The Black Lightning Hoodie in French Terry with the lightning-crack graphic. Limited drop — 30 pcs only.",
    fabric: "French Terry (black)", gsm: "400 GSM",
    details: ["Limited drop: 30 pieces", "Lightning graphic", "Unisex fit"],
    isNew: false, popularity: 100, addedAt: "2025-11-29", images: [img("black-lightning")], badge: "Limited · 30 pcs", confirmedProduct: true,
  },
  {
    slug: "white-lightning-hoodie", name: "White Lightning Hoodie", category: "hoodies", collection: "hoodies",
    price: HOODIE_PRICE, colours: [C.White], sizes: HOODIE_SIZES, stock: allStock(HOODIE_SIZES),
    description: "400 GSM. Heavyweight. Built to stand out. The White Lightning Hoodie in cotton fleece with the lightning-crack graphic. Limited drop — 30 pcs only.",
    fabric: "Cotton fleece (white)", gsm: "400 GSM",
    details: ["Limited drop: 30 pieces", "Lightning graphic", "Unisex fit"],
    isNew: false, popularity: 99, addedAt: "2025-11-29", images: [img("white-lightning")], badge: "Limited · 30 pcs", confirmedProduct: true,
  },
  {
    slug: "essential-of-leisure", name: 'Essential of Leisure', category: "t-shirts", collection: "front",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Butterfly graphic with red 'Essential of Leisure' type on the chest.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Front print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 88, addedAt: "2025-01-01", images: [img('p02')], confirmedProduct: true,
  },
  {
    slug: "beauty-in-simplicity", name: 'Beauty in Simplicity', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Daisy and butterfly back print: 'New beginnings and fresh starts'.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 86, addedAt: "2025-01-01", images: [img('p03')], confirmedProduct: true,
  },
  {
    slug: "chess-dragon-king", name: 'Dragon & King', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Monochrome chess back print: a dragon knight facing a king.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 84, addedAt: "2025-01-01", images: [img('p04')], confirmedProduct: true,
  },
  {
    slug: "keima-black-knight", name: "Keima (桂馬)", category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Black knight chess piece back print with 桂馬 (keima) lettering.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 82, addedAt: "2025-01-01", images: [img('p05')], confirmedProduct: true,
  },
  {
    slug: "flying-high", name: 'Flying High', category: "t-shirts", collection: "front",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Blue butterfly with circular 'Flying High' type on the chest.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Front print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 80, addedAt: "2025-01-01", images: [img('p06')], confirmedProduct: true,
  },
  {
    slug: "focus", name: 'Focus', category: "t-shirts", collection: "front",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Minimal chest print: a stacked, fading 'Focus' wordmark.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Front print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 78, addedAt: "2025-01-01", images: [img('p07')], confirmedProduct: true,
  },
  {
    slug: "fibonacci-titan", name: 'Fibonacci Titan', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.Sand], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Line-art figure inside a golden-ratio spiral, printed on the back.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 76, addedAt: "2025-01-01", images: [img('p08')], confirmedProduct: true,
  },
  {
    slug: "gratitude", name: 'Gratitude', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "'Gratitude of a soul in harmony' floral and bird back print.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 74, addedAt: "2025-01-01", images: [img('p09')], confirmedProduct: true,
  },
  {
    slug: "hope", name: 'Hope', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "'Hope anchors the soul' — oversized hand and HOPE back print.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 72, addedAt: "2025-01-01", images: [img('p10')], confirmedProduct: true,
  },
  {
    slug: "imminence", name: 'Imminence', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Stacked 'Imminence' type with a rose, printed on the back.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 70, addedAt: "2025-01-01", images: [img('p11')], confirmedProduct: true,
  },
  {
    slug: "shenlong", name: 'Shenlong', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Green dragon with orbs, Shenlong back print.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 68, addedAt: "2025-01-01", images: [img('p12')], confirmedProduct: true,
  },
  {
    slug: "kindness", name: 'Kindness', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "'Kindness — make us better' butterfly and daisy back print.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 66, addedAt: "2025-01-01", images: [img('p13')], confirmedProduct: true,
  },
  {
    slug: "mentality", name: 'Mentality', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Stoic bust with flames: 'Feel the fear and do it anyway.'",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 64, addedAt: "2025-01-01", images: [img('p14')], confirmedProduct: true,
  },
  {
    slug: "momento-mori-white", name: 'Momento Mori — White', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Monochrome butterfly with 'Momento Mori', white colourway.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 62, addedAt: "2025-01-01", images: [img('p15')], confirmedProduct: true,
  },
  {
    slug: "momento-mori-black", name: 'Momento Mori — Black', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Monochrome butterfly with 'Momento Mori', black colourway.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 60, addedAt: "2025-01-01", images: [img('p30')], confirmedProduct: true,
  },
  {
    slug: "namaste", name: 'Namaste', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Boxed prayer-hands back print.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 58, addedAt: "2025-01-01", images: [img('p16')], confirmedProduct: true,
  },
  {
    slug: "observe", name: 'Observe', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Repeating 'Observe' type around an eye.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 56, addedAt: "2025-01-01", images: [img('p17')], confirmedProduct: true,
  },
  {
    slug: "obsession", name: 'Obsession', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Red-framed skull graphic with 'Obsession' type.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 54, addedAt: "2025-01-01", images: [img('p18')], confirmedProduct: true,
  },
  {
    slug: "orchid", name: 'Orchid', category: "t-shirts", collection: "front",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Floral chest print on a black tee.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Front print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 52, addedAt: "2025-01-01", images: [img('p19')], confirmedProduct: true,
  },
  {
    slug: "pain", name: 'Pain', category: "t-shirts", collection: "front",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Stacked 'Pain' type with a fiery character, front and back.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Front print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 50, addedAt: "2025-01-01", images: [img('p20'), img('p21')], confirmedProduct: true,
  },
  {
    slug: "paradise-forever", name: 'Paradise Forever', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Botanical and butterfly back print: 'Paradise Forever'.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 48, addedAt: "2025-01-01", images: [img('p22')], confirmedProduct: true,
  },
  {
    slug: "samurai-cat", name: 'Samurai Cat', category: "t-shirts", collection: "front",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Pink samurai cat on a black tee.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Front print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 46, addedAt: "2025-01-01", images: [img('p23')], confirmedProduct: true,
  },
  {
    slug: "porsche-911-gt3-rs", name: '911 GT3 RS', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Teal sports-car back print with '911 GT3 RS' type.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 44, addedAt: "2025-01-01", images: [img('p24')], confirmedProduct: true,
  },
  {
    slug: "realistic", name: 'Realistic', category: "t-shirts", collection: "front",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "'Realistic — don't trust everything you see' chest print.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Front print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 42, addedAt: "2025-01-01", images: [img('p25')], confirmedProduct: true,
  },
  {
    slug: "scorpion", name: 'Scorpion', category: "t-shirts", collection: "front",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Our best seller. Silver and red scorpion across the shoulder on an oversized tee.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Front print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 200, addedAt: "2025-12-01", images: [img('p26')], badge: "Best seller", confirmedProduct: true,
  },
  {
    slug: "tiger", name: 'Tiger', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Purple tiger and flowers back print.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 38, addedAt: "2025-01-01", images: [img('p27')], confirmedProduct: true,
  },
  {
    slug: "valuable", name: 'Valuable', category: "t-shirts", collection: "back",
    price: TEE_PRICE, colours: [C.White], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: "Swallow with script 'Valuable' lettering.",
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Back print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 36, addedAt: "2025-01-01", images: [img('p28'), img('p29')], confirmedProduct: true,
  },
  {
    slug: "wolf", name: 'Wolf', category: "t-shirts", collection: "front",
    price: TEE_PRICE, colours: [C.Black], sizes: TEE_SIZES, stock: allStock(TEE_SIZES),
    description: 'Floral wolf illustration on a black tee.',
    fabric: "[Fabric to be confirmed]", details: ["Oversized fit", "Front print", "[GSM and fabric to be confirmed]"],
    isNew: false, popularity: 34, addedAt: "2025-01-01", images: [img('p31')], confirmedProduct: true,
  },
];

const HIGH = new Set(["scorpion", "mentality", "hope"]);
export const products: Product[] = rawProducts.map((p) => p.category === "hoodies"
  ? { ...p, price: HOODIE_PRICE, compareAt: HOODIE_MRP }
  : {
    ...p, price: HIGH.has(p.slug) ? TEE_PRICE_HIGH : TEE_PRICE, compareAt: TEE_MRP,
    fabric: "100% cotton", gsm: "240 GSM",
    details: [
      ...p.details.filter((d) => /print/i.test(d)),
      "100% cotton, 240 GSM heavyweight fabric: dense, soft and breathable, so it hangs well and doesn't feel thin",
      "Premium-quality thread with neat, durable stitching built to last",
      "Oversized drop-shoulder fit for a relaxed, street-ready look",
      "Clean crew neckline and a roomy body",
      "Crisp, vibrant print that makes the design stand out",
      "Unisex, sizes S to XXL",
    ],
  });

export const collections = [
  { handle: "hoodies", title: "Hoodies", blurb: "400 GSM Lightning hoodies." },
  { handle: "front", title: "Front Prints", blurb: "Chest and front statement tees." },
  { handle: "back", title: "Back Prints", blurb: "Full back-graphic oversized tees." },
] as const;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const inStock = (p: Product) => Object.values(p.stock).some((n) => n > 0);
export const allColours = Array.from(new Map(products.flatMap((p) => p.colours).map((c) => [c.name, c])).values());
export const allSizes = ["S", "M", "L", "XL", "XXL"];
export const priceRange = { min: Math.min(...products.map((p) => p.price)), max: Math.max(...products.map((p) => p.price)) };
