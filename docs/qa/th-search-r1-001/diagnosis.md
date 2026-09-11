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
- `check:th-search-r1-001`: 14 behavioral groups, including real native page invocation/API parity through the same in-memory source. Synthetic records never reach a live database.
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
