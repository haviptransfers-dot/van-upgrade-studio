# Roadmap

- [ ] Restrict CI job permissions, configure weekly Dependabot action updates, and retain Node 24, Ubuntu 24.04 and duplicate-run cancellation; verify configuration tests.

- [done] Sitemap regeneration works from any working directory without optional env; smoke retries transient outages and marks checks incomplete without hiding permanent/content failures. All 70 tests pass on Node 24; live sitemap/robots/JSON-LD checks pass. Rendered SEO checks await GitHub Chromium (sandbox browser unavailable).

- [done] Both GitHub workflow jobs upgraded to Node.js 24, latest Node-24-compatible actions, and Ubuntu 24.04; checks and notifications preserved. Workflow validation and all 59 tests pass under Node 24; hosted GitHub run awaits next trigger.

- [done] Smoke test extended: rendered title/canonical/hreflang checks on all 28 public pages (Playwright in CI; sandbox lacks Chromium system libs, so rendered checks verified in CI only — fetch checks pass locally)
- [done] Atomic shared chat rate limiter: Postgres RPC with per-IP advisory lock replaces count-then-insert; deployed and verified (6 concurrent requests from an exhausted IP all denied, 0 rows consumed)
- [done] Smoke-test failure alerts: smoke-test.mjs groups failures by area (sitemap/robots.txt/structured-data/seo-head) into smoke-failures.md + job summary; ci.yml opens a GitHub issue on failure (triggers notification email). Verified with forced-failure run (exit 1, 31 grouped failures) and passing run (32 pass; 1 sandbox-only Chromium limitation)
- [done] Chat rate-limit UX: 429 now returns retryAfterSeconds; widget shows live m:ss countdown + WhatsApp CTA (wa.me/306949393700) in all 8 languages; RPC returns retry_after_seconds; 53 tests pass
