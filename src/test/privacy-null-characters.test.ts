import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { stripRendererNulls } from "@/lib/rendererNulls";

const languages = ["", "/el", "/de", "/es", "/fr", "/it", "/he", "/ar"];

describe("privacy policy null characters", () => {
  it("has no U+0000 in any language file", () => {
    for (const file of readdirSync("src/i18n/locales")) {
      expect(readFileSync(`src/i18n/locales/${file}`, "utf8").includes("\u0000"), file).toBe(false);
    }
  });

  it("removes U+0000 from all 8 rendered privacy pages without changing the words", () => {
    for (const prefix of languages) {
      expect(stripRendererNulls(`${prefix}/privacy-policy/`, "σύμφ\u0000ωνα νοημοσύνη\u0000ς")).toBe("σύμφωνα νοημοσύνης");
    }
  });

  it("leaves other pages untouched", () => {
    expect(stripRendererNulls("/el/about/", "a\u0000b")).toBe("a\u0000b");
  });
});
