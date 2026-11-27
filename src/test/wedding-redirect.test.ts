import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const rules = readFileSync("public/_redirects", "utf8")
  .trim().split("\n").map((line) => line.split(/\s+/));
const sitemap = readFileSync("public/sitemap.xml", "utf8");

describe("wedding article single-hop permanent redirects", () => {
  for (const language of ["", "/el", "/de", "/es", "/fr", "/it", "/he", "/ar"]) {
    for (const suffix of ["", "/"]) {
      const source = `${language}/blog/wedding-transfers-greece-mercedes-v-class${suffix}`;
      const target = `${language}/blog/wedding-transfers-greece-mercedes-vito-vip/`;
      it(`${source} goes directly to the final localized URL`, () => {
        const index = rules.findIndex(([from]) => from === source);
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(rules.findIndex(([from]) => from === "/*"));
        expect(rules[index]).toEqual([source, target, "301!"]);
        expect(rules.some(([from, , status]) => from === target && status.startsWith("301"))).toBe(false);
        expect(sitemap).toContain(`<loc>https://haviptransfers.gr${target}</loc>`);
      });
    }
  }
});