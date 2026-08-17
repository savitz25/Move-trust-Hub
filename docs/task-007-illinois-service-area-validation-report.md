# Task 007 — Illinois authority and service-area validation

Run date: 2026-08-17

Branch: `move-2.0`

Starting commit: `3cd8bca149490f89296a6b02d1db4d096a793a1c`

Scope: additive code, immutable local acquisition artifacts, and read-only evidence audit. Production writes: **NONE**.

## 1–9. Illinois official source audit and acquisition

The official source audited was the Illinois Commerce Commission (ICC) public Motor Carrier Information System (MCIS): `https://www.icc.illinois.gov/emdb/mcis/search`. The anonymous server-rendered search supports entity name, authority type (`G` = Household Goods Movers), ZIP, city, ILCC number, and USDOT number. Search results lead to stable numeric entity URLs of the form `/emdb/mcis/entity/{entityId}`; profile subresources include filing and case lists.

At runtime, both search and direct entity-profile requests returned an explicit reCAPTCHA interstitial stating that robots/crawlers may not continue. ICC `robots.txt` also disallows general crawling. There is no ordinary anonymous list/pagination contract available to this adapter. No CAPTCHA was solved or bypassed, no private endpoint was used, and search-engine snippets were not ingested as official records. The bounded manifest attempt contained seven known public entity identifiers and stopped on the first interstitial. Therefore:

- Illinois official records acquired: **0 validated records**
- current/inactive distribution: **0 / 0**
- exact USDOT matches: **0**
- high-confidence state-provider matches: **0**
- unmatched/review: **0 ingested; acquisition blocked before a record could be validated**
- DBA/contact observations: **0**
- annual reported move observations: **0**
- insurance observations: **0**

The adapter and schema nevertheless preserve ILCC number, exact status text/dates, DBA, USDOT, contacts, complaint display, annual moves by report year, warehousing status, and insurance-required/on-file observations when a permitted immutable profile release is supplied. Insurance carries the mandatory interpretation `REGULATORY_EVIDENCE_NOT_SAFETY_ENDORSEMENT`. Annual moves are operational evidence only. Exact USDOT is the preferred identity path; name alone remains review. ICC does state that Illinois HHG movers require a license, while the public annual-report instructions describe reported shipments as Illinois intrastate household-goods shipments. These semantics were not broadened into safety, quality, or legality claims.

## 10–14. Qualified Google onboarding and websites

Because no Illinois authority/provider identity passed official acquisition, the qualified Illinois Google queue was empty:

- Google attempts / billable requests: **0 / 0**
- accepted identities: **0**
- review / multiple plausible / no match / closed: **0 / 0 / 0 / 0**
- cost per accepted identity: **not applicable**
- validated Illinois websites: **0**

The 50 exhausted Task 006 FL/WA review providers were not queried again. Existing six validated FL/WA sites were re-audited read-only under the new semantics; no paid Google calls were made.

## 15–23. Claim semantics and structured geography

The versioned `MOVE_SERVICE_GEOGRAPHY_2026_08_V2` contract stores raw text, URL, page title, observation time, claim type, geography type, normalized ID, confidence, normalization version, exhaustive flag, and exclusion flag. Supported claim classes are `EXHAUSTIVE_EXPLICIT_AREA`, `POSITIVE_EXPLICIT_AREA`, `EXPLICIT_EXCLUSION`, `EXAMPLE_LOCATION_MENTION`, `VAGUE_REGION`, and `SERVICE_AREA_REVIEW`. Example/blog/testimonial mentions are retained but cannot create coverage. Only exhaustive language can make unmentioned geography negative ground truth; explicit exclusions are evaluated directly.

Read-only reclassification of the 73 immutable Task 006 raw statements produced 55 positive claim observations, 16 vague-region observations, and 27 review observations after one statement can normalize to multiple geographies. It produced 51 Place observations, 4 county observations, 5 region observations, and 38 retained unstructured observations. There were **0 honest exhaustive observations**, **0 exclusions**, **0 ZIP observations**, and no example-location statement in this small stored set that matched the explicit rejection rule. Counts are observations, not unique claims, and overlap when one raw statement names multiple places.

The known Task 006 false precise claim “Best in Clark County” is now `SERVICE_AREA_REVIEW`, not service geography. “Cities We Serve” flattened without list punctuation remains positive rather than being promoted to exhaustive, because completeness cannot be established safely from the stored text.

## 24–28. Calibration cohorts and representation

- final positive-known cohort: **5 providers** (37 exact positive county/place observations used in shadow scoring)
- final exhaustive cohort: **0 providers**
- final exclusion cohort: **0 providers**
- fleet distribution: **2, 3, 5, 6, and 7 power units** among the positive-known providers
- annual-move distribution: **unavailable** (no permitted Illinois official records)
- urban/rural distribution: **not defensibly classifiable from the retained cohort**

The requested 25 positive / 10 exhaustive targets were not met, so Task 007 is necessarily **PARTIAL**. Rules were not weakened.

## 29–37. V1 shadow evaluation and predictor findings

`MOVE_LOCAL_DERIVED_2026_08_V1` remained SHADOW. Using exact Census Place centroids and county geometry against the unchanged V1 radius captured **34 of 37** known-positive observations: known-positive recall **91.89%**. This is distance agreement only; the five-provider sample is too small for a reliable home-area statistic.

