import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import wall3 from "@/assets/wall-3.webp";

const PhotoWall = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-[70vh] md:h-screen w-full overflow-hidden bg-background">
      <img
        src={wall3}
        alt="Mercedes V Class cruising on the highway"
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
      <div className="relative z-10 h-full flex items-end md:items-center justify-center md:justify-start px-6 md:px-20 pb-16 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm mb-3">
            {t("photoWall.eyebrow")}
          </p>
          <h3 className="font-display text-3xl md:text-6xl font-bold text-foreground mb-3 md:mb-5 leading-tight">
            {t("photoWall.title")}
          </h3>
          <p className="text-foreground/70 text-base md:text-lg">
            {t("photoWall.subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoWall;
