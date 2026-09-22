# MOVE-PROFILE-V3-POST-001

**A. STATUS: BLOCKED**

The placeholder cleanup is implemented and passes its rendering and regression checks. Release remains blocked by the requested no-console-errors gate. Save and Compare complete their user actions but emit errors also reproduced on the unchanged starting commit. An intermittent profile hydration error was additionally captured on the cleanup branch; it is not proven to be a baseline defect. No push, merge, or deployment was performed.

**B. CODE IDENTITY**

- Repository: `savitz25/Move-trust-Hub`
- Branch: `move-profile-v3-post-001`
- Starting `origin/main`: `bec1dd2341acff30b1bb0ef2850f4ee54b886cc6`
- Implementation commit: `2456bc9b9ed58b9c5b5c4b6ffea99dde1873f43f`
- Worktree: `C:/Users/Michael.Savitsky/move-profile-v3-post-001`
- QA: 2026-09-22; local Next.js 15.5.19, Chromium, public reads from the canonical Move database. Only public Supabase credentials were supplied to the local application; no administrative backfills, external API refreshes, scraping, or database writes were used.

**C. COMPONENTS REMOVED / CHANGED**

- `GoogleReviewsSection`: removed every missing/error/not-found placeholder and generic company-search fallback. No card markup is emitted without a complete stored snapshot.
- `ExternalReputationHeader`: accepts the same Google data and actual review list as its sibling components. Returns null when neither will render evidence.
- `AttributedReviewsPanel`: returns null when the existing attribution filter yields no references. Removed the empty message and duplicate visible references label; retained the information tooltip.
- Both `/companies/[slug]` and `/auto-transport/[slug]` pass evidence into the shared header. Auto-transport's Google badge uses the same snapshot gate, the BBB summary requires confirmed evidence, and the footer no longer claims absent snapshots are displayed.
- Added one profile-specific Google evidence predicate, rendered-output regression tests, and a browser QA script. Shared directory/ranking display predicates were not changed.

**D. GOOGLE EMPTY-STATE BEHAVIOR**

Null, undefined, empty, failed, skipped, not-found, and incomplete snapshots render no logo, heading, card, divider, search CTA, or spacing wrapper. The gate requires a finite rating from 1 to 5, a positive integer review count, Google Places provenance, a parseable retrieved date, and a stored listing identity capable of producing an outbound profile link. Legacy snapshots may omit status only when the other evidence exists. Missing fields are not fabricated.

**E. EXTERNAL REFERENCES EMPTY-STATE BEHAVIOR**

An empty list or a list with no attributable references renders nothing. The external heading is also omitted unless a Google snapshot or attributable reference will render beneath it. Confirmed BBB details retain their existing location within Regulatory & Trust Evidence; BBB elsewhere on the page does not leave an empty heading above absent Google/reference cards.

**F. REAL-SNAPSHOT BEHAVIOR**

Real values, source links, attribution, and dates remain visible. Google says `Snapshot checked [date] (UTC). Source: Google Places.` Community Reviews remain a separate, unconditional sibling section.

| Real route | Google card | External references | Confirmed BBB |
| --- | --- | --- | --- |
| `/companies/advantage-van-lines-llc` | Hidden | Hidden | Absent |
| `/companies/2-fellas-a-big-vehicle-moving-company` | Shown | Hidden | Absent |
| `/companies/allied-van-lines` | Shown | Shown | Shown |
| `/companies/movesafe-relocation` | Hidden | Hidden | Shown |
| `/auto-transport/reliable-carriers` | Shown | Absent | Shown |
| `/auto-transport/montway-auto-transport` | Hidden | Absent | Shown |

All six cases were tested at 1440 x 900 and 390 x 900 using their real stored records. No test evidence was inserted into the database or public app data. Regression tests also exercise the references-only combination and incomplete Google records.

**G. STRUCTURED DATA**

All 12 browser renders contained no `AggregateRating` or `Review` nodes sourced from external reputation. The directory schema regression explicitly supplies Google and BBB evidence and recursively checks the output. All 8 existing community-schema tests pass, including the V3 removal of community AggregateRating and retention of permitted individual community Review nodes. `/company/[slug]` and its review behavior are unchanged.

