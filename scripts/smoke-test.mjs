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
//
// On failure the script writes smoke-failures.md (grouped by check area) and,
// inside GitHub Actions, appends it to the job summary. The workflow turns that
// report into a GitHub issue, which triggers the notification email.
//
// Env overrides for local testing: SMOKE_RETRIES, SMOKE_RETRY_DELAY_MS.

import { writeFileSync, appendFileSync, rmSync } from "node:fs";
import { chromium } from "playwright";
import { SITE, publicPaths as getPublicPaths } from "./public-pages.mjs";
import { numericOption, fetchWithRetry as fetchRetry, UnavailableError, jsonLdBlocks, hasOrganization } from "./smoke-helpers.mjs";

const BASE = (process.argv[2] || "https://haviptransfers.gr").replace(/\/$/, "");
const RETRIES = numericOption(process.env.SMOKE_RETRIES, 3, 1);
const RETRY_DELAY_MS = numericOption(process.env.SMOKE_RETRY_DELAY_MS, 5000);
const FETCH_TIMEOUT_MS = numericOption(process.env.SMOKE_TIMEOUT_MS, 15000, 1);
const publicPaths = getPublicPaths();
const fetchWithRetry = (url) => fetchRetry(url, { retries: RETRIES, delay: RETRY_DELAY_MS, timeout: FETCH_TIMEOUT_MS });
const reportPath = new URL("../smoke-failures.md", import.meta.url);
rmSync(reportPath, { force: true });

// Failures are grouped by check area so the alert names exactly what broke.
const failures = []; // { section, label }
const skipped = [];
const unavailablePaths = new Set();
const reachablePaths = new Set();
const handleError = (error, label, section) => {
  if (error instanceof UnavailableError) {
    const message = `${label}: temporarily unavailable after ${RETRIES} attempts (${error.message})`;
    skipped.push({ section, label: message });
    console.warn(`SKIP  [${section}] ${message}`);
    return;
  }
  check(false, `${label} (${error.message})`, section);
};
const check = (ok, label, section) => {
  console.log(`${ok ? "PASS" : "FAIL"}  [${section}] ${label}`);
  if (!ok) failures.push({ section, label });
};

