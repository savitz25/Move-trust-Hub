# Task 005 — Federal HHG Wave 1 Observation + Wave 2 Selection

Starting main: `3e0c4a92c0f9f2fd3586785ebe8a9aae25aa8050`
Branch: `task-005-federal-hhg-observe`
Google Places API requests: **0**.

Wave 1 stays at 1,000 live providers. This task does **not** publish Wave 2.

## Observation

Production after Task 004:

- Companies: 1,468 (indexable 1,432)
- Wave 1 live: 1,000
- `/api/directory/companies` total 1,133 interstate, ~516 ms
- Sitemap company URLs: 1,432, ~511 ms
- Wave 1 sample profile 200 / `index, follow`
- Allied search: Allied Van Lines / USDOT 76235
- Duplicate Mayflower county-catalog row observed; alias fix in this task

See `docs/task-005-observation.json`.

## Identity repair

`npm run repair:mismatched-fmcsa-raw` clears `companies.fmcsa_raw` when the census USDOT is not the canonical company. No replacement payload is invented.

County lookup aliases bind `directory-mayflower-transit` to the canonical Mayflower profile so the directory does not inject a second public row.

## Wave 2 selection

`npm run select:federal-hhg-wave2:dry -- --limit 500`

Proposed wave ID: `FEDERAL_HHG_2026_08_WAVE_2`.
Manifest: `docs/task-005-wave2-selection.json`.
Publication is a later bounded task, only if Wave 1 remains healthy.
