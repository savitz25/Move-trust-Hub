# Task 008 — Evidence-first local mover search

Run date: 2026-08-17

Branch: `move-2.0`

Starting commit: `0e96068ea48919a3e282403b505361b193c6ed15`

Production writes: **NONE**

## 1. Search architecture

`MOVE_CONSUMER_DISCOVERY_2026_08_V1` is a versioned, precomputed Preview snapshot. Origin ZIP resolves to a 2020 Census ZCTA centroid, state, and all meaningful county relationships. Local candidates must first have current `STATE_VERIFIED_LOCAL_MOVER` eligibility. Strict provider-published county evidence can create Tier A; otherwise a corroborated business coordinate supports factual proximity discovery only. Providers with conflicting or unresolved locations remain researchable as Tier C without distance. No request-time GIS operation and no experimental-derived placement is present.

## 2–6. Pilot inventory and tiers

- supported local pilot states: **Florida and Washington**
- eligible local movers: **86** — FL 41; WA 45
- strict explicit-area providers: **1**
- verified-location providers: **27**
- proximity-only verified providers: **26** (one verified-location provider also has explicit evidence)
- location review: **51**; location not resolved: **8**

Example distributions:

- Orlando ZIP 32801: Tier A 1, Tier B 2, Tier C 38
- Palm Beach ZIP 33401: Tier A 0, Tier B 3, Tier C 38
- Seattle ZIP 98101: Tier A 0, Tier B 14, Tier C 31

Tier A is explicit/regulatory origin evidence, Tier B is state-verified nearby, and Tier C is other state-verified. These are research-relevance groups, never quality rankings. The 75-mile Tier B presentation window does not exclude anyone; farther providers progress to Tier C and “show more.”

## 7–9. ZIP, county, and distance behavior

The snapshot contains **1,618** FL/WA geographic ZIP resolutions. Unknown/non-geographic ZIPs are unsupported without inventing a location. The representative point is the official 2020 Census ZCTA centroid, so distance is labeled approximate and is never described as street-level pickup distance.

For county claims, the origin evaluates the primary relationship plus cross-county relationships with at least 5% estimated ZCTA overlap. A typed ZIP is therefore not forced into one county when a meaningful crossing exists. These relationships were precomputed in Task 006.

Distance is a haversine/geodesic calculation from ZCTA centroid to a state-consistent, high-confidence Google business coordinate corroborated to the provider identity. A coordinate whose formatted state conflicts with the regulator state becomes `LOCATION_REVIEW`; it is not used for proximity.

## 10. Local/interstate routing

- origin only in FL/WA: local-origin research; UI warns eligibility may change when destination is known
- same-state origin/destination: state-local/intrastate authority path
- different states: existing FMCSA `INTERSTATE_CARRIER` path; state-local authority does not qualify the result
- interstate Preview sample: **8** current federal carrier records

## 11–12. Ordering and commercial firewall

Ordering is Tier A, Tier B, Tier C; then distance ascending; then display name and provider ID. Subscription, paid plan, rating, review count, profile completeness, annual moves, advertising, and lead purchase are absent. Fleet size is displayed factually but does not affect tier, ordering, or language. Regression tests inject paid/rating/review inputs and prove identical results.

## 13–15. Cards, explanations, and service language

Cards show official DBA-first display, different legal name, approximate distance, state authority/status/number, USDOT, power units, primary phone, validated website, service-evidence state, source count, Compare, Shortlist, and Trust Report. The UI deliberately avoids ratings and “best,” “recommended,” “available,” “serves you,” or licensing-as-trust language.

Every card contains an expandable “Why am I seeing this?” explanation. Explicit example: current state registration plus the company-published normalized county. Proximity example: current registration plus approximate location distance and an explicit statement that exact pickup service is not independently confirmed. Non-explicit cards say “Service area not independently confirmed” and tell the consumer to confirm pickup/destination availability directly.

## 16. Provider Trust Report

The expandable Preview Trust Report contains Overview/identity, Authority, Contact, Service Area, Fleet/Operations, and Sources/History content. Explicit claims preserve exact text and normalized evidence. Missing explicit geography says: “We have not found a sufficiently specific provider-published service area.” Experimental radii are never shown.

## 17–18. Compare and shortlist

Compare supports **2–4** movers and displays authority, distance, service evidence, fleet, identity, and contact facts. It computes no score and explicitly selects no winner. Shortlist uses local browser storage, requires no account, and has no lead form or paid influence.

## 19–20. Unsupported NJ and Illinois behavior

NJ local Preview shows that state-license verification is still being completed and that interstate research remains available where federal authority applies. It never calls candidates unlicensed. Illinois local Preview says a permitted ICC authority release is required and exposes no partial ICC inference. Neither state can produce a state-verified local result.

## 21. Experimental-derived isolation

`MOVE_LOCAL_DERIVED_2026_08_V1` remains `EXPERIMENTAL_DERIVED`. Consumer discovery has no derived field, row, radius, or fallback. Existing origin reads still default `include_experimental_derived=false`. V2 was not created and historical V1 records were not modified.

## 22. Query benchmarks

The checked-in benchmark is `docs/task-008-consumer-search-benchmarks.json`. Mean in-process snapshot times across 1,000 iterations:

- ZIP resolution: 0.0002 ms
- eligible candidate set: 0.0021 ms
- explicit matches: 0.0510 ms
- proximity ordering: 0.0314 ms
- provider Trust Report lookup: 0.0002 ms
- compare four: 0.0267 ms

These measure the bounded Preview read snapshot rather than network latency. No GIS intersection executes during a consumer request.

## 23–24. Manual QA and known false claims

QA covered Florida local (32801 and 33401), Washington local (98101), FL→WA interstate, unsupported NJ 07102, unsupported IL 60601, strict claim/proximity language, DBA/legal display, Tier ordering, cross-county matching, compare bounds/no-winner, shortlist persistence contract, and derived-string absence. The production build rendered the route successfully at compile time. Live in-app browser screenshot/interaction QA could not run because no browser backend was connected in this session; an attempted local development server also hit the repository’s pre-existing optional-catch-all route conflict, while the production build passed.

Known false precise service claim: “Best in Clark County” remains rejected as an award statement and does not enter Tier A. Proximity created **zero** service-area observations.

## 25. Tests and integrity

- Move V2 lint: **PASS**
- Move V2 typecheck: **PASS**
- Move V2 tests: **163/163 PASS**
- production build: **PASS**
- V1 integrity: **PASS**
- commercial firewall: **PASS**
- official evidence separation: **PASS**
- source provenance: **PASS**
- explicit precedence: **PASS**
- experimental-derived gate: **PASS**
- production writes: **NONE**

## 26–32. Delivery and decision

- commits: recorded in final Git history
- GitHub CI: recorded after final push
- Vercel Preview: recorded after final push
- PR #1 remains **DRAFT**
- Production changes: **NONE**
- Task 008: **PASS**, subject to the disclosed local browser-backend limitation; automated contract/build and hosted Preview gates are authoritative
- Ready for Task 009: **YES** after hosted Preview is Ready
- Recommended Task 009 scope: expand high-confidence provider website/service-area acquisition in FL/WA, add precomputed Census Place and ZIP explicit-match publication, improve verified-location conflict resolution, and graduate the discovery snapshot to a server read API with freshness/invalidation—without changing the evidence tiers, activating derived geography, introducing paid ordering, or starting unsupported NJ/IL local eligibility.

Task 009 was not started. No merge or Production deployment was performed.
