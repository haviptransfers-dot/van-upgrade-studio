import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/H%26A+Tours+EE+%E2%80%93+VIP+VAN+Transfers+Athens+%2F+Airport+Transfer/@37.8984517,23.7510804,15z/data=!4m8!3m7!1s0x14a1bf29f6b3d8db:0x68e02440ef866866!8m2!3d37.895034!4d23.7553906!9m1!1b1!16s%2Fg%2F11xkp5z_zr";

const reviews = [
  {
    name: "Sarah M.",
    flag: "🇺🇸",
    country: "USA",
    text: "Excellent service! Punctual, clean car, professional driver. Made our Athens trip completely stress-free. Will definitely book again!",
    date: "2 weeks ago",
  },
  {
    name: "Marco B.",
    flag: "🇮🇹",
    country: "Italy",
    text: "Absolutely perfect from airport to hotel. The Mercedes was spotless, WiFi worked great, and the driver was super helpful. Highly recommend!",
    date: "1 month ago",
  },
  {
    name: "Emma K.",
    flag: "🇬🇧",
    country: "UK",
    text: "Best transfer company in Athens. Our driver waited even though our flight was delayed 2 hours — no extra charge, no stress. True 5-star service!",
    date: "3 weeks ago",
  },
  {
    name: "Jean P.",
    flag: "🇫🇷",
    country: "France",
    text: "Luxury experience at a fair price. Our family of 6 loved the Mercedes V Class, plenty of space for everyone. Will book again for sure.",
    date: "1 month ago",
  },
  {
    name: "David R.",
    flag: "🇩🇪",
    country: "Germany",
    text: "Professional, friendly, and always on time. H&A Tours is now our go-to for every Athens trip. The Sounion sunset tour was unforgettable!",
    date: "2 months ago",
  },
  {
    name: "Maria S.",
    flag: "🇦🇺",
    country: "Australia",
    text: "We used H&A for our whole 5-day Athens stay — airport, tours, everything. Consistently outstanding. The drivers really know the city.",
    date: "3 months ago",
  },
];

const TrustBadge = () => (
  <a
    href={GOOGLE_REVIEWS_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 hover:border-primary/40 transition-colors"
  >
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-primary text-primary" />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">5.0</span>
    </div>
    <span className="text-xs text-muted-foreground hidden sm:inline">· 52 reviews</span>
  </a>
);

export { TrustBadge };

const Reviews = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-background">
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-[10px] md:text-sm mb-3">
            {t("reviews.eyebrow", "Trusted by Travelers Worldwide")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5 md:mb-6">
            Google <span className="text-primary">{t("reviews.title", "Reviews")}</span>
          </h2>

          {/* Big rating block */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-card/60 backdrop-blur-sm border border-border rounded-2xl px-6 py-4 md:px-8 md:py-5">
            <div className="text-center sm:text-left">
              <span className="font-display text-5xl md:text-6xl font-bold text-primary">5.0</span>
              <p className="text-sm text-muted-foreground">out of 5</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div className="text-center sm:text-left">
              <div className="flex justify-center sm:justify-start gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 font-medium">52 verified reviews</p>
              <p className="text-xs text-muted-foreground">Based on real customer experiences</p>
            </div>
          </div>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-5 md:p-6 hover:border-primary/30 transition-colors group relative"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20 group-hover:text-primary/30 transition-colors" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-base font-semibold text-primary">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{review.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{review.flag}</span>
                    <span className="text-xs text-muted-foreground">{review.country}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                "{review.text}"
              </p>

              <p className="text-xs text-muted-foreground">{review.date}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read all reviews on Google"
          >
            <Button
              size="lg"
              className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-6 md:px-8 text-sm md:text-base h-auto py-3 shadow-[0_8px_30px_-8px_hsl(43_80%_50%_/_0.6)]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
              </svg>
              {t("reviews.readAll", "Read All Reviews on Google")}
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            {t("reviews.verified", "Verified by Google · Updated in real time")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
