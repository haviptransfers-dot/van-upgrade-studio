import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import HomeExtraSections from "@/components/HomeExtraSections";
import { bookingReadyMessage, READY_MSG } from "@/lib/bookingReadyMessage";
import en from "@/i18n/locales/en"; import el from "@/i18n/locales/el"; import de from "@/i18n/locales/de"; import es from "@/i18n/locales/es";
import fr from "@/i18n/locales/fr"; import itl from "@/i18n/locales/it"; import he from "@/i18n/locales/he"; import ar from "@/i18n/locales/ar";
const all = { en, el, de, es, fr, it: itl, he, ar } as Record<string, any>;
const expected: Record<string, string> = {
  en: "ready to send", el: "έτοιμο για αποστολή", de: "versandbereit", es: "lista para enviar",
  fr: "prête à être envoyée", it: "pronta per l'invio", he: "מוכנה לשליחה", ar: "جاهز للإرسال",
};
describe("homepage extra sections server HTML", () => {
  for (const [l, loc] of Object.entries(all)) it(`${l}: one ✓ per item, no svg`, () => {
    const html = renderToString(<MemoryRouter><HomeExtraSections sections={loc.homeExtra.sections} /></MemoryRouter>);
    expect(html).not.toContain("<svg");
    expect(html.match(/✓/g)).toHaveLength(8 + 8 + 7);
  });
});
describe("chat booking message language", () => {
  it("covers exactly 8 languages", () => expect(Object.keys(READY_MSG).sort()).toEqual(Object.keys(all).sort()));
  for (const l of Object.keys(all)) it(`${l}: matches page language`, () => {
    expect(bookingReadyMessage(l)).toContain(expected[l]);
    expect(bookingReadyMessage(`${l}-XX`, "Anna")).toContain(`Anna, `);
    if (l !== "en") expect(bookingReadyMessage(l)).not.toContain("ready to send");
  });
  it("falls back to English", () => expect(bookingReadyMessage("zz")).toBe("✅ Your booking request is ready to send. Please tap WhatsApp or email to complete it."));
});
