# Roadmap

- [done] Smoke test extended: rendered title/canonical/hreflang checks on all 28 public pages (Playwright in CI; sandbox lacks Chromium system libs, so rendered checks verified in CI only — fetch checks pass locally)
- [done] Atomic shared chat rate limiter: Postgres RPC with per-IP advisory lock replaces count-then-insert; deployed and verified (6 concurrent requests from an exhausted IP all denied, 0 rows consumed)
- [done] Smoke-test failure alerts: smoke-test.mjs groups failures by area (sitemap/robots.txt/structured-data/seo-head) into smoke-failures.md + job summary; ci.yml opens a GitHub issue on failure (triggers notification email). Verified with forced-failure run (exit 1, 31 grouped failures) and passing run (32 pass; 1 sandbox-only Chromium limitation)
- [done] Chat rate-limit UX: 429 now returns retryAfterSeconds; widget shows live m:ss countdown + WhatsApp CTA (wa.me/306949393700) in all 8 languages; RPC returns retry_after_seconds; 53 tests pass
