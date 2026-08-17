# Task 004B — State Authority Completion and Qualified Onboarding

Run date: 2026-08-16/17  
Branch: `move-2.0`  
Starting commit: `083d6e7a`  
Scope: additive Move V2 Preview/development data only

## 1–8. New Jersey recovery audit

The [NJ Division of Consumer Affairs Public Movers and Warehousemen FAQ](https://www.njconsumeraffairs.gov/pmw/Pages/FAQ.aspx) was reverified. PM means moving, PW warehousing only, and PC moving plus warehousing. Intrastate public movers/warehousemen require the applicable state license.

The bounded recovery audit covered the current program pages, current RGB/Regulated Business public portal, NJ Open Data search, agency download/list pages, linked/static resources, sitemap-visible material, legacy MyLicense verification/roster paths, and the portal's anonymously served Power Pages entity-list metadata and grid endpoint. The current portal exposes a public entity-list/view identifier in page metadata, but bounded anonymous GET/POST reproduction returned 404/500 responses and no documented JSON, OData, FetchXML, REST, or bulk-download contract was validated. The legacy roster location no longer contains a PMW roster.

An in-app browser network capture was attempted, but no browser runtime was connected in this session. No alternative privileged browser, authentication bypass, CAPTCHA bypass, or hidden API enumeration was used.

- Stable NJ machine source found: **NO**
- NJ roster/export available: **NO**
- NJ official matches: **0**
- NJ active PM/PC movers: **0 published**
- NJ PW-only/inactive/review: **0 published**
- NJ unresolved: **2,873**, neutrally retained as state-authority unresolved
- Data-request artifact: `docs/nj-pmw-data-request.md`

The request is ready to send through the NJ Division of Consumer Affairs records channel and asks for CSV/XLSX/JSON while excluding private information. It was not sent.

## 9–13. Florida expansion

The [official FDACS lookup](https://csapp.fdacs.gov/CSPublicApp/BusinessSearch/BusinessSearch.aspx) remained stable under eight sequential pages per program, 90-second timeouts, cached WebForms state, and a maximum ten-page adapter cap. No parallel or unbounded scrape was used.

- Latest distinct official licenses: **160 IM + 53 MB = 213**
- Append-only release rows across Task 004 and 004B: **326**
- High-confidence provider matches: **78**
- Verified local movers: **41**
- Verified moving brokers: **11** (all high-confidence broker links available in this bounded source)
- Authority review: **26**
- Explicit inactive: **0** — unknown/non-current display statuses remain review

The 78-row traceable QA ledger is `docs/task-004b-manual-qa.csv`. It exceeds the mover and review minima. Only 11 broker links met the official-source plus FMCSA identity threshold, so no additional broker was invented to reach 15. Known false-positive state matches: **0/78**.

## 14–18. State observations

State observations remain separate from FMCSA and from consumer display selection:

- New state DBAs: **0** exposed by this bounded FDACS result
- State contact observations: **75 phones**, **72 emails**, **76 addresses** across matched providers
- State websites: **0** exposed
- Responsible parties/owners/officers/qualifying individuals: **0** exposed in the public result
- Raw source-field coverage across release rows: 322 phone observations and 189 email observations

Migration `20260816410000_move_v2_state_observations.sql` adds source-backed state contact observations plus optional website and exact relationship-term storage. Relationship terminology is stored verbatim; “qualifying individual” is never converted to “owner.”

## 19–23. Qualified business onboarding

Only the 52 state-qualified providers (41 movers + 11 brokers) entered `STATE_004B` enrichment. State legal name, DBA, phone, address, city, and ZIP were supplied as corroboration inputs, but did not force acceptance.

- Google providers attempted: **52**
- Existing identities reused: **0**
- New Text Searches: **52**; Place Details: **0**
- Accepted high-confidence identities: **13**
- Review: **27**
- Multiple plausible: **5**
- No match: **6**
- Closed: **1**
- Request efficiency: **4.0 searches per accepted identity**

Twelve accepted identities supplied a website URI: 2 validated high-confidence, 6 review, 4 rejected; one accepted identity supplied no website. Bounded validated-site extraction produced 3 provider-published email observations, 16 phone observations, 35 service observations, and 15 service-area observations. The website crawler reported 2 crawl successes and no security-contract exception.

## 24–27. Service-area precedence

Among state-verified movers that also completed a sufficiently resolved identity/website attempt:

- `SERVICE_AREA_EXPLICIT`: **1**
- `SERVICE_AREA_PARTIAL`: **0**
- `SERVICE_AREA_NOT_FOUND`: **4**
- `SERVICE_AREA_REVIEW`: **6**
- `DERIVED_SERVICE_AREA_REQUIRED`: **4**

Broker rows are excluded from derived local placement. No county or radius was calculated. Explicit provider-published geography remains ahead of future TrustHub inference.

## 28–33. Quality and integrity

- Known false-positive state-match rate: **0/78**
- Idempotency: **PASS** — replay stayed at 5 releases, 326 release rows, 78 matches, 78 current eligibility rows, 52 Google requests, and 223 matched state-contact observations; replay made 0 Google and 0 website calls.
- Official evidence separation: **PASS**
- Source immutability: **PASS** — prior releases remain; current eligibility is derived separately.
- V1 integrity: **PASS** — 468 companies / 15 reviews before and after.
- Commercial firewall: **PASS** — no billing/subscription input enters state, Google, website, service-area, or placement decisions.

## 34. Tests

New regressions cover FDACS pagination deduplication, official state email preservation, exact responsible-party terminology, state-supported Google corroboration without forced matching, and the existing derived-area gate. Focused total: **77 passing**. Final lint, typecheck, full build, and `git diff --check` are recorded after final validation.

## 35–38. Delivery

- Commits: `a056314a` (state observations/qualified onboarding), `f1505d93` (audit ledgers/report), plus final delivery-status commit
- CI: pending final pushed-head verification
- Preview: `https://move-trust-hub-git-move-20-savitz25-s-projects.vercel.app`
- PR #1: **DRAFT; not merged**
- Production changes: **NONE**
- National Google expansion: **NOT RUN**
- Derived county/radius engine: **NOT RUN**

## 39. Task 004B status

**PASS WITH NJ SOURCE PENDING.** Task 004B exhausted the lawful bounded NJ recovery path, produced the regulator-export request artifact, expanded Florida beyond the required mover/review QA floor, onboarded only state-qualified providers, and preserved all safety gates. NJ is not represented as verified, inactive, or unlicensed.

## 40–42. Task 005 readiness and remaining constraint

**READY FOR TASK 005: YES, WITH SCOPE CONDITION.** Prove the derived placement engine using the four qualified Florida movers currently marked `DERIVED_SERVICE_AREA_REQUIRED`, plus a second state whose regulator supplies stable machine-readable authority data. Keep all 2,873 NJ candidates excluded from verified-local eligibility and derived placement until a regulator-provided roster/export is obtained.

The remaining NJ blocker is exact: no stable anonymous machine-readable PM/PW/PC roster/export or reproducible public search request contract is currently available. NJ remains `STATE_DATA_SOURCE_PENDING`; this does not block the generic adapter or a bounded Florida/accessible-state Task 005 proof.
