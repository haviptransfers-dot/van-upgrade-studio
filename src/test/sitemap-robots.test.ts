import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { sitemapXml } from "../../sitemapPlugin";
import { seoRoutes } from "../seoRoutes";

const DOMAIN = "https://haviptransfers.gr";
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const robots = readFileSync("public/robots.txt", "utf8");
const appSource = readFileSync("src/App.tsx", "utf8");

const blogSlugs = [
  ...(readFileSync("src/data/blogPosts.ts", "utf8") + readFileSync("src/data/nafplio.ts", "utf8")).matchAll(/slug:\s*"([^"]+)"/g),
].map((match) => match[1]);

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

describe("sitemap.xml automated checks", () => {
  it("is a valid XML urlset with the sitemap namespace", () => {
    expect(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(sitemap.trim().endsWith("</urlset>")).toBe(true);
    expect(locs.length).toBeGreaterThan(0);
  });

  it("matches exactly what the build plugin generates from current routes and articles", () => {
    expect(sitemapXml(blogSlugs)).toBe(sitemap);
  });

  it("uses only absolute https URLs on the correct domain", () => {
    for (const loc of locs) {
      expect(loc.startsWith(`${DOMAIN}/`)).toBe(true);
      expect(loc).not.toContain("http://");
      expect(loc).not.toContain("lovable.app");
    }
  });

  it("has no duplicate URLs", () => {
    expect(new Set(locs).size).toBe(locs.length);
  });

  it("covers every public route declared in the app", () => {
    const declared = [...appSource.matchAll(/path="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((route) => route !== "*" && !route.includes(":"));
    for (const route of declared) expect(locs).toContain(`${DOMAIN}${route}`);
    for (const route of seoRoutes) expect(locs).toContain(`${DOMAIN}${route.path}`);
  });

  it("covers every blog article", () => {
    expect(blogSlugs.length).toBeGreaterThan(0);
    for (const slug of blogSlugs) expect(locs).toContain(`${DOMAIN}/blog/${slug}`);
  });

  it("excludes non-public and parameterized routes", () => {
    expect(sitemap).not.toContain(":slug");
    expect(sitemap).not.toContain("*");
    expect(sitemap).not.toContain("/not-found");
    expect(sitemap).not.toContain("/404");
  });

  it("omits lastmod because no authoritative per-page change timestamp exists", () => {
    expect(sitemap).not.toContain("<lastmod>");
  });
});

describe("robots.txt automated checks", () => {
  it("references the sitemap on the correct domain", () => {
    expect(robots).toContain(`Sitemap: ${DOMAIN}/sitemap.xml`);
  });

  it("allows crawling of the whole site", () => {
    expect(robots).toMatch(/User-agent: \*\s*\nAllow: \//);
    expect(robots).not.toMatch(/Disallow: \/\s*(\n|$)/);
  });
});
