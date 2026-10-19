# HOODSCRAFT — Redefining Elite Streetwear

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Deployable on Vercel.

## Honest status

| Feature | Status |
|---|---|
| Storefront (home, shop, filters, search, PDP, collections, about, FAQ, contact, size guide, policies) | Built, runs on **local demo data** |
| Cart (drawer + page, quantities, subtotal, persisted in localStorage), wishlist, recently viewed | Working (per device) |
| Server-side cart validation (`/api/checkout`) | Working — but **no payment provider is connected**, so it never creates an order |
| Payments / real checkout | **Not implemented.** Needs a commerce backend or Stripe |
| Customer accounts, order history, discount codes | **Not implemented** (need a backend; `/account` says so) |
| Admin dashboard | Not built — use your commerce platform's admin once connected |
| Newsletter + contact forms | Work once you set `NEWSLETTER_WEBHOOK_URL` / `CONTACT_WEBHOOK_URL`; otherwise they say "not connected" |

**Placeholders you must replace:** all prices, stock, sizes, tee names/descriptions, GSM per product, care/shipping/returns text, policies, contact details, brand story, announcement bar, size chart, every image. Search the code for `[` brackets and "placeholder".
Instagram could not be inspected automatically, so logo, colours and photos are NOT taken from your real feed — the logo is a text wordmark.

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Edit content
- `lib/site.ts` — brand name, announcement, nav, contact details, Instagram link.
- `lib/products.ts` — products, prices, stock, sizes, colours, collections.
- Product photos: put files in `public/products/` and list them in a product's `images: ["/products/black-hoodie-1.jpg", ...]`. Until then a labelled placeholder shows. Use 4:5 portrait photos.
- Policies: `app/policies/[slug]/page.tsx`; size chart: `app/size-guide/page.tsx`; FAQs: `app/faq/page.tsx`.
- Hero / editorial / Instagram tiles: `app/page.tsx` (placeholders to replace with real images; Instagram posts must be added manually or via an Instagram embed/API you set up).

## Deploy to Vercel
1. Push to GitHub, import the repo at vercel.com/new (framework auto-detected).
2. Add env vars from `.env.example` (set `NEXT_PUBLIC_SITE_URL` to your real domain).
3. Deploy. Fonts (Barlow Condensed, Archivo) download from Google at build time.
4. Domain: Vercel → Project → Settings → Domains → add yours, then set the DNS records Vercel shows.

## Going live checklist
- [ ] Real products, prices, stock, photos
- [ ] Choose backend (recommended: Shopify via Storefront API, or Stripe Checkout for a small catalogue) and implement it in `lib/products.ts` + `app/api/checkout/route.ts`
- [ ] Payment provider account + keys (server-side env vars only)
- [ ] Newsletter/contact webhook URLs
- [ ] Policies reviewed (ideally by a legal professional), business details confirmed
- [ ] Custom domain + `NEXT_PUBLIC_SITE_URL`
- [ ] Add a social share image (`app/opengraph-image.png`) and favicon

## Live site (GitHub Pages)
`docs/index.html` is a self-contained build of the HOODSCRAFT storefront (orange/black design, real catalogue). Enable **Settings → Pages → Deploy from a branch → `main` / `/docs`**. Source for that build is in `standalone/` (Vite + React): `cd standalone && npm i && npm run build`.

## Free hosting (GitHub Pages, ₹0 / £0)
The orange-theme store lives in `standalone/` (Vite + React, hash routing, no server). Pushing to `main`/`master` builds and deploys it via `.github/workflows/deploy.yml`.
1. Push this repo to GitHub. 2. Repo → Settings → Pages → Source: **GitHub Actions**. 3. Done — site at `https://<user>.github.io/<repo>/`.
Local: `cd standalone && npm install && npm run dev` (needs Node 20+). Output is split into cached, hashed files with self-hosted fonts and lazy-loaded images/routes.
Forms and checkout are not connected (no server); wire a free form service (Formspree/Web3Forms) and a payment link (Razorpay/Stripe Payment Links) when ready.
