# Task FL-008 — Florida State-Layer Publication Readiness Gate

**Status:** Readiness evaluation + publication design + QA. **Not a public launch. No publication-state mutation.**

**Ruleset:** `FL_STATE_PUBLICATION_READINESS_V1`  
**Manifest hash:** `5b577d48f1511108`  
**Google Places / API requests: 0.**

Started from merged FL-007 `main` `a381203beb61cb5a2a12f80ed007a672a204be31`.

---

## Decision

The bounded Florida state-only cohort is **identity-ready for a future controlled `PUBLISHABLE / noindex` wave**. FL-008 does **not** apply that wave.

| Ready | Count |
| ----- | ----: |
| `READY_FOR_PUBLISHABLE_CANARY` | 37 |
| `DEFERRED` | 1 (`fl-im-4099` Suddath subsidiary) |
| `HOLD_PROFILE_THIN` | 0 |
| `REVIEW_REQUIRED` | 0 |
| `NOT_ELIGIBLE` | 0 |

`PUBLISHABLE readiness != INDEXABLE readiness.` Indexation remains a separate later decision.

---

## Cohort

Rebuilt from current data. Not every INGESTED `fl-im-*` row.

* Cohort A: 37 FL-004 `INSERT` companies (FL-005 QA PASS)
* Cohort B: `fl-im-4099` (FL-006 distinct Florida corporation; same QA gates)
* Exclusions: older 011D `fl-im-*` INGESTED rows; FL-007 held overlaps (`fl-im-350`, `fl-im-210`, `fl-im-3819`)

Total evaluated: **38**. Artifact: `data/state-hhg/fl/fl-008-publication-readiness-manifest.json`.

---

## `FL_STATE_PUBLICATION_READINESS_V1`

Fail-closed. This is a gate, not a Trust Score.

**Required:** stable `fl-im-*` ID + slug, verified FDACS IM, active authority, deterministic PSA link, `COUNTY_VERIFIED` Florida geography, no unresolved duplicate or multi-state collision, no brand-only identity, usable name, `INGESTED` + `indexable=false`.

**Usability (not legal eligibility):** at least one FDACS phone **or** email observation. Website is not required. Email is not required when phone exists.

**Freshness:** `STATUS_FRESH` if active, expiration (if any) is still in the future, and source retrieval is within 365 days. Expired “Active” claims are `NOT_ELIGIBLE`.

**States:** `READY_FOR_PUBLISHABLE_CANARY` / `HOLD_PROFILE_THIN` / `REVIEW_REQUIRED` / `NOT_ELIGIBLE` / `DEFERRED`.

---

## 011D.4 / canary comparison

`KEEP_80_NOINDEX` is unchanged (50 FL + 30 WA).

Florida canary: 50/50 phone, 49/50 email, 0 websites. FL-008 cohort: 38/38 phone, 37/38 email, website not required. **Roughly equivalent thinness.** Name + permit + address + phone is enough for a **noindex** research profile and not enough for SEO indexation. Adding the designed FDACS evidence block would make both canary and this cohort more useful; it is **not live**.

---

## Future presentation (not live)

**Florida registration** — Florida Department of Agriculture and Consumer Services. Type: Intrastate Mover. Status: Registered / Active. Copy: *Registered with Florida FDACS as an intrastate household-goods mover for moves within Florida.* Scope: *This Florida registration applies to household-goods moves within Florida. Interstate operating authority is regulated separately at the federal level.* Verification wording: *Registration verified from Florida FDACS records.* Not an endorsement.

**No federal ID in MTH data:** *No federal mover identifier is currently linked in MoveTrustHub's data.* Never: no USDOT exists / not federally licensed / cannot move interstate.

**Federal + state:** separate credential blocks. Neither implies the other. Do not drop Florida IM because USDOT exists.

**Contacts:** `Phone|Email|Business address reported in Florida FDACS registration`. Do not overwrite canonical contacts. If they differ, show both with source labels.

The current `/companies/{slug}` chrome still says “FMCSA Profile, Ratings & Pricing”. A future wave must swap that chrome for state-only copy before publication. Directory JSON-LD must omit AggregateRating, unevidenced USDOT, and `areaServed`.

---

## Direct routes (INGESTED)

Helpers: anonymous profile **not allowed**, search **excluded**, sitemap **excluded**.

Live production (`data-build-id` `a381203b`): INGESTED slugs render the generic **Company Not Found** shell with `noindex`, no LocalBusiness JSON-LD, no company payload. Compare API does not return these IDs. Share-OG is the fallback card.

HTTP status is currently **200** (same as unknown slugs), not 404. Consumer leakage is still **0**. Hardening `notFound()` to a true HTTP 404 belongs in wave preparation, not this gate.

Canary `i-95-relocation-inc` still renders as a real PUBLISHABLE profile.

---

## Wave (designed, not applied)

`FL_STATE_WAVE_1` — the 37 READY IDs.

* `PUBLISHABLE` only, `indexable=false`, `noindex, follow`, sitemap excluded
* Observation: 14 days (render health, leakage, discovery, no PII analytics)
* Rollback: revert those IDs to `INGESTED` only; do not touch canary
* Do not include `fl-im-4099` until dual-credential / Suddath-family presentation is ready

---

## Completeness

**`INITIAL FLORIDA STATE IDENTITY LAYER COMPLETE`**

Acquired: FDACS IM/MB, identity reconciliation, qualified state-only canonicalization, multi-state safety, observations, geography, publication lifecycle, readiness rules.

Not claimed: the full Florida regulatory intelligence layer. PRA still not submitted (complaints, enforcement, broker lists, officers, insurance history, historical applications). Those enrich later profiles; they do not block a correctly labeled registration profile.

---

## Freeze

No DB writes. Companies 5908, indexable 4905, canary 80, PSA unchanged. Trust Score unchanged.

County work (FL-C001–C003 / Palm Beach / Broward) was not touched.
