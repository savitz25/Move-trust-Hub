import { evaluateCountyIndexability } from '../../lib/local-movers/county-indexability';
import { getAllCountyParams } from '../../lib/local-movers/geography/index';

/** The Phase 1.1 circuit breaker applies only to Premium Tier 1 counties. */
export const MAX_TIER1_COUNT = 400;

export type CountyTierEvidence = {
  tier: 'index' | 'noindex';
  seoTier?: number;
};

export type CountyTierCounts = {
  premium: number;
  standard: number;
  unclassified: number;
  maxAllowed: number;
  pass: boolean;
};

/** Count indexed tiers; missing or unsupported tier evidence fails closed. */
export function countIndexableCountyTiers(
  decisions: CountyTierEvidence[],
  maxAllowed = MAX_TIER1_COUNT
): CountyTierCounts {
  let premium = 0;
  let standard = 0;
  let unclassified = 0;

  for (const decision of decisions) {
    if (decision.tier !== 'index') continue;
    if (decision.seoTier === 1) premium += 1;
    else if (decision.seoTier === 2) standard += 1;
    else unclassified += 1;
  }

  return {
    premium,
    standard,
    unclassified,
    maxAllowed,
    pass: premium <= maxAllowed && unclassified === 0,
  };
}

export type Tier1CircuitBreakerResult = CountyTierCounts & {
  /** Legacy report fields retain their pre-change meanings. */
  tier1: number;
  tier2: number;
  haltReason?: string;
  producingRule: string;
  tier1Reasons: Record<string, number>;
  tier2Reasons: Record<string, number>;
  premiumReasons: Record<string, number>;
  standardReasons: Record<string, number>;
};

export function evaluateTier1CircuitBreaker(): Tier1CircuitBreakerResult {
  const tier1Reasons: Record<string, number> = {};
  const tier2Reasons: Record<string, number> = {};
  const premiumReasons: Record<string, number> = {};
  const standardReasons: Record<string, number> = {};
  const decisions: CountyTierEvidence[] = [];

  for (const { stateSlug, countySlug } of getAllCountyParams()) {
    const decision = evaluateCountyIndexability(stateSlug, countySlug);
    decisions.push(decision);

    if (decision.tier === 'index') {
      tier1Reasons[decision.reason] = (tier1Reasons[decision.reason] ?? 0) + 1;
      if (decision.seoTier === 1) {
        premiumReasons[decision.reason] = (premiumReasons[decision.reason] ?? 0) + 1;
      } else if (decision.seoTier === 2) {
        standardReasons[decision.reason] = (standardReasons[decision.reason] ?? 0) + 1;
      }
    } else {
      tier2Reasons[decision.reason] = (tier2Reasons[decision.reason] ?? 0) + 1;
    }
  }

  const counts = countIndexableCountyTiers(decisions);
  return {
    ...counts,
    // The old report names still mean all indexable (tier1) and all noindex (tier2).
    tier1: counts.premium + counts.standard + counts.unclassified,
    tier2: decisions.filter((decision) => decision.tier === 'noindex').length,
    haltReason: counts.pass
      ? undefined
      : counts.unclassified > 0
        ? `${counts.unclassified} indexable counties have missing or ambiguous SEO tier evidence. Halting deploy.`
        : `Premium Tier 1 count ${counts.premium} exceeds maximum ${counts.maxAllowed}. Halting deploy.`,
    producingRule:
      'evaluateCountyIndexabilityFromResult: indexable seoTier 1 Premium and seoTier 2 Standard; Development is noindex',
    tier1Reasons,
    tier2Reasons,
    premiumReasons,
    standardReasons,
  };
}

export function assertTier1CircuitBreakerOrExit(): Tier1CircuitBreakerResult {
  const result = evaluateTier1CircuitBreaker();
  if (!result.pass) {
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }
  return result;
}

if (require.main === module) {
  const result = assertTier1CircuitBreakerOrExit();
  console.log(JSON.stringify(result, null, 2));
}
