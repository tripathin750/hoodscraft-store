import { useEffect } from "react";

/** Global interaction layer: cursor ring, magnetic buttons, 3D card tilt, spotlight tracking, scroll progress, reveal-on-scroll. */
export function FX() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const root = document.documentElement;

    // ---- reveal on scroll
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    let spots: HTMLElement[] = [], pars: HTMLElement[] = [];
    const cache = () => { spots = [...document.querySelectorAll<HTMLElement>("[data-spot]")]; pars = [...document.querySelectorAll<HTMLElement>("[data-parallax]")]; };
    const scan = () => { cache(); scanReveal(); };
    const scanReveal = () => document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in):not([data-seen])").forEach((el) => { el.dataset.seen = "1"; reduced ? el.classList.add("in") : io.observe(el); });
    scan();
    const mo = new MutationObserver(() => requestAnimationFrame(scan)); mo.observe(document.getElementById("root")!, { childList: true, subtree: true });

    // ---- scroll progress
    const onScroll = () => { const h = root.scrollHeight - innerHeight; root.style.setProperty("--progress", String(h > 0 ? scrollY / h : 0)); };
    onScroll(); addEventListener("scroll", onScroll, { passive: true });

    if (reduced) return () => { io.disconnect(); mo.disconnect(); removeEventListener("scroll", onScroll); };

    // ---- cursor ring
    let ring: HTMLElement | null = null, dot: HTMLElement | null = null;
    if (fine) {
      ring = document.createElement("div"); ring.className = "cursor-ring"; dot = document.createElement("div"); dot.className = "cursor-dot";
      document.body.append(ring, dot);
    }
    const m = { x: innerWidth / 2, y: innerHeight / 2, rx: innerWidth / 2, ry: innerHeight / 2, moved: 0 };
    let mag: HTMLElement | null = null, tilt: HTMLElement | null = null;

    const reset = (el: HTMLElement | null, t = ".5s") => { if (el) { el.style.transition = `transform ${t} cubic-bezier(.2,.7,.2,1)`; el.style.transform = ""; } };
    const onMove = (e: PointerEvent) => {
      m.x = e.clientX; m.y = e.clientY; m.moved = performance.now();
      if (e.pointerType !== "mouse") return;
      const t = e.target as HTMLElement;
      const interactive = t.closest?.("a,button,[role=button],input,select,textarea,summary");
      ring?.classList.toggle("hot", !!interactive);
      // magnetic buttons
      const b = t.closest?.<HTMLElement>(".btn") ?? null;
      if (b !== mag) { reset(mag); mag = b; }
      if (b) { const r = b.getBoundingClientRect(); b.style.transition = "transform .15s"; b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`; }
      // 3D tilt
      const c = t.closest?.<HTMLElement>("[data-tilt]") ?? null;
      if (c !== tilt) { reset(tilt); tilt = c; }
      if (c) { const r = c.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; c.style.transition = "transform .12s"; c.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) scale(1.02)`; }
    };
    const onLeave = () => { reset(mag); reset(tilt); mag = tilt = null; };
    addEventListener("pointermove", onMove, { passive: true }); document.addEventListener("pointerleave", onLeave);

    // ---- spotlight tracking (smoothed; drifts on its own when idle / on touch)
    const sp = { x: 0, y: 0 }; let raf = 0;
    const loop = (now: number) => {
      if (document.hidden) { raf = requestAnimationFrame(loop); return; }
      m.rx += (m.x - m.rx) * 0.14; m.ry += (m.y - m.ry) * 0.14;
      if (ring && dot) { ring.style.transform = `translate3d(${m.rx}px,${m.ry}px,0)`; dot.style.transform = `translate3d(${m.x}px,${m.y}px,0)`; }
      const idle = !fine || now - m.moved > 2500;
      spots.forEach((el) => {
        const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
        const tx = idle ? r.width * (0.5 + 0.38 * Math.sin(now / 1900)) : m.rx - r.left;
        const ty = idle ? r.height * (0.5 + 0.3 * Math.sin(now / 1300 + 1.3)) : m.ry - r.top;
        sp.x = tx; sp.y = ty; el.style.setProperty("--sx", `${tx}px`); el.style.setProperty("--sy", `${ty}px`);
      });
      // hero parallax
      pars.forEach((el) => {
        const k = parseFloat(el.dataset.parallax || "12"); const px = (m.rx / innerWidth - 0.5) * k, py = (m.ry / innerHeight - 0.5) * k;
        el.style.transform = `translate3d(${-px}px,${-py}px,0) scale(1.08)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); io.disconnect(); mo.disconnect(); removeEventListener("scroll", onScroll); removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave); ring?.remove(); dot?.remove(); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}
