/**
 * Task 011D.3 — merge published local canary movers into county pages.
 * Uses SECURITY DEFINER RPC (SQL-gated). No radius. Google Places: 0.
 */
import 'server-only';

import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { getServiceRoleSupabaseTarget } from '@/lib/supabase/config';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';
import { isPublishableCountyCompany } from '@/lib/local-movers/county-publication';
import type { LocalMover } from '@/lib/local-movers/types';
import {
  buildCountySlugToFips,
  loadFlWaCountyCentroids,
} from '@/lib/state-hhg/calibration/counties';
import { settleWithin } from '@/lib/local-movers/bounded-concurrency';
import { logger } from '@/lib/logging/logger';

const STATE_SLUG_TO_CODE: Record<string, 'FL' | 'WA'> = {
  florida: 'FL',
  washington: 'WA',
};

type RpcRow = {
  company_id: string;
  slug: string;
  name: string;
  authority_number: string | null;
  regulator: string | null;
  home_county_fips: string;
  home_county_name: string | null;
  phone: string | null;
  publication_state: string;
  indexable: boolean;
};

function resolveCountyFips(
  stateSlug: string,
  countySlug: string
): string | null {
  if (!STATE_SLUG_TO_CODE[stateSlug]) return null;
  const map = buildCountySlugToFips(loadFlWaCountyCentroids());
  return map.get(`${stateSlug}:${countySlug}`) ?? null;
}

async function fetchCanaryMoversForCounty(
  stateSlug: string,
  countySlug: string
): Promise<LocalMover[]> {
  const stateCode = STATE_SLUG_TO_CODE[stateSlug];
  if (!stateCode) return [];
  const fips = resolveCountyFips(stateSlug, countySlug);
  if (!fips) return [];

  const target = getServiceRoleSupabaseTarget();
  if (!target) {
    logger.warn('canary_county.service_role_unconfigured', { stateSlug, countySlug });
    return [];
  }
  const supabase = createClient(target.url, target.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const settled = await settleWithin(
    Promise.resolve(
      supabase.rpc('local_canary_movers_for_county', {
        p_state_code: stateCode,
        p_county_fips: fips,
        p_limit: 24,
      })
    ),
    8_000
  );
  if (settled.status === 'failed') {
    logger.warn('canary_county.rpc_failed', {
      stateSlug,
      countySlug,
      reason: settled.reason,
      message: settled.message,
    });
    throw new Error(`canary_county_${settled.reason}:${stateSlug}/${countySlug}`);
  }
  const { data, error } = settled.value;

  if (error) {
    logger.warn('canary_county.rpc_failed', {
      stateSlug,
      countySlug,
      reason: 'error',
      message: error.message,
    });
    throw new Error(`canary_county_error:${stateSlug}/${countySlug}:${error.message}`);
  }

  const rows = (data ?? []) as RpcRow[];
  return rows.filter((row) => isPublishableCountyCompany(row.publication_state)).map((row) =>
    companyToLocalMover({
      slug: row.slug,
      name: row.name,
      short_description: row.home_county_name
        ? `Based in ${row.home_county_name} County. Confirm pickup availability for your exact address.`
        : 'State-registered local mover. Confirm pickup availability for your exact address.',
      headquarters: null,
      usdot_number: null,
      mc_number: null,
      fmcsa_safety_rating: 'Not Rated',
      bbb_rating: null,
      overall_rating: 0,
      review_count: 0,
      services: ['Local Mover'],
      specialties: [],
      service_scope: 'intrastate',
      entity_type: 'Moving Company',
      last_updated: null,
      out_of_service: false,
      authority_active: true,
      usdot_status: null,
    })
  );
}

export const getCanaryMoversForCounty = unstable_cache(
  async (stateSlug: string, countySlug: string) =>
    fetchCanaryMoversForCounty(stateSlug, countySlug),
  ['local-canary-county-movers-v2'],
  { revalidate: 300, tags: ['local-hhg-canary'] }
);
