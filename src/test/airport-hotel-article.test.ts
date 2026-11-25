import { describe, expect, it } from "vitest";
import { blogPosts, localizePost } from "@/data/blogPosts";


const post = blogPosts.find((p) => p.slug === "private-transfer-athens-airport-to-hotel")!;

describe("airport-to-hotel article (en, el, de, es)", () => {
  it.each(["en", "el", "de", "es"])("%s has three FAQs, two hotel sections and four links", (lang) => {
    const p = localizePost(post, lang);
    expect(p.sections.filter((s) => s.faq)).toHaveLength(3);
    expect(p.metaDescription.length).toBeLessThanOrEqual(160);
    const text = JSON.stringify(p.sections);
    for (const path of ["airport-transfer-athens/", "piraeus-port-transfer/", "blog/mercedes-vito-vip-chauffeur-service-athens/"]) {
      expect(text).toContain(`(https://haviptransfers.gr/${path})`);
    }
    expect(text).toContain("](https://haviptransfers.gr/)");
    expect(text).not.toMatch(/V-Class|€|LTD/);
  });
  it.each(["fr", "it", "he", "ar"])("%s is unchanged (no FAQs yet)", (lang) => {
    expect(localizePost(post, lang).sections.some((s) => s.faq)).toBe(false);
  });
});
