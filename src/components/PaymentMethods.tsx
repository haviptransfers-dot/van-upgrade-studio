import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Banknote, ChevronDown, CreditCard, Landmark, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";


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
  const [open, setOpen] = useState(false);


  const cardClass =
    "bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary/40 transition-colors";

  return (
    <section id="payment-methods" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Tappable banner */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="payment-methods-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="group relative w-full text-left bg-card border border-primary/40 rounded-xl p-5 md:p-7 flex items-center gap-4 md:gap-6 overflow-hidden hover:border-primary/70 hover:shadow-[0_0_45px_rgba(212,168,58,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-all cursor-pointer"
        >
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
            aria-hidden="true"
          />
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-primary uppercase tracking-[0.2em] text-[10px] md:text-xs mb-1">
              {t("payments.eyebrow")}
            </p>
            <p className="font-display text-lg md:text-2xl font-bold leading-tight">
              {t("payments.title1")} <span className="text-primary">{t("payments.title2")}</span>
            </p>
            <p className="text-muted-foreground text-xs md:text-sm mt-1">{t("payments.bannerTap")}</p>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 text-primary"
            aria-hidden="true"
          >
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </motion.span>
        </motion.button>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="payment-methods-panel"
              key="payment-methods-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-10 md:pt-14">
                <p className="text-center text-muted-foreground mb-10 md:mb-12 text-sm md:text-base">
                  {t("payments.subtitle")}
                </p>

                <motion.div
                  initial="hidden"
                  animate="visible"
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
                      <div>
                        <h3 className="font-display text-lg font-semibold mb-2">{t("payments.bank.title")}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{t("payments.bank.desc")}</p>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PaymentMethods;
