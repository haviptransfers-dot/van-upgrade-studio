import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { rssPlugin } from "./rssPlugin";
import { readFileSync } from "node:fs";

function performanceHtml() {
  return {
    name: "performance-html",
    transformIndexHtml(html: string) {
      const manifest = JSON.parse(readFileSync(path.resolve(__dirname, "src/assets/imageManifest.json"), "utf8"));
      const variants = (manifest["hero-sunset-car.webp"].variants as { url: string; width: number }[]).filter((variant) => variant.width <= 800);
      const hero = variants[variants.length - 1];
      if (!hero) return html;
      const hosted = (url: string) => `https://van-move-boost.lovable.app${url}`;
      return html.replace("<!-- HERO_PRELOAD -->", `<link rel="preload" as="image" href="${hosted(hero.url)}" imagesrcset="${variants.map((v) => `${hosted(v.url)} ${v.width}w`).join(", ")}" imagesizes="100vw" type="image/webp" fetchpriority="high" />`);
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
  plugins: [react(), rssPlugin(), performanceHtml(), mode === "development" && componentTagger()].filter(Boolean),
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
