import { describe, expect, it } from "vitest";
import en from "../i18n/locales/en";
import el from "../i18n/locales/el";
import de from "../i18n/locales/de";
import fr from "../i18n/locales/fr";
import itLocale from "../i18n/locales/it";
import es from "../i18n/locales/es";
import he from "../i18n/locales/he";
import ar from "../i18n/locales/ar";
import { blogPosts, getLocalizedPost } from "../data/blogPosts";

const locales = { en, el, de, fr, it: itLocale, es, he, ar };
const freeWords = /free|δωρεάν|gratis|kostenlos|gratuit|gratuiti|חינם|ללא תשלום|مجاني/i;

describe.each(Object.entries(locales))("owner text corrections in %s", (_language, locale) => {
  it("describes child seats on their page as included on request, not free", () => {
    expect(locale.seoContent.childTitle).not.toMatch(freeWords);
    expect(locale.seoContent.childDescription).not.toMatch(freeWords);
    expect(locale.childSeats.eyebrow).not.toMatch(freeWords);
  });
  it("quotes transfers from €85 in the cost FAQ", () => {
    expect(locale.faq.items.a1).toMatch(/85/);
    expect(locale.faq.items.a1).not.toMatch(/70/);
  });
  it("does not promise offers in the About text", () => {
    expect(locale.preferredSources.supportText).not.toMatch(/offers|προσφορές|Angebote|ofertas|offres|offerte|הצעות|عروض/i);
  });
  it("never doubles the Mercedes brand word", () => {
    expect(JSON.stringify(locale)).not.toMatch(/Mercedes Mercedes/);
  });
});

describe("bachelor article serves Athens and the mainland only", () => {
  it.each(["en", "el", "de", "es", "fr", "it", "he", "ar"])("has no island destination in %s", (language) => {
    const post = getLocalizedPost("bachelor-bachelorette-party-transfers-greece", language);
    expect(post).toBeTruthy();
    expect(JSON.stringify(post)).not.toMatch(/mykonos|μύκον|μυκόν|מיקונוס|ميكونوس/i);
  });
  it("keeps the English post in the catalog", () => {
    expect(blogPosts.some((post) => post.slug === "bachelor-bachelorette-party-transfers-greece")).toBe(true);
  });
});
