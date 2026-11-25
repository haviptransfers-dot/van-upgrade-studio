import { describe, expect, it } from "vitest";
import en from "@/i18n/locales/en";
import el from "@/i18n/locales/el";
import de from "@/i18n/locales/de";
import es from "@/i18n/locales/es";
import fr from "@/i18n/locales/fr";
import it_ from "@/i18n/locales/it";
import he from "@/i18n/locales/he";
import ar from "@/i18n/locales/ar";

const locales = { en, el, de, es, fr, it: it_, he, ar } as Record<string, any>;

describe("homepage extra copy", () => {
  for (const [lng, l] of Object.entries(locales)) {
    it(`${lng}: two new FAQs, meta ≤160, link phrases present`, () => {
      expect(l.homeExtra.faq).toHaveLength(2);
      expect(l.seoContent.homeDescription.length).toBeLessThanOrEqual(160);
      expect(l.seoContent.homeSections[0].paragraphs[0]).toContain(l.homeExtra.airportPhrase);
      expect(l.seoContent.homeSections[1].paragraphs[0]).toContain(l.homeExtra.portWord);
      expect(JSON.stringify(l.homeExtra)).not.toMatch(/V-Class|LTD|€/);
    });
  }
  it("English meta is exact", () => {
    expect(en.seoContent.homeDescription).toBe("Private VIP transfers and tours in Athens: ATH airport and Piraeus, Mercedes Vito VIP for up to 7 passengers, child seats included on request. WhatsApp us.");
  });
});
