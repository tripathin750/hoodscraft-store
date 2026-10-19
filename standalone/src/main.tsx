import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App";
// Old hash links (#/shop) redirect to real URLs.
if (location.hash.startsWith("#/")) history.replaceState(null, "", location.hash.slice(1));
createRoot(document.getElementById("root")!).render(<App />);
