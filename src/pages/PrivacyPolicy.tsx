import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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

const PrivacyPolicy = () => (
  <main className="min-h-screen bg-background text-foreground px-4 py-16 md:py-24">
    <Helmet>
      <title>Privacy Policy | H&A VIP Tours Athens</title>
      <link rel="canonical" href="https://haviptransfers.gr/privacy-policy" />
      <link rel="alternate" hrefLang="en" href="https://haviptransfers.gr/privacy-policy" />
      <link rel="alternate" hrefLang="x-default" href="https://haviptransfers.gr/privacy-policy" />
      <meta
        name="description"
        content="How H&A VIP Tours collects, uses and protects your personal data — cookies, analytics and your GDPR rights."
      />
    </Helmet>
    <div className="container mx-auto max-w-2xl">
      <p className="text-primary uppercase tracking-[0.2em] text-xs mb-3">H&A VIP Tours</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-semibold text-primary mb-2">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
      <Link to="/" className="inline-block mt-10 text-primary hover:text-primary/80 text-sm underline underline-offset-4">
        ← Back to home
      </Link>
    </div>
  </main>
);

export default PrivacyPolicy;
