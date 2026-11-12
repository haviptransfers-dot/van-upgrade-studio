import { useTranslation } from "react-i18next";
import ChildSeats from "@/components/ChildSeats";
import PageHead from "@/components/PageHead";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "@/components/LocalizedLink";
export default function ChildSeatsPage() {
  const { t } = useTranslation();
  return <div className="min-h-screen bg-background">
    <PageHead title={`${t("seoContent.childMetaTitle", { defaultValue: t("seoContent.childTitle") })} | H&A VIP Tours`} description={t("seoContent.childDescription")} />
    <header className="px-4 py-4 border-b border-border"><div className="container mx-auto flex flex-wrap gap-4 items-center justify-between"><Link to="/" className="text-primary">H&A TOURS</Link><LanguageSwitcher /></div></header>
    <h1 className="font-display text-3xl md:text-5xl text-center px-4 pt-12">{t("seoContent.childTitle")}</h1>
    <ChildSeats />
  </div>;
}