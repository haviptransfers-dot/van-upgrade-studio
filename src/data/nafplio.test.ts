import { describe, expect, it } from "vitest";
import { nafplioFaq, nafplioPost } from "./nafplio";
import { renderNafplio } from "../../nafplioPlugin";

describe("Nafplio article", () => {
  it("keeps the requested FAQ answers", () => expect(nafplioFaq.map((x) => x.answer)).toEqual(["~2 hours, 150km", "Yes, ideal 15-min stop", "Yes, free on request"]));
  it("uses the requested SEO title", () => expect(nafplioPost.metaTitle).toBe("Nafplio Private Tour from Athens | Mercedes V-Class VIP Day Trip"));
  it("ships the article without client scripts", () => expect(renderNafplio()).not.toMatch(/<script(?![^>]*application\/ld\+json)/));
});