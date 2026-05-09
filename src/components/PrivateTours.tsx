import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import tourDelphi from "@/assets/tour-delphi.webp";
import tourMeteora from "@/assets/tour-meteora.webp";
import tourNafplio from "@/assets/tour-nafplio.webp";
import tourSounio from "@/assets/tour-sounio.webp";
import tourAcropolis from "@/assets/tour-acropolis.webp";
import tourSyntagma from "@/assets/tour-syntagma.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const PrivateTours = () => {
  const { t } = useTranslation();
  const whatsappUrl = "https://wa.me/306949393700";
  const [activeTour, setActiveTour] = useState<{ key: string; src: string } | null>(null);

  const tours = [
    { src: tourDelphi, key: "delphi" },
    { src: tourMeteora, key: "meteora" },
    { src: tourNafplio, key: "nafplio" },
    { src: tourSounio, key: "sounio" },
    { src: tourAcropolis, key: "acropolis" },
    { src: tourSyntagma, key: "syntagma" },
  ];

  const activeName = activeTour ? t(`tours.items.${activeTour.key}.name`) : "";
  const activeDesc = activeTour ? t(`tours.items.${activeTour.key}.desc`) : "";
  const activeLong = activeTour
    ? t(`tours.items.${activeTour.key}.long`, { defaultValue: t(`tours.items.${activeTour.key}.desc`) })
    : "";
  const waMsg = activeTour
    ? `Hi! I'd like to book the private tour to ${activeName}.`
    : "";

  return (
    <section id="tours" className="py-24 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-sm mb-3">
            {t("tours.eyebrow")}
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold">
            {t("tours.title")}
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t("tours.subtitle")}
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {tours.map((tour, i) => {
            const name = t(`tours.items.${tour.key}.name`);
            const desc = t(`tours.items.${tour.key}.desc`);
            return (
              <motion.button
                type="button"
                onClick={() => setActiveTour(tour)}
                key={tour.key}
                variants={fadeUp}
                custom={i}
                className="relative overflow-hidden rounded-lg group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`View details for ${name}`}
              >
                <img
                  src={tour.src}
                  alt={`Private tour to ${name}`}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-52 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
                  <p className="text-foreground/60 text-xs mt-1">{desc}</p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
                <MessageCircle className="w-5 h-5" />
                {t("tours.cta")}
              </Button>
          </a>
        </motion.div>
      </div>

      <Dialog open={!!activeTour} onOpenChange={(open) => !open && setActiveTour(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden border-primary/20 bg-card">
          {activeTour && (
            <>
              <div className="relative h-56 w-full">
                <img
                  src={activeTour.src}
                  alt={`Private tour to ${activeName}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              </div>
              <div className="p-6 -mt-2">
                <DialogHeader>
                  <p className="text-primary uppercase tracking-[0.2em] text-xs mb-1">
                    {t("tours.eyebrow")}
                  </p>
                  <DialogTitle className="font-display text-3xl text-foreground">
                    {activeName}
                  </DialogTitle>
                  <DialogDescription className="text-primary/80 text-sm">
                    {activeDesc}
                  </DialogDescription>
                </DialogHeader>
                <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                  {activeLong}
                </p>
                <a
                  href={`${whatsappUrl}?text=${encodeURIComponent(waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6"
                >
                  <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
                    <MessageCircle className="w-5 h-5" />
                    {t("tours.cta")}
                  </Button>
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PrivateTours;
