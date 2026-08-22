# Palm Beach County Regulatory Pilot V1

**Status:** Design-only (FL-C009)  
**Pilot county:** Palm Beach (CREDENTIAL_BASED)  
**Credential:** Moving Business Permit `MV####`  
**Observed origin/main:** `ab93c84195f3b36c7e2bbd70495a0ee1432d8140` (FL-010r hard-404 remediation merged — state/publication still active)  
**C008 head:** `13f409cc17e6c18e27388773848fc995c518cd27`  
**SAFE_TO_INTEGRATE_COUNTY_STACK_NOW:** **NO**  
**Production DB migrations:** 0 · **Consumer PII committed:** 0 · **Trust Score wiring:** none · **Google Places:** 0

---

## 1. Purpose

Define the production evidence integration boundary for Palm Beach Pilot #1 so a later gated implementation can store and (eventually) display county regulatory facts without overloading state authority, without touching Trust Score/SEO indexability, and without publishing before eligibility gates pass.

This document is **design only**. No schema apply, no stack merge/rebase, no profile/county-page code edits, no publication.

---

## 2. Authoritative cohort (FL-C009)

Source: `data/county-regulatory/fl/architecture/c009/cohort/pbc-production-integration-cohort-v1.json`

| Metric | Count |
|---|---|
| Baseline permits | 142 |
| VERIFIED | 64 |
| REVIEW_REQUIRED | 12 |
| NOT_FOUND | 66 |
| Historical C003 canonical-linked | 46 |
| Current canonical-linked | 46 (delta gained 0 / lost 0) |
| PRODUCTION_LINK_READY | **46** |
| FDACS_LINKED_NO_CANONICAL | 18 |
| REVIEW_REQUIRED (integration class) | 12 |
| COUNTY_ONLY | 66 |

Among PRODUCTION_LINK_READY company publication_state:

| Company publication_state | Count |
|---|---|
| INGESTED | 33 |
| NULL | 11 |
| PUBLISHABLE | 2 |

Indexable is mostly `false`. **Implication:** Wave A future ingest is `INTERNAL_ONLY` for all 46. Public credential display only when the company is publicly reachable **and** county evidence is `PUBLICATION_ELIGIBLE` — almost none are public-ready today.

Supporting files:

- `cohort/pbc-production-link-ready-v1.json` (46 rows)
- `florida-im-company-crosswalk-current.json`

C003 evidence volumes (design inputs, not Wave A ingest):

- Complaint observations: 20
- Dispositions with code/desc: 17
- Disposition catalog: 44 codes
- Enforcement observations: 54 raw → 49 unique events

---

## 3. Pilot boundary

### In scope (design)

- Hybrid Option D storage for county credential + observation/event tables (sketches only)
- Waves A–D feature contracts for Palm Beach
- Read API + ingestion upsert contracts
- Evidence publication states and company-publication interaction rules
- Selective transplant allowlist and implementation sequence (gated)
- Rollback / abort conditions

### Out of scope (hard)

- Production migrations / any file under `supabase/migrations` for county
- Merges, rebases, stack transplant execution
- Profile page or county page code edits
- Trust Score inputs/weights/badges
- Google Places (or paid Places) APIs
- Consumer PII
- Overloading `provider_state_authority` with county credentials
- Consumer “complaint-free” claims from zero-result searches
- Publishing Wave A credentials in this task or first implementation task

---

## 4. Storage decision (summary)

**Option D hybrid (confirmed):**

1. Keep `provider_state_authority` **STATE-only** (FDACS HHG).
2. **NEW** `county_regulatory_program` + `provider_county_credential` concepts.
3. Prefer storing verified cross-source link fields on the county credential row (ruleset/method/timestamp); separate `county_cross_source_link` table is **OPTIONAL V1**.
4. Wave B: **EXTEND/REUSE** `provider_contact_observation` with county source provenance — never overwrite `companies.*`.
5. Complaints and dispositions: **separate** tables (or strictly typed observation subtypes with separate upsert contracts).
6. Enforcement: event table with explicit finality field/enum; separate final-outcome table **not required** for V1 if finality is explicit on the event.
7. Owner/officer: `V1_OPTIONAL` — not Wave A.
8. Fleet: `FUTURE` or optional Wave B label “county-reported fleet total” (not verified VIN inventory).

Concrete sketches: `storage-and-schema-spec.md` (non-executable; **not** under `supabase/migrations`).

---

## 5. Feature waves

