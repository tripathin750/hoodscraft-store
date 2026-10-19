import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/Prose";

const policies: Record<string, { title: string; body: string[] }> = {
  shipping: { title: "Shipping policy", body: ["[Shipping regions, costs, dispatch times and carriers — to be confirmed by HOODSCRAFT.]"] },
  returns: { title: "Returns & refunds", body: ["[Returns window, condition requirements, refund method and timing — to be confirmed by HOODSCRAFT. Make sure this complies with the consumer law that applies to your customers.]"] },
  privacy: { title: "Privacy policy", body: ["[Privacy policy — to be written/reviewed by HOODSCRAFT or a legal professional. It must describe what data is collected (e.g. email signups, orders), why, and for how long.]"] },
  terms: { title: "Terms & conditions", body: ["[Terms and conditions — to be written/reviewed by HOODSCRAFT or a legal professional. Include trading name, registered business details and governing law.]"] },
};
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(policies).map((slug) => ({ slug }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = policies[(await params).slug];
  return p ? { title: p.title, alternates: { canonical: `/policies/${(await params).slug}` } } : {};
}
export default async function Policy({ params }: Props) {
  const p = policies[(await params).slug];
  if (!p) notFound();
  return <PageShell title={p.title} intro="Placeholder content — edit before launch.">{p.body.map((t) => <p key={t}>{t}</p>)}</PageShell>;
}
