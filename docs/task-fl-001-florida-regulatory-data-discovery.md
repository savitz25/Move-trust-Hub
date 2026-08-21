# Task FL-001 — Florida Regulatory Data Discovery & Acquisition Audit

**Status:** Discovery + acquisition planning only. **No production publication.**

**Google Places / Maps / Geocoding API requests: 0.**

**Database mutation in this task: none.** Read-only inspection of `companies` and existing `provider_state_authority`.

Florida is the first reusable state regulatory adapter. Tasks 011A–011C already created the national adapter contract and a Florida+Washington ingest. FL-001 independently re-audits official FDACS sources, baselines the current MoveTrustHub Florida universe, and records what is still missing (especially broker↔mover relationships, complaints, enforcement, and insurance history).

---

## 1. Executive summary

Florida Statutes Chapter 507 requires **intrastate movers** and **moving brokers** to register with the Florida Department of Agriculture and Consumer Services (FDACS). Registration is biennial. Insurance evidence is a registration condition. Brokers must file the list of registered movers they contract with, and FDACS is required to publish that list (s. 507.03(11)).

**Obtainable now (no public-records request):**

- Legacy Business License Lookup HTML-XLS bulk export for `IM-Intrastate Mover` and `MB-Moving Broker` (1,286 movers + 31 brokers in the 011B snapshot; combined normalized universe **1,359**).
- New PowerApps portal CSV (partial during 2026 migration: **45** movers + **2** brokers at snapshot). High contact yield (phone/email/address) but **USDOT = 0** and **Contracted Movers column empty**.

**Requires public records (or a still-unpublished official list):**

- Full broker↔mover relationship file (statute-mandated; not populated in current exports).
- Historical/non-active complete registration history beyond the lookup export.
- Chapter 507 enforcement/final-order extracts.
- Business-level complaint dispositions (complaints are public records; no bulk complaint dataset is posted).
- Insurance/bond compliance history separate from “currently registered.”

**MoveTrustHub Florida baseline (HQ/address in Florida, read-only):** **399** companies. Strong USDOT/phone coverage on interstate rows; **canonical email ≈ 0**; street address rarely stored. FDACS emails therefore have high future contact-observation value and must **not** overwrite canonical fields automatically.

**Deterministic matching:** FDACS has no USDOT. High-confidence links are exact legal name + exact phone (or DBA + corroboration). Name-only is prohibited. A 40-record sample yielded **5 VERIFIED / 5 REVIEW_REQUIRED / 29 NOT_FOUND / 1 NOT_APPLICABLE**. That is expected: most FDACS registrants are local-only and are not in the federal interstate directory.

**FL-002** should acquire the relationship + enforcement/complaint extracts (PRA), keep them in staging, and still not publish local Florida profiles.

---

## 2. Existing architecture reviewed

Do not duplicate these systems. Extend them.

| Piece | Path / table | Role |
|-------|--------------|------|
| Canonical companies | `public.companies` | `id` (text), `name`, `fmcsa_legal_name`, `entity_type`, `service_scope`, `usdot_number`, `mc_number`, `headquarters`, `physical_address`, `phone`, `email`, `website`, `publication_state`, `indexable` |
| Company mapping | `lib/supabase/queries/companies.ts` | Directory projection |
| Federal identity | `lib/federal-hhg/*`, `federal_hhg_staging` | USDOT/MC identity; do not overwrite from FDACS |
| Capabilities | `public.provider_capability` | `hhg_interstate_carrier`, `hhg_broker`, `hhg_intrastate`, `hhg_local`, `auto_*` |
| Federal authority | `public.provider_authority` | FMCSA / federal |
| State adapter contract | `lib/state-hhg/types.ts` | `StateMoverAdapter` |
| FL adapter | `lib/state-hhg/fl/adapter.ts`, `legacy-xls.ts` | FDACS IM/MB normalize |
| Identity matching | `lib/state-hhg/identity.ts` | Fail-closed hierarchy |
| Eligibility | `lib/state-hhg/eligibility.ts` | Intrastate legal gate |
| Staging | `state_hhg_registry_staging`, `state_hhg_ingest_run` | 011B internal observations |
| Canonical state authority | `provider_state_authority` | 1,359 FL rows already staged; **90 VERIFIED** attached |
| Florida consumer copy | `components/local-movers/fl-regulatory-clarity.tsx` | Ch. 507 vs FMCSA explanation |
| 50-state matrix | `docs/task-011a-50-state-mover-regulatory-matrix.json` | FL = YES / Tier A / HIGH |
| 011B pilot report | `docs/task-011b-fl-wa-state-adapter-pilot.md` | First FL ingest |

