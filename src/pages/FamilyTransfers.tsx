import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Baby, BriefcaseBusiness, Car, Clock3, MapPin, MessageCircle, Phone, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getFamilyTravelCopy } from "@/data/familyTravelTranslations";
import seat360 from "@/assets/child-seat-besafe-360.jpg.asset.json";
import seatIdrive from "@/assets/child-seat-idrive.jpg.asset.json";
import seatBooster from "@/assets/child-seat-booster-monza.jpg.asset.json";
import seatHero from "@/assets/child-seat-besafe-isize.jpg.asset.json";
import seatBesafePair from "@/assets/child-seats-besafe-pair.jpg.asset.json";

const SITE_URL = "https://haviptransfers.gr";
const ASSET_HOST = "https://van-move-boost.lovable.app";
const PAGE_PATH = "/family-transfers-athens-child-seats";
const PHONE = "+306949393700";
const PAGE_TITLE = "Athens Transfers with Child Car Seats | Family Travel";
const PAGE_DESCRIPTION = "Private Athens airport & port transfers with certified child car seats for all ages. Mercedes V-Class, professional drivers, stroller space. Book your family transfer.";

const FamilyTransfers = () => {
  const { i18n, t } = useTranslation();
  const copy = getFamilyTravelCopy(i18n.language);
  const whatsappUrl = `https://wa.me/306949393700?text=${encodeURIComponent(copy.whatsappMessage)}`;
  const seatImages = [seat360, seatIdrive, seatBooster];
  const benefitIcons = [ShieldCheck, UserRoundCheck, Car, BriefcaseBusiness, Clock3];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Private airport transfer with child car seats",
    areaServed: "Athens, Greece",
    provider: { "@type": "Organization", name: "H&A Tours" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={i18n.language} />
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}${PAGE_PATH}`} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}${PAGE_PATH}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <header className="absolute inset-x-0 top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xs uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-primary">← {copy.back}</Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main>
        <section className="relative flex min-h-[720px] items-center overflow-hidden pt-24">
          <img src={`${ASSET_HOST}${seatHero.url}`} alt="BeSafe i-Size child seat installed in a Mercedes V-Class" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4 py-20">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-primary md:text-sm">{copy.eyebrow}</p>
              <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">{copy.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-xl">{copy.intro}</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-9 inline-block">
                <Button size="lg" className="h-auto gap-2 px-8 py-4 text-base"><MessageCircle className="h-5 w-5" />{copy.request}</Button>
              </a>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary md:text-sm">{copy.seatsEyebrow}</p>
              <h2 className="font-display text-3xl font-bold md:text-5xl">{copy.seatsTitle}</h2>
              <p className="mt-5 text-muted-foreground">{copy.seatsIntro}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {copy.groups.map((group, index) => (
                <article key={group.name} className="overflow-hidden rounded-lg border border-border bg-card">
                  <div className="aspect-[4/3] overflow-hidden"><img src={`${ASSET_HOST}${seatImages[index].url}`} alt={`${group.name} child car seat`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /></div>
                  <div className="p-6"><p className="text-xs uppercase tracking-[0.2em] text-primary">{group.range}</p><h3 className="mt-2 font-display text-2xl font-semibold">{group.name}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{group.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/60 px-4 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="container mx-auto max-w-5xl"
          >
            <img
              src={`${ASSET_HOST}${seatBesafePair.url}`}
              alt="Two BeSafe child seats installed side by side in the back of a Mercedes V Class with orange leather interior"
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-xl border border-primary/25 shadow-2xl"
            />
            <div className="mt-8 max-w-3xl mx-auto text-center">
              <p className="text-primary font-display text-lg md:text-xl font-semibold mb-3 tracking-wide">
                {t("childSeats.besafeTitle")}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {t("childSeats.besafeText")}
              </p>
            </div>
          </motion.div>
        </section>

        <section className="border-y border-border bg-card/80 px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-5xl">{copy.whyTitle}</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {copy.benefits.map((benefit, index) => { const Icon = benefitIcons[index]; return <div key={benefit.title} className="text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10"><Icon className="h-6 w-6 text-primary" /></div><h3 className="font-display text-lg font-semibold">{benefit.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p></div>; })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div><p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">Athens & Attica</p><h2 className="font-display text-3xl font-bold md:text-5xl">{copy.destinationsTitle}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{copy.destinationsText}</p></div>
            <ul className="grid gap-3 sm:grid-cols-2">{copy.destinations.map((destination) => <li key={destination} className="flex items-center gap-3 border-b border-border py-4 text-sm md:text-base"><MapPin className="h-5 w-5 shrink-0 text-primary" />{destination}</li>)}</ul>
          </div>
        </section>

        <section className="bg-card px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-5xl"><h2 className="mb-12 text-center font-display text-3xl font-bold md:text-5xl">{copy.stepsTitle}</h2><div className="grid gap-8 md:grid-cols-3">{copy.steps.map((step, index) => <div key={step.title} className="border-t border-primary/50 pt-6"><span className="font-display text-4xl text-primary">0{index + 1}</span><h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p></div>)}</div></div>
        </section>

        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-3xl"><h2 className="mb-10 text-center font-display text-3xl font-bold md:text-5xl">{copy.faqTitle}</h2><Accordion type="single" collapsible>{copy.faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger className="text-left font-display text-base hover:no-underline hover:text-primary md:text-lg">{faq.question}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div>
        </section>

        <section className="border-y border-primary/20 bg-primary/10 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-3xl text-center"><Baby className="mx-auto mb-5 h-9 w-9 text-primary" /><h2 className="font-display text-3xl font-bold md:text-5xl">{copy.finalTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{copy.finalText}</p><div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><Button size="lg" className="w-full gap-2 sm:w-auto"><MessageCircle className="h-5 w-5" />{copy.request}</Button></a><a href={`tel:${PHONE}`}><Button size="lg" variant="outline" className="w-full gap-2 border-primary/40 text-primary hover:bg-primary/10 sm:w-auto"><Phone className="h-5 w-5" />{copy.call}</Button></a></div></div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} H&amp;A Tours · Athens, Greece</footer>
    </div>
  );
};

export default FamilyTransfers;