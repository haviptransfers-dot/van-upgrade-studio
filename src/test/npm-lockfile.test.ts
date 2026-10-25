import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const manifest = JSON.parse(readFileSync("package.json", "utf8"));
const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));

describe("reproducible CI dependency installation", () => {
  it("locks every declared dependency with the same requested version", () => {
    for (const section of ["dependencies", "devDependencies"]) {
      expect(lock.packages[""][section]).toEqual(manifest[section]);
      for (const name of Object.keys(manifest[section])) {
        expect(lock.packages[`node_modules/${name}`]?.version, `${name} missing from npm lockfile`).toBeTruthy();
      }
    }
  });

  it("includes matching Playwright and browser-core packages for smoke checks", () => {
    const playwright = lock.packages["node_modules/playwright"];
    const core = lock.packages["node_modules/playwright-core"];
    expect(playwright?.version).toBeTruthy();
    expect(core?.version).toBe(playwright.version);
    expect(playwright.dependencies["playwright-core"]).toBe(core.version);
  });
});