# FL-C001 — Florida High-Value County Regulatory Intelligence Discovery & Acquisition Audit

**Status:** COMPLETE (discovery / catalog only)  
**Builder:** 2 (isolated worktree)  
**Starting SHA:** `2624cac772ea8e895f87939eb72e706f32df88e1`  
**Google Places/API requests:** **0**  
**Production mutations:** **NONE**

## Purpose

Parallel county track to Florida STATE (Builder 1). Discover, score, and rank official county datasets that add value beyond FDACS — **without** production integration.

## Legal checkpoint (verified)

**Fla. Stat. §507.13 (2025):** Chapter 507 preempts local mover ordinances **except** ordinances originally enacted before January 1, 2011 (and subsequent amendments). Local business tax (Ch. 205) is not preempted. FDACS may enter cooperative complaint-referral agreements with counties.

This explains why **Miami-Dade, Broward, Palm Beach, and Pinellas** continue mover-specific county programs while newer counties generally do not.

## Counties reviewed (15)

1. Miami-Dade  
2. Broward  
3. Palm Beach  
4. Hillsborough  
5. Pinellas  
6. Orange  
7. Duval  
8. Lee  
9. Polk  
10. Brevard  
11. Volusia  
12. Sarasota  
13. Collier  
14. Pasco  
15. Manatee  

## Ranking summary

| Rank | County | Tier | Value | Access | Eng. Cost | Value/Effort |
|-----:|--------|------|------:|-------:|----------:|-------------:|
| 1 | Palm Beach | **A** | 4.8 | 4 | 3 | 1.60 |
| 2 | Broward | **A** | 4.5 | 3 | 3 | 1.50 |
| 3 | Miami-Dade | **A** | 4.3 | 4 | 3 | 1.43 |
| 4 | Pinellas | **A** | 3.4 | 2 | 4 | 0.85 |
| 5 | Hillsborough | **B** | 2.2 | 4 | 3 | 0.73 |
| 6–11 | Duval, Orange, Lee, Collier, Brevard, Polk | **C** | ~1.0–1.5 | 2–3 | 3–4 | low |
| 12–15 | Volusia, Pasco, Manatee, Sarasota | **D** | ≤0.6 | 2 | 4 | very low |

Full scores: `docs/county-regulatory/fl/task-fl-c001-county-ranking.json`  
Source catalog: `data/regulatory-source-catalog/fl/county-sources.json`

## Tier A findings

### Palm Beach County — #1 / FL-C002 recommendation
- **Class:** MOVER_SPECIFIC_REGULATOR (grandfathered Moving Ordinance)
- **Agency:** Public Safety — Consumer Affairs
- **Datasets:** Licensed movers lookup; Business Information Reports (3-year allegations **and dispositions**); complaint filing
- **Complaints:** Yes — searchable business reports + office file detail
- **Dispositions:** Explicitly documented in Business Information Reports
- **Enforcement:** Investigation / compliance; detailed files at office; PRA for structured extract
- **Identity/contact:** Address, phone, website, owner/president when known
- **Acquisition:** SEARCHABLE_PUBLIC + PUBLIC_RECORD_REQUEST for bulk

### Broward County
- **Class:** MOVER_SPECIFIC_REGULATOR
- **Agency:** Consumer Protection Division
- **Datasets:** Mover registration + per-vehicle permit/decal; forms portal; ePermits; complaints; citations/hearings
- **Enforcement:** Strong (civil penalties, suspension/revocation, dedicated enforcement/hearings contacts)
- **Acquisition:** SEARCHABLE_PUBLIC / application portals + PRA for roster & enforcement extract

### Miami-Dade County
- **Class:** MOVER_SPECIFIC_REGULATOR
- **Agency:** RER — Office of Consumer Protection
- **Datasets:** Moving Business License; Mediation Center complaints/citations; **Local Business Tax open data / GIS** (BULK_PUBLIC identity layer)
- **Acquisition:** License PRA + LBT open-data sample later

