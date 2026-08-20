# MoveTrustHub 2.0 — Task 001

National provider foundation, classification architecture, and live template remediation.

**Google Places API requests: 0.** No mass provider import.

## Architecture discovered

Canonical public identity is `public.companies` (UUID `id`, slug, legal/DBA name, USDOT/MC, `entity_type`, `service_scope` interstate|intrastate, `coverage_counties`, `services` tags, `fmcsa_raw`).

FMCSA ingest writes census `entity_type` as a single Carrier / Broker / Carrier/Broker string. Local movers use `service_scope = 'intrastate'`. Auto-transport profiles are mostly a seed catalog overlaid onto the same `companies` row shape and `/auto-transport/[slug]` template.

Identity already has USDOT-first dedup in `lib/data-quality/entity-dedup.ts`. Publication was effectively `is_verified` + directory display policy. Trust copy used one interstate HHG sentence for every FMCSA badge.

## Additive model

Legacy columns remain. New tables (see `supabase/migrations/20260819010000_provider_capability_architecture.sql`):

- `provider_authority` — federal/state authorities
- `provider_capability` — independent capabilities (never store Carrier/Broker as the only truth)
- `provider_location`
- `provider_service_area`
- `provider_identity_review`

`companies.publication_state` + `companies.indexable` added. Inactive/OOS rows fail closed for indexation.

Classification/eligibility/identity live in `lib/provider/` and are used by type badges, FMCSA badges, and profile copy.

## Golden cohort

| Role | Example |
| --- | --- |
| Auto broker | `montway-auto-transport` |
| HHG broker | classified from `entity_type = BROKER` without Auto Transport |
| Local mover | `service_scope = intrastate` |
| Interstate carrier | `entity_type = CARRIER` |
| Carrier + Broker | `entity_type = CARRIER/BROKER` |
| HHG + auto | Full Service + Auto Transport on one company id |

## Rollback

Drop the five new tables and the three new `companies` columns. No company rows are deleted by the migration.

## Next recommended task

Task 002: apply the migration in production if not yet applied, resolve the 3 duplicate-USDOT groups as `REVIEW_REQUIRED` without silent merges, then a **bounded** HHG broker ingest — still no nationwide dump.
