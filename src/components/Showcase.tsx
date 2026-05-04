import { motion } from "framer-motion";
import showcase1 from "@/assets/showcase-1.webp";
import showcase2 from "@/assets/showcase-2.webp";
import showcase3 from "@/assets/showcase-3.webp";
import showcase4 from "@/assets/showcase-4.webp";

const slides = [
  {
    src: showcase1,
    alt: "Mercedes V Class side door open in luxury garage",
    title: "Step Inside Luxury",
    subtitle: "Premium leather. Whisper-quiet cabin.",
  },
  {
    src: showcase2,
    alt: "Close-up of Mercedes V Class door handle",
    title: "Crafted in Detail",
    subtitle: "Every surface, finished to perfection.",
  },
  {
    src: showcase3,
    alt: "Mercedes V Class on scenic mountain road",
    title: "Anywhere in Greece",
    subtitle: "From Athens to Meteora — in absolute comfort.",
  },
  {
    src: showcase4,
    alt: "Mercedes V Class rear cabin with cognac leather seats",
    title: "Space to Unwind",
    subtitle: "Up to 7 passengers. Generous legroom.",
  },
];

const Showcase = () => {
  return (
    <section className="relative">
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className="relative h-[70vh] md:h-screen w-full overflow-hidden bg-background"
        >
          <div
            className="absolute inset-0 bg-cover bg-center md:bg-fixed"
            style={{ backgroundImage: `url(${slide.src})` }}
            aria-label={slide.alt}
            role="img"
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
                {`0${i + 1} / 0${slides.length}`}
              </p>
              <h3 className="font-display text-3xl md:text-6xl font-bold text-foreground mb-3 md:mb-5 leading-tight">
                {slide.title}
              </h3>
              <p className="text-foreground/70 text-base md:text-lg">
                {slide.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Showcase;
