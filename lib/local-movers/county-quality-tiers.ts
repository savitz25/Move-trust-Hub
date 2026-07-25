/**
 * Programmatic county quality tiers (Phase 3 SEO architecture).
 *
 * Maps onto existing indexability + research depth without mass-publishing new pages.
 *
 * | Tier | Index? | Criteria (summary) |
 * |------|--------|--------------------|
 * | **A** | yes (`index`) | Explicit movers ≥3, cited research, deep/premium content, not batch template |
 * | **B** | yes (`index`) | Meets index bar with enriched research but not full deep pack |
 * | **C** | no (`noindex, follow`) | Thin/regional fallback/template/uncited — keep URL for nav, do not force indexation |
 *
 * Index rules live in `county-indexability.ts`. Guide badges live in `county-tier.ts`.
 */

import type { CountyIndexDecision } from '@/lib/local-movers/county-indexability';
import { hasDeepCountyResearch } from '@/data/deep-county-research';
import { isBatchTemplateCountyResearch } from '@/lib/local-movers/county-content-quality';
import { getCountyResearch } from '@/lib/local-movers/county-research';

export type CountyQualityTier = 'A' | 'B' | 'C';

export type CountyQualityAssessment = {
  tier: CountyQualityTier;
  /** Short label for internal docs / optional UI */
  label: string;
  /** Whether robots should index the county URL */
  indexable: boolean;
  reason: string;
};

/**
 * Classify a county into Tier A / B / C for editorial and SEO operations.
 * Does not change runtime index decisions — those stay in evaluateCountyIndexability.
 */
export function assessCountyQualityTier(
  stateSlug: string,
  countySlug: string,
  indexDecision: CountyIndexDecision
): CountyQualityAssessment {
  if (indexDecision.tier === 'noindex') {
    return {
      tier: 'C',
      label: 'Limited / thin coverage',
      indexable: false,
      reason: indexDecision.reason,
    };
  }

  const deep = hasDeepCountyResearch(stateSlug, countySlug);
  const research = getCountyResearch(stateSlug, countySlug);
  const enriched =
    Boolean(research) && !isBatchTemplateCountyResearch(stateSlug, countySlug);

  if (deep) {
    return {
      tier: 'A',
      label: 'Deep researched flagship guide',
      indexable: true,
      reason: 'deep_county_research',
    };
  }

  if (enriched) {
    return {
      tier: 'B',
      label: 'Enriched indexable guide',
      indexable: true,
      reason: 'enriched_cited_research',
    };
  }

  return {
    tier: 'B',
    label: 'Indexable full guide',
    indexable: true,
    reason: indexDecision.reason,
  };
}

/** Editorial guidance for template density — keep boilerplate short on all tiers. */
export const COUNTY_PAGE_METHODOLOGY_GUIDANCE = {
  /** Max methodology panel density on county pages */
  preferCompactHowWeScore: true as const,
  /** Canonical Trust Center (do not re-paste full factor lists on every county) */
  trustCenterPath: '/about/how-we-score-movers',
  notes: [
    'Tier A: unique intelligence packs, strong internal links, full local/regional segmentation.',
    'Tier B: solid research + listings; still compact methodology summary + Trust Center link.',
    'Tier C: noindex,follow — navigation and tools only; do not force SERP competition.',
  ],
} as const;
