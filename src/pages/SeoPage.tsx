import PageHead from "@/components/PageHead";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Index from "./Index";
import ServiceStructuredData from "@/components/ServiceStructuredData";

interface SeoPageProps {
  routeKey: string;
  path: string;
}

const SITE_URL = "https://haviptransfers.gr";

const SeoPage = ({ routeKey, path }: SeoPageProps) => {
  const { t, i18n } = useTranslation();
  const url = `${SITE_URL}${path}`;
  const title = t(routeKey === "piraeus" ? "seoContent.piraeusTitle" : `seo.${routeKey}.title`);
  const description = t(routeKey === "piraeus" ? "seoContent.piraeusDescription" : `seo.${routeKey}.description`);
  return (
    <>
      <ServiceStructuredData path={path} />
      <PageHead />
      <Helmet>
        <html lang={i18n.language} />
        <title>{title}</title>
        <meta name="description" content={description} />


        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Index routeKey={routeKey} />
    </>
  );
};

export default SeoPage;
