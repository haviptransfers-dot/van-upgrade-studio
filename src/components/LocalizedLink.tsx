import { Link, type LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizedPath } from "@/lib/languagePaths";
export default function LocalizedLink({ to, ...props }: LinkProps) {
  const { i18n } = useTranslation();
  const target = typeof to === "string" ? localizedPath(to, i18n.language) : { ...to, pathname: to.pathname ? localizedPath(to.pathname, i18n.language) : undefined };
  return <Link {...props} to={target} />;
}