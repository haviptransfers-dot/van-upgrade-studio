import { getConsent } from "@/lib/cookieConsent";

type AnalyticsWindow = Window & {
  gtag?: (command: "event", name: string, parameters: Record<string, string>) => void;
};

// Used only by the lazy chat. Never loads analytics, stores identifiers, queues
// rejected clicks, or sends message/booking/countdown data. Use the existing GA
// destination only, with URL query strings and referrer excluded from this event.
export function trackRateLimitWhatsAppClick(): void {
  try {
    if (getConsent()?.analytics !== true) return;
    const analytics = (window as AnalyticsWindow).gtag;
    if (typeof analytics !== "function") return;
    analytics("event", "rate_limit_whatsapp_click", {
      send_to: "G-1K40KS1TVB",
      source: "chat_rate_limit",
      destination: "whatsapp",
      page_location: window.location.origin,
      page_referrer: "",
      page_title: "H&A Tours",
      transport_type: "beacon",
    });
  } catch {
    // Consent/storage/analytics failures must never prevent the instant quote.
  }
}