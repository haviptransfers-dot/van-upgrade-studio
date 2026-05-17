import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, Clock, Users, Shield, Star, ChevronDown, MessageCircle, Plane, Ship, Camera, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import heroImg from "@/assets/hero-van.webp";
import heroImgMobile from "@/assets/hero-van-mobile.webp";
import interiorImg from "@/assets/fleet-vito.webp";
import logoImg from "@/assets/logo.webp";
import bgServices from "@/assets/showcase-1.webp";
import bgWhy from "@/assets/showcase-2.webp";
import bgCta from "@/assets/wall-3.webp";
import bgContact from "@/assets/showcase-3.webp";

const Gallery = lazy(() => import("@/components/Gallery"));
const Showcase = lazy(() => import("@/components/Showcase"));
const PhotoWall = lazy(() => import("@/components/PhotoWall"));
const PrivateTours = lazy(() => import("@/components/PrivateTours"));
const PriceCalculator = lazy(() => import("@/components/PriceCalculator"));
const Reviews = lazy(() => import("@/components/Reviews"));
const ChatBot = lazy(() => import("@/components/ChatBot"));
const FAQ = lazy(() => import("@/components/FAQ"));
const LazyFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Index = () => {
  const { t } = useTranslation();
  const whatsappUrl = "https://wa.me/306949393700";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="H&A Tours" className="h-10 w-10 object-contain" width={40} height={40} decoding="async" />
            <div>
              <span className="font-display text-lg font-bold text-primary">H&A TOURS</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("nav.tagline")}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.services")}</a>
            <a href="#fleet" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.fleet")}</a>
            <a href="#gallery" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.gallery")}</a>
            <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.about")}</a>
            <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">{t("nav.contact")}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Book now via WhatsApp">
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80" aria-label="Book now via WhatsApp">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t("nav.bookNow")}</span>
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source media="(max-width: 768px)" srcSet={heroImgMobile} type="image/webp" />
            <source srcSet={heroImg} type="image/webp" />
            <img
              src={heroImg}
              alt="Mercedes V Class in Athens"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium"
          >
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-[2.25rem] sm:text-5xl md:text-7xl font-bold mb-5 md:mb-6 leading-[1.1]"
          >
            {t("hero.title1")} <span className="text-primary">{t("hero.title2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-foreground/60 text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-base px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
                <MessageCircle className="w-5 h-5" />
                {t("hero.whatsapp")}
              </Button>
            </a>
            <a href="tel:+306949393700">
              <Button size="lg" variant="outline" className="text-base px-8 gap-2 border-primary/30 text-primary hover:bg-primary/10">
                <Phone className="w-5 h-5" />
                {t("hero.call")}
              </Button>
            </a>
          </motion.div>
        </div>
        <a href="#services" aria-label="Scroll to services" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary/60">
          <ChevronDown className="w-8 h-8" />
        </a>
      </section>

      {/* Services */}
      <section id="services" className="relative py-16 md:py-24 px-4 overflow-hidden bg-card">
        <div className="absolute inset-0 bg-cover bg-center md:bg-fixed opacity-10" style={{ backgroundImage: `url(${bgServices})` }} aria-hidden="true" />
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

      <Suspense fallback={<LazyFallback />}>
        <Showcase />
        <PhotoWall />
        <PrivateTours />
      </Suspense>

      {/* Fleet */}
      <section id="fleet" className="py-16 md:py-24 px-4 bg-card">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <img src={interiorImg} alt="Mercedes V Class" className="rounded-lg shadow-2xl" loading="lazy" decoding="async" width={800} height={600} />
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
            </motion.div>
          </div>
        </div>
      </section>

      <Suspense fallback={<LazyFallback />}>
        <Gallery />
        <PriceCalculator />
        <Reviews />
        <FAQ />
      </Suspense>

      {/* Why Choose Us */}
      <section id="about" className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center md:bg-fixed opacity-20" style={{ backgroundImage: `url(${bgWhy})` }} aria-hidden="true" />
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
        <div className="absolute inset-0 bg-cover bg-center md:bg-fixed opacity-25" style={{ backgroundImage: `url(${bgCta})` }} aria-hidden="true" />
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
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center md:bg-fixed opacity-20" style={{ backgroundImage: `url(${bgContact})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" aria-hidden="true" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3">{t("contact.eyebrow")}</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">{t("contact.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                label: t("contact.phone"),
                value: "+30 694 939 3700",
                href: "tel:+306949393700",
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
                value: "@antonis_ieronymakhs",
                href: "https://instagram.com/antonis_ieronymakhs",
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
            ].map((c) => (
              <a key={c.label} href={c.href} className="bg-card border border-border rounded-lg p-5 md:p-6 text-center hover:border-primary/40 transition-colors block overflow-hidden">
                <div className="flex justify-center mb-3">{c.icon}</div>
                <p className="text-sm text-muted-foreground mb-1">{c.label}</p>
                <p className="font-medium text-foreground text-sm break-all">{c.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="H&A Tours" className="h-8 w-8 object-contain" loading="lazy" />
            <span className="font-display text-sm font-bold text-primary">H&A TOURS</span>
          </div>
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} H&A VIP Tours. {t("footer.rights")}</p>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors hover:scale-110"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
};

export default Index;
