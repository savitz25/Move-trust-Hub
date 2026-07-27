# CMS data integration (Phase 1)

Government-backed trust signals for Insurance Trust Hub (MoveTrustHub `/insurance` routes).

## Deliverables

1. **Government Verification Panel** — `components/insurance/cms/government-verification-panel.tsx`  
   Props: `GovernmentVerificationData` (`types.ts`). Resolved via `resolve-government-verification.ts` + `ppef-lookup.ts`. **Never invents NPI.**

2. **Plan Complaint Index** — `/insurance/data/plan-complaint-index`  
   Rankings from `complaint-rankings.ts` ← `data/complaint-rankings.json` (real CMS Star Ratings import).

3. **Trust Score · Government Standing** — `government-standing.ts` + `enrichment/trust-score.ts`  
   Neutral when CMS data missing. Breakdown UI in `trust-score-breakdown.tsx`.

---

## Source files used (local raw data)

Downloaded under `insurance-trust-hub/cms-data/` (gitignored; see that repo’s `cms-data/README.md`).

| Purpose | File |
|---------|------|
| Complaint rates (primary) | `star-ratings/2026-star-ratings-data-tables/2026 Star Ratings Data Table - Measure Data (Oct 8 2025).csv` |
| Complaint measure stars | `…/2026 Star Ratings Data Table - Measure Stars (Oct 8 2025).csv` |
| YoY trend | `star-ratings/2025-star-ratings-data-tables/2025 Star Ratings Data Table - Measure Data (Dec 2 2024).csv` |
| FL/TX service + enrollment | `enrollment/cpsc-enrollment-2026-07/…/CPSC_Enrollment_Info_2026_07.csv` |
| PPEF active enrollment | `provider-enrollment/PPEF_Enrollment_Extract_2026.07.17.csv` |
| Opt Out | `provider-enrollment/OptOut_June2026.csv` |

Set `CMS_DATA_ROOT` to that folder when running import scripts.

---

## Column mappings — Plan Complaint Index

### Measure Data CSV structure

Rows 0–3 are headers; data starts at row 4.

| Logical field | CMS column |
|---------------|------------|
| `contract_id` | `CONTRACT_ID` (col 0) |
| Organization type | `Organization Type` (col 1) |
| Contract / legal name | `Contract Name` (col 2) |
| Marketing name (preferred display) | `Organization Marketing Name` (col 3) |
| Parent org | `Parent Organization` (col 4) |
| **Health plan complaint rate** | **`C28: Complaints about the Health Plan`** |
| Drug plan complaint rate (fallback) | `D02: Complaints about the Drug Plan` |
| Measurement period (C28/D02) | `01/01/2024 – 12/31/2024` (2026 Star Ratings package) |

Non-numeric cells (`Plan not required to report measure`, `Not enough data available`, etc.) are excluded from rankings.

### Ranking rules

1. Prefer **C28** when numeric; else **D02**.
2. Sort **ascending** (lowest complaint rate = rank #1).
3. **National** tab: top 40 consumer contracts (excludes employer/union-only direct).
4. **Florida / Texas** tabs: contracts with **≥ 50 published enrollees** in that state in July 2026 CPSC enrollment (excludes employer-only).
5. **Trend**: compare same contract’s rate in 2026 vs 2025 Measure Data (`improving` = lower rate).
6. **Star context**: C28/D02 measure star from Measure Stars table (not always overall summary rating).

Processed output: `lib/insurance/cms/data/complaint-rankings.json`.

---

## Column mappings — Government Verification / Standing

### Opt Out Affidavits (`OptOut_June2026.csv`)

| Field | Use |
|-------|-----|
| `npi` | Membership → `inactive` / “Opted out of Medicare” |
| Name / specialty / dates | Not displayed on panel (provenance only) |

Processed: `lib/insurance/cms/data/opt-out-npis.json` (~56k NPIs).

### PPEF Enrollment Extract

| Field | Use |
|-------|-----|
| `NPI` | Membership in active FFS enrollment extract → `active` when index loaded |
| Other PPEF columns | Reserved; not required for Phase 1 standing |

Processed (optional, **gitignored**, ~33MB): `lib/insurance/cms/data/ppef-active-npis.json`  
Meta: `lib/insurance/cms/data/ppef-meta.json`

**Join caveat:** PPEF sub-files (address, reassignment) may be an earlier quarterly vintage than the July base extract. Phase 1 uses base NPI membership + Opt Out only.

**Provider join:** Panel matches only when `provider.npi` is set (10-digit). Hub seed agents currently omit NPI → Medicare listings show **Pending NPI / PECOS match** (honest empty state).

---

## Refresh procedure

```bash
# From move-trust-hub-temp (or monorepo root that contains these scripts)
export CMS_DATA_ROOT="C:/Users/…/insurance-trust-hub/cms-data"   # Windows path OK

# 1) Complaint rankings (required for Plan Complaint Index)
node scripts/import-cms-complaint-rankings.mjs

# 2) Opt Out NPI list (required for verification)
node scripts/import-cms-opt-out.mjs

# 3) Optional full PPEF index (local / large deploys only)
node scripts/import-cms-ppef-index.mjs
# Skip full index: PPEF_SKIP_FULL=1 node scripts/import-cms-ppef-index.mjs
```

Then:

1. Confirm `CMS_COMPLAINT_DATASET_META.usingPlaceholderData === false` via the generated JSON `meta`.
2. Deploy. Page UI does not need structural changes.
3. To disable PPEF file load at runtime: `PPEF_INDEX_ENABLED=0`.

### When CMS publishes new files

1. Re-download Star Ratings / PPEF / Opt Out into `cms-data/` (see insurance-trust-hub `cms-data/README.md`).
2. Re-run the three scripts above.
3. Commit **code +** `complaint-rankings.json` + `opt-out-npis.json` + `ppef-meta.json`.  
   Do **not** commit raw ZIPs or `ppef-active-npis.json` unless you intentionally accept a ~33MB binary in git/Vercel.

---

## Import fields (complaint pipeline summary)

`contract_id` · `organization_name` · `complaints_per_1000` (C28/D02) · `measurement_year` · optional `starRating` (measure star) · optional state via CPSC enrollment · optional trend vs prior Star year.

Prefer **scheduled public CMS file import** over live restricted APIs. Version with `dataVintage` + `syncedAt` on `CMS_COMPLAINT_DATASET_META`.
