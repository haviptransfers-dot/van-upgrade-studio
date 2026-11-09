# Roadmap

- [ ] Implement uploaded multilingual SEO requirements: translated initial HTML and dedicated URLs for all eight languages, matching metadata/canonicals/hreflang, language links, multilingual sitemap, approved homepage/Piraeus copy, Vito VIP terminology, blog slug redirects, internal links and validation. Await confirmation of conflicting business rating and passenger capacity; preserve appearance and booking flow; do not publish without approval.

- [done] Removed duplicate business JSON-LD across all 28 pages; one shared Organization preserves business details and rating counts of 127, while service graphs and article authors reference its @id. Verified initial/rendered HTML and transfer→Blog→article navigation; all 164 tests pass. Not published.

- [done] Corrected initial HTML canonicals and matching og:url for all 28 public pages, preserving independent static articles and Helmet navigation. Verified initial and loaded tags on every page plus Blog/article navigation; 24 tests pass. Sitemap already correct, design unchanged; not published.

- [done] Audited tour durations, child-seat limits and tour price units across pages and all eight languages; verified Delphi discrepancies on the live site and recorded findings without content changes.
- [done] Applied confirmed durations (Delphi 8h, Nafplio 8h, Meteora 12h, Athens/Acropolis 3h, Sounion 5h), per-vehicle tour price qualifiers and owner-supplied approximate seat ages across eight languages. All 81 targeted tests passed; checked all five detail routes in eight languages and calculator WhatsApp text. Verified SEO head tags and metadata unchanged; no publication.

- [done] Replaced the van search-result icon with the existing H&A logo at 144×144; checked proportions, one icon tag and successful preview delivery.

- [done] Checked hosted Site Checks run #19 (40182822003): all three jobs succeeded; live smoke log confirms all checks passed, with no remaining failures.

- [done] Repaired npm ci lockfile failure (missing Playwright), added prevention tests, verified a fresh Node 24 install, all 79 tests, and actionlint. Hosted GitHub result awaits the next run.

- [done] Consolidated top-level contents-read permissions and the single smoke override; preserved one concurrency block and existing Dependabot file. npm test auto-syncs stale sitemap; all smoke outcomes get passed/failed/skipped summaries. Actionlint and 77 tests pass on Node 24.

- [done] Restricted CI job permissions and configured weekly Dependabot action-update PRs; Node 24, Ubuntu 24.04 and duplicate-run cancellation retained. Actionlint and all 75 tests pass under Node 24.

- [done] Sitemap regeneration works from any working directory without optional env; smoke retries transient outages and marks checks incomplete without hiding permanent/content failures. All 70 tests pass on Node 24; live sitemap/robots/JSON-LD checks pass. Rendered SEO checks await GitHub Chromium (sandbox browser unavailable).

- [done] Both GitHub workflow jobs upgraded to Node.js 24, latest Node-24-compatible actions, and Ubuntu 24.04; checks and notifications preserved. Workflow validation and all 59 tests pass under Node 24; hosted GitHub run awaits next trigger.

- [done] Smoke test extended: rendered title/canonical/hreflang checks on all 28 public pages (Playwright in CI; sandbox lacks Chromium system libs, so rendered checks verified in CI only — fetch checks pass locally)
- [done] Atomic shared chat rate limiter: Postgres RPC with per-IP advisory lock replaces count-then-insert; deployed and verified (6 concurrent requests from an exhausted IP all denied, 0 rows consumed)
- [done] Smoke-test failure alerts: smoke-test.mjs groups failures by area (sitemap/robots.txt/structured-data/seo-head) into smoke-failures.md + job summary; ci.yml opens a GitHub issue on failure (triggers notification email). Verified with forced-failure run (exit 1, 31 grouped failures) and passing run (32 pass; 1 sandbox-only Chromium limitation)
- [done] Chat rate-limit UX: 429 now returns retryAfterSeconds; widget shows live m:ss countdown + WhatsApp CTA (wa.me/306949393700) in all 8 languages; RPC returns retry_after_seconds; 53 tests pass

- [done] Organization schema image/logo serve from https://haviptransfers.gr/logo.png; the owner's high-resolution logo replaced the small source.
