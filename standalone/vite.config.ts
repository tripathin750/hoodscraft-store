import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";
import { prerender } from "./prerender";
const s = (f: string) => path.resolve(__dirname, "src/shims", f);
export default defineConfig({
  base: "/",
  build: { target: "es2020", cssCodeSplit: true, chunkSizeWarningLimit: 400, rollupOptions: { output: { manualChunks: { react: ["react", "react-dom"] } } } },
  plugins: [react(), tailwind(), prerender()],
  resolve: { alias: { "@": path.resolve(__dirname, "src"), "next/link": s("link.tsx"), "next/image": s("image.tsx"), "next/navigation": s("navigation.ts") } },
});
