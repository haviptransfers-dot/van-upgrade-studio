// @vitest-environment node
import { execFileSync, spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it, vi } from "vitest";
import { generateSitemap, publicPaths, ROOT } from "../../scripts/public-pages.mjs";
import { fetchWithRetry, hasOrganization, jsonLdBlocks, numericOption, UnavailableError } from "../../scripts/smoke-helpers.mjs";
import { sitemapXml } from "../../sitemapXml";
import { smokeSummary } from "../../scripts/smoke-summary.mjs";

describe("CI script regressions", () => {
  it("automatically repairs an outdated sitemap before npm test", () => {
    const staging = mkdtempSync(join(tmpdir(), "sitemap-autofix-"));
    try {
      for (const path of ["scripts/sync-sitemap.mjs", "scripts/public-pages.mjs", "src/seoRoutes.ts", "src/data/blogPosts.ts", "src/data/nafplio.ts"]) {
        mkdirSync(dirname(join(staging, path)), { recursive: true });
        copyFileSync(join(ROOT, path), join(staging, path));
      }
      mkdirSync(join(staging, "public"));
      writeFileSync(join(staging, "public/sitemap.xml"), "outdated sitemap");
      const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
      expect(pkg.scripts.pretest).toBe("node scripts/sync-sitemap.mjs");
      execFileSync(process.execPath, [join(staging, "scripts/sync-sitemap.mjs")]);
      expect(readFileSync(join(staging, "public/sitemap.xml"), "utf8")).toBe(generateSitemap());
    } finally { rmSync(staging, { recursive: true, force: true }); }
  });

  it("summarizes passed, failed and skipped outcomes without optional environment variables", () => {
    const result = { section: "sitemap", label: "valid sitemap" };
    expect(smokeSummary("https://example.test", [result], [], [])).toContain("## Smoke test PASSED");
    const failed = smokeSummary("https://example.test", [result], [{ section: "robots.txt", label: "wrong reference" }], []);
    expect(failed).toContain("## Smoke test FAILED");
    expect(failed).toContain("| 1 | 1 | 0 |");
    expect(failed).toContain("[robots.txt] wrong reference");
    expect(smokeSummary("https://example.test", [], [], [result])).toContain("## Smoke test SKIPPED (incomplete)");
  });
  it("generates the same production sitemap as the build, including Nafplio", () => {
    const paths = publicPaths();
    const slugs = paths.filter((path: string) => path.startsWith("/blog/")).map((path: string) => path.slice(6));
    expect(generateSitemap()).toBe(sitemapXml(slugs));
    expect(paths).toContain("/blog/athens-to-nafplio-private-tour");
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("regenerates and checks the sitemap from any working directory without optional env", () => {
    const script = `${ROOT}scripts/sync-sitemap.mjs`;
    const env = { ...process.env };
    delete env.VITE_SUPABASE_URL;
    delete env.VITE_SUPABASE_PUBLISHABLE_KEY;
    delete env.GITHUB_STEP_SUMMARY;
    execFileSync(process.execPath, [script], { cwd: "/tmp", env });
    expect(execFileSync(process.execPath, [script, "--check"], { cwd: "/tmp", env, encoding: "utf8" })).toContain("up to date");
    expect(readFileSync(`${ROOT}public/sitemap.xml`, "utf8")).toBe(generateSitemap());
  });

  it("defaults missing, invalid and zero retry counts to three", () => {
    for (const value of [undefined, "", "invalid", "0", "-1"]) expect(numericOption(value, 3, 1)).toBe(3);
    expect(numericOption("1", 3, 1)).toBe(1);
  });

  it("retries temporary unavailability and succeeds on recovery", async () => {
    const fetcher = vi.fn().mockRejectedValueOnce(new Error("network offline"))
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({ ok: true, text: async () => "recovered" });
    expect(await fetchWithRetry("https://example.test", { retries: 3, delay: 0, fetcher })).toBe("recovered");
    expect(fetcher).toHaveBeenCalledTimes(3);
  });

  it("classifies exhausted transient failures as unavailable, not passed", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    await expect(fetchWithRetry("https://example.test", { retries: 2, delay: 0, fetcher })).rejects.toBeInstanceOf(UnavailableError);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("does not suppress permanent HTTP failures", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false, status: 404 });
    await expect(fetchWithRetry("https://example.test", { retries: 3, delay: 0, fetcher })).rejects.toThrow("HTTP 404");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("accepts Organization in a JSON-LD graph with reordered script attributes", () => {
    const blocks = jsonLdBlocks(`<script data-extra="yes" type='application/ld+json'>{"@graph":[{"@type":["Organization"],"name":"H&A Tours"}]}</script>`);
    expect(hasOrganization(blocks)).toBe(true);
    expect(hasOrganization([{ "@type": "Service" }])).toBe(false);
    expect(() => jsonLdBlocks(`<script type="application/ld+json">invalid</script>`)).toThrow();
  });

  it("exits successfully with explicit incomplete status during a whole-site outage", async () => {
    const staging = mkdtempSync(join(tmpdir(), "smoke-summary-"));
    const summary = join(staging, "summary.md");
    const server = createServer((_req, res) => { res.writeHead(503); res.end("Temporarily unavailable"); });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
      const address = server.address();
      if (!address || typeof address === "string") throw new Error("Test server address missing");
      const child = spawn(process.execPath, [`${ROOT}scripts/smoke-test.mjs`, `http://127.0.0.1:${address.port}`], {
        cwd: "/tmp", env: { ...process.env, GITHUB_STEP_SUMMARY: summary, SMOKE_RETRIES: "1", SMOKE_RETRY_DELAY_MS: "0" },
      });
      let output = "";
      child.stdout.on("data", (chunk) => { output += chunk; });
      child.stderr.on("data", (chunk) => { output += chunk; });
      const exit = await new Promise((resolve, reject) => { child.on("error", reject); child.on("close", resolve); });
      expect(exit).toBe(0);
      expect(output).toContain("Smoke checks incomplete");
      expect(output).not.toContain("All smoke checks passed");
      const report = readFileSync(summary, "utf8");
      expect(report).toContain("## Smoke test SKIPPED (incomplete)");
      expect(report).toContain("| Passed | Failed | Skipped |");
      expect(report).toContain("[structured-data]");
      expect(report).toContain("[seo-head]");
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
      rmSync(staging, { recursive: true, force: true });
    }
  });
});