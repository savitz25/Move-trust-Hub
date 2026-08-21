# Task 011A — National Intrastate / Local Regulatory Program Foundation

**Status:** Architecture / planning only. **No local publication.**

**Google Places API requests: 0.**

## Core principle

Keep these separate forever:

| Letter | Concept | Decides |
|--------|---------|---------|
| **A** | Regulatory eligibility | *Can this company legally perform this intrastate move?* |
| **B** | Service-area discovery | *Where should an eligible company appear geographically?* |

Derived geography must **never** create legal eligibility.

## What already exists in MoveTrustHub

- `public.companies` + `service_scope` (`interstate` \| `intrastate`)
- Additive `provider_authority` (`jurisdiction` federal\|state, includes `state_mover`)
- Additive `provider_capability` including `hhg_intrastate` / `hhg_local` (today mostly **INFERRED** from `service_scope`)
- County pages: DB assignments + static catalogs (`docs/LOCAL-MOVERS-DATA-SOURCE.md`)
- Federal HHG Waves 1–4 complete; DB directory engine live

**Gap:** almost no **VERIFIED** state-license evidence; local discovery still largely catalog/geography heuristics.

## Artifacts

| Path | Purpose |
|------|---------|
| `docs/task-011a-50-state-mover-regulatory-matrix.json` | All 50 states + DC source matrix |
| `docs/task-011a-local-candidate-universe.json` | Recomputed candidate pools (not authorized) |
| `docs/task-011a-provider-state-authority.schema.sql` | Additive schema design (not applied in 011A) |
| `lib/state-hhg/*` | Adapter contract, eligibility, service-area helpers |

## Candidate universe (LOCAL_INTRASTATE_CANDIDATE)

Candidate ≠ publishable.

Recomputed (Task 011A audit):

| Pool | Count |
|------|------:|
| Existing `service_scope=intrastate` companies | **329** (23 unique USDOTs) |
| Staging `NOT_HHG` US/DC | **0** (current staging is HHG-focused; property carriers not persisted) |
| Identity-review staging USDOTs | **4,427** (excluded from local publication) |
| Public companies | **4,941** |
| Indexable | **4,905** |

**Primary future local ingest source:** state registries via adapters (FDACS, UTC, TxDMV, …), not federal HHG staging.

Do **not** treat historical ~96k as a fixed count — recompute each task from live sources.

## State access tiers

| Tier | Meaning |
|------|---------|
| **A** | Direct machine-readable / bulk / API-quality regulatory source |
| **B** | Strong official lookup; bulk/PRA often needed |
| **C** | Fragmented but usable official sources |
| **D** | Weak / unclear mover-specific authority evidence |

## Adapter contract

`StateMoverAdapter` in `lib/state-hhg/types.ts`:

- `getSourceMetadata`
- `fetchOrLoadRegistry`
- `normalizeRecord`
- `resolveAuthority` → canonical `ProviderStateAuthorityRecord`
- role/status/identity/contact (+ optional insurance/enforcement/complaint)

Every adapter feeds the **same** schema. Zero Google dependency.

## Canonical authority model

Proposed additive table: `provider_state_authority`  
(see `docs/task-011a-provider-state-authority.schema.sql`)

Verification states fail closed:

`VERIFIED` · `REVIEW_REQUIRED` · `UNRESOLVED` · `HISTORICAL`

**Inferred authority is never VERIFIED.**

## Eligibility engine

`isProviderEligibleForIntrastateMove(provider, state)`:

- Same-state → require verified active state authority when matrix says YES/CONDITIONAL
- Interstate → **not** this path; use FMCSA HHG
- State authority never qualifies interstate
- Federal USDOT alone never qualifies state-only when state authority is required
- UNKNOWN requirement → fail closed

## Routing

| Move | First gate |
|------|------------|
| Same state | State regulatory eligibility |
| State → state | FMCSA federal HHG eligibility |

## Role model

One provider row. Multiple capabilities/authorities:

`hhg_interstate_carrier` · `hhg_broker` · `hhg_intrastate` · `hhg_local` · `auto_*`

Do not duplicate companies for multi-authority.

## Derived service area (design only — not run)

```
verified operating location
+ verified state authority
+ fleet/power-unit info
+ derived radius (EXPERIMENTAL)
+ county polygon intersection
= derived county service area
```

Evidence priority:

1. Explicit verified provider service area  
2. Regulator-defined territory  
3. Curated internal assignment  
4. Derived radius/county model  

HQ state ≠ serves entire state. State authority ≠ all counties.

### Experimental power-unit bands (NOT CONSUMER-PUBLISHED)

| Band | Power units ≤ | Candidate radius |
|------|---------------|------------------|
| very_small | 2 | 25 mi |
| small | 5 | 40 mi |
| medium | 15 | 75 mi |
| large | 50 | 125 mi |
| very_large | ∞ | 200 mi |

Must be empirically validated in 011B/011C before any consumer use.

### County edge scale (estimate)

If ~90,000 providers × 10–30 counties:

- Low: ~0.9M  
- Base: ~1.8M  
- High: ~2.7M  

Recommend keyed `(provider_id, county_fips)` with `coverage_type` + `evidence_type`; partition by `state_code` beyond ~2M edges.

## Fail-closed local publication (future)

**Does NOT qualify:** USDOT alone, nearby-only, power units alone, website, “Moving” in name, Google reviews alone, inferred capability without state authority, federal HHG alone for state-only moves, expired/revoked authority, identity review.

**Does qualify (future):** verified state authority where required + identity confidence + current status + appropriate role; geography only after the gate.

## Consumer explanation (future)

Explain eligibility and discovery separately, e.g.:

- Florida intrastate authority: Verified  
- Operating location: Broward County  
- Service area: Derived from operating location and fleet size (experimental model)  
- Palm Beach County: intersects estimated service area  

Never claim derived radius is an official regulatory territory.

## Adapter QA contract

Every adapter must prove: freshness, ID parsing, active/expired/suspended/revoked, mover vs broker, identity match, duplicates, no authority inference, provenance, idempotent ingest, **zero Google**.

## Rollout roadmap (no publication in 011A)

| Wave | Scope |
|------|--------|
| **PILOT** | FL + WA |
| **WAVE A** | 5–8 data-rich Tier A/B states (TX, CA, IL, NJ, NY, …) |
| **WAVE B** | Next 10–15 documented states |
| **WAVE C** | Remaining strong-source states |
| **MANUAL / HOLD** | Tier D / UNKNOWN |

## Pilot states

1. **Florida (FDACS)** — YES authority, Tier A, high consumer value, registration + complaints path  
2. **Washington (UTC)** — YES authority, Tier A, live HHG carrier lookup, tariff/enforcement clarity  

## Freeze (011A)

New public / indexable / sitemap / local / intrastate / auto capabilities: **0**  
Waves 1–4 and Task 008B: **unchanged**

## Next

**Task 011B — First State Adapter Pilot** (FL + WA only). Do not start automatically. Do not publish national local candidates automatically.
