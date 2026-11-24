import LanguageSwitcher from "@/components/LanguageSwitcher";
import PageHead from "@/components/PageHead";
import OptimizedImage from "@/components/OptimizedImage";
import { Helmet } from "react-helmet-async";
import Link from "@/components/LocalizedLink";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Heart } from "lucide-react";
import { showTwitterDescription } from "@/lib/twitterDescription";
import logoImg from "@/assets/logo.webp";

const SITE_URL = "https://haviptransfers.gr";

const About = () => {
  const { t, i18n } = useTranslation();
  const url = `${SITE_URL}/about`;
  const title = t("preferredSources.aboutTitle");
  // Meta text may differ from the visible support paragraph; languages without one reuse it.
  const description = t("preferredSources.metaDescription", { defaultValue: t("preferredSources.supportText") });

  return (
    <div className="min-h-screen bg-background">
      <PageHead />
      <Helmet>
        <html lang={i18n.language} />
        <title>{title}</title>
        <meta name="description" content={description} />


        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {showTwitterDescription("/about", i18n.language) && <meta name="twitter:description" content={description} />}
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap gap-3 items-center justify-between py-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <OptimizedImage src={logoImg} alt="H&A Tours" loading="eager" sizes="36px" className="h-9 w-9 object-contain" width={36} height={36} />
            <span className="font-display text-base font-bold text-primary">H&A TOURS</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("blog.backHome")}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-primary uppercase tracking-[0.2em] text-xs mb-3">{t("nav.about")}</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold">{title}</h1>
        </div>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          {(t("seoContent.aboutParagraphs", { returnObjects: true }) as string[]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        {/* Support local business + Google Preferred Sources */}
        <div className="mt-14 bg-card border border-primary/20 rounded-lg p-8 md:p-10 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{t("preferredSources.supportTitle")}</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t("preferredSources.supportText")}</p>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <OptimizedImage src={logoImg} alt="H&A Tours" className="h-8 w-8 object-contain" loading="lazy" />
            <span className="font-display text-sm font-bold text-primary">H&A TOURS</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
          </div>
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} H&A VIP Tours. {t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
