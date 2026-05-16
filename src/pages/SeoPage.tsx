import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Index from "./Index";

interface SeoPageProps {
  routeKey: string;
  path: string;
}

const SITE_URL = "https://haviptransfers.gr";

const SeoPage = ({ routeKey, path }: SeoPageProps) => {
  const { t, i18n } = useTranslation();
  const url = `${SITE_URL}${path}`;
  const title = t(`seo.${routeKey}.title`);
  const description = t(`seo.${routeKey}.description`);
  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Index />
    </>
  );
};

export default SeoPage;
