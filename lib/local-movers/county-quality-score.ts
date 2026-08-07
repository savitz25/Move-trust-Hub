/**
 * Phase 3 — reproducible county page quality score (0–100) and SEO tiers.
 *
 * Tier 1 Premium  — fully indexable flagship markets
 * Tier 2 Standard — indexable useful guides
 * Tier 3 Development — noindex,follow until promoted
 *
 * Population alone does not decide tier; usefulness + uniqueness do.
 */

import { hasDeepCountyResearch } from '@/data/deep-county-research';
import { getCountyIntelligencePack } from '@/lib/local-movers/county-intelligence/registry';
import { isBatchTemplateCountyResearch } from '@/lib/local-movers/county-content-quality';
import { hasCitedCountyResearchContent } from '@/lib/local-movers/county-research-citations';
import { getCountyResearch, hasCountyResearch } from '@/lib/local-movers/county-research';
import { getCountyPopularRoutes } from '@/lib/local-movers/county-popular-routes';
import { isPremiumMetroCounty } from '@/lib/local-movers/premium-metro-counties';
import { countExplicitCountyMovers } from '@/lib/local-movers/index';
import { segmentCountyMovers } from '@/lib/local-movers/segment-county-movers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';
import { assessLicense } from '@/lib/trust/license-verification';

/** Public SEO product tiers (Phase 3 brief). */
export type CountySeoTier = 1 | 2 | 3;

export type CountyQualityComponents = {
  /** 0–25: listing usefulness after Phase 1 locality */
  inventory: number;
  /** 0–15: true-local HQ share */
  localInventory: number;
  /** 0–20: deep pack / intelligence / cited research depth */
  uniqueInfo: number;
  /** 0–10: regulatory / state HHG context present */
  regulatory: number;
  /** 0–15: not batch template; cited sources */
  uniqueness: number;
  /** 0–10: costs/tips/routes/tools utility */
  utility: number;
  /** 0–5: premium demand / metro support */
  demand: number;
};

export type CountyQualityAssessment = {
  score: number;
  components: CountyQualityComponents;
  tier: CountySeoTier;
  tierLabel: 'Premium' | 'Standard' | 'Development';
  /** robots index when true */
  indexable: boolean;
  reason: string;
  /** Eligible for Tier 2→1 when content improved */
  promoteEligible: boolean;
  /** Risk of demotion if integrity slips */
  demoteRisk: boolean;
  metadata: {
    explicitMovers: number;
    listedMovers: number;
    localMovers: number;
    regionalMovers: number;
    usdotShare: number;
    hasDeep: boolean;
    hasIntelligence: boolean;
    isPremiumMetro: boolean;
    isBatchTemplate: boolean;
    hasCitedResearch: boolean;
  };
};

/** Score floors (tunable, documented). */
export const COUNTY_QUALITY_THRESHOLDS = {
  /** Premium — high bar for aggressive SEO */
  tier1MinScore: 70,
  /** Standard — meaningful unique value */
  tier2MinScore: 48,
  /** Explicit assignment floor for any indexable tier */
  minExplicitMovers: 3,
  /** Prefer some true-local signal for Premium (not required if deep flagship) */
  tier1PreferLocalMin: 1,
} as const;

export const COUNTY_QUALITY_WEIGHTS = {
  inventory: 25,
  localInventory: 15,
  uniqueInfo: 20,
  regulatory: 10,
  uniqueness: 15,
  utility: 10,
  demand: 5,
} as const;

function clamp(n: number, max: number): number {
  return Math.max(0, Math.min(max, Math.round(n)));
}

function usdotShare(movers: LocalMover[]): number {
  if (!movers.length) return 0;
  const withDot = movers.filter(
    (m) => assessLicense(m.usdotNumber, m.mcNumber).isDisplayable
  ).length;
  return withDot / movers.length;
}

/**
 * Score a county page from catalog signals + mover list.
 * Synchronous — safe for sitemap generation and audits.
 */
