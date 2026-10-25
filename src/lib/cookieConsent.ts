// GDPR cookie consent stored in localStorage under "cookieConsent".
// Necessary cookies are always on (chat leads & quote form need them).
// Analytics/marketing stay blocked until the visitor accepts.

export const CONSENT_KEY = "cookieConsent";
export const CONSENT_EVENT = "cookie-consent-change";

export interface CookieConsent {
  necessary: true; // always on
  analytics: boolean;
  marketing: boolean;
}

export const getConsent = (): CookieConsent | null => {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return null;
  }
};

export const saveConsent = (consent: CookieConsent): void => {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // storage unavailable — consent simply won't persist
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
};

export const acceptAll = (): CookieConsent => ({ necessary: true, analytics: true, marketing: true });
export const rejectNonEssential = (): CookieConsent => ({ necessary: true, analytics: false, marketing: false });
