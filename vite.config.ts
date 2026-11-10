import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { rssPlugin } from "./rssPlugin";
import { nafplioPlugin } from "./nafplioPlugin";
import { readFileSync } from "node:fs";
import { nonCriticalScheduler } from "./src/lib/non-critical-scheduler";
import { sitemapPlugin } from "./sitemapPlugin";
import { organization } from "./src/data/structuredData";
import { canonicalPlugin } from "./canonicalPlugin";
import { multilingualPlugin } from "./multilingualPlugin";
import { heroDelivery } from "./src/lib/heroDelivery";

function performanceHtml() {
  return {
    name: "performance-html",
    transformIndexHtml: {
      order: "post" as const,
      handler(html: string) {
      const critical = readFileSync(path.resolve(__dirname, "src/critical-screen.css"), "utf8");
      const fontPreloads = [...critical.matchAll(/src: url\(([^)]+\/(?:playfair-display|montserrat)-latin\.woff2)\)/g)]
        .map((match) => `<link rel="preload" as="font" type="font/woff2" href="${match[1]}" crossorigin />`).join("");
      const screen = readFileSync(path.resolve(__dirname, "src/first-screen.html"), "utf8")
        .replaceAll("__HERO_SRCSET__", heroDelivery.srcSet).replaceAll("__HERO_SRC__", heroDelivery.src)
        .replace('sizes="100vw"', `sizes="${heroDelivery.sizes}"`)
        .replace('class="absolute inset-0 w-full h-full object-cover"', 'class="absolute inset-0 w-full h-full object-cover hero-base-zoom"');
      return html
        .replace("<!-- ORGANIZATION_SCHEMA -->", `<script id="organization-structured-data" type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", ...organization })}</script>`)
        .replaceAll("setTimeout(function () {", "window.scheduleNonCritical(function () {")
        .replaceAll("}, 3000);", "});")
        .replace("<!-- Google Preferred Sources button script -->", `<script>${nonCriticalScheduler}</script><!-- Google Preferred Sources button script -->`)
        .replace("<!-- HERO_PRELOAD -->", `<link rel="preconnect" href="https://van-move-boost.lovable.app" crossorigin /><link rel="preload" as="image" href="${heroDelivery.src}" imagesrcset="${heroDelivery.srcSet}" imagesizes="${heroDelivery.sizes}" type="image/webp" fetchpriority="high" />`)
        .replace("<!-- CRITICAL_CSS -->", `${fontPreloads}<style>${critical}</style>`)
        .replace("<!-- FIRST_SCREEN -->", `<div id="first-screen">${screen}</div>`)
        .replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, (tag) => {
          const href = tag.match(/href="([^"]+)"/)?.[1];
          if (!href) return tag;
          return `<link rel="preload" as="style" href="${href}" data-deferred-css onload="this.onload=null;this.rel='stylesheet';this.dispatchEvent(new Event('styles-ready'))" /><noscript>${tag}</noscript>`;
        });
      },
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), rssPlugin(), sitemapPlugin(), performanceHtml(), canonicalPlugin(), multilingualPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  build: {
    minify: "esbuild",
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules") && /\/(react|react-dom|scheduler)\//.test(id)) return "react-vendor";
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion-")) return "motion-vendor";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
