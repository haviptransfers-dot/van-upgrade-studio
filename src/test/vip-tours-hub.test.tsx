import { describe, expect, it } from "vitest";
import { vipToursHub } from "../data/vipToursHub";
import { seoRoutes } from "../seoRoutes";
import article from "../data/childSeatArticle.json";

describe("VIP tours hub", () => {
  it("is a public route in all languages", () => {
    expect(seoRoutes.some((r) => r.path === "/vip-tours-athens")).toBe(true);
    expect(Object.keys(vipToursHub).sort()).toEqual(["ar", "de", "el", "en", "es", "fr", "he", "it"]);
  });
  it.each(Object.keys(vipToursHub))("keeps five tour cards, four FAQs and house rules in %s", (lang) => {
    const page = vipToursHub[lang];
    expect(page.tours.map((t) => t.to)).toEqual(["/athens-city-tour", "/cape-sounion-tour", "/delphi-private-tour", "/nafplio-private-tour", "/meteora-private-tour"]);
    expect(page.faq).toHaveLength(4);
    expect(page.intro).toContain("](/child-seats)");
    expect(page.priceNote).toContain("](/#calculator)");
    const text = JSON.stringify(page);
    expect(text).toContain("Mercedes Vito VIP");
    expect(text).toContain("H&A VIP Tours");
    expect(text).not.toMatch(/V-Class|\bLTD\b|golf|\bfree\b|δωρεάν|€/i);
  });
});

describe("child-seat article law section", () => {
  it.each(Object.keys(article))("drops the police sentence and adds the 135 cm FAQ in %s", (lang) => {
    const sections = article[lang as keyof typeof article].sections as { heading?: string; faq?: boolean }[];
    expect(JSON.stringify(sections)).not.toMatch(/Hellenic Police|Ελληνική Αστυνομία|Polizei|Policía|Police hellénique|Polizia|המשטרה|الشرطة/);
    expect(sections.filter((s) => s.faq)).toHaveLength(8);
    expect(JSON.stringify(sections)).toContain("E3-B");
  });
});
