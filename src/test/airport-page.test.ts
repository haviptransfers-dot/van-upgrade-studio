import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import en from "@/i18n/locales/en";
import el from "@/i18n/locales/el";
import de from "@/i18n/locales/de";
import es from "@/i18n/locales/es";
import fr from "@/i18n/locales/fr";
import itLocale from "@/i18n/locales/it";
import he from "@/i18n/locales/he";
import ar from "@/i18n/locales/ar";

const locales = { en, el, de, es, fr, it: itLocale, he, ar };
const childSeatWords = /\bchild|baby|booster|famil|kinder|kids|sill(a|as) (infantil|para beb)|siège(s)? (enfant|bébé)|rehausseur|seggiolin|παιδικ|βρεφικ|οικογ|ילד|תינוק|משפח|طفل|أطفال|رضيع|عائل/i;
const blogSlugs = [...readFileSync("src/data/blogPosts.ts", "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const publicPaths = new Set(["/piraeus-port-transfer", "/athens-city-tour", "/delphi-private-tour", "/meteora-private-tour", "/nafplio-private-tour", "/cape-sounion-tour", ...blogSlugs.map((s) => `/blog/${s}`)]);
const text = (page: typeof en.airportPage) => JSON.stringify(page);

describe("dedicated Athens airport transfer page", () => {
  it("keeps the existing English title and uses the owner's English H1 and description", () => {
    expect(en.seo.airport.title).toBe("Athens Airport Transfer (ATH) – Mercedes Vito VIP | H&A VIP Tours");
    expect(en.airportPage.h1).toBe("Athens Airport Transfer (ATH) in a Mercedes Vito VIP");
    expect(en.seo.airport.description).toBe("Private Athens Airport (ATH) transfers in a Mercedes Vito VIP. Meet & greet, flight monitoring, fixed price agreed in advance. Book on WhatsApp.");
  });

  it.each(Object.entries(locales))("%s: description of 160 characters or fewer, six FAQs and required names", (_, locale) => {
    const page = locale.airportPage;
    expect(locale.seo.airport.description.length).toBeLessThanOrEqual(160);
    expect(page.faq).toHaveLength(6);
    expect(page.sections).toHaveLength(6);
    expect(page.h1).toContain("Mercedes Vito VIP");
    expect(page.h1).toContain("ATH");
    for (const fixed of ["Athens International Airport Eleftherios Venizelos", "H&A VIP Tours", "+30 694 939 3700", "+30 210 992 5244", "h.a.viptransfers@gmail.com"]) expect(text(page)).toContain(fixed);
  });

  it.each(Object.entries(locales))("%s: no child seats, other models, offers or islands", (_, locale) => {
    const all = text(locale.airportPage) + locale.seo.airport.description;
    expect(all).not.toMatch(childSeatWords);
    expect(all).not.toMatch(/V-Class|V-Klasse|Classe V|Clase V|Mykonos|Μύκονο|Santorini|coach/i);
    expect(all).not.toMatch(/€70|70 €/);
  });

  it.each(Object.entries(locales))("%s: only the owner's airport prices and policies", (_, locale) => {
    const all = text(locale.airportPage);
    const prices = [...all.matchAll(/€\s?(\d+)|(\d+)\s?€/g)].map((m) => m[1] ?? m[2]);
    expect(new Set(prices)).toEqual(new Set(["85", "100"]));
    expect(all).toContain("60");
    expect(all).toContain("20");
  });

  it.each(Object.entries(locales))("%s: internal links point to existing pages", (_, locale) => {
    const targets = [...text(locale.airportPage).matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
    expect(targets.length).toBe(10);
    for (const target of targets) expect(publicPaths.has(target), target).toBe(true);
    expect(targets.some((t) => t.includes("child"))).toBe(false);
  });
});
