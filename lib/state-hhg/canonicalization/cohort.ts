/**
 * Rebuild READY cohort from staging + Census geocode cache (no Google).
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import type pg from 'pg';
import { geocodeOneLineAddress } from '@/lib/state-hhg/calibration/census-geocoder';
import { loadFlWaCountyCentroids } from '@/lib/state-hhg/calibration/counties';
import {
  classifyNewProviderReadiness,
  type NewProviderCandidateInput,
} from '@/lib/state-hhg/discovery/readiness';
import type { NewProviderReadinessRow } from '@/lib/state-hhg/discovery/types';
import type { StagingCandidateRow } from '@/lib/state-hhg/canonicalization/types';

const GEOCODE_CACHE = resolve(
  process.cwd(),
  'data/state-hhg/calibration/geocode-cache.json'
);

type GeocodeCache = Record<
  string,
  Awaited<ReturnType<typeof geocodeOneLineAddress>>
>;

function loadCache(): GeocodeCache {
  if (!existsSync(GEOCODE_CACHE)) return {};
  return JSON.parse(readFileSync(GEOCODE_CACHE, 'utf8')) as GeocodeCache;
}

function saveCache(cache: GeocodeCache) {
  mkdirSync(resolve(process.cwd(), 'data/state-hhg/calibration'), {
    recursive: true,
  });
  writeFileSync(GEOCODE_CACHE, JSON.stringify(cache, null, 2));
}

export async function loadNewProviderStagingCandidates(
  client: pg.Client,
  stateCode: 'FL' | 'WA'
): Promise<StagingCandidateRow[]> {
  const res = await client.query(
    `
    SELECT
      s.id AS staging_id,
      s.state_code,
      s.authority_number,
      s.authority_type,
      s.role_class,
      s.status_normalized,
      s.legal_name_raw,
      s.dba_raw,
      s.usdot_norm,
      s.phone_norm,
      s.email_norm,
      s.physical_address_raw,
      s.city_norm,
      s.postal_code_norm,
      s.disposition,
      s.review_reason,
      s.source,
      s.source_url,
      s.raw_source_key,
      s.issue_date,
      s.expiration_date,
      s.evidence_hash,
      s.source_retrieved_at,
      psa.regulator
    FROM public.state_hhg_registry_staging s
    LEFT JOIN public.provider_state_authority psa
      ON psa.state_code = s.state_code AND psa.raw_source_key = s.raw_source_key
    WHERE s.state_code = $1
      AND s.disposition = 'NEW_PROVIDER_CANDIDATE'
    ORDER BY s.authority_number NULLS LAST, s.id
    `,
    [stateCode]
  );

  return res.rows.map((row) => {
    const sc = String(row.state_code).toUpperCase() as 'FL' | 'WA';
    return {
      stagingId: String(row.staging_id),
      stateCode: sc,
      authorityNumber: String(row.authority_number ?? ''),
      authorityType: String(row.authority_type),
      roleClass: String(row.role_class),
      statusNormalized: String(row.status_normalized),
      legalName: String(row.legal_name_raw ?? ''),
      dba: row.dba_raw ? String(row.dba_raw) : null,
      usdot: row.usdot_norm ? String(row.usdot_norm) : null,
      phone: row.phone_norm ? String(row.phone_norm) : null,
      email: row.email_norm ? String(row.email_norm) : null,
      physicalAddress: row.physical_address_raw
        ? String(row.physical_address_raw)
        : null,
      city: row.city_norm ? String(row.city_norm) : null,
      postalCode: row.postal_code_norm ? String(row.postal_code_norm) : null,
      disposition: String(row.disposition),
      reviewReason: row.review_reason ? String(row.review_reason) : null,
      source: String(row.source),
      sourceUrl: row.source_url ? String(row.source_url) : null,
      rawSourceKey: String(row.raw_source_key),
      regulator:
        row.regulator
          ? String(row.regulator)
          : sc === 'FL'
            ? 'FDACS'
            : 'WA UTC',
      issueDate: row.issue_date ? String(row.issue_date).slice(0, 10) : null,
      expirationDate: row.expiration_date
        ? String(row.expiration_date).slice(0, 10)
        : null,
      evidenceHash: row.evidence_hash ? String(row.evidence_hash) : null,
      retrievedAt: row.source_retrieved_at
        ? new Date(row.source_retrieved_at).toISOString()
        : new Date().toISOString(),
    };
  });
}

export type ReadyCandidate = StagingCandidateRow & {
  readiness: NewProviderReadinessRow;
  countyFips: string | null;
  countyName: string | null;
  geocodeStatus: string | null;
};

export async function classifyReadyCohort(
  candidates: readonly StagingCandidateRow[],
  options?: { delayMs?: number; persistCache?: boolean }
): Promise<{
  ready: ReadyCandidate[];
  all: ReadyCandidate[];
  summary: {
    FL: Record<string, number>;
    WA: Record<string, number>;
    FL_READY: number;
    WA_READY: number;
    totalReady: number;
  };
}> {
  const cache = loadCache();
  const delayMs = options?.delayMs ?? 0;
  const centroids = loadFlWaCountyCentroids();
  const all: ReadyCandidate[] = [];

  for (const c of candidates) {
    const parts = [c.physicalAddress, c.city, c.stateCode, c.postalCode].filter(
      Boolean
    );
    const address = parts.join(', ');
    let countyFips: string | null = null;
    let geocodeStatus: string | null = null;
    let countyName: string | null = null;

    if (address) {
      const key = address.toUpperCase();
      let geo = cache[key];
      if (!geo) {
        geo = await geocodeOneLineAddress(address, { delayMs });
        cache[key] = geo;
      }
      geocodeStatus = geo.status;
      const expected = c.stateCode === 'FL' ? '12' : '53';
      if (
        (geo.status === 'MATCH' || geo.status === 'TIE') &&
        geo.countyFips &&
        geo.stateFips === expected
      ) {
        countyFips = geo.countyFips;
        countyName =
          centroids.find((x) => x.countyFips === countyFips)?.name ?? null;
      }
    }

    const input: NewProviderCandidateInput = {
      stagingKey: `${c.stateCode}:${c.authorityNumber}`,
      stateCode: c.stateCode,
      authorityNumber: c.authorityNumber || null,
      legalName: c.legalName || null,
      dba: c.dba,
      disposition: c.disposition,
      statusNormalized: c.statusNormalized,
      authorityStatus: c.statusNormalized,
      roleClass: c.roleClass,
      usdot: c.usdot,
      phone: c.phone,
      email: c.email,
      physicalAddress: c.physicalAddress,
      city: c.city,
      postalCode: c.postalCode,
      countyFips,
      geocodeStatus,
      reviewReason: c.reviewReason,
    };
    const readiness = classifyNewProviderReadiness(input);
    all.push({
      ...c,
      readiness,
      countyFips,
      countyName,
      geocodeStatus,
    });
  }

  if (options?.persistCache !== false) saveCache(cache);

  const ready = all.filter(
    (r) => r.readiness.readiness === 'READY_FOR_CANONICALIZATION'
  );

  const summarize = (state: 'FL' | 'WA') => {
    const rows = all.filter((r) => r.stateCode === state);
    const by: Record<string, number> = {
      READY_FOR_CANONICALIZATION: 0,
      REVIEW_REQUIRED: 0,
      INACTIVE_HOLD: 0,
      ADDRESS_UNRESOLVED: 0,
    };
    for (const r of rows) by[r.readiness.readiness]++;
    return by;
  };

  const FL = summarize('FL');
  const WA = summarize('WA');
  return {
    ready,
    all,
    summary: {
      FL,
      WA,
      FL_READY: FL.READY_FOR_CANONICALIZATION,
      WA_READY: WA.READY_FOR_CANONICALIZATION,
      totalReady: ready.length,
    },
  };
}
