# FL-AUDIT-STATE-001 — Florida state regulatory enrichment forensic impact

**Status:** FLORIDA STATE ENRICHMENT AUDIT COMPLETE — IMPACT FROZEN  
**Production DB writes:** 0  
**Google API:** 0  
**FL-012:** not started; prohibited until 2026-09-05T14:45:00.000Z

Builder 1 PARK after this audit.

## What the program actually added

- **86 new canonical companies** (IM 69 from FL-004+FL-011D; MB 17 from FL-011I). Provenance: frozen manifests, live rows present 86/86.
- **94 distinct pre-existing companies enriched** (event count 172; FL-002 verified 88, FL-004 LINK 1, FL-006 1, FL-011D LINK 81, FL-011I LINK 1).
- **180 distinct companies touched.**
- Active IM **1098**. Fail-closed represented **930** / unresolved hold **168** / **84.7%** (FL-011E/F). Operational PSA-linked unique active IMs **941** (11 hold IMs still have a `company_id` and are not counted as safe coverage).
- Active MB **26**, represented **19**, unresolved **7**, coverage **73.1%**. Progression 1/26 (3.8%) → 19/26.
- Source observations: FL-002 wrote **3875**; later ATTACH 110+104+53. Canonical promotions **0**.
- Public IM evidence **37** (Wave 1). Public MB evidence **0**.
- Wrong-company **0**. Name-only accepted **0**. Indexable attributable to state **0**. Trust Score **NO**. Ranking **0**.
- `service_scope=interstate` on new MB companies is **SCHEMA_STORAGE_COMPATIBILITY_ONLY** (17 rows); federal IDs among MB-created: 0.

County enrichment is excluded. County writes this audit: **0**.
