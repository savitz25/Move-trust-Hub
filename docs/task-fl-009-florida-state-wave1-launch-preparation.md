# Task FL-009 — Florida State Wave 1 Presentation Hardening & Dry-Run Launch Gate

**Status:** `READY_FOR_FL_010_APPLY`  
**Apply executed: NO.** All 37 Wave 1 companies remain `INGESTED` / `indexable=false`.

**Manifest hash:** `a9165ec652ad7a27`  
**Google Places / API requests: 0.**

Started from merged FL-008 `main` `2959930c0a149eb961fa3d2b6306f23c7cba820d`.

---

## Wave 1

Revalidated against `FL_STATE_PUBLICATION_READINESS_V1`. **37 READY.** `fl-im-4099` remains **DEFERRED** (Suddath dual-credential). No replacements added.

Frozen: `data/state-hhg/fl/fl-009-state-wave-1-manifest.json`.

Intended FL-010 transition: `INGESTED → PUBLISHABLE`, `indexable` stays `false`.

---

## HTTP 404 contract

**Cause:** `generateMetadata` returned a 200 “Company Not Found” document instead of calling `notFound()`. Combined with ISR (`revalidate = 300`), Vercel served a 200 not-found shell.

**Fix:** `generateMetadata` and the page call `notFound()` when `anonymousCompanyHttpStatus` is 404 (INGESTED, CLASSIFIED, REVIEW_REQUIRED, INACTIVE, or missing company). Unknown slugs 404 the same way.

Helpers: `lib/provider/anonymous-company-route.ts`.

OG/share still returns the **generic** fallback image (no company/FDACS payload). Compare/search already exclude INGESTED.

---

## State-only chrome (wave-gated)

`shouldRenderFloridaStateWaveChrome` is true only when:

* company ID is in `FL_STATE_WAVE_1`, **and**
* `publication_state === 'PUBLISHABLE'`

KEEP_80 canary IDs are not in the Wave 1 manifest, so their presentation **does not change**. While Wave 1 remains INGESTED, the new chrome is unreachable (404). After FL-010 it appears only on those 37 profiles.

Headline: **Florida Intrastate Mover**. FDACS evidence block is a registration fact, not an endorsement. No USDOT / “cannot move interstate” claims.

---

## Membership (FL-010)

Reuse `local_hhg_canary_publication` with **`wave_id = FL_STATE_WAVE_1`**, not `LOCAL_HHG_FL_WA_2026_08_CANARY_1`. County discovery queries stay hardcoded to KEEP_80, so Wave 1 will **not** enter canary county lists. Directory/search/compare follow existing PUBLISHABLE rules. Sitemap stays excluded (`indexable=false`).

No schema migration.

---

## Dry-run

`npm run publish:fl-state-wave-1:dry`

Expected FL-010 delta: companies 0, indexable 0, 37 publication_state changes, PSA 0, contacts 0, Trust Score 0, KEEP_80 untouched.

Apply path exists but **refuses in FL-009** and requires `--hash=<manifest hash>`.

Rollback: `docs/task-fl-009-rollback.sql` (Wave 1 IDs only).

---

## Abort conditions (FL-010)

manifest hash mismatch; readiness count change; stale FDACS; INGESTED not HTTP 404; sitemap leak; indexable delta; bad federal copy; KEEP_80 regression; duplication; public API leak; unexpected county publication; failing build; failing browser QA.

---

## Observation

14 days after apply: profile health, HTTP status, leakage, directory, county/state discovery, sitemap, robots, JSON-LD, errors, performance. No PII.

---

## Completeness

FL-010 is the apply/cutover task. Do not start it from this branch.
