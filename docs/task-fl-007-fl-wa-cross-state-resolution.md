# Task FL-007 — Bounded FL/WA Cross-State Identity Resolution

**Status:** All six remaining exact-name overlap groups investigated. **No public launch. No identity writes.**

**Ruleset:** `MULTI_STATE_REGULATED_ENTITY_V1_1`  
**Manifest hash:** `7b5293d7e87d0e10`  
**Google Places / API requests: 0.**

Started from merged FL-006 `main` `5372aa5d`.

---

## Universe

Recomputed from current staging:

* Exact-name FL/WA groups: **7**
* Resolved before FL-007: **1** (Suddath Moving and Storage)
* Unresolved investigated: **6** (no new groups)

---

## V1_1 change

Name normalization strips `INC`/`LLC`, so **Central Moving & Storage, Inc.** and **Central Moving & Storage LLC** looked like one name. V1_1 treats conflicting corporate form as `DISTINCT_LEGAL_ENTITIES`. This does **not** increase SAME-entity attachments; it prevents false same-entity appearance.

---

## Group decisions (no production writes)

| Group | FL record | WA record | State | Action |
| ----- | --------- | --------- | ----- | ------ |
| Ace Relocation | ACE RELOCATION SYSTEMS, INC. IM350 `fl-im-350`, phone 407-255-2990, dnoffs@acerelocation.com | ACE Relocation Systems, Inc. CC000917, USDOT 1052359, 253-872-6292 | REVIEW_REQUIRED | KEEP_HOLD |
| Central Moving | CENTRAL MOVING & STORAGE, **INC.** IM210 `fl-im-210`, jason@cms-orlando.com | Central Moving & Storage **LLC** CC021969, USDOT 1181454 | DISTINCT_LEGAL_ENTITIES | KEEP_HOLD (no merge/create) |
| Clutter | CLUTTER, INC. IM3682, amanda.gonzalez@ironmountain.com | Clutter Inc. HG067494 USDOT 2719785, `usdot-2719785` | REVIEW_REQUIRED | KEEP_HOLD |
| Flex Storage | FLEX STORAGE INC IM3819 `fl-im-3819`, info@flex.storage | Flex Storage Inc THG071875 USDOT 4148650 | REVIEW_REQUIRED | KEEP_HOLD |
| Smooth Moves | SMOOTH MOVES **INC.** IM1860, joe@smoothmovesfl.com | Smooth Moves **LLC** HG064212 USDOT 2013092 `wa-hg-064212` | DISTINCT_LEGAL_ENTITIES | KEEP_HOLD |
| Stevens Moving | STEVENS MOVING & STORAGE, INC IM320, admin@botgmoves.com, MO phone | Stevens Moving & Storage, Inc. HG010341 USDOT 72029 company `stevens` | REVIEW_REQUIRED | KEEP_HOLD |

**Ace:** Same Inc. name and acerelocation.com domain, but FL staging has no USDOT, phones differ, and no official filing in-hand tying IM350 to USDOT 1052359. Domain is insufficient.

**Clutter:** Likely one national Inc. (USDOT 2719785) after Iron Mountain acquisition, but FL record lacks USDOT. Named Iron Mountain email is corroborating only.

**Flex:** Same Inc. spelling; `info@` is generic; FL has no USDOT on the state row.

**Stevens:** Shared Inc. spelling; different emails (`botgmoves.com` vs `movewithstevens.com`); FL phone is Missouri. Network/agency risk.

---

## Summary counts

* SAME_CANONICAL_ENTITY: **0**
* DISTINCT_LEGAL_ENTITIES: **2**
* CORPORATE_FAMILY_RELATED: **0**
* BRANCH_OR_LOCATION_REVIEW: **0**
* REVIEW_REQUIRED: **4**
* REJECTED_MATCH: **0**

Companies created: **0**. PSA attachments: **0**. Indexable delta: **0**. Canary: **80** unchanged.

---

## Stress test

V1/V1_1 correctly **held** Ace/Clutter/Flex/Stevens (name + brand/domain without dual-record USDOT). V1_1 correctly marked Central and Smooth Moves **distinct** (Inc vs LLC). False-positive generator: `normalizeLegalName` stripping entity suffixes. **Revision required: YES → V1_1 only** (form-conflict), not to increase merges.

---

## Recommended FL-008

**Florida state-layer publication-readiness gate** for the existing INGESTED FL-004 cohort (still noindex; not a public launch of FDACS on consumer pages unless separately authorized).
