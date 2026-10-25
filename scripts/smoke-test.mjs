// Post-deployment smoke test against the live site.
// Usage: node scripts/smoke-test.mjs [baseUrl]   (default https://haviptransfers.gr)
//
// Checks, with retries to tolerate deploy propagation:
//   1. sitemap.xml — 200, valid urlset XML, contains every public page and blog article
//   2. robots.txt — references Sitemap: <base>/sitemap.xml
//   3. structured data — every public page serves parseable JSON-LD including Organization
//   4. SEO head tags (rendered) — every public page has a unique <title>, a canonical
//      URL on the production domain, and en/x-default hreflang self-references
//
// Checks 1–3 read raw HTML; check 4 uses headless Chromium because titles and
// canonicals are client-rendered. Service/TouristTrip schema content is validated
// per page by src/test/structured-data.test.ts in the CI test suite.

import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = (process.argv[2] || "https://haviptransfers.gr").replace(/\/$/, "");
const SITE = "https://haviptransfers.gr"; // canonical domain, expected regardless of the host under test
const RETRIES = 3;
const RETRY_DELAY_MS = 5000;

const seoPaths = [...readFileSync("src/seoRoutes.ts", "utf8").matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
const blogSlugs = [
  ...(readFileSync("src/data/blogPosts.ts", "utf8") + readFileSync("src/data/nafplio.ts", "utf8")).matchAll(
    /slug:\s*"([^"]+)"/g,
  ),
].map((m) => m[1]);

const publicPaths = ["/", ...seoPaths, "/about", "/blog", "/privacy-policy", ...blogSlugs.map((s) => `/blog/${s}`)];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url) {
  let lastError;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const resp = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
      if (resp.ok) return await resp.text();
      lastError = new Error(`HTTP ${resp.status}`);
    } catch (e) {
      lastError = e;
    }
    if (attempt < RETRIES) await sleep(RETRY_DELAY_MS);
  }
  throw lastError;
}

const failures = [];
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failures.push(label);
};

// --- 1. sitemap.xml ---
try {
  const sitemap = await fetchWithRetry(`${BASE}/sitemap.xml`);
  check(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), "sitemap.xml is a valid urlset");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const missing = publicPaths.filter((p) => !locs.includes(`${BASE}${p}`));
  check(missing.length === 0, `sitemap.xml lists all ${publicPaths.length} public pages${missing.length ? ` — missing: ${missing.join(", ")}` : ""}`);
  check(locs.every((l) => l.startsWith(`${BASE}/`)), "sitemap.xml uses only the production domain");
} catch (e) {
  check(false, `sitemap.xml reachable (${e.message})`);
}

// --- 2. robots.txt ---
try {
  const robots = await fetchWithRetry(`${BASE}/robots.txt`);
  check(robots.includes(`Sitemap: ${BASE}/sitemap.xml`), "robots.txt references the sitemap");
} catch (e) {
  check(false, `robots.txt reachable (${e.message})`);
}

// --- 3. structured data on every public page ---
for (const path of publicPaths) {
  try {
    const html = await fetchWithRetry(`${BASE}${path}`);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    if (blocks.length === 0) {
      check(false, `${path} serves JSON-LD`);
      continue;
    }
    let parsed;
    try {
      parsed = blocks.map((b) => JSON.parse(b));
    } catch {
      check(false, `${path} JSON-LD parses`);
      continue;
    }
    const hasOrganization = parsed.some((b) => {
      const types = [b?.["@type"] ?? []].flat();
      return types.includes("Organization") || types.includes("TravelAgency") || types.includes("LocalBusiness");
    });
    check(hasOrganization, `${path} serves valid Organization structured data`);
  } catch (e) {
    check(false, `${path} reachable (${e.message})`);
  }
}

// --- 4. rendered SEO head tags: title, canonical, hreflang ---
const expectedUrl = (path) => (path === "/" ? `${SITE}/` : `${SITE}${path}`);
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let homeTitle = "";
  for (const path of publicPaths) {
    try {
      await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      // Titles/canonicals are client-rendered; wait for the canonical to appear.
      await page.waitForSelector('link[rel="canonical"]', { state: "attached", timeout: 15000 });
      const head = await page.evaluate(() => ({
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
        hreflangs: Object.fromEntries(
          [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => [
            l.getAttribute("hreflang"),
            l.getAttribute("href"),
          ]),
        ),
      }));
      if (path === "/") homeTitle = head.title;
      const titleOk =
        head.title.length > 0 && head.title !== "Lovable App" && (path === "/" || head.title !== homeTitle);
      check(titleOk, `${path} has a unique rendered <title>${titleOk ? "" : ` (got "${head.title}")`}`);
      check(head.canonical === expectedUrl(path), `${path} canonical is ${expectedUrl(path)}${head.canonical === expectedUrl(path) ? "" : ` (got "${head.canonical}")`}`);
      check(
        head.hreflangs["en"] === expectedUrl(path) && head.hreflangs["x-default"] === expectedUrl(path),
        `${path} hreflang en + x-default self-reference the page URL`,
      );
    } catch (e) {
      check(false, `${path} renders SEO head tags (${e.message.split("\n")[0]})`);
    }
  }
} catch (e) {
  check(false, `headless browser available for rendered checks (${e.message.split("\n")[0]})`);
} finally {
  await browser?.close();
}

console.log(failures.length ? `\n${failures.length} smoke check(s) FAILED` : "\nAll smoke checks passed");
if (failures.length) process.exit(1);
