import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const langs = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "de", label: "DE", flag: "🇩🇪" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "el", label: "GR", flag: "🇬🇷" },
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
              "transition-colors px-1 inline-flex items-center gap-1",
              current === l.code ? "text-primary" : "text-foreground/50 hover:text-foreground"
            )}
            aria-label={`Switch language to ${l.label}`}
          >
            <span aria-hidden>{l.flag}</span>
            <span>{l.label}</span>
          </button>
          {i < langs.length - 1 && <span className="text-foreground/20">|</span>}
        </div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
