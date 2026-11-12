import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync("src/components/RelatedTravelLinks.tsx", "utf8");

describe("related tours and travel guides list", () => {
  it("does not link to the Nafplio blog article", () => {
    expect(source).not.toContain("/blog/athens-to-nafplio-private-tour");
    expect(source).not.toContain("blog.nav");
  });

  it("keeps every other link in the list", () => {
    for (const path of [
      "/athens-city-tour",
      "/cape-sounion-tour",
      "/delphi-private-tour",
      "/meteora-private-tour",
      "/nafplio-private-tour",
      "/blog",
      "/child-seats",
    ]) {
      expect(source).toContain(path);
    }
    expect(source).toContain("seoContent.relatedHeading");
    expect(source).toContain("seoContent.childTitle");
  });
});
