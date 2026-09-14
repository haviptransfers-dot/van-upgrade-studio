import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Heart } from "lucide-react";
import logoImg from "@/assets/logo.webp";

const SITE_URL = "https://haviptransfers.gr";

const About = () => {
  const { t, i18n } = useTranslation();
  const url = `${SITE_URL}/about`;
  const title = t("preferredSources.aboutTitle");
  const description = t("preferredSources.supportText");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang={i18n.language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="H&A Tours" className="h-9 w-9 object-contain" width={36} height={36} />
            <span className="font-display text-base font-bold text-primary">H&A TOURS</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("blog.backHome")}
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-primary uppercase tracking-[0.2em] text-xs mb-3">{t("nav.about")}</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold">{title}</h1>
        </div>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <p>
            H&amp;A VIP Tours is a licensed, family-owned private transfer and tour company based in Athens, Greece.
            We specialize in luxury Mercedes V Class transportation for airport transfers, port pickups, hotel
            drop-offs, and private day tours across Greece’s most iconic destinations.
          </p>
          <p>
            With years of experience serving travelers from around the world, our mission is simple: to provide
            safe, comfortable, and stress-free journeys with a personal touch. Every ride includes a
            professional English-speaking driver, complimentary Wi-Fi, bottled water, and flight or ship
            monitoring whenever needed.
          </p>
          <p>
            Whether you are visiting Athens for business or leisure, we are here 24/7 to make your trip
            unforgettable.
          </p>
        </div>

        {/* Support local business + Google Preferred Sources */}
        <div className="mt-14 bg-card border border-primary/20 rounded-lg p-8 md:p-10 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{t("preferredSources.supportTitle")}</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t("preferredSources.supportText")}</p>
          <div className="flex flex-col items-center gap-4">
            <div
              google-add-preferred-source-btn
              data-theme="dark"
              data-lang={i18n.language === "en" ? "en" : i18n.language === "el" ? "el" : "en"}
              className="[&>button]:!mx-auto"
            />
            <a
              href="https://www.google.com/preferences/source?q=haviptransfers.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {t("preferredSources.button")}
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="H&A Tours" className="h-8 w-8 object-contain" loading="lazy" />
            <span className="font-display text-sm font-bold text-primary">H&A TOURS</span>
          </div>
          <a
            href="https://www.google.com/preferences/source?q=haviptransfers.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {t("preferredSources.footerLink")}
          </a>
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} H&A VIP Tours. {t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
