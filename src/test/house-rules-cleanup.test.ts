import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import en from "../i18n/locales/en";
import el from "../i18n/locales/el";
import de from "../i18n/locales/de";
import fr from "../i18n/locales/fr";
import itLocale from "../i18n/locales/it";
import es from "../i18n/locales/es";
import he from "../i18n/locales/he";
import ar from "../i18n/locales/ar";
import { blogPosts, localizePost } from "../data/blogPosts";

const locales = { en, el, de, fr, it: itLocale, es, he, ar };
const post = (slug: string, lang: string) => localizePost(blogPosts.find((p) => p.slug === slug)!, lang);
const freeNextToSeat = /(child seat|παιδικ|Kindersitz|silla|siège|seggiolin|מושב|مقعد|مقاعد)[^"]{0,60}(free|δωρεάν|gratis|gratuit|kostenlos|חינם|ללא תשלום|مجاني|مجانا)/i;

describe.each(Object.entries(locales))("house-rules clean-up in %s", (_lang, locale) => {
  it("never calls child seats free on the homepage or Piraeus page", () => {
    const text = JSON.stringify(locale);
    expect(text).not.toMatch(freeNextToSeat);
  });
  it("names the tour vehicle Mercedes Vito VIP, never a Mercedes-Benz van", () => {
    const text = JSON.stringify(locale);
    expect(text).not.toMatch(/Mercedes-Benz|מרצדס-בנץ|مرسيدس-بنز/);
  });
});

describe("house-rules clean-up: owner-specified strings", () => {
  it("shortens the Greek and Spanish airport titles", () => {
    expect(el.seo.airport.title).toBe("Μεταφορά Αεροδρόμιο Αθηνών – Mercedes Vito VIP | H&A VIP Tours");
    expect(es.seo.airport.title).toBe("Traslado Aeropuerto de Atenas – Mercedes Vito VIP | H&A VIP Tours");
  });
  it("says child seats are included on request in the Nafplio article FAQ", () => {
    expect(JSON.stringify(post("athens-to-nafplio-private-tour", "en"))).toContain("Yes, included on request.");
    expect(JSON.stringify(post("athens-to-nafplio-private-tour", "ar"))).toContain("نعم، مشمولة عند الطلب");
  });
  it("uses the Hebrew word for passenger rides in the About description only", () => {
    expect(he.preferredSources.metaDescription).toContain("חברת הסעות");
    expect(he.preferredSources.supportText).toContain("חברת העברות");
  });
  it("drops the doubled Mercedes word from Hebrew and Arabic article titles and descriptions", () => {
    for (const lang of ["he", "ar"]) {
      for (const p of blogPosts) {
        const l = post(p.slug, lang);
        for (const value of [l.title, l.metaTitle, l.metaDescription]) {
          expect(value ?? "").not.toMatch(/מרצדס Mercedes Vito VIP|مرسيدس Mercedes Vito VIP/);
        }
      }
    }
  });
  it("gives every sitemap URL a lastmod date", () => {
    const xml = readFileSync("public/sitemap.xml", "utf8");
    const urls = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
    expect(urls.length).toBe(232);
    expect(urls.filter((u) => !u.includes("<lastmod>"))).toEqual([]);
  });
  it("links the child-seat article to service pages with a trailing slash", () => {
    const article = readFileSync("src/data/childSeatArticle.json", "utf8");
    expect(article).not.toMatch(/\]\((?:\/(?:el|de|es|fr|it|he|ar))?\/(?:airport-transfer-athens|cape-sounion-tour|child-seats|delphi-private-tour|meteora-private-tour|nafplio-private-tour|piraeus-port-transfer)\)/);
  });
});
