import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { stripRendererNulls } from "@/lib/rendererNulls";

describe("hidden null characters", () => {
  it("has no U+0000 in any language file", () => {
    for (const file of readdirSync("src/i18n/locales")) {
      expect(readFileSync(`src/i18n/locales/${file}`, "utf8").includes("\u0000"), file).toBe(false);
    }
  });

  it("removes every U+0000 from rendered pages without changing the words", () => {
    expect(stripRendererNulls("σύμφ\u0000ωνα νοημοσύνη\u0000ς ⚓ → \u0000\u0000\u0000🏛")).toBe("σύμφωνα νοημοσύνης ⚓ → 🏛");
  });
});
