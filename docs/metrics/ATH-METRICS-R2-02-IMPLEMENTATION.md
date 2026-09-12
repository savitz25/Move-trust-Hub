# ATH-METRICS-R2-02 ? Move reconciliation

Implementation and release record. Production certification is recorded after merge in the release receipt.

## Contract and ownership

Artifact: `data/home/move-network-metrics-v1.json`. Public endpoint: `/api/network-metrics`. `schemaVersion`: `move-network-metrics-v1`; `contractRevision`: `ATH-METRICS-R2-02`.

Generated: `2026-09-12T21:36:55.191Z`. Fingerprint: `c219dd772556d4097cd90d2762f979b3d40d5c0c7c84643557aa9657547e100c`.

Accepted state snapshots and a read-only aggregate census feed one offline generator. The homepage consumes this generated contract. No canonical source dataset, identity association, database row, or AskTrustHub code was changed. No other specialist hub code was changed. The new API is an additive read-only specialist contract endpoint.

## Reproduce and validate

```sh
npm ci
npm run home:metrics
npm run check:metrics-r2
npm test
npm run build
```

`home:metrics` requires no secrets or database connection. It fails on missing files/counts, invalid counts or reconciliation failure. `check:metrics-r2` regenerates in memory using the committed generation clock and fails non-zero on byte drift; it never writes. CI runs that command on PRs and main. Generation time legitimately changes on an explicit regeneration; source/retrieval/snapshot clocks do not advance. Source fingerprints include canonical accepted-input hashes and relevant generator code. `acceptedSources[].sha256` hashes canonical JSON, not raw HTTP bytes; raw acquisition hashes remain inside accepted snapshots.

Refreshing the national census is a separate, explicitly invoked, read-only acquisition step: set `METRICS_ENV_FILE` to a local credential file, then run `node scripts/export_network_metric_census.mjs` (Move: `node --import tsx scripts/export_network_metric_census.mjs`). Review the aggregate census diff before regenerating. Neither generator runs source acquisitions at build time. Prompt 6 owns scheduling, source-triggered automation and age policy.

New state formats require an explicit grain adapter/registration in the generator; they never require pasting new totals into JSX. Registered accepted source updates flow through regeneration. Contractor also preserves accepted state/local snapshots in `acceptedStateDatasets`; Move exports its accepted state snapshots and per-capability unknowns. Automatic discovery is not permission to invent a new identity sum.

## Correctness and grains

Federal profiles, state registrations, HHG certificates, Property Carrier permits, bulletin issues, applications and case numbers remain separate. No total is formed by summing state authority with FMCSA profiles. The legacy key `federal_mc_identities_in_directory` is retained but its corrected grain is `directory_profile_with_mc_number`; 4,383 counts profile rows carrying an MC field, not distinct MC identities.

Illinois remains `SEARCH_ONLY`, bulk count `null`, `specialistComplete: false`, `completion: PENDING`. Current ICC search capability is live; formal acquired-roster closure is not asserted. This is an accepted scope limitation, not a coding defect. New York current HHG roster is also null/search-only.

Virginia source correction: the accepted artifact has **4,916 Property Carrier rows**, **4,914 distinct non-null authority numbers**, one blank identifier and an identifier conflict. **5,108 is 192 HHG rows plus 4,916 Property Carrier rows**, not the Property Carrier row count. The 4,914 IDs are not 4,914 uniquely canonicalized companies. This differs from the prompt?s repeated earlier 5,108 Property Carrier baseline.

The national census is an explicit read-only REST aggregate capture. Exact Content-Range counts are required; failed/missing counts throw. Partition assertions catch inconsistent authority/refresh totals. REST acquisition is not transactionally atomic; an inconsistent capture must be rerun. Offline generation uses the reviewed committed census. Existing refresh-age buckets retain their census reference clock (`homeProjection.fmcsaClock.ageReferenceAt`) instead of silently aging under a new generation timestamp.