### Pinellas County
- **Class:** MOVER_SPECIFIC_REGULATOR (Code Ch. 42 Art. VIII)
- **Geographic scope note:** Moves beginning/ending in Pinellas from Pinellas/Pasco/Hillsborough
- **Complaints:** Public intake form; weaker bulk lookup than PBC
- **Acquisition:** DOCUMENT_PUBLIC ordinance + PRA for any maintained roster

## Tier B

### Hillsborough
- No mover-specific ordinance located
- **Searchable consumer complaints** portal — high network reuse (ContractorTrustHub especially)
- BTR via Tax Collector — moderate identity value

## Tier C / D (why not now)
- **Orange / Duval:** general consumer mediation only; no mover permit program found
- **Lee / Collier / Brevard / Polk:** primarily BTR / identity; little incremental regulatory evidence vs FDACS
- **Sarasota:** county BTR **repealed** (2024) — municipal fragmentation
- **Pasco / Manatee / Volusia:** no mover-specific program; low value/effort

## Mover-specific counties (verified)
1. Palm Beach  
2. Broward  
3. Miami-Dade  
4. Pinellas  

(Consistent with historical Senate analysis and current official agency pages; AG consumer guide also notes Dade/Broward/Palm Beach local ordinances.)

## Complaint & enforcement highlights
| County | Complaints | Disposition | Enforcement |
|--------|------------|-------------|-------------|
| Palm Beach | Strong | **Strong (3-yr reports)** | Medium–Strong |
| Broward | Strong | Partial/unknown bulk | **Strong** |
| Miami-Dade | Strong | Partial | Strong (citations) |
| Pinellas | Intake | Unknown | Partial |
| Hillsborough | Searchable general | Partial | Partial |

**Rule:** complaint ≠ wrongdoing; disposition/final action tracked separately.

## Business tax
- **Miami-Dade LBT open data:** highest bulk accessibility for identity enrichment
- Broward / Palm Beach / others: BTR systems exist; incremental mover value usually secondary to mover licenses
- Sarasota county BTR repealed

## Court / sheriff
- Clerk systems exist in all large counties (civil/judgment search) — treat as future LEGAL_OBSERVATION only
- **No bulk police-report acquisition** — high PII / allegation risk; score low by default

## Public-record request drafts (not sent)
- `docs/county-regulatory/fl/pra-drafts/palm-beach-county-mover-regulatory-pra.md`
- `docs/county-regulatory/fl/pra-drafts/broward-county-mover-regulatory-pra.md`
- `docs/county-regulatory/fl/pra-drafts/miami-dade-county-mover-regulatory-pra.md`
- `docs/county-regulatory/fl/pra-drafts/pinellas-county-mover-regulatory-pra.md`

## Datasets acquired
**None downloaded in FL-C001.** Discovery validated via official pages/docs only. Safe LBT sample downloads deferred to FL-C002+ to avoid unnecessary repo bulk and any residual PII risk.

## Network reuse (summary)
| Source type | Move | Contractor | Lender | Insurance | Senior | Investor |
|-------------|------|------------|--------|-----------|--------|----------|
| County mover license | HIGH | MED | LOW | MED | MED | LOW |
| Consumer Affairs BIR/complaints | HIGH | HIGH | LOW | MED | HIGH | LOW |
| County LBT open data | MED | HIGH | MED | MED | MED | MED |
| Court dockets | LOW* | MED* | MED* | MED* | MED* | MED* |

\*Legal observation only — never auto-treat as wrongdoing.

## Recurring concepts (not final architecture)
- COUNTY_MOVER_PERMIT / REGISTRATION  
- COMPLAINT_OBSERVATION + COMPLAINT_DISPOSITION  
- ENFORCEMENT_EVENT / ADMINISTRATIVE_ORDER  
- BUSINESS_TAX_OBSERVATION  
- CONTACT_OBSERVATION / OWNER_OFFICER_OBSERVATION  
- VEHICLE_OBSERVATION (Broward/MDC likely)

## Recommended FL-C002
**FL-C002 — Palm Beach County Mover Regulatory Dataset Acquisition**

Do **not** start automatically.

## Architecture checkpoint
**NO — continue county acquisition/staging and defer final shared architecture until Florida state + several high-value county pilots are complete.**
