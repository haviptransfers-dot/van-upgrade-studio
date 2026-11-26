import { useTranslation } from "react-i18next";
import { HelpCircle, MessageCircle } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RichText } from "@/components/AirportTransferContent";
import { vipToursCopy } from "@/data/vipToursHub";

const WHATSAPP_URL = "https://wa.me/306949393700";
const paragraphClass = "text-muted-foreground text-sm md:text-base leading-relaxed mb-4";

/** Body of the /vip-tours-athens/ hub: five text-only tour cards and an FAQ whose visible text is its FAQPage JSON-LD. */
export default function VipToursContent() {
  const { t, i18n } = useTranslation();
  const page = vipToursCopy(i18n.language);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  return <main>
    <section className="px-4 pt-28 md:pt-36 pb-10 md:pb-14 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6">{page.h1}</h1>
        <p className="text-foreground/85 text-base md:text-lg leading-relaxed"><RichText text={page.intro} /></p>
      </div>
    </section>
    <section className="px-4 py-8 md:py-10 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl text-primary mb-6">{page.toursTitle}</h2>
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 mb-8">
          {page.tours.map((tour) => <div key={tour.to} className="bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors">
            <h3 className="font-display text-lg font-semibold mb-2"><Link to={tour.to} className="text-primary underline underline-offset-4 hover:text-primary/80">{tour.name}</Link></h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{tour.text}</p>
          </div>)}
        </div>
        <p className={paragraphClass}><RichText text={page.priceNote} /></p>
        <p className={paragraphClass}>{page.included}</p>
        <p className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {page.links.map((link) => <Link key={link.to} to={link.to} className="text-primary underline underline-offset-4 hover:text-primary/80">{link.label}</Link>)}
        </p>
      </div>
    </section>
    <section id="faq" className="py-16 md:py-24 px-4 bg-card">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-10 md:mb-14">{page.faqTitle}</h2>
        <Accordion type="single" collapsible className="w-full">
          {page.faq.map((item, i) => <AccordionItem key={item.q} value={`item-${i}`} className="border-b border-border">
            <AccordionTrigger className="text-start py-4 md:py-5 hover:no-underline group">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-display text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{item.q}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed ps-8 text-sm md:text-base">{item.a}</AccordionContent>
          </AccordionItem>)}
        </Accordion>
      </div>
    </section>
    <section className="py-14 md:py-20 px-4 border-y border-border bg-background">
      <div className="container mx-auto max-w-3xl text-center">
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
