# Task FL-003 — Florida State-Only Qualification & Publication Design

**Status:** Qualification + QA + publication design only. **No live publication.**

**Google Places / Maps / Geocoding API requests: 0.**

**Canonical company contacts overwritten: NO.**  
**Trust Score changed: NO.**  
**Companies freeze: 5870 → 5870 (unchanged).**  
**Indexable freeze: 4905 → 4905 (unchanged).**

Ruleset: `FL_HHG_PUBLICATION_V1`

---

## 1. Executive summary

FL-003 evaluated every normalized FDACS registration against a fail-closed publication ruleset. It does **not** publish companies, expose FDACS on public pages, or promote contact observations onto `companies.*`.

After 011D.2A, many previously “state-only” IM rows already exist as internal `fl-im-*` companies (`publication_state=INGESTED`, `indexable=false`). Those are existing-provider link candidates, not new public profiles.

| Result | Count |
|--------|------:|
| Normalized FDACS registrations | **1332** |
| Active state-only IM (FL-002 class) | **1001** |
| PUBLICATION_READY new state-only movers | **37** |
| EXISTING_PROVIDER_LINK_CANDIDATE | 3 |
| REVIEW_REQUIRED | 115 |
| DUPLICATE_OR_OVERLAP | 865 |
| INSUFFICIENT_IDENTITY | 41 |
| INSUFFICIENT_GEOGRAPHY | 27 |
| BROKER_ONLY | 29 |
| HISTORICAL | 112 |
| STATUS_BLOCKED | 103 |
| Sample QA precision | **100.0%** (37/37) |

**Publication-ready new Florida state-only movers: 37**

---

## 2. Git / worktree

Isolated worktree `C:\\Users\\makei\\move-trust-hub-fl001`, branch `task-fl-003-florida-state-only-qualification`, starting from merged FL-002 main.

Official source: https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx. No new Google requests. Census geocode cache was **read only**.

---

## 3. Candidate baseline

Recalculated; not copied from FL-002.

| Slice | Count |
|-------|------:|
| FDACS registrations | 1332 |
| IM | 1303 |
| MB | 29 |
| Active | 1114 |
| Expired | 114 |
| Unknown | 104 |
| Revoked | 0 |
| Existing VERIFIED FDACS PSA links | 868 |
| Rematch VERIFIED / REVIEW_REQUIRED / NOT_FOUND / NOT_APPLICABLE | 872 / 176 / 170 / 114 |
| Active state-only IM (FL-002 candidate_class) | 1001 |
| Active MB | 26 |
| Dual IM+MB entity groups | 3 |
| Current companies / indexable | 5870 / 4905 |
| Florida companies (all / indexable / fl-im INGESTED) | 1178 / 395 / 779 |

FL-002 class counts: {"ACTIVE_STATE_ONLY_CANDIDATE":1026,"EXPIRED_STATE_RECORD":114,"MATCHED_EXISTING":88,"UNKNOWN_STATE_RECORD":104}

---

## 4. Qualification rules (`FL_HHG_PUBLICATION_V1`)

A candidate is `PUBLICATION_READY` only when all of the following hold:

- Stable FDACS id `FL-FDACS-IM-*`
- License type IM (not MB)
- Normalized status `active` (raw FDACS status preserved)
- Usable legal name
- No franchise/network brand without USDOT
- No unresolved duplicate with another FDACS row (same legal name + address/phone/email)
- No exact match to an existing MoveTrustHub company
- Florida physical street + city
- Not a PO Box
- `COUNTY_VERIFIED` from Census geocode cache (address MATCH or unique ZIP)
- Website **not** required
- Email **not** required
- Phone preferred but **not** required
- FMCSA/USDOT **not** required; absence is `NO_FEDERAL_ID_IN_CURRENT_MTH_DATA`, never “no USDOT exists”

---

## 5. Existing-provider collision audit

Identity rematch used the same fail-closed matcher as 011B/FL-002, now against the post-011D.2A company universe (including internal `fl-im-*` ids derived from IM numbers).

