export function PageShell({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <div className="container-x max-w-4xl py-14">
      <h1 className="text-6xl font-extrabold">{title}</h1>
      {intro && <p className="mt-4 text-lg text-silver">{intro}</p>}
      <div className="mt-10 grid gap-5 text-silver [&_h2]:mt-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-bone">{children}</div>
    </div>
  );
}
