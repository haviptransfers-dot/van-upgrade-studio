import { Helmet } from "react-helmet-async";
import Index from "./Index";

interface SeoPageProps {
  title: string;
  description: string;
  path: string;
}

const SITE_URL = "https://van-move-boost.lovable.app";

const SeoPage = ({ title, description, path }: SeoPageProps) => {
  const url = `${SITE_URL}${path}`;
  return (
    <>
      <Helmet>
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
