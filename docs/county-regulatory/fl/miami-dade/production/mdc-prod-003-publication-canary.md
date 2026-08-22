# MDC-PROD-003 — Miami-Dade MR Controlled Publication Canary

**Status:** Implementation PR (code before data) — DB publish only after production serves merge SHA.

| Field | Value |
|---|---|
| Final wave | `MDC_MR_PUBLICATION_CANARY_V1` |
| Draft | `MDC_MR_PUBLICATION_CANARY_V1_DRAFT` (`b50ba162…`) |
| Companies / credentials | **9 / 9** |
| Wave A freeze | 70 INTERNAL_ONLY (`56cfc4c3…`) |

## Hard rules

- **No** `?showInternal=true`
- **No** production flag that renders `INTERNAL_ONLY`
- **PUBLISHED gate is real**
- Direct anon/authenticated table SELECT remains **DENIED**
- Server-only service-role read → sanitized DTO → **profile only**
- Not in directory / compare / search / JSON-LD / OG / sitemap / Trust Score
- **HOLD_FROM_STRUCTURED_DATA_V1**
- LBT remains separate secondary evidence (0 mutations)
- Palm Beach untouched (46 / 11 / 35)
- Builder 1 / state track untouched

## Architecture

| Layer | Approach |
|---|---|
| Shared gate | `lib/county-regulatory/shared/public-read-gate.ts` |
| Shared server reader | `lib/county-regulatory/shared/fetch-published-county-credentials.ts` |
| Miami adapter | `lib/county-regulatory/mdc/public-read*.ts` |
| UI | `components/company/miami-dade-registration-block.tsx` |
| PBC | Refactored to shared reader/gate; behavior unchanged |

## Sequence

1. Merge/deploy code (read path + UI) — **no DB publish in PR**
2. Wait until production serves exact merge SHA
3. Zero-exposure gate while still INTERNAL_ONLY: 9/9 HTTP 200, **0/9** MR blocks
4. Dry-run ×2 → apply exactly 9 `INTERNAL_ONLY → PUBLISHED`
5. Profile sweep 9 visible / 61 hidden; observation 168h

## Commands

```bash
node scripts/mdc-prod-003-canary.mjs --baseline
node scripts/mdc-prod-003-canary.mjs --revalidate
node scripts/mdc-prod-003-canary.mjs --promote-manifest
npx tsx --require ./scripts/stub-server-only.cjs --test lib/county-regulatory/mdc/public-read.test.ts
node scripts/validate-mdc-prod-003.mjs

# after deploy, before publish:
node scripts/publish-mdc-prod-003-canary.mjs --preconditions
node scripts/smoke-mdc-prod-003-zero-exposure.mjs --expect-hidden
node scripts/publish-mdc-prod-003-canary.mjs --dry-run

# publish (manifest-bound only):
node scripts/publish-mdc-prod-003-canary.mjs --apply --manifest-hash <final-hash>

# rollback:
node scripts/publish-mdc-prod-003-canary.mjs --rollback --manifest-hash <final-hash>
```

## Public copy (exact)

- Heading: `Miami-Dade Moving Business Registration`
- Status: `Issued county moving-business registration`
- Regulator: Miami-Dade Department of Regulatory and Economic Resources (RER) — Consumer and Neighborhood Protection Division
- Verification: `Credential information verified against Miami-Dade County records.`
- Disclaimer: `Regulatory record verification is not a MoveTrustHub endorsement.`

## CDN

Company profile: `revalidate = 300`; Vercel `/companies/:path*` `s-maxage=300` (do not regress to 86400).

## Safety counters

```text
Trust Score: 0
sitemap / JSON-LD / OG: 0
ranking / search / directory / compare: 0
contacts / complaints / enforcement / LBT: 0
company publication / indexable: 0
Google Places: 0
Consumer PII: 0
PBC mutation: 0
state mutation: 0
```
