import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { blogPostTranslations } from "@/data/blogPostTranslations";
import { renderNafplio } from "../../nafplioPlugin";

describe("simple footer privacy link", () => {
  for (const file of ["src/pages/About.tsx", "src/pages/Blog.tsx", "src/pages/BlogPost.tsx"]) {
    it(`${file} footer links to the localized privacy page`, () => {
      const footer = readFileSync(file, "utf8").split("<footer")[1];
      expect(footer).toContain('to="/privacy-policy"');
      expect(footer).toContain('t("footer.privacy")');
    });
  }

  it("static Nafplio article footer links to the privacy page", () => {
    expect(renderNafplio()).toMatch(/<footer>.*href="\/privacy-policy\/">Privacy Policy<\/a><\/footer>/);
  });
});

describe("Athens tour article image alts", () => {
  it("use H&A VIP Tours instead of H&A Tours Ltd", () => {
    const source = readFileSync("src/data/blogPostTranslations.ts", "utf8");
    expect(source).not.toContain("H&A Tours Ltd");
    expect(JSON.stringify(blogPostTranslations).match(/H&A VIP Tours/g)?.length ?? 0).toBeGreaterThanOrEqual(7);
  });

  it("keeps the Facebook page name in the Contact section unchanged", () => {
    expect(readFileSync("src/components/HomeSections.tsx", "utf8")).toContain('value: "H&A Tours Ltd"');
  });
});
