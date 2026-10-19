import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { allPaths, metaFor } from "./src/lib/seo";
import { products, collections } from "./src/lib/products";
import { site } from "./src/lib/site";

const SITE = (process.env.SITE_URL || "https://hoodscraft.netlify.app").replace(/\/$/, "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const urlOf = (p: string) => SITE + (p === "/" ? "/" : p);

/**
 * After the normal build, writes a real HTML file for every route (title, description, canonical, Open Graph,
 * JSON-LD structured data and crawlable content) plus sitemap.xml and robots.txt, so search engines and link
 * previews see each page without running JavaScript. React replaces the fallback content when the app loads.
 */
export function prerender(): Plugin {
  let out = "dist";
  return {
    name: "prerender",
    apply: "build",
    configResolved(c) { out = path.resolve(c.root, c.build.outDir); },
    closeBundle() {
      const template = fs.readFileSync(path.join(out, "index.html"), "utf8");
      const assets = fs.readdirSync(path.join(out, "assets"));
      const imageUrl = (file: string) => {
        const base = file.split("/").pop()!.replace(/\.jpg$/, "");
        const hit = assets.find((a) => new RegExp(`^${base}-[\\w-]{8}\\.jpg$`).test(a));
        return hit ? `${SITE}/assets/${hit}` : `${SITE}/favicon.png`;
      };
      const ogDefault = imageUrl("black-lightning.jpg");

      const list = (items: typeof products) => `<ul>${items.map((p) => `<li><a href="/products/${p.slug}">${esc(p.name)}</a> — ${rupee(p.price)}</li>`).join("")}</ul>`;
      const nav = `<nav aria-label="Main"><a href="/">Home</a> · <a href="/shop">Shop</a> · <a href="/collections">Collections</a> · <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/faq">FAQ</a> · <a href="/size-guide">Size guide</a></nav>`;

      const body = (p: string, title: string, description: string) => {
        const m = p.match(/^\/products\/([\w-]+)$/);
        const prod = m && products.find((x) => x.slug === m[1]);
        let inner: string;
        if (prod) {
          inner = `<h1>${esc(prod.name)}</h1><p>${rupee(prod.price)} <s>${rupee(prod.compareAt ?? prod.price)}</s></p><p>${esc(prod.description)}</p><ul>${prod.details.filter((d) => !d.startsWith("[")).map((d) => `<li>${esc(d)}</li>`).join("")}</ul><p>Sizes: ${prod.sizes.join(", ")}. Order on WhatsApp.</p><p><a href="/shop">Back to all products</a></p>`;
        } else if (p === "/") {
          inner = `<h1>${esc(site.name)} — Crafted for the fearless</h1><p>${esc(description)}</p><h2>Hoodies</h2>${list(products.filter((x) => x.category === "hoodies"))}<h2>T-shirts</h2>${list(products.filter((x) => x.category === "t-shirts"))}`;
        } else if (p === "/shop") {
          inner = `<h1>Shop all</h1><p>${esc(description)}</p>${list(products)}`;
        } else if (p === "/collections") {
          inner = `<h1>Collections</h1>${collections.map((c) => `<h2>${esc(c.title)}</h2><p>${esc(c.blurb)}</p>${list(products.filter((x) => x.collection === c.handle))}`).join("")}`;
        } else {
          inner = `<h1>${esc(title.split(/ [|—] /)[0])}</h1><p>${esc(description)}</p>`;
        }
        return `<div style="max-width:960px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.6">${nav}${inner}</div>`;
      };

      const jsonld = (p: string): object[] => {
        const m = p.match(/^\/products\/([\w-]+)$/);
        const prod = m && products.find((x) => x.slug === m[1]);
        if (prod) {
          return [{
            "@context": "https://schema.org", "@type": "Product", name: prod.name, description: prod.description,
            image: prod.images.map(imageUrl), sku: prod.slug, category: prod.category === "hoodies" ? "Hoodies" : "T-Shirts",
            brand: { "@type": "Brand", name: site.name },
            offers: { "@type": "Offer", url: urlOf(p), priceCurrency: "INR", price: prod.price, availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition", seller: { "@type": "Organization", name: site.name } },
          }];
        }
        if (p === "/") {
          return [
            { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: SITE, logo: `${SITE}/favicon.png`, sameAs: [site.instagram], email: site.contact.email, telephone: site.contact.phone, address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" } },
            { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: SITE },
          ];
        }
        return [];
      };

      const render = (p: string, notFound = false) => {
        const meta = notFound ? { title: `Page not found | ${site.name}`, description: "This page could not be found.", index: false } : metaFor(p);
        const m = p.match(/^\/products\/([\w-]+)$/);
        const prod = m && products.find((x) => x.slug === m[1]);
        const image = prod ? imageUrl(prod.images[0]) : ogDefault;
        const url = urlOf(p);
        const head = [
          `<title>${esc(meta.title)}</title>`,
          `<meta name="description" content="${esc(meta.description)}"/>`,
          `<meta name="robots" content="${meta.index ? "index,follow,max-image-preview:large" : "noindex,follow"}"/>`,
          notFound ? "" : `<link rel="canonical" href="${url}"/>`,
          `<meta property="og:type" content="${prod ? "product" : "website"}"/><meta property="og:site_name" content="${site.name}"/><meta property="og:locale" content="en_IN"/>`,
          `<meta property="og:title" content="${esc(meta.title)}"/><meta property="og:description" content="${esc(meta.description)}"/><meta property="og:url" content="${url}"/><meta property="og:image" content="${image}"/>`,
          `<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${esc(meta.title)}"/><meta name="twitter:description" content="${esc(meta.description)}"/><meta name="twitter:image" content="${image}"/>`,
          prod ? `<meta property="product:price:amount" content="${prod.price}"/><meta property="product:price:currency" content="INR"/>` : "",
          ...jsonld(p).map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`),
        ].filter(Boolean).join("\n");
        return template
          .replace(/<title>[\s\S]*?<\/title>/, "")
          .replace("</head>", `${head}\n</head>`)
          .replace('<div id="root"></div>', `<div id="root">${body(p, meta.title, meta.description)}</div>`);
      };

      const paths = allPaths();
      for (const p of paths) {
        const file = p === "/" ? path.join(out, "index.html") : path.join(out, `${p}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, render(p));
      }
      fs.writeFileSync(path.join(out, "404.html"), render("/404", true));

      const today = new Date().toISOString().slice(0, 10);
      const indexable = paths.filter((p) => metaFor(p).index);
      fs.writeFileSync(path.join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `  <url><loc>${urlOf(p)}</loc><lastmod>${today}</lastmod><priority>${p === "/" ? "1.0" : p.startsWith("/products/") ? "0.8" : "0.6"}</priority></url>`).join("\n")}\n</urlset>\n`);
      fs.writeFileSync(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /checkout\nDisallow: /wishlist\n\nSitemap: ${SITE}/sitemap.xml\n`);
    },
  };
}
