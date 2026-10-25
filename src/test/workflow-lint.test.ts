import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(".github/workflows/ci.yml", "utf8");
const lintJob = workflow.slice(workflow.indexOf("workflow-lint:"), workflow.indexOf("checks:"));
const checksJob = workflow.slice(workflow.indexOf("  checks:"), workflow.indexOf("  smoke:"));
const smokeJob = workflow.slice(workflow.indexOf("  smoke:"));
const permissions = (job: string) => [...(job.match(/    permissions:\n((?:      [^\n]+\n)+)/)?.[1] ?? "").matchAll(/      (\w+): (\w+)/g)]
  .map((match) => `${match[1]}: ${match[2]}`);

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

describe("CI security configuration", () => {
  it("denies unspecified workflow permissions and gives checks read-only contents access", () => {
    expect(workflow).toMatch(/^permissions: \{\}$/m);
    expect(permissions(checksJob)).toEqual(["contents: read"]);
    expect(permissions(lintJob)).toEqual(["contents: read"]);
  });

  it("grants issue-writing access only to smoke notifications", () => {
    expect(permissions(smokeJob)).toEqual(["contents: read", "issues: write"]);
    expect(workflow.match(/issues: write/g)).toHaveLength(1);
  });

  it("cancels duplicate runs for the same workflow and ref", () => {
    expect(workflow).toContain('group: ${{ github.workflow }}-${{ github.ref }}');
    expect(workflow).toMatch(/concurrency:\n  group: .+\n  cancel-in-progress: true/);
  });

  it("keeps both site jobs on Node 24 and Ubuntu 24.04", () => {
    for (const job of [checksJob, smokeJob]) {
      expect(job).toContain("runs-on: ubuntu-24.04");
      expect(job).toContain("node-version: '24'");
    }
  });

  it("schedules weekly GitHub Actions update pull requests at repository root", () => {
    const dependabot = readFileSync(".github/dependabot.yml", "utf8");
    expect(dependabot).toMatch(/^version: 2$/m);
    expect(dependabot).toMatch(/package-ecosystem: github-actions\n    directory: \/\n    schedule:\n      interval: weekly/);
    expect(dependabot).toContain("open-pull-requests-limit: 5");
  });
});
