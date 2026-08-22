# FL_COUNTY_RESEARCH_V1_FREEZE

**Freeze ID:** `FL_COUNTY_RESEARCH_V1_FREEZE`  
**Frozen research head (C009):** `1256170855439413242acadf68e659e53f4aabc3`  
**C010 gate tip:** see `data/county-regulatory/fl/architecture/c010/fl-county-research-v1-freeze.json`  
**Machine artifact:** `data/county-regulatory/fl/architecture/c010/fl-county-research-v1-freeze.json`

## Scope

Immutable reference for the Florida county regulatory research package produced by FL-C001 through FL-C009, plus FL-C010 integration-gate artifacts on the stacked lineage.

## Included stack

| Task | PR | Branch |
|---|---|---|
| FL-C001 | #45 | `task-fl-c001-county-regulatory-discovery` |
| FL-C002 | #48 | `task-fl-c002-palm-beach-regulatory-acquisition` |
| FL-C003 | #51 | `task-fl-c003-palm-beach-evidence-qualification` |
| FL-C004 | #52 | `task-fl-c004-broward-regulatory-acquisition` |
| FL-C005 | #54 | `task-fl-c005-miami-dade-regulatory-acquisition` |
| FL-C006 | #56 | `task-fl-c006-miami-dade-evidence-qualification` |
| FL-C007 | #58 | `task-fl-c007-pinellas-regulatory-acquisition` |
| FL-C008 | #60 | `task-fl-c008-county-regulatory-architecture-discovery` |
| FL-C009 | #62 | `task-fl-c009-palm-beach-production-integration-spec` |
| FL-C010 | #64 | `task-fl-c010-county-stack-integration-gate` |

## Notes

- No production Git tag required unless project workflow demands tags; manifest artifact is sufficient.
- Do not silently rewrite original research history.
- Selective transplant uses this freeze as the source of truth for durable paths.
