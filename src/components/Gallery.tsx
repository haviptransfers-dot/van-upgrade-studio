import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import gallery4 from "@/assets/gallery-4.webp";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const images = [
  { src: gallery1, alt: "Mercedes Vito exterior with open door" },
  { src: gallery2, alt: "Mercedes V Class quilted cognac leather rear seats" },
  { src: gallery3, alt: "Black Mercedes Vito parked in front of a luxury Athens hotel entrance" },
  { src: gallery4, alt: "H&A Tours van with Athens Acropolis view" },
  { src: gallery5, alt: "Mercedes V Class open sliding door showing cognac leather seats with ambient lighting" },
  { src: gallery6, alt: "Mercedes V Class interior with diamond-stitched black leather seats and blue ambient floor lighting" },
];

const Gallery = () => {
  const { t } = useTranslation();
  return (
  <section id="gallery" className="py-16 md:py-24 px-4">
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3">
          {t("gallery.eyebrow")}
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold">
          {t("gallery.title")}
        </motion.h2>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {images.map((img, i) => (
          <motion.div
            key={img.alt}
            variants={fadeUp}
            custom={i}
            className="overflow-hidden rounded-lg group"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
  );
};

export default Gallery;
