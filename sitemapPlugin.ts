import type { Plugin, ViteDevServer } from "vite";
import { createServer } from "vite";
import path from "node:path";
import { sitemapXml } from "./sitemapXml";

export { sitemapXml };

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