# Task 010 — Final Clean Federal HHG Publication (Wave 4)

## Wave ID

`FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN`

## Source / freshness

- Dataset: `data.transportation.gov/6eyk-hxee`
- Rows updated at: `2026-08-20T13:51:49.000Z`
- Decision: revalidated every candidate USDOT via Socrata API (no Google Places)

## Cohort

| Metric | Count |
|--------|------:|
| Historical expected | ~923 |
| Staging remaining clean carriers | 923 |
| L&I inspected | 923 |
| Excluded `HHG_AUTHORITY_LOST` | 3 |
| **Published** | **920** |

Identity-review / brokers / duals / local / auto: **0**

## Publication sequence

1. Canary 50 (noindex)
2. Batch → 350
3. Batch → 650
4. Batch → 920
5. `--indexable` for all Wave 4

## Totals after

| Metric | Before | After |
|--------|-------:|------:|
| Companies | 4,021 | **4,941** |
| Indexable | 3,985 | **4,905** |
| Wave 1 | 1,000 | 1,000 |
| Wave 2 | 1,274 | 1,274 |
| Wave 3 | 1,279 | 1,279 |
| Wave 4 | 0 | **920** |

## Rollback

```bash
npx tsx scripts/publish-federal-hhg-wave4.ts --rollback
```

See `docs/task-010-rollback.sql`. Isolates Wave 4 only.
