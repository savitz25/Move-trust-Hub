# Task 004 — Federal HHG Wave 1

Wave ID: `FEDERAL_HHG_2026_08_WAVE_1`

Google Places API requests: **0**.

Canary: 250 PUBLISHABLE, initially `indexable=false`.
Selection: round-robin by headquarters state, duals and brokers first, USDOT sort. 51 states including DC. Per-state cap 8.

Rollback: `docs/task-004-rollback.sql` or `npm run publish:federal-hhg-wave1 -- --rollback`.
