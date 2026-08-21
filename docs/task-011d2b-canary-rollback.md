# Task 011D.2B / 011D.3 Canary Rollback Plan

**Wave ID:** `LOCAL_HHG_FL_WA_2026_08_CANARY_1`

**Preserves canonical regulatory graph:** YES

## Goal

Unpublish the exact 80 canary providers without destroying Task 011D.2A identity/authority/home-county data.

## 011D.3 rollback steps (when publication exists)

1. Set exact manifest company_ids back to `publication_state = INGESTED` (or `CLASSIFIED` if used).
2. Force `indexable = false`.
3. Set canary discovery evidence `consumer_eligible = false` for manifest companies only.
4. Remove canary membership from local consumer read path / wave publication rows for `LOCAL_HHG_FL_WA_2026_08_CANARY_1`.
5. Re-verify: default interstate directory unchanged; sitemap unchanged; non-manifest state-only remain internal.

## Must NOT delete

- `companies` rows for canary (canonical identity)
- `provider_state_authority` VERIFIED attachments
- `provider_local_discovery_evidence` home-county rows
- `provider_capability` internal hhg_local / hhg_intrastate evidence
- contact / staging observations
- Federal Waves 1–4
- Task 008B data

## 011D.2B note

This task did **not** publish. Rollback of publication is N/A until 011D.3.
Preparation artifacts may be regenerated; they do not mutate production publication state.
