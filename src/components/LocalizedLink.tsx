import { Link, type LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { linkPath } from "@/lib/languagePaths";
export default function LocalizedLink({ to, ...props }: LinkProps) {
  const { i18n } = useTranslation();
  const target = typeof to === "string" ? linkPath(to, i18n.language) : { ...to, pathname: to.pathname ? linkPath(to.pathname, i18n.language) : undefined };
  return <Link {...props} to={target} />;
}