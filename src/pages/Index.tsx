import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Phone, ChevronDown, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import TrustBadge from "@/components/TrustBadge";
import OptimizedImage from "@/components/OptimizedImage";
import DeferredSection from "@/components/DeferredSection";
import ClickToChat from "@/components/ClickToChat";
import { useAfterFirstPaint } from "@/hooks/use-after-first-paint";
import logoImg from "@/assets/logo.webp";
import tourAcropolis from "@/assets/tour-acropolis.webp";
import tourSounio from "@/assets/tour-sounio.webp";
import tourMeteora from "@/assets/tour-meteora.webp";
import tourDelphi from "@/assets/tour-delphi.webp";
import tourNafplio from "@/assets/tour-nafplio.webp";
import heroSunsetCar from "@/assets/hero-sunset-car.webp";
import fleetTrio from "@/assets/fleet-trio.webp";
import vanAcropolisChauffeur from "@/assets/van-acropolis-chauffeur.jpg.asset.json";

const AnimatedBackground = lazy(() => import("@/components/AnimatedBackground"));
const HomeSections = lazy(() => import("@/components/HomeSections"));
const HeroSlideshow = lazy(() => import("@/components/HeroSlideshow"));
const ExploreToursMenu = lazy(() => import("@/components/ExploreToursMenu"));

const heroCycleImages = [
  heroSunsetCar,
  `https://van-move-boost.lovable.app${vanAcropolisChauffeur.url}`,
  tourAcropolis,
  tourSounio,
  fleetTrio,
  tourMeteora,
  tourDelphi,
  tourNafplio,
];

const SLIDE_DURATION = 10; // seconds each slide is the main image

interface IndexProps {
  routeKey?: string;
}

