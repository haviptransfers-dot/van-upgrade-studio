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
      version: "1.0",
      publisher: "Haviptransfers.gr",
      publisher_url: "https://haviptransfers.gr",
      resources: [],
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
});