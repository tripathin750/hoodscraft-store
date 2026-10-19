"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-x grid place-items-center gap-5 py-32 text-center">
      <h1 className="text-6xl font-extrabold">Something went wrong</h1>
      <p className="text-silver">Please try again.</p>
      <button onClick={reset} className="btn btn-primary">Try again</button>
    </div>
  );
}
