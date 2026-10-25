import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readPublic = (name: string) => readFileSync(`public/${name}`, "utf8");

describe("public AI discovery", () => {
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
    for (const path of ["/llms.txt", "/.well-known/ai-catalog.json", "/.well-known/*"]) {
      const index = rules.findIndex((rule) => rule.startsWith(`${path} `));
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(fallback);
    }
  });
});