import { useEffect, useState } from "react";
import Image from "next/image";

/** Full-screen photo viewer. Tap or click the photo (or the Zoom button) to zoom in, then drag/scroll to look around. */
export function Lightbox({ images, start = 0, alt, onClose }: { images: string[]; start?: number; alt: string; onClose: () => void }) {
  const [i, setI] = useState(start);
  const [zoomed, setZoomed] = useState(false);
  const go = (d: number) => { setI((v) => (v + d + images.length) % images.length); setZoomed(false); };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) go(1);
      if (e.key === "ArrowLeft" && images.length > 1) go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [images.length, onClose]);

  const btn = "grid h-11 min-w-11 place-items-center rounded-full bg-white/15 px-4 text-sm text-white backdrop-blur hover:bg-white/25";
  return (
    <div role="dialog" aria-modal="true" aria-label={`${alt} photos`} className="fixed inset-0 z-[90] flex flex-col bg-black/95">
      <div className="flex items-center justify-between gap-3 p-3 text-white">
        <p className="text-sm text-white/70">{images.length > 1 ? `${i + 1} / ${images.length}` : alt}</p>
        <div className="flex gap-2">
          <button className={btn} onClick={() => setZoomed((z) => !z)} aria-pressed={zoomed}>{zoomed ? "Zoom out" : "Zoom in"}</button>
          <button className={btn} onClick={onClose} aria-label="Close photo viewer">✕</button>
        </div>
      </div>
      <div className={`relative min-h-0 flex-1 ${zoomed ? "overflow-auto" : "overflow-hidden"}`} onClick={() => setZoomed((z) => !z)}>
        {zoomed
          ? <Image src={images[i]} alt={alt} width={1400} height={1750} className="block max-w-none cursor-zoom-out w-[220%] md:w-[160%]" />
          : <Image src={images[i]} alt={alt} fill className="cursor-zoom-in object-contain" />}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-3 p-3">
          <button className={btn} onClick={() => go(-1)} aria-label="Previous photo">←</button>
          <button className={btn} onClick={() => go(1)} aria-label="Next photo">→</button>
        </div>
      )}
    </div>
  );
}
