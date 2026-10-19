import { useEffect, useState } from "react";
import { Scramble } from "./Scramble";
import logo from "@/assets/logo.png";
/** Short once-per-session intro: logo + decoding wordmark, then fades. Click to skip. */
export function Intro() {
  const seen = (() => { try { return sessionStorage.getItem("hc.intro") === "1"; } catch { return false; } })();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [phase, setPhase] = useState<"show" | "fade" | "gone">(seen || reduced ? "gone" : "show");
  useEffect(() => {
    if (phase === "gone") return;
    try { sessionStorage.setItem("hc.intro", "1"); } catch { /* ignore */ }
    const a = setTimeout(() => setPhase("fade"), 1300), b = setTimeout(() => setPhase("gone"), 1900);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [phase === "gone"]);
  if (phase === "gone") return null;
  return (
    <div onClick={() => setPhase("gone")} role="presentation" className={`fixed inset-0 z-[200] grid cursor-pointer place-content-center justify-items-center gap-5 bg-black transition-opacity duration-500 ${phase === "fade" ? "opacity-0" : "opacity-100"}`}>
      <img src={logo} alt="" className="intro-logo h-20 w-auto" />
      <p className="font-display caps text-bone"><Scramble text="HOODSCRAFT" hover={false} /></p>
      <span className="intro-bar h-px w-40 bg-volt" />
    </div>
  );
}
