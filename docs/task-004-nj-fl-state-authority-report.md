# Task 004 — NJ + FL State Authority and Onboarding Pilot

Run date: 2026-08-16  
Branch: `move-2.0`  
Starting commit: `1ffec89d`  
Scope: additive `move_v2`, Preview/development only

## 1. NJ official source audit

The current regulator is the New Jersey Division of Consumer Affairs, Regulated Business Section, Public Movers and Warehousemen. The [official FAQ](https://www.njconsumeraffairs.gov/pmw/Pages/FAQ.aspx) says intrastate public movers and warehousemen require licensure and defines PM as moving, PW as warehousing only, and PC as moving plus warehousing. The [current program page](https://www.njconsumeraffairs.gov/pmw) was last modified June 22, 2026.

The legacy MyLicense verification path now directs PMW searches to the current RGB portal. The former downloadable roster location no longer exposes a PMW roster. The current Power Pages portal was inspected and its entity-list contract was identified, but no stable public bulk export or documented machine endpoint could be validated. Direct bounded attempts against its grid endpoint returned 404/500 responses. No NJ authority record was guessed, scraped without bounds, or published. Adapter `NJ_RGB_2026_08_V1` records this constrained portal contract; a regulator-provided export/API or a validated portal request contract is required for population-scale publication.

## 2. FL official source audit

The [FDACS moving-company FAQ](https://www.fdacs.gov/Business-Services/Moving-Companies-FAQ) confirms that intrastate movers and moving brokers register separately and biennially under Chapter 507. The [consumer guidance](https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida) directs consumers to the official lookup. The [official Business License Lookup](https://csapp.fdacs.gov/CSPublicApp/BusinessSearch/BusinessSearch.aspx) exposes distinct IM (Intrastate Mover) and MB (Moving Broker) programs, business identity/contact fields, issue/expiration dates, status, and complaint-detail affordances.

No bulk export was found. Adapter `FL_FDACS_2026_08_V1` therefore uses cached ASP.NET state, a fixed program query, a configurable 1–10 page cap, a 90-second timeout, one sequential request stream, snapshot hashes, and a release ledger. The pilot fetched three pages per program: 60 IM rows and 53 MB rows.

## 3. Adapter architecture

Migration `20260816400000_move_v2_state_authority_pilot.sql` adds release, immutable source-record, state-match, derived local-eligibility, and request-ledger structures. State evidence never overwrites FMCSA facts. Matching requires an exact legal/DBA name plus at least one address, phone, city, or ZIP corroborator; a name alone is review. Current eligibility is derived separately and versioned as `MOVE_STATE_ELIGIBILITY_2026_08_V1`.

## 4–5. Local candidate universes

| State | Candidates | 1–2 units | 3–5 | 6–10 | 11–20 | 21–50 | 51+ | DBA | Phone |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| NJ | 2,873 | 1,952 | 295 | 95 | 49 | 23 | 18 | 517 | 2,865 |
| FL | 9,005 | 6,186 | 715 | 229 | 95 | 44 | 55 | 1,931 | 8,960 |

Task 003 state-local status: NJ 38 Google attempts / 1 accepted / 1 website; FL 37 attempts / 0 accepted / 0 websites.

## 6–14. State results

NJ publication remains unresolved because no stable official roster/export could be obtained: 0 state matches, 0 verified active, 0 inactive, and 2,873 unresolved candidates. These are **not** labeled unlicensed.

The bounded FL release published 113 source records and produced 45 high-confidence provider links:

- 19 `STATE_VERIFIED_LOCAL_MOVER`
- 11 `STATE_VERIFIED_MOVING_BROKER`
- 15 `STATE_AUTHORITY_REVIEW` because the bounded result exposed an unknown/non-current status, not an explicit inactive status
- 0 falsely asserted inactive records

Every accepted match has exact name plus corroboration. Reason distribution: 25 name+phone+ZIP+city; 13 name+ZIP+city; 2 name+phone; 2 name+ZIP; 2 name+phone+ZIP; 1 name+phone+city.

The 45-row trace ledger is in `docs/task-004-manual-qa.csv`. It includes USDOT, legal/DBA display, fleet size, program, license number, source status, score, and reason codes.

## 15–22. Onboarding and geography

No new Google call was made and no website crawl was run in Task 004. Consequently Google recall improvement and Google cost are both zero. This respects the bounded-state rule and avoids spending against candidates whose state identity is unresolved.

No provider is marked `DERIVED_SERVICE_AREA_REQUIRED`: all 45 resolved state records still lack a resolved Task 003 business identity/website onboarding chain. The rule requires active state eligibility, attempted Google onboarding, resolved identity, attempted website discovery, and no useful explicit geography. Branch locations remain separate from service areas. No county/radius placement was calculated.

Counts: explicit 0; partial 0; not-found 0; identity/onboarding blocked 45; derived-required 0.

## 23–24. Manual QA and false positives

All 45 published high-confidence links were included in the database QA ledger. This covers 19 active movers, 11 active brokers, and 15 status-review records across varying fleet sizes and DBA patterns. Known false-positive high-confidence state matches: **0/45**.

The requested NJ positive/inactive/not-found sample and the full FL 25-active sample could not be honestly completed without a usable NJ official roster and a larger bounded FL release. Task 004 therefore does not claim the requested minimum QA as complete.

## 25–29. Integrity gates

- Idempotency: **PASS** — same-release rerun remained 3 releases / 113 source rows / 45 matches / 45 current eligibility rows.
- State-source immutability: **PASS** — append/release-oriented evidence tables; derived current eligibility is separate; browser roles revoked.
- Official evidence separation: **PASS** — FMCSA, state, Google, and provider-published data remain separate.
- V1 integrity: **PASS** — before/after remains 468 companies / 15 reviews; no V1 writes or schema changes.
- Commercial firewall: **PASS** — matcher and eligibility inputs contain no subscription/billing fields; regression test passes.

Neutral future language is contractually limited to “New Jersey mover license verified,” “Florida mover registration verified,” “State registration not found in the current official source,” and “State authority requires review.” Licensing is evidence, not endorsement.

## 30. Performance

`EXPLAIN ANALYZE` results are in `docs/task-004-query-benchmarks.json`:

- FL state + verified local movers: 0.065 ms
- provider → state authority: 0.757 ms
- license number → provider: 0.515 ms (license index used)
- provider → explicit service geography: 0.396 ms
- derived-required lookup: 0.036 ms

The existing Task 002A auto state-query debt remains logged; no unrelated public search query was changed.

## 31. Tests

Added 15 Task 004 regressions. Total focused Move V2 tests: 74 passing. The Experience Lab now shows source-labeled synthetic state-authority and geography states. Production remains a hard 404 and the page remains noindex.

## 32–36. Delivery status

- Commits: `26732eaa` (state adapters/schema/tests/Preview), `4062e689` (audit ledgers/report), plus the final report-status commit
- CI: pending final pushed-head verification
- Preview: `https://move-trust-hub-git-move-20-savitz25-s-projects.vercel.app`
- PR #1: **DRAFT; must remain draft**
- Production changes: **NONE**
- Google enrichment: **NOT RUN**
- Website enrichment: **NOT RUN**
- State-derived county placement: **NOT RUN**

## 37. Recommendation for Task 005

Do not begin Task 005. First obtain a stable official NJ PM/PW/PC export or documented portal data contract, expand the bounded FDACS snapshot enough to satisfy the prescribed Florida QA mix, and then complete business-identity/website onboarding for state-verified movers. Only providers completing that chain may be candidates for derived placement.

## 38. Ready for Task 005?

**NO.** Task 004 is **PARTIAL / FAIL** because the NJ official population and mandated NJ/FL QA minima are not complete. The architecture, Florida bounded pilot, evidence separation, idempotency, V1 integrity, and commercial firewall pass; no unsupported state eligibility was published.
