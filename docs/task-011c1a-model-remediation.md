# Task 011C.1A — Reference Expansion & Model Remediation

**Google Places API requests: 0**

**County edges created: 0**

## Status

**NOT_APPROVED**

- No model met holdout precision>=0.90 (exhaustive/scorable) and recall>=0.65
- Too few EXHAUSTIVE/RADIUS_EXPLICIT providers to score precision safely — prefer HYBRID explicit+conservative fallback after more exhaustive labels



## Reference corpus

| State | Before | After (HIGH) |
|-------|-------:|-------------:|
| FL | 20 | 86 |
| WA | 0 | 51 |

- Positive county observations: 221
- Negative county observations: 0
- Completeness: {"REGION_EXPLICIT":11,"PARTIAL":126,"UNKNOWN_COMPLETENESS":1}
- Scorable for precision (EXHAUSTIVE/RADIUS): 0

**PARTIAL rule:** unmentioned counties are UNKNOWN, never automatic negatives.

## Fleet ↔ area relationship

WEAK — observed positive county counts do not clearly increase with fleet band on this reference corpus (many PARTIAL home-county-only labels).

- Band 1-2: n=43, median positive counties=1, median max distance=17.29802901152468 mi
- Band 3-5: n=34, median positive counties=1, median max distance=19.307845330008867 mi
- Band 6-15: n=25, median positive counties=1, median max distance=20.415164626600156 mi
- Band 16-50: n=11, median positive counties=1, median max distance=22.043130993205228 mi
- Band 51+: n=3, median positive counties=1, median max distance=19.991805185582844 mi

## Models tested

Power A/B/C and fixed-radius benchmarks 25/40/50. See `docs/task-011c1a-model-comparison.json`.

## Origin / destination

- Radius controls: **ORIGIN / PICKUP discovery**
- State authority controls: **legal intrastate destination permission**

## Holdout snapshot (PARTIAL-aware)

Precision is `null` wherever `exhaustivePopulation=0` (no EXHAUSTIVE/RADIUS_EXPLICIT negatives). Recall below is **positive-support recall** only.

| Model | Combined recall | FL recall | WA recall | Home-county hit |
|-------|----------------:|----------:|----------:|----------------:|
| POWER_A | 0.519 | 0.422 | 0.933 | 0.925 |
| POWER_B | 0.481 | 0.391 | 0.867 | 0.850 |
| FIXED_40 | **0.608** | 0.516 | **1.000** | **1.000** |

FIXED_40 outperforms power-unit bands on this corpus — consistent with weak fleet↔area correlation.

## Decision

**NOT APPROVED** for Task 011C.2 edge generation.

Do **not** force the original power-unit radius hypothesis.

Recommended product architecture when ready:

1. Prefer **explicit / curated service-area positives**
2. Use a **conservative fixed pickup radius** (candidate ~40 mi) only as discovery fallback
3. Collect more **EXHAUSTIVE / RADIUS_EXPLICIT** provider statements before claiming precision ≥0.90

## Next

**Do not start Task 011C.2.**

Next evidence work: expand EXHAUSTIVE/RADIUS_EXPLICIT FL+WA labels (provider-owned pages with identity-verified radius/exclusive territory). Optionally a focused 011C.1B only if that corpus becomes scorable.

Do not start automatically.
