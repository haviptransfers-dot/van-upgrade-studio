import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import tourDelphi from "@/assets/tour-delphi.jpg";
import tourMeteora from "@/assets/tour-meteora.jpg";
import tourNafplio from "@/assets/tour-nafplio.jpg";
import tourSounio from "@/assets/tour-sounio.jpg";
import tourAcropolis from "@/assets/tour-acropolis.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const tours = [
  { src: tourDelphi, name: "Delphi", desc: "Oracle of Apollo & ancient sanctuary" },
  { src: tourMeteora, name: "Meteora", desc: "Monasteries on towering rock pillars" },
  { src: tourNafplio, name: "Nafplio", desc: "Charming seaside town & Bourtzi fortress" },
  { src: tourSounio, name: "Cape Sounion", desc: "Temple of Poseidon at sunset" },
  { src: tourAcropolis, name: "Acropolis", desc: "The iconic Parthenon & Athens highlights" },
];

const PrivateTours = () => {
  const whatsappUrl = "https://wa.me/306949393700";

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
            Explore Greece
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold">
            Private Tours
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Customized day trips from Athens to Greece's most iconic destinations. Travel in luxury with your own private driver.
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {tours.map((tour, i) => (
            <motion.div
              key={tour.name}
              variants={fadeUp}
              custom={i}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
            >
              <img
                src={tour.src}
                alt={`Private tour to ${tour.name}`}
                loading="lazy"
                width={768}
                height={512}
                className="w-full h-52 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-lg font-bold text-foreground">{tour.name}</h3>
                <p className="text-foreground/60 text-xs mt-1">{tour.desc}</p>
              </div>
            </motion.div>
          ))}
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
              Book a Private Tour
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivateTours;
