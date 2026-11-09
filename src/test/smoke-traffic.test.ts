// @vitest-environment node
import { describe, expect, it } from "vitest";
import { allowSmokeRequest } from "../../scripts/smoke-helpers.mjs";
const base = "https://haviptransfers.gr";
describe("lightweight rendered deployment checks", () => {
  it("keeps local documents, application code and styles available", () => {
    for (const type of ["document", "script", "stylesheet", "fetch", "xhr"]) {
      expect(allowSmokeRequest(`${base}/assets/app.js`, type, base)).toBe(true);
    }
  });
  it("does not download media or contact external trackers", () => {
    for (const type of ["image", "media", "font"]) {
      expect(allowSmokeRequest(`${base}/assets/large-file`, type, base)).toBe(false);
    }
    expect(allowSmokeRequest("https://www.googletagmanager.com/gtag/js", "script", base)).toBe(false);
  });
});