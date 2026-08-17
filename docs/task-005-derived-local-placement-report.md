# Task 005 — Washington authority and derived local placement pilot

Run date: 2026-08-17  
Branch: `move-2.0`  
Starting commit: `f0e6f3fca828e8bfa143e5b81ffae3c692ef2b75`  
Scope: additive `move_v2` data and Preview-only QA

## 1–7. Washington official authority

The [Washington UTC Companies Lookup](https://www.utc.wa.gov/companies?combine=&exposed_select_industry=568&regulatory_status=1&usdot=) and [UTC household-goods program page](https://www.utc.wa.gov/MovingCompanies) were reverified at runtime. The ordinary anonymous lookup is paginated at 50 rows, supports the Household Goods Carrier industry and regulatory-status filters, and links stable `/company/{nodeId}` detail pages. Detail pages expose the UTC company ID, company/legal name, DBA, UBI, USDOT, industry/status, contacts, addresses, and permit/industry facts. No authentication, CAPTCHA bypass, private endpoint, or hidden API was used.

The bounded immutable pilot contains **65 official records**: **50 ACTIVE**, **9 INACTIVE**, and **6 UNREGULATED**. It includes 23 DBAs, 65 UBIs, 56 USDOTs, 60 phones, 54 emails, and 56 addresses. Release SHA-256: `5d8d6ff352777530d31f7b4cdfb9b9789947337c70bb4aad658c798f476b0b52` (35,452 bytes).

Exact USDOT resolution produced **50 high-confidence FMCSA/provider matches** and **15 neutral unmatched/review records**. Current eligibility contains **45 state-verified active WA movers** and **5 matched inactive movers**. No name-only merge is performed. UTC ID, UBI, USDOT, status, DBA, phone, email, and address remain separate state-source observations and do not overwrite FMCSA evidence.

## 8–13. Qualified onboarding and geography evidence

Only the 45 state-verified WA movers entered the bounded `STATE_005_WA` queue. State evidence corroborated identity but never forced a Google match.

- Google attempts/new searches: **45**
- Accepted high-confidence: **16**
- Review: **25**
- Multiple plausible: **1**
- No match: **3**
- Closed: **0**
- Billable requests: **45**
- Website attempts from accepted identities: **16**
- Website high confidence/review/rejected: **3 / 10 / 3**
- Successful bounded crawls: **3**
- Provider-published observations: 4 emails, 7 phones, 12 services, 4 service areas, 0 branches
- Geography among resolved movers: **2 explicit**, **0 partial**, **10 review**, **4 not found / derived-required**

Explicit and partial provider geography remain authoritative for display and are never enlarged by the fallback model.

## 14–16. Derived pilot population

The eligibility gate requires current state authority, a carrier/mover role, resolved identity, completed business/website discovery where possible, and `SERVICE_AREA_NOT_FOUND`. Brokers and unresolved identities cannot enter.

- Derived-required movers in scope: **8**
- Florida entering model: **4**
- Washington entering model: **4**
- New Jersey entering model: **0**

All four Florida records passed their existing freshness/identity gates. County/radius output exists only for these eight pilot providers.

## 17–22. Calibration and model

The shadow calibration cohort contains only **3** FL/WA providers with explicit/partial geography. That is not statistically adequate to establish a reliable fleet-to-service-extent relationship. No correlation, accuracy, or trust conclusion is claimed. Shadow results are stored, never published in place of explicit geography.

Conservative fallback model: `MOVE_LOCAL_DERIVED_2026_08_V1`.

```text
radius_miles = clamp(45 + 22 × ln(max(1, FMCSA_power_units)), 45, 185)
```

The smooth logarithmic function avoids bucket cliffs, starts at 45 miles, and caps at 185 miles. It is a versioned hypothesis for search-origin relevance—not a provider claim, destination limit, safety measure, recommendation, or regulatory fact. Ratings, reviews, popularity, and subscription state are excluded. A branch with unknown fleet allocation receives only 35% of company radius, capped at 50 miles; it never receives the full fleet automatically.

## 23–29. Boundary, county geometry, QA, and supersession

County geometry is the official U.S. Census TIGERweb Counties layer 82, **January 1, 2025 vintage**, WGS84 GeoJSON. The captured releases contain 67 Florida and 39 Washington counties. Geometry and hashes are stored separately from provider inference.

Only counties in the provider's verified state are evaluated, so radii are clipped to Florida or Washington. Origin placement and destination/legal eligibility remain separate. No NJ geometry or placement was published.

The deterministic geometry evaluator uses polygon containment and a 24×24 within-polygon sampling grid. Results are:

- `HOME_COUNTY`: verified center lies inside county
- `DERIVED_MEANINGFUL_COVERAGE`: estimated county-area overlap is at least 15%
- `DERIVED_EDGE_INTERSECTION`: intersection exists but is below 15%; it is not represented as whole-county service

Published provider→county rows: **123** — Florida 64 (4 home, 50 meaningful, 10 edge) and Washington 59 (4 home, 43 meaningful, 12 edge). State-border, coastal/water, large/small county, and edge relationships were inspected through the geometry output. The 29-row QA ledger is `docs/task-005-manual-qa.csv`: every Florida derived provider plus 25 Washington authority records (active/inactive, DBA/non-DBA, exact/missing identifiers). Zero derived records are represented as provider-published facts.

If explicit or partial geography arrives later, the current derived area and county rows are deactivated/superseded, not deleted. Historical inputs, model version, reason, timestamps, and county evidence remain inspectable.

## 26–27. Shadow evaluation findings

The explicit sample was too small and insufficiently structured to compute defensible median distance error, county agreement, urban/rural splits, or over/undercoverage rates. The stored shadow evaluation therefore reports `INSUFFICIENT_STRUCTURED_EXPLICIT_GEOGRAPHY_FOR_DISTANCE_ERROR`. Explicit geography remains the published truth regardless of hypothetical model output. Task 006 should enlarge the validation cohort before revising the formula.

## 30. Performance

Precomputed reads avoid request-time GIS work. Warm `EXPLAIN ANALYZE` results:

- county → eligible local movers: **0.251 ms**
- provider → counties: **0.063 ms**
- provider → model evidence/reason: **0.046 ms**

Plans and buffers are retained in `docs/task-005-derived-placement-audit.json`. Additive indexes cover state/county/active placement, provider/placement type, and active provider/model lookup.

## 31–35. Integrity gates

- Idempotency: **PASS** — same model/release replay created 0 new areas; totals remained 8 areas / 123 county rows
- V1 integrity: **PASS** — no V1 schema/data writes; prior 468 companies / 15 reviews baseline unchanged
- Commercial firewall: **PASS** — billing/subscription is absent from authority, radius, county, and inclusion inputs
- Official evidence separation and source immutability: **PASS**
- Derived/model provenance: **PASS** — source releases, geometry vintage/hash, formula/version, input snapshot, reason, timestamps, and supersession are retained

## 36. Tests

`npm run lint:move-v2`, `npm run typecheck:move-v2`, `npm run test:move-v2` (**92 passing**), `npm run build`, and `git diff --check`: **PASS**. Regression coverage includes WA authority/status/identifiers, name-only rejection, broker and unresolved gates, precedence, state clipping, fleet/legal separation, commercial firewall, conservative branches, supersession, meaningful county overlap, idempotency, and zero NJ placement.

## 37–43. Delivery

- Commits: pending final delivery update
- GitHub CI: pending final delivery update
- Vercel Preview: pending final delivery update
- PR #1: **DRAFT** (must remain draft)
- Production changes: **NONE**
- Task 005: **PASS**, subject to final CI and Preview confirmation
- Ready for Task 006: **YES**, after final CI/Preview confirmation

Recommended Task 006 scope: enlarge the explicit-area calibration cohort using Florida plus another state with accessible official authority; measure explicit-vs-shadow county agreement and urban/rural error; refine or retain the versioned fallback from evidence; then build a bounded local-origin county/ZIP read model. Keep NJ excluded until a regulator roster is received, preserve explicit-area precedence, and do not introduce quality ranking or paid influence.
