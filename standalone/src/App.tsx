import { lazy, Suspense, useEffect } from "react";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { parse, useHash } from "./shims/navigation";
import { metaFor } from "./lib/seo";
import Home from "./app/home";
import Shop from "./app/shop/page";
import Collections from "./app/collections/page";
import About from "./app/about/page";
import Contact from "./app/contact/page";
import FAQ from "./app/faq/page";
import SizeGuide from "./app/size-guide/page";
import Cart from "./app/cart/page";
import Checkout from "./app/checkout/page";
import Wishlist from "./app/wishlist/page";
import Policy from "./app/policies";
import Product from "./app/product";
import Link from "next/link";

function NotFound() {
  return (<div className="container-x grid place-items-center gap-5 py-32 text-center"><p className="label text-volt">Error 404</p><h1 className="text-7xl font-extrabold">Page not found</h1><div className="flex gap-3"><Link href="/" className="btn btn-primary">Home</Link><Link href="/shop" className="btn btn-ghost">Shop all</Link></div></div>);
}

function Route() {
  const { path } = parse();
  const m = (re: RegExp) => path.match(re);
  try {
    let x;
    if (path === "/") return <Home />;
    if (path === "/shop") return <Shop />;
    if (path === "/collections") return <Collections />;
    if (path === "/about") return <About />;
    if (path === "/contact") return <Contact />;
    if (path === "/faq") return <FAQ />;
    if (path === "/size-guide") return <SizeGuide />;
    if (path === "/cart") return <Cart />;
    if (path === "/checkout") return <Checkout />;
    if (path === "/wishlist") return <Wishlist />;
    if ((x = m(/^\/policies\/([\w-]+)$/))) return <Policy slug={x[1]} />;
    if ((x = m(/^\/products\/([\w-]+)$/))) return <Product slug={x[1]} />;
  } catch { /* fallthrough */ }
  return <NotFound />;
}

export default function App() {
  const h = useHash();
  useEffect(() => { window.scrollTo(0, 0); }, [parse().path, h && 0]);
  useEffect(() => {
    const m = metaFor(parse().path);
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.description);
  }, [parse().path]);
  return (
    <Providers>
      
      <Header />
      <main id="main" key={parse().path} className="page-in"><Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}><Route /></Suspense></main>
      <Footer />
    </Providers>
  );
}
