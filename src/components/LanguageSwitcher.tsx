import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const langs = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
  { code: "el", label: "GR" },
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
              "transition-colors px-1",
              current === l.code ? "text-primary" : "text-foreground/50 hover:text-foreground"
            )}
            aria-label={`Switch language to ${l.label}`}
          >
            {l.label}
          </button>
          {i < langs.length - 1 && <span className="text-foreground/20">|</span>}
        </div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