State cards and consumer-rule projections are generated from accepted snapshots, including the formerly hard-coded NJ NOV count. The ?Five specialist state surfaces? text now derives from the nine generated cards. Federal last-check/retrieval clocks are not mislabeled official source-effective dates.

## Four-state inclusion

| State | Contractor/Move accepted treatment |
|---|---|
| CO | 203 active HHG permit listings; 207 revoked and 5 suspended status observations; separate from FMCSA. |
| VA | 192 HHG authority identities; 4,914 Property Carrier authority IDs / 4,916 source rows. |
| NY | 36 bulletin issues / 108 application observations / 103 case numbers; current HHG roster null/search-only. |
| IL | Search-only current roster null; route live; formal specialist closure pending. |

## Exported metric inventory

Aliased homepage evidence rows are presentations of existing grains, not additive independent universes. There is deliberately no cross-grain network total.

| Field | Value | Grain | Official source clock |
|---|---:|---|---|
| `federal_publishable_directory_profiles` | 5,022 | directory_profile | unknown |
| `federal_indexable_directory_profiles` | 4,905 | indexable_directory_profile | unknown |
| `federal_directory_authority_active` | 4,715 | directory_profile_authority_active | unknown |
| `federal_mc_identities_in_directory` | 4,383 | directory_profile_with_mc_number | unknown |
| `florida_fdacs_im_registrations` | 1,314 | fdacs_intrastate_mover_registration | unknown |
| `florida_fdacs_im_active_registrations` | 1,099 | fdacs_intrastate_mover_registration_active | unknown |
| `florida_fdacs_mb_active_registrations` | 26 | fdacs_moving_broker_registration_active | unknown |
| `florida_hq_publishable_profiles` | 483 | florida_hq_publishable_profile | unknown |
| `nj_pmw_authority_roster` | null / unknown | nj_pmw_authority_roster | unknown |
| `nj_operation_safe_move_novs_acquired` | 34 | nj_operation_safe_move_nov | unknown |
| `ca_cal_t_household_mover_universe` | null / unknown | ca_cal_t_household_mover_permit | unknown |
| `ca_bhgs_19237_citation_rows` | 132 | bhgs_bpc_19237_citation_row | unknown |
| `ca_bhgs_19237_unlicensed_rows` | 120 | bhgs_bpc_19237_unlicensed_row | unknown |
| `ca_bhgs_19237_exact_cal_t_rows` | 12 | bhgs_bpc_19237_exact_cal_t_row | unknown |
| `tx_txdmv_household_goods_mover_universe` | null / unknown | txdmv_household_goods_certificate_roster | unknown |
| `wa_utc_active_household_goods_directory_results` | 284 | utc_active_household_goods_directory_result | unknown |
| `wa_utc_household_goods_bulk_roster` | null / unknown | utc_household_goods_bulk_roster | unknown |
| `co_puc_active_household_goods_permit_listings` | 203 | co_puc_hhg_active_permit_listing | 2025-06-27 |
| `va_dmv_household_goods_carrier_listings` | 192 | va_dmv_hhg_certificate_listing | unknown |
| `va_dmv_property_carrier_listings` | 4,916 | va_dmv_property_carrier_permit_listing | unknown |
| `co_puc_revoked_household_goods_permit_listings` | 207 | co_puc_hhg_revoked_status_observation | 2025-06-27 |
| `co_puc_suspended_household_goods_permit_listings` | 5 | co_puc_hhg_suspended_status_observation | 2025-06-27 |
| `ny_dot_2026_hhg_bulletin_observations` | 108 | ny_dot_weekly_bulletin_hhg_application_observation | 2026-09-09 |
| `federal_directory_authority_not_current` | 13 | directory_profile_authority_not_current | unknown |
| `federal_directory_authority_unknown` | 294 | directory_profile_authority_unknown | unknown |
| `federal_directory_carrier_profiles` | 4,227 | directory_profile_carrier | unknown |
| `federal_directory_broker_profiles` | 278 | directory_profile_broker | unknown |
| `federal_directory_carrier_broker_profiles` | 94 | directory_profile_carrier_broker | unknown |
| `federal_directory_unknown_role_profiles` | 423 | directory_profile_unknown_role | unknown |
| `florida_fdacs_verified_identity_links` | 941 | fdacs_im_verified_link | unknown |
| `florida_public_contact_observations` | 3,875 | public_contact_observation | unknown |
| `nj_hq_publishable_profiles` | 269 | nj_hq_publishable_profile | unknown |
| `ca_hq_publishable_profiles` | 403 | ca_hq_publishable_profile | unknown |
| `published_state_intelligence_pages` | 9 | published_state_intelligence_page | unknown |
| `va_hhg_authority_identities` | 192 | va_hhg_authority_id | unknown |
| `va_property_authority_identities` | 4,914 | va_property_authority_id | unknown |
| `ny_bulletin_issues` | 36 | bulletin_issue | 2026-09-09 |
| `ny_bulletin_case_numbers` | 103 | application_case_number | 2026-09-09 |
| `ny_current_hhg_roster` | null / unknown | ny_hhg_authority_roster | unknown |
| `il_current_hhg_roster` | null / unknown | il_hhg_authority_roster | unknown |

