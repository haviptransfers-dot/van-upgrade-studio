import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { LANGUAGES, basePath, pageUrl } from "@/lib/languagePaths";
export default function PageHead({ title, description, article = false }: { title?: string; description?: string; article?: boolean }) {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const path = basePath(pathname);
  const language = i18n.language.split("-")[0];
  return <Helmet>
    <html lang={language} dir={language === "he" || language === "ar" ? "rtl" : "ltr"} />
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    <link rel="canonical" href={pageUrl(path, language)} />
    {LANGUAGES.map((lang) => <link key={lang} rel="alternate" hrefLang={lang} href={pageUrl(path, lang)} />)}
    <link rel="alternate" hrefLang="x-default" href={pageUrl(path, "en")} />
    <meta property="og:url" content={pageUrl(path, language)} />
    <meta property="og:type" content={article ? "article" : "website"} />
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {title && <meta name="twitter:title" content={title} />}
    {description && <meta name="twitter:description" content={description} />}
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>;
}