# Wave B — Identity & Contact Spec (Palm Beach Pilot V1)

**Task:** FL-C009 (design-only)  
**Wave:** B — Identity / contact enrichment  
**Depends on:** Wave A  
**Default evidence publication state:** `INTERNAL_ONLY`

---

## 1. Scope

County-reported identity and contact observations for companies already fail-closed linked in Wave A:

- Legal name / DBA (already on credential; may also land as observations)
- Physical address
- Business phone
- Business email (when present and non-PII / business-level)
- Website
- Optional: owner/officer title strings already on public roster (**V1_OPTIONAL**, not required for Wave B MVP)
- Optional: county-reported fleet total as labeled observation (**not** verified VIN inventory)

---

## 2. Storage decision

### 2.1 Contact observations — EXTEND/REUSE

Reuse `provider_contact_observation` with county provenance:

| Rule | Requirement |
|---|---|
| Regulator / source | Distinct from FDACS (e.g. `PBC_CONSUMER_AFFAIRS` / county source string) |
| Regulatory id | County credential number `MV####` (or program-scoped key) |
| Uniqueness | Must not clobber FDACS `(regulatory_id, observation_type)` rows — extend unique key to include regulator/source_system |
| Companies columns | **Never overwrite** `companies.email`, `companies.phone`, `companies.physical_address`, `companies.website` |
| Publication | Observations remain INTERNAL until explicit eligibility |

### 2.2 Owner / officer

| Decision | Value |
|---|---|
| Classification | `V1_OPTIONAL` |
| Wave A | **Excluded** |
| Wave B | Optional observation only if public roster field; strip personal emails/DOB; no consumer PII |
| Recommendation | Defer full owner/officer productization to Wave B+ or FUTURE unless needed for internal matching QA |

### 2.3 Fleet

| Decision | Value |
|---|---|
| County roster `fleet_size` | Optional Wave B label: **“county-reported fleet total”** |
| VIN / tag / GVW / decal inventory | `FUTURE` — not verified vehicles in V1 |
| Consumer copy | Must not imply inspected/verified fleet |

---

## 3. Identity matching hygiene

- Wave B does not invent new `company_id` links; it enriches already-linked credentials.
- Conflicting county vs canonical identity fields → preserve both with provenance; open `IDENTITY_REVIEW` / conflict record; do not auto-overwrite companies.
- Google Places APIs: **forbidden** for county matching/enrichment.

---

## 4. Profile presentation (future)

- Show county contact only when evidence eligible **and** company public.
- Prefer canonical company contact for primary profile fields; county values as “county registry lists …” secondary lines.
- Owner/officer: if shown, business-title only; no home address / DOB / consumer identity.

---

## 5. Non-goals

- Silent promotion of county phone/email onto `companies.*`
- Treating owner/officer as Trust Score signal
- Verified vehicle inventory claims
- Wave B public publish in the same task as first INTERNAL ingest
