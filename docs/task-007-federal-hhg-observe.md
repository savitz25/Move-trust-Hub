# Task 007 — Wave 2 observation, scale hardening, remaining population strategy

Starting main: `89354c56bca4bba8e512b9e8a44786385eb0e78b`
Branch: `task-007-wave2-observation-scale-segmentation`
Google Places: **0**. Wave 3 public profiles: **0**.

## Hardening

- `/companies` no longer loads the full unified directory a second time for JSON-LD.
  Schema uses the first page plus `total`.
- Sitemap company URLs come from a paginated `slug`/`last_updated`/`indexable` projection,
  not the full company payload. This avoids seed fallback when fat list fetches time out.

## Wave 3

`FEDERAL_HHG_2026_08_WAVE_3_CANDIDATE` in `docs/task-007-wave3-selection.json`.
`publish=false`.
