import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import en from "@/i18n/locales/en";
import { showTwitterDescription } from "@/lib/twitterDescription";

const expected: Record<string, string> = {
  "athens-private-tour-with-driver": "Discover Athens at your own pace with a private tour and chauffeur in a Mercedes Vito VIP. Custom itinerary, hotel or cruise pickup, child seats on request.",
  "bachelor-bachelorette-party-transfers-greece": "Private party transfers in a black Mercedes Vito VIP: bars and clubs in Athens, beach days, wineries and airport pickups. All-night availability, fixed price.",
  "chauffeur-transfer-versus-athens-taxi": "Chauffeur transfer versus Athens taxi: availability, luggage, child seats, privacy and fixed scheduling — when a private Mercedes Vito VIP is a better choice.",
  "night-transfer-athens-airport-late-arrival": "Arriving late in Athens? Book a private night transfer from Athens Airport in a Mercedes Vito VIP, professional chauffeur, luggage space and WhatsApp 24/7.",
  "private-delphi-day-trip-from-athens": "Private chauffeur-driven day trip from Athens to Delphi in a Mercedes Vito VIP. Hotel pickup, an Arachova stop, and flexible timing. Book via WhatsApp 24/7.",
  "private-meteora-day-trip-from-athens": "Private chauffeur-driven day trip from Athens to Meteora in a Mercedes Vito VIP. Hotel pickup, monastery visits, flexible timing and 24/7 WhatsApp booking.",
  "private-transfer-athens-multiple-suitcases": "Book a private Athens transfer with space for multiple suitcases. Mercedes Vito VIP, professional chauffeur, WhatsApp 24/7, luggage planned in advance.",
  "private-transfer-athens-to-cape-sounio": "Private transfer from Athens to Cape Sounion and the Temple of Poseidon in a Mercedes Vito VIP. Sunset tours and coastal stops. Book via WhatsApp 24/7.",
  "wedding-transfers-greece-mercedes-vito-vip": "Private wedding transfers across Greece: bridal, couple and guest transport in a black Mercedes Vito VIP with a professional chauffeur. Full-day availability.",
};

describe("Part 1 English meta descriptions", () => {
  it.each(Object.entries(expected))("%s uses the approved description within 160 characters", (slug, text) => {
    const post = blogPosts.find((p) => p.slug === slug);
    expect(post?.metaDescription).toBe(text);
    expect(text.length).toBeLessThanOrEqual(160);
  });

  it("About and Nafplio use the approved descriptions", () => {
    expect(en.preferredSources.supportText).toBe("H&A VIP Tours is a local, family-owned transfer company in Athens. Add us as a preferred source on Google to stay updated with our latest travel guides.");
    expect(en.seo.nafplio.description).toBe("Private day tour from Athens to Nafplio, Mycenae & Epidaurus in a Mercedes Vito VIP, with a professional English-speaking driver. Greece's first capital.");
  });

  it("adds twitter:description only to the listed English pages", () => {
    expect(showTwitterDescription("/about", "en")).toBe(true);
    expect(showTwitterDescription("/about", "el")).toBe(false);
    expect(showTwitterDescription("/blog/child-car-seats-private-transfers-greece", "en")).toBe(false);
    expect(showTwitterDescription("/airport-transfer-athens", "en")).toBe(false);
  });
});
