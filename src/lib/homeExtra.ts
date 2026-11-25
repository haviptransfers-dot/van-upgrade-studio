import { useTranslation } from "react-i18next";

export type HomeExtra = {
  eyebrow: string;
  intro: string;
  servicesIntro: string;
  airportPhrase: string;
  portWord: string;
  faq: { q: string; a: string }[];
};

/** Homepage-only copy. Read without language fallback so a language without approved text keeps its current homepage. */
export function useHomeExtra(enabled: boolean): HomeExtra | null {
  const { i18n } = useTranslation();
  if (!enabled) return null;
  const lng = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  return (i18n.getResource(lng, "translation", "homeExtra") as HomeExtra | undefined) ?? null;
}
