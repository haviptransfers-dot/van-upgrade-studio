import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, Users, MapPin, Wallet, Check, ArrowLeft } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import tourSounio from "@/assets/tour-sounio.webp";

const SITE_URL = "https://haviptransfers.gr";
const WHATSAPP = "https://wa.me/306949393700";

const CapeSounionTour = () => {
  const { t, i18n } = useTranslation();
  const title = t("seo.sounion.title");
  const description = t("seo.sounion.description");
  const url = `${SITE_URL}/cape-sounion-tour`;

  const includesKeys = ["temple", "lake", "coastline", "varkiza", "voula"] as const;
  const includesIcons: Record<string, string> = {
    temple: "🏛️",
    lake: "🌊",
    coastline: "🌅",
    varkiza: "🐟",
    voula: "☕",
  };
  const whatIncluded = t("sounionTour.whatIncluded", { returnObjects: true }) as string[];
  const bookUrl = `${WHATSAPP}?text=${encodeURIComponent(t("sounionTour.bookMsg"))}`;

  const faqItems = [
    {
      q: "What is included in the Cape Sounion private tour?",
      a: "The tour includes a private Mercedes-Benz V-Class with a professional English-speaking driver, door-to-door pickup from your Athens hotel or Airbnb, a scenic coastal drive along the Athens Riviera, a stop at the Temple of Poseidon, and complimentary cold drinks on board. Entrance fees are not included.",
    },
    {
      q: "How long is the Cape Sounion tour?",
      a: "The full tour takes approximately 4–5 hours, including driving time and your visit at the Temple of Poseidon.",
    },
    {
      q: "How far is Cape Sounion from Athens?",
      a: "Cape Sounion is approximately 70 km from central Athens, about a 1-hour scenic drive along the Athenian Riviera.",
    },
    {
      q: "Can I book a sunset tour to Cape Sounion?",
      a: "Yes! Our sunset tour departs in the late afternoon so you arrive at the Temple of Poseidon just before sunset — one of the most spectacular views in all of Greece.",
    },
    {
      q: "How many passengers can travel together?",
      a: "Our Mercedes-Benz V-Class accommodates up to 7 passengers, making it ideal for families and small groups.",
    },
    {
      q: "How do I book the Cape Sounion tour?",
      a: "You can book via WhatsApp, email, or through our online booking form. We confirm all bookings within a few hours.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}${tourSounio}`} />
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        {/* Top bar */}
        <header className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto max-w-6xl px-4 py-4 md:py-6 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors text-xs md:text-sm tracking-[0.15em] uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("sounionTour.back")}
            </Link>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Hero */}
        <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
          <img
            src={tourSounio}
            alt={t("sounionTour.title")}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          <div className="relative z-10 h-full container mx-auto max-w-4xl px-4 flex flex-col items-center justify-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4"
            >
              {t("sounionTour.badge")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              {t("sounionTour.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base md:text-xl text-foreground/80 max-w-2xl"
            >
              {t("sounionTour.heroHeading")}
            </motion.p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("sounionTour.heroText")}
            </p>
          </div>
        </section>

        {/* Includes (highlights) */}
        <section className="py-12 md:py-20 px-4 bg-card">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14">
              {t("sounionTour.includesTitle")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {includesKeys.map((k, i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="border border-primary/20 bg-background/50 rounded-md p-5 md:p-6 hover:border-primary/60 transition-colors"
                >
                  <div className="text-3xl md:text-4xl mb-3">{includesIcons[k]}</div>
                  <h3 className="font-display text-lg md:text-xl font-semibold text-primary mb-1.5">
                    {t(`sounionTour.includes.${k}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {t(`sounionTour.includes.${k}.desc`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
              {t("sounionTour.whatIncludedTitle")}
            </h2>
            <ul className="space-y-3 md:space-y-4">
              {whatIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 p-3 md:p-4 border border-border rounded-md bg-card"
                >
                  <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-sm md:text-base text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Info card */}
        <section className="py-12 md:py-16 px-4 bg-card">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
              {t("sounionTour.infoTitle")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {[
                { icon: Clock, label: t("sounionTour.duration"), val: t("sounionTour.durationVal") },
                { icon: Users, label: t("sounionTour.type"), val: t("sounionTour.typeVal") },
                { icon: MapPin, label: t("sounionTour.departure"), val: t("sounionTour.departureVal") },
                { icon: Wallet, label: t("sounionTour.price"), val: t("sounionTour.priceVal") },
              ].map(({ icon: Icon, label, val }) => (
                <div
                  key={label}
                  className="border border-primary/30 rounded-md p-4 md:p-5 bg-background text-center"
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary mx-auto mb-2" />
                  <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {label}
                  </p>
                  <p className="font-display text-base md:text-xl text-foreground mt-1">{val}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80 tracking-[0.2em] uppercase text-xs md:text-sm font-bold px-8 py-6"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("sounionTour.cta")}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-border rounded-md bg-card px-4"
                >
                  <AccordionTrigger className="text-left font-display text-base md:text-lg text-foreground hover:text-primary hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 px-4 bg-card border-t border-primary/20">
          <div className="container mx-auto max-w-2xl text-center">
            <p className="text-primary uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3">
              {t("sounionTour.badge")}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
              {t("sounionTour.title")} · {t("sounionTour.priceVal")}
            </h2>
            <a href={bookUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80 tracking-[0.2em] uppercase text-xs md:text-sm font-bold px-8 py-6"
              >
                <MessageCircle className="w-5 h-5" />
                {t("sounionTour.cta")}
              </Button>
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default CapeSounionTour;
