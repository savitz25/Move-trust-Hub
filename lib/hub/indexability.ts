import { tryGetClusterContent } from '@/lib/lender/clusters/content';
import {
  getLendersByCounty,
  isCanonicalLenderProfile,
  lenders as lenderCatalog,
} from '@/lib/lender/lenders';
import type { EnrichedLender } from '@/lib/lender/enrichment/merge';
import { isCuratedHub } from '@/lib/insurance/hubs/data/curated-hubs';
import type { InsuranceHub } from '@/types/insurance/agent';

export type HubIndexTier = 'index' | 'noindex';

export type HubIndexDecision = {
  tier: HubIndexTier;
  reason: string;
};

/** Phase 0: empty and near-empty county/cluster pages stay live but noindex,follow. */
export const MIN_LENDERS_TO_INDEX = 3;

const MIN_PROFILE_DESCRIPTION_LENGTH = 60;
const MIN_PROFILE_REVIEWS = 25;

/**
 * Indexability for /lender/local-lenders/{state}/{county|cluster}.
 * Zero verified lenders (and thin < MIN_LENDERS_TO_INDEX lists) → noindex.
 */
export function evaluateLenderClusterIndexability(
  state: string,
  cluster: string
): HubIndexDecision {
  const clusterMatch = tryGetClusterContent(state, cluster);
  if (clusterMatch) {
    return { tier: 'index', reason: 'curated_cluster_content' };
  }

  const lenderCount = getLendersByCounty(state, cluster).length;
  if (lenderCount >= MIN_LENDERS_TO_INDEX) {
    return { tier: 'index', reason: 'substantive_lender_listings' };
  }

  if (lenderCount === 0) {
    return { tier: 'noindex', reason: 'zero_lenders' };
  }

  return { tier: 'noindex', reason: 'insufficient_lenders' };
}

export function shouldIndexLenderCluster(state: string, cluster: string): boolean {
  return evaluateLenderClusterIndexability(state, cluster).tier === 'index';
}

export function evaluateInsuranceHubIndexability(hub: InsuranceHub): HubIndexDecision {
  if (isCuratedHub(hub.slug)) {
    return { tier: 'index', reason: 'curated_verified_agents' };
  }

  return { tier: 'noindex', reason: 'synthetic_template_hub' };
}

export function shouldIndexInsuranceHub(hub: InsuranceHub): boolean {
  return evaluateInsuranceHubIndexability(hub).tier === 'index';
}

export function evaluateLenderProfileIndexability(lender: EnrichedLender): HubIndexDecision {
  // Phase 0: hard verified badge requires numeric NMLS; incomplete IDs stay noindex
  if (!lender.nmlsVerified || !lender.nmlsId?.trim()) {
    return { tier: 'noindex', reason: 'incomplete_or_unverified_nmls' };
  }

  // Non-canonical geo variants of the same NMLS entity stay noindex
  if (!isCanonicalLenderProfile(lender, lenderCatalog)) {
    return { tier: 'noindex', reason: 'duplicate_nmls_geo_variant' };
  }

  if (lender.isEnriched) {
    return { tier: 'index', reason: 'enriched_profile' };
  }

  const hasSubstantiveSeed =
    lender.nmlsVerified &&
    lender.reviewCount >= MIN_PROFILE_REVIEWS &&
    lender.shortDescription.trim().length >= MIN_PROFILE_DESCRIPTION_LENGTH;

  if (hasSubstantiveSeed) {
    return { tier: 'index', reason: 'substantive_seed_profile' };
  }

  return { tier: 'noindex', reason: 'thin_unenriched_profile' };
}

export function shouldIndexLenderProfile(lender: EnrichedLender): boolean {
  return evaluateLenderProfileIndexability(lender).tier === 'index';
}