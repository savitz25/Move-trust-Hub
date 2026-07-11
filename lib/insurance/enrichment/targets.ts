import 'server-only';

import { INSURANCE_HUBS } from '@/lib/insurance/hubs/registry';
import { getAgentsForHub } from '@/lib/insurance/hubs/agents';
import { FALLBACK_PROVIDERS } from '@/lib/insurance/providers/fallback-data';
import { createAdminClient } from '@/lib/insurance/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/insurance/supabase/config';
import type { ProviderEnrichmentInput } from '@/lib/insurance/enrichment/types';
import type { Provider as DbProvider } from '@/types/insurance/supabase';

function hubAgentToInput(agent: ReturnType<typeof getAgentsForHub>[number]): ProviderEnrichmentInput {
  return {
    slug: agent.slug,
    name: agent.name,
    city: agent.city,
    state: agent.state,
    phone: agent.phone ?? null,
    website: agent.website ?? null,
    address: agent.address ?? null,
    providerType: agent.agentType === 'independent_agency' ? 'brokerage' : 'independent_agent',
    source: 'hub',
    yearsInBusiness: agent.yearsInBusiness,
    isVerified: agent.isVerified,
  };
}

function dbRowToInput(row: DbProvider): ProviderEnrichmentInput {
  const contact = row.contact ?? {};
  const address = contact.address;

  return {
    slug: row.slug,
    name: row.name,
    city: address?.city ?? row.cities[0] ?? '',
    state: address?.state ?? row.states_licensed[0] ?? '',
    phone: contact.phone ?? null,
    website: contact.website ?? null,
    address: address
      ? [address.street, address.city, address.state, address.zip].filter(Boolean).join(', ')
      : null,
    providerType: row.provider_type,
    source: 'supabase',
    providerId: row.id,
    googlePlaceId: row.google_place_id,
    yearsInBusiness: row.years_in_business,
    isVerified: row.verified,
  };
}

/** Collect unique enrichment targets — Supabase rows take precedence over hub/fallback by slug. */
export async function listEnrichmentTargets(): Promise<ProviderEnrichmentInput[]> {
  const bySlug = new Map<string, ProviderEnrichmentInput>();

  for (const hub of INSURANCE_HUBS) {
    for (const agent of getAgentsForHub(hub)) {
      if (!bySlug.has(agent.slug)) {
        bySlug.set(agent.slug, hubAgentToInput(agent));
      }
    }
  }

  for (const provider of FALLBACK_PROVIDERS) {
    if (!bySlug.has(provider.slug)) {
      bySlug.set(provider.slug, {
        slug: provider.slug,
        name: provider.name,
        city: provider.city,
        state: provider.state,
        phone: provider.phone ?? null,
        website: provider.website ?? null,
        source: 'fallback',
        yearsInBusiness: provider.years_in_business,
        isVerified: provider.is_verified,
      });
    }
  }

  if (isSupabaseAdminConfigured()) {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from('providers')
      .select('*')
      .order('slug', { ascending: true });

    if (!error && data?.length) {
      for (const row of data as DbProvider[]) {
        bySlug.set(row.slug, dbRowToInput(row));
      }
    }
  }

  return Array.from(bySlug.values()).sort((a, b) => a.slug.localeCompare(b.slug));
}