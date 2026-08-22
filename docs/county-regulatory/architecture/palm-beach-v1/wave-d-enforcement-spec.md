# Wave D — Enforcement Spec (Palm Beach Pilot V1)

**Task:** FL-C009 (design-only)  
**Wave:** D — Enforcement events  
**Depends on:** Waves A (required), B (recommended)  
**Coverage class:** `SAMPLE`

---

## 1. Scope

From C003 enforcement qualification:

| Metric | Count |
|---|---|
| Raw enforcement observations | 54 |
| Unique event keys (qualified) | 49 |

Store administrative actions / citations / related events as `county_enforcement_event` rows with provenance and explicit finality.

---

## 2. Finality model (V1)

Separate final-outcome table is **NOT required** for V1 if finality is explicit on the event:

| `finality_state` | `is_final` | Meaning |
|---|---|---|
| `UNKNOWN` | false | Source did not state finality |
| `NON_FINAL` | false | Explicitly non-final / pending |
| `FINAL_EXPLICIT` | true | Source explicitly final |
| `VACATED_EXPLICIT` | false | Explicitly vacated/withdrawn |

**Rules:**

- Do not infer finality from age, disposition of a related complaint, or absence of updates.
- `ENFORCEMENT_EVENT ≠ FINAL_OUTCOME` conceptually even when packed onto one row.
- Deduplicate by stable `event_key` (C003 pattern); do not collapse distinct ordinance sections/dates solely because they share a company.

---

## 3. Storage highlights

- Unique `(program_id, event_key)`
- Optional `credential_id` / `company_id` when fail-closed linked
- `coverage_class = SAMPLE`
- `evidence_publication_state = INTERNAL_ONLY` by default
- `consumer_pii = false` enforced

---

## 4. Profile copy (future)

Allowed:

- “Palm Beach County records include a {event_type} dated {event_date} citing {ordinance_or_section} (county source; finality: {finality_state}).”

Forbidden:

- Treating every citation as a current operating ban
- Trust Score penalties from SAMPLE enforcement in V1
- Implying criminal guilt from civil/administrative county actions

---

## 5. Non-goals

- Complete enforcement universe export
- Auto-linking complaint → NOV → citation without explicit case fields
- Criminal-record productization
