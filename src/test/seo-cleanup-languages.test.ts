import { describe, expect, it } from "vitest";
import { blogPosts, localizePost } from "@/data/blogPosts";
import { organization } from "@/data/structuredData";
import { linkPath } from "@/lib/languagePaths";
import en from "@/i18n/locales/en";
import el from "@/i18n/locales/el";
import de from "@/i18n/locales/de";
import es from "@/i18n/locales/es";
import fr from "@/i18n/locales/fr";
import it from "@/i18n/locales/it";
import he from "@/i18n/locales/he";
import ar from "@/i18n/locales/ar";

const locales = { en, el, de, es, fr, it, he, ar };
const excluded = ["child-car-seats-private-transfers-greece"];

describe("multilingual SEO clean-up", () => {
  it.each(["de", "es", "fr", "it", "he", "ar"])("keeps every %s blog description at or under 160 characters", (lang) => {
    for (const post of blogPosts.filter((p) => !excluded.includes(p.slug))) {
      expect(localizePost(post, lang).metaDescription.length, post.slug).toBeLessThanOrEqual(160);
    }
  });

  it.each(Object.keys(locales))("keeps every %s blog title at or under 70 characters", (lang) => {
    for (const post of blogPosts.filter((p) => !excluded.includes(p.slug))) {
      expect(localizePost(post, lang).metaTitle.length, post.slug).toBeLessThanOrEqual(70);
    }
  });

  it.each(Object.entries(locales))("%s homepage and Piraeus descriptions say up to 7 passengers and never free seats", (_, locale) => {
    for (const text of [locale.seoContent.homeDescription, locale.seoContent.piraeusDescription]) {
      expect(text).not.toMatch(/\b(for|für|para|pour|per|για) 7\b|ל־7|لـ7|free|kostenlos|gratis|gratuit|δωρεάν|חינם|مجان/i);
      expect(text.length).toBeLessThanOrEqual(160);
    }
  });

  it.each(Object.entries(locales))("%s FAQ: up to 7 passengers and a sign with the customer's name", (_, locale) => {
    expect(locale.faq.items.a3).not.toMatch(/8/);
    expect(locale.faq.items.a3).toMatch(/7/);
    expect(locale.faq.items.a8).not.toMatch(/H&A VIP Transfers/);
  });

  it("lists all eight languages in the business details", () => {
    expect(organization.availableLanguage).toEqual(["English", "Greek", "German", "Spanish", "French", "Italian", "Hebrew", "Arabic"]);
  });

  it("builds internal links with exactly one trailing slash", () => {
    expect(linkPath("/about", "de")).toBe("/de/about/");
    expect(linkPath("/blog/", "en")).toBe("/blog/");
    expect(linkPath("/", "el")).toBe("/el/");
    expect(linkPath("/blog?view=all#posts", "fr")).toBe("/fr/blog/?view=all#posts");
    expect(linkPath("/#faq", "en")).toBe("/#faq");
    expect(linkPath("https://wa.me/306949393700", "en")).toBe("https://wa.me/306949393700");
  });
});
