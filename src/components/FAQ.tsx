import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function FAQ() {
  const { t } = useTranslation();

  const faqItems = [
    { q: t("faq.items.q1"), a: t("faq.items.a1") },
    { q: t("faq.items.q2"), a: t("faq.items.a2") },
    { q: t("faq.items.q3"), a: t("faq.items.a3") },
    { q: t("faq.items.q4"), a: t("faq.items.a4") },
    { q: t("faq.items.q5"), a: t("faq.items.a5") },
    { q: t("faq.items.q6"), a: t("faq.items.a6") },
    { q: t("faq.items.q7"), a: t("faq.items.a7") },
    { q: t("faq.items.q8"), a: t("faq.items.a8") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 md:py-24 px-4 bg-card">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3"
          >
            {t("faq.eyebrow")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-3xl md:text-5xl font-bold"
          >
            {t("faq.title")}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="text-left py-4 md:py-5 hover:no-underline group">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-display text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {item.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-8 text-sm md:text-base">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
