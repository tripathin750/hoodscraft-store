export function Marquee({ items, className = "" }: { items: string[]; className?: string; speed?: number }) { return <p className={className}>{items.join("  ·  ")}</p>; }
