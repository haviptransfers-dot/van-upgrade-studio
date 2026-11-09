import { useTranslation } from "react-i18next";
import Link from "./LocalizedLink";
const tours = [
  ["/athens-city-tour", "athensTour.title", "athens-private-tour-with-driver"],
  ["/cape-sounion-tour", "sounionTour.title", "cape-sounion-private-tour"],
  ["/delphi-private-tour", "delphiTour.title", "delphi-private-day-trip-from-athens"],
  ["/meteora-private-tour", "meteoraTour.title", "meteora-private-tour-from-athens"],
  ["/nafplio-private-tour", "nafplioTour.title", "athens-to-nafplio-private-tour"],
];
export default function RelatedTravelLinks({ current }: { current?: string }) {
  const { t } = useTranslation();
  return <section className="px-4 py-12 border-t border-border"><div className="container mx-auto max-w-4xl">
    <h2 className="font-display text-2xl text-primary mb-6">{t("seoContent.relatedHeading")}</h2>
    <div className="flex flex-wrap gap-x-6 gap-y-3">{tours.filter(([path]) => path !== current).map(([path, key]) => <Link key={path} to={path} className="text-sm text-primary underline underline-offset-4">{t(key)}</Link>)}
      <Link to="/blog/athens-to-nafplio-private-tour" reloadDocument className="text-sm text-primary underline underline-offset-4">{t("nafplioTour.title")} · {t("blog.nav")}</Link>
      <Link to="/blog" className="text-sm text-primary underline underline-offset-4">{t("blog.title")}</Link>
      <Link to="/child-seats" className="text-sm text-primary underline underline-offset-4">{t("seoContent.childTitle")}</Link>
    </div>
  </div></section>;
}