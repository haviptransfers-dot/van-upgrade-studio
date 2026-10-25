import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("../", import.meta.url));
export const SITE = "https://haviptransfers.gr";
const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const values = (text, key) => [...text.matchAll(new RegExp(`\\b${key}\\s*:\\s*["']([^"']+)["']`, "g"))].map((match) => match[1]);

export function publicPaths() {
  const routes = values(source("src/seoRoutes.ts"), "path");
  const slugs = values(source("src/data/blogPosts.ts") + source("src/data/nafplio.ts"), "slug");
  if (!routes.length || !slugs.length) throw new Error("Public route or blog catalog is empty");
  return [...new Set(["/", ...routes, "/about", "/blog", "/privacy-policy", ...slugs.map((slug) => `/blog/${slug}`)])];
}

export function generateSitemap(paths = publicPaths()) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(paths)].map((path) => `  <url><loc>${SITE}${path}</loc></url>`).join("\n")}\n</urlset>\n`;
}