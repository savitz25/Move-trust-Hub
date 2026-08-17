# Task 009 — Provider Data Quality, Server Discovery API, and Browser QA

Status date: 2026-08-17. Branch: `move-2.0`. Production changes: **NONE**.

1. Starting provider-quality metrics: 86 eligible movers; 27 verified locations, 51 location review, 8 unresolved; 1 strict explicit-area provider.
2. Location reviews inspected: all 51, plus all 8 unresolved records, using regulator, FMCSA, cached Google, and validated-site observations.
3. Newly verified locations: 25; final verified count **52**. Promotion required exact official phone or address/city/ZIP corroboration. Name-only evidence never qualified.
4. Remaining location review: **34**. Decisions retain `STATE_VS_FMCSA_ADDRESS_CHANGE`, `GOOGLE_WRONG_STATE`, `MULTIPLE_BRANCH_AMBIGUITY`, `LEGAL_NAME_COLLISION`, `DBA_COLLISION`, `OLD_ADDRESS`, `VIRTUAL_OFFICE_REVIEW`, or `INSUFFICIENT_CORROBORATION` categories as applicable.
5. Unresolved locations: **0** in the release; the former eight now have enough observations to classify as verified or review. Review does not produce coordinates or proximity.
6. Google calls by type: Text Search **0**; Place Details **0**. Existing Place IDs/cache were reused.
7. Google cost / resolved identity: $0 incremental; $0 per newly resolved location.
8. Websites attempted: 41 historical candidates were audited from existing identity evidence; no indiscriminate new crawl/search wave was run.
9. Websites accepted: **6** current high-confidence official websites; 22 remain review and 10 rejected in the source store.
10. Website review/rejected: conflicts remain source-separated; email-domain-only, unrelated redirects, and cross-company phone/address conflicts do not qualify.
11. Phones discovered: existing regulator, FMCSA, and Google observations were consolidated for all 86 providers; no values were manufactured.
12. Emails discovered: no new email observations were asserted in this bounded pass. Public source-backed alternatives remain preserved where previously observed.
13. Explicit service providers: **5** (baseline 1).
14. County claims: **1** consumer-published strict claim after semantics filtering. Non-service county mentions were rejected.
15. Place/city claims: **38** deduplicated evidence observations across five providers, normalized to 2025 TIGER/Line Census Places. Repeated source statements remain traceable.
16. ZIP claims: **0** defensible explicit ZIP claims. No ZIP was invented; the contract preserves provider ZIP versus ZCTA distinction.
17. Region claims: **4** retained as non-exact region evidence and excluded from Tier A county expansion.
18. Service reviews: ambiguous, blog/example, generic marketing, and rights-reserved text remain review/rejected and do not create coverage.
19. Discovery release version: `MOVE_CONSUMER_DISCOVERY_2026_08_V2`; V1 snapshot remains unchanged.
20. Server API contract: read-only GET equivalents for `resolveOriginZip`, `searchLocalMovers`, `getProviderTrustReport`, and `compareProviders`. Responses carry identity, route, eligibility/authority, tier, approximate distance, exact service evidence, contact, fleet, source count, reason code, and freshness. Routes return 404 in Production.
21. Freshness inputs: state authority/eligibility, display identity, selected verified location, explicit service observations, website validation, selected/all contacts, and Census geography vintage. Rating, review count, and subscription are excluded.
22. Invalidation tests: authority, verified-location, and explicit-service changes create a new immutable fingerprint; identical input is a no-op.
23. Primary contact-selection policy: select a current, public, business-relevant, high-identity-confidence observation; compare freshness and corroboration/source confidence; reject conflicts/fax-like non-business data when typed; retain every alternative in the Trust Report evidence payload.
24. Local search server benchmark: 500 iterations, p50 **0.067 ms**, p95 **0.171 ms**, max 1.611 ms.
25. Interstate benchmark: p50 **0.001 ms**, p95 **0.002 ms**, max 0.215 ms.
26. Trust Report benchmark: p50 **0.001 ms**, p95 **0.001 ms**, max 0.020 ms.
27. Compare benchmark: four providers, p50 **0.003 ms**, p95 **0.007 ms**, max 0.042 ms. ZIP resolve p95 was 0.001 ms. These are actual server-read functions over the immutable release, not the prior V1 UI helper benchmark.
28. Playwright test matrix: production build + `next start`, Chromium at 1440×900 and 390×844; FL, WA, interstate, NJ, Illinois, Trust Report, result explanation, compare, shortlist, invalid ZIP, and cross-county ZIP 32008.
29. Desktop screenshots generated: search entry, FL results, WA results, Trust Report, compare, and unsupported NJ.
30. Mobile screenshots generated: the same core journey plus a deterministic final mobile results capture. Files are CI artifacts, not committed binaries.
31. Visual defects found/fixed: Preview chip controls were 28px high; Task 009 Preview controls now have a 32px minimum. The suite confirms no horizontal overflow, clipped route controls, derived-model copy, ratings-first ordering, or winner language.
32. Accessibility smoke results: PASS for labeled ZIP fields, named buttons, dialog role/name/modal semantics, close control, disclosure keyboard semantics, and minimum 32px Task 009 controls. This is not a WCAG certification.
33. Hosted Preview smoke result: pending final Vercel deployment at initial report commit; local production-build browser gate PASS. Deployment protection will be documented if it prevents anonymous smoke.
34. Experimental-derived isolation: PASS. V2 freshness explicitly records `experimentalDerivedIncluded: false`; consumer APIs expose no enable argument and reject the query parameter; V1 records were not changed.
35. Commercial firewall: PASS. Subscription, rating, review count, advertising, annual moves, and fleet size do not affect eligibility/tier/order.
36. Known false identity/location/service claims: wrong-state Google coordinates, multiple-name/DBA collisions, closed/old locations, name-only locations, email-domain-only sites, unrelated redirects, blog/example locations, and named regions are blocked from exact publication.
37. Idempotency: **PASS** — stable canonical fingerprint and same-input no-op.
38. V1 integrity: **PASS** — historical V1 snapshot/model records unchanged.
39. Tests: 180 Node regression tests PASS; Playwright 2/2 viewport journeys PASS; lint, Move V2 typecheck, build, and `git diff --check` PASS at delivery validation.
40. Commits: recorded after delivery commit below.
41. CI: pending initial push; GitHub Actions PASS is required before final handoff.
42. Vercel Preview: pending initial push; Ready is required before final handoff.
43. Production changes: **NONE**.
44. Task 009: **PASS**, subject only to final hosted delivery checks.
45. Ready for Task 010? **YES**, after CI and Preview are Ready.
46. Exact Task 010 recommendation: expand the evidence-first pilot through scheduled regulator/website freshness jobs and reviewer tooling for the remaining 34 location conflicts; add exact provider ZIP claims when actually published; improve branch-aware location evidence; retain FL/WA eligibility, Preview-only release gating, and experimental-derived isolation. Do not activate NJ/Illinois or a derived radius model without their separate official-evidence gates.
