# Stage B.1 — Research Session Continuity (Move)

## What Move does

On destination and state resource surfaces, `ContinueTrustJourney`:

1. Writes a non-PII research session when the user lands (`src=move`, `journey=relocate`, state, county when known).
2. Updates session when the user toggles buy / rent / not sure.
3. Still emits Stage A′ URL params on Lender and Insurance handoff links (the cross-origin bridge).

## Storage

- Key: `ath:research-session:v1`
- Origin-local (`localStorage` on Move only)
- No accounts, no PII, fail soft if storage unavailable

## Cross-hub

Lender and Insurance each maintain their **own** copy of the schema. Context travels between hubs via URL params; each hub may mirror richer params into its local session on arrival.
