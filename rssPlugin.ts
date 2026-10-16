import type { Plugin, ViteDevServer } from "vite";
import { createServer } from "vite";

const SITE = "https://haviptransfers.gr";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function buildRss(server: ViteDevServer): Promise<string> {
  const mod = await server.ssrLoadModule("/src/data/blogPosts.ts");
  const posts = [...(mod.blogPosts as Array<{ slug: string; title: string; excerpt: string; date: string }>)].sort(
    (a, b) => b.date.localeCompare(a.date),
  );
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
      <description>${esc(p.excerpt)}</description>
      <pubDate>${new Date(p.date + "T09:00:00Z").toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>H&amp;A VIP Tours Blog</title>
    <link>${SITE}/blog</link>
    <description>Travel guides and private transfer tips for Athens and Greece by H&amp;A VIP Tours.</description>
    <language>en</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

export function rssPlugin(): Plugin {
  return {
    name: "blog-rss",
    configureServer(server) {
      server.middlewares.use("/rss.xml", async (_req, res) => {
        try {
          res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
          res.end(await buildRss(server));
        } catch (e) {
          res.statusCode = 500;
          res.end(String(e));
        }
      });
    },
    async generateBundle() {
      const server = await createServer({
        configFile: false,
        logLevel: "silent",
        server: { middlewareMode: true, hmr: false, ws: false },
        appType: "custom",
        resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
      });
      try {
        this.emitFile({ type: "asset", fileName: "rss.xml", source: await buildRss(server) });
      } finally {
        await server.close();
      }
    },
  };
}
