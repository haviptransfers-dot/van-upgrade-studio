export const SITE_URL = "https://haviptransfers.gr";

export const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "H&A Tours",
  url: `${SITE_URL}/`,
  telephone: "+306949393700",
  email: "h.a.viptransfers@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Athens", addressCountry: "GR" },
  areaServed: { "@type": "Country", name: "Greece" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: 5, bestRating: 5, worstRating: 1, reviewCount: 127, ratingCount: 127 },
  sameAs: ["https://g.page/r/CWZohu9AJOBoEBM/review", "https://www.instagram.com/antonhs_ieronymakhs", "https://www.facebook.com/profile.php?id=61590718264708"],
};

export const servicePages = [
  { path: "/airport-transfer-athens", name: "Athens Airport Private Transfer", type: "Private airport transfer", areas: ["Athens", "Athens International Airport"], prices: [85, 100], tiered: true },
  { path: "/piraeus-port-transfer", name: "Piraeus Port Private Transfer", type: "Private port transfer", areas: ["Athens", "Piraeus"], prices: [55], tiered: false },
  { path: "/athens-city-tour", name: "Athens City Private Tour", type: "Private sightseeing tour", areas: ["Athens"], prices: [180], tiered: false },
  { path: "/cape-sounion-tour", name: "Cape Sounion Private Tour", type: "Private sightseeing tour", areas: ["Athens", "Cape Sounion", "Athens Riviera"], prices: [350], tiered: false },
  { path: "/delphi-private-tour", name: "Delphi Private Tour from Athens", type: "Private sightseeing tour", areas: ["Athens", "Delphi", "Arachova"], prices: [500], tiered: false },
  { path: "/meteora-private-tour", name: "Meteora Private Tour from Athens", type: "Private sightseeing tour", areas: ["Athens", "Meteora", "Kalambaka"], prices: [800], tiered: false },
  { path: "/nafplio-private-tour", name: "Nafplio Private Tour from Athens", type: "Private sightseeing tour", areas: ["Athens", "Nafplio", "Corinth Canal"], prices: [500], tiered: false },
];

export function structuredDataForPath(path: string) {
  const page = servicePages.find((entry) => entry.path === path);
  if (!page) return path === "/" ? { "@context": "https://schema.org", "@graph": [organization] } : undefined;
  const url = `${SITE_URL}${page.path}`;
  const places = page.areas.map((name) => ({ "@type": "Place", name }));
  const offers = page.prices.map((price, index) => ({
    "@type": "Offer", price, priceCurrency: "EUR", url,
    name: page.tiered ? `${index === 0 ? "1–4" : "5–7"} passengers — base daytime fare` : "Private vehicle — base daytime price",
    seller: { "@id": organization["@id"] },
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      // The displayed Google score is for the business, not a separate rating of every tour.
      organization,
      { "@type": "Service", "@id": `${url}#service`, url, name: page.name, serviceType: page.type, provider: { "@id": organization["@id"] }, areaServed: places, offers },
      { "@type": "TouristTrip", "@id": `${url}#trip`, url, name: page.name, description: `${page.type} in a private Mercedes V-Class, arranged by H&A Tours.`, provider: { "@id": organization["@id"] }, itinerary: { "@type": "ItemList", itemListElement: places.map((item, index) => ({ "@type": "ListItem", position: index + 1, item })) }, offers },
    ],
  };
}