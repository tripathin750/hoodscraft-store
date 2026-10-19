import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container-x grid place-items-center gap-5 py-32 text-center">
      <p className="label text-crimson">Error 404</p>
      <h1 className="text-7xl font-extrabold">Page not found</h1>
      <p className="text-silver">That page doesn’t exist or has moved.</p>
      <div className="flex gap-3"><Link href="/" className="btn btn-primary">Home</Link><Link href="/shop" className="btn btn-ghost">Shop all</Link></div>
    </div>
  );
}
