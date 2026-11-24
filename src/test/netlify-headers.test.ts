import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const rules = new Map<string, Map<string, string>>();
let current = new Map<string, string>();
for (const line of readFileSync("public/_headers", "utf8").split("\n")) {
  if (line.startsWith("/")) {
    current = new Map();
    rules.set(line, current);
  } else if (line.trim()) {
    const separator = line.indexOf(":");
    current.set(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
  }
}
const global = rules.get("/*");

describe("Netlify response header rules", () => {
  it("enables HSTS for one year including subdomains", () => {
    expect(global?.get("Strict-Transport-Security")).toBe("max-age=31536000; includeSubDomains");
  });
  it("disables content sniffing", () => {
    expect(global?.get("X-Content-Type-Options")).toBe("nosniff");
  });
  it("denies framing", () => {
    expect(global?.get("X-Frame-Options")).toBe("DENY");
  });
  it("limits cross-origin referrer information", () => {
    expect(global?.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  });
  it("disables the specified browser capabilities", () => {
    expect(global?.get("Permissions-Policy")).toBe("camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()");
  });
  it("enforces only the requested structural CSP", () => {
    expect(global?.get("Content-Security-Policy")).toBe("frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests");
  });
  it("keeps the full resource policy report-only without a reporting endpoint", () => {
    expect(global?.get("Content-Security-Policy-Report-Only")).toBe("default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://tracker.metricool.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://tracker.metricool.com; font-src 'self'; media-src 'self'; connect-src 'self' https://ktlblybihpjitxchrawh.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://tracker.metricool.com; frame-src 'none'; worker-src 'self' blob:; manifest-src 'self'");
  });
  it("caches hashed assets immutably for one year", () => {
    expect(rules.get("/assets/*")?.get("Cache-Control")).toBe("public, max-age=31536000, immutable");
  });
  it("caches static media for seven days without immutable", () => {
    expect(rules.get("/static-media/*")?.get("Cache-Control")).toBe("public, max-age=604800");
  });
});