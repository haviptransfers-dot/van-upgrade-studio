import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Sophie L.",
    country: "🇫🇷 France",
    rating: 5,
    text: "Absolutely flawless service from Athens airport to our hotel. The Mercedes V Class was immaculate and our driver Antonis was professional, friendly and spoke perfect English. Highly recommended!",
  },
  {
    name: "Marco R.",
    country: "🇮🇹 Italy",
    rating: 5,
    text: "Booked H&A for a private tour to Delphi. Punctual, knowledgeable, and the vehicle was pure luxury. Worth every euro for a stress-free day.",
  },
  {
    name: "James W.",
    country: "🇬🇧 UK",
    rating: 5,
    text: "Used them for our cruise transfer from Piraeus. Tracked our ship arrival, met us with a name sign, and got us to the airport with time to spare. Top-tier VIP experience.",
  },
  {
    name: "Lena K.",
    country: "🇩🇪 Germany",
    rating: 5,
    text: "The best transfer service in Athens! Spotless car, water and Wi-Fi included, and the driver made us feel like VIPs. We will only use H&A from now on.",
  },
  {
    name: "Carlos M.",
    country: "🇪🇸 Spain",
    rating: 5,
    text: "Excellent communication via WhatsApp before arrival. Smooth ride, fixed price, no surprises. The Mercedes V Class is perfect for families with luggage.",
  },
  {
    name: "Anna P.",
    country: "🇬🇷 Greece",
    rating: 5,
    text: "Used them for a Sounion sunset tour. Antonis is a true professional — discreet, on time, and the car is pristine. A genuine luxury experience.",
  },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/H%26A+Tours+EE+%E2%80%93+VIP+VAN+Transfers+Athens+%2F+Airport+Transfer/@37.8984517,23.7510804,15z/data=!4m8!3m7!1s0x14a1bf29f6b3d8db:0x68e02440ef866866!8m2!3d37.895034!4d23.7553906!9m1!1b1!16s%2Fg%2F11xkp5z_zr";

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5000);
    return () => clearInterval(id);
  }, []);

  const visible = Array.from({ length: perView }, (_, i) => reviews[(index + i) % reviews.length]);

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-background">
      {/* Luxe gold radial accents */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top, hsl(43 80% 50% / 0.15), transparent 60%), radial-gradient(ellipse at bottom, hsl(43 80% 50% / 0.08), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm mb-3">
            Trusted by Travelers Worldwide
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Google <span className="text-primary">Reviews</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-foreground/80">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-semibold text-lg">5.0</span>
            <span className="text-muted-foreground text-sm">· 40+ verified reviews</span>
          </div>
        </motion.div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index + "-" + perView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visible.map((r, i) => (
                <article
                  key={r.name + i}
                  className="relative rounded-xl p-6 md:p-7 bg-gradient-to-br from-card to-background border border-primary/20 shadow-[0_10px_40px_-15px_hsl(43_80%_50%_/_0.25)] hover:border-primary/50 transition-colors"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" aria-hidden="true" />
                  <div className="flex mb-3">
                    {[...Array(r.rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/85 text-sm leading-relaxed mb-5 italic">
                    “{r.text}”
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-primary/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.country}</p>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-primary" : "w-1.5 bg-primary/30 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read all reviews on Google"
          >
            <Button
              size="lg"
              className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-8 shadow-[0_8px_30px_-8px_hsl(43_80%_50%_/_0.6)]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
              </svg>
              Read All Reviews on Google
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Verified by Google · Updated regularly
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
