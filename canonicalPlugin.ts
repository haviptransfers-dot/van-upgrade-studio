import type { Plugin } from "vite";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { seoRoutes } from "./src/seoRoutes";
import { LANGUAGES, localizedPath } from "./src/lib/languagePaths";

const SITE = "https://haviptransfers.gr";

export function canonicalPaths() {
  const catalog = readFileSync(new URL("./src/data/blogPosts.ts", import.meta.url), "utf8")
    + readFileSync(new URL("./src/data/nafplio.ts", import.meta.url), "utf8");
  const slugs = [...catalog.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  const paths = [...new Set(["/", ...seoRoutes.map((route) => route.path), "/about", "/blog", "/privacy-policy", "/child-seats", ...slugs.map((slug) => `/blog/${slug}`)])];
  return LANGUAGES.flatMap((language) => paths.map((path) => localizedPath(path, language)));
}

export function pageCanonicalHtml(html: string, requestPath: string, paths = canonicalPaths()) {
  let pathname = requestPath.split(/[?#]/)[0].replace(/\/index\.html$/, "/").replace(/\/+$/, "") || "/";
  if (/^\/(el|de|es|fr|it|he|ar)$/.test(pathname)) pathname += "/";
  const withoutCanonical = html.replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi, "");
  if (!paths.includes(pathname)) return withoutCanonical;
  const url = `${SITE}${pathname}`;
  return withoutCanonical
    .replace("</head>", `<link rel="canonical" id="static-canonical" href="${url}" />\n  </head>`)
    .replace(/(<meta\b[^>]*property="og:url"[^>]*content=")[^"]*(")/, `$1${url}$2`);
}

export function canonicalPlugin(): Plugin {
  return {
    name: "public-page-canonicals",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html, context) {
        return pageCanonicalHtml(html, context.originalUrl ?? context.path);
      },
    },
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") throw new Error("Missing index.html for public-page canonicals");
      const html = typeof index.source === "string" ? index.source : new TextDecoder().decode(index.source);
      for (const pathname of canonicalPaths()) {
        if (pathname === "/") continue;
        const fileName = `${pathname.slice(1)}/index.html`;
        // Preserve independently generated article documents and their metadata.
        if (bundle[fileName]) continue;
        this.emitFile({ type: "asset", fileName, source: pageCanonicalHtml(html, pathname) });
      }
    },
  };
}