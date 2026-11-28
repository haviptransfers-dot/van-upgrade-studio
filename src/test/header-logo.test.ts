import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const page = readFileSync("src/pages/Index.tsx", "utf8");
const snapshot = readFileSync("src/first-screen.html", "utf8");
const critical = readFileSync("src/critical-screen.css", "utf8");
const styles = readFileSync("src/index.css", "utf8");
const tailwind = readFileSync("tailwind.config.ts", "utf8");
const logo = readFileSync("src/assets/logo-header.webp");

/** Intrinsic size of a WebP so the rendered logo can be checked against it. */
function webpSize(buf: Buffer) {
  expect(buf.subarray(0, 4).toString("latin1")).toBe("RIFF");
  expect(buf.subarray(8, 12).toString("latin1")).toBe("WEBP");
  const fourcc = buf.subarray(12, 16).toString("latin1");
  if (fourcc === "VP8 ") {
    expect([buf[23], buf[24], buf[25]]).toEqual([0x9d, 0x01, 0x2a]);
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (fourcc === "VP8L") {
    expect(buf[21]).toBe(0x2f);
    const bits = buf.readUInt32LE(22);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  throw new Error(`unsupported webp chunk ${fourcc}`);
}

const navTag = page.match(/<nav className="home-navigation[^"]*"/)?.[0] ?? "";
const logoImg = page.match(/<img src=\{headerLogo\}[^>]*>/)?.[0] ?? "";
const snapshotLogoImg = snapshot.match(/<img alt="H&amp;A Tours"[^>]*>/)?.[0] ?? "";

describe("homepage header logo", () => {
  it("shows the uploaded logo image instead of the brand text", () => {
    expect(page).toContain('import headerLogo from "@/assets/logo-header.webp"');
    expect(logoImg).not.toBe("");
    expect(logoImg).toContain('alt="H&A Tours"');
    expect(page).not.toContain(">H&A TOURS<");
    expect(page).not.toContain("logoImg");
  });

  it("keeps the logo unsquashed at 48px on mobile and 56px on desktop", () => {
    const { width, height } = webpSize(logo);
    expect(logoImg).toContain("h-12");
    expect(logoImg).toContain("md:h-14");
    expect(logoImg).toContain("w-auto");
    expect(logoImg).toContain("object-contain");
    expect(logoImg).toContain(`width={${width}}`);
    expect(logoImg).toContain(`height={${height}}`);
    expect(width).not.toBe(height);
  });

  it("sits on a clean black header with no border, shadow or translucent panel", () => {
    expect(navTag).toContain("bg-header");
    for (const unwanted of ["border-b", "border-border", "shadow", "bg-background/90", "backdrop-blur"]) {
      expect(navTag).not.toContain(unwanted);
    }
    expect(styles).toContain("--header: 0 0% 0%;");
    expect(tailwind).toContain('header: "hsl(var(--header))"');
  });

  it("paints the same header from the first-screen snapshot", () => {
    const snapshotNav = snapshot.match(/<nav class="home-navigation[^"]*"/)?.[0] ?? "";
    expect(snapshotNav).toContain("bg-header");
    expect(snapshotNav).not.toContain("bg-background/90");
    expect(snapshotNav).not.toContain("border-b");
    expect(snapshot).not.toContain("H&amp;A TOURS");
    expect(snapshotLogoImg).toContain("data:image/webp;base64,");
    expect(snapshotLogoImg).toContain("h-12");
    expect(snapshotLogoImg).toContain("md:h-14");
    expect(snapshotLogoImg).toContain("w-auto");
  });

  it("ships the snapshot's own sizing rules in the critical stylesheet", () => {
    expect(critical).toContain("--header: 0 0% 0%;");
    expect(critical).toContain(".h-12 { height: 3rem; }");
    expect(critical).toContain(".w-auto { width: auto; }");
    expect(critical).toContain(".bg-header { background-color: hsl(var(--header)); }");
    expect(critical).toContain("@media (min-width: 768px) { .md\\:h-14 { height: 3.5rem; } }");
  });
});
