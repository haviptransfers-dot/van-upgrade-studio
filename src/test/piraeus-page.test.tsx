import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { describe, expect, it } from "vitest";
import ServiceContent from "@/components/ServiceContent";
import RelatedTravelLinks from "@/components/RelatedTravelLinks";
import { structuredDataForPath } from "@/data/structuredData";
import en from "@/i18n/locales/en";
import el from "@/i18n/locales/el";
import de from "@/i18n/locales/de";
import es from "@/i18n/locales/es";
import fr from "@/i18n/locales/fr";
import itLocale from "@/i18n/locales/it";
import he from "@/i18n/locales/he";
import ar from "@/i18n/locales/ar";

const locales = { en, el, de, es, fr, it: itLocale, he, ar } as Record<string, any>;
const guidePaths = [
  "/blog/athens-airport-to-piraeus-port-transport-options/",
  "/blog/private-transfer-piraeus-port-to-athens-airport/",
  "/blog/piraeus-cruise-transfer/",
];
const oneHour: Record<string, string> = { en: "1 hour", el: "1 ώρα", de: "1 Stunde", es: "1 hora", fr: "1 heure", it: "1 ora", he: "שעה אחת", ar: "ساعة واحدة" };

describe.each(Object.entries(locales))("Piraeus page content in %s", (language, locale) => {
  it("contains the localized introduction, prices, inclusions, six FAQs and three guide links", () => {
    const content = locale.seoContent;
    expect(content.piraeusIntro).toContain("Mercedes Vito VIP");
    expect(content.piraeusSections[0].paragraphs[0]).toContain(content.piraeusAirportLabel);
    expect(content.piraeusSections).toHaveLength(5);

    const prices = content.piraeusSections[2];
    expect(prices.paragraphs[0]).toContain("55");
    expect(prices.paragraphs[0]).toContain("100");
    expect(prices.paragraphs[0]).toContain("110");
    expect(prices.items).toHaveLength(5);
    expect(prices.quoteLink.length).toBeGreaterThan(10);

    expect(content.piraeusFaq).toHaveLength(6);
    expect(content.piraeusFaq[1].answer).toContain("55");
    expect(content.piraeusFaq[1].answer).toContain("100");
    expect(content.piraeusFaq[1].answer).toContain("110");
    expect(content.piraeusFaq[2].answer).toContain(oneHour[language]);
    expect(content.piraeusFaq[3].answer).toContain("E11");
    expect(content.piraeusFaq[3].answer).toContain("E12");
    expect(content.piraeusFaq[3].answer).toContain("E6");
    expect(content.piraeusFaq[3].answer).toContain("E8");
    for (const path of guidePaths) expect(content.piraeusRelated).toContain(path);
    expect(locale.faq.items.a1).toContain("55");
    expect(locale.faq.items.a1).not.toContain("85");
  });

  it("server-renders the same visible FAQs and FAQPage schema with working localized links", async () => {
    const i18n = createInstance();
    await i18n.init({
      lng: language,
      fallbackLng: false,
      resources: { [language]: { translation: locale } },
      interpolation: { escapeValue: false },
    });
    const html = renderToString(
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={language === "en" ? "/piraeus-port-transfer/" : `/${language}/piraeus-port-transfer/`}>
          <ServiceContent port />
          <RelatedTravelLinks piraeus />
        </StaticRouter>
      </I18nextProvider>,
    );
    const container = document.createElement("div");
    container.innerHTML = html;

    const visibleQuestions = Array.from(container.querySelectorAll("h3")).slice(-6).map((item) => item.textContent);
    expect(visibleQuestions).toEqual(locale.seoContent.piraeusFaq.map((item: any) => item.question));
    const schema = JSON.parse(container.querySelector('script[type="application/ld+json"]')?.textContent ?? "{}");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toEqual(locale.seoContent.piraeusFaq.map((item: any) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })));

    const prefix = language === "en" ? "" : `/${language}`;
    const hrefs = Array.from(container.querySelectorAll("a")).map((link) => link.getAttribute("href"));
    expect(hrefs).toContain(`${prefix}/airport-transfer-athens/`);
    for (const path of guidePaths) expect(hrefs).toContain(`${prefix}${path}`);
    expect(hrefs).not.toContain(`${prefix}/piraeus-port-transfer/`);
    expect(container.querySelector('a[href="#calculator"]')?.textContent).toBe(locale.seoContent.piraeusSections[2].quoteLink);
  });
});

describe("English Piraeus wording", () => {
  it("uses the exact supplied introduction, prices and FAQ answers", () => {
    expect(en.seoContent.piraeusIntro).toBe("Private VIP transfers from Piraeus Port in a Mercedes Vito VIP: cruise terminal and ferry gates to Athens Airport, hotels in the city centre and the Athens Riviera, for up to 7 passengers.");
    expect(en.seoContent.piraeusSections[2]).toEqual({
      heading: "Piraeus transfer prices",
      paragraphs: ["Athens city centre ↔ Piraeus Port: from €55. Athens Airport ↔ Piraeus Port: from €100 (€110 for 5–7 passengers)."],
      quoteLink: "For an exact quote, use the price calculator.",
      listHeading: "What's included",
      items: ["Meet & greet with a name sign", "Flight and ship tracking for delays", "1 hour of free waiting at the airport and at the port", "Help with luggage", "Child seats included on request"],
    });
    expect(en.seoContent.piraeusFaq.slice(1)).toEqual([
      { question: "How much does a private Piraeus transfer cost?", answer: "From the Athens city centre to Piraeus Port from €55. From Athens Airport to Piraeus Port from €100, or €110 for 5–7 passengers. For an exact quote, use the price calculator on this page." },
      { question: "What are the waiting arrangements at Piraeus?", answer: "We include 1 hour of free waiting at the port and at the airport, and we track flights and ships for delays. The meeting point is confirmed when you book." },
      { question: "Do you pick up at the cruise terminal and the ferry gates?", answer: "Yes. Cruise ships usually arrive around gates E11 and E12, and ferries to the Cyclades and Aegina often use gates E6 to E8. Tell us your ship or ferry company name." },
      { question: "Can you take us to Piraeus for the ferry to Aegina?", answer: "Yes. We drive you from your hotel or Athens Airport to the right ferry gate at Piraeus, and pick you up when you return." },
      { question: "Do you go from Piraeus to hotels in the Athens city centre?", answer: "Yes, including Syntagma, Plaka, Monastiraki and Koukaki, and the Athens Riviera, including Glyfada and Vouliagmeni." },
    ]);
  });
});

describe("Piraeus structured offers", () => {
  it("publishes separate city-centre and airport prices with the approved brand", () => {
    const graph = (structuredDataForPath("/piraeus-port-transfer", false)?.["@graph"] ?? []) as any[];
    const service = graph.find((item) => item["@type"] === "Service");
    const trip = graph.find((item) => item["@type"] === "TouristTrip");
    expect(service?.offers.map((offer: any) => ({ price: offer.price, currency: offer.priceCurrency, name: offer.name }))).toEqual([
      { price: 55, currency: "EUR", name: "Athens city centre ↔ Piraeus Port" },
      { price: 100, currency: "EUR", name: "Athens Airport ↔ Piraeus Port" },
    ]);
    expect(trip?.description).toContain("arranged by H&A VIP Tours");
  });

  it("does not change the arranged-by wording on other service pages", () => {
    const graph = (structuredDataForPath("/athens-city-tour", false)?.["@graph"] ?? []) as any[];
    expect(graph.find((item) => item["@type"] === "TouristTrip")?.description).toContain("arranged by H&A Tours");
  });
});
