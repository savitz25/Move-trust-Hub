# Task FL-011H — Florida FDACS moving broker identity model and internal staging readiness

**Status:** `READY_FOR_FL_BROKER_INTERNAL_STAGING`  
**Production DB writes:** `0`  
**Google API:** `0`  
**Consumer PII:** `0`  
**FL-012:** prohibited until `2026-09-05T14:45:00Z`  
**Draft:** `FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT` apply=`false` hash=`e1e78a4d18cf2c0c`

This task dispositions the Florida FDACS Moving Broker / MB lane so state-level completion does not silently omit brokers. It does not publish Wave 2, mutate Wave 1, create companies, attach authorities, change `entity_type`, or touch county tables.

## Current main / production

| Field | Value |
|---|---|
| origin/main | `e7a3cd00b36e20c763599ea94606ca6fa7f634f8` |
| production SHA | `e7a3cd00b36e20c763599ea94606ca6fa7f634f8` |
| SHA match | YES |
| Latest Builder 1 PR | #86 (FL-011G) |
| Latest Builder 2 PR | #87 (MDC-PROD-002) |

Builder 2 Miami-Dade work on main is preserved. This branch rebases from current origin/main only.

## IM mover freeze (unchanged)

Active IM **1098**. Represented **930**. Unresolved **168**. Coverage **84.7%**.

Required FL-011H IM changes: active `0` / represented `0` / unresolved `0` / coverage `0`.

MB is **not** part of this denominator.

## MB universe `FL_FDACS_MB_UNIVERSE_V1`

Recomputed from the approved committed FDACS snapshot (`retrievedAt: 2026-08-21T17:11:52.759Z`). Not hardcoded.

| Partition | Count |
|---|---|
| Unique MB | 29 |
| Active/current | 26 |
| Expired | 2 |
| Unknown | 1 |
| Duplicate MB | 0 |

## Status revalidation

Active snapshot rows: `ACTIVE_FRESH`.

The three historically status-blocked records (MB105 unknown, MB114 expired, MB165 expired) were probed against the official FDACS public lookup URL. The lookup is an ASPX form and does not return a per-MB status over GET. Live status was **not invented**. Those three remain `STATUS_REFRESH_REQUIRED`.

## Existing 2 canonical audit

| MB | Legal name | Canonical | Terminal | Verdict |
|---|---|---|---|---|
| MB159 | REAL TIME RELOCATION LLC | `fl-im-3405` | EXISTING_CANONICAL_LINK_READY | **PASS** |
| MB171 | PINNACLE VAN LINES LLC | `usdot-3197443` | EXISTING_CANONICAL_ALREADY_MODELED | **PASS** |

**2/2 PASS.** Evidence is exact legal name + phone (MB159) and prior attached MB authority plus name/phone corroboration (MB171). `usdot-3197443` is not treated as federal evidence from the slug; federal overlap uses `companies.usdot_number` only.

## Historical STATE_RECORD_ONLY 17

All 17 independently reclassified as `NEW_BROKER_CANONICAL_READY`. Each has current active FDACS MB status, a stable legal form in the official name, no safe existing canonical company, no duplicate candidate, and official FDACS snapshot evidence. No companies were created.

## Historical name-only 7

All 7 remain `REMAINS_IDENTITY_REVIEW`. Name-only auto-link: **0**.

## Status-blocked 3

| MB | Snapshot | Terminal |
|---|---|---|
| MB105 RELOCATE US LLC | unknown | STATUS_BLOCKED |
| MB114 J & D PROFESSIONAL SERVICES OF FLORIDA, INC. | expired | EXPIRED_NO_STAGING |
| MB165 ARCA INTERNATIONAL, INC. | expired | EXPIRED_NO_STAGING |

## Terminal classification (sums to 29)

| Class | Count |
|---|---|
| EXISTING_CANONICAL_LINK_READY | 1 |
| NEW_BROKER_CANONICAL_READY | 17 |
| EXISTING_CANONICAL_ALREADY_MODELED | 1 |
| EXPIRED_NO_STAGING | 2 |
| STATUS_BLOCKED | 1 |
| REMAINS_IDENTITY_REVIEW | 7 |
| CONFLICT | 0 |
| OTHER_WITHHOLD | 0 |
| **Total** | **29** |

