/** Words rise out of a mask one by one when the block scrolls into view (driven by [data-reveal] in FX). */
export function Kinetic({ text, className = "", accent = [] as string[] }: { text: string; className?: string; accent?: string[] }) {
  return (
    <span data-reveal="words" className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden="true" className="kw"><span className={accent.includes(w) ? "text-volt glow" : ""} style={{ transitionDelay: `${i * 110}ms` }}>{w}</span>{" "}</span>
      ))}
    </span>
  );
}
