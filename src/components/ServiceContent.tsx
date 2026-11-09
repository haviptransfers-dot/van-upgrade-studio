import { useTranslation } from "react-i18next";
import Link from "./LocalizedLink";
export default function ServiceContent({ port = false }: { port?: boolean }) {
  const { t } = useTranslation();
  const sections = t(`seoContent.${port ? "piraeusSections" : "homeSections"}`, { returnObjects: true }) as { heading: string; paragraphs: string[] }[];
  if (!Array.isArray(sections)) return null;
  return <section className="px-4 py-12 md:py-16 bg-background"><div className="container mx-auto max-w-4xl space-y-8">
    {sections.map((section, index) => <div key={section.heading}>
      <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">{section.heading}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">{paragraph}</p>)}
      {index === 0 && <Link to="/airport-transfer-athens" className="text-primary underline underline-offset-4">{t("services.items.airport.title")}</Link>}
      {index === 1 && <Link to="/piraeus-port-transfer" className="text-primary underline underline-offset-4">{t("services.items.port.title")}</Link>}
      {index === 3 && <Link to="/child-seats" className="text-primary underline underline-offset-4">{t("seoContent.childTitle")}</Link>}
    </div>)}
    {port && <div><h2 className="font-display text-2xl text-primary mb-4">{t("seoContent.faqTitle")}</h2>
      {(t("seoContent.piraeusFaq", { returnObjects: true }) as { question: string; answer: string }[]).map((item) => <div key={item.question} className="mb-6"><h3 className="font-display text-lg mb-2">{item.question}</h3><p className="text-muted-foreground leading-relaxed">{item.answer}</p></div>)}
    </div>}
  </div></section>;
}