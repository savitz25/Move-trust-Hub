# Wave A — Credential Spec (Palm Beach Pilot V1)

**Task:** FL-C009 (design-only)  
**Wave:** A — County credential  
**Default evidence publication state:** `INTERNAL_ONLY`  
**Trust Score:** unchanged · **Indexable:** unchanged

---

## 1. Exact scope

Ingest and store Palm Beach **Moving Business Permit** credentials for fail-closed linked companies only:

| Field | Required |
|---|---|
| `credential_number` (`MV####`) | Yes |
| `credential_type` (`moving_business_permit`) | Yes |
| County `status` (e.g. LICENSED) | Yes |
| `issue_date` / `expiration_date` | When present in source |
| `legal_name` / `dba_name` (county-reported) | Yes as observation on credential row |
| `regulator` / `source` / `source_url` / `retrieved_at` | Yes |
| `company_id` | Yes for PRODUCTION_LINK_READY cohort only |
| `fdacs_im`, `match_result`, `match_method`, `ruleset_version`, `linked_at` | Yes when linked |
| `evidence_publication_state` | Always `INTERNAL_ONLY` on first ingest |

**Out of Wave A:** contact overwrite, owner/officer productization, complaints, dispositions, enforcement, fleet VIN inventory, public profile UI, county page UI, Trust Score, indexable flips.

---

## 2. Eligibility

### 2.1 Ingest eligibility (INTERNAL)

| Integration class | Wave A ingest? |
|---|---|
| `PRODUCTION_LINK_READY` (46) | **Yes** — primary Wave A cohort |
| `FDACS_LINKED_NO_CANONICAL` (18) | No company attach; optional later INTERNAL unmatched credential rows (not Wave A default) |
| `REVIEW_REQUIRED` (12) | No |
| `COUNTY_ONLY` (66) | No |

Authoritative list: `cohort/pbc-production-link-ready-v1.json` (`row_count: 46`).

### 2.2 Public display eligibility (future; not Wave A execution)

Public credential display requires **all** of:

1. Credential row exists with fail-closed `company_id`
2. `evidence_publication_state ∈ {PUBLICATION_ELIGIBLE, PUBLISHED}`
3. Company is publicly reachable under existing state/company publication rules
4. Not `WITHHELD`

**Current reality:** Among 46 PRODUCTION_LINK_READY, company `publication_state` is mostly `INGESTED` (33) or null (11); only 2 `PUBLISHABLE`; indexable mostly false. Therefore Wave A must design for **INTERNAL_ONLY for all 46** and must not assume public profile surfaces.

---

## 3. Hierarchy / presentation order (future UI)

When eventually displayed on a profile (later task):

1. **State HHG authority** (FDACS via PSA) — primary state credential
2. **County Moving Business Permit** — secondary jurisdictional credential
3. Never collapse county status into PSA status
4. Label example: “Palm Beach County Moving Business Permit {MV####} — {status} (county source)”

County block is omitted entirely while evidence is `INTERNAL_ONLY`.

---

## 4. Profile copy constraints (design)

Approved future copy patterns (not implemented here):

- “Palm Beach County lists Moving Business Permit **MV####** with status **LICENSED** as of {retrieved_at date}.”
- “County permit status is separate from Florida FDACS household goods authority.”

Forbidden:

- “Fully licensed in all jurisdictions” without per-jurisdiction facts
- Implying Trust Score improvement from county permit
- Showing county permit on non-public / non-eligible companies

---

## 5. Upsert semantics (design)

- Natural key: `(program_id, credential_number, source)`
- Refresh in place on roster re-pull; preserve `company_id` unless ruleset re-link says otherwise
- On conflict with REVIEW/CONFLICT: do not silently retarget `company_id`
- First implementation ingest run: `evidence_publication_state = INTERNAL_ONLY` for every row; publish count = 0

---

## 6. Gates

- Stack selective transplant completed before any Wave A DDL/ingest code
- PBC-PROD-001 foundation tables exist (design → later task)
- Cohort freeze hash/counts validated (`PRODUCTION_LINK_READY = 46`)
- Validator asserts Wave A INTERNAL and Trust Score NO

---

## 7. Success criteria (future implementation)

- 46 INTERNAL credential rows linked to canonical `company_id`
- 0 public profile mutations
- 0 PSA county rows
- 0 Trust Score / indexable changes
- Consumer PII committed = 0
