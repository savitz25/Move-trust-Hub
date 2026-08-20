# Task 004 — Federal HHG Wave 1

Wave ID: `FEDERAL_HHG_2026_08_WAVE_1`

Google Places API requests: **0**.

## Selection

- Eligibility: `NEW_CANONICAL_CANDIDATE` only, US+DC headquarters, verified HHG role flags, legal name + city + USDOT.
- Deterministic round-robin by headquarters state, USDOT sort. Duals then brokers then carriers.
- Canary: limit 250, per-state cap 8, max 40 brokers, max 25 duals.
- Expansion: remaining quota to 1,000, per-state cap 22, max 200 brokers, max 80 duals.
- Slug collisions append `-usdot-{n}`. Existing slugs are never changed.

## Publication

- Command: `npm run publish:federal-hhg-wave1`
- Flags: `--dry-run`, `--limit N`, `--indexable`, `--rollback`
- Manifest: `public.federal_hhg_wave_publication`
- Rollback: `docs/task-004-rollback.sql` or `npm run publish:federal-hhg-wave1 -- --rollback` (unpublish, do not delete)

## Trust / ranking

Regulatory-only rows store `0` in legacy numeric columns. UI must treat those as **not enough data**:

- Reputation, rating, reviews, price, years, and complaint ratio are omitted when unobserved.
- Price-low and complaint sorts do not treat missing values as $0 or a perfect complaint record.
- Coverage copy is interstate-authority language, not national or headquarters service areas.

## Cache

Directory cache keys: `companies-directory-v15-wave1`, `unified-movers-directory-v17-wave1`.
