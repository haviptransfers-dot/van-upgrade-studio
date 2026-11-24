import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { RATING } from "@/data/reviewFacts";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/H%26A+Tours+EE+%E2%80%93+VIP+VAN+Transfers+Athens+%2F+Airport+Transfer/@37.8984517,23.7510804,15z/data=!4m8!3m7!1s0x14a1bf29f6b3d8db:0x68e02440ef866866!8m2!3d37.895034!4d23.7553906!9m1!1b1!16s%2Fg%2F11xkp5z_zr";

const reviews = [
  {
    name: "Janine Yalda",
    country: "USA",
    text: "Excellent service from start to finish. Very reliable, professional, and helpful. Communication was great, the driver was on time, friendly, and made everything stress-free. Clean vehicle and smooth ride. I highly recommend this company and would definitely use them again.",
  },
  {
    name: "Alya",
    country: "",
    text: "H&A Tours EE Athens — Highly Recommended!\nOne of the best car services we’ve used on our travels, and their prices were excellent!\nThe cars were new, spotless, with Wi-Fi, water, and sweets provided.\nWe had Paul for two days and Alex for our last day. Both were wonderful! Polite, patient, helpful, and so accommodating, even when we made last-minute changes to our plans.\nI arranged everything directly with Antonis, who was incredibly responsive. And when I say available 24/7, I mean it! Even at 5 or 6 in the morning, he would reply within 30 minutes. Very impressive!\nA big thank you to Antonis, Paul, and Alex for looking after us so well. We will definitely book with you again on our next visit to Athens!",
  },
  {
    name: "Zbigniew Adamczak",
    country: "Poland",
    text: "The transfer to the airport went very smoothly and without any problems. The driver was punctual, polite, and professional, and the car was clean and comfortable. The entire journey was calm and stress-free — especially important before a flight. Highly recommended.",
  },

];

export { default as TrustBadge } from "./TrustBadge";

const Reviews = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-muted-foreground text-xs md:text-sm mb-3">
            {t("reviews.eyebrow", "Trusted by Travelers Worldwide")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5 md:mb-6">
            Google <span>{t("reviews.title", "Reviews")}</span>
          </h2>

          {/* Big rating block */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-4 md:py-5">
            <div className="text-center sm:text-left">
              <span className="font-display text-4xl md:text-5xl font-medium text-foreground">{RATING.toFixed(1)}</span>
              <p className="text-sm text-muted-foreground">{t("seoUi.uiTranslations.out of 5")}</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div className="text-center sm:text-left">
              <div className="flex justify-center sm:justify-start gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 font-medium">{t("seoUi.uiTranslations.Verified reviews")}</p>
              <p className="text-xs text-muted-foreground">{t("seoUi.uiTranslations.Based on real customer experiences")}</p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
          {reviews.map((review) => (
            <a key={review.name} href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr" className="flex flex-col bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors" aria-label={`Read ${review.name}'s review on Google`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 shrink-0 rounded-full bg-secondary text-primary flex items-center justify-center font-semibold" aria-hidden="true">{review.name.charAt(0)}</span>
                <div><p className="font-semibold text-sm text-foreground">{review.name}</p>{review.country && <p className="text-xs text-muted-foreground">{review.country}</p>}</div>
              </div>
              <div className="flex gap-1 mb-4 text-primary" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="m12 2 3.09 6.26 6.91 1-5 4.88 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.88 6.91-1L12 2Z" /></svg>)}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line mb-5">“{review.text}”</blockquote>
              <span className="text-xs text-muted-foreground mt-auto">Google</span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div
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
              variant="outline"
              className="gap-3 border-border text-foreground hover:bg-secondary px-6 md:px-8 text-sm md:text-base h-auto py-3"
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

        </div>
      </div>
    </section>
  );
};

export default Reviews;
