import { describe, expect, it } from "vitest";
import { heroDelivery } from "../lib/heroDelivery";
import mobile from "../assets/riviera-home-480.webp.asset.json";
import desktop from "../assets/riviera-home-800.webp.asset.json";

describe("homepage image delivery budget", () => {
  it("delivers the mobile and desktop WebP images below 80KB and caps selection at 800px", () => {
    expect(mobile.size).toBeLessThan(80000);
    expect(desktop.size).toBeLessThan(80000);
    expect(mobile.content_type).toBe("image/webp");
    expect(desktop.content_type).toBe("image/webp");
    expect(heroDelivery.srcSet.split(", ").map((entry) => Number(entry.match(/(\d+)w$/)?.[1]))).toEqual([480, 800]);
    expect(heroDelivery.sizes).toBe("(max-width: 480px) 100vw, 800px");
  });
});