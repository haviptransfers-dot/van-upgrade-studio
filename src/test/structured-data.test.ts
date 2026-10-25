import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { servicePages, structuredDataForPath, organization } from "../data/structuredData";
import { sitemapXml } from "../../sitemapPlugin";

describe("public sitemap and structured data", () => {
  it("lists every public route and article on haviptransfers.gr without synthetic lastmod", () => {
    const sources = readFileSync("src/data/blogPosts.ts", "utf8") + readFileSync("src/data/nafplio.ts", "utf8");
    const slugs = [...sources.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
    const xml = sitemapXml(slugs);
    expect((xml.match(/<loc>/g) ?? []).length).toBe(27);
    for (const slug of slugs) expect(xml).toContain(`<loc>https://haviptransfers.gr/blog/${slug}</loc>`);
    for (const page of servicePages) expect(xml).toContain(`<loc>https://haviptransfers.gr${page.path}</loc>`);
    expect(xml).not.toContain("<lastmod>");
    expect(xml).not.toContain(":slug");
    expect(readFileSync("public/robots.txt", "utf8")).toContain("Sitemap: https://haviptransfers.gr/sitemap.xml");
  });
  it("uses Organization on the homepage with the existing business score and no invented review count", () => {
    expect(structuredDataForPath("/")?.["@graph"][0]).toEqual(organization);
    expect(organization["@type"]).toBe("Organization");
    expect(organization.url).toBe("https://haviptransfers.gr/");
    expect(organization.aggregateRating.ratingValue).toBe(5);
    expect(organization.aggregateRating).not.toHaveProperty("reviewCount");
  });
  it.each([
    ["/airport-transfer-athens", [85, 100]], ["/piraeus-port-transfer", [55]],
    ["/athens-city-tour", [180]], ["/cape-sounion-tour", [350]],
    ["/delphi-private-tour", [500]], ["/meteora-private-tour", [800]], ["/nafplio-private-tour", [500]],
  ])("publishes correct EUR offers and both types for %s", (path, prices) => {
    const schema = structuredDataForPath(String(path));
    expect(schema).toBeDefined();
    const graph = schema?.["@graph"] ?? [];
    for (const type of ["Service", "TouristTrip"]) {
      const item = graph.find((entry) => entry["@type"] === type) as { url: string; offers: { price: number; priceCurrency: string }[] } | undefined;
      expect(item?.url).toBe(`https://haviptransfers.gr${path}`);
      expect(item?.offers.map((offer) => offer.price)).toEqual(prices);
      expect(item?.offers.every((offer) => offer.priceCurrency === "EUR")).toBe(true);
    }
    expect(graph.find((entry) => entry["@type"] === "Service")).toHaveProperty("areaServed");
  });
});