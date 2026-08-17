# Task 006 — Service-area calibration and origin-search read model

Run date: 2026-08-17  
Branch: `move-2.0`  
Starting commit: `fc645635c6aa106b79a915fec03e34bba10401c2`  
Scope: bounded FL/WA additive `move_v2` data and Preview-only QA

## 1–5. Calibration acquisition

The Task 005 starting cohort was **3 explicit/partial providers**, already known to be insufficient. Task 006 reprocessed **50** state-verified FL/WA mover identity review or multiple-plausible records. Up to three deterministic variants were permitted per provider; **148 Text Search requests** were made under provider/variant idempotency keys. They produced **0 additional high-confidence identities**, **2 closed-business decisions**, and 48 providers that correctly remained review. Prior decisions remain in versioned history. Cost accounting is 148 billable Search Text units; no Place Details calls were made.

The service-area crawl considered 26 high-confidence identities with Google website URIs. Six websites met the unchanged high-confidence website threshold; 20 remained review. The crawler fetched 26 bounded pages across those six validated sites using HTTPS, same-domain, robots-aware, SSRF-protected requests. No national enrichment occurred.

## 6–15. Explicit geography normalization

The crawler retained **73 raw claim observations across 6 providers**:

- exact county: **3 observations / 2 providers**
- exact city: **0**
- exact ZIP: **0**
- named region: **4 observations / 1 provider**
- unstructured named service-area language: **66 observations / 6 providers**
- explicit exclusions/conflicts: **0 / 0** in the bounded live evidence

Raw claims, URLs, observation time, confidence, normalization reason, and exclusion status are separate from normalized geography. Exact county names map to official county GEOIDs. Named regions such as Central Florida remain `REGION` observations without automatic county expansion. Contact-address ZIPs are not service claims; an initial QA pass detected this risk, its tentative rows were transactionally removed, the extractor was tightened, and the clean run produced zero ZIP claims.

The final sufficiently structured calibration cohort is therefore **2 providers**, not 25. Both are in the 6–10 power-unit band. Urban/rural, coastal/border, and multi-band distributions are not statistically assessable. The stricter count is lower than the Task 005 heuristic cohort because vague and malformed legacy snippets are no longer treated as precise geography. No evidence threshold was weakened.

## 16–24. Shadow calibration

`MOVE_LOCAL_DERIVED_2026_08_V1` ran in shadow mode for both exact-county providers. Edge intersections were excluded from ordinary coverage scoring.

- providers: **2**
- true-positive counties: **2**
- derived-only counties: **30**
- explicit-only counties: **0**
- county precision: **0.0625**
- county recall: **1.0000**
- Jaccard agreement: **0.0625**
- overcoverage rate: **0.9375**
- undercoverage rate: **0.0000**

These values are descriptive only; two providers in one fleet band cannot validate fleet-size inference, urban/rural behavior, border behavior, or causation. The observed pattern warns of substantial overcoverage for this tiny cohort.

## 25–26. Model decision

**MODEL NOT SUFFICIENTLY VALIDATED.**

No `MOVE_LOCAL_DERIVED_2026_08_V2` was created. V1 and all historical V1 outputs remain immutable and inspectable. Its historical formula remains:

```text
clamp(45 + 22 × ln(max(1, power_units)), 45, 185)
```

It remains a bounded pilot hypothesis, not a validated national rule or quality signal.

## 27–28. ZCTA foundation

