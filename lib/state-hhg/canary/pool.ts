/**
 * Recompute publication-ready pool for local canary (read-only).
 */
import type pg from 'pg';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';
import type { PublicationReadyProvider } from '@/lib/state-hhg/canary/types';

export type PoolRowRaw = {
  company_id: string;
  slug: string;
  name: string;
  fmcsa_legal_name: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  physical_address: string | null;
  usdot_number: string | null;
  publication_state: string;
  indexable: boolean;
  legacy_directory_row: boolean;
  state_code: string;
  authority_number: string;
  authority_type: string;
  status: string;
  verification_state: string;
  regulator: string;
  source: string;
  source_url: string | null;
  retrieved_at: Date | string;
  legal_name: string | null;
  dba_name: string | null;
  review_reason: string | null;
  role_class: string | null;
  county_fips: string;
  county_name: string | null;
  consumer_eligible: boolean;
};

export async function loadPublicationReadyPool(
  client: pg.Client
): Promise<{
  pool: PublicationReadyProvider[];
  excluded: {
    franchise: number;
    review: number;
    inactive: number;
    broker: number;
    missingFields: number;
    wrongStateCounty: number;
  };
  authorityFreshness: Array<{
    state_code: string;
    oldest: string;
    newest: string;
    n: number;
  }>;
}> {
  const res = await client.query(`
    SELECT DISTINCT ON (c.id)
      c.id AS company_id,
      c.slug,
      c.name,
      c.fmcsa_legal_name,
      c.phone,
      c.email,
      c.website,
      c.physical_address,
      c.usdot_number,
      c.publication_state,
      c.indexable,
      c.legacy_directory_row,
      psa.state_code,
      psa.authority_number,
      psa.authority_type,
      psa.status,
      psa.verification_state,
      psa.regulator,
      psa.source,
      psa.source_url,
      psa.retrieved_at,
      psa.legal_name,
      psa.dba_name,
      psa.review_reason,
      s.role_class,
      e.county_fips,
      e.county_name,
      e.consumer_eligible
    FROM public.companies c
    JOIN public.provider_state_authority psa ON psa.company_id = c.id
    JOIN public.provider_local_discovery_evidence e
      ON e.company_id = c.id AND e.basis = 'VERIFIED_HOME_COUNTY'
    LEFT JOIN public.state_hhg_registry_staging s ON s.id = psa.staging_id
    WHERE c.publication_state = 'INGESTED'
      AND c.indexable = false
      AND c.legacy_directory_row = false
      AND (c.id LIKE 'fl-%' OR c.id LIKE 'wa-%')
      AND c.id NOT LIKE 'usdot-%'
      AND psa.verification_state = 'VERIFIED'
      AND psa.status = 'active'
      AND psa.state_code IN ('FL', 'WA')
      AND psa.authority_number IS NOT NULL
      AND btrim(psa.authority_number) <> ''
    ORDER BY c.id, psa.retrieved_at DESC
  `);

  const explicit = await client.query(`
    SELECT company_id, county_fips, county_name, basis
      FROM public.provider_local_discovery_evidence
     WHERE basis IN ('EXPLICIT_SERVICE_AREA','PROVIDER_EXPLICIT','REGULATOR_TERRITORY','CURATED_VERIFIED')
       AND (company_id LIKE 'fl-%' OR company_id LIKE 'wa-%')
  `);
  const explicitByCompany = new Map<
    string,
    Array<{ fips: string; name: string | null }>
  >();
  for (const row of explicit.rows) {
    const id = String(row.company_id);
    const list = explicitByCompany.get(id) ?? [];
    list.push({
      fips: String(row.county_fips),
      name: row.county_name ? String(row.county_name) : null,
    });
    explicitByCompany.set(id, list);
  }

  const freshness = await client.query(`
    SELECT state_code,
           min(retrieved_at) AS oldest,
           max(retrieved_at) AS newest,
           count(*)::int AS n
      FROM provider_state_authority
     WHERE verification_state = 'VERIFIED'
       AND status = 'active'
       AND (company_id LIKE 'fl-%' OR company_id LIKE 'wa-%')
     GROUP BY 1
     ORDER BY 1
  `);

  const excluded = {
    franchise: 0,
    review: 0,
    inactive: 0,
    broker: 0,
    missingFields: 0,
    wrongStateCounty: 0,
  };

  const pool: PublicationReadyProvider[] = [];
  const seen = new Set<string>();

  for (const raw of res.rows as PoolRowRaw[]) {
    const companyId = String(raw.company_id);
    if (seen.has(companyId)) continue;
    seen.add(companyId);

    const stateCode = String(raw.state_code).toUpperCase() as 'FL' | 'WA';
    const legalName = String(raw.legal_name || raw.fmcsa_legal_name || raw.name || '').trim();
    const displayName = String(raw.name || legalName).trim();
    const dba = raw.dba_name ? String(raw.dba_name) : null;
    const role = (raw.role_class || 'mover').toLowerCase();
    const expectedFips = stateCode === 'FL' ? '12' : '53';
    const countyFips = String(raw.county_fips);

    if (raw.review_reason || raw.verification_state !== 'VERIFIED') {
      excluded.review++;
      continue;
    }
    if (raw.status !== 'active') {
      excluded.inactive++;
      continue;
    }
    if (role === 'broker') {
      excluded.broker++;
      continue;
    }
    if (
      isFranchiseOrNetworkBrandName(displayName) ||
      isFranchiseOrNetworkBrandName(legalName) ||
      isFranchiseOrNetworkBrandName(dba)
    ) {
      excluded.franchise++;
      continue;
    }
    if (
      !legalName ||
      !displayName ||
      !raw.authority_number ||
      !raw.phone ||
      !raw.physical_address ||
      !countyFips ||
      raw.slug == null ||
      String(raw.slug).trim() === ''
    ) {
      excluded.missingFields++;
      continue;
    }
    if (!countyFips.startsWith(expectedFips)) {
      excluded.wrongStateCounty++;
      continue;
    }
    if (raw.publication_state !== 'INGESTED' || raw.indexable !== false) {
      excluded.missingFields++;
      continue;
    }
    if (raw.consumer_eligible === true) {
      // Canary pool should still be internal; flag as missing readiness for 011D.2B
      excluded.missingFields++;
      continue;
    }

    pool.push({
      companyId,
      slug: String(raw.slug),
      stateCode,
      legalName,
      displayName,
      dba,
      authorityNumber: String(raw.authority_number),
      authorityType: String(raw.authority_type),
      authorityStatus: String(raw.status),
      regulator: String(raw.regulator),
      authoritySource: String(raw.source),
      authoritySourceUrl: raw.source_url ? String(raw.source_url) : null,
      authorityRetrievedAt: new Date(raw.retrieved_at).toISOString(),
      usdot: raw.usdot_number ? String(raw.usdot_number) : null,
      homeCountyFips: countyFips,
      homeCountyName: raw.county_name ? String(raw.county_name) : null,
      discoveryBasis: 'VERIFIED_HOME_COUNTY',
      explicitServiceCounties: explicitByCompany.get(companyId) ?? [],
      phone: raw.phone ? String(raw.phone) : null,
      email: raw.email ? String(raw.email) : null,
      website: raw.website ? String(raw.website) : null,
      physicalAddress: raw.physical_address
        ? String(raw.physical_address)
        : null,
      publicationState: 'INGESTED',
      indexable: false,
      hasUsdot: Boolean(raw.usdot_number),
      hasDba: Boolean(dba),
      nameLength: displayName.length,
    });
  }

  // Stable sort for determinism
  pool.sort((a, b) => {
    if (a.stateCode !== b.stateCode) return a.stateCode.localeCompare(b.stateCode);
    return a.companyId.localeCompare(b.companyId);
  });

  return {
    pool,
    excluded,
    authorityFreshness: freshness.rows.map((r) => ({
      state_code: String(r.state_code),
      oldest: new Date(r.oldest).toISOString(),
      newest: new Date(r.newest).toISOString(),
      n: Number(r.n),
    })),
  };
}