| Wave | Name | Scope | First publication posture |
|---|---|---|---|
| **A** | Credential | MV permit #, status, dates, regulator, provenance, fail-closed `company_id` for 46 | `INTERNAL_ONLY` for all ingested credentials |
| **B** | Identity / contact | County-reported name/DBA/address/phone/website; contact observation reuse; owner/officer optional | `INTERNAL_ONLY` until explicit eligibility |
| **C** | Complaint / disposition | BIR complaint rows + 44-code disposition catalog; allegation ≠ finding | Never “complaint-free”; zero-result `RESEARCH_ONLY`/`INTERNAL` |
| **D** | Enforcement | Citations/admin actions SAMPLE; explicit finality only | Enforcement ≠ automatic misconduct badge |

Wave details: `wave-a-credential-spec.md` … `wave-d-enforcement-spec.md`.

---

## 6. Evidence publication states

Normative states for county evidence rows:

| State | Meaning |
|---|---|
| `INTERNAL_ONLY` | Staff/tools only; default for Wave A ingest |
| `QUALIFIED` | Passed ruleset/precision gates; still not consumer-visible |
| `PUBLICATION_ELIGIBLE` | Passed evidence gates; awaiting controlled publish |
| `PUBLISHED` | Consumer-visible under approved copy |
| `WITHHELD` | Deliberately held (conflict, PII risk, legal, precision) |

**Company × evidence gate for public display:**

```
public_credential_visible =
  company_is_publicly_reachable
  AND evidence.publication_state = PUBLICATION_ELIGIBLE|PUBLISHED
  AND evidence not WITHHELD
```

County evidence **must not** flip `companies.indexable` or any Trust Score signal.

---

## 7. Trust Score & SEO boundaries

- County regulatory evidence is **display / corroboration candidate only** in V1.
- No Trust Score weights, inputs, ranking changes, or badges driven by county facts.
- County evidence must not change sitemap inclusion or `indexable`.
- County page / profile presentation specs define **copy-only** future UI; no implementation in FL-C009.

---

## 8. Gates before any PBC-PROD implementation

All must be true:

1. `SAFE_TO_INTEGRATE_COUNTY_STACK_NOW = YES` recorded by an authorized follow-on task (currently **NO**).
2. Selective transplant of county artifacts onto a clean branch from current `main` completed and validators green (**stack transplant BEFORE any PBC-PROD code/DDL**).
3. FL-C009 validators green; C001–C008 validators green on frozen head.
4. Explicit human approval for first DDL task (still design-gated here).
5. Wave A ingest task configured as `INTERNAL_ONLY` / publish nothing.

**Recommended next coordination task:**  
`FL-C010 — County Stack Integration Gate — WAIT_FOR_STATE_TRACK_STABILITY`  
(not transplant yet).

---

## 9. Abort conditions

Abort (or freeze) Pilot #1 implementation if any of:

- Builder 1 still changing state publication / 404 / indexability behavior
- Attempt to place county credentials into PSA
- Consumer PII detected in staging artifacts
- Canonical link delta shows unexplained losses vs cohort freeze
- Precision gate for VERIFIED cohort falls below 98% on recompute
- Any task proposes Trust Score or indexable mutation from county evidence
- Migration proposed under active state-track collision without YES gate

---

## 10. Rollback posture

- Design package: revert git commit(s) of docs/data/scripts only.
- After future DDL: drop/disable new county tables; do not touch PSA or companies publication columns.
- After future INTERNAL ingest: delete county credential rows by `program_id` / ingest run id; leave companies untouched.
- After any accidental publish: set evidence `publication_state = WITHHELD` or `INTERNAL_ONLY`; never “fix” by mutating Trust Score.

See `rollback-spec.json` and `implementation-sequence.md`.

---

## 11. Decision summary

1. PSA remains STATE-only; new county credential concept.
2. Wave A = credentials only, INTERNAL_ONLY first, for PRODUCTION_LINK_READY (46).
3. Public display requires company public reachability **and** evidence eligibility — nearly none public-ready today.
4. Contact observation EXTEND/REUSE for Wave B; never overwrite `companies.*`.
5. Owner/officer not Wave A; fleet not verified VIN inventory.
6. Complaints ≠ dispositions; 44-code catalog as reference data.
7. Enforcement finality on event; separate final-outcome table optional.
8. County evidence never flips indexable / Trust Score.
9. Zero-result never “complaint-free.”
10. Stack transplant before PBC-PROD; FL-C010 = wait for state-track stability.

---

## 12. Related docs (this folder)

- `storage-and-schema-spec.md`
- `wave-a-credential-spec.md`
- `wave-b-identity-contact-spec.md`
- `wave-c-complaint-disposition-spec.md`
- `wave-d-enforcement-spec.md`
- `read-api-and-ingestion-contracts.md`
- `selective-transplant-allowlist.md`
- `implementation-sequence.md`
- `current-main-compatibility.md`
