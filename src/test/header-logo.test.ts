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
const navRow = page.match(/<nav className="home-navigation[^"]*">\s*<div className="([^"]*)"/)?.[1] ?? "";
const brandWrap = page.match(/<div className="([^"]*)">\s*<img src=\{headerLogo\}/)?.[1] ?? "";
const logoImg = page.match(/<img src=\{headerLogo\}[^>]*>/)?.[0] ?? "";
const controlsWrap = page.match(/<div className="([^"]*flex-shrink-0[^"]*)">\s*<a href=\{whatsappUrl\}/)?.[1] ?? "";
const snapshotNav = snapshot.match(/<nav class="home-navigation[\s\S]*?<\/nav>/)?.[0] ?? "";
const snapshotRow = snapshotNav.match(/<div class="([^"]*)"/)?.[1] ?? "";
const snapshotLogoImg = snapshot.match(/<img alt="H&amp;A Tours"[^>]*>/)?.[0] ?? "";
const snapshotBrand = snapshot.match(/<div class="([^"]*)">\s*<img alt="H&amp;A Tours"/)?.[1] ?? "";
const snapshotControls = snapshot.match(/<div class="([^"]*flex-shrink-0[^"]*)">/)?.[1] ?? "";

describe("homepage header logo", () => {
  it("shows the uploaded logo image instead of the brand text", () => {
    expect(page).toContain('import headerLogo from "@/assets/logo-header.webp"');
    expect(logoImg).not.toBe("");
    expect(logoImg).toContain('alt="H&A Tours"');
    expect(page).not.toContain(">H&A TOURS<");
    expect(page).not.toContain("logoImg");
  });

  it("keeps the logo unsquashed at 64px on mobile and 72px on desktop", () => {
    const { width, height } = webpSize(logo);
    expect(logoImg).toContain("h-16");
    expect(logoImg).toContain("md:h-[72px]");
    expect(logoImg).toContain("w-auto");
    expect(logoImg).toContain("object-contain");
    expect(logoImg).toContain(`width={${width}}`);
    expect(logoImg).toContain(`height={${height}}`);
    expect(width).not.toBe(height);
    expect(height).toBeGreaterThanOrEqual(216);
  });

  it("sits on a clean black header with no border, shadow or translucent panel", () => {
    expect(navTag).toContain("bg-header");
    for (const unwanted of ["border-b", "border-border", "shadow", "bg-background/90", "backdrop-blur"]) {
      expect(navTag).not.toContain(unwanted);
    }
    expect(styles).toContain("--header: 0 0% 0%;");
    expect(tailwind).toContain('header: "hsl(var(--header))"');
  });

  it("keeps the header tight and the logo vertically centred", () => {
    expect(navRow).toContain("items-center");
    expect(navRow).toContain("py-1");
    expect(navRow).toContain("md:py-1.5");
    for (const unwanted of ["py-2", "py-3", "py-4", "py-6"]) expect(navRow).not.toContain(unwanted);
    expect(brandWrap).toContain("items-center");
    expect(snapshotRow).toContain("items-center");
    expect(snapshotRow).toContain("py-1");
    expect(snapshotRow).toContain("md:py-1.5");
    for (const unwanted of ["py-2", "py-3", "py-4", "py-6"]) expect(snapshotRow).not.toContain(unwanted);
  });

  it("paints the same header from the first-screen snapshot", () => {
    expect(snapshotNav).toContain("bg-header");
    expect(snapshotNav).not.toContain("bg-background/90");
    expect(snapshotNav).not.toContain("border-b");
    expect(snapshot).not.toContain("H&amp;A TOURS");
    expect(snapshotLogoImg).toContain("data:image/webp;base64,");
    expect(snapshotLogoImg).toContain("h-16");
    expect(snapshotLogoImg).toContain("md:h-[72px]");
    expect(snapshotLogoImg).toContain("w-auto");
  });

  it("centres the logo on the full header width on mobile and keeps it left on desktop", () => {
    for (const cls of ["absolute", "left-1/2", "top-0", "h-full", "-translate-x-1/2"]) {
      expect(brandWrap).toContain(cls);
    }
    for (const cls of ["md:static", "md:h-auto", "md:translate-x-0", "md:flex-none", "md:justify-start"]) {
      expect(brandWrap).toContain(cls);
    }
    for (const cls of ["absolute", "left-1/2", "top-0", "h-full", "-translate-x-1/2", "md:static", "md:h-auto", "md:translate-x-0", "md:justify-start"]) {
      expect(snapshotBrand).toContain(cls);
    }
    for (const cls of ["relative", "min-h-[72px]", "md:min-h-[84px]"]) {
      expect(navRow).toContain(cls);
      expect(snapshotRow).toContain(cls);
    }
  });

  it("keeps the booking buttons pinned to the right on mobile without moving the desktop header", () => {
    expect(controlsWrap).toContain("ml-auto");
    expect(controlsWrap).toContain("md:ml-0");
    expect(snapshotControls).toContain("ml-auto");
    expect(snapshotControls).toContain("md:ml-0");
  });

  it("ships the snapshot's own sizing rules in the critical stylesheet", () => {
    expect(critical).toContain("--header: 0 0% 0%;");
    expect(critical).toContain(".h-16 { height: 4rem; }");
    expect(critical).toContain(".w-auto { width: auto; }");
    expect(critical).toContain(".py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }");
    expect(critical).toContain(".flex-1 { flex: 1 1 0%; }");
    expect(critical).toContain(".bg-header { background-color: hsl(var(--header)); }");
    expect(critical).toContain(".min-h-\\[72px\\] { min-height: 72px; }");
    expect(critical).toContain(".ml-auto { margin-left: auto; }");
    expect(critical).toContain(
      "@media (min-width: 768px) { .md\\:h-\\[72px\\] { height: 72px; } .md\\:py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; } .md\\:flex-none { flex: none; } .md\\:justify-start { justify-content: flex-start; } .md\\:min-h-\\[84px\\] { min-height: 84px; } .md\\:static { position: static; } .md\\:h-auto { height: auto; } .md\\:translate-x-0 { --tw-translate-x: 0px; } .md\\:ml-0 { margin-left: 0px; } }",
    );
  });
});
