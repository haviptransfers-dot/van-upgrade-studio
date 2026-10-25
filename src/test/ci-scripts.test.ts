import { execFileSync, spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { generateSitemap, publicPaths, ROOT } from "../../scripts/public-pages.mjs";
import { fetchWithRetry, hasOrganization, jsonLdBlocks, numericOption, UnavailableError } from "../../scripts/smoke-helpers.mjs";
import { sitemapXml } from "../../sitemapXml";

describe("CI script regressions", () => {
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
    const server = createServer((_req, res) => { res.writeHead(503); res.end("Temporarily unavailable"); });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
      const address = server.address();
      if (!address || typeof address === "string") throw new Error("Test server address missing");
      const child = spawn(process.execPath, [`${ROOT}scripts/smoke-test.mjs`, `http://127.0.0.1:${address.port}`], {
        cwd: "/tmp", env: { ...process.env, GITHUB_STEP_SUMMARY: "", SMOKE_RETRIES: "1", SMOKE_RETRY_DELAY_MS: "0" },
      });
      let output = "";
      child.stdout.on("data", (chunk) => { output += chunk; });
      child.stderr.on("data", (chunk) => { output += chunk; });
      const exit = await new Promise((resolve, reject) => { child.on("error", reject); child.on("close", resolve); });
      expect(exit).toBe(0);
      expect(output).toContain("Smoke checks incomplete");
      expect(output).not.toContain("All smoke checks passed");
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  });
});