# MDC-PROD-003 — Miami-Dade MR Controlled Publication Canary

**Status:** `MIAMI-DADE MR CANARY PUBLISHED — OBSERVATION ACTIVE`

| Field | Value |
|---|---|
| Implementation PR | [#88](https://github.com/savitz25/Move-trust-Hub/pull/88) merge `1f6ff4b2` |
| Production deployed SHA | `1735cd53` (contains merge; also FL-011H #89) |
| Deployment ID | `dpl_C5A6ykB1x5Qa3pkPCr1igXSQk6Zh` |
| Final wave | `MDC_MR_PUBLICATION_CANARY_V1` |
| Final hash | `1fca47ceee8c6f35e58b622cce61f48076b2c064a6a3861be9344f0676065f2c` |
| Draft | `MDC_MR_PUBLICATION_CANARY_V1_DRAFT` (`b50ba162…`) |
| Companies / credentials | **9 / 9** |
| DB after apply | **70 total / 9 PUBLISHED / 61 INTERNAL_ONLY** |
| Observation | `MDC_MR_CANARY_OBSERVATION_V1` → maturity `2026-08-30T00:07:51.092Z` |

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
