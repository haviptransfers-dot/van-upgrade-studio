// Regenerates public/sitemap.xml from the app's declared routes and blog slugs.
// Usage:
//   node scripts/sync-sitemap.mjs          -> rewrite public/sitemap.xml if out of date
//   node scripts/sync-sitemap.mjs --check  -> exit 1 if out of date (CI mode, no write)
// The sitemap-robots test verifies this output matches sitemapXml.ts exactly,
// so the template below must stay in sync with sitemapXml.ts.

import { readFileSync, writeFileSync } from "node:fs";

const DOMAIN = "https://haviptransfers.gr";
const checkOnly = process.argv.includes("--check");

const seoRoutesSource = readFileSync("src/seoRoutes.ts", "utf8");
const seoPaths = [...seoRoutesSource.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);

const blogSources =
  readFileSync("src/data/blogPosts.ts", "utf8") + readFileSync("src/data/nafplio.ts", "utf8");
const slugs = [...blogSources.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const paths = ["/", ...seoPaths, "/about", "/blog", ...slugs.map((slug) => `/blog/${slug}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(paths)]
  .map((pathname) => `  <url><loc>${DOMAIN}${pathname}</loc></url>`)
  .join("\n")}\n</urlset>\n`;

let current = "";
try {
  current = readFileSync("public/sitemap.xml", "utf8");
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

writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml regenerated (${new Set(paths).size} URLs)`);
