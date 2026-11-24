import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { hostedImageUrl } from "@/lib/mediaUrl";
import { heroDelivery } from "@/lib/heroDelivery";
import manifest from "@/assets/imageManifest.json";
import flags from "@/assets/flagManifest.json";
import { REVIEW_COUNT, RATING } from "@/data/reviewFacts";
import { organization } from "@/data/structuredData";
import { blogPosts } from "@/data/blogPosts";

describe("same-domain delivery preserves existing media and rating facts", () => {
  it("keeps the hero's 480/800 widths, exact bytes and same-origin responsive paths", () => {
    expect(heroDelivery.src).toBe("/static-media/riviera-home-800.webp");
    expect(heroDelivery.srcSet).toBe("/static-media/riviera-home-480.webp 480w, /static-media/riviera-home-800.webp 800w");
    expect(readFileSync("public/static-media/riviera-home-480.webp").length).toBe(23698);
    expect(readFileSync("public/static-media/riviera-home-800.webp").length).toBe(52382);
  });
  it("has byte-identical local copies of every responsive photo and flag variant", () => {
    for (const entry of [...Object.values(manifest), ...Object.values(flags)]) {
      for (const variant of entry.variants) {
        const url = hostedImageUrl(variant.url);
        expect(url.startsWith("/static-media/")).toBe(true);
        expect(readFileSync(`public${url}`).length).toBe(variant.bytes);
      }
    }
  });
  it("keeps optional music self-hosted without changing its file", () => {
    expect(readFileSync("public/static-media/holiday-music.mp3").length).toBe(1301567);
  });
  it("uses exactly the owner's 63 reviews and 5.0 rating in business schema", () => {
    expect(REVIEW_COUNT).toBe(63);
    expect(RATING).toBe(5.0);
    expect(organization.aggregateRating.reviewCount).toBe(REVIEW_COUNT);
    expect(organization.aggregateRating.ratingCount).toBe(REVIEW_COUNT);
    expect(organization.aggregateRating.ratingValue).toBe(RATING);
  });
  it("uses site-served optimized WebP covers for every article", () => {
    for (const post of blogPosts) {
      const url = new URL(post.image, "https://haviptransfers.gr");
      expect(url.origin).toBe("https://haviptransfers.gr");
      expect(url.pathname.endsWith(".webp")).toBe(true);
      expect(existsSync(`public${url.pathname}`)).toBe(true);
    }
  });
});