## Ask handoff (Prompt 5)

Ask was not changed. It may reject the revised fingerprint/shape and continue serving its stale fallback until Prompt 5. Do not restore the old omissions to satisfy its verifier. Consumers must handle nullable values, preserve explicit grains, and use separate source clocks. `schemaVersion` keeps the existing v1 filename convention; `contractRevision` identifies this reconciliation.

Both contracts add `acceptedSources`, `acceptedStateDatasets`, `stateCapabilities` and per-metric `retrievedAt`/`snapshotAsOf`. Capability statuses distinguish acquisition/live evidence from search/request/unknown and never infer completion from a route. Contractor adds `statusReconciliation`, `licensingStatus.graph`, `homepageEvidence`, and `evidence_*` metric keys. Move adds `illinois`, `virginia.hhgAuthorityIdentities`, `virginia.propertyAuthorityIdentities`, `newYork.distinctCaseNumbers`, null roster fields, `homepageStateCards`, `consumerRules`, and optional per-metric `presentation`. See inventory above for exact public keys.

Ask must stop pinning the previous fingerprint and expecting a single sourceAsOf or non-null count everywhere; it must consume specialist grain/value-state/capability semantics. No state or federal count should be reinterpreted or recomputed by Ask.

## Validation and release

Focused tests: `npm run check:metrics-r2` passes, including rendered homepage-to-artifact comparisons, historical regression, state separation and null-vs-zero checks. Broader `npm test` passed for both hubs. Production builds and release identities are recorded in the release receipt. No required CI check is bypassed.

Source snapshots were read only. Read-only census extraction produced a new metrics input artifact, not a canonical source mutation. The existing numerical-equality guard tests remain legacy constraints; stronger structural/status/null checks are added here. Network-wide schedules and Ask reconciliation remain deliberately outside this prompt.


## Files changed

- `.github/workflows/move-network-metrics.yml`
- `app/api/network-metrics/route.ts`
- `components/intelligence/MoveEvidenceShowcase.tsx`
- `data/home/move-network-metrics-v1.json`
- `data/metrics/accepted-network-census-v1.json`
- `docs/metrics/ATH-METRICS-R2-02-IMPLEMENTATION.md`
- `lib/intelligence/move-home-evidence-inventory.ts`
- `lib/metrics/accepted-contract.ts`
- `lib/metrics/accepted-homepage-evidence.ts`
- `lib/metrics/compute-move-network-metrics.ts`
- `lib/metrics/move-network-metrics-v1.ts`
- `package.json`
- `scripts/assert_network_metrics_v1.mjs`
- `scripts/build_network_metrics_v1.mjs`
- `scripts/export_network_metric_census.mjs`
- `scripts/network_state_inputs.mjs`
- `scripts/test_metrics_homepage_r2.tsx`
- `scripts/test_metrics_r2.ts`
