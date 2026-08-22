# Wave C — Complaint & Disposition Spec (Palm Beach Pilot V1)

**Task:** FL-C009 (design-only)  
**Wave:** C — Complaints / dispositions  
**Depends on:** Waves A (required), B (recommended)  
**Coverage class:** `SAMPLE` (BIR / public endpoints — not full multi-year bulk universe)

---

## 1. Scope

From C002/C003 Palm Beach evidence:

| Artifact | Count (design input) |
|---|---|
| Complaint observations | 20 |
| Dispositions with code or description | 17 |
| Disposition code catalog | **44** codes |

Store:

1. `county_complaint_observation` rows (allegation / case observations)
2. `county_disposition_observation` rows (official resolution)
3. `regulatory_disposition_code` reference catalog for PBC (44 codes)

---

## 2. Hard semantic rules

| Rule | Statement |
|---|---|
| COMPLAINT ≠ DISPOSITION | Separate tables / contracts; never collapse |
| Allegation ≠ misconduct finding | `misconduct_inference_forbidden = true` |
| Zero-result | May store `NO_COMPLAINT_RECORD_RETURNED_FOR_SEARCH_WINDOW` as RESEARCH_ONLY / INTERNAL only |
| Forbidden consumer claim | **Never** “complaint-free” / `COMPLAINT_FREE` |
| Consumer PII | 0 — strip complainant identity before commit |
| Trust Score | No complaint/disposition inputs in V1 |

---

## 3. Storage

- Complaints and dispositions are **separate** (see `storage-and-schema-spec.md`).
- Disposition codes reference `regulatory_disposition_code` (`jurisdiction = FL_PBC`).
- Link disposition → complaint when source provides explicit linkage; otherwise leave `complaint_id` null and keep provenance.
- Default `evidence_publication_state = INTERNAL_ONLY`.
- `coverage_class = SAMPLE` unless a later PRA/bulk acquisition upgrades coverage under a new ruleset version.

---

## 4. Windowing

Every complaint query/result set used for observations must record:

- `window_start` / `window_end` (or explicit “as-of retrieved_at” search window)
- Source system + URL/record id
- That absence of rows ≠ proof of no complaints outside the window

---

## 5. Profile / county-page copy (future)

Allowed patterns:

- “Palm Beach County Consumer Affairs records include N complaint case observation(s) in the sampled public window {start}–{end}.”
- “Disposition code {code}: {description} (county catalog).”

Forbidden:

- “No complaints on record” / “complaint-free”
- Ranking or Trust Score language tied to complaint counts
- Showing raw complainant names/phones/emails

---

## 6. Non-goals

- Full historical bulk disposition universe in Wave C V1
- Inferring guilt from open/closed statuses
- Productizing criminal referral language as criminal records
