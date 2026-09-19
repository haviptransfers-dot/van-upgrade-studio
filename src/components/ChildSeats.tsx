import { motion } from "framer-motion";
import { Baby, Car, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

import seatIsIsize from "@/assets/child-seat-besafe-isize.jpg.asset.json";
import seatBesafe360 from "@/assets/child-seat-besafe-360.jpg.asset.json";
import seatIdrive from "@/assets/child-seat-idrive.jpg.asset.json";
import seatBooster from "@/assets/child-seat-booster-monza.jpg.asset.json";
import seatBesafePair from "@/assets/child-seats-besafe-pair.jpg.asset.json";

const ASSET_HOST = "https://van-move-boost.lovable.app";

const WHATSAPP_URL = "https://wa.me/306949393700";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const ChildSeats = () => {
  const { t } = useTranslation();

  const features = [
    { icon: ShieldCheck, label: t("childSeats.features.certified") },
    { icon: Baby, label: t("childSeats.features.ages") },
    { icon: Sparkles, label: t("childSeats.features.clean") },
    { icon: Car, label: t("childSeats.features.vans") },
  ];

  const categories = [
    { name: t("childSeats.group0.name"), range: t("childSeats.group0.range"), img: `${ASSET_HOST}${seatBesafe360.url}` },
    { name: t("childSeats.group1.name"), range: t("childSeats.group1.range"), img: `${ASSET_HOST}${seatIdrive.url}` },
    { name: t("childSeats.booster.name"), range: t("childSeats.booster.range"), img: `${ASSET_HOST}${seatBooster.url}` },
  ];

  const whatsappUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(t("childSeats.whatsappMsg"))}`;

  return (
    <section id="child-seats" className="relative py-16 md:py-24 px-4 overflow-hidden bg-card/70 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12 md:mb-16">
          {/* Text column */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3">
              {t("childSeats.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold mb-3">
              {t("childSeats.title1")} <span className="text-primary">{t("childSeats.title2")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="font-display text-lg md:text-xl text-foreground/90 mb-4">
              {t("childSeats.subtitle")}
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
              {t("childSeats.desc")}
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="grid grid-cols-2 gap-5 sm:gap-6 max-w-md">
              {features.map((f) => (
                <div key={f.label} className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs md:text-sm text-foreground/80 leading-snug">{f.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-3 grid-rows-2 gap-3 h-72 sm:h-96"
          >
            <img
              src={`${ASSET_HOST}${seatIsIsize.url}`}
              alt="Certified BeSafe i-Size child seat installed in a Mercedes V Class"
              loading="lazy"
              decoding="async"
              className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg border border-primary/20 shadow-2xl"
            />
            <img
              src={`${ASSET_HOST}${seatIdrive.url}`}
              alt="i-Size child seat with harness in the back seat of a Mercedes"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-lg border border-primary/20 shadow-xl"
            />
            <img
              src={`${ASSET_HOST}${seatBesafe360.url}`}
              alt="BeSafe 360 swivel child seat installed in a Mercedes V Class"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-lg border border-primary/20 shadow-xl"
            />
          </motion.div>
        </div>

        {/* Wide BeSafe pair photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <img
            src={`${ASSET_HOST}${seatBesafePair.url}`}
            alt="Two BeSafe child seats installed side by side in the back of a Mercedes V Class with orange leather interior"
            loading="lazy"
            decoding="async"
            className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-xl border border-primary/25 shadow-2xl"
          />
          <div className="mt-5 max-w-3xl mx-auto text-center">
            <p className="text-primary font-display text-base md:text-lg font-semibold mb-2 tracking-wide">
              {t("childSeats.besafeTitle")}
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {t("childSeats.besafeText")}
            </p>
          </div>
        </motion.div>


        {/* Categories card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-background border border-primary/30 rounded-xl p-6 md:p-8 mb-10 md:mb-12 shadow-[0_8px_40px_-16px_hsl(43_80%_50%_/_0.35)]"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
            <div className="max-w-xs">
              <p className="text-lg md:text-xl font-display text-foreground leading-snug">
                {t("childSeats.offerTitle")}
              </p>
              <div className="w-16 h-0.5 bg-primary mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 md:divide-x md:divide-border">
              {categories.map((c) => (
                <div key={c.name} className="flex flex-col items-center text-center md:px-6">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-primary/25 mb-4">
                    <img src={c.img} alt={`${c.name} child seat`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-display text-base md:text-lg font-semibold">{c.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{c.range}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-8 md:px-10 text-sm md:text-base h-auto py-4 shadow-[0_8px_30px_-8px_hsl(43_80%_50%_/_0.6)]"
            >
              <MessageCircle className="w-5 h-5" />
              {t("childSeats.request")}
            </Button>
          </a>
          <p className="flex items-center gap-2 text-sm text-foreground/80">
            <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            {t("childSeats.safety")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChildSeats;
