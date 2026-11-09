import { describe, expect, it } from "vitest";
import { basePath, languageFromPath, LANGUAGES, LEGACY_SLUGS, localizedPath, MAX_PASSENGERS, pageUrl } from "../lib/languagePaths";
describe("owner-confirmed language URLs and capacity", () => {
  it("limits the vehicle to seven passengers excluding the driver", () => { expect(MAX_PASSENGERS).toBe(7); });
  it.each(LANGUAGES)("keeps the matching route in %s", (language) => {
    const path = localizedPath("/blog/athens-to-nafplio-private-tour", language);
    expect(path).toBe(`${language === "en" ? "" : `/${language}`}/blog/athens-to-nafplio-private-tour`);
    expect(languageFromPath(path)).toBe(language);
    expect(basePath(path)).toBe("/blog/athens-to-nafplio-private-tour");
    expect(pageUrl(path, language)).toBe(`https://haviptransfers.gr${path}/`);
  });
  it("uses unprefixed English and preserves queries and anchors during switching", () => {
    expect(localizedPath("/el/blog?view=all#posts", "en")).toBe("/blog?view=all#posts");
    expect(localizedPath("/", "el")).toBe("/el/");
    expect(localizedPath("/de/", "ar")).toBe("/ar/");
  });
  it.each(Object.entries(LEGACY_SLUGS))("redirects the old article %s", (old, replacement) => {
    expect(localizedPath(`/blog/${old}`, "en")).toBe(`/blog/${replacement}`);
    expect(localizedPath(`/el/blog/${old}`, "de")).toBe(`/de/blog/${replacement}`);
  });
});