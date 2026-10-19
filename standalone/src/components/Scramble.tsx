import { useCallback, useEffect, useRef, useState } from "react";
const GLYPHS = "▓▒░#/\\<>_01+*";
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Text that decodes from noise when it scrolls into view, and again on hover. */
export function Scramble({ text, className = "", hover = true }: { text: string; className?: string; hover?: boolean }) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const run = useCallback(() => {
    if (reduce()) return setOut(text);
    cancelAnimationFrame(raf.current);
    const start = performance.now(), dur = 650 + text.length * 25;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setOut(text.split("").map((c, i) => (c === " " || i < p * text.length ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf.current); };
  }, [run]);
  return <span ref={ref} className={className} aria-label={text} onMouseEnter={hover ? run : undefined}><span aria-hidden="true">{out}</span></span>;
}
