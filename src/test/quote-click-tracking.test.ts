import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { acceptAll, rejectNonEssential, saveConsent } from "@/lib/cookieConsent";
import { trackRateLimitWhatsAppClick } from "@/lib/quoteClickTracking";

describe("rate-limit WhatsApp click privacy", () => {
  const gtag = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    gtag.mockReset();
    Object.defineProperty(window, "gtag", { value: gtag, configurable: true });
  });
  afterEach(() => {
    Reflect.deleteProperty(window, "gtag");
    localStorage.clear();
  });

  it("does not track before consent", () => {
    trackRateLimitWhatsAppClick();
    expect(gtag).not.toHaveBeenCalled();
  });
  it("does not track rejected or marketing-only consent", () => {
    saveConsent(rejectNonEssential());
    trackRateLimitWhatsAppClick();
    saveConsent({ necessary: true, analytics: false, marketing: true });
    trackRateLimitWhatsAppClick();
    expect(gtag).not.toHaveBeenCalled();
  });
  it("sends exactly one minimal event per consented click to existing Google Analytics", () => {
    saveConsent({ necessary: true, analytics: true, marketing: false });
    trackRateLimitWhatsAppClick();
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "rate_limit_whatsapp_click", {
      send_to: "G-1K40KS1TVB",
      source: "chat_rate_limit",
      destination: "whatsapp",
      page_location: window.location.origin,
      page_referrer: "",
      page_title: "H&A Tours",
      transport_type: "beacon",
    });
  });
  it("checks consent again after withdrawal and never replays rejected clicks", () => {
    saveConsent(acceptAll());
    trackRateLimitWhatsAppClick();
    saveConsent(rejectNonEssential());
    trackRateLimitWhatsAppClick();
    saveConsent(acceptAll());
    expect(gtag).toHaveBeenCalledTimes(1);
  });
  it("does not load analytics when unavailable or interrupt navigation on failure", () => {
    saveConsent(acceptAll());
    Reflect.deleteProperty(window, "gtag");
    expect(trackRateLimitWhatsAppClick).not.toThrow();
    Object.defineProperty(window, "gtag", {
      value: () => { throw new Error("Analytics blocked"); }, configurable: true,
    });
    expect(trackRateLimitWhatsAppClick).not.toThrow();
  });
});