import { describe, expect, it } from "vitest";
import en from "../i18n/locales/en";
import el from "../i18n/locales/el";
import de from "../i18n/locales/de";
import fr from "../i18n/locales/fr";
import itLocale from "../i18n/locales/it";
import es from "../i18n/locales/es";
import he from "../i18n/locales/he";
import ar from "../i18n/locales/ar";

const locales = { en, el, de, fr, it: itLocale, es, he, ar };
const hours = (value: string) => Number(value.match(/\d+/)?.[0]);
const lastHours = (value: string) => Number(value.match(/\d+(?![\s\S]*\d)/)?.[0]);
const numericRanges = (value: string) => value.replace(/,/g, ".").match(/\d+(?:\.\d+)?[–-]\d+(?:\.\d+)?/g);

describe.each(Object.entries(locales))("owner-confirmed facts in %s", (_language, locale) => {
  it("uses 8 hours for the complete Delphi tour", () => {
    expect(hours(locale.delphiTour.durationVal)).toBe(8);
    expect(lastHours(locale.tours.items.delphi.long)).toBe(8);
  });
  it("uses 8 hours for the complete Nafplio tour", () => {
    expect(hours(locale.nafplioTour.durationVal)).toBe(8);
    expect(lastHours(locale.tours.items.nafplio.long)).toBe(8);
  });
  it("uses 12 hours for the complete Meteora tour", () => {
    expect(hours(locale.meteoraTour.durationVal)).toBe(12);
    expect(lastHours(locale.tours.items.meteora.long)).toBe(12);
  });
  it("uses 3 hours for the same Athens/Acropolis tour", () => {
    expect(hours(locale.athensTour.durationVal)).toBe(3);
    expect(lastHours(locale.tours.items.acropolis.long)).toBe(3);
    expect(hours(locale.calc.services.athens_sights)).toBe(3);
  });
  it("uses 5 hours for the complete Sounion tour", () => {
    expect(hours(locale.sounionTour.durationVal)).toBe(5);
    expect(lastHours(locale.tours.items.sounio.long)).toBe(5);
    expect(hours(locale.calc.services.sounio)).toBe(5);
  });
  it("retains the five owner-confirmed tour amounts", () => {
    expect([locale.athensTour, locale.sounionTour, locale.delphiTour, locale.meteoraTour, locale.nafplioTour]
      .map((tour) => hours(tour.priceVal))).toEqual([180, 350, 500, 800, 500]);
  });
  it("retains 0–13 kg with approximate ages up to 2–3 years", () => {
    expect(numericRanges(locale.childSeats.group0.range.replace(/ - /g, "–"))).toEqual(["0–13", "2–3"]);
  });
  it("retains 9–18 kg with approximate ages from 2.5–3 to 4–5 years", () => {
    expect(numericRanges(locale.childSeats.group1.range.replace(/ - /g, "–"))).toEqual(["9–18", "2.5–3", "4–5"]);
  });
  it("retains 15–36 kg with ages from 4 years and no invented upper age", () => {
    expect(numericRanges(locale.childSeats.booster.range.replace(/ - /g, "–"))).toEqual(["15–36"]);
    expect(lastHours(locale.childSeats.booster.range)).toBe(4);
  });
});