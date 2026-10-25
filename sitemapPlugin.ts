import type { Plugin, ViteDevServer } from "vite";
import { createServer } from "vite";
import path from "node:path";
import { seoRoutes } from "./src/seoRoutes";

export function sitemapXml(slugs: string[]) {
  const paths = ["/", ...seoRoutes.map((route) => route.path), "/about", "/blog", ...slugs.map((slug) => `/blog/${slug}`)];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(paths)].map((pathname) => `  <url><loc>https://haviptransfers.gr${pathname}</loc></url>`).join("\n")}\n</urlset>\n`;
}

async function generate(server: ViteDevServer) {
  const { blogPosts } = await server.ssrLoadModule("/src/data/blogPosts.ts");
  return sitemapXml(blogPosts.map((post: { slug: string }) => post.slug));
}

export function sitemapPlugin(): Plugin {
  return {
    name: "public-page-sitemap",
    configureServer(server) {
      server.middlewares.use("/sitemap.xml", async (_req, res) => {
        try {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(await generate(server));
        } catch {
          res.statusCode = 500;
          res.end("Sitemap generation failed");
        }
      });
    },
    async generateBundle() {
      const server = await createServer({ configFile: false, logLevel: "silent", server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", resolve: { alias: { "@": path.resolve("src") } } });
      try { this.emitFile({ type: "asset", fileName: "sitemap.xml", source: await generate(server) }); }
      finally { await server.close(); }
    },
  };
}