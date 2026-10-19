import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App";
// Old hash links (#/shop) redirect to real URLs.
if (location.hash.startsWith("#/")) history.replaceState(null, "", location.hash.slice(1));
// Preview build has no server: /api/* routes report "not connected" honestly.
const realFetch = window.fetch.bind(window);
window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const u = typeof input === "string" ? input : input instanceof URL ? input.pathname : input.url;
  if (u.startsWith("/api/")) return Promise.resolve(new Response(JSON.stringify({ message: "Preview only: forms and checkout aren't connected in this standalone version. Payments are not implemented." }), { status: 501, headers: { "Content-Type": "application/json" } }));
  return realFetch(input, init);
};
createRoot(document.getElementById("root")!).render(<App />);
