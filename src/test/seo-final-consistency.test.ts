// @vitest-environment node
import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { pageUrl, LANGUAGES } from "../lib/languagePaths";
import { generateSitemap } from "../../scripts/public-pages.mjs";
import { sitemapXml } from "../../sitemapXml";
import manifest from "../assets/imageManifest.json";

describe("final SEO URL and image consistency", () => {
  it("uses the slash-terminated Greek airport canonical confirmed by the owner", () => {
    expect(pageUrl("/airport-transfer-athens", "el")).toBe("https://haviptransfers.gr/el/airport-transfer-athens/");
    for (const language of LANGUAGES) {
      expect(pageUrl("/blog/", language).endsWith("/")).toBe(true);
      expect(pageUrl("/about", language).endsWith("/")).toBe(true);
    }
  });
  it("terminates every sitemap loc and alternate URL with exactly one slash", () => {
    for (const xml of [readFileSync("public/sitemap.xml", "utf8"), generateSitemap(), sitemapXml(["athens-to-nafplio-private-tour"])]) {
      const urls = [...xml.matchAll(/(?:<loc>|href=")([^<"]+)/g)].map((match) => match[1]);
      expect(urls.length).toBeGreaterThan(200);
      for (const url of urls) expect(new URL(url).pathname).toMatch(/(?<!\/)\/$|^\/$/);
    }
  });
  it("has no obsolete image filenames or responsive variant URLs", () => {
    const obsolete = /v-class|vclass/i;
    expect(JSON.stringify(manifest)).not.toMatch(obsolete);
    for (const entry of readdirSync("src/assets", { recursive: true })) {
      expect(String(entry)).not.toMatch(obsolete);
    }
  });
});