import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import en from "../i18n/locales/en";
import el from "../i18n/locales/el";
import de from "../i18n/locales/de";
import es from "../i18n/locales/es";
import fr from "../i18n/locales/fr";
import itLocale from "../i18n/locales/it";
import he from "../i18n/locales/he";
import ar from "../i18n/locales/ar";
import pageLastmod from "../data/pageLastmod.json";

const locales = { en, el, de, es, fr, it: itLocale, he, ar } as const;
const LEGAL_NAME = "H&A Tours \u0395\u0395"; // Greek capital Epsilon x2
const textOf = (l: (typeof locales)[keyof typeof locales]) =>
  l.seoContent.privacySections.map((s) => [s.heading, ...s.paragraphs].join("\n")).join("\n");

describe("privacy policy pages", () => {
  for (const [lang, locale] of Object.entries(locales)) {
    it(`${lang}: has the eight required sections`, () => {
      expect(locale.seoContent.privacySections).toHaveLength(8);
    });

    it(`${lang}: names the controller only as H&A Tours ΕΕ`, () => {
      const text = textOf(locale);
      expect(text).toContain(LEGAL_NAME);
      expect(text).not.toMatch(/\bLtd\b|\bLLC\b|\bIKE\b|ΙΚΕ|\bEPE\b|ΕΠΕ|\bO\.?E\.?\b|\bS\.?A\.?\b|GmbH|\bSARL\b|S\.r\.l\./);
      expect(text).not.toMatch(/ΑΦΜ|ΓΕΜΗ|\bVAT\b/);
    });

    it(`${lang}: includes controller contacts and Greek retention laws`, () => {
      const text = textOf(locale);
      for (const s of ["h.a.viptransfers@gmail.com", "+30 210 992 5244", "+30 694 939 3700", "4308/2014", "5104/2024", "G-1K40KS1TVB", "us-east-1", "cookieConsent", "+30 210 6475 600"]) {
        expect(text).toContain(s);
      }
      expect(text).toContain(lang === "el" ? "Αφροδίτης 66, Ελληνικό 167 77" : "Afroditis 66, Elliniko 167 77");
    });
  }

  it("el: uses the required official headings and DPA sentence", () => {
    expect(el.seoContent.privacySections.map((s) => s.heading)).toEqual([
      "Ποιοι είμαστε",
      "Τι συλλέγουμε",
      "Νομικές βάσεις (άρθρο 6 GDPR)",
      "Για πόσο κρατάμε τα δεδομένα",
      "Εκτελούντες την επεξεργασία και άλλοι αποδέκτες",
      "Διεθνείς διαβιβάσεις",
      "Cookies",
      "Τα δικαιώματά σας (GDPR)",
    ]);
    const text = textOf(el);
    expect(text).toContain("Η H&A VIP Tours (H&A Tours \u0395\u0395, Ετερόρρυθμη Εταιρεία) είναι ο υπεύθυνος επεξεργασίας.");
    expect(text).toContain("Έχετε επίσης δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα, Λεωφ. Κηφισίας 1-3, 115 23 Αθήνα, www.dpa.gr, τηλ. +30 210 6475 600.");
  });

  it("dates the eight changed privacy URLs to November 24", () => {
    const urls = ["/privacy-policy/", ...["el", "de", "es", "fr", "it", "he", "ar"].map((l) => `/${l}/privacy-policy/`)];
    for (const u of urls) expect((pageLastmod as Record<string, string>)[u]).toBe("2026-11-24");
  });
});

describe("footer privacy link", () => {
  const labels = {
    en: "Privacy Policy",
    el: "Πολιτική Απορρήτου",
    de: "Datenschutzerklärung",
    es: "Política de Privacidad",
    fr: "Politique de Confidentialité",
    it: "Informativa sulla Privacy",
    he: "מדיניות פרטיות",
    ar: "سياسة الخصوصية",
  };
  for (const [lang, label] of Object.entries(labels)) {
    it(`${lang}: uses the owner's label`, () => {
      expect(locales[lang as keyof typeof locales].footer.privacy).toBe(label);
    });
  }

  it("links to the localized privacy page", () => {
    const footer = readFileSync("src/components/SiteFooter.tsx", "utf8");
    expect(footer).toContain('import Link from "@/components/LocalizedLink"');
    expect(footer).toContain('to="/privacy-policy"');
    expect(footer).toContain('t("footer.privacy")');
  });
});
