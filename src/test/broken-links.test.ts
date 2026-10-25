import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { seoRoutes } from "../seoRoutes";

// Collect every internal link written in the source and verify each one
// resolves to a real public route, blog article, or public file.

const SOURCE_DIRS = ["src"];
const SOURCE_EXT = /\.(ts|tsx|md)$/;

const listFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return listFiles(full);
    return SOURCE_EXT.test(entry) ? [full] : [];
  });

const blogSlugs = [
  ...(readFileSync("src/data/blogPosts.ts", "utf8") + readFileSync("src/data/nafplio.ts", "utf8")).matchAll(
    /slug:\s*"([^"]+)"/g,
  ),
].map((match) => match[1]);

const validPaths = new Set<string>([
  "/",
  "/about",
  "/blog",
  "/privacy-policy",
  ...seoRoutes.map((route) => route.path),
  ...blogSlugs.map((slug) => `/blog/${slug}`),
]);

// Public files and server endpoints that are valid link targets but not app routes.
const publicFiles = new Set(["/sitemap.xml", "/robots.txt", "/llms.txt", "/rss.xml", "/.well-known/ai-catalog.json"]);

const isValidTarget = (path: string) =>
  validPaths.has(path) || publicFiles.has(path) || path.startsWith("/functions/");

const collectInternalLinks = (source: string): string[] => {
  const links = new Set<string>();
  const patterns = [
    /(?:to|href)\s*=\s*["'`](\/[a-z0-9][a-z0-9/_-]*)["'`]/gi, // JSX to=/href=
    /navigate\(\s*["'`](\/[a-z0-9][a-z0-9/_-]*)["'`]/gi, // navigate("...")
    /\]\((\/[a-z0-9][a-z0-9/_-]*)\)/gi, // markdown links
    /window\.location\.href\s*=\s*["'`](\/[a-z0-9][a-z0-9/_-]*)["'`]/gi,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const path = match[1].replace(/\/$/, "") || "/";
      if (!/\.[a-z0-9]+$/i.test(path)) links.add(path); // skip asset paths like /images/x.webp
    }
  }
  return [...links];
};

describe("broken internal links", () => {
  const files = SOURCE_DIRS.flatMap(listFiles);
  const found = files.flatMap((file) =>
    collectInternalLinks(readFileSync(file, "utf8")).map((path) => ({ file, path })),
  );

  it("finds internal links to check", () => {
    expect(found.length).toBeGreaterThan(0);
  });

  it("every internal link resolves to a public page, article, or file", () => {
    const broken = found.filter(({ path }) => !isValidTarget(path));
    expect(
      broken.map(({ file, path }) => `${file} -> ${path}`),
      `broken internal links:\n${broken.map(({ file, path }) => `  ${file} -> ${path}`).join("\n")}`,
    ).toEqual([]);
  });

  it("every blog article is reachable (linked from the sitemap route set)", () => {
    for (const slug of blogSlugs) expect(validPaths.has(`/blog/${slug}`)).toBe(true);
  });
});
