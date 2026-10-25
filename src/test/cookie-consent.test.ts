// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  CONSENT_KEY,
  acceptAll,
  getConsent,
  rejectNonEssential,
  saveConsent,
} from "../lib/cookieConsent";
import { nonCriticalScheduler } from "../lib/non-critical-scheduler";

describe("cookie consent storage", () => {
  beforeEach(() => window.localStorage.clear());

  it("uses the localStorage key cookieConsent", () => {
    expect(CONSENT_KEY).toBe("cookieConsent");
  });

  it("returns null before any choice is saved (banner shows on first visit)", () => {
    expect(getConsent()).toBeNull();
  });

  it("Accept All enables analytics and marketing, necessary always on", () => {
    saveConsent(acceptAll());
    expect(getConsent()).toEqual({ necessary: true, analytics: true, marketing: true });
  });

  it("Reject Non-Essential keeps only necessary cookies", () => {
    saveConsent(rejectNonEssential());
    expect(getConsent()).toEqual({ necessary: true, analytics: false, marketing: false });
  });

  it("notifies the tracking scheduler when a choice is saved", () => {
    let fired = 0;
    window.addEventListener("cookie-consent-change", () => fired++);
    saveConsent(acceptAll());
    expect(fired).toBe(1);
  });
});

describe("tracking scheduler consent gate", () => {
  it("queues trackers until consent and checks the cookieConsent key", () => {
    expect(nonCriticalScheduler).toContain("cookieConsent");
    expect(nonCriticalScheduler).toContain("cookie-consent-change");
    expect(nonCriticalScheduler).toContain("analytics || c.marketing");
  });

  it("index.html routes all tracking scripts through the consent-gated scheduler", () => {
    const viteConfig = readFileSync("vite.config.ts", "utf8");
    expect(viteConfig).toContain("window.scheduleNonCritical(function () {");
    const html = readFileSync("index.html", "utf8");
    expect(html).not.toContain('src="https://www.googletagmanager.com/gtag/js?id=G-1K40KS1TVB"');
  });
});
