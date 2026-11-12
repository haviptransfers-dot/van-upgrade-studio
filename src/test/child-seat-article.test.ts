import { describe, expect, it } from "vitest";
import { blogPosts, localizePost } from "../data/blogPosts";
import article from "../data/childSeatArticle.json";

const slug = "child-car-seats-private-transfers-greece";
const existing = blogPosts.find(post => post.slug === slug);

describe("existing child-seat article rules", () => {
  it("keeps a single record, unchanged slug, publication date and image", () => {
    expect(blogPosts.filter(post => post.slug === slug)).toHaveLength(1);
    expect(existing?.date).toBe("2026-06-15");
    expect(existing?.image).toContain("child-seats-family-safe");
    for (const language of Object.keys(article)) {
      if (!existing) throw new Error("Missing existing post");
      const localized = localizePost(existing, language);
      expect(localized.slug).toBe(slug);
      expect(localized.date).toBe("2026-06-15");
      expect(localized.image).toBe(existing.image);
    }
  });
  it.each(Object.keys(article))("preserves the supplied child-seat ranges in %s", language => {
    const text = JSON.stringify(article[language as keyof typeof article]);
    for (const range of ["0–13 kg", "9–18 kg", "15–36 kg", "2–3", "2.5–3", "4–5", "Group 0+", "Group 1"]) expect(text).toContain(range);
  });
  it.each(Object.keys(article))("preserves the supplied law, fine and measurements in %s", language => {
    const text = JSON.stringify(article[language as keyof typeof article]);
    for (const fact of ["KOK", "Law 5209/2025", "€350", "150 cm", "135 cm", "69 km", "180 km", "355 km", "16", "37", "110", "30"]) expect(text).toContain(fact);
  });
  it.each(Object.keys(article))("preserves contact details and exact vehicle name in %s", language => {
    const text = JSON.stringify(article[language as keyof typeof article]);
    expect(text).toContain("+30 694 939 3700");
    expect(text).toContain("h.a.viptransfers@gmail.com");
    expect(text).toContain("Mercedes Vito VIP");
    expect(text).toContain("H&A TOURS LTD");
    expect(text).not.toMatch(/BeSafe|i-Size|V-Class|starry sky|\bfree\b|δωρεάν|gratis|kostenlos|gratuit|gratuiti|gratuitas|مجاني|ללא תשלום/i);
  });
});