import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";
import PriceCalculator from "@/components/PriceCalculator";
import { calculatorEmailUrl } from "@/lib/calculatorBooking";
import en from "@/i18n/locales/en";
import el from "@/i18n/locales/el";
import de from "@/i18n/locales/de";
import es from "@/i18n/locales/es";
import fr from "@/i18n/locales/fr";
import itLocale from "@/i18n/locales/it";
import he from "@/i18n/locales/he";
import ar from "@/i18n/locales/ar";

const locales = { en, el, de, es, fr, it: itLocale, he, ar };
beforeEach(() => vi.stubGlobal("IntersectionObserver", class {
  observe() {}
  unobserve() {}
  disconnect() {}
}));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

async function calculator(lang: keyof typeof locales = "en") {
  const instance = createInstance();
  await instance.init({ lng: lang, resources: { [lang]: { translation: locales[lang] } }, interpolation: { escapeValue: false } });
  render(<I18nextProvider i18n={instance}><PriceCalculator /></I18nextProvider>);
}

describe("unchanged calculator fares and customer-initiated email drafts", () => {
  it("keeps Athens airport fares at €85 for 1–4 and €100 for 5–7 passengers", async () => {
    await calculator();
    expect(screen.getByText("€85")).toBeInTheDocument();
    const increase = screen.getByRole("button", { name: en.seoUi.uiTranslations["Increase passengers"] });
    fireEvent.click(increase); fireEvent.click(increase);
    expect(screen.getByText("€85")).toBeInTheDocument();
    fireEvent.click(increase);
    expect(screen.getByText("€100")).toBeInTheDocument();
    for (let i = 0; i < 5; i++) fireEvent.click(increase);
    const email = new URL(screen.getByRole("link", { name: en.calc.bookEmail }).getAttribute("href") ?? "");
    expect(email.searchParams.get("body")).toContain(`${en.calc.email.passengers}: 7`);
  });

  it("adds exactly €10 per passenger at night without changing the base fare", async () => {
    await calculator();
    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("€105")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: en.seoUi.uiTranslations["Increase passengers"] }));
    expect(screen.getByText("€115")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("€85")).toBeInTheDocument();
  });

  it.each([
    ["sounio", 350], ["athens_sights", 180], ["port_to_athens", 55],
    ["nafplio", 500], ["meteora", 800], ["delphi", 500],
  ] as const)("keeps the %s fixed fare at €%s", async (service, fare) => {
    await calculator();
    fireEvent.click(screen.getByRole("button", { name: (name) => name.includes(en.calc.services[service]) }));
    expect(screen.getByText(`€${fare}`)).toBeInTheDocument();
  });

  for (const [lang, locale] of Object.entries(locales)) {
    it(`${lang}: drafts a localized mail to the unchanged recipient with the current selection`, () => {
      const service = locale.calc.services.airport_to_athens;
      const href = new URL(calculatorEmailUrl({ service, passengers: 5, night: true, total: 150 }, locale.calc.email));
      expect(href.protocol).toBe("mailto:");
      expect(href.pathname).toBe("h.a.viptransfers@gmail.com");
      expect(href.searchParams.get("subject")).toBe(`${locale.calc.email.subject}: ${service}`);
      expect(href.searchParams.get("body")?.split("\n")).toEqual([
        `${locale.calc.email.service}: ${service}`, `${locale.calc.email.passengers}: 5`,
        `${locale.calc.email.night}: ${locale.calc.email.yes}`, `${locale.calc.email.price}: €150`, "",
        `${locale.calc.email.dateTime}:`, "", `${locale.calc.email.flightShip}:`, "",
        `${locale.calc.email.address}:`, "", `${locale.calc.email.name}:`,
      ]);
    });
  }
});