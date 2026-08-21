/**
 * Production SQL-gated local canary discovery.
 * Filters in SQL before Node materialization. No radius / adjacency.
 * Google Places: 0.
 */
import type pg from 'pg';
import { LOCAL_CANARY_WAVE_ID } from '@/lib/state-hhg/canary/types';

export type CanaryDiscoveryRow = {
  companyId: string;
  slug: string;
  name: string;
  stateCode: string;
  authorityNumber: string | null;
  regulator: string | null;
  homeCountyFips: string;
  homeCountyName: string | null;
  discoveryBasis: string;
  publicationState: string;
  indexable: boolean;
  phone: string | null;
};

/**
 * Bounded origin-county local discovery for published canary only.
 */
export async function queryCanaryLocalDiscovery(
  client: pg.Client,
  input: {
    state: 'FL' | 'WA' | string;
    originCountyFips: string;
    limit?: number;
  }
): Promise<{
  rows: CanaryDiscoveryRow[];
  totalMatching: number;
  requestedLimit: number;
  materializedIntoNode: number;
  path: 'sql_canary_wave';
}> {
  const state = input.state.toUpperCase();
  const limit = Math.min(Math.max(input.limit ?? 24, 1), 50);
  const origin = input.originCountyFips;

  const countRes = await client.query(
    `
    SELECT count(*)::int AS n
      FROM public.local_hhg_canary_publication w
      JOIN public.companies c ON c.id = w.company_id
      JOIN public.provider_local_discovery_evidence e
        ON e.company_id = c.id
       AND e.basis = 'VERIFIED_HOME_COUNTY'
       AND e.county_fips = $2
       AND e.consumer_eligible = true
      JOIN public.provider_state_authority psa
        ON psa.company_id = c.id
       AND psa.state_code = $1
       AND psa.verification_state = 'VERIFIED'
       AND psa.status = 'active'
     WHERE w.wave_id = $3
       AND w.status = 'published'
       AND w.state_code = $1
       AND w.home_county_fips = $2
       AND c.publication_state = 'PUBLISHABLE'
       AND c.indexable = false
       AND c.service_scope = 'intrastate'
    `,
    [state, origin, LOCAL_CANARY_WAVE_ID]
  );

  const res = await client.query(
    `
    SELECT
      c.id AS company_id,
      c.slug,
      c.name,
      w.state_code,
      w.authority_number,
      psa.regulator,
      e.county_fips,
      e.county_name,
      e.basis,
      c.publication_state,
      c.indexable,
      c.phone
    FROM public.local_hhg_canary_publication w
    JOIN public.companies c ON c.id = w.company_id
    JOIN public.provider_local_discovery_evidence e
      ON e.company_id = c.id
     AND e.basis = 'VERIFIED_HOME_COUNTY'
     AND e.county_fips = $2
     AND e.consumer_eligible = true
    JOIN public.provider_state_authority psa
      ON psa.company_id = c.id
     AND psa.state_code = $1
     AND psa.verification_state = 'VERIFIED'
     AND psa.status = 'active'
    WHERE w.wave_id = $3
      AND w.status = 'published'
      AND w.state_code = $1
      AND w.home_county_fips = $2
      AND c.publication_state = 'PUBLISHABLE'
      AND c.indexable = false
      AND c.service_scope = 'intrastate'
    ORDER BY c.name ASC, c.id ASC
    LIMIT $4
    `,
    [state, origin, LOCAL_CANARY_WAVE_ID, limit]
  );

  const rows: CanaryDiscoveryRow[] = res.rows.map((r) => ({
    companyId: String(r.company_id),
    slug: String(r.slug),
    name: String(r.name),
    stateCode: String(r.state_code),
    authorityNumber: r.authority_number ? String(r.authority_number) : null,
    regulator: r.regulator ? String(r.regulator) : null,
    homeCountyFips: String(r.county_fips),
    homeCountyName: r.county_name ? String(r.county_name) : null,
    discoveryBasis: String(r.basis),
    publicationState: String(r.publication_state),
    indexable: Boolean(r.indexable),
    phone: r.phone ? String(r.phone) : null,
  }));

  return {
    rows,
    totalMatching: Number((countRes.rows[0] as { n: number }).n),
    requestedLimit: limit,
    materializedIntoNode: rows.length,
    path: 'sql_canary_wave',
  };
}

/**
 * Same-state destination legality: active VERIFIED state authority on canary provider.
 * Destination county is NOT required to match home county.
 */
export async function canaryAllowsSameStateDestination(
  client: pg.Client,
  companyId: string,
  stateCode: string
): Promise<boolean> {
  const res = await client.query(
    `
    SELECT 1
      FROM public.local_hhg_canary_publication w
      JOIN public.companies c ON c.id = w.company_id
      JOIN public.provider_state_authority psa
        ON psa.company_id = c.id
       AND psa.state_code = $2
       AND psa.verification_state = 'VERIFIED'
       AND psa.status = 'active'
     WHERE w.wave_id = $3
       AND w.status = 'published'
       AND w.company_id = $1
       AND c.publication_state = 'PUBLISHABLE'
     LIMIT 1
    `,
    [companyId, stateCode.toUpperCase(), LOCAL_CANARY_WAVE_ID]
  );
  return res.rows.length > 0;
}
