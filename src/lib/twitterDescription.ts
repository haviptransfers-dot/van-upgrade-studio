// Pages whose owner-approved meta description is also published as twitter:description.
// Scoped per language so unreviewed pages keep their current head tags.
const TWITTER_DESCRIPTION_PAGES: Record<string, readonly string[]> = {
  en: [
    "/about",
    "/blog/athens-private-tour-with-driver",
    "/blog/bachelor-bachelorette-party-transfers-greece",
    "/blog/chauffeur-transfer-versus-athens-taxi",
    "/blog/night-transfer-athens-airport-late-arrival",
    "/blog/private-delphi-day-trip-from-athens",
    "/blog/private-meteora-day-trip-from-athens",
    "/blog/private-transfer-athens-multiple-suitcases",
    "/blog/private-transfer-athens-to-cape-sounio",
    "/blog/wedding-transfers-greece-mercedes-vito-vip",
    "/nafplio-private-tour",
  ],
  el: [
    "/about",
    "/blog/athens-private-tour-with-driver",
    "/blog/athens-to-nafplio-private-tour",
    "/blog/bachelor-bachelorette-party-transfers-greece",
    "/blog/mercedes-vito-vip-chauffeur-service-athens",
    "/blog/night-transfer-athens-airport-late-arrival",
    "/blog/piraeus-cruise-transfer",
    "/blog/private-delphi-day-trip-from-athens",
    "/blog/private-meteora-day-trip-from-athens",
    "/blog/private-transfer-athens-airport-to-hotel",
    "/blog/private-transfer-athens-multiple-suitcases",
    "/blog/private-transfer-athens-to-cape-sounio",
  ],
};

export const showTwitterDescription = (path: string, language: string) =>
  TWITTER_DESCRIPTION_PAGES[language.split("-")[0]]?.includes(path) ?? false;
