import { createServer, type Plugin, type ViteDevServer } from "vite";
import { canonicalPaths } from "./canonicalPlugin";
import { basePath, languageFromPath, LEGACY_SLUGS, localizedPath } from "./src/lib/languagePaths";
export const MAX_PRERENDER_PAGES = 1000;
type Renderer = { renderPage(path: string): Promise<{ body: string; head: string }> };
export async function multilingualHtml(template: string, pathname: string, renderer: Renderer) {
  const language = languageFromPath(pathname);
  const { body, head } = await renderer.renderPage(pathname);
  const cleaned = template
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b(?=[^>]*(?:name=["'](?:description|twitter:title|twitter:description)["']|property=["']og:(?:title|description|url|locale|type)["']))[^>]*>/gi, "")
    .replace(/<link\b(?=[^>]*rel=["'](?:canonical|alternate)["'])[^>]*>/gi, "")
    .replace(/<div id="first-screen">[\s\S]*?(?=<div id="root")/, "")
    .replace(/<script>if \(location.pathname[\s\S]*?<\/script>/, "")
    .replace(/<html\b[^>]*>/, `<html lang="${language}" dir="${language === "he" || language === "ar" ? "rtl" : "ltr"}">`);
  const staticHead = head.replace(/<(meta|link|title|script)\b/g, '<$1 data-static-head="true"');
  return cleaned.replace("</head>", `${staticHead}</head>`)
    .replace('<div id="root"></div>', `<div id="first-screen" data-page-snapshot>${body}</div><div id="root"></div>`)
    .replace('<body>', '<body class="first-paint">');
}
export function multilingualPlugin(): Plugin {
  let dev: ViteDevServer | undefined;
  return {
    name: "translated-static-pages", enforce: "post",
    configureServer(server) {
      dev = server;
      server.middlewares.use(async (req, res, next) => {
        const requestPath = req.url?.split("?")[0] ?? "/";
        const language = languageFromPath(requestPath);
        const base = basePath(requestPath.replace(/\/index\.html$/, "/"));
        const slug = base.startsWith("/blog/") ? base.slice(6) : "";
        if (LEGACY_SLUGS[slug]) { res.statusCode = 301; res.setHeader("Location", localizedPath(`/blog/${LEGACY_SLUGS[slug]}`, language)); res.end(); return; }
        if (!canonicalPaths().includes(localizedPath(base, language))) return next();
        try {
          const { readFile } = await import("node:fs/promises");
          const template = await server.transformIndexHtml(requestPath, await readFile("index.html", "utf8"));
          const renderer = await server.ssrLoadModule("/src/static-entry.tsx") as Renderer;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(await multilingualHtml(template, localizedPath(base, language), renderer));
        } catch (error) { next(error as Error); }
      });
    },
    async generateBundle(_options, bundle) {
      const paths = canonicalPaths();
      if (paths.length > MAX_PRERENDER_PAGES) throw new Error("Static language page limit exceeded");
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") throw new Error("Missing HTML template");
      const template = typeof index.source === "string" ? index.source : new TextDecoder().decode(index.source);
      const server = dev ?? await createServer({ server: { middlewareMode: true }, appType: "custom", plugins: [], configFile: "vite.config.ts" });
      try {
        const renderer = await server.ssrLoadModule("/src/static-entry.tsx") as Renderer;
        for (const pathname of paths) {
          const fileName = pathname === "/" ? "index.html" : `${pathname.replace(/^\//, "").replace(/\/$/, "")}/index.html`;
          const html = await multilingualHtml(template, pathname, renderer);
          const existing = bundle[fileName];
          if (existing?.type === "asset") existing.source = html;
          else this.emitFile({ type: "asset", fileName, source: html });
        }
      } finally { if (!dev) await server.close(); }
    },
  };
}