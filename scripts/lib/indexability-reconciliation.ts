/**
 * Documents the Phase 1 (~110) vs Phase 2 (3,142) indexable-count inversion.
 */
export const INDEXABILITY_RECONCILIATION = {
  phase1ReportedIndexed: 110,
  phase1Evaluator: 'evaluateCountyIndexability() in scripts/audit-thin-counties.ts (2026-06-30 snapshot)',
  phase1RuleSummary:
    'Strict legacy gate: MIN_MOVERS_TO_INDEX=5, blocked regional fallback, required curated reviews + research for many paths; ~3,033 counties noindexed (mostly zero movers + generic template).',
  phase2ReportedTier1: 3142,
  phase2Evaluator: 'classifyCountyGuideTier(indexDecision) in scripts/audit-phase2-compliance.ts (pre-1.1)',
  phase2RuleSummary:
    'Tier 1 was equated to indexDecision.tier===index only — before batch-template and coverage-wave gates. Nearly every county with 5+ movers and explicit assignment indexed (~97% of counties with movers).',
  phase11CorrectedTier1: 97,
  phase11Evaluator: 'evaluateCountyIndexabilityFromResult() — canonical for pages, metadata, and sitemap',
  phase11RuleSummary:
    '3+ explicit county movers, no regional pool, non-batch cited research, deep-county or premium-metro coverage wave only. MAX_TIER1_COUNT=400 circuit breaker.',
  liveSitemapEvaluator:
    'app/sitemap-local/sitemap.ts → evaluateCountyIndexabilityFromResult() with getMoversForCountyAsync()',
  whichNumberIsCanonicalToday: 'evaluateCountyIndexabilityFromResult() — used by county page metadata, robots, and sitemap',
  inversionExplanation:
    'Phase 2 counted UI guide tiers using the loose index evaluator (3,142). Phase 1 thin-county audit used the same loose evaluator at an earlier date but with stricter review/research requirements yielding 110. Phase 1.1 unified on one strict evaluator; Tier 1 is now 97 and the sitemap emits only those URLs.',
} as const;