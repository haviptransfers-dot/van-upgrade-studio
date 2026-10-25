import { seoRoutes } from "./src/seoRoutes";

export function sitemapXml(slugs: string[]) {
  const paths = ["/", ...seoRoutes.map((route) => route.path), "/about", "/blog", "/privacy-policy", ...slugs.map((slug) => `/blog/${slug}`)];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(paths)].map((pathname) => `  <url><loc>https://haviptransfers.gr${pathname}</loc></url>`).join("\n")}\n</urlset>\n`;
}