**No Florida FDACS tables existed before 011B.** FL-001 does not apply new migrations.

Verification vocabulary already in use (reuse): `VERIFIED`, `REVIEW_REQUIRED`, `UNRESOLVED`, `HISTORICAL` for authority; staging dispositions `MATCHED_EXISTING`, `NEW_PROVIDER_CANDIDATE`, `REVIEW_REQUIRED`, `HISTORICAL`, `OUT_OF_SCOPE`. FL-001 sample mapping adds `NOT_FOUND` / `NOT_APPLICABLE` for linkage reporting only.

---

## 3. Florida company baseline

Read-only query: headquarters or physical address matches Florida (`FL` / `Florida`). Retrieved 2026-08-21. **No writes.**

| Metric | Count | Share |
|--------|------:|------:|
| Total Florida-associated companies | **399** | 100% |
| Interstate `service_scope` | 329 | 82.5% |
| Intrastate / local `service_scope` | 70 | 17.5% |
| Entity ≈ Carrier | 265 | 66.4% |
| Entity ≈ Broker | 59 | 14.8% |
| Entity ≈ Carrier/Broker | 6 | 1.5% |
| Auto entity_type | 0 | 0% |
| With USDOT | 332 | **83.2%** |
| With MC | 315 | **78.9%** |
| Without federal ID | 67 | 16.8% |
| With phone | 390 | **97.7%** |
| With email | **0** | **0.0%** |
| With website | 78 | 19.5% |
| With headquarters city/state | 399 | 100% |
| With physical street-like address | 11 | 2.8% |
| Unique public names | 388 | — |
| Unique legal-ish names | 397 | — |
| Duplicate public-name groups | 7 | franchise brands (Two Men, College Hunks, etc.) |

Capability mix on this Florida set (a company may have more than one):

- `hhg_interstate_carrier` 270  
- `hhg_intrastate` 70 (INFERRED from local catalog, not FDACS-verified)  
- `hhg_local` 70 (same)  
- `hhg_broker` 69  
- `auto_broker` 1  
- none 2  

Do not treat inferred local capability as Florida legal eligibility.

Existing internal FL state-authority rows from 011B: **1,359** staged, **90 VERIFIED** attached to companies. Unchanged by FL-001.

---

## 4. Official source inventory