**H. TEST RESULTS**

- 43/43 profile, external reputation, legacy-label, and profile-metric tests pass: [test log](tests.txt).
- 8/8 existing community-schema tests pass: [schema test log](schema-tests.txt).
- Typecheck fails with exactly the same 532 diagnostics as the starting commit; zero new or removed diagnostics. The diagnostic hashes match: [comparison](typecheck-comparison.json).
- `git diff --check` passes. Both profile routes compile and serve HTTP 200 locally. A full production build was not run.

Reproduce the automated regressions:

```powershell
node --import tsx --test components/company/external-reputation.test.ts components/company/company-profile-v3-legacy-guard.test.ts lib/company/research-profile.test.ts lib/trust/profile-metrics.test.ts lib/reviews/aggregate-rating.test.ts
```

The browser script uses an agent-browser CDP session and an installed `playwright-core` module supplied through `PROFILE_QA_CDP` and `PLAYWRIGHT_MODULE`. `PROFILE_QA_BASE` defaults to `http://localhost:4325`; `PROFILE_QA_OUT` selects the output directory. It exits nonzero on browser or interaction errors.

**I. BROWSER QA**

All 12 content/layout cases passed the expected evidence-presence checks, heading counts, structured-data assertions, and horizontal-overflow check. No-data company profiles place Community Reviews directly after Services & Specialties with a 24 px gap, without orphan dividers or empty reputation wrappers. Desktop and mobile screenshots were visually inspected.

The final release-gate run is **not green**:

1. `/companies/2-fellas-a-big-vehicle-moving-company` at 1440 px intermittently emits a root hydration mismatch (`div` versus `Suspense`). Earlier runs also captured this on Advantage; a clean intermediate run does not establish consistent success. Four baseline profile navigations did not reproduce this particular mismatch. Its cause remains unresolved.
2. Saving Advantage works and persists the local shortlist, but reloading the saved profile emits a `SaveMoverButton` hydration mismatch (`Save mover` versus `Saved`, including `aria-pressed`). Reproduced on the unchanged starting commit.
3. Compare includes the selected company and My Move opens successfully, but Compare emits `Failed to set Next.js data cache ... items over 2MB can not be cached (10718153 bytes)`, including an unhandled-rejection message. Reproduced on the unchanged starting commit.

Evidence: [12 profile results](browser-results.json), [desktop interactions](actions-1440.json), [mobile interactions](actions-390.json), [unchanged-base interactions](baseline-actions.json). The functional Save/Compare/My Move checks are true on both widths; their console-error checks fail. No authenticated cloud-save claim is made.

Screenshots and full diagnostic logs remain locally under `scripts/output/move-profile-v3-post-001/`; `release/` contains the final run. Baseline runtime verification used webpack because Turbopack rejects the baseline worktree's external node_modules junction; the cleanup worktree used the repository's normal Turbopack dev command.

**J. DIFF AUDIT**

Production changes are limited to the two profile routes, three reputation presentation components, and one new profile evidence helper. Tests, browser tooling, and this report accompany them. No dependency/lockfile, schema, migration, database data, Search R1, My Trust Hub, Save/My Move implementation, Compare implementation, ranking, recommendations, pricing, or scoring changes. No new third-party integration or scraping.

Only the two inspected public profile families use `GoogleReviewsSection` / `ExternalReputationHeader`; only `/companies/[slug]` uses `AttributedReviewsPanel`. An older `ReviewsSection`/`ReviewsSectionLoader` pair still has legacy copy but has no route or other component callers; it is not part of a current public profile render. `/company/[slug]` uses none of these external components and remains untouched. The confirmed BBB detail's zero-review line describes an actual stored BBB profile rather than an empty reputation section.

**K. FINAL HEAD SHA**

The final report commit follows implementation commit `2456bc9b9ed58b9c5b5c4b6ffea99dde1873f43f` and changes QA documentation/artifacts only. The final HEAD is provided in the delivery message and is available with `git rev-parse HEAD` in this worktree. Release remains blocked; nothing has been merged or deployed.
