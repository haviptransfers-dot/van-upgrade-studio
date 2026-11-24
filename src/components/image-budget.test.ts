import { describe, expect, it } from "vitest";
import manifest from "@/assets/imageManifest.json";

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
});