import { Fragment, lazy, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { HelpCircle, MessageCircle } from "lucide-react";
import Link from "@/components/LocalizedLink";
import DeferredSection from "@/components/DeferredSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PriceCalculator = lazy(() => import("@/components/PriceCalculator"));

type Section = { title: string; paragraphs?: string[]; items?: string[]; after?: string[] };
type AirportPage = { h1: string; intro: string; sections: Section[]; faqTitle: string; faq: { q: string; a: string }[]; ctaTitle: string; ctaText: string };

const WHATSAPP_URL = "https://wa.me/306949393700";
const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80";

/** Renders the owner copy's **bold** lead-ins and [label](target) links; internal targets stay in the visitor's language. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    if (match[1]) parts.push(<strong key={index} className="text-foreground font-semibold">{match[1]}</strong>);
    else if (match[3].startsWith("/")) parts.push(<Link key={index} to={match[3]} className={linkClass}>{match[2]}</Link>);
    else parts.push(<a key={index} href={match[3]} dir="ltr" className={linkClass} {...(match[3].startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{match[2]}</a>);
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

const paragraphClass = "text-muted-foreground text-sm md:text-base leading-relaxed mb-4";

export default function AirportTransferContent() {
  const { t } = useTranslation();
  const page = t("airportPage", { returnObjects: true }) as AirportPage;
  if (!page || typeof page !== "object" || !Array.isArray(page.sections)) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  const bookingIndex = page.sections.length - 1;
  return <main>
    <section className="px-4 pt-28 md:pt-36 pb-10 md:pb-14 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6">{page.h1}</h1>
        <p className="text-foreground/85 text-base md:text-lg leading-relaxed">{page.intro}</p>
      </div>
    </section>
    {page.sections.map((section, index) => <Fragment key={section.title}>
      <section className="px-4 py-8 md:py-10 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph} className={paragraphClass}><RichText text={paragraph} /></p>)}
          {section.items && <ul className="space-y-3 mb-4 list-disc ps-5 marker:text-primary">
            {section.items.map((item) => <li key={item} className="text-muted-foreground text-sm md:text-base leading-relaxed"><RichText text={item} /></li>)}
          </ul>}
          {section.after?.map((paragraph) => <p key={paragraph} className={paragraphClass}><RichText text={paragraph} /></p>)}
        </div>
      </section>
      {index === bookingIndex && <DeferredSection anchor="calculator"><PriceCalculator hideChildSeats /></DeferredSection>}
    </Fragment>)}
    <section id="faq" className="py-16 md:py-24 px-4 bg-card">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-10 md:mb-14">{page.faqTitle}</h2>
        <Accordion type="single" collapsible className="w-full">
          {page.faq.map((item, i) => <AccordionItem key={item.q} value={`item-${i}`} className="border-b border-border">
            <AccordionTrigger className="text-start py-4 md:py-5 hover:no-underline group">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="font-display text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{item.q}</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed ps-8 text-sm md:text-base">{item.a}</AccordionContent>
          </AccordionItem>)}
        </Accordion>
      </div>
    </section>
    <section className="py-14 md:py-20 px-4 border-y border-border bg-background">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">{page.ctaTitle}</h2>
        <p className="text-muted-foreground mb-6 md:mb-8 text-base md:text-lg"><RichText text={page.ctaText} /></p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="w-full sm:w-auto text-base px-8 md:px-10 gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
            <MessageCircle className="w-5 h-5" />
            {t("cta.whatsapp")}
          </Button>
        </a>
      </div>
    </section>
  </main>;
}
