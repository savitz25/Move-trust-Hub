import type { HubAgent } from '@/types/insurance/agent';
import type { Provider } from '@/types/insurance/provider';
import type { ProviderFilters } from '@/types/insurance/provider';
import { getEnrichmentBySlug, getAllEnrichments } from '@/lib/insurance/enrichment/store';
import {
  mergeProviderWithEnrichment,
  type EnrichedProvider,
} from '@/lib/insurance/enrichment/merge';

export function getEnrichedProvider(provider: Provider): EnrichedProvider {
  return mergeProviderWithEnrichment(provider, getEnrichmentBySlug(provider.slug));
}

export function enrichProviders(providers: Provider[]): EnrichedProvider[] {
  const store = getAllEnrichments();
  return providers.map((p) => mergeProviderWithEnrichment(p, store[p.slug]));
}

export function enrichHubAgent(agent: HubAgent): HubAgent & {
  googleRating?: number | null;
  bbbAccredited?: boolean | null;
  isEnriched: boolean;
} {
  const enrichment = getEnrichmentBySlug(agent.slug);
  if (!enrichment) {
    return { ...agent, isEnriched: false };
  }

  return {
    ...agent,
    rating: enrichment.google_rating ?? agent.rating,
    reviewCount: enrichment.google_review_count ?? agent.reviewCount,
    trustScore: enrichment.trust_score ?? agent.trustScore,
    bbbRating: enrichment.bbb_rating ?? agent.bbbRating,
    googleRating: enrichment.google_rating,
    bbbAccredited: enrichment.bbb_accredited,
    isEnriched: true,
  };
}

export function filterEnrichedProviders(
  providers: EnrichedProvider[],
  filters: ProviderFilters
): EnrichedProvider[] {
  let result = [...providers];

  if (filters.minGoogleRating) {
    result = result.filter((p) => (p.google_rating ?? p.rating) >= filters.minGoogleRating!);
  }

  if (filters.bbbAccreditedOnly) {
    result = result.filter((p) => Boolean(p.bbb_accredited));
  }

  if (filters.minRating) {
    result = result.filter((p) => p.rating >= filters.minRating!);
  }

  return result;
}

export function sortEnrichedProviders(
  providers: EnrichedProvider[],
  sort: string,
  query: string
): EnrichedProvider[] {
  const sorted = [...providers];
  switch (sort) {
    case 'reviews':
      return sorted.sort((a, b) => b.review_count - a.review_count);
    case 'trust':
      return sorted.sort((a, b) => (b.trust_score ?? 0) - (a.trust_score ?? 0));
    case 'relevance':
      if (!query) return sorted;
      const q = query.toLowerCase();
      return sorted.sort((a, b) => {
        const score = (p: Provider) =>
          (p.name.toLowerCase().includes(q) ? 3 : 0) +
          (p.city.toLowerCase().includes(q) ? 2 : 0) +
          (p.specialties.some((s) => s.toLowerCase().includes(q)) ? 1 : 0);
        return score(b) - score(a);
      });
    case 'rating':
    default:
      return sorted.sort((a, b) => b.rating - a.rating);
  }
}