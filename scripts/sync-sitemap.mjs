// Regenerates public/sitemap.xml from the app's declared routes and blog slugs.
// Usage:
//   node scripts/sync-sitemap.mjs          -> rewrite public/sitemap.xml if out of date
//   node scripts/sync-sitemap.mjs --check  -> exit 1 if out of date (CI mode, no write)
// The sitemap-robots test verifies this output matches sitemapXml.ts exactly,
// so the template below must stay in sync with sitemapXml.ts.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { generateSitemap, publicPaths } from "./public-pages.mjs";

const checkOnly = process.argv.includes("--check");
const paths = publicPaths();
const xml = generateSitemap(paths);
const destination = new URL("../public/sitemap.xml", import.meta.url);

let current = "";
try {
  current = readFileSync(destination, "utf8");
} catch {
  // missing file — will be created below
}

if (current === xml) {
  console.log(`sitemap.xml is up to date (${new Set(paths).size} URLs)`);
  process.exit(0);
}

if (checkOnly) {
  console.error("sitemap.xml is out of date. Run: node scripts/sync-sitemap.mjs");
  process.exit(1);
}

mkdirSync(new URL("../public/", import.meta.url), { recursive: true });
writeFileSync(destination, xml);
console.log(`sitemap.xml regenerated (${new Set(paths).size} URLs)`);
