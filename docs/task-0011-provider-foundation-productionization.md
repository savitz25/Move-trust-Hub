# Task 001.1 — Provider foundation productionization

Applied 2026-08-20. Google Places API requests: **0**.

## Invariant

`companies.indexable = true` is allowed only when `publication_state` is `PUBLISHABLE` or `INDEXABLE`.

| publication_state | default indexable | meaning |
| --- | --- | --- |
| INGESTED | false | new/unresolved insert |
| CLASSIFIED | false | capabilities inferred, not publication-ready |
| VERIFIED | false until publication gate | regulatory facts recorded |
| REVIEW_REQUIRED | false | identity collision or unclassified |
| INACTIVE | false | OOS or inactive authority |
| PUBLISHABLE | eligible | public profile URL |
| INDEXABLE | eligible | sitemap / robots index |

New inserts default to `INGESTED` + `indexable=false`. Existing 468 directory rows were explicitly marked `legacy_directory_row=true` and promoted to `PUBLISHABLE` **before** collision/inactive demotion.

Capability evidence:

- `INFERRED` — legacy `entity_type` / `services` / `service_scope`
- `VERIFIED` — regulatory observation establishing the capability
- `REVIEW_REQUIRED` — ambiguous evidence

USDOT registration and MC docket rows are stored as `provider_authority` observations. They do **not** backfill `hhg_interstate_carrier` or `auto_carrier` as `VERIFIED`.

Identity collisions persist in `provider_identity_review`. Affected companies become `REVIEW_REQUIRED` and `indexable=false`. Profiles remain reachable at the same slug. No merge, no delete, no invented USDOT numbers.

## Pre-migration snapshot

Production commit at snapshot time: `68be790022931f6e6d43941e00b5810e5e1adbd3` (`origin/main`).

Identity fingerprint (id+slug+USDOT+MC): `992018a3a892558fc5a0287848fc8bbb`

See `docs/task-0011-pre-migration-snapshot.json`.

Classification counts did not change. Publication states after apply: 425 PUBLISHABLE/indexable, 32 REVIEW_REQUIRED (10 USDOT-collision rows + 22 name/address-collision rows), 11 INACTIVE (`authority_active=false`; 0 `out_of_service`). Identity fingerprint unchanged. 789 capabilities backfilled as INFERRED, 0 VERIFIED. 194 USDOT/MC authority observations. 13 identity-review rows.

## USDOT 125563

Shared **placeholder** on national brand catalog/seed rows. Not a real shared operating authority.

| id | slug | name |
| --- | --- | --- |
| allied | allied-van-lines | Allied Van Lines |
| mayflower | aero-mayflower-transit-company | Aero Mayflower Transit Company |
| atlas | atlas-van-lines | Atlas Van Lines |
| wheaton | wheaton-world-wide | Wheaton World Wide Moving |
| graebel | graebel-van-lines | Graebel Van Lines |
| arpin | arpin-van-lines | Arpin Van Lines |

Source: legacy seed/catalog USDOT copied onto separate brand identities.

Consumer-facing: profiles stay at the same URLs; they are `noindex` / omitted from the sitemap until each brand has its own verified USDOT.

Remediation: research each brand’s actual FMCSA number independently. Do not merge. Do not invent replacements.

Other USDOT groups:

- `70851` — `national`, `north-american`
- `1398726` — `northern-michigan-moving`, `northern-michigan-moving-2`

## Validation baseline

`tsc --noEmit` on `origin/main` (`68be7900`) and this branch: **456 errors each**. After ignoring line-number drift, no new type failures. The only remaining string-level difference is union member order in a pre-existing `fmcsa-verification-badge.tsx` comparison.

`next lint` is non-functional on both SHAs (Next.js lint CLI migration prompt). No ESLint config regression introduced.

Provider tests: `npx tsx --test lib/provider/classification.test.ts` — 13/13 pass.

## Rollback

Application: redeploy SHA `68be790022931f6e6d43941e00b5810e5e1adbd3`. Additive columns are ignored by that build.

Database: `docs/task-0011-rollback.sql` (do not run unless required).
