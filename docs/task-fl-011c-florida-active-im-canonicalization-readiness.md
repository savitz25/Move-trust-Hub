# Task FL-011C — Florida active IM canonicalization readiness

**Status:** `READY_FOR_FL_STATE_CANONICALIZATION_WAVE`  
**Apply:** `false`  
**Production DB writes:** `0`  
**Google Places / API requests:** `0`

## Gap

Recomputed `STATE_RECORD_ONLY` active FDACS IM records with no `fl-im-{n}` company:

**281** (matches FL-011B historical target)

Snapshot: `FL_STATE_ACTIVE_IM_CANONICALIZATION_GAP_V1`

## Classification (exactly one per IM)

| Class | Count |
| --- | ---: |
| EXISTING_CANONICAL_LINK_READY | 81 |
| NEW_CANONICAL_COMPANY_READY | 32 |
| POSSIBLE_DUPLICATE | 114 |
| CORPORATE_FAMILY_REVIEW | 46 |
| CONFLICT | 5 |
| SOURCE_STATUS_BLOCKED | 3 |
| REVIEW_REQUIRED | 0 |
| **Total** | **281** |

Name-only auto-link: **0**. Wave 1 / KEEP_80 not auto-linked.

## Internal draft (not applied)

`FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT`  
hash `491de1629fa00c44`  
LINK 81 / INSERT 32 / total 113  
intended `INGESTED` / `indexable=false` / future anonymous 404

Wave 2 draft (`FL_STATE_WAVE_2_DRAFT`, 50, `a5d15f3dca32a59a`) is unchanged and still `apply=false`.

## Impact ledger (DISCOVERED only)

See `docs/florida-impact-ledger/state/fl-011c-impact-delta.json`. Canonicalized=0, publicly published=0.
