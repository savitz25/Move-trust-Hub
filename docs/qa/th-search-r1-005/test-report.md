# TH-SEARCH-R1-005 observed verification

Model: GPT-6 Astra / High, USER-CONFIRMED. No independent active-session metadata was available.

## Baseline and independent oracle

Starting main `866bde6eeeed692d23257c7de75ebca38cb11e78`. `before-api.json` and `before-native.png` show the original JK licensing query losing its name and returning 4,321 carrier-directory profiles; the native page settled in 2,779 ms. `red-before.log` records the unchanged-code failure. These are timestamped observations, not frozen production-count assertions.

`source-oracle.json` was produced by bounded read-only SQL using independently established public record IDs, outside the new parser. It establishes legal/display fields, one actual stored DBA, identifiers, publication state, recorded headquarters and stored source clocks. Its SHA-256 is recorded in result.json. No synthetic fixture entered production.

## Executed deterministic checks

- R1-005: 15/15, including real parser/planner/executor, permissive legacy RPC fixture, source provenance and actual page/component rendering. `focused-final.log` on final runtime merge.
- R1-001: 17/17 on final implementation candidate. `r1-001-final-runtime.log`.
- Additional directory/specialist/provider/state-identity/publication checks: 65/65. `additional-regressions.log`.
- NY routing: 10/10. `ny-final.log`.
- Customer integration: 6/6 on final runtime merge. `customer-final.log`.
- Full configured `npm test` chain passed: share, visual, network metrics and NJ/CA/TX/WA/CO/VA/NY contracts. `regressions-final.log`.
- Two deliberate source mutations failed the focused gate: restored name-to-directory fallback and removed source-name eligibility (false provenance). `mutation-results.json` and mutation logs. Both restored; subsequent clean gate passed. The mutation run preceded the final small provenance completion; its real timestamp is retained.

No test deletion, weakened assertion, new ignored-build setting, or publication change was used.

## Baseline limitations

TypeScript: isolated starting main and final candidate both report 535 identical diagnostics, with zero new/resolved diagnostics (`typecheck-comparison-final.json`). This is not a globally green typecheck. Lint is unconfigured on both: `next lint` enters setup; setup was cancelled without changing configuration (`lint-base.log`, `lint-candidate.log`).

The county publication-cap check fails identically on baseline/candidate: 1,695 versus cap 400 (`county-base.log`, `county-candidate.log`). A bounded read-only check confirms the existing county loader's referenced `companies.usdot_status` column is absent. These unrelated county/SEO defects remain open.

Supplemental `next dev` fails on both isolated baseline and candidate because `/insurance` conflicts with `/insurance[[...legacy]]` (`dev-baseline.log`). No supplemental development-browser pass is claimed. The core optimized local build and Vercel production builds pass; no route/config workaround was introduced.

## Builds and browser boundaries

`build-release.log` is the successful stable optimized build of `dcaca0871c36febbe1efa09e552220d8cc159fb2`, whose runtime content equals PR125 merge `bb63ed6531e401ba7297a5a3d0eea663f4292829`. Local optimized browser proof: 23 observations, zero failures, maximum 15,498 ms (`local-production-build/browser.json`).

PR126 final candidate `141825dc584a445ba9b27e808b8a00cf70ed623a` passed Vercel build, automated review and required checks, and merged as `0db8f6215097960625f33ea100352818fba6ff54`. Final canonical production browser evidence is recorded separately after deployment exists. Preview browser reached Vercel SSO; protection was not bypassed and preview UI is not claimed passed (`preview/`).

The bounded browser script is `scripts/qa-th-search-r1-005.mjs`; it uses an explicitly supplied authorized origin/CDP browser, a 25-second budget, actual settled DOM/API identity comparison, homepage Enter, candidate keyboard selection, task preservation, edits, stale-result prevention, refresh/history, Trace, typed filters and 1280/390/320 widths. It also checks the mixed-source BKQ legal-name control has no invented federal identifier/status.

## Review and security

Separate self-review inspected parser boundaries, safe RPC JSON arguments, retrieval bounds, final source-name eligibility, selection revalidation, publication, exact-ID preservation, constraints and additive Ask compatibility. Vercel automated review independently flagged a source-role case mismatch; it was fixed and tested. No independent human review is claimed.

Only Move was edited. No database/schema/publication/auth/claim writes, no new analytics dimension, no source payload dumps, and no paid resource. The existing official SAFER action uses the selected sourced identifier. Credentials remain in ignored server environment only. Exact-value client bundle and changed-file scans are recorded separately with their tested build/head scope.

## Separate work

Alias-only discovery is limited by the existing legal/display-name index. Full jurisdictional licensing, local service territory, spelling coverage, ownership/complaints, parent Ask routing and Senior work remain outside this ticket. Stored JK MC 225850 differs from official SAFER snapshot MC 196957 for DOT 1065394; no source record was altered. A narrow source reconciliation ticket is recommended.

Rollback: normal reviewed revert/deployment of this ticket's runtime commits only. No database rollback; preserve R1-001 and NY work.

## Final runtime production proof

Canonical www.movetrusthub.com served `0db8f6215097960625f33ea100352818fba6ff54` in deployment `dpl_7jZWyzWMViKT14H85A36YxjMHbe6`. The bounded production run began 2026-09-11T23:23:57.930Z and passed all 24 observations with zero failures; maximum query completion 6,662 ms. See `production/browser.json` and screenshots. Production smoke passed all eight surfaces, including the published SHIFL profile. Search remains noindex. Final deployed homepage/search asset scan: 23 scripts, no exact private credential matches. The main-only County SEO job still fails the independently reproduced baseline cap; no gate was bypassed.

Vercel logs over the production browser window showed no search-route errors. Existing county journey pages logged the missing usdot_status column and oversized cache payloads; these are recorded in runtime-logs.json, not presented as a globally clean log review.
