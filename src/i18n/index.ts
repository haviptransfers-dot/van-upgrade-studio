import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en";
const loaders = {
  de: () => import("./locales/de"),
  es: () => import("./locales/es"),
  fr: () => import("./locales/fr"),
  it: () => import("./locales/it"),
  el: () => import("./locales/el"),
  he: () => import("./locales/he"),
  ar: () => import("./locales/ar"),
};

const RTL_LANGS = ["he", "ar"];

const applyDir = (lng: string) => {
  const base = (lng || "en").split("-")[0];
  const dir = RTL_LANGS.includes(base) ? "rtl" : "ltr";
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", base);
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use({
    type: "backend" as const,
    init() {},
    read(language: string, _namespace: string, callback: (error: Error | null, data: object | false) => void) {
      const loader = loaders[language as keyof typeof loaders];
      if (!loader) { callback(null, en); return; }
      loader().then((module) => callback(null, module.default)).catch((error: Error) => callback(error, false));
    },
  })
  .init({
    partialBundledLanguages: true,
    resources: {
      en: { translation: en },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "de", "es", "fr", "it", "el", "he", "ar"],
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
  });

applyDir(i18n.language);
i18n.on("languageChanged", applyDir);

export default i18n;
