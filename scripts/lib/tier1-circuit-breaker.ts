import { evaluateCountyIndexability } from '../../lib/local-movers/county-indexability';
import { getAllCountyParams } from '../../lib/local-movers/geography/index';

/** Hard stop — do not deploy if Tier 1 exceeds this count. */
export const MAX_TIER1_COUNT = 400;

export type Tier1CircuitBreakerResult = {
  tier1: number;
  tier2: number;
  maxAllowed: number;
  pass: boolean;
  haltReason?: string;
  producingRule: string;
  tier1Reasons: Record<string, number>;
  tier2Reasons: Record<string, number>;
};

export function evaluateTier1CircuitBreaker(): Tier1CircuitBreakerResult {
  const tier1Reasons: Record<string, number> = {};
  const tier2Reasons: Record<string, number> = {};
  let tier1 = 0;
  let tier2 = 0;

  for (const { stateSlug, countySlug } of getAllCountyParams()) {
    const decision = evaluateCountyIndexability(stateSlug, countySlug);
    if (decision.tier === 'index') {
      tier1 += 1;
      tier1Reasons[decision.reason] = (tier1Reasons[decision.reason] ?? 0) + 1;
    } else {
      tier2 += 1;
      tier2Reasons[decision.reason] = (tier2Reasons[decision.reason] ?? 0) + 1;
    }
  }

  const pass = tier1 <= MAX_TIER1_COUNT;

  return {
    tier1,
    tier2,
    maxAllowed: MAX_TIER1_COUNT,
    pass,
    haltReason: pass
      ? undefined
      : `Tier 1 count ${tier1} exceeds maximum ${MAX_TIER1_COUNT}. Halting deploy.`,
    producingRule:
      'evaluateCountyIndexabilityFromResult: 3+ explicit county movers, no regional fallback, non-batch cited research, deep-county or premium-metro wave only',
    tier1Reasons,
    tier2Reasons,
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