import { useState } from "react";
import { motion } from "framer-motion";
import { Banknote, Check, Copy, CreditCard, Landmark, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

const IBAN = "GR06 0260 6530 0009 4020 0732 759";
const BIC = "ERBKGRAA";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const PaymentMethods = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(IBAN.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — user can select the text manually
    }
  };

  const cardClass =
    "bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary/40 transition-colors";

  return (
    <section id="payment-methods" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-primary uppercase tracking-[0.2em] text-xs md:text-sm mb-3">
            {t("payments.eyebrow")}
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold">
            {t("payments.title1")} <span className="text-primary">{t("payments.title2")}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-4 text-sm md:text-base">
            {t("payments.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-5 md:gap-6"
        >
          {/* Online card payment */}
          <motion.div variants={fadeUp} custom={0} className={cardClass}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">{t("payments.online.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("payments.online.desc")}</p>
              </div>
            </div>
          </motion.div>

          {/* Bank transfer */}
          <motion.div variants={fadeUp} custom={1} className={`${cardClass} border-primary/30`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Landmark className="w-5 h-5 text-primary" />
              </div>
              <div className="w-full">
                <h3 className="font-display text-lg font-semibold mb-3">{t("payments.bank.title")}</h3>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{t("payments.bank.beneficiary")}</dt>
                    <dd className="font-medium text-right">H &amp; A TOURS EE</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{t("payments.bank.bank")}</dt>
                    <dd className="font-medium text-right">Eurobank</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">IBAN</dt>
                    <dd className="font-medium text-right text-xs md:text-sm tracking-wide">
                      {IBAN}
                      <button
                        type="button"
                        onClick={copyIban}
                        aria-label={t("payments.bank.copy")}
                        className="inline-flex items-center gap-1 ml-2 text-primary hover:text-primary/80 transition-colors align-middle"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">BIC</dt>
                    <dd className="font-medium text-right">{BIC}</dd>
                  </div>
                </dl>
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/60">
                  {t("payments.bank.reference")}: <span className="text-foreground/80">{t("payments.bank.referenceVal")}</span>
                  {copied && <span className="text-primary ml-2">{t("payments.bank.copied")}</span>}
                </p>
              </div>
            </div>
          </motion.div>

          {/* POS in vehicle */}
          <motion.div variants={fadeUp} custom={2} className={cardClass}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">{t("payments.pos.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("payments.pos.desc")}</p>
              </div>
            </div>
          </motion.div>

          {/* Cash */}
          <motion.div variants={fadeUp} custom={3} className={cardClass}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Banknote className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">{t("payments.cash.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("payments.cash.desc")}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentMethods;
