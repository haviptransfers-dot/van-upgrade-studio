import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { hostedImageUrl } from "./OptimizedImage";
import review1 from "@/assets/review-1.webp.asset.json";
import review2 from "@/assets/review-2.webp.asset.json";
import review3 from "@/assets/review-3.webp.asset.json";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/H%26A+Tours+EE+%E2%80%93+VIP+VAN+Transfers+Athens+%2F+Airport+Transfer/@37.8984517,23.7510804,15z/data=!4m8!3m7!1s0x14a1bf29f6b3d8db:0x68e02440ef866866!8m2!3d37.895034!4d23.7553906!9m1!1b1!16s%2Fg%2F11xkp5z_zr";

const reviews = [
  {
    name: "Janine Yalda",
    flag: "🇺🇸",
    country: "USA",
    text: "Excellent service from start to finish. Very reliable, professional, and helpful. Communication was great, the driver was on time, friendly, and made everything stress-free. Clean vehicle and smooth ride. I highly recommend this company and would definitely use them again.",
    date: "6 weeks ago",
  },
  {
    name: "Ioannis Androulakis",
    flag: "🇬🇷",
    country: "Greece",
    text: "Exceptional service. Great accessories and luxurious van. Very polite and informative driver. Very good English. I took their telephone number to have direct communication on short notice. Thank you Antonis!!!",
    date: "2 months ago",
  },
  {
    name: "Zbigniew Adamczak",
    flag: "🇵🇱",
    country: "Poland",
    text: "The transfer to the airport went very smoothly and without any problems. The driver was punctual, polite, and professional, and the car was clean and comfortable. The entire journey was calm and stress-free — especially important before a flight. Highly recommended.",
    date: "6 weeks ago",
  },

];

export { default as TrustBadge } from "./TrustBadge";

const snapshots = [review1, review2, review3];

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
              <p className="text-sm text-foreground/80 font-medium">Verified reviews</p>
              <p className="text-xs text-muted-foreground">Based on real customer experiences</p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
          {reviews.map((review, i) => (
            <a key={review.name} href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Read ${review.name}'s review on Google`}>
              <img src={hostedImageUrl(snapshots[i].url)} width={i === 1 ? 348 : 347} height={320} loading="lazy" decoding="async" className="w-full h-auto rounded-lg" alt={`${review.name}, ${review.country}, 5 out of 5 stars: ${review.text}`} />
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
              className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-6 md:px-8 text-sm md:text-base h-auto py-3 shadow-lg"
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
