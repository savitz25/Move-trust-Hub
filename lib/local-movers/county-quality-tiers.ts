/**
 * Phase 3 SEO architecture — quality score → product tiers.
 *
 * | Tier | Index? | Criteria |
 * |------|--------|----------|
 * | **1 Premium** | yes | score ≥ 70 + flagship signals (deep / intelligence / premium metro) |
 * | **2 Standard** | yes | score ≥ 48 + hard integrity gates |
 * | **3 Development** | noindex,follow | below bar or hard integrity failure |
 *
 * Scoring: `county-quality-score.ts`. Index robots: `county-indexability.ts`.
 */

import type { CountyIndexDecision } from '@/lib/local-movers/county-indexability';
import {
  scoreCountyQuality,
  type CountyQualityAssessment,
  type CountySeoTier,
  COUNTY_TIER_MOVEMENT_POLICY,
  COUNTY_QUALITY_THRESHOLDS,
} from '@/lib/local-movers/county-quality-score';
import { getMoversForCounty } from '@/lib/local-movers/index';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export type { CountySeoTier, CountyQualityAssessment };
export { COUNTY_TIER_MOVEMENT_POLICY, COUNTY_QUALITY_THRESHOLDS };

/** Legacy A/B/C labels mapped from SEO tiers. */
export type CountyQualityTier = 'A' | 'B' | 'C';

export function seoTierToLegacyLetter(tier: CountySeoTier): CountyQualityTier {
  if (tier === 1) return 'A';
  if (tier === 2) return 'B';
  return 'C';
}

export function assessCountyQuality(
  stateSlug: string,
  countySlug: string,
  opts?: {
    county?: LocalCounty | null;
    movers?: LocalMover[];
    isRegionalFallback?: boolean;
  }
): CountyQualityAssessment {
  const result =
    opts?.movers && opts?.county
      ? {
          county: opts.county,
          movers: opts.movers,
          isRegionalFallback: opts.isRegionalFallback ?? false,
        }
      : getMoversForCounty(stateSlug, countySlug);

  return scoreCountyQuality({
    stateSlug,
    countySlug,
    county: result?.county ?? opts?.county ?? null,
    movers: result?.movers ?? opts?.movers ?? [],
    isRegionalFallback: result?.isRegionalFallback ?? opts?.isRegionalFallback ?? false,
  });
}

/**
 * Classify using index decision when already computed.
 */
export function assessCountyQualityTier(
  stateSlug: string,
  countySlug: string,
  indexDecision: CountyIndexDecision
): {
  tier: CountyQualityTier;
  label: string;
  indexable: boolean;
  reason: string;
  seoTier: CountySeoTier;
  score: number;
} {
  const full = assessCountyQuality(stateSlug, countySlug);
  return {
    tier: seoTierToLegacyLetter(indexDecision.seoTier ?? full.tier),
    label:
      full.tier === 1
        ? 'Premium flagship guide'
        : full.tier === 2
          ? 'Standard indexable guide'
          : 'Development — limited coverage',
    indexable: full.indexable,
    reason: indexDecision.reason || full.reason,
    seoTier: full.tier,
    score: full.score,
  };
}

/** Editorial guidance for template density. */
export const COUNTY_PAGE_METHODOLOGY_GUIDANCE = {
  preferCompactHowWeScore: true as const,
  trustCenterPath: '/about/how-we-score-movers',
  notes: [
    'Tier 1 Premium: unique intelligence packs, strong local/regional separation, full tool paths.',
    'Tier 2 Standard: solid research + listings; compact methodology + Trust Center link.',
    'Tier 3 Development: noindex,follow — navigation and tools only; concise carrier rows.',
    ...COUNTY_TIER_MOVEMENT_POLICY.notes,
  ],
} as const;
