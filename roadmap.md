# Roadmap

- [done] SEO clean-up across languages: de/es/fr/it/he/ar descriptions >160 → 150–158; titles >70 → 50–68 (all 8); wording rules in meta/titles/schema (all 8); meet & greet = sign with customer's name; FAQ answers in initial HTML; WhatsApp tooltip + availableLanguage list all 8 languages; sitemap lastmod today for changed pages; trailing-slash internal/language links. Airport page got the shared FAQ fixes only (owner approved); child-seat article only the shared languages list. 312 tests pass; 232 pages compared before/after. Not published.
- [done] Part 1 (en) and Part 2 (el) meta descriptions.

- [done] Updated only the existing child-seat article in eight languages with matching localized FAQ schema and eight page-specific sitemap dates. Identity, URLs, publication date and featured image retained; translated title/meta limits checked. Full suite: 211 tests passed. Eight initial and loaded article versions, links, images and RTL checked; review diff supplied. Not published; awaiting owner approval.

- [done] Optimized homepage delivery without visual/content changes: 23.7/52.4KB responsive WebP hero with matching high-priority preload; isolated image metadata and music loading, excluded unused template/test CSS, preserved lazy media/font swap/consent-gated tracking, and served a Schema.org root DataCatalog. All 186 tests passed; desktop/mobile images, menus, three-passenger €85 WhatsApp message, head tags and catalog verified. Build OK. No publication; new hosted PageSpeed scores remain unmeasured (only two visitor FCP readings and no LCP data).

- [done] Normalized 232 sitemap locs, 2088 alternates and all static/client canonical and og:url tags to trailing slashes; renamed 20 hosted originals/variants with identical bytes and updated all image references. All 184 tests passed; 232 initial documents, 20 image responses and desktop/mobile rendering verified. Publication requested in this turn; completion of deployment remains external.

- [done] Implemented uploaded multilingual SEO requirements: 232 translated initial HTML documents across eight languages, matching canonical/hreflang and sitemap, approved homepage/Piraeus content, Vito VIP terminology, seven-passenger limit and owner-confirmed 63 reviews. All 176 tests pass; all 232 initial documents verified; browser language navigation and WhatsApp links verified. No publication. HTTP 301 rules verified locally and configured for Netlify; Lovable hosting behavior remains unverified.

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
- [done] Dedicated /airport-transfer-athens/ page in 8 languages (own H1, description, body, FAQ schema). Not published.
