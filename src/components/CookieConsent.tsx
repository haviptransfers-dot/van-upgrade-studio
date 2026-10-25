import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cookie, X } from "lucide-react";
import {
  acceptAll,
  getConsent,
  rejectNonEssential,
  saveConsent,
  type CookieConsent as Consent,
} from "@/lib/cookieConsent";

// Small floating GDPR consent card — bottom-right, teal/sky accents.
// Lazy-mounted by App.tsx after first paint so it never affects PageSpeed.
const CookieConsentBanner = () => {
  const { t } = useTranslation();
  const [consent, setConsent] = useState<Consent | null>(() => getConsent());
  const [managing, setManaging] = useState(false);
  const [draft, setDraft] = useState<Consent>({ necessary: true, analytics: false, marketing: false });

  if (consent) return null;

  const choose = (next: Consent) => {
    saveConsent(next);
    setConsent(next);
  };

  const toggle = (key: "analytics" | "marketing") =>
    setDraft((d) => ({ ...d, [key]: !d[key] }));

  return (
    <div
      role="dialog"
      aria-label={t("cookie.title")}
      className="fixed bottom-4 right-4 z-[60] w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-[#0f766e]/40 bg-card/95 backdrop-blur-md shadow-2xl p-4 text-sm"
    >
      <div className="flex items-start gap-2.5">
        <Cookie className="w-5 h-5 mt-0.5 shrink-0 text-[#0ea5e9]" aria-hidden="true" />
        <div className="flex-1">
          <p className="font-display font-bold text-foreground">{t("cookie.title")}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {t("cookie.text")}{" "}
            <Link to="/privacy-policy" className="underline underline-offset-2 text-[#0ea5e9] hover:text-[#0f766e]">
              {t("cookie.privacyLink")}
            </Link>
          </p>
        </div>
        {managing && (
          <button
            onClick={() => setManaging(false)}
            aria-label={t("cookie.close")}
            className="text-muted-foreground hover:text-foreground p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {managing ? (
        <div className="mt-3 space-y-2">
          {/* Necessary — always on */}
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <div>
              <p className="text-xs font-semibold text-foreground">{t("cookie.necessary")}</p>
              <p className="text-[10px] text-muted-foreground">{t("cookie.necessaryDesc")}</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#0f766e] font-semibold">
              {t("cookie.alwaysOn")}
            </span>
          </div>
          {(["analytics", "marketing"] as const).map((key) => (
            <div key={key} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
              <div>
                <p className="text-xs font-semibold text-foreground">{t(`cookie.${key}`)}</p>
                <p className="text-[10px] text-muted-foreground">{t(`cookie.${key}Desc`)}</p>
              </div>
              <button
                role="switch"
                aria-checked={draft[key]}
                aria-label={t(`cookie.${key}`)}
                onClick={() => toggle(key)}
                className={`relative w-10 h-5 rounded-full transition-colors ${draft[key] ? "bg-[#0f766e]" : "bg-muted"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    draft[key] ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          ))}
          <button
            onClick={() => choose(draft)}
            className="w-full mt-1 rounded-lg bg-[#0f766e] py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0f766e]/85 transition-colors"
          >
            {t("cookie.save")}
          </button>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-1.5">
          <button
            onClick={() => choose(acceptAll())}
            className="w-full rounded-lg bg-[#0f766e] py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0f766e]/85 transition-colors"
          >
            {t("cookie.acceptAll")}
          </button>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => choose(rejectNonEssential())}
              className="rounded-lg border border-[#0ea5e9]/50 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-colors"
            >
              {t("cookie.rejectNonEssential")}
            </button>
            <button
              onClick={() => setManaging(true)}
              className="rounded-lg border border-border py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:border-[#0f766e] hover:text-[#0f766e] transition-colors"
            >
              {t("cookie.manage")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieConsentBanner;
