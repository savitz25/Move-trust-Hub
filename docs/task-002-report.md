# Task 002 final report — national FMCSA data spine

Run completed 2026-08-16 on `savitz25/Move-trust-Hub`, branch `move-2.0`, beginning from Task 001 commit `4dc3756a178e1374c38bc2a8197b6b24986c4521`. Draft PR #1 still targets `main`.

## 1–7. Baseline, database, migrations, and publication

1. **Baseline:** Task 002 resumed at `bd195fae`; the working tree was clean and the existing FMCSA artifacts were reused without redownload or reclassification.
2. **Database connection:** **PASS**. `DATABASE_URL: PRESENT`; its value never entered output, Git, docs, HTML, or client code.
3. **Supabase project:** **PASS**. The project reference derived internally from PostgreSQL matched the existing MoveTrustHub Supabase URL. No project was created.
4. **Migrations applied:** `20260816120000_move_v2_provider_identity_foundation`, `20260816190000_move_v2_fmcsa_national_spine`, `20260816200000_move_v2_fmcsa_publication_readiness`, `20260816210000_move_v2_fmcsa_publication_gate`, `20260816220000_move_v2_fmcsa_census_dockets`, and `20260816230000_move_v2_fmcsa_query_indexes`. All appear in `move_v2.schema_migration` with checksums.
5. **V1 baseline:** `public.companies=468`; `public.reviews=15`. The same counts remained after publication.
6. **Source releases:** six exact official releases were registered with dataset ID, URL, official update/metadata time, retrieval time, raw row count, byte size, SHA-256, dictionary reference, schema version, publisher, and source era. Exact metadata is in `fmcsa-source-registry.md`.
7. **Database publication:** **PASS**. The first pooler attempt rolled back. The final direct PostgreSQL load used isolated unlogged staging, release-scoped evidence, reconciliation, and an atomic `STAGED → PUBLISHED` visibility transaction. Duration: 677.60 seconds.

## 8–24. Published counts and coverage

| Measure | PostgreSQL result |
|---|---:|
| 8. Stable providers | 277,813 |
| 9. Moving-relevant facts | 277,813 |
| 10. Interstate carriers | 715 |
| 11. Local/intrastate candidates | 96,460 |
| 12. Authorized brokers | 68 |
| 13. Dual role | 82 |
| 14. HHG freight forwarders | 28 |
| 15. Inactive entities | 88,135 |
| 16. Regulatory review | 92,325 |
| 17. Official DBA | 65,875 (23.71%) |
| 18. Official phone | 274,331 (98.75%) |
| 19. Physical/mailing address | 277,812 each (effectively 100%) |
| 20. Provider with MC/MX/FF docket | 189,365 (68.16%) |
| 21. Current Motus authority evidence | 106,116 |
| 22. Authority-history evidence | 119,726 |
| 23. Insurance evidence | 92,878 |
| 24. Revoke/suspend evidence | 9,361 |

Additional evidence: 98,874 distinct Census docket observations and 107,072 BOC-3 observations. The normalized artifacts contained 106,118 authority, 119,756 history, 99,602 insurance, 9,870 revoke/suspend, and 109,938 BOC-3 projected rows. PostgreSQL intentionally collapsed byte-identical repeated source projections by `(release, source_record_key)`—2 authority, 30 history, 6,724 insurance, 509 revoke/suspend, and 2,866 BOC-3 duplicates—without collapsing distinct dockets, status dates, filings, or providers. Raw official release counts remain unchanged in the registry and artifacts.

Power-unit coverage is 277,078 (99.74%); driver coverage is 260,832 (93.89%). DBA-first validation passed for all 115 sampled providers: DBA displays when present and legal name remains separate; otherwise legal name displays.

## 25–29. Storage, query performance, idempotency, and transaction safety

