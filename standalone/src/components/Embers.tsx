import { useEffect, useRef } from "react";
/** Floating ember particles that drift upward and are pushed away by the cursor. */
export function Embers({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true; const mouse = { x: -999, y: -999 };
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const n = innerWidth < 700 ? Math.floor(count / 2) : count;
    const ps = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 1.8, v: 0.015 + Math.random() * 0.05, ph: Math.random() * 6.28, ox: 0, oy: 0 }));
    const size = () => { const r = c.getBoundingClientRect(); w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduced) loop(); });
    io.observe(c);
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        if (!reduced) { p.y -= p.v / 60; if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); } }
        let x = p.x * w + Math.sin(t / 1600 + p.ph) * 14 + p.ox, y = p.y * h + p.oy;
        const dx = x - mouse.x, dy = y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { p.ox += (dx / d) * (120 - d) * 0.02; p.oy += (dy / d) * (120 - d) * 0.02; }
        p.ox *= 0.96; p.oy *= 0.96;
        const a = 0.25 + 0.55 * Math.abs(Math.sin(t / 700 + p.ph));
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 5);
        g.addColorStop(0, `rgba(214,232,255,${a})`); g.addColorStop(1, "rgba(188,220,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, p.r * 5, 0, 6.283); ctx.fill();
      }
    };
    const loop = () => { cancelAnimationFrame(raf); const f = (t: number) => { if (!visible) return; draw(t); raf = requestAnimationFrame(f); }; raf = requestAnimationFrame(f); };
    if (reduced) draw(0); else loop();
    addEventListener("pointermove", move); addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("pointermove", move); removeEventListener("resize", size); };
  }, [count]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
