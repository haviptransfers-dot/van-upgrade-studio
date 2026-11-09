// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { canonicalPaths, pageCanonicalHtml, canonicalPlugin } from "../../canonicalPlugin";

const template = readFileSync("index.html", "utf8");
const canonicals = (html: string) => [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)].map((match) => match[1]);

describe("self-referencing public page canonicals", () => {
  it.each(["/blog", "/about"])("sets %s to its own production URL", (pathname) => {
    expect(canonicals(pageCanonicalHtml(template, pathname))).toEqual([`https://haviptransfers.gr${pathname.replace(/\/+$/, "")}/`]);
  });

  it("covers every sitemap page and every article with one canonical", () => {
    const urls = [...readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(canonicalPaths().map((pathname) => `https://haviptransfers.gr${pathname.replace(/\/+$/, "")}/`).sort()).toEqual(urls.sort());
    for (const url of urls) {
      const html = pageCanonicalHtml(template, new URL(url).pathname);
      expect(canonicals(html)).toEqual([url]);
      expect(html).toContain(`<meta property="og:url" content="${url}"`);
    }
  });

  it("replaces inherited tags and strips queries and trailing slash aliases", () => {
    const inherited = pageCanonicalHtml(template, "/");
    expect(canonicals(pageCanonicalHtml(inherited, "/blog/?lang=el"))).toEqual(["https://haviptransfers.gr/blog/"]);
    expect(canonicals(pageCanonicalHtml(inherited, "/about/index.html"))).toEqual(["https://haviptransfers.gr/about/"]);
    expect(canonicals(pageCanonicalHtml(inherited, "/missing-page"))).toEqual([]);
  });

  it("emits static page documents without replacing independent article HTML", () => {
    const plugin = canonicalPlugin();
    const emitted: { fileName: string; source: string }[] = [];
    const article = "blog/athens-to-nafplio-private-tour/index.html";
    const bundle = {
      "index.html": { type: "asset", source: pageCanonicalHtml(template, "/") },
      [article]: { type: "asset", source: "Independent article" },
    };
    const handler = typeof plugin.generateBundle === "function" ? plugin.generateBundle : plugin.generateBundle?.handler;
    if (!handler) throw new Error("Missing canonical document generation");
    handler.call({ emitFile: (asset: { fileName: string; source: string }) => emitted.push(asset) } as never, {} as never, bundle as never, false);
    expect(emitted).toHaveLength(canonicalPaths().length - 2);
    expect(emitted.some((asset) => asset.fileName === article)).toBe(false);
    for (const asset of emitted) {
      expect(canonicals(asset.source)).toEqual([`https://haviptransfers.gr/${asset.fileName.replace(/index\.html$/, "")}`]);
    }
  });
});