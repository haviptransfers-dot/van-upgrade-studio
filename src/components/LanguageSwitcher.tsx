import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const langs = [
  { code: "en", label: "EN", country: "gb" },
  { code: "de", label: "DE", country: "de" },
  { code: "es", label: "ES", country: "es" },
  { code: "fr", label: "FR", country: "fr" },
  { code: "it", label: "IT", country: "it" },
  { code: "el", label: "GR", country: "gr" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.split("-")[0] || "en";

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      {langs.map((l, i) => (
        <div key={l.code} className="flex items-center gap-1">
          <button
            onClick={() => i18n.changeLanguage(l.code)}
            className={cn(
              "transition-colors px-1 inline-flex items-center gap-1.5",
              current === l.code ? "text-primary" : "text-foreground/50 hover:text-foreground"
            )}
            aria-label={`Switch language to ${l.label}`}
          >
            <img
              src={`https://flagcdn.com/20x15/${l.country}.png`}
              srcSet={`https://flagcdn.com/40x30/${l.country}.png 2x`}
              width={20}
              height={15}
              alt=""
              className="inline-block rounded-sm"
            />
            <span>{l.label}</span>
          </button>
          {i < langs.length - 1 && <span className="text-foreground/20">|</span>}
        </div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
