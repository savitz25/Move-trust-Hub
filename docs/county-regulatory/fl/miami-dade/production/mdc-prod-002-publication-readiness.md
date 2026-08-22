# MDC-PROD-002 — Miami-Dade MR Publication Readiness Gate

**Status:** `READY_FOR_MDC_MR_PUBLICATION_CANARY`

| Field | Value |
|---|---|
| Wave A | `MDC_MR_WAVE_A_INTERNAL_V1` |
| Manifest hash | `56cfc4c3cec43781e4188f50704ebd7740dd3d04b7af6f818629cbaaa5a1a8eb` |
| Production DB writes | **0** |
| Identity | **70/70 EXACT** |
| Publication-ready | **9 companies / 9 credentials** |
| Canary draft | `MDC_MR_PUBLICATION_CANARY_V1_DRAFT` · 9/9 · hash `b50ba162…` · `apply=false` |

## Hard freezes

- Palm Beach: **46 / 11 / 35** unchanged
- No MDC public publish in this task
- No PBC-PROD-005
- Builder 1 state untouched

## Consumer semantics (proposed)

| Field | Value |
|---|---|
| Credential type | Miami-Dade Moving Business Registration |
| Identifier | `MR-#####` |
| Raw status | Issued |
| Consumer label | Issued county moving-business registration |
| Regulator | RER — Consumer and Neighborhood Protection Division |
| Do not say | Licensed / Approved / Certified by MoveTrustHub |

LBT remains **not** mover authority.

## Architecture reuse

Reuse Palm Beach server-only PUBLISHED gate pattern via a parallel `lib/county-regulatory/mdc/` module in **MDC-PROD-003** (not implemented here).

## Commands

```bash
node scripts/run-mdc-prod-002-publication-readiness.mjs
node scripts/validate-mdc-prod-002.mjs
```

## Next

**MDC-PROD-003 — Miami-Dade MR credential publication canary** (do not start automatically)