25. **Database storage:** `move_v2` uses 671,416,320 bytes (640 MB). The complete database is 691,121,299 bytes; therefore Task 002 accounts for essentially all growth above the 19 MB V1 baseline.
26. **Indexes:** 241,254,400 bytes total. Largest relations including indexes: provider fact 195 MB; classifications 149 MB; authority events 78 MB; authority 67 MB; BOC-3 53 MB; insurance 49 MB; provider spine 26 MB; Census dockets 22 MB.
27. **Measured query benchmarks:** warm execution—provider ID 0.081 ms; provider USDOT 10.780 ms cold; docket 4.905 ms cold; classification+state 3.107 ms warm (646.468 ms first cold-cache run); display-name search 16.818 ms cold; authority 4.276 ms cold; chronology 5.077 ms cold; provider phone 0.039 ms; bounded state listing 0.230 ms warm (50.467 ms cold). Plans use the provider PK, USDOT unique index, docket index, classification index, state/provider index, name GIN, authority/provider, and event/provider-date indexes.
28. **Idempotency:** **PASS**. Re-running all six exact release hashes returned `IDEMPOTENT NO-OP`; the docket loader rescanned 100,329 observations and created no duplicate keys. Counts were unchanged.
29. **Transactional publication:** **PASS**. The release read view filters to `PUBLISHED`. A harmless inserted release inside `BEGIN … ROLLBACK` was absent afterward. Failed loads retained the prior visible state and never exposed staging.

## 30–38. QA and integrity

30. **115-entity QA:** **PASS**—25 interstate, 25 local candidates, 25 brokers, 10 dual-role, 10 inactive, and 20 review. All 115 passed DBA/legal-name behavior and official source traceability. The sample is committed as `task-002-entity-qa.csv` and spans diverse states, fleet sizes, dockets, history, and financial evidence.
31. **Bounded official spot check:** **PASS**—20 exact USDOT QCMobile/FMCSA checks, no national scrape. Legal names matched 20/20; status matched 19/20; power units 19/20; drivers 20/20. The two freshness discrepancies remain documented in `task-002-official-spot-check.json`; neither source was overwritten.
32. **V1 coverage:** 152 V1 rows contain 145 distinct valid USDOTs. All 145 matched V2. Distinct-provider distribution: local 115; interstate 14; dual role 6; authorized broker 2; inactive 4; review 4.
33. **V1 data integrity:** **PASS**—468 companies and 15 reviews before and after; no V1 migration, write, search change, ID change, or application activation.
34. **Official source immutability:** **PASS**—dated local artifacts retain hashes; database evidence is release-scoped; raw tables have RLS and no anon/authenticated grants; classification is separate derived state.
35. **Commercial firewall:** **PASS**—the classifier has no subscription/billing input and all Task 001/002 commercial-isolation regressions pass.
36. **Google enrichment:** **NOT RUN**.
37. **Website enrichment:** **NOT RUN**.
38. **State-license enrichment:** **NOT RUN**.

## 39–48. Delivery

39. **Tests:** focused lint, typecheck, 34 domain/schema tests, migration application, publication/republication, full Next build, and `git diff --check` passed. Existing Next dependency advisories remain separately scoped.
40. **Commits:** see final Git section below.
41. **Final CI:** **PASS**—GitHub Actions runs `31971044204` and `31971045834`; Vercel Preview passed.
42. **Preview:** `https://move-trust-ht3eov37g-savitz25-s-projects.vercel.app/experience-lab/v2/real`; bounded static QA only, noindex, branch flags only, Production hard-404. The deployment is protected by Vercel authentication.
43. **PR #1:** remains **DRAFT**, targeting `main`.
44. **Production changes:** **NONE**.
45. **Database publication:** **PASS**.
46. **Task 002:** **PASS**.
47. **Blocking issues:** none.
48. **Ready for Task 003:** **YES** after final CI is green. Task 003 was not started.

The Preview does not require `DATABASE_URL`; it remains a bounded generated sample. `DATABASE_URL` was not added to Vercel or Production.
