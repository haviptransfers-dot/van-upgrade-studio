import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

async function mount() {
  // The HTML first screen stays visible while the non-blocking full stylesheet arrives.
  await Promise.all(Array.from(document.querySelectorAll<HTMLLinkElement>("link[data-deferred-css]"))
    .map((link) => link.sheet ? Promise.resolve() : new Promise<void>((resolve) => {
      link.addEventListener("styles-ready", () => resolve(), { once: true });
      link.addEventListener("error", () => resolve(), { once: true });
    })));
  const root = document.getElementById("root");
  if (!root) return;
  // Other routes must never inherit the homepage's static first screen.
  if (location.pathname !== "/") document.getElementById("first-screen")?.remove();
  createRoot(root).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
}
void mount();
