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
  const base = [...new Set(["/", ...routes, "/about", "/blog", "/privacy-policy", "/child-seats", ...slugs.map((slug) => `/blog/${slug}`)])];
  return LANGUAGES.flatMap((language) => base.map((path) => localPath(path, language)));
}

const LANGUAGES = ["en", "el", "de", "es", "fr", "it", "he", "ar"];
const localPath = (path, language) => language === "en" ? path : `/${language}${path}`;
const basePath = (path) => path.replace(/^\/(el|de|es|fr|it|he|ar)(?=\/|$)/, "") || "/";

export function expectedHreflangs(path) {
  return Object.fromEntries([...LANGUAGES, "x-default"].map((language) => [
    language, `${SITE}${localPath(basePath(path), language === "x-default" ? "en" : language)}`,
  ]));
}

export function generateSitemap(paths = publicPaths()) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${[...new Set(paths)].map((path) => `  <url><loc>${SITE}${path}</loc>${[...LANGUAGES, "x-default"].map((language) => `<xhtml:link rel="alternate" hreflang="${language}" href="${SITE}${localPath(basePath(path), language === "x-default" ? "en" : language)}" />`).join("")}</url>`).join("\n")}\n</urlset>\n`;
}