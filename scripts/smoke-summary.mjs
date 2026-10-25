export function smokeSummary(base, passed, failures, skipped) {
  const status = failures.length ? "FAILED" : skipped.length ? "SKIPPED (incomplete)" : "PASSED";
  const lines = [
    `## Smoke test ${status}`,
    "",
    `Base URL: ${base}`,
    "",
    "| Passed | Failed | Skipped |",
    "| --- | --- | --- |",
    `| ${passed.length} | ${failures.length} | ${skipped.length} |`,
    "",
  ];
  for (const [label, items] of [["Failed", failures], ["Skipped", skipped], ["Passed", passed]]) {
    if (!items.length) continue;
    lines.push(`### ${label}`);
    for (const item of items) lines.push(`- [${item.section}] ${item.label}`);
    lines.push("");
  }
  if (skipped.length) lines.push("Skipped checks were not verified. Rerun after the site becomes reachable.", "");
  return lines.join("\n");
}