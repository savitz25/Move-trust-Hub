# Task 002A final report — auto transport regulatory spine

Completed 2026-08-16 on `savitz25/Move-trust-Hub`, branch `move-2.0`, from Task 002 head `5653fe43`. Task 002 extraction/classification was not repeated. Existing dated Company Census and Motus artifacts and the published `move_v2` provider spine were reused.

## 1–3. Baseline, official signals, and schema

1. **Baseline:** clean `move-2.0`; Draft PR #1 targeting `main`; Task 002 database publication intact. The narrow official Census projection was required because the Task 002 HHG projection did not include the motor-vehicle cargo column. No complete national dataset was redownloaded.
2. **Official auto relevance:** Company Census `CRGO_MOTOVEH` / API `crgo_motoveh`, officially described as cargo category **D. Motor Vehicles**, with `X` as the positive signal. Current roles use Motus `Motor Carrier of Property (Except Household Goods)` and `Broker of Property (Except Household Goods)`, status, BIPD/bond fields, forms 84/85, history, and revoke/suspend chronology. Name keywords never create relevance. The narrow auto-positive artifact has 350,706 rows, 90,528,883 bytes, and SHA-256 `bf988cf42c788c3d9490ff15471e564c1664c77cc54092b3af498e480470f909`.
3. **Schema changes:** additive migrations `20260816240000_move_v2_auto_transport_roles`, `20260816250000_move_v2_all_service_roles_view`, and `20260816260000_move_v2_auto_official_contacts`. `provider_service_role` separates vertical/role from the existing stable provider identity; `fmcsa_auto_provider_fact` stores release-scoped official facts; the combined view presents HHG and auto roles without changing HHG rows. Raw tables have RLS and no browser-role grants.

## 4–10. National auto spine

| Measure | PostgreSQL result |
|---|---:|
| 4. Auto-transport relevant/review universe | 350,706 |
| 5. `AUTO_TRANSPORT_CARRIER` | 4,187 |
| 6. `AUTO_TRANSPORT_BROKER` | 128 |
| 7. `AUTO_TRANSPORT_DUAL_ROLE` | 142 |
| 8. `AUTO_TRANSPORT_INACTIVE` | 190,762 |
| 9. `AUTO_TRANSPORT_REVIEW` | 155,487 |
| 10. HHG + auto overlap | 29,193 (8.32%) |

Carrier and broker roles independently require current applicable evidence. HHG authority is not required or substituted for auto/property authority. Inactive evidence remains available but is excluded from active roles. Conflicts remain review. The 29,193 overlap records retain one `provider_id` with separate HHG and auto service rows.

## 11–16. Coverage and distribution

| Coverage | Providers | Percent |
|---|---:|---:|
| 11. Official DBA | 107,795 | 30.74% |
| 12. Official phone | 347,774 | 99.16% |
| Observed official email | 263,585 | 75.16% |
| 13. Physical address | 350,706 | 100.00% |
| Mailing address | 350,699 | effectively 100.00% |
| 14. MC/MX/FF docket | 185,239 | 52.82% |

15. **State distribution:** the complete state/classification matrix is in `task-002a-auto-db-audit.json`. Largest carrier counts: FL 380, TX 362, IL 294, PA 249, CA 220. Largest broker counts: FL 16, TX 14, CA 13, IL 7, NY 6. Address state is factual location context, never a service area.
16. **V1 auto coverage:** 12 existing seed records; 8 have numeric USDOT identifiers. Three exact providers have official `CRGO_MOTOVEH` evidence (one carrier, two review). Five exact V1 USDOTs do not enter the official auto universe and remain unresolved—not force-classified from V1 names, ratings, Google data, or seed labels. The MC-bearing seeds also have USDOTs; no MC-only seed required a fuzzy merge.

## 17–22. QA, integrity, storage, and performance

17. **Manual QA:** **PASS**—110 records: 25 carriers, 25 brokers, 10 dual-role, 10 inactive, 20 review, and 20 HHG+auto overlaps. All 110 passed DBA/legal display and release traceability. The sample covers 30+ U.S./territory/province codes, including FL, NJ, NY, CA, TX, and GA; 26 DBA and 84 legal-name-only cases; 28 fleets with at least 10 power units; 72 fleets with at most two; and 16 multi-docket cases. Evidence is in `task-002a-auto-entity-qa.csv`.
18. **Idempotency:** **PASS**. Same-release role publication returned `IDEMPOTENT NO-OP`; the evidence/docket rerun inserted zero rows. No duplicate provider, service-role, authority, event, insurance, release, or docket key was created.
19. **V1 data integrity:** **PASS**—`public.companies=468`, `public.reviews=15`, identical to the pre-Task-002A baseline. No V1 table or public query was written.
20. **Commercial firewall:** **PASS**—the auto classifier has no subscription/billing input; regression H proves paid state cannot affect the result. Commercial tables are not referenced by classification, identity, evidence, or eligibility code.
21. **Official source immutability:** **PASS**—the dated source artifact is hash-registered; Motus rows use the existing immutable source releases and stable record hashes; derived roles are separate. The filtered evidence extension added 29 previously absent Motus rows and 191,640 Census docket observations, then converged to zero additions on rerun.
22. **Query performance:** measured warm `EXPLAIN ANALYZE`: provider → auto role 1.189 ms; USDOT → auto classification 7.393 ms; state → carriers 1,225.356 ms; state → brokers 1,326.247 ms; provider → all service roles 3.835 ms. Plans and buffer details are in `task-002a-auto-db-qa.json`. Exact lookup paths use indexed IDs; bounded state queries use the classification and state/provider indexes. State scans remain a documented Preview-scale optimization target before public national search.

Database storage after Task 002A is 1,164,926,976 bytes across `move_v2`, with 431,644,672 index bytes. Task 002A added approximately 493,510,656 bytes (470.6 MiB) over Task 002. Largest new relations are service roles (218,415,104 bytes), auto facts (200,327,168), and expanded dockets (65,290,240 total). No unrelated V1 storage is included.

The bounded official FMCSA/QCMobile spot check covered 16 exact USDOTs: legal names matched 16/16, drivers 16/16, and power units 14/16. The two freshness differences are preserved in `task-002a-auto-official-spot-check.json`; neither source was overwritten.

## 23–31. Delivery and gates

23. **Tests:** 43/43 Task 001/002/002A domain regressions pass, including required auto A–I; focused lint and typecheck pass. Full build and final diff checks are recorded below after delivery validation.
24. **Commits:** recorded after final validation in this report’s delivery commit history.
25. **CI:** recorded after the final pushed commits; focused Move V2 workflow is required green.
26. **PR #1:** remains **DRAFT** and targets `main`.
27. **Production changes:** **NONE**. V2 remains branch/Preview-only; no Production route, flag, query, or deployment changed.
28. **Google enrichment:** **NOT RUN**. `MOVE_ENABLE_GOOGLE_ENRICHMENT=false` remains the required state.
29. **Website enrichment:** **NOT RUN**. `MOVE_ENABLE_WEBSITE_ENRICHMENT=false` remains the required state.
30. **Task 002A:** **PASS**, subject only to the final pushed CI/build confirmation below.
31. **Ready for Task 003 — combined HHG + auto Google Places / website enrichment:** **YES** once final CI is green. Task 003 was not started.

Future provider-published attributes—open, enclosed, expedited, motorcycle, classic/exotic, inoperable-vehicle, dealer/auction transport, service area, email, additional phone, and website—are contract-only and unpopulated. They can never modify regulatory authority.
