import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const workflowPath = fileURLToPath(new URL('../../.github/workflows/ci.yml', import.meta.url));
const workflow = readFileSync(workflowPath, 'utf8');

describe('CI workflow linting', () => {
  it('runs actionlint from a pinned image tag, never :latest', () => {
    const image = workflow.match(/uses:\s*docker:\/\/rhysd\/actionlint:(\S+)/);
    expect(image, 'ci.yml must lint workflow files with the actionlint image').not.toBeNull();
    expect(image?.[1]).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('checks workflow files on pull requests', () => {
    const lintJob = workflow.slice(
      workflow.indexOf('workflow-lint:'),
      workflow.indexOf('checks:', workflow.indexOf('workflow-lint:')),
    );
    expect(lintJob).toContain('docker://rhysd/actionlint:');
    expect(lintJob, 'the lint job must not be skipped on pull requests').not.toMatch(/^\s*if:/m);
  });

  it('lints workflows on the same Ubuntu runner as the other checks', () => {
    const lintJob = workflow.slice(
      workflow.indexOf('workflow-lint:'),
      workflow.indexOf('checks:', workflow.indexOf('workflow-lint:')),
    );
    expect(lintJob).toContain('runs-on: ubuntu-24.04');
  });
});