| Regulator / source | Dataset | URL | Current / historical | Type | Machine-readable? | Bulk? | Est. count | Acquisition |
|--------------------|---------|-----|----------------------|------|-------------------|-------|------------|-------------|
| FDACS Division of Consumer Services | Intrastate mover registrations (IM) | https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx | Current (+ some expired in export) | Official HTML-XLS lookup export | Yes (XLS table) | **Yes** (program filter + export) | 1,286 in snapshot | **Tier 1** |
| FDACS | Moving broker registrations (MB) | same lookup | Current | Official HTML-XLS | Yes | **Yes** | 31 in snapshot | **Tier 1** |
| FDACS new license portal | IM/MB CSV download | https://cslicense.powerappsportals.us/Business-Search/ | Current partial (2026 migration) | CSV | Yes | Partial | 45 movers / 2 brokers | **Tier 1 (incomplete)** |
| FDACS | Moving Companies program page | https://www.fdacs.gov/Business-Services/Moving-Companies | Current FAQ / insurance rules | HTML | No | No | n/a | Reference |
| FDACS | Moving Within Florida consumer page | https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida | Current | HTML | No | No | n/a | Reference |
| FDACS | Business search (ConsumerCompliance / FloridaConsumerHelp) | https://ConsumerCompliance.FDACS.gov / lookup | Current | Portal | Lookup | No full dump confirmed | unknown | **Tier 2** |
| FDACS | Broker contracted-mover list (s. 507.03(11)) | Required on FDACS website; **not populated** in IM/MB exports (`Contracted Movers` = empty) | Current legally required | Unknown extract | **Not found in bulk** | No | unknown | **Tier 3 PRA** |
| FDACS | Complaint intake | https://complaints.fdacs.gov | Current filings | Portal | No bulk | No | unknown | **Tier 3 PRA** for business-level dispositions |
| FDACS | Enforcement / admin actions / final orders | Not posted as a Chapter 507 bulk file | Mix | PDF/case files likely | No | No | unknown | **Tier 3 PRA** |
| FDACS | Insurance certificates / lapse history | Required at application; not a public bulk field beyond “Registered” | Current implied | Internal | No | No | unknown | **Tier 3 PRA** |
| FDACS | Owners / officers / registered agent / charter | Collected on FDACS-10960 / 10964 applications | Current on file | Application | No in lookup export | No | unknown | **Tier 3 PRA** |
| Florida DOS Sunbiz | Corporate officers / fictitious names | https://dos.fl.gov/sunbiz | Current | Search / some bulk | Partial | Some | n/a | **Tier 2** identity support only, not mover authority |
| Florida Legislature | Chapter 507 / 5J-15 FAC | flsenate.gov / flrules | Current law | HTML/PDF | n/a | n/a | n/a | Legal source |
| Local/municipal licenses | City/county occupational licenses | Varies | Varies | Varies | Usually no | Usually no | unknown | **Tier 4** for statewide adapter |

Third-party “license lookup” blogs are **not** authority.

---

## 5. Dataset / field matrix (actual findings)

| Field | Legacy IM/MB XLS | New portal CSV | Broker relationship | Enforcement | Complaints | PRA / application file |
|-------|------------------|----------------|---------------------|-------------|------------|------------------------|
| Registration number (IM/MB) | Yes | Yes | Expected | If recorded | If recorded | Yes |
| Type mover vs broker | Yes (license type) | Yes | Yes | Maybe | Maybe | Yes |
| Status | Yes (Registered / Expired / …) | Yes | — | Action status | Case status | Yes |
| Issue date | Yes | Yes | — | — | — | Yes |
| Expiration date | Yes | Yes | — | — | — | Yes |
| Legal / business name | Yes | Yes | Expected | Maybe | Maybe | Yes |
| DBA / other names | Yes | Yes | Maybe | Maybe | Maybe | Yes |
| Physical address | Yes | Yes | Expected | Maybe | Maybe | Yes |
| Mailing address | **Not in export** | **Not in export** | Maybe | — | — | Request |
| County | **Not a dedicated field** | **No** | Maybe | — | — | Request |
| Phone | Yes (~97%) | Yes | Expected | Maybe | Maybe | Yes |
| Business email | Yes (~93%) | Yes | Expected | — | **Do not ingest consumer email** | Yes |
| Website | **No** | **No** | Unknown | — | — | Request if held |
| USDOT / MC | **No** | **No** | Unlikely | If recorded | If recorded | Request if held |
| Owners / officers / directors | **No** | **No** | Required by statute for relationship list | Maybe | — | **Yes — PRA** |
| Registered agent | **No** | **No** | — | — | — | **Yes — PRA** |
| Charter / Sunbiz id | **No** | **No** | — | — | — | **Yes — PRA** |
| Contracted movers | Empty in legacy normalize | Column exists, **0 non-empty** | **This is the dataset** | — | — | **Yes — PRA** |
| Insurance / bond | Not listed as fields; registration implies current proof at issuance | Same | — | Lapse actions | — | **Yes — PRA** |
| Complaints | No | No | — | — | Intake only | **Yes — PRA, no consumer PII** |
| Enforcement | Status may show revoked/expired | Same | — | Case files | — | **Yes — PRA** |

