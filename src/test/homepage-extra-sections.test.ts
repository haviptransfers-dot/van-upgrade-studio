import { describe, it, expect } from "vitest";
import en from "@/i18n/locales/en"; import el from "@/i18n/locales/el"; import de from "@/i18n/locales/de"; import es from "@/i18n/locales/es";
import fr from "@/i18n/locales/fr"; import itl from "@/i18n/locales/it"; import he from "@/i18n/locales/he"; import ar from "@/i18n/locales/ar";
const all = { en, el, de, es, fr, it: itl, he, ar } as Record<string, any>;
describe("homepage extra sections", () => {
  for (const [l, loc] of Object.entries(all)) it(`${l}: 8/8/7 items, links, rules`, () => {
    const s = loc.homeExtra.sections;
    expect(s.included.items).toHaveLength(8);
    expect(s.popular.items.map((x: any) => x.to)).toEqual(["/airport-transfer-athens","/blog/private-transfer-athens-airport-to-hotel","/piraeus-port-transfer","/athens-city-tour","/nafplio-private-tour","/delphi-private-tour","/meteora-private-tour","/cape-sounion-tour"]);
    expect(s.occasions.items).toHaveLength(7);
    expect(s.occasions.items.join(" ")).toContain("](/child-seats)");
    const txt = JSON.stringify(loc.homeExtra);
    expect(txt).not.toMatch(/V-Class|LTD|golf/i);
    expect(txt).toContain("Mercedes Vito VIP");
  });
});
