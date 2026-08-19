# Task 003 — Combined HHG + Auto Business Identity Enrichment

Date: 2026-08-16  
Branch: `move-2.0`  
Starting commit: `bf67f8e9`  
Scope: Preview/development pilot only

## 1. Existing Google integration audit

The existing server-side Places API (New) implementation in `lib/verification/google-places.ts` was reused. It uses `GOOGLE_PLACES_API_KEY`, Text Search and Place Details endpoints, explicit field masks, retry/backoff, and V1 persistence. Task 003 added a single-search bounded entry point, international phone, coordinates, business status, primary type, and pure-service-area-business fields. Reviews were removed from the Task 003 discovery mask. Place IDs are durable; other Google content is held in a 30-day expiring server-side cache. No key is exposed to browser code.

Google policy references: [Places API policies](https://developers.google.com/maps/documentation/places/web-service/policies), [Place IDs](https://developers.google.com/maps/documentation/places/web-service/place-id), and [field selection](https://developers.google.com/maps/documentation/places/web-service/data-fields).

## 2. Reused V1 enrichment assets

V1 contained 468 companies and 15 reviews. Existing Place IDs, Google snapshots, websites, phones, USDOTs, and MCs were audited before calls. Four possible V1 links were evaluated; two initially met deterministic corroboration. Manual QA found one of those had a street conflict, so the matcher was tightened and that identity was moved to review. Final reusable high-confidence identity count: **1**. V1 source provenance remains intact.

## 3. Schema changes

Applied additive migrations:

- `20260816300000_move_v2_business_identity_enrichment.sql`
- `20260816310000_move_v2_google_place_review_identity.sql`
- `20260816320000_move_v2_enrichment_idempotency.sql`

They add a resumable queue, durable Place-ID matches, expiring Google cache, request ledger, website identities, provider-published observations, business locations, geography evidence, indexes, RLS, and public-role revocation. No V1 object was changed.

## 4–12. Queue and Google pilot

- Wave A unique providers: **5,267**
- Pilot providers: **243** unique provider IDs
- Sample composition before overlap/deduplication: 50 HHG interstate, 25 HHG broker/dual, 75 auto carrier, 25 auto broker/dual, 38 NJ local, and 37 FL local
- Existing Google identities reused at high confidence: **1**
- Existing identity demoted to review after QA: **1**
- New Text Search calls: **241**
- Place Details calls: **0** (search response field mask was sufficient)
- New high-confidence matches: **14**
- Total accepted identities: **15**
- Review matches: **196** (195 new plus one reused identity conflict)
- Multiple plausible matches: **9**
- Total review queue: **205**
- No matches: **17**
- Closed businesses: **6**
- Google request total: **241 billable Text Search requests**, zero Details requests

The first unconfigured local attempt produced no network requests and was repaired in the ledger with a zero billable count. A completed rerun attempted zero providers and made zero Google calls.

## 13–21. Websites, contacts, services, geography, and conflicts

Only accepted Google identities with plausible websites entered website validation. The crawler attempted 14 identities during the pilot. After QA demotion and dependent-evidence cleanup, the published database contains:

- High-confidence websites: **2**
- Website review: **7**
- Website rejected: **4**
- Successful bounded crawls retained: **2**
- Email observations: **3 rows** from **1 unique provider/value**
- Additional phone observations: **6 rows** from **2 unique provider/value pairs**
- Branch locations: **0**
- HHG service observations: **3 rows**
- Auto service observations: **0**
- Provider-published service-area observations: **1 row**
- Service area partial: **1 provider**
- Service area explicit: **0 providers** after the conflicted identity was demoted
- Service area not found: **14 providers**
- Derived placement required later: **14 providers**
- Service area review: **0 providers**
- Identity conflicts: **161 providers** carry machine-readable conflict codes; the critical reused-place address conflict was demoted rather than accepted

Explicit provider-published geography always takes precedence over later inference. Branches remain separate factual locations. Fleet size never expands or overwrites explicit geography. No derived radius, county placement, or cross-state eligibility was calculated.

## 22–24. Manual QA, false positives, and API totals

The committed QA ledger contains **50 providers**: all **15 accepted identities** plus **35 review cases**. Every accepted identity has exact phone or exact street corroboration and no conflict code. The discovered V1 street conflict was treated as a false-positive candidate, the acceptance rule was tightened, and its downstream derived evidence was removed. Known false-positive rate in the final high-confidence set: **0/15 (0%)**.

API totals: **241 Text Search**, **0 Place Details**, **241 total billable requests**. No API keys or transient Google content are committed. The Preview sample contains only durable Place IDs and TrustHub match decisions.

## 25. Idempotency — PASS

The same pilot was rerun. Google attempted **0** providers and issued **0** calls; website enrichment attempted **0** providers. Unique constraints prevent duplicate matches, snapshots, contacts, services, locations, and service areas. Request idempotency keys prevent restart billing.

## 26. Website crawler security — PASS

The bounded crawler enforces HTTPS, robots awareness, same-domain redirects, DNS resolution before requests, private/link-local/loopback/cloud-metadata blocking, redirect limits, timeouts, 2 MB payload limits, HTML content types, and a five-page pilot budget. It performs no login, forms, arbitrary JavaScript, recursive crawl, or arbitrary downloads.

## 27. Official evidence separation — PASS

FMCSA facts remain in official source/fact structures. Google identity and rating fields remain third-party observations. Website contacts, services, and geography remain provider-published observations. Neither source can modify regulatory classification or eligibility.

## 28. V1 integrity — PASS

V1 baseline and final counts remained **468 companies / 15 reviews**. The pipeline performs read-only V1 reuse QA and writes only additive `move_v2` structures.

## 29. Commercial firewall — PASS

No billing, subscription, sponsorship, or paid-status input enters queue priority, match scoring, website validation, contact selection, classification, eligibility, or evidence. Regression coverage locks this rule down.

## Performance

Warm PostgreSQL `EXPLAIN ANALYZE` execution times:

- provider → Google match: 0.139 ms
- Place ID → provider: 0.112 ms
- provider → website: 0.048 ms
- provider → contacts: 0.047 ms
- provider → service observations: 0.062 ms
- provider → locations: 0.042 ms
- provider → service areas: 0.090 ms
- bounded review queue: 0.240 ms

The Task 002A state → active auto carrier/broker query debt (about 1.2–1.3 seconds warm) remains a required pre-public-directory optimization. It was not coupled to enrichment and was not hidden by an unrelated index.

## 30. Tests

Task 003 adds all 15 required matching, reuse, source-separation, commercial-firewall, SSRF, and idempotency regressions plus explicit-service-area precedence tests. `lint:move-v2`: PASS; `typecheck:move-v2`: PASS; `test:move-v2`: **59/59 PASS**; production build: PASS; `git diff --check`: PASS.

## 31–35. Delivery state

- Commits: `f6ffe98b` (pipeline/schema/tests), `e32a8c53` (Preview evidence QA), plus this final documentation commit
- CI: **PASS** — push run `31978027247` and PR run `31978028928`
- Preview URL: `https://move-trust-hub-git-move-20-savitz25-s-projects.vercel.app` — target `preview`, Ready
- PR #1: **DRAFT; not merged**
- Production changes: **NONE**
- Google enrichment in Production: **OFF**
- Website enrichment in Production: **OFF**
- State-license enrichment: **NOT RUN**

## 36. Recommendation for next enrichment wave

Do not scale nationally at the pilot acceptance rate. First improve candidate recall using deterministic query variants without relaxing the acceptance threshold, add a human review workflow for the 205 ambiguous identities, and validate cost per accepted identity. Then expand Wave A in capped batches with the same idempotent ledger.

## 37. Recommended local-state rollout sequence

Continue with **New Jersey and Florida** because the pilot queue, local-carrier fleet strata, and service-area evidence model are already established. Add state-authority adapters before consumer eligibility or geographic placement. Only after regulatory eligibility should explicit website geography be used; derived placement remains fallback-only.

## 38. Ready for Task 004?

**YES**, subject to Task 004 respecting the review queue, source separation, state-authority-first eligibility, and no Production activation. Task 004 has not begun.
