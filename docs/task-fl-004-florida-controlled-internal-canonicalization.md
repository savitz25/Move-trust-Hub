# Task FL-004 — Florida Controlled Internal Canonicalization

**Status:** Internal canonicalization only. **Not a public Florida launch.**

**Google Places / Maps / Geocoding API requests: 0.**

**Ruleset:** `FL_HHG_PUBLICATION_V1`  
**Manifest hash:** `c632adcfa174afdb`

`CANONICAL INTERNAL COMPANY != PUBLIC COMPANY`

Every FL-004 insert is `publication_state=INGESTED` and `indexable=false`.

---

## 1. FL-003 handoff

PR #38 was rebased onto `origin/main` `2624cac7` (011D.4 `KEEP_80_NOINDEX`), requalified (still 37), and merged as `e2973919`.

FL-004 started from that merge SHA.

---

## 2. Manifest

Frozen in `data/state-hhg/fl/fl-004-canonicalization-manifest.json`.

| Action | Count |
|--------|------:|
| INSERT new internal companies | **37** |
| LINK existing-provider (same-state, exact email+legal) | **1** |
| HOLD (FL IM matched WA company — ambiguous) | **2** |

No company outside this manifest was created.

---

## 3. Apply

| Metric | Before | After | Delta |
|--------|-------:|------:|------:|
| Companies | 5,870 | 5,907 | +37 |
| Indexable | 4,905 | 4,905 | **0** |
| Florida companies (script heuristic) | 1,111 | 1,148 | +37 |
| Florida indexable | 330 | 330 | **0** |
| fl-im-* total | 779 | 816 | +37 |
| fl-im INGESTED | 729 | 766 | +37 |
| fl-im PUBLISHABLE | 50 | 50 | **0** |
| Canary FL/WA/total | 50/30/80 | 50/30/80 | **0** |
| Florida PSA rows | 1,359 | 1,359 | 0 (updated in place) |
| FDACS observations | 3,875 | 3,875 | 0 (company_id attached) |

PSA links written for 37 new companies (existing unmatched staging rows). Observations attached: 110. Canonical `companies.email/phone/physical_address` were **not** updated on pre-existing providers. New rows used the 011D.2A insert shape (minimum location + optional official phone/email on the new row only).

---

## 4. Existing-provider candidates

Recalculated: **3**.

- `FL-FDACS-IM-3772` → `fl-im-3150` via `exact_legal_name_and_email` — **linked** (Florida dual registration).
- `FL-FDACS-IM-3813` / `FL-FDACS-IM-4099` → `wa-hg-064493` (Suddath) — **held**. Florida operating address vs Washington company is ambiguous; fail closed. No merge.

---

## 5. County distribution (new internal companies)

Pinellas 3, Miami-Dade 7, Lee 3, Collier 1, Sarasota 3, Nassau 1, Martin 2, Polk 1, Broward 6, Manatee 2, Orange 2, Seminole 1, Hillsborough 4, Monroe 1.

Census geocode cache / unique ZIP only. No Google.

---

## 6. KEEP_80_NOINDEX

Canary membership unchanged: 50 Florida + 30 Washington = 80. All remain `PUBLISHABLE` + `indexable=false`. FL-004 IDs are not in `local_hhg_canary_publication`. Home-county evidence for new rows is `consumer_eligible=false`.

---

## 7. Public exposure

INGESTED companies are excluded from directory search, sitemap (`isSeoIndexableCompany`), and FL/WA canary county discovery.

Direct `/companies/{slug}` may resolve an INGESTED row the same way 011D.2A `fl-im-*` profiles do, with **noindex**. That is existing architecture, not a new public launch.

---

## 8. Idempotence

Second apply: company inserts 0, indexable delta 0, canary delta 0, observation row count unchanged. See `docs/task-fl-004-idempotence-audit.json`.

---

## 9. Rollback

`docs/task-fl-004-rollback.sql`

Deletes only the 37 FL-004 `fl-im-*` IDs while `INGESTED` + `indexable=false`, plus FL-004-tagged discovery/capability rows, and detaches FDACS observations/PSA written for those IDs. Does not delete canary, prior 011D.2A companies, or federal providers.

---

## 10. Recommended FL-005

**FL-005 — Observation-only Florida state-only profile QA (still INGESTED / noindex), or a separately authorized noindex canary expansion.** Do not publish the 37. Do not expose FDACS on consumer pages unless explicitly authorized.
