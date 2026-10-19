import { useEffect, useState } from "react";
const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
export function PuneClock() {
  const [t, setT] = useState("");
  useEffect(() => { const f = () => setT(fmt.format(new Date())); f(); const i = setInterval(f, 1000); return () => clearInterval(i); }, []);
  return <p className="hidden shrink-0 items-center gap-2 tabular-nums sm:flex" aria-label="Current time in Pune"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />PUNE {t} IST</p>;
}