const Index = ({ routeKey }: IndexProps) => {
  const { t } = useTranslation();
  const whatsappUrl = "https://wa.me/306949393700";
  const [toursMenuReady, setToursMenuReady] = useState(false);
  const [heroPainted, setHeroPainted] = useState(false);
  useLayoutEffect(() => {
    if (!heroPainted) return;
    document.getElementById("first-screen")?.remove();
    document.body.classList.remove("first-paint");
  }, [heroPainted]);

  const [heroCycleIndex, setHeroCycleIndex] = useState(0);
  const whatsappReady = useAfterFirstPaint(heroPainted);
  const [backgroundReady, setBackgroundReady] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight / 2) setBackgroundReady(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setHeroCycleIndex((i) => (i + 1) % heroCycleImages.length);
    }, SLIDE_DURATION * 1000);
    return () => clearInterval(id);
  }, []);

  const tourLinks = [
    { path: "/athens-city-tour", labelKey: "athensTour.title" },
    { path: "/cape-sounion-tour", labelKey: "sounionTour.title" },
    { path: "/delphi-private-tour", labelKey: "delphiTour.title" },
    { path: "/meteora-private-tour", labelKey: "meteoraTour.title" },
    { path: "/nafplio-private-tour", labelKey: "nafplioTour.title" },
  ];

  return (
    <div className="homepage-visual min-h-screen bg-transparent relative">
      {!routeKey && (
        <Helmet>
          <link rel="canonical" href="https://haviptransfers.gr/" />
          <link rel="alternate" hrefLang="en" href="https://haviptransfers.gr/" />
          <link rel="alternate" hrefLang="x-default" href="https://haviptransfers.gr/" />
        </Helmet>
      )}
      {backgroundReady && <Suspense fallback={null}><AnimatedBackground /></Suspense>}
      {/* Navigation */}
      <nav className="home-navigation fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-2 md:py-3 px-4">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <OptimizedImage src={logoImg} alt="H&A Tours" className="h-9 w-9 md:h-10 md:w-10 object-contain flex-shrink-0" width={40} height={40} sizes="40px" loading="eager" decoding="async" />
            <div className="min-w-0">
              <span className="font-display text-base md:text-lg font-bold text-primary whitespace-nowrap">H&A TOURS</span>
              <p className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("nav.tagline")}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.services")}</a>
            <a href="#fleet" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.fleet")}</a>
            <a href="#gallery" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.gallery")}</a>
            <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.about")}</a>
            <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.contact")}</a>
            <Link to="/blog" className="relative text-foreground/70 hover:text-primary transition-colors">
              {t("blog.nav")}
              <span className="absolute -top-1.5 -right-2.5 flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-notification opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-notification"></span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Book now via WhatsApp">
              <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80 md:h-10 md:px-4" aria-label="Book now via WhatsApp">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t("nav.bookNow")}</span>
              </Button>
            </a>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="border-primary/30 text-primary md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
          {mobileMenuOpen && (
            <div id="mobile-navigation" className="order-last mt-3 w-full border-t border-border pt-3 md:hidden">
              <div className="flex flex-col items-center gap-3 text-sm">
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary">{t("nav.services")}</a>
                <a href="#fleet" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary">{t("nav.fleet")}</a>
                <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary">{t("nav.gallery")}</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary">{t("nav.about")}</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary">{t("nav.contact")}</a>
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary">{t("blog.nav")}</Link>
                <LanguageSwitcher />
              </div>
            </div>
          )}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="home-hero relative flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-background">
          {/* Static base layer — first image always painted to avoid black gap */}
          <OptimizedImage
            src={heroCycleImages[0]}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            maxWidth={800}
            decoding="async"
            onLoad={() => requestAnimationFrame(() => requestAnimationFrame(() => setHeroPainted(true)))}
            className="home-hero-photo absolute inset-0 w-full h-full object-cover hero-base-zoom"
          />
          {heroCycleIndex > 0 && <Suspense fallback={null}>
            <HeroSlideshow index={heroCycleIndex} src={heroCycleImages[heroCycleIndex]} />
          </Suspense>}
          <div className="home-hero-shade absolute inset-0" />
        </div>
        <div className="home-hero-content relative z-10">
          <p
            className="home-hero-eyebrow text-foreground text-sm font-medium"
          >
            {t("hero.eyebrow")}
          </p>
          <h1
            className="home-hero-title font-display font-medium"
          >
            H&A Tours
          </h1>
          <p
            className="home-hero-description text-foreground"
          >
            {t("hero.subtitle")}
          </p>
          <div
            className="home-hero-actions flex flex-wrap"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="home-hero-primary text-base px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
                <MessageCircle className="w-5 h-5" />
                {t("hero.whatsapp")}
              </Button>
            </a>
            <a href="tel:+306949393700">
              <Button size="lg" variant="ghost" className="home-hero-secondary text-base gap-2 text-foreground hover:bg-foreground/10">
                <Phone className="w-5 h-5" />
                {t("hero.call")}
              </Button>
            </a>
            {toursMenuReady ? <Suspense fallback={<Button size="lg" variant="outline" disabled className="home-hero-secondary text-base gap-2 text-foreground"><ChevronDown className="w-5 h-5" />{t("hero.exploreTours")}</Button>}>
              <ExploreToursMenu label={t("hero.exploreTours")} tours={tourLinks.map((tour) => ({ path: tour.path, label: t(tour.labelKey) }))} />
            </Suspense> : <Button size="lg" variant="ghost" onClick={() => setToursMenuReady(true)} className="home-hero-secondary text-base gap-2 text-foreground hover:bg-foreground/10"><ChevronDown className="w-5 h-5" />{t("hero.exploreTours")}</Button>}
          </div>
          <div
            className="home-hero-trust flex"
          >
            <TrustBadge />
          </div>
        </div>
        <a href="#services" aria-label="Scroll to services" className="home-hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/70">
          <ChevronDown className="w-8 h-8" />
        </a>
      </section>

      <DeferredSection anchor="services" anchors={["fleet", "gallery", "about", "contact", "calculator", "tours"]} rootMargin="0px" placeholderClass="min-h-[900px]">
        <HomeSections />
      </DeferredSection>

      {whatsappReady && <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center shadow-lg hover:bg-whatsapp-hover transition-colors hover:scale-110"
      >
        <MessageCircle className="w-7 h-7 text-whatsapp-foreground" />
      </a>}

      <ClickToChat />
    </div>
  );
};

export default Index;
