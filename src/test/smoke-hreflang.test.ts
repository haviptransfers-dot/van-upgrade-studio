// @vitest-environment node
import { describe, expect, it } from "vitest";
import { expectedHreflangs } from "../../scripts/public-pages.mjs";
describe("multilingual live-site checks", () => {
  it("points English and x-default to the English route, not the Greek route", () => {
    expect(expectedHreflangs("/el/blog")).toEqual({
      en: "https://haviptransfers.gr/blog/", el: "https://haviptransfers.gr/el/blog/",
      de: "https://haviptransfers.gr/de/blog/", es: "https://haviptransfers.gr/es/blog/",
      fr: "https://haviptransfers.gr/fr/blog/", it: "https://haviptransfers.gr/it/blog/",
      he: "https://haviptransfers.gr/he/blog/", ar: "https://haviptransfers.gr/ar/blog/",
      "x-default": "https://haviptransfers.gr/blog/",
    });
  });
  it("keeps matching homepages and article paths in every language", () => {
    expect(expectedHreflangs("/ar/")["x-default"]).toBe("https://haviptransfers.gr/");
    expect(expectedHreflangs("/he/blog/athens-to-nafplio-private-tour").de).toBe("https://haviptransfers.gr/de/blog/athens-to-nafplio-private-tour/");
  });
});