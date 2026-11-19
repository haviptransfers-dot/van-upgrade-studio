import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const LANGS = ["", "/el", "/de", "/es", "/fr", "/it", "/he", "/ar"];
const rules = readFileSync("public/_redirects", "utf8").trim().split("\n");
const fallback = rules.findIndex((r) => r.startsWith("/*"));

describe("retired family transfers page", () => {
  for (const lang of LANGS) {
    for (const tail of ["", "/"]) {
      const from = `${lang}/family-transfers-athens-child-seats${tail}`;
      it(`${from} permanently redirects to ${lang}/child-seats/`, () => {
        const index = rules.findIndex((r) => r.split(/\s+/)[0] === from);
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(fallback);
        const [, to, status] = rules[index].split(/\s+/);
        expect(to).toBe(`${lang}/child-seats/`);
        expect(status).toBe("301!");
      });
    }
  }

  it("is not listed in the sitemap", () => {
    expect(readFileSync("public/sitemap.xml", "utf8")).not.toContain("family-transfers-athens-child-seats");
  });
});
