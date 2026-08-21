# Task 011D.1 — Conservative Local Discovery Foundation

**Status:** COMPLETE — CONSERVATIVE LOCAL DISCOVERY FOUNDATION READY / NO PUBLICATION

**Google Places API requests:** 0

## Policy

Radius models from 011C remain **historical experiments only**:

| Model | Status |
|-------|--------|
| POWER_UNIT_RADIUS | NOT_APPROVED |
| FIXED_25 | NOT_APPROVED |
| FIXED_40 | NOT_APPROVED |
| FIXED_50 | NOT_APPROVED |
| Consumer enabled | false |

Derived fallback (mileage radius, power-unit radius, adjacent-county assumption): **DISABLED**.

## Evidence hierarchy (future)

1. `REGULATOR_TERRITORY`
2. `EXPLICIT_SERVICE_AREA`
3. `CURATED_VERIFIED`
4. `VERIFIED_HOME_COUNTY`

Consumer-approved bases: `EXPLICIT_SERVICE_AREA`, `VERIFIED_HOME_COUNTY`, `REGULATOR_TERRITORY`, `CURATED_VERIFIED`.

Not consumer-approved: `DERIVED_EXPERIMENTAL`.

## Home county semantics

**Means:** Provider is based/registered at an attributable operating address in this county.

**Does NOT mean:** Provider guarantees pickup throughout the county.

Required: active VERIFIED state mover authority, resolved canonical company, regulator physical/operating address, authoritative county resolution in authority state. PO Box / mailing-only fail closed.

## Explicit service evidence

Positive-only. PARTIAL evidence may prove a county is mentioned/served; it does **not** prove other counties are unserved. Unmentioned counties remain **UNKNOWN** (no negative edges).

### Coverage (verified matched cohort)

| Mode | FL counties | WA counties |
|------|-------------|-------------|
| HOME COUNTY ONLY | 27 | 15 |
| HOME + EXPLICIT | 67 | 16 |

Home county resolved: FL 83 / 89; WA 51 / 64.

Explicit positive providers: FL 21; WA 1; relationships 162.

## Origin / destination

- **Origin discovery** controlled by local discovery evidence (home / explicit / regulator / curated).
- **Destination legality** controlled by active same-state mover authority.

## Internal query

`getLocalDiscoveryCandidates({ state, originCounty })` — **internal only**, not consumer-exposed.

Prototype smoke: state=FL county=12001 candidates=3.

## Future UI copy (not wired)

- Home: "Based in {countyName}" / "{stateName} mover registration verified" / "Confirm pickup availability for your address."
- Explicit: "Provider identifies {countyName} as a service area."
- Forbidden without evidence: "Guaranteed service"; "Covers entire county"; "Serves nearby counties"; "40-mile service radius"; "Serves all South Florida"; "Available statewide"

## New provider readiness (011D.2 prep — not created)

| Segment | FL (974) | WA (196) |
|---------|----------|----------|
| READY_FOR_CANONICALIZATION | 790 | 153 |
| REVIEW_REQUIRED | 18 | 0 |
| INACTIVE_HOLD | 98 | 0 |
| ADDRESS_UNRESOLVED | 68 | 43 |

## Canonicalization rule (011D.2)

- USDOT required: **NO** (helpful, not mandatory for state-only movers)
- Required: state authority number, legal name, physical address, phone, state regulator source
- Franchise: fail-closed; local entity owns local authority

## Scale estimate (conservative)

| Providers | Home-only edges | Home+explicit edges |
|-----------|-----------------|---------------------|
| 10000 | 8758 | 18105 |
| 25000 | 21895 | 45261 |
| 50000 | 43791 | 90523 |
| 75000 | 65686 | 135784 |
| 100000 | 87582 | 181046 |

## Publication safety

- New public companies: **0**
- New indexable: **0**
- New sitemap URLs: **0**
- Consumer county assignments: **0**
- Waves 1–4 / Task 008B: **unchanged**

## Recommendation

Proceed to **Task 011D.2 — FL + WA New Provider Canonicalization & Local Publication Canary Preparation** (do not auto-start). Create READY canonicals, attach VERIFIED authority + VERIFIED_HOME_COUNTY + explicit positives, quarantine review/inactive/unresolved, build small noindex canary — **no broad publish**.

## Artifacts

- `docs/task-011d1-home-county-audit.json`
- `docs/task-011d1-new-provider-readiness.json`
- `docs/task-011d1-freeze-qa.json`
- `lib/state-hhg/discovery/*`
