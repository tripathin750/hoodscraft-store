import { site } from "./site";
/** Opens a WhatsApp chat with the store number and a prefilled message. Returns the URL (also usable as a fallback link). */
export const waUrl = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export function openWhatsApp(text: string) { const u = waUrl(text); window.open(u, "_blank", "noopener"); return u; }
