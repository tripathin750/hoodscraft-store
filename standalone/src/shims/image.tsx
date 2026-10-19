const files = import.meta.glob("/src/assets/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const find = (src: string) => files["/src/assets/" + src.split("/").pop()];
export default function Image({ src, alt, fill, className, width, height, priority, sizes }: { src: string; alt: string; fill?: boolean; className?: string; width?: number; height?: number; priority?: boolean; sizes?: string; [k: string]: unknown }) {
  const full = find(src) ?? src;
  const thumb = find(src.replace(/\.jpg$/, "-t.jpg"));
  return <img src={full} srcSet={thumb ? `${thumb} 520w, ${full} 910w` : undefined} sizes={thumb ? sizes : undefined} alt={alt} width={fill ? undefined : width} height={fill ? undefined : height} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} className={`${fill ? "absolute inset-0 h-full w-full " : ""}${className ?? ""}`} />;
}
