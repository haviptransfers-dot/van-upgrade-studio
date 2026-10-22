import { lazy, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Plane, Ship, Camera, Building, Shield, Users, Clock, Star, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import DeferredBackground from "@/components/DeferredBackground";
import DeferredSection from "@/components/DeferredSection";
import TrustBadge from "@/components/TrustBadge";
import interiorImg from "@/assets/fleet-vito.webp";
import logoImg from "@/assets/logo.webp";
import bgServices from "@/assets/showcase-1.webp";
import bgWhy from "@/assets/showcase-2.webp";
import bgCta from "@/assets/wall-3.webp";
import bgContact from "@/assets/showcase-3.webp";
const FleetArticleLinks = lazy(() => import("@/components/FleetArticleLinks"));
const Gallery = lazy(() => import("@/components/Gallery"));
const Showcase = lazy(() => import("@/components/Showcase"));
const PhotoWall = lazy(() => import("@/components/PhotoWall"));
const PrivateTours = lazy(() => import("@/components/PrivateTours"));
const PriceCalculator = lazy(() => import("@/components/PriceCalculator"));
const PaymentMethods = lazy(() => import("@/components/PaymentMethods"));
const ReviewsComponent = lazy(() => import("@/components/Reviews"));
const FAQ = lazy(() => import("@/components/FAQ"));

type ContactCard = {
  label: string;
  value: string;
  href?: string;
  links?: { label: string; href: string }[];
  icon: ReactNode;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export default function HomeSections() {
  const { t } = useTranslation();
  const whatsappUrl = "https://wa.me/306949393700";
  useEffect(() => {
    const anchor = location.hash.slice(1);
    if (anchor) document.getElementById(anchor)?.scrollIntoView();
  }, []);
  const services = [
    { icon: Plane, title: t("services.items.airport.title"), desc: t("services.items.airport.desc") },
    { icon: Ship, title: t("services.items.port.title"), desc: t("services.items.port.desc") },
    { icon: Camera, title: t("services.items.tours.title"), desc: t("services.items.tours.desc") },
    { icon: Building, title: t("services.items.hotel.title"), desc: t("services.items.hotel.desc") },
  ];

  const features = [
    { icon: Shield, title: t("why.items.licensed.title"), desc: t("why.items.licensed.desc") },
    { icon: Users, title: t("why.items.passengers.title"), desc: t("why.items.passengers.desc") },
    { icon: Clock, title: t("why.items.available.title"), desc: t("why.items.available.desc") },
    { icon: Star, title: t("why.items.rated.title"), desc: t("why.items.rated.desc") },
  ];

  const fleetFeatures = t("fleet.features", { returnObjects: true }) as string[];

  return <>
      {/* Services */}
      <section id="services" className="relative py-16 md:py-24 px-4 overflow-hidden bg-card/70 backdrop-blur-sm">
        <DeferredBackground src={bgServices} className="absolute inset-0 bg-cover bg-center md:bg-fixed opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40" aria-hidden="true" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12 md:mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3">{t("services.eyebrow")}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold">{t("services.title")}</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i} className="bg-card border border-border rounded-lg p-6 md:p-8 text-center hover:border-primary/40 transition-colors group">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <DeferredSection placeholderClass="h-[240vh] min-h-[1760px] md:h-[400vh]"><Showcase /></DeferredSection>
      <DeferredSection placeholderClass="h-[60vh] min-h-[440px] md:h-screen"><PhotoWall /></DeferredSection>
      <DeferredSection anchor="tours" placeholderClass="min-h-[900px]"><PrivateTours /></DeferredSection>

      {/* Fleet */}
      <section id="fleet" className="py-16 md:py-24 px-4 bg-card/70 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <OptimizedImage src={interiorImg} alt="Mercedes V Class" className="rounded-lg shadow-2xl" loading="lazy" decoding="async" width={800} height={600} />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3">{t("fleet.eyebrow")}</motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">{t("fleet.title")}</motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">{t("fleet.desc")}</motion.p>
              <motion.ul variants={fadeUp} custom={3} className="space-y-3 text-foreground/80">
                {fleetFeatures.map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>
              <DeferredSection placeholderClass="min-h-[80px]"><FleetArticleLinks /></DeferredSection>
            </motion.div>
          </div>
        </div>
      </section>

      <DeferredSection anchor="gallery" placeholderClass="min-h-[1100px]"><Gallery /></DeferredSection>
      <DeferredSection anchor="calculator"><PriceCalculator /></DeferredSection>
      <DeferredSection placeholderClass="min-h-[100px]"><PaymentMethods /></DeferredSection>
      <DeferredSection><ReviewsComponent /></DeferredSection>
      <DeferredSection><FAQ /></DeferredSection>

      {/* Why Choose Us */}
      <section id="about" className="relative py-16 md:py-24 px-4 overflow-hidden">
        <DeferredBackground src={bgWhy} className="absolute inset-0 bg-cover bg-center md:bg-fixed opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" aria-hidden="true" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12 md:mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3">{t("why.eyebrow")}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold">{t("why.title")}</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <f.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="font-display text-base md:text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 md:py-20 px-4 border-y border-primary/20 overflow-hidden">
        <DeferredBackground src={bgCta} className="absolute inset-0 bg-cover bg-center md:bg-fixed opacity-25" />
        <div className="absolute inset-0 bg-primary/10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70" aria-hidden="true" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">{t("cta.title")}</h2>
          <p className="text-muted-foreground mb-6 md:mb-8 text-base md:text-lg">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 md:px-10 gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
                <MessageCircle className="w-5 h-5" />
                {t("cta.whatsapp")}
              </Button>
            </a>
            <a href="mailto:h.a.viptransfers@gmail.com">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 md:px-10 gap-2 border-primary/30 text-primary hover:bg-primary/10">
                <Mail className="w-5 h-5" />
                {t("cta.email")}
              </Button>
            </a>
          </div>
          <div className="mt-5 flex justify-center">
            <TrustBadge />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-16 md:py-24 px-4 overflow-hidden">
        <DeferredBackground src={bgContact} className="absolute inset-0 bg-cover bg-center md:bg-fixed opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" aria-hidden="true" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3">{t("contact.eyebrow")}</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">{t("contact.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {([
              {
                label: t("contact.phone"),
                value: "+30 694 939 3700",
                href: "tel:+306949393700",
                links: [
                  { label: "Viber", href: "viber://chat?number=%2B306949393700" },
                ],
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true">
                    <path fill="#22c55e" d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1C8.7 6.4 8.5 5.2 8.5 4c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/>
                  </svg>
                ),
              },
              {
                label: "Landline",
                value: "+30 210 992 5244",
                href: "tel:+302109925244",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true">
                    <path fill="hsl(var(--primary))" d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1C8.7 6.4 8.5 5.2 8.5 4c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/>
                  </svg>
                ),
              },
              {
                label: t("contact.email"),
                value: "h.a.viptransfers@gmail.com",
                href: "mailto:h.a.viptransfers@gmail.com",
                icon: (
                  <svg viewBox="0 0 48 48" className="w-10 h-10" aria-hidden="true">
                    <path fill="#4285f4" d="M44 11.5L24 26 4 11.5V36a2 2 0 002 2h6V22l12 9 12-9v16h6a2 2 0 002-2V11.5z"/>
                    <path fill="#34a853" d="M12 38V22l12 9 12-9v16h-6V28l-6 4.5L18 28v10z"/>
                    <path fill="#fbbc04" d="M36 38h6a2 2 0 002-2V11.5L36 17.5z"/>
                    <path fill="#ea4335" d="M4 11.5L12 17.5V38H6a2 2 0 01-2-2z"/>
                    <path fill="#c5221f" d="M44 11.5a2 2 0 00-2-2h-4L24 20 10 9.5H6a2 2 0 00-2 2L24 26z"/>
                  </svg>
                ),
              },
              {
                label: t("contact.license"),
                value: t("contact.licenseValue"),
                icon: <Shield className="w-10 h-10 text-primary" aria-hidden="true" />,
              },
              {
                label: t("contact.based"),
                value: t("contact.location"),
                href: "#",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true">
                    <path fill="#ef4444" d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
                  </svg>
                ),
              },
              {
                label: "Instagram",
                value: "@antonhs_ieronymakhs",
                href: "https://instagram.com/antonhs_ieronymakhs",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true">
                    <defs>
                      <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
                        <stop offset="0%" stopColor="#fdf497"/>
                        <stop offset="5%" stopColor="#fdf497"/>
                        <stop offset="45%" stopColor="#fd5949"/>
                        <stop offset="60%" stopColor="#d6249f"/>
                        <stop offset="90%" stopColor="#285AEB"/>
                      </radialGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#igGrad)"/>
                    <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8"/>
                    <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
                  </svg>
                ),
              },
              {
                label: "YouTube",
                value: "@hatoursltdtransfers",
                href: "https://youtube.com/@hatoursltdtransfers?si=pu05tl68ZLWd9v2K",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true">
                    <path fill="#FF0000" d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.09 0 12 0 12s0 3.91.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.91 24 12 24 12s0-3.91-.5-5.81z"/>
                    <path fill="#fff" d="M9.55 15.5V8.5l6.27 3.5-6.27 3.5z"/>
                  </svg>
                ),
              },
              {
                label: "Facebook",
                value: "H&A Tours Ltd",
                href: "https://www.facebook.com/profile.php?id=61590718264708",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ),
              },
            ] as ContactCard[]).map((c) =>
              c.links ? (
                <div key={c.label} className="bg-card border border-border rounded-lg p-5 md:p-6 text-center hover:border-primary/40 transition-colors overflow-hidden">
                  <div className="flex justify-center mb-3">{c.icon}</div>
                  <p className="text-sm text-muted-foreground mb-1">{c.label}</p>
                  <a href={c.href} className="block font-medium text-foreground text-sm break-all hover:text-primary transition-colors">{c.value}</a>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {c.links.map((l) => (
                      <a key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors">{l.label}</a>
                    ))}
                  </div>
                </div>
              ) : c.href ? (
                <a key={c.label} href={c.href} className="bg-card border border-border rounded-lg p-5 md:p-6 text-center hover:border-primary/40 transition-colors block overflow-hidden">
                  <div className="flex justify-center mb-3">{c.icon}</div>
                  <p className="text-sm text-muted-foreground mb-1">{c.label}</p>
                  <p className="font-medium text-foreground text-sm break-all">{c.value}</p>
                </a>
              ) : (
                <div key={c.label} className="bg-card border border-border rounded-lg p-5 md:p-6 text-center hover:border-primary/40 transition-colors block overflow-hidden">
                  <div className="flex justify-center mb-3">{c.icon}</div>
                  <p className="text-sm text-muted-foreground mb-1">{c.label}</p>
                  <p className="font-medium text-foreground text-sm break-all">{c.value}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
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

  </>;
}
