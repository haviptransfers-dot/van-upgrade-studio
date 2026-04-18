import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MessageCircle, Minus, Plus, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

type ServiceKey =
  | "airport_to_athens"
  | "athens_to_airport"
  | "port_to_athens"
  | "athens_to_port"
  | "sounio"
  | "athens_sights";

const fixedPrices: Partial<Record<ServiceKey, number>> = {
  sounio: 200,
  athens_sights: 160,
};

const perPaxPrices: Partial<Record<ServiceKey, { base: number; extra: number; baseMax: number }>> = {
  airport_to_athens: { base: 70, extra: 5, baseMax: 4 },
  athens_to_airport: { base: 70, extra: 5, baseMax: 4 },
  port_to_athens: { base: 40, extra: 5, baseMax: 4 },
  athens_to_port: { base: 40, extra: 5, baseMax: 4 },
};

const PriceCalculator = () => {
  const { t } = useTranslation();
  const [service, setService] = useState<ServiceKey>("airport_to_athens");
  const [pax, setPax] = useState(2);
  const [night, setNight] = useState(false);

  const services: { key: ServiceKey; label: string }[] = [
    { key: "airport_to_athens", label: `✈ → 🏛 ${t("calc.services.airport_to_athens")}` },
    { key: "athens_to_airport", label: `🏛 → ✈ ${t("calc.services.athens_to_airport")}` },
    { key: "port_to_athens", label: `⚓ → 🏛 ${t("calc.services.port_to_athens")}` },
    { key: "athens_to_port", label: `🏛 → ⚓ ${t("calc.services.athens_to_port")}` },
    { key: "sounio", label: `🏛 ${t("calc.services.sounio")}` },
    { key: "athens_sights", label: `🗺 ${t("calc.services.athens_sights")}` },
  ];

  const isFixed = fixedPrices[service] !== undefined;

  const { base, nightExtra, total } = useMemo(() => {
    let baseVal = 0;
    if (isFixed) {
      baseVal = fixedPrices[service]!;
    } else {
      const p = perPaxPrices[service]!;
      const extraPax = Math.max(0, pax - p.baseMax);
      baseVal = p.base + extraPax * p.extra;
    }
    const nExtra = night ? pax * 10 : 0;
    return { base: baseVal, nightExtra: nExtra, total: baseVal + nExtra };
  }, [service, pax, night, isFixed]);

  const whatsappMsg = encodeURIComponent(
    `Hi! I'd like to book: ${t(`calc.services.${service}`)} · ${pax} pax${night ? " · Night" : ""} · €${total}`
  );
  const whatsappUrl = `https://wa.me/306949393700?text=${whatsappMsg}`;

  return (
    <section id="calculator" className="py-24 px-4 bg-card">
      <div className="container mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-3">{t("calc.eyebrow")}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            {t("calc.title1")} <span className="text-primary">{t("calc.title2")}</span>
          </h2>
        </motion.div>

        {/* Service */}
        <div className="bg-background border border-border rounded-md p-6 mb-4">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-primary mb-3">
            {t("calc.selectService")}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {services.map((s) => (
              <button
                key={s.key}
                onClick={() => setService(s.key)}
                className={`text-[11px] tracking-wide uppercase px-2 py-3 rounded-sm border transition-all ${
                  service === s.key
                    ? "bg-primary text-primary-foreground border-primary font-semibold"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Passengers */}
        {!isFixed && (
          <div className="bg-background border border-border rounded-md p-6 mb-4">
            <label className="block text-[10px] tracking-[0.2em] uppercase text-primary mb-3">
              {t("calc.passengers")}
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setPax((p) => Math.max(1, p - 1))}
                className="w-10 h-10 border border-border text-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="font-display text-3xl min-w-[3rem] text-center">{pax}</div>
              <button
                onClick={() => setPax((p) => Math.min(7, p + 1))}
                className="w-10 h-10 border border-border text-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-center mt-2">
              {t("calc.maxPax")}
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground flex items-center gap-1">
                <Moon className="w-3 h-3" /> {t("calc.nightRate")}
              </span>
              <button
                onClick={() => setNight((n) => !n)}
                className={`relative w-12 h-6 rounded-full transition-colors ${night ? "bg-primary" : "bg-muted"}`}
                aria-label="Toggle night rate"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform ${
                    night ? "translate-x-6 bg-background" : "bg-foreground/60"
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {isFixed && (
          <div className="bg-background border border-border rounded-md p-6 mb-4 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground flex items-center gap-1">
              <Moon className="w-3 h-3" /> {t("calc.nightRate")}
            </span>
            <button
              onClick={() => setNight((n) => !n)}
              className={`relative w-12 h-6 rounded-full transition-colors ${night ? "bg-primary" : "bg-muted"}`}
              aria-label="Toggle night rate"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform ${
                  night ? "translate-x-6 bg-background" : "bg-foreground/60"
                }`}
              />
            </button>
          </div>
        )}

        {/* Result */}
        <div className="rounded-md p-7 text-center border border-primary bg-gradient-to-br from-primary/10 to-background">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {t("calc.estimated")}
          </p>
          <div className="font-display text-5xl text-primary leading-none mb-1">€{total}</div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-6">
            {night ? `${t("calc.base")} €${base} + ${t("calc.nightSurcharge")} €${nightExtra}` : t("calc.fixedPrice")}
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/80 tracking-[0.2em] uppercase text-xs font-bold py-6">
              <MessageCircle className="w-4 h-4" />
              {t("calc.bookWhatsapp")}
            </Button>
          </a>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-4">
            {(t("calc.includes", { returnObjects: true }) as string[]).map((item) => (
              <span key={item} className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
                <span className="text-primary">✓</span> {item}
              </span>
            ))}
            <a
              href={`https://wa.me/306949393700?text=${encodeURIComponent(t("calc.askOtherMsg"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-[0.15em] uppercase text-primary hover:text-primary/80 underline underline-offset-2"
            >
              ✉ {t("calc.askOther")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
