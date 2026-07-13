import type { Provider } from '@/types/insurance/provider';
import type { ProviderFilters } from '@/types/insurance/provider';
import { isSupabaseConfigured } from '@/lib/insurance/supabase/config';
import { createClient } from '@/lib/insurance/supabase/server';
import {
  FALLBACK_PROVIDERS,
  getFallbackProviderBySlug,
  searchFallbackProviders,
} from '@/lib/insurance/providers/fallback-data';
import { getHubAgentBySlug } from '@/lib/insurance/hubs/agent-lookup';
import {
  enrichProviders,
  filterEnrichedProviders,
  getEnrichedProvider,
  sortEnrichedProviders,
} from '@/lib/insurance/enrichment/get-enriched';
import type { EnrichedProvider } from '@/lib/insurance/enrichment/merge';
import type { InsuranceType, Specialty } from '@/lib/insurance/constants';
import type { Provider as DbProvider } from '@/types/insurance/supabase';

function mapRowToProvider(row: DbProvider): Provider {
  const contact = row.contact ?? {};
  const address = contact.address;
  const license = row.license_info?.licenses?.[0];

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    logo: null,
    short_description: row.short_description,
    description: row.description,
    city: address?.city ?? row.cities[0] ?? '',
    state: address?.state ?? row.states_licensed[0] ?? '',
    zip: address?.zip ?? null,
    phone: contact.phone ?? null,
    website: contact.website ?? null,
    insurance_types: row.categories as InsuranceType[],
    specialties: row.specialties as Specialty[],
    rating: Number(row.google_rating ?? row.rating ?? 0),
    review_count: Number(row.google_review_count ?? row.review_count ?? 0),
    is_verified: row.verified,
    license_number: license?.license_number ?? null,
    years_in_business: row.years_in_business,
    trust_score: row.trust_score ?? undefined,
    bbb_rating: row.bbb_rating ?? undefined,
    google_rating: row.google_rating,
    google_review_count: row.google_review_count,
    google_place_id: row.google_place_id,
    bbb_accredited: row.bbb_accredited,
    bbb_complaint_count: row.bbb_complaint_count,
    enriched_at: row.enriched_at,
    needs_manual_review: row.needs_manual_review,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getProviders(
  filters: ProviderFilters = {}
): Promise<{ providers: EnrichedProvider[]; total: number }> {
  if (!isSupabaseConfigured()) {
    const { providers, total } = searchFallbackProviders(filters);
    const enriched = filterEnrichedProviders(enrichProviders(providers), filters);
    return { providers: enriched, total: enriched.length };
  }

  const supabase = await createClient();
  let query = supabase.from('providers').select('*', { count: 'exact' });

  if (filters.state) {
    query = query.contains('states_licensed', [filters.state.toUpperCase()]);
  }
  if (filters.city) {
    query = query.contains('cities', [filters.city]);
  }
  if (filters.verifiedOnly) query = query.eq('verified', true);
  if (filters.minRating) {
    query = query.or(`google_rating.gte.${filters.minRating},and(google_rating.is.null,rating.gte.${filters.minRating})`);
  }
  if (filters.minGoogleRating) {
    query = query.gte('google_rating', filters.minGoogleRating);
  }
  if (filters.bbbAccreditedOnly) {
    query = query.eq('bbb_accredited', true);
  }
  if (filters.insuranceType) {
    query = query.contains('categories', [filters.insuranceType]);
  }
  if (filters.specialty) {
    query = query.contains('specialties', [filters.specialty]);
  }
  if (filters.query) {
    query = query.or(`name.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
  }

  query = query.order('google_rating', { ascending: false, nullsFirst: false });
  query = query.order('trust_score', { ascending: false, nullsFirst: false });
  query = query.order('rating', { ascending: false });

  const offset = filters.offset ?? 0;
  const limit = filters.limit ?? 24;
  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error || !data) {
    const { providers, total } = searchFallbackProviders(filters);
    const enriched = filterEnrichedProviders(enrichProviders(providers), filters);
    return { providers: enriched, total: enriched.length };
  }

  const providers = enrichProviders(data.map((row) => mapRowToProvider(row as DbProvider)));
  const filtered = filterEnrichedProviders(providers, filters);

  if (providers.length === 0) {
    return searchFallbackProviders(filters);
  }

  return { providers: filtered, total: count ?? filtered.length };
}

export async function getProviderBySlug(slug: string): Promise<EnrichedProvider | null> {
  const hubAgent = getHubAgentBySlug(slug);
  if (hubAgent) return getEnrichedProvider(hubAgent);

  if (!isSupabaseConfigured()) {
    const fallback = getFallbackProviderBySlug(slug);
    return fallback ? getEnrichedProvider(fallback) : null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    const fallback = getFallbackProviderBySlug(slug);
    return fallback ? getEnrichedProvider(fallback) : null;
  }

  return getEnrichedProvider(mapRowToProvider(data as DbProvider));
}

export async function searchProviders(
  filters: ProviderFilters
): Promise<{ providers: EnrichedProvider[]; total: number }> {
  return getProviders(filters);
}

export function getAllFallbackProviders(): Provider[] {
  return FALLBACK_PROVIDERS;
}

export { sortEnrichedProviders };