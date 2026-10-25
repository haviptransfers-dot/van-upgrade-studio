# Roadmap

- [done] Smoke test extended: rendered title/canonical/hreflang checks on all 28 public pages (Playwright in CI; sandbox lacks Chromium system libs, so rendered checks verified in CI only — fetch checks pass locally)
- [done] Atomic shared chat rate limiter: Postgres RPC with per-IP advisory lock replaces count-then-insert; deployed and verified (6 concurrent requests from an exhausted IP all denied, 0 rows consumed)