export function scoreCountyQuality(params: {
  stateSlug: string;
  countySlug: string;
  county: LocalCounty | null;
  movers: LocalMover[];
  isRegionalFallback: boolean;
}): CountyQualityAssessment {
  const { stateSlug, countySlug, county, movers, isRegionalFallback } = params;
  const explicit = countExplicitCountyMovers(stateSlug, countySlug);
  const research = getCountyResearch(stateSlug, countySlug);
  const hasResearch = hasCountyResearch(stateSlug, countySlug);
  const cited = hasCitedCountyResearchContent(research);
  const batch = isBatchTemplateCountyResearch(stateSlug, countySlug);
  const deep = hasDeepCountyResearch(stateSlug, countySlug);
  const intelligence = getCountyIntelligencePack(stateSlug, countySlug);
  const premium = isPremiumMetroCounty(stateSlug, countySlug);
  const routes = getCountyPopularRoutes(stateSlug, countySlug);
  const segments =
    county && movers.length
      ? segmentCountyMovers(movers, county)
      : { localInState: [] as LocalMover[], national: movers, ordered: movers };
  const localN = segments.localInState.length;
  const regionalN = segments.national.length;
  const listed = movers.length;
  const share = usdotShare(movers);

  // --- Component scores ---
  let inventory = 0;
  if (explicit >= 12) inventory = 25;
  else if (explicit >= 8) inventory = 20;
  else if (explicit >= 5) inventory = 15;
  else if (explicit >= 3) inventory = 10;
  else if (explicit >= 1) inventory = 5;
  if (isRegionalFallback) inventory = Math.min(inventory, 4);
  if (share >= 0.6) inventory = clamp(inventory + 3, 25);
  else if (share >= 0.35) inventory = clamp(inventory + 1, 25);

  let localInventory = 0;
  if (localN >= 5) localInventory = 15;
  else if (localN >= 3) localInventory = 12;
  else if (localN >= 1) localInventory = 8;
  else if (listed > 0) localInventory = 2; // listings exist but no true local HQ

  let uniqueInfo = 0;
  if (intelligence) uniqueInfo += 12;
  if (deep) uniqueInfo += 10;
  else if (hasResearch && cited && !batch) uniqueInfo += 6;
  else if (hasResearch) uniqueInfo += 2;
  uniqueInfo = clamp(uniqueInfo, 20);

  let regulatory = 0;
  // State-level regulatory modules exist for many states on county pages via components;
  // score research market notes + intelligence as proxy for local regulatory depth.
  if (research?.marketNotes && research.marketNotes.length > 80) regulatory += 4;
  if (intelligence) regulatory += 4;
  if (hasResearch && cited) regulatory += 2;
  regulatory = clamp(regulatory, 10);

  let uniqueness = 0;
  if (batch) uniqueness = 2;
  else if (!hasResearch) uniqueness = 0;
  else if (cited && deep) uniqueness = 15;
  else if (cited) uniqueness = 12;
  else uniqueness = 5;

  let utility = 0;
  if ((research?.tips?.length ?? 0) >= 3) utility += 3;
  if (research && 'costNotes' in (research as object)) utility += 2;
  if (routes && routes.length > 0) utility += 3;
  if (listed > 0) utility += 2;
  utility = clamp(utility, 10);

  let demand = 0;
  if (premium) demand += 4;
  if (intelligence) demand += 1;
  demand = clamp(demand, 5);

  const components: CountyQualityComponents = {
    inventory,
    localInventory,
    uniqueInfo,
    regulatory,
    uniqueness,
    utility,
    demand,
  };

  const score = clamp(
    inventory +
      localInventory +
      uniqueInfo +
      regulatory +
      uniqueness +
      utility +
      demand,
    100
  );

  // --- Hard integrity gates (cannot index past these) ---
  let hardBlock: string | null = null;
  if (!county) hardBlock = 'missing_county';
  else if (explicit === 0) hardBlock = 'no_explicit_assignment';
  else if (isRegionalFallback) hardBlock = 'regional_metro_fallback';
  else if (explicit < COUNTY_QUALITY_THRESHOLDS.minExplicitMovers) {
    hardBlock = 'insufficient_explicit_movers';
  } else if (!hasResearch) hardBlock = 'missing_county_research';
  else if (batch) hardBlock = 'batch_template_research';
  else if (!cited) hardBlock = 'uncited_research';

  // --- Tier assignment ---
  let tier: CountySeoTier = 3;
  let tierLabel: CountyQualityAssessment['tierLabel'] = 'Development';
  let reason = hardBlock ?? 'development_score_below_standard';
  let indexable = false;

  if (!hardBlock) {
    const flagship = deep || Boolean(intelligence) || premium;
    if (
      score >= COUNTY_QUALITY_THRESHOLDS.tier1MinScore &&
      flagship
    ) {
      tier = 1;
      tierLabel = 'Premium';
      indexable = true;
      reason = deep
        ? 'premium_deep_research'
        : intelligence
          ? 'premium_intelligence_pack'
          : 'premium_metro_enriched';
    } else if (score >= COUNTY_QUALITY_THRESHOLDS.tier2MinScore) {
      tier = 2;
      tierLabel = 'Standard';
      indexable = true;
      reason = 'standard_quality_bar';
    } else {
      tier = 3;
      tierLabel = 'Development';
      indexable = false;
      reason = 'development_score_below_standard';
    }
  } else {
    tier = 3;
    tierLabel = 'Development';
    indexable = false;
    reason = hardBlock;
  }

  const promoteEligible =
    !indexable &&
    !hardBlock &&
    score >= COUNTY_QUALITY_THRESHOLDS.tier2MinScore - 8 &&
    hasResearch;

  const demoteRisk =
    indexable &&
    (batch ||
      explicit < COUNTY_QUALITY_THRESHOLDS.minExplicitMovers + 1 ||
      (tier === 1 && localN === 0 && !deep));

  return {
    score,
    components,
    tier,
    tierLabel,
    indexable,
    reason,
    promoteEligible,
    demoteRisk,
    metadata: {
      explicitMovers: explicit,
      listedMovers: listed,
      localMovers: localN,
      regionalMovers: regionalN,
      usdotShare: Math.round(share * 100) / 100,
      hasDeep: deep,
      hasIntelligence: Boolean(intelligence),
      isPremiumMetro: premium,
      isBatchTemplate: batch,
      hasCitedResearch: cited,
    },
  };
}

