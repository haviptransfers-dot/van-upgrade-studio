/** Localized inbound link label for the /vip-tours-athens/ hub; tiny on purpose so the homepage and footer avoid loading hub copy. */
export const VIP_TOURS_PATH = "/vip-tours-athens";
const labels: Record<string, string> = {
  en: "See all VIP tours from Athens",
  el: "Δείτε όλες τις VIP εκδρομές από την Αθήνα",
  de: "Alle VIP-Touren ab Athen ansehen",
  es: "Ver todos los tours VIP desde Atenas",
  fr: "Voir toutes les excursions VIP depuis Athènes",
  it: "Scopri tutti i tour VIP da Atene",
  he: "לכל סיורי ה-VIP מאתונה",
  ar: "شاهد جميع جولات VIP من أثينا",
};
export const vipToursLabel = (language: string) => labels[language.split("-")[0]] ?? labels.en;