// --- 1. sitemap.xml ---
try {
  const sitemap = await fetchWithRetry(`${BASE}/sitemap.xml`);
  check(/<urlset\b[^>]*xmlns=["']http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9["'][^>]*>/.test(sitemap) && /<\/urlset>\s*$/.test(sitemap), "sitemap.xml is a valid urlset", "sitemap");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const missing = publicPaths.filter((p) => !locs.includes(`${SITE}${p}`));
  check(missing.length === 0, `sitemap.xml lists all ${publicPaths.length} public pages${missing.length ? ` — missing: ${missing.join(", ")}` : ""}`, "sitemap");
  check(locs.every((l) => l.startsWith(`${SITE}/`)), "sitemap.xml uses only the production domain", "sitemap");
  check(locs.length === publicPaths.length && new Set(locs).size === locs.length, "sitemap.xml contains only unique public pages", "sitemap");
} catch (e) {
  handleError(e, "sitemap.xml reachable", "sitemap");
}

// --- 2. robots.txt ---
try {
  const robots = await fetchWithRetry(`${BASE}/robots.txt`);
  check(robots.split(/\r?\n/).some((line) => line.trim().toLowerCase() === `sitemap: ${SITE}/sitemap.xml`.toLowerCase()), "robots.txt references the sitemap", "robots.txt");
} catch (e) {
  handleError(e, "robots.txt reachable", "robots.txt");
}

// A whole-site outage must not incur two retry loops for every page.
let siteUnavailable = false;
try {
  await fetchWithRetry(`${BASE}/`);
} catch (e) {
  siteUnavailable = e instanceof UnavailableError;
  handleError(e, "Homepage reachable", "availability");
}

// --- 3. structured data on every public page ---
for (const path of publicPaths) {
  if (siteUnavailable) break;
  try {
    const html = await fetchWithRetry(`${BASE}${path}`);
    reachablePaths.add(path);
    let parsed;
    try {
      parsed = jsonLdBlocks(html);
    } catch {
      check(false, `${path} JSON-LD parses`, "structured-data");
      continue;
    }
    check(hasOrganization(parsed), `${path} serves valid Organization structured data`, "structured-data");
  } catch (e) {
    unavailablePaths.add(path);
    handleError(e, `${path} reachable`, "structured-data");
  }
}

// --- 4. rendered SEO head tags: title, canonical, hreflang ---
const expectedUrl = (path) => (path === "/" ? `${SITE}/` : `${SITE}${path}`);
let browser;
try {
  if (siteUnavailable || reachablePaths.size === 0) {
    console.warn("SKIP  [seo-head] Site unavailable; rendered page checks deferred");
  } else {
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  let homeTitle = "";
  for (const path of publicPaths) {
    if (unavailablePaths.has(path)) continue;
    try {
      let response;
      for (let attempt = 1; attempt <= RETRIES; attempt++) {
        try {
          response = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
          if (response?.ok()) break;
          if (response && response.status() < 500 && ![408, 429].includes(response.status())) throw new Error(`HTTP ${response.status()}`);
          if (attempt === RETRIES) throw new UnavailableError(`HTTP ${response?.status() ?? "no response"}`);
        } catch (error) {
          if (error instanceof UnavailableError || error.message.startsWith("HTTP ")) throw error;
          if (attempt === RETRIES) throw new UnavailableError(error.message.split("\n")[0]);
        }
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
      // Titles/canonicals are client-rendered; wait for the canonical to appear.
      await page.waitForFunction((url) => document.querySelector('link[rel="canonical"]')?.getAttribute("href") === url, expectedUrl(path), { timeout: 15000 });
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
      check(titleOk, `${path} has a unique rendered <title>${titleOk ? "" : ` (got "${head.title}")`}`, "seo-head");
      check(head.canonical === expectedUrl(path), `${path} canonical is ${expectedUrl(path)}${head.canonical === expectedUrl(path) ? "" : ` (got "${head.canonical}")`}`, "seo-head");
      check(
        head.hreflangs["en"] === expectedUrl(path) && head.hreflangs["x-default"] === expectedUrl(path),
        `${path} hreflang en + x-default self-reference the page URL`,
        "seo-head",
      );
    } catch (e) {
      handleError(e, `${path} renders SEO head tags`, "seo-head");
    }
  }
  }
} catch (e) {
  check(false, `headless browser available for rendered checks (${e.message.split("\n")[0]})`, "seo-head");
} finally {
  await browser?.close();
}

// --- Failure report (drives the GitHub Actions notification) ---
if (failures.length) {
  const bySection = new Map();
  for (const f of failures) {
    if (!bySection.has(f.section)) bySection.set(f.section, []);
    bySection.get(f.section).push(f);
  }
  const lines = [
    `## Smoke test FAILED — ${new Date().toISOString()}`,
    ``,
    `Base URL: ${BASE}`,
    ``,
    `${failures.length} check(s) failed in ${bySection.size} area(s): ${[...bySection.keys()].join(", ")}`,
    ``,
  ];
  for (const [section, items] of bySection) {
    lines.push(`### ${section}`);
    for (const item of items) lines.push(`- ${item.label}`);
    lines.push(``);
  }
  const report = lines.join("\n");
  writeFileSync(reportPath, report);
  if (process.env.GITHUB_STEP_SUMMARY) {
    try { appendFileSync(process.env.GITHUB_STEP_SUMMARY, report); }
    catch (error) { console.warn(`Could not write optional job summary: ${error.message}`); }
  }
  console.log(`\n${failures.length} smoke check(s) FAILED — report written to smoke-failures.md`);
  process.exit(1);
}

if (skipped.length || siteUnavailable) {
  const report = `## Smoke checks incomplete — temporary availability warning\n\n${skipped.map((item) => `- [${item.section}] ${item.label}`).join("\n")}\n\nUnavailable checks were skipped, not passed. Rerun after the site is reachable.\n`;
  if (process.env.GITHUB_STEP_SUMMARY) {
    try { appendFileSync(process.env.GITHUB_STEP_SUMMARY, report); }
    catch (error) { console.warn(`Could not write optional job summary: ${error.message}`); }
  }
  console.warn(`\nSmoke checks incomplete: ${skipped.length} temporary availability warning(s); rerun when reachable.`);
} else {
  console.log("\nAll smoke checks passed");
}
