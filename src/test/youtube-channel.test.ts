import { describe, expect, it } from "vitest";
import { organization } from "@/data/structuredData";

describe("owner-confirmed YouTube channel", () => {
  it("identifies @HATOURSATHENS as the business channel", () => {
    expect(organization.sameAs.filter(url => url.includes("youtube.com"))).toEqual([
      "https://www.youtube.com/@HATOURSATHENS",
    ]);
  });
});