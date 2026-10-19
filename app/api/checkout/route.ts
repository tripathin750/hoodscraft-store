import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

/**
 * Server-side validation of the cart against the catalogue (prices/stock are never trusted from the client).
 * No payment provider is configured, so this route never reports a successful order.
 * To go live: create a Stripe Checkout Session (or Shopify checkout) here using the server-validated lines.
 */
export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  const lines = (body as { lines?: unknown }).lines;
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) return NextResponse.json({ message: "Your cart is empty or invalid." }, { status: 400 });

  let total = 0;
  for (const l of lines as { slug?: string; size?: string; colour?: string; qty?: number }[]) {
    const p = typeof l.slug === "string" ? getProduct(l.slug) : undefined;
    if (!p || !l.size || !(l.size in p.stock) || !p.colours.some((c) => c.name === l.colour) || !Number.isInteger(l.qty) || (l.qty as number) < 1)
      return NextResponse.json({ message: "A cart item is invalid." }, { status: 422 });
    if ((p.stock[l.size] ?? 0) < (l.qty as number)) return NextResponse.json({ message: `${p.name} (${l.size}) doesn't have enough stock.` }, { status: 409 });
    total += p.price * (l.qty as number);
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ message: `Cart validated (${total.toFixed(2)} GBP), but no payment provider is configured, so no order was placed. See the README.` }, { status: 501 });
  }
  return NextResponse.json({ message: "A payment provider key is set but the payment flow has not been implemented yet." }, { status: 501 });
}
