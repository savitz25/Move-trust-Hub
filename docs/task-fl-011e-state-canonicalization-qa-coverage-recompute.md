# Task FL-011E — Florida state canonicalization QA and coverage recompute

**Status:** `FL STATE CANONICALIZATION QA PASSED — COVERAGE RECOMPUTED`  
**Production DB writes:** `0`  
**Google Places / API requests:** `0`  
**Apply / publication:** none

## Current main / production

| Item | SHA |
| --- | --- |
| `origin/main` | `00df7f8c40eda00be9b7239180c548b6d92c0a5c` |
| Production | `00df7f8c40eda00be9b7239180c548b6d92c0a5c` |
| Match | **YES** |

Latest Builder 1 PR: #76 (FL-011D). Latest Builder 2: #79 (PBC-PROD-004).

Company count drift vs immediate post-FL-011D: **0** (5940 / 849 fl-im / 762 ingested / 5022 PUBLISHABLE / 4905 indexable).

## 113 mapping audit

**113 / 113 PASS.** Wrong-company: **0**. Identity/status/authority/canonical drift: **0**.

## 32 new companies

**32 / 32 HTTP 404.** All INGESTED / indexable=false.

IM1954 slug `a-1-freeman-moving-storage-llc-im1954` is 404 and does **not** steal `usdot-896791` (`a-1-freeman-moving-storage-l-l-c`; alias 307 preserved).

## Coverage (record-by-record, unique active IM = 1098)

Source snapshot `2026-08-21T17:11:52.759Z` (not a new paid refresh). Unique IM rows after broker filter: 1314 (historical bulk 1330). Unique ACTIVE: **1098** (tally 1099 includes one duplicate IM key).

| Primary class | Count |
| --- | ---: |
| WAVE2_READY_INTERNAL | 721 |
| PUBLIC_CANONICAL_WITH_FDACS | 79 |
| KEEP80 | 50 |
| WAVE1_PUBLISHABLE | 37 |
| NEW_FL011D_INTERNAL | 32 |
| INTERNAL_CANONICAL_WITH_FDACS | 11 |
| CORPORATE_FAMILY_REVIEW | 46 |
| POSSIBLE_DUPLICATE | 114 |
| CONFLICT | 5 |
| STATUS_BLOCKED | 3 |
| **Sum** | **1098** |

Safely represented: **930 / 1098 (84.7%)**. Unresolved: **168**.

Before FL-011D on this same unique-active set: 817 represented / 281 gap. After: 930 / 168. Net represented **+113**. Not `1104−168=936` and not `720+113`.

## Wave 2

Ready pool still **720**. Naive `720+113=833` is wrong: 79 of the 81 links are already public; 32 new companies are INGESTED but not Wave-2-ready (county/geo gate). Of 113: 79 already public, 32 internal-not-ready, 1 newly Wave-2-ready, 1 other.

`FL_STATE_WAVE_2_DRAFT` remains 50 / hash `a5d15f3dca32a59a` / apply=false / **50/50 still ready**. Untouched.

## Contacts (FL-011D realized, by type)

| Type | ATTACH (task FL-011D) | NOOP |
| --- | ---: | ---: |
| Phone | 35 | 78 |
| Email | 34 | 77 |
| Address | 35 | 78 |
| **Sum** | **104** | **233** |

Distinct companies gaining ≥1 attached observation: **35**. Promoted to canonical fields: **0**.

## Authority (113)

FL-011D match-method rows: **32**. Pre-existing/no-op: **81**. Wrong-company: **0**. Orphan active remaining: **0**. Historical expired rows not counted.

## Public vs internal

Internally FDACS-linked public companies: **176**. Publicly displaying FDACS Wave chrome: **37** (Wave 1 only). New public companies / new state profiles: **0**.

## State-only vs federal+state

FDACS-linked companies: 939. State-only (no USDOT/MC on the company row): 868. Federal+state: 71. Wave 1 state-only: 37. Wave-2-ready state-only: 720. FL-011D new state-only: 32.

## Wave 1

OBSERVATION HEALTHY — CONTINUE. Clock not reset. 37/37 200/noindex. KEEP_80 80/80.

## Next highest-value state task (do not start FL-012)

The unresolved 168 is unchanged in composition (114 possible duplicates, 46 corporate family, 5 conflict, 3 status). Highest-value follow-on while observation continues: a **fail-closed possible-duplicate / corporate-family evidence pack** (no publication). Wave 2 draft stays frozen at 50.
