import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Shop HOODSCRAFT hoodies, graphic tees and streetwear.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return <Suspense fallback={<div className="container-x py-24 text-silver" role="status">Loading products…</div>}><ShopClient /></Suspense>;
}
