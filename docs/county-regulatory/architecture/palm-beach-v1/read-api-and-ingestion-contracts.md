# Read API & Ingestion Contracts (Palm Beach Pilot V1)

**Task:** FL-C009 (design-only)  
**Execution:** none in this task

---

## 1. Ingestion upsert contract

### 1.1 Program upsert

- Key: `(state_code, county_name, program_name)`
- Palm Beach Moving Business Permit program row must exist before credentials

### 1.2 Credential upsert (Wave A)

| Item | Contract |
|---|---|
| Key | `(program_id, credential_number, source)` |
| Cohort | PRODUCTION_LINK_READY only (46) for first run |
| `company_id` | Required for that cohort; from freeze crosswalk |
| `evidence_publication_state` | Force `INTERNAL_ONLY` on insert/update in PBC-PROD-001 Wave A path |
| PSA | Never write |
| Companies publication columns | Never write |
| Trust Score | Never write |
| Places APIs | 0 |

Idempotent: re-running the same ingest run id / evidence hash must not duplicate credentials.

### 1.3 Contact observation upsert (Wave B)

- Key: `(regulator, regulatory_id, observation_type)` after designed unique-index extension
- `regulator` distinguishes FDACS vs county
- Never overwrite `companies.*`

### 1.4 Complaint / disposition / enforcement (Waves C–D)

- Complaints keyed by source_record_id / natural case key within program
- Dispositions separate; optional FK to complaint
- Enforcement keyed by `(program_id, event_key)`
- All default `INTERNAL_ONLY`
- Reject rows with `consumer_pii = true`

### 1.5 Disposition catalog

- Upsert 44 PBC codes into `regulatory_disposition_code`
- Reference data only

---

## 2. Read API contract (future internal → later public)

### 2.1 Internal read (staff/tools)

`GET` conceptual resources:

- `/internal/county-regulatory/programs?state=FL&county=Palm Beach`
- `/internal/county-regulatory/credentials?company_id=`
- `/internal/county-regulatory/credentials?credential_number=MV…`
- `/internal/county-regulatory/complaints?credential_id=`
- `/internal/county-regulatory/dispositions?credential_id=`
- `/internal/county-regulatory/enforcement?credential_id=`

Internal reads may return `INTERNAL_ONLY` rows. Authz: service/staff only (same posture as contact observations — not anon).

### 2.2 Public read (only after eligibility)

Public endpoints (later task) MUST filter:

```
evidence_publication_state IN ('PUBLICATION_ELIGIBLE','PUBLISHED')
AND company publicly reachable
AND NOT WITHHELD
```

Public responses MUST NOT include:

- INTERNAL_ONLY / QUALIFIED-only rows
- Consumer PII
- Zero-result framed as complaint-free
- Trust Score fields derived from county evidence

### 2.3 Response shape (credential, illustrative)

```json
{
  "jurisdiction": { "state_code": "FL", "county_name": "Palm Beach" },
  "credential_type": "moving_business_permit",
  "credential_number": "MV747",
  "status": "LICENSED",
  "company_id": "fl-im-408",
  "fdacs_im": "IM408",
  "source": "PBC_MOVING_BUSINESS_PERMIT_ROSTER",
  "retrieved_at": "…",
  "evidence_publication_state": "INTERNAL_ONLY",
  "ruleset_version": "PBC_FDACS_RECONCILIATION_V1"
}
```

---

## 3. Freshness & history

- Credential roster refresh: update in place; bump `retrieved_at` / `last_verified_at`
- Optional history: FUTURE append-only history table — not required for Wave A
- Link fields retain `ruleset_version`, `match_method`, `linked_at`
- Ingest run id recorded for rollback

---

## 4. Error / conflict semantics

| Condition | Behavior |
|---|---|
| Duplicate credential key | Upsert / no-op if evidence_hash unchanged |
| Company link conflict | Do not retarget; mark REVIEW/CONFLICT |
| Missing program row | Fail closed |
| PII detected | Reject row; abort batch if gate says so |
| Attempted PSA county write | Hard fail |

Machine-readable: `read-api-contract.json`, `ingestion-upsert-contract.json`, `freshness-history-spec.json`.
