# TH-SEARCH-R1-001 — diagnosis and release evidence

Starting main: `8dc82faecc1ece6f7cf02e26cccc0e6f2739008a`.
Production baseline: `dpl_3i76DeFAjJrEMNNoXBCWJ1vgKdfq`, canonical alias `www.movetrusthub.com`, same Git SHA (Vercel deployment metadata checked 2026-09-11).
Builder: GPT-6 Astra / High, USER-CONFIRMED. A session model-switch notice was received; exact model/effort metadata is not independently exposed.

## Reproduced before repair

Both the real settled browser and public API parsed `usdot 3244 649 miama movers` as USDOT `3244`, returned three identities, and claimed each listed `3244`. Returned identifiers actually included `3244649`, `3244801` and `4132446`. Plain `USDOT 3244` also returned those substring matches.

The current published positive is SHIFL INC, USDOT `3244649`, MC `1019808`, Broker, recorded AIRMONT, NY. This was verified through the real source and subsequently through the official SAFER snapshot. It is a test snapshot, never a production special case. Earlier SHIFL role/location assumptions were not reused.

Root causes:

1. `interpretMoveAskQuery` captured only the first contiguous digit group.
2. `lookupIdentifier` fell back from an exact miss to `ilike('%identifier%')`; `lookupEvidence` independently used substring matching.
3. Explanations copied the requested identifier instead of proving equality against returned fields.
4. Native `/ask` called the record interpreter; `/api/ask` independently chose the directory parser/adapter. The directory parser removed “household-goods carriers” before role extraction. Its adapter represented every cohort as an entity list, dropping count/current-authority intent.
5. The NJ native restriction matched the word “mover,” incorrectly treating recorded-location discovery as a state-license-roster request.
6. The native page appended filter labels to text, truncated it to 180 characters and accepted fractional pagination.
7. The existing SAFER helper used incorrect query parameter names/values. A USDOT request became an official MC/MX search. Official form inspection confirmed `query_type=queryCarrierSnapshot`, `query_param=USDOT` or `MC_MX`, `searchtype=ANY`.

## Repair boundary

Homepage GET form → native `/ask` → `executeMoveRequest`; public `/api/ask` → the same function. `planMoveRequest` owns common validation, typed overrides, interpretation, constraints and source selection. The server-rendered page does not call itself over HTTP.

Record executors retain definitions, FDACS, verified overlap, counts and evidence. Supported public recorded-location/auto-transport discovery retains the existing directory executor. Source selection is based on supported predicates, never on which executor returns more rows. Count/current-authority requests cannot be converted into unconstrained directory lists.

Identifiers are 3–8 digit strings. Explicit USDOT/DOT/MC labels, case, optional #/hyphen label separators and defensible grouped whitespace are supported. Grouped notation permits a 1–4 digit first group followed by three-digit groups, with 3–8 digits total. Leading zeroes remain unchanged. Decimal/scientific/oversized/ambiguous forms fail before querying. Separate labels never concatenate. A USDOT/MC pair requires exact equality on the same published identity row. Multiple same-family identifiers require clarification. Valid exact misses never broaden.

Exact query predicates use `.in` over the full stored identifier and documented MC label variants, with publication restrictions and a bounded page. Returned fields are normalized using the same family rules and checked for equality before rendering. Repeated observations of one canonical identity ID are deduplicated; distinct unresolved identity IDs remain separate. No schema/data writes were made.

For state counts, bounded source candidates undergo the existing exact recorded-state extractor after the database filter; current authority requires true, excluding unknown. Explicit NJ PM/PW/PC/intrastate questions remain request-only. Unsupported city/county or conflicting constraints remain visible and do not silently become a state/national cohort. Exact identity plus unverified place text is labelled identity-only with unresolved context.

## Verification performed before preview

- Three executable reproductions failed on unchanged starting code; all pass after repair (`red-before.txt`).
- `check:th-search-r1-001`: 17 behavioral groups, including real native page invocation/API parity through the same in-memory source. Synthetic records never reach a live database.
- Two deliberate mutations (identifier truncation and false explanation) produce assertion failures, with originals restored (`sensitivity.json`).
- Existing Ask/golden/definition gate passes; directory engine 30 tests and search/specialist/identity gates 41 tests pass.
- `npm test` passes with the ignored local Vercel link file temporarily relocated and restored. Its NJ assertion requires `.vercel/project.json` to be absent; this is a local linking artifact, not a production behavior change.
- Baseline-wide TypeScript has 534 diagnostics. Comparison against the isolated exact base is retained; changed-file errors must be zero before release.
- `npm run lint` has no checked-in configuration and prompts on both base and candidate; it is not a green lint gate.
- Local dev fails on both base and candidate with the existing overlapping `/insurance` optional-catchall route. Local build was attempted and stopped after remaining in compilation without progress. Normal Git/Vercel build and preview verification are required before release.

