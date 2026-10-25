import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(".github/workflows/ci.yml", "utf8");
const lintJob = workflow.slice(workflow.indexOf("workflow-lint:"), workflow.indexOf("checks:"));

describe("CI workflow linting", () => {
  it("runs actionlint from a pinned image tag, never :latest", () => {
    const image = lintJob.match(/uses:\s*docker:\/\/rhysd\/actionlint:(\S+)/);
    expect(image, "ci.yml must lint workflow files with the actionlint image").not.toBeNull();
    expect(image?.[1]).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("checks workflow files on pull requests", () => {
    expect(lintJob, "the lint job must not be skipped on pull requests").not.toMatch(/^\s*if:/m);
  });

  it("lints workflows on the same Ubuntu runner as the other checks", () => {
    expect(lintJob).toContain("runs-on: ubuntu-24.04");
  });
});
