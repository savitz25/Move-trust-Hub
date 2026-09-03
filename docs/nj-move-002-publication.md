# NJ-MOVE-002 — New Jersey moving intelligence publication

Public route: `/new-jersey` (`index,follow`, canonical `https://www.movetrusthub.com/new-jersey`).

Deterministic snapshot:

- `data/reports/nj-move-002-public-snapshot.json`
- `lib/state-hhg/nj/public-snapshot.ts`
- fingerprint `1e451e11970e4c0dbe602422a283d1b426708ac15cc89ddd397b10c3f20df248`
- generator `scripts/build-nj-public-snapshot.py` (reads official OSM HTML from the NJ-MOVE-001 raw cache; raw HTML/PDF are not committed)

## What is public

PM/PW/PC authority framework, RGB open-search verification, federal NJ headquarters directory links, Operation Safe Move 2024/2025 source-level respondent tables, one 2024 final-order PDF, and explicit coverage gaps.

## What is not inferred

- Missing PM/PW/PC roster ≠ zero licenses
- Search absence ≠ unlicensed
- FMCSA ACTIVE ≠ NJ licensed
- NOV ≠ final order
- Proposed penalty ≠ paid fine
- PW-only ≠ mover
- Name-only enforcement ≠ company profile

## Next ticket

NJ-MOVE-003 — PMW roster, tariff, complaint, insurance, and NJ↔FMCSA identity enrichment when official records-request data arrives.
