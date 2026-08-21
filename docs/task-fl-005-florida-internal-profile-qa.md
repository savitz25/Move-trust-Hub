# Task FL-005 — Florida Internal Profile QA

**Status:** Internal QA + publication-state contract. **Not a public launch.**

**Google Places / Maps / Geocoding API requests: 0.**

Started from merged FL-004 `main` `9da92f4c`.

---

## 1. Publication-state contract

See `docs/task-fl-005-publication-state-contract.md`.

Anonymous `INGESTED` `/companies/{slug}` is now `notFound()`. `PUBLISHABLE` canary still renders with noindex. Legacy `publication_state=null` federal profiles are unchanged.

---

## 2. 37-company QA

Scorecard: **37 PASS / 0 REVIEW_REQUIRED / 0 FAIL**.

Artifact: `docs/task-fl-005-scorecard.json`.

Every row: `fl-im-*` ID, slug, FDACS IM number, active PSA, COUNTY_VERIFIED geography, FDACS observations attached, `INGESTED`, `indexable=false`, anonymous profile not allowed, no invented USDOT.

---

## 3. Suddath holds (unchanged)

See `docs/task-fl-005-suddath-investigation.json`.

| Regulatory ID | Florida legal name | Matched WA company | Determination | Action |
| ------------- | ------------------ | ------------------ | ------------- | ------ |
| `FL-FDACS-IM-3813` | SUDDATH MOVING & STORAGE, LLC (Tampa) | `wa-hg-064493` (Burien, WA; same legal name; `legal@suddath.com`) | Unresolved same-enterprise / multi-state authority candidate. Shared legal mailbox is not unique branch identity. | **HOLD** |
| `FL-FDACS-IM-4099` | SUDDATH RELOCATION SYSTEMS OF ST. PETERSBURG, INC. | `wa-hg-064493` | Distinct Florida corporation (different legal name). Same brand, not the same registrant. | **HOLD** |

`provider_state_authority` already allows one canonical company to hold multiple state authorities (`UNIQUE (company_id, state_code, authority_type, authority_number)`). FL-005 does **not** attach these Florida IMs to the WA company.

---

## 4. Cross-state collision audit

Among the 37 new FL-004 companies: **0** additional exact legal-name+email or legal-name+phone hits against non-`fl-im-*` companies.

Suddath remains the known brand-email collision and is outside the 37.

---

## 5. Universe (post FL-004, post FL-005 gate)

| Slice | Count |
|------:|------:|
| Total companies | 5,907 |
| Indexable | 4,905 |
| `fl-im-*` total | 816 |
| `fl-im-*` INGESTED | 766 (includes 37 FL-004) |
| `fl-im-*` PUBLISHABLE canary | 50 |
| KEEP_80_NOINDEX | 50 FL + 30 WA = 80 |
| FDACS-linked PSA company attachments | 911 |
| Active FDACS IM / MB (registry) | 1,088 / 26 |
| FL-003 REVIEW_REQUIRED remaining | 115 |
| Suddath held | 2 |

Existing federal/public Florida companies stay in the 4,905 indexable pool. FL-004’s 37 are internal INGESTED only.

---

## 6. State data completeness

**Acquired:** FDACS IM + MB registrations, status, phone, email, physical address, FL-003 qualification, FL-004 internal companies + PSA + observations.

**Deferred (PRA, not submitted):** broker↔mover contracted lists, complaint dispositions, enforcement/final orders, owners/officers as a first-class extract, registered agents, insurance/bond lapse history, historical applications beyond current snapshots.

---

## 7. Future FDACS profile block (not live)

Designed in `lib/state-hhg/fl/profile-presentation.ts`. Headline: Florida Intrastate Mover. Copy states FDACS registration is not FMCSA interstate authority. Contacts would be labeled “Contact reported in Florida FDACS registration,” distinct from canonical company contacts. Not an endorsement badge.

---

## 8. Recommended FL-006

Do not start automatically: **FL-006 — Decide whether to attach same-legal-name multi-state authorities (Suddath IM3813) or create distinct Florida entities for held brand registrants — still no public launch.**
