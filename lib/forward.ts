import { NextResponse } from "next/server";

/** Validates input and forwards to a webhook (e.g. Mailchimp/Klaviyo/Formspree/Zapier). Returns 501 if not configured — never fakes success. */
export async function forward(req: Request, envVar: string, required: string[]) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  const data: Record<string, string> = {};
  for (const k of required) {
    const v = typeof body[k] === "string" ? (body[k] as string).trim() : "";
    if (!v || v.length > 5000) return NextResponse.json({ message: "Please complete all fields." }, { status: 422 });
    if (k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return NextResponse.json({ message: "Please enter a valid email address." }, { status: 422 });
    data[k] = v;
  }
  const url = process.env[envVar];
  if (!url) return NextResponse.json({ message: "This form isn't connected yet — the site owner needs to configure it." }, { status: 501 });
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ message: "Thanks — we've got it." });
  } catch {
    return NextResponse.json({ message: "We couldn't send that right now. Please try again later." }, { status: 502 });
  }
}
