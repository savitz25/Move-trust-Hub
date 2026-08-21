# Task 011D.2A — FL + WA READY Provider Canonicalization

**Status:** COMPLETE — FL + WA READY PROVIDERS CANONICALIZED INTERNALLY / NO PUBLICATION

**Google Places API requests:** 0

## Ready cohort (recomputed)

| State | READY | REVIEW | INACTIVE | ADDRESS_UNRESOLVED |
|-------|------:|-------:|---------:|-------------------:|
| FL | 786 | 18 | 98 | 69 |
| WA | 152 | 0 | 0 | 44 |
| **Total READY** | **938** | | | |

## Canonicalization outcomes

| State | Created | Matched-existing | Moved-to-review | Failed | Already |
|-------|--------:|-----------------:|----------------:|-------:|--------:|
| FL | 781 | 1 | 3 | 0 | 1 |
| WA | 148 | 0 | 4 | 0 | 0 |

## Publication freeze

- New companies: publication_state=`INGESTED`, indexable=`false`
- New public: 0
- New indexable: 0
- Companies before → after: 4941 → 5870
- Indexable before → after: 4905 → 4905

## Home county / authority

- FL home counties: 781
- WA home counties: 148
- FL/WA verified authorities attached (run): 783 / 148
- Internal capabilities on new ids: 1734
- consumer_eligible on discovery evidence: **false**

## Safety

- Authority collisions: 0
- New USDOT collisions: 0
- Quarantine leaks: 0
- Consumer visibility leaks: 0

## Precision audit

- FL sample: 100
- WA sample: 100
- Issues: 0
- Precision: 100%

## Radius

POWER_UNIT / FIXED radius consumer use: **NO**. Adjacent inference: **NO**.

## Artifacts

- `docs/task-011d2a-canonicalization-manifest.json`
- `docs/task-011d2a-canonicalization-audit.json`
- `docs/task-011d2a-rollback.sql`

## Recommendation

Proceed to **Task 011D.2B — FL + WA Local Publication Canary Preparation** (do not auto-start). No broad publish.