## Review

Separate builder review passes inspect source predicates, label boundaries, pair conflicts, publication filters, adapters, API keys/types, source-failure states, and explanation provenance. This is a self-review, not an independent reviewer. The focused gate is wired into the existing PR workflow. No security/CI gate is disabled.

Official reference: [SAFER Company Snapshot](https://safer.fmcsa.dot.gov/CompanySnapshot.aspx) and [FMCSA authority-verification guidance](https://www.fmcsa.dot.gov/faq/where-do-i-go-look-motor-carrier-broker-or-freight-forwarders-interstate-operating-authority).

Preview, production browser evidence, merge/deployment identities and final outcome are recorded separately after they actually exist. This report does not certify all Move search or close other Search Reliability R1 tickets.

## Additional faults confirmed during live browser certification

The first pointer/keyboard interaction loaded `DeferredSaveMyMove`, changing its child wrapper from a Fragment to `SaveMyMoveProvider`. The entire research subtree remounted: a focused, connected summary element became disconnected on Enter (`before-first-interaction.json`). This also discarded a first search submission. The lightweight context now stays mounted, with the existing deferred runtime mounted as a sibling. Auth lookup, saving, redirects, and claim authorization logic are unchanged. Browser certification asserts that the original disclosure element remains connected through the first click, then verifies keyboard open/close.

CI initially ran Node 20; the installed Supabase client throws during construction without native WebSocket support. Reproduction with Node 20 and with native WebSocket disabled confirmed this before a fixture HTTP request. The existing workflow now uses Node 24 and runs all its gates; no test or security gate was disabled.

Review also removed misleading criterion-removal links that could discard unrelated structured filters; Edit request retains the full input/overrides. Missing-ID clarification has an explicit terminal state. State cohorts larger than Supabase's 1,000-row response cap are read in stable bounded pages (maximum 10,000 candidates) before exact state matching; an incomplete/oversized source response is unavailable, never a partial count. The 1,001-row fixture verifies this behavior.

The existing parent `stage4-closeout-ask/lib/network/move-ask.ts` was inspected read-only for payload compatibility. It accepts the retained move-ask-v1 mode, role, results, counts, pagination and provenance fields. Directory specialist/source contract metadata remains available. No Ask files were edited.

## Production proof and unchanged baseline failures

PR #121 merged to `c6c409d6cdb5440c6b446236b564b50884383c6c`, deployed as `dpl_7s6TKvtM7DovhiGQ1eGnv9joaVC5`. The canonical www alias was inspected before running the 13-check production browser suite. `production-browser.json` records actual UI/API observations; `production-smoke.json` records public profile/directory/Verify DOT/My Move/portal/definition/FDACS/robots/sitemap checks and a 22-file client bundle scan with zero matches to four available server values. Official USDOT and MC verification links both returned the same SHIFL identity (`official-links.json`).

The main-only County SEO Compliance workflow failed its Tier 1 cap (1,695 versus 400). The same command, `npx tsx scripts/lib/tier1-circuit-breaker.ts`, produces the identical counts and failure in the isolated starting-main worktree. This patch does not change county publication catalogs or rules; no gate was bypassed or relaxed. See workflow run 34626865635. This remains a separate baseline issue.

A final state-filter edge case was reproduced: the short dropdown omitted an existing supported URL state outside FL/NJ/CA. The follow-up keeps that current state as a selected option so resubmission preserves it. Its rendered-form regression fails on the preceding production component and passes after repair. Browser resubmission evidence records NY plus broker/current authority through an USDOT-to-MC query edit.

Revert plan: revert the ticket's implementation and filter follow-up merge commits through a normal PR and deploy. There are no migrations or data changes to reverse. Do not alter publication policy or database records as part of rollback.

The numeric-suffix regression additionally reproduced `USDOT 3244, 649` executing the 3244 fixture. Comma/slash/and-separated independent numeric suffixes now require clarification before querying; the accepted whitespace-only grouped form `USDOT 3244 649` remains a known-positive exact match. This regression and both mutation sensitivity checks pass on the follow-up head.

Runtime review on the final code deployment returned an unrelated `/local-movers/california` HTTP-200 error from `approved_movers.companies_failed`: `companies.usdot_status` is absent. The approved-county loader is byte-identical between starting main and the final code merge. A read-only, one-column/one-row query from the isolated base reproduced PostgreSQL 42703. No schema or county-loader change was made; this is recorded as a separate existing defect (`runtime-review.json`). No error/fatal entries were returned for the tested Ask search routes in that window.