/** Map tier → robots. */
export function robotsForCountyTier(tier: CountySeoTier): {
  index: boolean;
  follow: boolean;
} {
  if (tier === 3) return { index: false, follow: true };
  return { index: true, follow: true };
}

/** Sitemap priority by tier. */
export function sitemapPriorityForCountyTier(
  tier: CountySeoTier,
  highTraffic = false
): number {
  if (tier === 1) return highTraffic ? 0.9 : 0.85;
  if (tier === 2) return highTraffic ? 0.75 : 0.7;
  return 0.3; // should not be in indexable sitemap
}

/**
 * Promotion / demotion policy (living system).
 * Documented rules for admin review — scoring is source of truth at build time.
 */
export const COUNTY_TIER_MOVEMENT_POLICY = {
  promoteToStandard: [
    'explicitMovers >= 3',
    'cited research (not batch template)',
    'quality score >= 48',
    'not regional_metro_fallback only',
  ],
  promoteToPremium: [
    'score >= 70',
    'deep research OR intelligence pack OR premium metro list',
    'prefer true-local HQ movers when available',
  ],
  demoteToDevelopment: [
    'batch_template_research',
    'uncited_research',
    'explicitMovers falls below 3',
    'regional_metro_fallback',
    'score drops below 48',
  ],
  notes: [
    'Do not promote solely for population or paid interest.',
    'Do not mass AI-spin text to raise uniqueness scores.',
    'Rural counties can be Tier 1/2 when inventory + unique local value exist.',
  ],
} as const;
