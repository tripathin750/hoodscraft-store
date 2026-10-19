import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Archivo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const display = Barlow_Condensed({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"], display: "swap" });
const body = Archivo({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: "HOODSCRAFT is premium, bold, contemporary streetwear: hoodies, graphic tees and statement pieces. Crafted for the fearless.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, title: `${site.name} — ${site.tagline}`, description: site.campaign },
  twitter: { card: "summary_large_image", title: site.name, description: site.tagline },
};
export const viewport: Viewport = { themeColor: "#07080b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Providers>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:bg-bone focus:text-ink focus:p-3">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
