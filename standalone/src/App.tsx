import { lazy, Suspense, useEffect } from "react";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { parse, useHash } from "./shims/navigation";
import Home from "./app/home";
const Shop = lazy(() => import("./app/shop/page"));
const Collections = lazy(() => import("./app/collections/page"));
const About = lazy(() => import("./app/about/page"));
const Contact = lazy(() => import("./app/contact/page"));
const FAQ = lazy(() => import("./app/faq/page"));
const SizeGuide = lazy(() => import("./app/size-guide/page"));
const Account = lazy(() => import("./app/account/page"));
const Cart = lazy(() => import("./app/cart/page"));
const Checkout = lazy(() => import("./app/checkout/page"));
const Wishlist = lazy(() => import("./app/wishlist/page"));
const Policy = lazy(() => import("./app/policies"));
const Product = lazy(() => import("./app/product"));
import Link from "next/link";
import { FX } from "@/components/FX";
import { Intro } from "@/components/Intro";

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
    if (path === "/account") return <Account />;
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
  return (
    <Providers>
      <FX /><Intro />
      <div className="grain-fx" aria-hidden="true" /><div className="vignette" aria-hidden="true" />
      <Header />
      <main id="main"><Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}><Route /></Suspense></main>
      <Footer />
    </Providers>
  );
}
