import { useHomeExtra } from "@/lib/homeExtra";
import { useTranslation } from "react-i18next";
import Link from "./LocalizedLink";
const linkFirst = (text: string, phrase: string, to: string) => {
  const at = text.indexOf(phrase);
  if (at < 0) return text;
  return <>{text.slice(0, at)}<Link to={to} className="text-primary underline underline-offset-4">{phrase}</Link>{text.slice(at + phrase.length)}</>;
};

type ServiceSection = {
  heading: string;
  paragraphs: string[];
  quoteLink?: string;
  listHeading?: string;
  items?: string[];
};

export default function ServiceContent({ port = false, home = false }: { port?: boolean; home?: boolean }) {
  const { t } = useTranslation();
  const homeExtra = useHomeExtra(home);
  const sections = t(`seoContent.${port ? "piraeusSections" : "homeSections"}`, { returnObjects: true }) as ServiceSection[];
  const piraeusFaq = port ? t("seoContent.piraeusFaq", { returnObjects: true }) as { question: string; answer: string }[] : [];
  if (!Array.isArray(sections)) return null;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: piraeusFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <section className="px-4 py-12 md:py-16 bg-background"><div className="container mx-auto max-w-4xl space-y-8">
    {sections.map((section, index) => <div key={section.heading}>
      <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">{section.heading}</h2>
      {section.paragraphs.map((paragraph, pIndex) => <p key={paragraph} className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">{homeExtra && pIndex === 0 && index === 0 ? linkFirst(paragraph, homeExtra.airportPhrase, "/airport-transfer-athens") : homeExtra && pIndex === 0 && index === 1 ? linkFirst(paragraph, homeExtra.portWord, "/piraeus-port-transfer") : port && pIndex === 0 && index === 0 ? linkFirst(paragraph, t("seoContent.piraeusAirportLabel"), "/airport-transfer-athens") : paragraph}</p>)}
      {section.quoteLink && <p className="text-sm md:text-base leading-relaxed mb-4"><a href="#calculator" className="text-primary underline underline-offset-4">{section.quoteLink}</a></p>}
      {section.listHeading && <><h3 className="font-display text-lg mb-3">{section.listHeading}</h3><ul className="list-disc ps-5 space-y-2 text-muted-foreground text-sm md:text-base leading-relaxed">{section.items?.map((item) => <li key={item}>{item}</li>)}</ul></>}
      {index === 0 && <Link to="/airport-transfer-athens" className="text-primary underline underline-offset-4">{t("services.items.airport.title")}</Link>}
      {!port && index === 1 && <Link to="/piraeus-port-transfer" className="text-primary underline underline-offset-4">{t("services.items.port.title")}</Link>}
      {index === (port ? 4 : 3) && <Link to="/child-seats" className="text-primary underline underline-offset-4">{t("seoContent.childTitle")}</Link>}
    </div>)}
    {port && <div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /><h2 className="font-display text-2xl text-primary mb-4">{t("seoContent.faqTitle")}</h2>
      {piraeusFaq.map((item) => <div key={item.question} className="mb-6"><h3 className="font-display text-lg mb-2">{item.question}</h3><p className="text-muted-foreground leading-relaxed">{item.answer}</p></div>)}
    </div>}
  </div></section>;
}