import { describe, expect, it } from "vitest";
import { blogPosts, localizePost } from "@/data/blogPosts";
import el from "@/i18n/locales/el";
import { showTwitterDescription } from "@/lib/twitterDescription";

const expected: Record<string, string> = {
  "athens-private-tour-with-driver": "Ιδιωτική ξενάγηση στην Αθήνα με σοφέρ σε Mercedes Vito VIP. Πρόγραμμα στα μέτρα σας, παραλαβή ξενοδοχείου ή κρουαζιέρας, παιδικά καθίσματα κατόπιν αιτήματος.",
  "athens-to-nafplio-private-tour": "Ιδιωτική περιήγηση στο Ναύπλιο από την Αθήνα με Mercedes Vito VIP. Κόρινθος, Μυκήνες, Επίδαυρος. WhatsApp 24/7, παιδικά καθίσματα, παραλαβή από ξενοδοχείο.",
  "bachelor-bachelorette-party-transfers-greece": "Ιδιωτικές μεταφορές πάρτι με μαύρη Mercedes Vito VIP: μπαράκια και κλαμπ στην Αθήνα, παραλίες, οινοποιεία και το αεροδρόμιο. Όλο το βράδυ, σταθερή τιμή.",
  "mercedes-vito-vip-chauffeur-service-athens": "Κλείστε υπηρεσία σοφέρ Mercedes Vito VIP στην Αθήνα. Μεταφορές αεροδρομίου, λιμανιού και ξενοδοχείου, και ιδιωτικές περιηγήσεις με επαγγελματία οδηγό.",
  "night-transfer-athens-airport-late-arrival": "Άφιξη αργά στην Αθήνα; Κλείστε ιδιωτική βραδινή μεταφορά από το αεροδρόμιο με Mercedes Vito VIP, επαγγελματία σοφέρ, χώρο αποσκευών και WhatsApp 24/7.",
  "piraeus-cruise-transfer": "Προκρατημένη ιδιωτική μεταφορά κρουαζιέρας από το λιμάνι του Πειραιά προς ξενοδοχείο, αεροδρόμιο ή Αθήνα. Mercedes Vito VIP, συντονισμός αποβίβασης, WhatsApp.",
  "private-delphi-day-trip-from-athens": "Ιδιωτική ημερήσια εκδρομή με οδηγό από την Αθήνα στους Δελφούς με Mercedes Vito VIP. Παραλαβή ξενοδοχείου, στάση Αράχωβα, ευέλικτο ωράριο. WhatsApp 24/7.",
  "private-meteora-day-trip-from-athens": "Ιδιωτική ημερήσια εκδρομή από την Αθήνα στα Μετέωρα με Mercedes Vito VIP. Παραλαβή ξενοδοχείου, επίσκεψη σε μοναστήρια, ευέλικτο πρόγραμμα. WhatsApp 24/7.",
  "private-transfer-athens-airport-to-hotel": "Κλείστε ιδιωτική μεταφορά από το αεροδρόμιο της Αθήνας στο ξενοδοχείο σας. Mercedes Vito VIP, υποστήριξη WhatsApp 24/7, σταθερή παραλαβή, απευθείας διαδρομή.",
  "private-transfer-athens-multiple-suitcases": "Ιδιωτική μεταφορά στην Αθήνα με χώρο για πολλές βαλίτσες. Mercedes Vito VIP, επαγγελματίας οδηγός, WhatsApp 24/7, αποσκευές σχεδιασμένες εκ των προτέρων.",
  "private-transfer-athens-to-cape-sounio": "Ιδιωτική μεταφορά με οδηγό από την Αθήνα στο Σούνιο και τον Ναό του Ποσειδώνα με Mercedes Vito VIP. Ηλιοβασίλεμα, παράκτιες στάσεις. Κράτηση WhatsApp 24/7.",
};

describe("Part 2 Greek meta descriptions", () => {
  it.each(Object.entries(expected))("%s uses the approved Greek description within 160 characters", (slug, text) => {
    const post = blogPosts.find((p) => p.slug === slug)!;
    expect(localizePost(post, "el").metaDescription).toBe(text);
    expect(text.length).toBeLessThanOrEqual(160);
  });

  it("About, Child Seats and Piraeus use the approved Greek descriptions", () => {
    expect(el.preferredSources.metaDescription).toBe("Οι H&A VIP Tours είναι μια τοπική, οικογενειακή εταιρεία μεταφορών στην Αθήνα. Προσθέστε μας ως προτιμώμενη πηγή στο Google για τα ταξιδιωτικά μας άρθρα.");
    expect(el.seoContent.childDescription).toBe("Πείτε μας τις ηλικίες των παιδιών και ζητήστε παιδικά καθίσματα κατόπιν αιτήματος όταν κλείνετε τη μεταφορά. Επιβεβαιώστε τα καθίσματα πριν από την κράτηση.");
    expect(el.seoContent.piraeusDescription).toBe("Ιδιωτικές μεταφορές Πειραιά προς αεροδρόμιο, ξενοδοχεία και κέντρο Αθήνας. Mercedes Vito VIP έως 7 επιβάτες, υποδοχή και παιδικά καθίσματα κατόπιν αιτήματος.");
  });

  it("keeps the Greek child-seat article out of the twitter rollout", () => {
    expect(showTwitterDescription("/blog/child-car-seats-private-transfers-greece", "el")).toBe(false);
    expect(showTwitterDescription("/blog/piraeus-cruise-transfer", "el")).toBe(true);
  });
});