## Active broker coverage (not 84.7%)

Active **26**. Represented today **1** (MB171 already modeled). Unrepresented **25**. Current identity coverage **3.8%**.

If the frozen ready pool were later internally staged: simulated represented **19** / **73.1%**.

## Role overlap

FDACS MB is `MOVING_BROKER`, distinct from `INTRASTATE_MOVER`. An MB registration does not prove physical household-goods transport.

| Overlap | Count |
|---|---|
| BROKER_ONLY | 27 |
| MOVER_AND_BROKER | 1 (MB159 / IM3405) |
| FEDERAL_AND_BROKER | 1 (MB171) |
| MOVER_FEDERAL_AND_BROKER | 0 |

Do not infer federal broker authority from FDACS MB. Do not infer FDACS mover authority from MB.

## State authority model

**REUSE_AS_IS.** `provider_state_authority` already distinguishes `intrastate_hhg_broker` from `intrastate_mover_registration`. Unique identity is `(company_id, state_code, authority_type, authority_number)`, so the same company may hold IM and MB without collision. Eligibility and Wave 2 publication already exclude broker types from mover hauling / IM chrome.

No `provider_broker_authority` or parallel table.

## Consumer broker semantics (not published)

Recommended future section: **Florida Moving Broker Registration**, identifier `MB-####`, regulator Florida FDACS.

Verification: “Registration information verified against Florida FDACS records.”

Role clarification: “This record reflects a Florida moving-broker registration and is distinct from registration as an intrastate household-goods mover.”

Prohibited on MB-only records: licensed/registered/approved/certified/safe mover, carrier, motor carrier, government approved, MoveTrustHub Approved.

If a company later has both IM and MB, present both identifiers separately under Florida State Regulatory Records.

## Publication model

Public FDACS chrome remains Wave 1 IM membership gated (`shouldRenderFloridaStateWaveChrome`). Attaching an internal MB row does not automatically display broker evidence.

Current tally: PUBLICATION_MODEL_READY **0** / MODEL_EXTENSION_REQUIRED **1** (public PINNACLE) / COMPANY_NOT_PUBLIC **18** / IDENTITY_NOT_READY **7** / STATUS_NOT_READY **3**.

No public implementation in FL-011H.

## Safe internal ready pool `FL_FDACS_MB_INTERNAL_READY_POOL_V1`

LINK **1** / INSERT **17** / total **18**. apply=`false`.

INSERT future intent: `publication_state=INGESTED`, `indexable=false`, anonymous HTTP 404. Proposed ids `fl-mb-*`.

LINK future intent: existing publication and indexability unchanged. Target `fl-im-3405` for MB159.

## Public exposure simulation

New public companies **0**. Broker chrome **0**. Search/directory/compare/sitemap/indexability/Trust Score **0**. `PUBLICATION_GATE_REMEDIATION_REQUIRED`: false.

## State completion broker disposition

| Flag | |
|---|---|
| BROKER_SCOPE_MODEL_DEFINED | YES |
| BROKER_IDENTITY_COHORT_FROZEN | YES |
| BROKER_INTERNAL_READY_POOL_FROZEN | YES |
| BROKER_PUBLICATION_MODEL_DEFINED | YES |

Internal apply is a future bounded task (FL-011I). It is not started here.

## Freezes

Wave 1: 37 members. Membership/publication/indexability change **0**. Clock reset **NO**. Launch `2026-08-22T14:45:00Z`. Maturity `2026-09-05T14:45:00Z`.

Wave 2: ready pool **720**. Draft **50**. Hash `a5d15f3dca32a59a`. apply=`false`.

County: Palm Beach 46 (11 PUBLISHED / 35 INTERNAL_ONLY). Miami-Dade 70 INTERNAL_ONLY. County writes **0**. Programs **2**. Credentials **116**.

Trust Score changed: **NO**.