---

## 6. Contact-data yield matrix

| Field | FDACS registration export | Broker relationship (statutory) | Enforcement | Complaint (public file) | PRA application packet |
|-------|---------------------------|---------------------------------|-------------|-------------------------|------------------------|
| Business email | **Yes — 1,270 / 1,359 (93.5%)** | Required for listed movers | Unlikely | Exclude consumer email | Yes |
| Phone | **Yes — 1,327 / 1,359 (97.6%)** | Required | Maybe | Exclude personal phones | Yes |
| Website | **No in current exports** | Unknown | No | No | Request if held |
| Physical address | **Yes — 1,359 / 1,359** | Required | Maybe | Exclude home addresses | Yes |
| Mailing address | **Not in lookup export** | Maybe | Maybe | Exclude | Request |
| Public business contact person | **No** | Officers listed for movers | Maybe | No | Owners/officers |
| Owner / officer | **No in lookup** | **Required by s. 507.03(11)** | Maybe | No | **Yes** |
| Registered agent | **No in lookup** | — | — | No | **Yes** |

MoveTrustHub canonical Florida emails today: **0**. FDACS is the highest-yield official email source. Store as `provider_contact_observation`, do not blindly overwrite `companies.email`.

---

## 7. Acquisition-method classification

| Dataset | Tier | Action |
|---------|------|--------|
| IM/MB current lookup XLS | **1** | Reuse `FloridaStateMoverAdapter`; refresh snapshot in FL-002 if needed |
| New portal CSV | **1** (incomplete) | Supplemental only until migration finishes |
| Broker↔mover list | **3** | Public-records request; statute says FDACS must publish it |
| Owners/officers/agent/charter | **3** | PRA of registration applications / internal extract |
| Complaints (business-level) | **3** | PRA; no consumer PII |
| Enforcement / final orders | **3** | PRA |
| Insurance lapse history | **3** | PRA |
| Sunbiz officers | **2** | Optional corroboration later; not Chapter 507 authority |
| Municipal licenses | **4** | Defer |

Do not scrape the complaint portal or CAPTCHA lookups at volume.

---

## 8. Sample acquisition findings

FL-001 did **not** re-hit FDACS (avoids duplicate load). It reused official 011B snapshots already in-repo.

| Snapshot | Records |
|----------|--------:|
| Legacy IM XLS | 1,286 |
| Legacy MB XLS | 31 |
| Combined adapter universe | **1,359** (legacy + new-portal gap fill) |
| New portal movers CSV | 45 |
| New portal brokers CSV | 2 |
| New portal contracted-mover cells filled | **0** |

Status mix (normalized): active 1,130; expired 115; unknown 113; revoked 1.

Representative raw excerpt (public business contacts only):  
`data/regulatory/florida/raw/fdacs-new-portal-broker-sample.csv`

Normalized audit: `data/regulatory/florida/normalized/fl-001-audit.json`

---

## 9. Identity-matching findings

Matcher: existing `matchStateRegistryIdentity` (no new fuzzy logic).

40 stratified official records vs current `companies`:

| Link status | Count |
|-------------|------:|
| VERIFIED | **5** |
| REVIEW_REQUIRED | **5** |
| NOT_FOUND | **29** |
| NOT_APPLICABLE | **1** |

Methods for VERIFIED: `exact_legal_name_and_phone` (4), `exact_dba_and_corroboration` (1). **USDOT matches: 0** because FDACS exports have no USDOT.

Examples of VERIFIED (identity link only — not published):

- IM107 Curry Moving & Storage — legal name + phone  
- IM1178 Let's Get Moving — legal name + phone  
- IM1204 Nobel Van Lines — legal name + phone  
- IM1026 Residential & Commercial Transport / Amwat — legal name + phone  
- IM109 S'EILLIW / Willie's Transfer — DBA + corroboration  

**False-positive traps observed / blocked:**

