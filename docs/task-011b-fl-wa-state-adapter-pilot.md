# Task 011B — Florida + Washington State Mover Adapter Pilot

**Status:** Internal staging only. **No local publication. No county assignments.**

**Google Places API requests: 0.**

## Objective

Implement the first two `StateMoverAdapter` pipelines (FL + WA) from official state registries into:

1. `state_hhg_registry_staging` — reproducible source observations  
2. `provider_state_authority` — canonical authority conclusions  

Identity matching is fail-closed. New-provider candidates remain non-public.

## Sources

### Florida — FDACS

| Item | Value |
|------|--------|
| Regulator | Florida Department of Agriculture and Consumer Services (FDACS) |
| Primary bulk source | Legacy Business License Lookup HTML-XLS export |
| URL | https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx |
| Programs | `IM-Intrastate Mover`, `MB-Moving Broker` |
| Supplemental | New PowerApps portal CSV (partial during 2026 migration) |
| New portal | https://cslicense.powerappsportals.us/Business-Search/ |
| Freshness | Live official lookup as of Task 011B retrieval |
| Machine-readable method | Official HTML-table XLS export + CSV download |

**011A note update:** 011A classified FL Tier A with uncertain bulk access. 011B confirmed official bulk export via legacy lookup (`Records Found` + Download/Export). New portal is official but incomplete mid-migration (~45 movers / 2 brokers at retrieval); legacy remains required for full registered universe.

### Washington — UTC

| Item | Value |
|------|--------|
| Regulator | Washington Utilities and Transportation Commission (UTC) |
| Source | Household Goods Carriers company registry (industry code 568) |
| List URL | https://www.utc.wa.gov/companies?exposed_select_industry=568&regulatory_status=1 |
| Detail URL | https://www.utc.wa.gov/company/{nodeId} |
| Freshness | Live official HTML registry as of Task 011B retrieval |
| Machine-readable method | Deterministic HTML scrape of official pages (no Google) |

## Architecture

```
Official registry snapshot
  → StateMoverAdapter.normalizeRecord
  → identity match (fail-closed)
  → state_hhg_registry_staging (observation)
  → provider_state_authority (canonical)
```

No writes to:

- `companies` publication / indexable flags  
- `provider_capability` public promotion  
- county coverage tables  
- sitemap  

## Role semantics

| State | Role | Authority type |
|-------|------|----------------|
| FL | Intrastate Mover | `intrastate_mover_registration` |
| FL | Moving Broker | `intrastate_hhg_broker` |
| WA | HHG Carrier (active) | `intrastate_hhg_carrier` |

Broker-only records are **not** hauling-mover eligible.

## Identity hierarchy

1. Exact USDOT  
2. Exact prior state authority number  
3. Exact legal name + exact address  
4. Exact legal name + exact phone  
5. Exact DBA + phone/address corroboration  

Never auto-match: similar name alone, city alone, phone alone, address fragment, franchise brand alone.

Franchise/network brands (`Two Men and a Truck`, Allied, Mayflower, Atlas, Colonial, College Hunks, PODS, …) fail closed to `REVIEW_REQUIRED` without strong USDOT/prior-authority evidence.

## Verification rule

`VERIFIED` only when:

- official status is current/active  
- authority meaning understood  
- identity match strong  
- status supports current authority  

Active license + uncertain identity → `REVIEW_REQUIRED` / `UNRESOLVED` (for new candidates).

## Artifacts

| Path | Purpose |
|------|---------|
| `supabase/migrations/20260821010000_task_011b_state_authority.sql` | Additive schema |
| `supabase/migrations/20260821011500_task_011b_authority_index_fix.sql` | Partial unique index fix |
| `lib/state-hhg/fl/*` | Florida adapter |
| `lib/state-hhg/wa/*` | Washington adapter + UTC fetch |
| `lib/state-hhg/identity.ts` | Matching + verification |
| `docs/task-011b-fl-verified-authority-cohort.json` | Internal FL cohort |
| `docs/task-011b-wa-verified-authority-cohort.json` | Internal WA cohort |
| `docs/task-011b-rollback.sql` | Rollback (staging/authority only) |
| `data/state-hhg/fl/*` | Official FL snapshots |
| `data/state-hhg/wa/*` | Official WA snapshots |

## Commands

```bash
npx tsx scripts/fetch-wa-utc-registry.ts
npx tsx scripts/apply-task-011b-state-authority.ts
npx tsx scripts/ingest-task-011b-fl-wa.ts --state=ALL
npx tsx scripts/audit-task-011b-precision.ts
npx tsx scripts/qa-task-011b-freeze.ts
npm run test:state-hhg
```

## Pilot results (internal)

| Metric | Florida | Washington |
|--------|--------:|-----------:|
| Source records | 1,359 | 277 |
| Movers | 1,330 | 277 |
| Brokers | 29 | 0 |
| MATCHED_EXISTING | 91 | 69 |
| NEW_PROVIDER_CANDIDATE | 974 | 196 |
| REVIEW_REQUIRED | 178 | 12 |
| HISTORICAL | 116 | 0 |
| VERIFIED authority | 90 | 64 |
| Matched precision | **100%** | **100%** |
| Phone coverage | 97.4% | 98.9% |
| Email coverage | 93.2% | 96.8%* |
| Address coverage | 100% | 93.1% |
| USDOT in source | 0% | 98.9% |

\*WA email % from registry scrape field coverage.

Freeze after ingest: companies **4,941**, indexable **4,905**, waves **1000 / 1274 / 1279 / 920**, capabilities unchanged, counties created **0**.

## Limitations

- FL FDACS does not supply USDOT in the license export → identity leans on name+address/phone.  
- FL new portal is incomplete during migration; legacy export is the authoritative bulk set for 011B.  
- WA list claimed 285 active; unique detail nodes scraped: 277 (duplicate list rows collapsed).  
- No complaints/enforcement bulk fields in these exports (lookup/complaint channels exist separately).  
- Power-unit radius / county edges intentionally **not** run (Task 011C).  

## Next

**Task 011C — FL + WA Local Service-Area Calibration & County Mapping Pilot**  
Use only verified state-authority mover cohorts. Do not start automatically.
