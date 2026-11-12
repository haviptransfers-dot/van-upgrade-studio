import { useTranslation } from "react-i18next";
import OptimizedImage from "@/components/OptimizedImage";
import logoImg from "@/assets/logo.webp";

/** Shared site footer used by the homepage and the airport transfer page. */
export default function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <OptimizedImage src={logoImg} alt="H&A Tours" className="h-8 w-8 object-contain" width={32} height={32} sizes="32px" loading="lazy" />
          <span className="font-display text-sm font-bold text-primary">H&A TOURS</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <a
            href="https://www.google.com/preferences/source?q=haviptransfers.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {t("preferredSources.footerLink")}
          </a>
          <a
            href="https://instagram.com/antonhs_ieronymakhs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:opacity-80 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
              <defs>
                <radialGradient id="igFooterGrad" cx="30%" cy="107%" r="150%">
                  <stop offset="0%" stopColor="#fdf497"/>
                  <stop offset="5%" stopColor="#fdf497"/>
                  <stop offset="45%" stopColor="#fd5949"/>
                  <stop offset="60%" stopColor="#d6249f"/>
                  <stop offset="90%" stopColor="#285AEB"/>
                </radialGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#igFooterGrad)"/>
              <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61590718264708"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:opacity-80 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
        <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} H&A VIP Tours. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
