import SiteFooter from "@/components/SiteFooter";
import Link from "@/components/LocalizedLink";
import { useTranslation } from "react-i18next";
import PageHead from "@/components/PageHead";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type Block = { kind: "p"; text: string } | { kind: "ul"; items: string[] };

/** Paragraphs starting with "- " are list items; consecutive items render as one list. */
function toBlocks(paragraphs: string[]): Block[] {
  const blocks: Block[] = [];
  for (const p of paragraphs) {
    if (p.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      if (last && last.kind === "ul") last.items.push(p.slice(2));
      else blocks.push({ kind: "ul", items: [p.slice(2)] });
    } else {
      blocks.push({ kind: "p", text: p });
    }
  }
  return blocks;
}

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const translated = t("seoContent.privacySections", { returnObjects: true }) as { heading: string; paragraphs: string[] }[];
  return (
  <>
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
            {toBlocks(s.paragraphs).map((b, i) =>
              b.kind === "p" ? (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {b.text}
                </p>
              ) : (
                <ul key={i} className="list-disc ps-5 space-y-1 mb-2 text-sm text-muted-foreground leading-relaxed">
                  {b.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}
      </div>
      <Link to="/" className="inline-block mt-10 text-primary hover:text-primary/80 text-sm underline underline-offset-4">
        {t("blog.backHome")}
      </Link>
    </div>
  </main>
  <SiteFooter />
  </>
);
};

export default PrivacyPolicy;