The source is the official [U.S. Census Bureau 2020 ZCTA program](https://www.census.gov/programs-surveys/geography/guidance/geo-areas/zctas.html) and [TIGERweb Census 2020 ZCTA layer 84](https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Census2020/MapServer/84?f=pjson), **January 1, 2020 vintage**. The Census explicitly defines ZCTAs as generalized areal representations of ZIP Codes; they are not USPS delivery boundaries, and not every valid ZIP has a ZCTA.

- FL source-range features / retained intersecting ZCTAs: **1,013 / 1,013**; SHA-256 `9becc0825ef9905cb7928cbea39b56b7b47d85cc74d3de85640de55fa52e93ea`
- WA source-range features / retained intersecting ZCTAs: **605 / 605**; SHA-256 `fb4aa5ea3d88f76aeb1ddb2b768392f785ce5ccbd7f1238c72859c0b8ac1c08e`
- county relationships: FL 1,200 and WA 720
- cross-county ZCTAs: FL 160 and WA 103
- typed-ZIP resolver coverage: **1,618 geographic ZCTAs** in the bounded FL/WA layer

Invalid five-character input returns `REVIEW`; unknown/non-geographic input returns `UNSUPPORTED_NON_GEOGRAPHIC`. No PO-box or missing ZIP geometry is invented.

## 29–32. Origin-search read model

Release `MOVE_ORIGIN_SEARCH_2026_08_V1` contains **103 county-origin rows** and **2,373 ZIP-origin rows** across **10 providers**. It is a bounded engineering read model, not a public directory.

Placement distribution, counting county and ZIP rows together:

- `PROVIDER_EXPLICIT_COUNTY`: 72 rows / 2 providers (2 county + 70 ZCTA)
- `TRUSTHUB_DERIVED_HOME_COUNTY`: 436 rows / 8 providers (8 county + 428 ZCTA)
- `TRUSTHUB_DERIVED_MEANINGFUL_COVERAGE`: 1,968 rows / 8 providers (93 county + 1,875 ZCTA)
- `DERIVED_EDGE_INTERSECTION`: **0 consumer rows**
- regulatory-only search placement: 0; statewide legal authority is not misrepresented as statewide geographic relevance

Eligibility is joined first: current state-verified mover, carrier role, resolved identity, FL/WA only. Broker-only, inactive, NJ, and auto-only providers are excluded. Ordering is explicit evidence, regulatory evidence when genuinely geographic, derived home county, then derived meaningful coverage; deterministic proximity/provider ID tie-breaking cannot alter trustworthiness. Paid status, ratings, reviews, and profile completeness are absent.

## 33. Query benchmarks

Warm `EXPLAIN ANALYZE` execution times:

- ZIP → resolver: **0.422 ms**
- ZIP → movers: **0.048 ms**
- county → movers: **0.090 ms**
- provider → placements: **0.475 ms**
- provider → evidence: **0.466 ms**

Fresh-connection/cold-ish client timings and complete plans/buffers are preserved in `docs/task-006-origin-search-audit.json`; all remain comfortably below 100 ms. No request-time polygon intersection occurs.

## 34. Freshness and invalidation

The release fingerprint includes current state eligibility/version/timestamp, explicit geography and rule version, derived model inputs/supersession, and ZCTA source release/vintage. Authority, identity/geography, HQ/branch, fleet, model, or geography-vintage changes create a new release and invalidate prior active read rows while preserving history. A same-input rebuild returns the existing release and writes nothing.

## 35–36. Manual QA

`docs/task-006-origin-search-qa.csv` contains 10 ZIP and 10 county searches spanning WA and FL metro, coastal, interior, rural, and border-adjacent examples plus unsupported ZIP `99999`. All 2 exact-county calibration providers, all 8 derived providers, cross-county ZCTA relationships, explicit-vs-derived precedence, stale/inactive eligibility gating, and later-explicit supersession were inspected through the read model and regression suite.

Known false-positive precise geographic claims: **0**. The tentative contact-ZIP extraction was removed before publication. Zero derived rows are labeled as provider-published facts.

## 37–42. Integrity

- Idempotency: **PASS** — identical origin rebuild returned the existing release; no duplicate rows or API calls
- V1 integrity: **PASS** — 468 companies / 15 reviews unchanged
- Commercial firewall: **PASS**
- Official evidence separation and source immutability: **PASS**
- Model/source/normalization provenance: **PASS**
- Explicit-area precedence: **PASS**
- NJ origin placements: **0**
- auto-only origin placements: **0**
- Production writes: **NONE**

## 43–50. Delivery

- Tests: pending final quality-gate update
- Commits: pending final delivery update
- GitHub CI: pending
- Vercel Preview: pending
- PR #1: **DRAFT**
- Production changes: **NONE**
- Task 006: **PARTIAL** — origin read model passed; the requested calibration cohort could not be obtained honestly and the fallback model remains unvalidated
- Ready for Task 007: **YES**, if Task 007 is scoped to evidence acquisition rather than model rollout

Recommended Task 007 scope: acquire a materially larger structured explicit-area cohort through provider-authorized profile claims and/or another state with accessible official authority plus deterministic business identity; add official Census place geometry for exact city claims; validate 25–40 providers across fleet and urban/rural bands; rerun shadow metrics; only then decide whether to retain, supersede, or retire V1. Do not scale derived placement, add NJ, generate SEO pages, or introduce ranking until that evidence threshold is met.
