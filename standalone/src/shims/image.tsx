const files = import.meta.glob("/src/assets/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const resolve = (src: string) => files["/src/assets/" + src.split("/").pop()] ?? src;
export default function Image({ src, alt, fill, className, width, height, priority }: { src: string; alt: string; fill?: boolean; className?: string; width?: number; height?: number; priority?: boolean; [k: string]: unknown }) {
  return <img src={resolve(src)} alt={alt} width={fill ? undefined : width} height={fill ? undefined : height} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} className={`${fill ? "absolute inset-0 h-full w-full " : ""}${className ?? ""}`} />;
}
