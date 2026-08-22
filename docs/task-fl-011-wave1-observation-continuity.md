# Task FL-011 — Wave 1 observation continuity

**Status:** `OBSERVATION DEGRADED — REMEDIATION REQUIRED`  
**Wave rollback:** not required  
**Keep/index decision:** not due (observation day 0 of 14)  
**Google Places / API requests: 0**

## PR #61

Merged `2026-08-22T15:27:43Z` as `ceeaa987982b2871662fbb41fee858b52f1a0651`.  
Rebased onto `3c7d205b` (VISUAL-006) first. Files remained launch audit / docs / QA only.

## Current production

| Field | Value |
| --- | --- |
| Canonical host | `https://www.movetrusthub.com` |
| Current main | `ceeaa987982b2871662fbb41fee858b52f1a0651` |
| Deployed SHA (`data-build-id`) | `ceeaa987982b2871662fbb41fee858b52f1a0651` |
| SHA match (main ↔ prod) | **YES** |
| SHA match (launch `ab93c841`) | **NO** (later main; expected) |
| Deployment id | `dpl_42oGUigdefhcWBtHkUabvLMiw1VL` |
| Deployment timestamp | `2026-08-22T15:27:45.912Z` |

## Contracts on current production

| Contract | Result |
| --- | --- |
| Wave membership | 37 / unexpected 0 / hash `a9165ec652ad7a27` |
| PUBLISHABLE / INGESTED / indexable=true | 37 / 0 / 0 |
| Freeze (companies / indexable / INGESTED / PUBLISHABLE) | 5908 / 4905 / 850 / 5022 (unchanged vs FL-010A after-apply) |
| KEEP_80 | 50 FL / 30 WA / 80 |
| HTTP 200 Wave | **37/37** |
| noindex | **37/37** |
| sitemap inclusions | **0** (root, local index, Florida) |
| FDACS IM exact | **37/37** |
| Florida Intrastate Mover | **37/37** |
| Missing-federal copy | **37/37** |
| Prohibited endorsement claims | **0** |
| KEEP_80 HTTP / noindex / Wave chrome leak | **80/80** / **80/80** / **0** |
| INDEXABLE Allied / United / Mayflower | 200, `index, follow`, FMCSA titles |
| Directory HTML+API | **CONSISTENT** (`search=gentletouch` etc.) |
| Compare | hydrates; no invented USDOT/MC; no county-regulatory |
| County discovery Miami-Dade / Broward / Hillsborough / Pinellas | Wave 1 **not listed** |
| Trust Score / companies freeze | unchanged |
| Shell empty-state `Verify USDOT on FMCSA SAFER` | **37/37 — regression** |

## Shell regression (VISUAL-006)

`TrustProfileShell` / `toMoveTrustProfile` emits `Verify USDOT on FMCSA SAFER` when no FMCSA record exists. That restores federal-centric empty-state copy on Wave 1 even though the FDACS block still has the approved sentence.

This PR remediates the adapter for `shouldRenderFloridaStateWaveChrome` companies:

* primary label → `Registration verified from Florida FDACS records`
* FDACS source chip
* no FMCSA chip / no `Verify USDOT` prompt when no federal ID

KEEP_80 / INDEXABLE adapters unchanged.

Until this branch is production, live Wave profiles still show the empty-state chip. **Do not roll back the Wave.** **Do not set `indexable=true`.**

## Observation window

* Start: `2026-08-22T14:45:00Z`
* Duration: 14 days
* End: `2026-09-05T14:45:00Z`
* Elapsed at this snapshot: ~0.8 hours

FL-011 is **not** the keep/index decision.

## Daily snapshot

```text
npm run qa:fl-wave1-observation
```

Writes `docs/observation/fl-state-wave1/snapshot-YYYY-MM-DD.json` and updates `observation-summary.json`. Does not overwrite `baseline-launch.json`.

## Browser QA

Chrome DevTools MCP lock resolved. Pixel / iPhone / desktop: horizontal overflow **0**, long name wraps, IM readable, header does not cover profile, mobile nav dialog works, no federal empty-state **licensing card**. See `docs/observation/fl-state-wave1/browser-qa.json`.

Lab (desktop, warm): LCP 287 ms, CLS 0.06. HTTP TTFB CURRENT_SHELL_BASELINE: p50 820 ms / p95 1435 ms (n=37). Do not mix with LAUNCH_BASELINE on `ab93c841`.
