import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readPublic = (name: string) => readFileSync(`public/${name}`, "utf8");

describe("public AI discovery", () => {
  it("provides the root catalog as a Schema.org DataCatalog with downloadable datasets", () => {
    const catalog = JSON.parse(readPublic("ai-catalog.json"));
    expect(catalog["@context"]).toBe("https://schema.org");
    expect(catalog["@type"]).toBe("DataCatalog");
    expect(catalog.url).toBe("https://haviptransfers.gr/ai-catalog.json");
    expect(catalog.dataset).toHaveLength(1);
    expect(catalog.dataset[0]["@type"]).toBe("Dataset");
    expect(catalog.dataset[0].distribution[0].contentUrl).toBe("https://haviptransfers.gr/llms.txt");
    expect(catalog.dataset[0].distribution[0].encodingFormat).toBe("text/plain");
  });
  it("serves the requested catalog data rather than an HTML document", () => {
    expect(JSON.parse(readPublic(".well-known/ai-catalog.json"))).toEqual({
      specVersion: "1.0",
      host: {
        displayName: "H&A VIP Tours",
        identifier: "haviptransfers.gr",
      },
      entries: [],
    });
  });

  it("excludes discovery requests before the external host SPA wildcard", () => {
    const rules = readPublic("_redirects").trim().split("\n");
    const fallback = rules.findIndex((rule) => rule.startsWith("/*"));
    for (const path of ["/llms.txt", "/ai-catalog.json", "/.well-known/ai-catalog.json", "/.well-known/*"]) {
      const index = rules.findIndex((rule) => rule.startsWith(`${path} `));
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(fallback);
    }
  });

  it("ships llms.txt as plain-text AI discovery content with the current business details", () => {
    const llms = readPublic("llms.txt");
    expect(llms.startsWith("# H&A VIP Tours - H&A Tours\n")).toBe(true);
    expect(llms).not.toMatch(/[\u0000\uFEFF]/);
    expect(llms).not.toContain("【");
    expect(llms).not.toContain("¦");
    expect(llms).toContain("Mercedes Vito VIP");
    expect(llms).toContain("+30 694 939 3700");
    expect(llms).toContain("Afroditis 66, Elliniko, 167 77, Greece");
    expect(llms).toContain("1-4 passengers: 100 EUR");
    expect(llms).toContain("5-7 passengers: 110 EUR");
    expect(llms).toContain("info@haviptransfers.gr");
    expect(llms).not.toContain("h.a.viptransfers@gmail.com");
  });

  it("serves llms.txt without a redirect and keeps robots.txt open to it", () => {
    const rule = readPublic("_redirects")
      .trim()
      .split("\n")
      .find((line) => line.startsWith("/llms.txt "));
    expect(rule?.split(/\s+/)).toEqual(["/llms.txt", "/llms.txt", "200"]);
    const robots = readPublic("robots.txt");
    expect(robots).not.toContain("Disallow");
    expect(robots).toContain("Allow: /");
  });

  it("lists only public pages that exist in the sitemap", () => {
    const sitemap = readPublic("sitemap.xml");
    const links = [...readPublic("llms.txt").matchAll(/\]\((https:\/\/haviptransfers\.gr\/[^)]*)\)/g)].map(
      (match) => match[1],
    );
    expect(links.length).toBeGreaterThanOrEqual(12);
    for (const link of links) {
      expect(sitemap).toContain(`<loc>${link}</loc>`);
    }
  });
});
