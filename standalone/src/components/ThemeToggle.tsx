import { useEffect, useState } from "react";

const read = () => { try { return localStorage.getItem("hc.theme") === "dark" ? "dark" : "light"; } catch { return "light"; } };

/** Light / dark switch. The saved choice is applied before first paint by a small script in index.html. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => setTheme(read()), []);
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("hc.theme", next); } catch { /* storage unavailable */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#07080a" : "#f0f0ee");
  };
  const dark = theme === "dark";
  return (
    <button className="grid h-12 w-12 place-items-center hover:opacity-60" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={dark} onClick={flip}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark
          ? <><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" /></>
          : <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />}
      </svg>
    </button>
  );
}
