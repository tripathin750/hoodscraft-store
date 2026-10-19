# HOODSCRAFT: streetwear storefront

Live site: **https://hoodscraft.netlify.app**
Repository: https://github.com/tripathin750/hoodscraft-store

HOODSCRAFT is a Pune-based streetwear brand (oversized hoodies and graphic tees). This repository is its online store. It is a fast, static website that costs nothing to run: customers browse products, build a cart, and **send their order to the brand on WhatsApp**, where the brand confirms stock, delivery charge and takes UPI payment.

> The whole website lives in the [`standalone/`](standalone) folder. Earlier experiments (a Next.js version and single-file builds) were removed from the repo; they remain in git history if ever needed.

---

## Table of contents
1. [What the site does](#what-the-site-does)
2. [Tech stack](#tech-stack)
3. [How it is built](#how-it-is-built)
4. [Project structure](#project-structure)
5. [Pages and features](#pages-and-features)
6. [Design system](#design-system)
7. [SEO](#seo)
8. [Performance](#performance)
9. [Images](#images)
10. [Hosting and deployment](#hosting-and-deployment)
11. [Run it locally](#run-it-locally)
12. [Everyday edits](#everyday-edits)
13. [Business details and policies](#business-details-and-policies)
14. [Known limits](#known-limits)
15. [Accounts and secrets](#accounts-and-secrets)

---

## What the site does
- Shows **30 products**: 2 Lightning hoodies and 28 graphic tees, each with price, MRP (crossed out), discount badge, sizes, colours, photos and specifications.
- Search, category filters, sorting and a "load more" shop grid.
- Cart (slide-out drawer and full page), wishlist, and a checkout that **opens WhatsApp with the whole order pre-written** (items, sizes, quantities, total, name, phone, address). No payment is taken on the site, so no card data is ever handled.
- Contact form and size-help button that also open WhatsApp.
- Light and dark mode, tap-to-zoom photo viewer, and a few small animations.
- Fully crawlable by Google: every page has its own URL, title, description and structured data.

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Language | **TypeScript** (strict) + **TSX** | All source is typed. Also a little CSS, HTML and JSON. |
| UI library | **React 18** | Components, hooks (`useState`, `useEffect`, `useRef`, context). |
| Build tool | **Vite 5** | Dev server and production bundler. Uses `@vitejs/plugin-react`. |
| Styling | **Tailwind CSS 4** (`@tailwindcss/vite`) + hand-written CSS in `globals.css` | Colour tokens are CSS variables, which is how light/dark mode works. |
| Routing | Custom, tiny, built on the browser **History API** | See [Routing](#routing-nexts-api-shimmed). |
| Fonts | **Space Grotesk** (variable, self-hosted `.woff2`) | No Google Fonts request at runtime. |
| Data | A typed array in [`src/lib/products.ts`](standalone/src/lib/products.ts) | No database and no backend. |
| Cart / wishlist storage | Browser `localStorage` | Per device. Nothing is sent to a server. |
| Orders and forms | WhatsApp deep links (`https://wa.me/<number>?text=...`) | Zero server, zero cost. |
| SEO generation | Custom Vite plugin [`prerender.ts`](standalone/prerender.ts) | Runs at build time. |
| Hosting | **Netlify** (free) | Static files on a global CDN. |
| CI/CD | **GitHub Actions** | Builds and deploys on every push to `main`. |
| One-off tooling | Python with **Pillow** and **PyMuPDF** | Used once to resize photos and extract them from the catalogue PDF. Not part of the build. |

Runtime dependencies are only `react` and `react-dom`. Everything else is build-time.

## How it is built

### Single-page app, prerendered per route
The site is a React single-page app. Navigation between pages is instant because it never reloads the page. Because search engines and link previews do not run JavaScript reliably, the build also **writes a real HTML file for every page**:

1. `vite build` bundles the app into `standalone/dist/`.
2. The custom plugin in [`prerender.ts`](standalone/prerender.ts) runs after the bundle is written. For each of the 44 routes it produces `dist/<route>.html` containing:
   - `<title>`, meta description, canonical URL, robots tag
   - Open Graph and Twitter card tags (so WhatsApp/Instagram previews show the right photo and title)
   - JSON-LD structured data (`Product` + `Offer` for products, `Organization` + `WebSite` on the home page)
   - Readable fallback content (heading, price, description, links) inside `<div id="root">`
3. When the JavaScript loads, React replaces the fallback content with the full interactive page.
4. It also writes `sitemap.xml`, `robots.txt` and a `404.html`.

### Routing (Next's API, shimmed)
The components were originally written against Next.js imports (`next/link`, `next/image`, `next/navigation`). Instead of shipping Next.js, Vite **aliases** those imports to small local implementations in [`src/shims/`](standalone/src/shims):

- [`link.tsx`](standalone/src/shims/link.tsx): an `<a>` that intercepts clicks and calls `history.pushState`.
- [`navigation.ts`](standalone/src/shims/navigation.ts): `useRouter`, `useSearchParams`, `usePathname`, listening to `popstate` and a custom event.
- [`image.tsx`](standalone/src/shims/image.tsx): an `<img>` that resolves Vite-hashed asset URLs, adds `loading="lazy"`, `decoding="async"` and a responsive `srcset`.

The alias is set in [`vite.config.ts`](standalone/vite.config.ts) and mirrored in `tsconfig.json`. Old `#/shop` style links still work: `main.tsx` rewrites them to real paths on load.

[`App.tsx`](standalone/src/App.tsx) is the router: it reads `location.pathname` and renders the matching page component, sets the document title/description per page, scrolls to top and fades pages in.

### State
[`components/Providers.tsx`](standalone/src/components/Providers.tsx) holds the cart, wishlist and recently-viewed lists in React context and persists them to `localStorage`.

## Project structure

```
hoodscraft-store/
├── standalone/                  ← THE LIVE WEBSITE
│   ├── index.html               HTML template (theme-flash script, font preload)
│   ├── vite.config.ts           Vite config, Next-import aliases, prerender plugin
│   ├── prerender.ts             Build-time SEO: per-page HTML, sitemap, robots, 404
│   ├── wrangler.jsonc           Cloudflare Worker config (optional second host)
│   ├── postcss.config.cjs       Empty PostCSS config (Tailwind runs through its Vite plugin instead)
│   ├── tsconfig.json
│   ├── package.json
│   ├── public/                  Copied as-is to the site root
│   │   ├── _headers             Netlify caching + security headers
│   │   ├── favicon.png
│   │   ├── fonts/               Self-hosted Space Grotesk
│   │   └── google…html          Google Search Console verification file
│   └── src/
│       ├── main.tsx             Entry point, legacy-hash redirect
│       ├── App.tsx              Router and layout
│       ├── globals.css          Design tokens, light/dark, animations, buttons
│       ├── app/                 One file per page (home, shop, product, cart…)
│       ├── components/          Header, Footer, ProductCard, ShopClient, CartDrawer,
│       │                        Lightbox, Reveal, ThemeToggle, Providers…
│       ├── lib/
│       │   ├── products.ts      ★ Products, prices, sizes, collections
│       │   ├── site.ts          ★ Brand name, phone, email, WhatsApp, nav
│       │   ├── seo.ts           Titles/descriptions per route
│       │   ├── whatsapp.ts      WhatsApp link builder
│       │   └── format.ts        ₹ price formatting
│       ├── shims/               Replacements for next/link, next/image, next/navigation
│       └── assets/              Product photos (see Images)
├── .github/workflows/deploy.yml Build + deploy to Netlify on every push
└── README.md
```
★ = the two files you edit most.

## Pages and features

| URL | Page | Notes |
|---|---|---|
| `/` | Home | Hero, **Scorpion best-seller spotlight**, latest drops, collections, featured tees, story |
| `/shop` | Shop all | Filters (category, size, colour, price, stock), search (`?q=`), sort, load more |
| `/products/<slug>` | Product | Photo gallery, tap-to-zoom viewer, size picker, quantity, add to cart / buy now, specifications, care, related items, sticky mobile buy bar |
| `/collections` | Collections | Hoodies, Front Prints, Back Prints (`?c=` scrolls to one) |
| `/about` | About | Brand story, pillars, optional workshop image slot |
| `/contact`, `/faq`, `/size-guide` | Support | Forms open WhatsApp |
| `/policies/shipping`, `returns`, `privacy`, `terms` | Policies | Default text, see [Business details](#business-details-and-policies) |
| `/cart`, `/checkout`, `/wishlist` | Shopping | Kept out of search results (`noindex`) |

## Design system
- **Look:** calm, product-first, minimal (inspired by clean streetwear stores). Black hero, light-grey page, generous whitespace.
- **Tokens** (in `globals.css`): `--ink` (background), `--bone` (text), `--char`, `--panel`, `--line`, `--silver` (muted text), `--volt` (accent, black in light mode), `--crimson` (discount/sale red). The same class names work in both themes; the dark theme just redefines the variables under `:root[data-theme="dark"]`.
- **Dark mode:** toggle in the header. The choice is saved in `localStorage` and applied by a small inline script in `index.html` before first paint, so there is no flash.
- **Motion:** deliberately sparse: hero entrance, scroll-reveal for product cards, card hover zoom, add-to-cart feedback (button text, cart icon bounce, badge pop), mobile sticky buy bar, page fade. All animations are wrapped in `prefers-reduced-motion: no-preference`, so they switch off for users who ask for less motion.
- **Accessibility:** semantic headings, labelled buttons and form fields, visible focus rings, keyboard-closable viewer and drawers, alt text on every photo.

## SEO
Generated by [`prerender.ts`](standalone/prerender.ts) and [`src/lib/seo.ts`](standalone/src/lib/seo.ts):
- Unique title and description for every route (products include name, type and price).
- Canonical URLs, `robots` meta (`noindex` on cart/checkout/wishlist), Open Graph and Twitter cards with a product image.
- **Structured data:** `Product` with `Offer` (price in INR, in stock) for each product page; `Organization` and `WebSite` on the home page.
- `sitemap.xml` (41 URLs) and `robots.txt` pointing to it; real HTTP 404 for unknown URLs.
- The canonical domain comes from the `SITE_URL` environment variable (set in `.github/workflows/deploy.yml`, currently `https://hoodscraft.netlify.app`). **If you move to a custom domain, change it there** and rebuild.
- Google Search Console is verified through `standalone/public/google326f61dc3def9ed4.html`. Keep that file.

## Performance
- Static files on Netlify's CDN, no server rendering.
- Code split into a small app bundle (~21 kB gzip) plus a cached React chunk (~45 kB gzip).
- Self-hosted font, preloaded. Hashed filenames with one-year immutable caching (`public/_headers`).
- Every product photo exists in two sizes (560 px thumbnail for grids and 1200 px full size for the product page and zoom). The browser picks the right one through `srcset` and `sizes`, and photos below the fold are lazy-loaded.
- Fixed aspect-ratio image boxes prevent layout shift.

## Images
- Tee photos come from the brand's catalogue PDF (`HOODSCRAFT TSHIRT DESIGN`, 1200×1500 per page). Page *N* became `src/assets/pNN.jpg`; a 560 px thumbnail is stored beside it as `pNN-t.jpg`.
- The two Lightning hoodie photos (`black-lightning.jpg`, `white-lightning.jpg`) were available only in smaller sizes and were upscaled and sharpened. Replace them with originals when available.
- To add or change a photo, put `name.jpg` (about 1200×1500) and `name-t.jpg` (560×700) in `src/assets/`, then reference `"/products/name.jpg"` in the product's `images` array. The shim finds the file by its name.
- **Workshop image:** save a file named `workshop.jpg` (or `.png`/`.webp`) in `src/assets/` and the About page picks it up automatically.

## Hosting and deployment

**Production host: Netlify (free).** Deploys are automatic:

1. Push to `main`.
2. GitHub Actions runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): checkout, Node 22, `npm install`, `npm run build` (with `SITE_URL` set), then `netlify deploy --prod --dir=dist`.
3. The site updates in about a minute.

Other hosts that were tried:
- **GitHub Pages:** removed from the workflow (it serves under a sub-path, which breaks real URLs). An old copy may still exist at `tripathin750.github.io/hoodscraft-store/`.
- **Cloudflare Workers:** a Worker named `hoodscraft` was deployed once (`wrangler.jsonc` is kept). It is not auto-deployed and its address may be unreachable. It can be ignored or deleted from the Cloudflare dashboard.

**Custom domain:** buy a domain, add it in Netlify (Domain management), then set `SITE_URL` in the workflow to `https://yourdomain` so canonical tags and the sitemap use it.

## Run it locally
Requires **Node.js 20 or newer**.

```bash
cd standalone
npm install
npm run dev        # development server with hot reload, http://localhost:5173
npm run build      # production build into standalone/dist (also prerenders all pages)
npm run preview    # serve the production build locally, http://localhost:4173
```

## Everyday edits

| I want to… | Edit this |
|---|---|
| Change prices or MRP | `src/lib/products.ts`: constants `TEE_PRICE`, `TEE_PRICE_HIGH`, `TEE_MRP`, `HOODIE_PRICE`, `HOODIE_MRP`. Scorpion, Mentality and Hope are in the `HIGH` set. |
| Add a product | Add an object to `rawProducts` in `products.ts` (slug, name, category, collection, colours, sizes, stock, description, images). The page, sitemap entry and SEO tags are created automatically at build time. |
| Mark something sold out or low stock | `stock` per size in `products.ts` (set to `0`). |
| Change the best seller | The `star` product in `src/app/home.tsx`, the `badge` in `products.ts`, and `popularity`/`addedAt` for ordering. |
| Change phone / WhatsApp / email / address | `src/lib/site.ts` (`whatsapp` is digits only, with country code, e.g. `917030189953`). |
| Edit shipping, returns, privacy, terms | `src/app/policies.tsx` |
| Edit FAQs / size guide / About text | `src/app/faq/page.tsx`, `src/app/size-guide/page.tsx`, `src/app/about/page.tsx` |
| Change tee specifications | The tee branch at the bottom of `products.ts` |
| Change colours / fonts / animations | `src/globals.css` |
| Change top announcement bar | `announcement` in `src/lib/site.ts` |

After any edit, commit and push to `main`; the site redeploys by itself.

## Business details and policies
Contact details and prices are real. The **policy pages, FAQ answers, care instructions and tee-specification wording were drafted as sensible defaults** (for example, returns accepted within 48 hours for damaged or wrong items). The brand owner should review them and change anything that does not match how the business actually operates. They are not legal advice.

## Known limits
- **No payments or order database.** Orders exist only as WhatsApp messages. Stock numbers are not decremented automatically. Update `stock` by hand.
- **Cart and wishlist are per device** (stored in the browser).
- **No customer accounts** (not needed for WhatsApp ordering).
- The two hoodie photos are lower resolution than the tee photos.
- Product `fabric` text for the hoodies and the exact thread/stitching claims should be confirmed by the brand.

## Accounts and secrets
- **GitHub repository secrets** (Settings → Secrets and variables → Actions): `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` (used by the deploy workflow), and `CLOUDFLARE_API_TOKEN` (left over from the Cloudflare attempt; can be deleted).
- **Netlify site:** `hoodscraft` (Project ID `8ecf1ca5-1e0b-4e92-bdf6-6dc27d3b7e63`).
- Never commit tokens or `.env` files. `.env*` is already in `.gitignore`.
