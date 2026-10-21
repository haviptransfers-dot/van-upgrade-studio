import { describe, expect, it } from "vitest";
import manifest from "@/assets/imageManifest.json";
import review1 from "@/assets/review-1.webp.asset.json";
import review2 from "@/assets/review-2.webp.asset.json";
import review3 from "@/assets/review-3.webp.asset.json";

describe("photo transfer budget", () => {
  it("caps the first hero's priority variant at 800px and below 80KB", () => {
    const delivered = manifest["hero-sunset-car.webp"].variants.filter((variant) => variant.width <= 800);
    expect(Math.max(...delivered.map((variant) => variant.width))).toBe(800);
    delivered.forEach((variant) => expect(variant.bytes).toBeLessThan(80000));
  });
  it("keeps every responsive photo variant strictly below 150 KB", () => {
    for (const entry of Object.values(manifest)) {
      for (const variant of entry.variants) expect(variant.bytes).toBeLessThan(150000);
    }
  });
  it("keeps exactly three review images below 150 KB each", () => {
    const reviews = [review1, review2, review3];
    expect(reviews).toHaveLength(3);
    reviews.forEach((review) => expect(review.size).toBeLessThan(150000));
  });
});