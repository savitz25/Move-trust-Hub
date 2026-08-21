# Task 011C.1 — FL + WA Service-Area Calibration

**Google Places API requests: 0**

**County edges created: 0**

**Consumer publication: none**

## Status

**MODEL STATUS = NOT APPROVED**

Reasons:
- Reference evidence below floor (FL=20, WA=0; need >=20 each)

## Cohort

| State | Verified movers |
|-------|----------------:|
| FL | 89 |
| WA | 64 |
| Total | 153 |

## Operating locations

- Valid geocodes: 134
- Unresolved: 19
- Geocode source: census_geocoder_onelineaddress

## Fleet

- With USDOT: 133
- Usable power units (>0): 131
- Fresh: 131
- Stale: 0
- Zero: 2
- Unknown: 0

Unknown ≠ zero. Zero fleet does not receive derived radius coverage.

## Reference evidence

- FL providers: 20
- WA providers: 0
- County observations: 37
- Types: {"CURATED_INTERNAL":37}

Floor for approval: ≥20 high-confidence providers per state.

## Model comparison

See `docs/task-011c1-service-area-model-comparison.json`.

Models tested:

1. POWER_UNIT_RADIUS_BASELINE_011A — 25/40/75/125/200
2. POWER_UNIT_RADIUS_CONSERVATIVE_B — 20/30/55/95/150
3. POWER_UNIT_RADIUS_INTERMEDIATE_C — 22/35/65/110/175

Intersection rule: **county centroid inside radius**, clipped to authority state.

On the FL-only reference subset available today (20 providers / 37 county observations; WA = 0), all three models produced identical predictions (tiny-fleet / nearby-county geometry). Holdout metrics:

| Split | Precision | Recall | F1 | Mean Jaccard |
|-------|----------:|-------:|---:|-------------:|
| Calibration | 0.615 | 0.400 | 0.485 | 0.310 |
| Holdout | 0.900 | 0.529 | 0.667 | 0.506 |

Holdout precision meets the ≥0.90 bar, but recall is below preferred ≥0.65, and **WA lacks a reference set**, so the model is **not approved**.

Determinism: Run A SHA == Run B SHA (`match: true`).

## Origin vs destination

- **Radius controls:** ORIGIN / PICKUP discovery
- **State authority controls:** legal intrastate destination permission

Do not force destination counties into HQ radius by default.

## Publication safety

- New public companies: 0
- New indexable: 0
- County edges created: 0
- FL/WA NEW_PROVIDER_CANDIDATE remain non-public

## Next

**Task 011C.1A — Model Remediation** (expand WA/FL reference evidence and fleet coverage before edges)

Do not start automatically.
