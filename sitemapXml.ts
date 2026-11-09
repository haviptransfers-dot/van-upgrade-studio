import { seoRoutes } from "./src/seoRoutes";
import { LANGUAGES, pageUrl } from "./src/lib/languagePaths";

export function sitemapXml(slugs: string[]) {
  const paths = ["/", ...seoRoutes.map((route) => route.path), "/about", "/blog", "/privacy-policy", "/child-seats", ...slugs.map((slug) => `/blog/${slug}`)];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${LANGUAGES.flatMap((language) => [...new Set(paths)].map((pathname) => `  <url><loc>${pageUrl(pathname, language)}</loc>${[...LANGUAGES, "x-default"].map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate}" href="${pageUrl(pathname, alternate === "x-default" ? "en" : alternate)}" />`).join("")}</url>`)).join("\n")}\n</urlset>\n`;
}
