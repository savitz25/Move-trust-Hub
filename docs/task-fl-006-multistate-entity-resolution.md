# Task FL-006 — Multi-State Entity Resolution

**Status:** Identity architecture + bounded Suddath resolution. **Not a public launch.**

**Ruleset:** `MULTI_STATE_REGULATED_ENTITY_V1`  
**Google Places / API requests: 0.**

Started from merged FL-005 `main` `d486e5a8`.

---

## 1. Model finding

`provider_state_authority.company_id` already supports one canonical company with FL + WA rows. No schema change was required.

Separate legal entities under one brand remain separate `companies` rows. No corporate-parent table was added.

---

## 2. Ruleset (summary)

**Strong same-entity:** exact legal name + same USDOT; exact legal name + official regulator/filing tie (e.g. Suddath operating-authorities page listing IM3813 with USDOT 3527089).

**Corroborating (not enough alone):** exact phone, named email, exact address, exact DBA.

**Never enough alone:** generic enterprise email (`legal@`), brand, website/domain, franchise name, city, parent organization.

**States:** SAME_CANONICAL_ENTITY / DISTINCT_LEGAL_ENTITIES / BRANCH_OR_LOCATION_REVIEW / CORPORATE_FAMILY_RELATED / REVIEW_REQUIRED / REJECTED_MATCH.

Code: `lib/state-hhg/multi-state-entity.ts`.

---

## 3. IM3813 — ATTACH_TO_EXISTING `wa-hg-064493`

Same legal entity **Suddath Moving & Storage, LLC**:

- FDACS IM3813, phone 904-390-7100, DBA Suddath Workplace Solutions
- [Suddath legal / operating authorities](https://suddath.com/legal/) lists this LLC + **Fla. Mover Reg. No. IM3813** + **USDOT 3527089**
- [WA UTC 50169](https://www.utc.wa.gov/company/50169) lists the same LLC, **USDOT 3527089**, HG064493, mailing **815 South Main St, Jacksonville, FL**
- FMCSA USDOT 3527089 uses the same legal name and the same 904-390-7100 number as FDACS

Minimum mutation: attach FL PSA + FDACS observations to existing `wa-hg-064493`. **No company-id migration** (the WA-shaped id remains; the company is a Florida-headquartered LLC that also holds WA UTC). Canonical phone/email on that company were not overwritten.

---

## 4. IM4099 — CREATE_DISTINCT_COMPANY `fl-im-4099`

**Suddath Relocation Systems of St. Petersburg, Inc.** is a different corporation:

- Sunbiz P01000026099, EIN 59-3705638
- FMCSA **USDOT 1018395 / MC-425403** (not 3527089)
- Shared `legal@suddath.com` is a generic enterprise mailbox

No existing MoveTrustHub company had USDOT 1018395. Created internal `fl-im-4099`, `INGESTED`, `indexable=false`.

---

## 5. Cross-state sample

7 exact legal-name groups appear in both FL and WA staging (Ace Relocation, Central Moving, Clutter, Flex Storage, Smooth Moves, Stevens Moving, Suddath Moving and Storage). Only Suddath had an official USDOT tie; the rest stay **REVIEW_REQUIRED** (national-brand / name-only risk). Not bulk-resolved.

---

## 6. Deltas

| Metric | Before | After |
|--------|-------:|------:|
| Companies | 5,907 | 5,908 |
| Indexable | 4,905 | 4,905 |
| fl-im-* | 816 | 817 |
| PSA attached | 1,122 | 1,124 |
| Companies with authorities in >1 state | 0 | **1** |
| Canary | 80 | 80 |
| Held Suddath records | 2 | **0** |

---

## 7. Corporate family

Suddath is a corporate family with multiple Florida “Relocation Systems of {city}, Inc.” subsidiaries plus a shared LLC. **No production parent-graph table.** Separate canonical companies plus per-state PSA is sufficient.

---

## 8. Rollback

`docs/task-fl-006-rollback.sql` deletes only `fl-im-4099`. IM3813 attach is not auto-reverted.