| Outcome | Count |
|---------|------:|
| Already linked via `provider_state_authority` | 870 |
| of which FL-002 public/existing MATCHED_EXISTING | 88 |
| of which public/indexable company | 90 |
| of which internal `fl-im-*` INGESTED (011D.2A) | 780 |
| New exact existing-company matches (link candidates) | 3 |
| PUBLICATION_READY remaining (safe new companies) | 37 |

No merges were written. Link evidence is in `data/state-hhg/fl/publication-eligibility-v1.json`.

---

## 6. FDACS internal deduplication

Registration rows ≠ businesses. Groups were not auto-collapsed unless legal name plus address/phone/email corroborated a **definite** duplicate; survivors keep the lexicographically first regulatory id. Shared phone/email/address across **different** legal names are probable/review only.

| Kind | Groups |
|------|------:|
| Definite | 2 |
| Probable | 31 |

---

## 7. Franchise QA

Franchise/network tokens never count as unique identity without USDOT. Observed brand-token rows:

- College Hunks: 15
- Two Men and a Truck: 20
- Mayflower: 1

---

## 8. Geography resolution

Official FDACS physical address is the location observation. County uses existing Census geocode cache only.

| Field | Count |
|-------|------:|
| Street resolved | 1331 |
| City resolved | 1332 |
| ZIP resolved | 1331 |
| Florida valid | 1297 |

ZIP index: 452 ZIPs, 449 unique-county, 3 multi-county.

---

## 9. County resolution

| Class | Count |
|-------|------:|
| COUNTY_VERIFIED | 1226 |
| COUNTY_REVIEW_REQUIRED | 1 |
| COUNTY_UNRESOLVED | 105 |

City-only guesses are never verified. Multi-county ZIPs stay review-required.

---

## 10. County coverage

Internal statistics only. County pages were not changed.

Publication-ready by county (non-zero):

- Broward: ready 6, review 22
- Collier: ready 1, review 4
- Hillsborough: ready 4, review 4
- Lee: ready 3, review 2
- Manatee: ready 2, review 2
- Martin: ready 2, review 1
- Miami-Dade: ready 7, review 10
- Monroe: ready 1, review 0
- Nassau: ready 1, review 0
- Orange: ready 2, review 4
- Pinellas: ready 3, review 2
- Polk: ready 1, review 1
- Sarasota: ready 3, review 5
- Seminole: ready 1, review 0

Counties with zero publication-ready FDACS candidates: 53 (Alachua, Baker, Bay, Bradford, Brevard, Calhoun, Charlotte, Citrus, Clay, Columbia, DeSoto, Dixie, Duval, Escambia, Flagler, Franklin, Gadsden, Gilchrist, Glades, Gulf, Hamilton, Hardee, Hendry, Hernando, Highlands, Holmes, Indian River, Jackson, Jefferson, Lafayette, Lake, Leon, Levy, Liberty, Madison, Marion, Okaloosa, Okeechobee, Osceola, Palm Beach, Pasco, Putnam, Santa Rosa, St. Johns, St. Lucie, Sumter, Suwannee, Taylor, Union, Volusia, Wakulla, Walton, Washington).

---

## 11. Contact availability

Across all FDACS registrations:

| Contact | Count |
|---------|------:|
| Email | 1240 |
| Phone | 1297 |
| Physical address | 1332 |
| No email | 92 |
| No website (all; FDACS has none) | 1332 |

Missing website or email does not block `PUBLICATION_READY`.

---

## 12. Broker separation

MB rows stay `BROKER_ONLY`. Dual IM+MB entity groups: 3. Broker-only records are excluded from the mover publication cohort.

---

## 13. Status exclusions

| Status | Cohort | Count |
|--------|--------|------:|
| Expired | HISTORICAL | 112 |
| Unknown / revoked / other non-active | STATUS_BLOCKED | 103 |

History is retained in staging and eligibility JSON. Not counted as active movers.

---

## 14. Review-required categories

FL-003 `REVIEW_REQUIRED` cohort (115), fail-closed buckets:

- name_collision: 72
- other: 29
- state_source_duplicate: 13
- geography_conflict: 1

