import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en";
import de from "./locales/de";
import es from "./locales/es";
import fr from "./locales/fr";
import it from "./locales/it";
import el from "./locales/el";
import he from "./locales/he";
import ar from "./locales/ar";

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
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      es: { translation: es },
      fr: { translation: fr },
      it: { translation: it },
      el: { translation: el },
      he: { translation: he },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "de", "es", "fr", "it", "el", "he", "ar"],
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
  });

applyDir(i18n.language);
i18n.on("languageChanged", applyDir);

export default i18n;