Exhaustive precision, exhaustive recall, exhaustive Jaccard, overcoverage, and undercoverage are **not estimable** because the exhaustive cohort is zero. Exclusion violations are likewise **not estimable (0 tested)**. Unmentioned areas from positive-only claims were not counted as false positives. The prior Task 006 6.25% precision figure is not carried forward as exhaustive precision because those claims did not establish completeness.

No defensible relationship test can be made for service extent versus power units, ICC annual moves, verified business-location count, or urban/rural class. Illinois providers with both power units and reported annual moves: **0**. Moves per power unit is therefore unavailable. No causal inference was made; higher move volume could reflect density inside a small market rather than broader reach.

## 38–42. Model decision and activation gate

**MODEL NOT VALIDATED.** V1 status remains `EXPERIMENTAL_DERIVED`; V2 created: **NO**. Consumer-active reads default `include_experimental_derived = false`; Preview QA must opt in explicitly. Historical Task 005/006 rows and evidence are unchanged.

Activation policy `MOVE_DERIVED_ACTIVATION_2026_08_V1` requires at least 40 positive providers, 20 exhaustive providers, 85% known-positive recall, at most 5% exclusion violations, at most 35% exhaustive overcoverage, at least 10 urban and 5 rural providers, at least three fleet bands, and passed manual QA. The thresholds allow ordinary sampling error but require enough negative evidence to detect harmful expansion. Activation gate passed: **NO** (`POSITIVE_COHORT_TOO_SMALL`, `EXHAUSTIVE_COHORT_TOO_SMALL`, missing exclusion/overcoverage evidence, missing urban/rural representation, manual QA incomplete).

## 43. Census Place geography

Official source: U.S. Census Bureau TIGERweb Current, layers 28 (Incorporated Places) and 30 (Census Designated Places), **January 1, 2025 vintage**. Each stored record has state FIPS, place GEOID/name, geometry, source/vintage, and release hash. Immutable local acquisition results:

- Florida: **958** places; SHA-256 `487e7ebd229c5c163f807f7b9910877383fab221697e061bda23fb6cd4ab5147`
- Washington: **639** places; SHA-256 `c3d8ef70fec5f82a3dbca111ba593a6b276832639e5864419731853b88a620de`
- Illinois: **1,461** places; SHA-256 `4ed690e9f882fcb7540988697e554faf7dea1b4423a8e1e4c6d3a90afae4e3db`

Exact city claims map to Place GEOIDs and never imply an entire county.

## 44. Origin-search performance

The precomputed Task 006 architecture is preserved; no request-time GIS intersections were introduced. No Illinois read rows were published because no Illinois provider passed authority/identity evidence. Existing Task 006 warm benchmarks remain the applicable baseline: ZIP resolver 0.422 ms, ZIP explicit/eligible query 0.048 ms, county explicit/eligible query 0.090 ms, provider evidence 0.466 ms. Place search has schema/index support but no published provider rows, so a meaningful provider-result benchmark is unavailable. Experimental derived reads use the same indexes but are now separately opt-in.

## 45–46. Manual QA and known false claims

Manual QA covered all **5** providers entering the positive-known reclassification and all **0** exhaustive/exclusion providers. This falls below the requested diversity target. Checks covered raw claim semantics, source URL, exact Place/county normalization, no city-to-county expansion, false exhaustive prevention, and explicit/derived separation. Known false precise geographic claims rejected: **1** (“Best in Clark County,” an award statement). No Illinois identity or website was presented as validated.

## 47–53. Integrity

- Idempotency: **PASS** — deterministic parsers, hashes, manifest dedupe, stable read options, and conflict keys
- V1 integrity: **PASS** — model version/formula unchanged; no historical rows rewritten
- Commercial firewall: **PASS** — paid status, rating, reviews, and annual moves have zero eligibility/ranking effect
- Official evidence separation: **PASS** — ICC evidence is additive and cannot overwrite FMCSA
- Official source immutability: **PASS** — releases/hashes are append-oriented; interstitials are not records
- Claim provenance: **PASS**
- Explicit precedence: **PASS**
- Experimental-derived gate: **PASS** — production-facing read default excludes derived
- Production writes: **NONE**

## 54–61. Validation, delivery, and decision

- tests: lint **PASS**; Move V2 typecheck **PASS**; **139/139 tests PASS**; build and final diff check recorded in delivery commit
- commits: recorded in Git history for this task
- GitHub CI: recorded after push
- Vercel Preview: recorded after push
- PR #1: must remain **DRAFT**
- Production changes: **NONE**
- Task 007: **PARTIAL** — code/evidence contracts and derived freeze pass; official Illinois cohort and calibration thresholds do not
- Ready for Task 008: **NO**
- Exact Task 008 recommendation: do not begin Task 008 yet. First obtain an ICC-provided public export or a human-completed, provenance-preserving list of at least 60 current plus a bounded inactive set of MCIS entity IDs under ICC terms; then resume Task 007 to acquire profiles, perform exact-USDOT/FMCSA matching, run qualified Google/website onboarding, reach the 25/10 cohort targets, and rerun the activation gate. If ICC cannot provide that access, select another regulator with an ordinary reproducible public list rather than scaling derived coverage nationally.

New Jersey remains excluded; no AskTrustHub DCA file was ingested. No SEO pages were created. Task 008 was not started.