FL-002 original `REVIEW_REQUIRED` dispositions: 173. Reasons: {"name_similarity_insufficient_without_corroboration":94,"franchise_or_network_brand_fail_closed":41,"dba_without_unique_corroboration":37,"legal_name_phone_collision":1}.

These records do not block qualification of the cleaner state-only cohort.

---

## 15. Publication-ready cohort

`Publication-ready new Florida state-only movers: 37`

Exclusions from the full FDACS set:

- REVIEW_REQUIRED: 115
- DUPLICATE_OR_OVERLAP: 865
- INSUFFICIENT_IDENTITY: 41
- INSUFFICIENT_GEOGRAPHY: 27
- STATUS_BLOCKED: 103
- BROKER_ONLY: 29
- HISTORICAL: 112
- OUT_OF_SCOPE: 0
- EXISTING_PROVIDER_LINK_CANDIDATE: 3

---

## 16. Sample QA

Deterministic sample of 37 publication-ready rows, checked only against official FDACS snapshots (legacy XLS + new-portal CSV). No Google Places.

| Check | Result |
|-------|--------|
| Sample size | 37 |
| Pass | 37 |
| Estimated precision | 100.0% |
| Fail-closed for later launch | NO |

---

## 17. Projected Florida universe

Do **not** use `399 + 1,001`. 011D.2A already created internal Florida companies.

| Slice | Count |
|-------|------:|
| Current Florida MoveTrustHub companies (public + internal) | 1178 |
| Current Florida indexable | 395 |
| Existing providers with FDACS PSA linkage | 868 |
| Internal `fl-im-*` INGESTED | 779 |
| Newly qualified state-only movers | 37 |
| Newly discovered overlap (link candidates) | 3 |
| **Estimated future unique Florida companies** | **1215** |

`current Florida companies + PUBLICATION_READY` (link candidates are already in the current company count).

---

## 18. Publication gate (later FL-004)

Do not launch until:

- valid active FDACS IM identity
- no unresolved duplicate or existing-company collision
- COUNTY_VERIFIED (or an explicit later exception)
- sample precision ≥ 95%
- no live sitemap / county-page / Trust Report changes without a dedicated task

This task did **not** open that gate.

---

## 19. Contact-promotion design (not executed)

### Email
Promote FDACS email to canonical only when tied to VERIFIED regulatory identity, syntactically usable, not shared across unrelated entities, and no higher-confidence conflicting source.

### Phone
Promote when tied to VERIFIED identity, valid normalized number, no unresolved conflict.

### Address
Promote as state-regulatory location when parseable and unambiguous. Do not overwrite a stronger canonical HQ without explicit resolution.

FL-003 did not modify `companies.email`, `companies.phone`, or `companies.physical_address`.

---

## 20. Deferred public-records datasets

Still deferred (absence does not block basic directory qualification):

- broker ↔ mover contracted-mover lists
- enforcement / disciplinary actions
- complaints
- owners / officers
- registered agents
- insurance / bond lapse history
- historical applications

Do not submit the Florida PRA from this task.

---

## 21. Files changed

- `lib/state-hhg/fl/publication-v1.ts`
- `lib/state-hhg/fl/zip-county.ts`
- `lib/state-hhg/fl/fl-003-qualification.test.ts`
- `scripts/run-task-fl-003-qualification.ts`
- `data/state-hhg/fl/publication-eligibility-v1.json`
- `docs/task-fl-003-florida-state-only-qualification.md`
- `docs/task-fl-003-audit.json`
- `docs/task-fl-003-sample-qa.json`

---

## 22. Tests

`npm run test:state-hhg` includes FL-003 qualification tests (active IM, MB exclusion, expired/unknown, duplicates, existing-provider collision, franchise, county unique vs ambiguous, missing website/email allowed, no federal id required, ruleset version, no live publication / Google / canonical mutation).

---

## 23. Recommended FL-004

**FL-004 — Controlled internal canonicalization of the PUBLICATION_READY Florida cohort (still non-public unless explicitly approved), plus optional `provider_state_authority` links for EXISTING_PROVIDER_LINK_CANDIDATE rows.** Do not start automatically. Do not expose FDACS on consumer pages in that task unless separately authorized.
