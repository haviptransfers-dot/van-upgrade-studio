import { Helmet } from "react-helmet-async";
import Link from "@/components/LocalizedLink";
import { useTranslation } from "react-i18next";
import PageHead from "@/components/PageHead";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "Who we are",
    body: [
      "H&A VIP Tours (H&A Tours Ltd) is a private transfer and tour company based in Athens, Greece. You can reach us at h.a.viptransfers@gmail.com or +30 694 939 3700.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "When you chat with our AI assistant or use the quote form, we save the details you share — name, email, phone, pickup, destination, date and passengers — so we can respond to your request.",
      "With your consent, we also use analytics cookies (Google Analytics, Metricool) to understand how the site is used.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Necessary cookies keep the site working (for example the chat and quote form). They are always on.",
      "Analytics and marketing cookies are blocked until you press “Accept All” or enable them under “Manage”. You can change your choice at any time by clearing your browser storage.",
    ],
  },
  {
    heading: "Your rights (GDPR)",
    body: [
      "You may request access, correction or deletion of your personal data at any time by emailing h.a.viptransfers@gmail.com. We respond within 30 days.",
    ],
  },
];

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const translated = t("seoContent.privacySections", { returnObjects: true }) as { heading: string; paragraphs: string[] }[];
  return (
  <main className="min-h-screen bg-background text-foreground px-4 py-16 md:py-24">
    <PageHead title={t("seoContent.privacyTitle")} description={t("seoContent.privacyDescription")} />
    <div className="container mx-auto max-w-2xl">
      <p className="text-primary uppercase tracking-[0.2em] text-xs mb-3">H&A VIP Tours</p>
      <LanguageSwitcher />
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{t("seoContent.privacyTitle").split("|")[0]}</h1>
      <div className="space-y-8">
        {translated.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-semibold text-primary mb-2">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
      <Link to="/" className="inline-block mt-10 text-primary hover:text-primary/80 text-sm underline underline-offset-4">
        {t("blog.backHome")}
      </Link>
    </div>
  </main>
);
};

export default PrivacyPolicy;
