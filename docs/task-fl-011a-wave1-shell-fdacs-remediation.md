# Task FL-011A — Wave 1 Trust Profile FDACS shell remediation

**Status:** `OBSERVATION HEALTHY — CONTINUE`  
**Observation clock reset:** NO  
**Google Places / API requests: 0**  
**Production DB changes: 0**

## Defect

VISUAL-006 Trust Profile shell showed `Verify USDOT on FMCSA SAFER` on all 37 `FL_STATE_WAVE_1` PUBLISHABLE profiles that have no linked federal ID. FDACS evidence and the approved missing-federal sentence were already correct below the shell.

## Cause

`toMoveTrustProfile` used a federal-only empty-state (`Verify USDOT on FMCSA SAFER`) whenever FMCSA/directory verification was absent. Wave 1 state-only chrome was not mapped into the shared shell.

## Chosen fix

Gated only by `shouldRenderFloridaStateWaveChrome` (Wave 1 member **and** `publication_state = PUBLISHABLE`):

* `primaryLabel` = `Registration verified from Florida FDACS records`
* source chip `id: fdacs`, label `Florida FDACS`, `status: verified`
* no FMCSA chip when no federal ID is linked
* KEEP_80 / INDEXABLE adapters unchanged

## `isVerified` semantic audit

`TrustProfileShell.verification.isVerified` only toggles emerald chip styling and an `aria-hidden` BadgeCheck. Visible and screen-reader text is `primaryLabel`, not “Verified”, “TrustHub Verified”, or “Approved”.

Wave 1 label is the FDACS registration sentence. Same visual language as “FMCSA authority checked” on federal profiles. Generic endorsement badge: **NO**. Endorsement risk: **NO**.

`CompanyVerificationBadges` uses company/FMCSA/BBB status, not this shell flag.

## PR disposition

| PR | Result |
| --- | --- |
| #65 observation audit | Merged `f2c3df6d` (docs/QA only) |
| #66 remediation | Rebased onto that main; merged `cf42ae00` |

Diff on #66: `to-move-trust-profile.ts`, `to-move-trust-profile.test.ts`, `package.json` test registration only. `package-lock.json` unchanged.

## Production

* Merge SHA / deployed SHA: `cf42ae005ab2e616f10342b19a40692132410601` **match YES**
* Deployment: `dpl_8M3BR2aQAWc42bjf5CBQANGiPxHW` at `2026-08-22T16:17:36.976Z`

## Gates

* Preview 10 Wave: 200, noindex, FDACS shell, 0 Verify USDOT, 0 FMCSA chip, 0 endorsement
* Production 37/37: HTTP 200, noindex, FDACS shell + chip, Verify USDOT 0, FMCSA chip 0, IM exact, prohibited 0
* KEEP_80 80/80 HTTP 200 + noindex, unexpected Wave chrome 0
* INDEXABLE Allied/United/Mayflower unchanged (FMCSA chip, index/follow)
* Sitemap 0, indexable=true 0
* Directory CONSISTENT; compare hydrates; county Wave 1 listed 0

## Observation

Launch `2026-08-22T14:45:00Z` remains the clock start. Final review `2026-09-05T14:45:00Z`. Recovery snapshot: `docs/observation/fl-state-wave1/snapshot-2026-08-22-fl011a-recovery.json`. Degraded `snapshot-2026-08-22.json` not overwritten.