- Name-only or DBA-only (prohibited).  
- Franchise brands (Two Men, College Hunks, etc.) → `REVIEW_REQUIRED`.  
- Same-city HQ only (MoveTrustHub rarely stores FDACS street).  
- Shared phone without exact name.  
- Attaching enforcement by name.  
- Inferring USDOT/MC from a Florida license.

**Full-registry 011B result (context, not re-run):** 91 MATCHED_EXISTING / 90 VERIFIED of 1,359, 100% matched precision on the matched set. Most FDACS movers are **new local candidates**, not federal companies.

Primary deterministic identifiers for Florida: **IM/MB number**, then **exact legal name + exact phone**, then **exact legal name + exact street** (once MTH stores streets or we compare against FDACS street as observation).

---

## 10. Proposed normalized schema

Keep 011B tables. Add later (design only; **not applied**):

See `docs/regulatory/florida/proposed-schema.sql`

- `provider_state_authority` — already live  
- `provider_state_regulatory_event` — enforcement/final orders  
- `provider_state_broker_relationship` — s. 507.03(11) edges  
- `provider_contact_observation` — FDACS email/phone/address observations  

Rules: source-attributed; never auto-overwrite federal identity; never promote `hhg_local` to VERIFIED from geography.

---

## 11. Public-records datasets needed

1. Full current + historical IM registrations (all statuses).  
2. Full current + historical MB registrations (all statuses).  
3. Broker contracted/affiliated mover list with mover IM number, address, phone, email, owners/officers.  
4. Chapter 507 administrative actions / final orders.  
5. Business-level complaint counts/dispositions **without consumer PII**.  
6. Insurance/bond/CD compliance and cancellation/lapse flags.

Draft (unsent): `docs/regulatory/florida/public-records-request-draft.md`

---

## 12. Draft public-records request location

`docs/regulatory/florida/public-records-request-draft.md`

Custodian: FDACS Office of General Counsel / Sean Garner (850) 245-1000; https://www.fdacs.gov/Contact-Us/Public-Records-Requests

**Not submitted.**

---

## 13. Risks / limitations

- FDACS **does not publish USDOT** on license exports → Florida linkage is weaker than WA UTC.  
- New portal is mid-migration; legacy lookup remains the complete registered universe.  
- `Contracted Movers` column exists but is empty — high-value statutory dataset is missing from the public dump.  
- 113 “unknown” statuses need a dictionary (do not treat as active).  
- Canonical MTH emails are empty; importing FDACS emails without observation staging would pollute identity.  
- Local/municipal licenses are out of band.  
- Complaint filed ≠ violation.  
- Active registration ≠ we have the insurance certificate.  
- 011B already staged 1,359 FL authorities internally; FL-001 must not double-publish them.

---

## 14. Recommended FL-002 task

**FL-002 — Florida Chapter 507 relationship, enforcement, and contact-observation ingest (still non-public).**

Bounded scope:

1. Submit (or prepare for human submit) the PRA package.  
2. If the broker↔mover list appears on an official page/export, capture it with the existing adapter pattern.  
3. Land relationship / event / contact observations in staging tables only.  
4. Re-run fail-closed identity match; no fuzzy merges; no profile UI.  
5. Do not publish local Florida companies or change Trust Score.

Do not start FL-002 automatically.

---

## 15. Exact files added/changed (this task)

- `docs/task-fl-001-florida-regulatory-data-discovery.md`  
- `docs/task-fl-001-audit.json`  
- `docs/regulatory/florida/public-records-request-draft.md`  
- `docs/regulatory/florida/proposed-schema.sql`  
- `scripts/audit-task-fl-001.ts`  
- `lib/state-hhg/fl/fl-001-discovery.test.ts`  
- `data/regulatory/florida/raw/README.md`  
- `data/regulatory/florida/raw/fdacs-new-portal-broker-sample.csv`  
- `data/regulatory/florida/normalized/fl-001-audit.json`  
- `package.json` (`test:state-hhg` includes FL-001 tests; `audit:fl-001`)
