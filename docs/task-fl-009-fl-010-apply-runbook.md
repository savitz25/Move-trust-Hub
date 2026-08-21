# FL-010 apply runbook (do not run in FL-009)

**Manifest:** `data/state-hhg/fl/fl-009-state-wave-1-manifest.json`  
**Required hash:** `a9165ec652ad7a27`  
**Count:** 37  
**Apply executed in FL-009: NO**

## Preconditions

1. FL-009 merged; production serves INGESTED `/companies/{slug}` as **HTTP 404**.
2. Dry-run still reports `preconditions_ok: true` and `indexable: 0`.
3. KEEP_80 canary still 50/30/80.
4. Hash unchanged.

## Apply (FL-010 only)

```text
npx tsx scripts/run-task-fl-009-wave1-prepare.ts --apply --hash=a9165ec652ad7a27
```

FL-009's apply path currently **refuses** with "dry-run only". FL-010 must replace that refuse with the transactional UPDATE + `local_hhg_canary_publication` insert for `wave_id=FL_STATE_WAVE_1` (not KEEP_80).

## Rollback

`docs/task-fl-009-rollback.sql` — Wave 1 IDs only; KEEP_80 untouched; PSA/contacts/company rows preserved.
