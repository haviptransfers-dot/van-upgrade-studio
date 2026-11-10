import flags from "@/assets/flagManifest.json";
import { hostedImageUrl } from "@/lib/heroDelivery";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { localizedPath } from "@/lib/languagePaths";

const langs = [
  { code: "el", label: "GR", country: "gr" },
  { code: "en", label: "EN", country: "gb" },
  { code: "de", label: "DE", country: "de" },
  { code: "es", label: "ES", country: "es" },
  { code: "fr", label: "FR", country: "fr" },
  { code: "it", label: "IT", country: "it" },
  { code: "he", label: "HE", country: "il" },
  { code: "ar", label: "AR", country: "ae" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const current = i18n.language?.split("-")[0] || "en";

  return (
    <div className="flex items-center gap-0.5 md:gap-1 text-xs font-medium">
      {langs.map((l, i) => (
        <div key={l.country} className="flex items-center gap-0.5 md:gap-1">
          <a
            href={localizedPath(`${location.pathname}${location.search}${location.hash}`, l.code)}
            hrefLang={l.code}
            className={cn(
              "transition-colors px-0.5 md:px-1 inline-flex items-center gap-1 md:gap-1.5",
              current === l.code ? "text-primary" : "text-foreground/50 hover:text-foreground"
            )}
            aria-label={`Switch language to ${l.label}`}
          >
            <img
              src={hostedImageUrl(flags[`${l.country}.png` as keyof typeof flags].variants[0].url)}
              sizes="20px"
              width={20}
              height={15}
              alt={l.label}
              loading="lazy"
              decoding="async"
              className="inline-block rounded-sm w-3.5 h-2.5 md:w-5 md:h-[15px]"
            />
            <span className="hidden md:inline">{l.label}</span>
          </a>
          {i < langs.length - 1 && <span className="hidden md:inline text-foreground/20">|</span>}
        </div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
