import { useEffect, useRef } from "react";
/** Kinetic ticker: drifts continuously and speeds up / reverses with scroll velocity. */
export function Marquee({ items, className = "", speed = 60 }: { items: string[]; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!; const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let x = 0, vel = 0, last = performance.now(), lastY = scrollY, raf = 0, on = true;
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) { last = performance.now(); raf = requestAnimationFrame(tick); } });
    io.observe(el);
    function tick(now: number) {
      if (!on) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const dy = scrollY - lastY; lastY = scrollY; vel = vel * 0.92 + dy * 0.08;
      x -= (speed + vel * 45) * dt;
      const half = el.scrollWidth / 2; if (x <= -half) x += half; if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [speed]);
  const row = items.map((t, i) => <span key={i} className="px-6">{t}</span>);
  return <div className="overflow-hidden" aria-hidden="true"><div ref={ref} className={`flex w-max whitespace-nowrap will-change-transform ${className}`}>{row}{row}{row}{row}</div></div>;
}
