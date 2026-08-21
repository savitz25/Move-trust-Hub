/**
 * FL-009 — FL_STATE_WAVE_1 launch preparation.
 * Dry-run only. Does not publish. Google Places: 0.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import {
  FL_FDACS_INTRASTATE_HEADLINE,
  FL_NO_FEDERAL_ID_IN_MTH_DATA,
  FL_STATE_ONLY_REGISTRATION_COPY,
} from '@/lib/state-hhg/fl/profile-presentation';
import { SITE_URL } from '@/lib/seo/site-metadata';

export const FL_STATE_WAVE_1_ID = 'FL_STATE_WAVE_1' as const;
export const FL_009_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_009_DEFERRED_COMPANY_ID = 'fl-im-4099' as const;
export const FL_STATE_WAVE_1_MEMBERSHIP_WAVE_ID = FL_STATE_WAVE_1_ID;
export const KEEP_80_CANARY_WAVE_ID = 'LOCAL_HHG_FL_WA_2026_08_CANARY_1' as const;

export type Wave1Member = {
  companyId: string;
  slug: string;
  fdacsId: string;
  fdacsIm: string;
  county: string | null;
  countyFips: string | null;
  readinessRuleVersion: string;
  currentPublicationState: 'INGESTED';
  currentIndexable: false;
  intendedPublicationState: 'PUBLISHABLE';
  intendedIndexable: false;
  freshness: string;
  rollbackPublicationState: 'INGESTED';
  rollbackIndexable: false;
};

export type Wave1Manifest = {
  waveId: typeof FL_STATE_WAVE_1_ID;
  ruleset: 'FL_STATE_PUBLICATION_READINESS_V1';
  google_places_requests: 0;
  apply: false;
  hash: string;
  members: Wave1Member[];
};

export type Wave1LiveRow = {
  companyId: string;
  publicationState: string;
  indexable: boolean;
  authorityStatus: string;
  inKeep80Canary: boolean;
};

const MANIFEST_PATH = resolve(process.cwd(), 'data/state-hhg/fl/fl-009-state-wave-1-manifest.json');

let cached: Wave1Manifest | null = null;
let memberSet: Set<string> | null = null;

export function hashWave1Manifest(members: readonly Wave1Member[]): string {
  const payload = [...members]
    .map(
      (m) =>
        `${m.companyId}|${m.slug}|${m.fdacsId}|${m.intendedPublicationState}|${m.intendedIndexable}`
    )
    .sort()
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

export function loadWave1Manifest(path = MANIFEST_PATH): Wave1Manifest {
  if (cached && path === MANIFEST_PATH) return cached;
  if (!existsSync(path)) {
    throw new Error('FL-009 Wave 1 manifest missing — STOP');
  }
  const raw = JSON.parse(readFileSync(path, 'utf8')) as Wave1Manifest;
  const hash = hashWave1Manifest(raw.members);
  const man: Wave1Manifest = { ...raw, hash };
  if (path === MANIFEST_PATH) {
    cached = man;
    memberSet = new Set(man.members.map((m) => m.companyId));
  }
  return man;
}

export function isFloridaStateWave1Member(companyId: string): boolean {
  if (!memberSet) {
    try {
      loadWave1Manifest();
    } catch {
      return false;
    }
  }
  return memberSet?.has(companyId) === true;
}

export function shouldRenderFloridaStateWaveChrome(company: {
  id: string;
  publicationState?: string | null;
}): boolean {
  return isFloridaStateWave1Member(company.id) && company.publicationState === 'PUBLISHABLE';
}

export function buildStateOnlyProfileChrome(input: {
  displayName: string;
  fdacsNumber: string;
  fdacsStatus: string;
  hasFederalId: boolean;
}): {
  headline: string;
  title: string;
  description: string;
  detail: string;
  federalCopy: string;
  endorsement: false;
} {
  const name = input.displayName.replace(/\s+/g, ' ').trim();
  return {
    headline: FL_FDACS_INTRASTATE_HEADLINE,
    title: `${name} — Florida Intrastate Mover`,
    description: `${name} is registered with Florida FDACS as an intrastate household-goods mover for moves within Florida. Registration ${input.fdacsNumber}. This is Florida state registration, not a MoveTrustHub endorsement.`,
    detail: FL_STATE_ONLY_REGISTRATION_COPY,
    federalCopy: input.hasFederalId
      ? 'Federal interstate authority (FMCSA / USDOT) is recorded separately from Florida FDACS registration.'
      : FL_NO_FEDERAL_ID_IN_MTH_DATA,
    endorsement: false,
  };
}

export function buildStateOnlyStructuredData(input: {
  name: string;
  slug: string;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  fdacsNumber: string;
  usdot: string | null;
}): { ok: boolean; graph: Record<string, unknown> } {
  const canonical = `${SITE_URL}/companies/${input.slug}`;
  const additionalProperty: Array<Record<string, unknown>> = [
    {
      '@type': 'PropertyValue',
      name: 'Florida FDACS registration',
      value: input.fdacsNumber,
    },
  ];
  if (input.usdot) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'USDOT',
      value: input.usdot,
    });
  }
  const mover: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'MovingCompany'],
    '@id': `${canonical}#company`,
    name: input.name,
    url: canonical,
    additionalProperty,
  };
  if (input.street || input.city) {
    mover.address = {
      '@type': 'PostalAddress',
      ...(input.street ? { streetAddress: input.street } : {}),
      ...(input.city ? { addressLocality: input.city } : {}),
      ...(input.state ? { addressRegion: input.state } : {}),
      ...(input.zip ? { postalCode: input.zip } : {}),
      addressCountry: 'US',
    };
  }
  if (input.phone) mover.telephone = input.phone;
  delete mover.areaServed;
  delete mover.aggregateRating;
  delete mover.review;
  return {
    ok: true,
    graph: {
      '@context': 'https://schema.org',
      '@graph': [mover],
    },
  };
}

export function computeWave1DryRunDelta(
  manifest: Wave1Manifest,
  live: { rows: Wave1LiveRow[] }
): {
  ok: boolean;
  companies: 0;
  indexable: 0;
  publicationStateChanges: number;
  psa: 0;
  contacts: 0;
  trustScore: 0;
  keep80CanaryTouched: number;
  applyExecuted: false;
  reasons: string[];
} {
  const pre = validateWave1ApplyPreconditions(manifest, live.rows, manifest.hash);
  const keep80 = live.rows.filter((r) => r.inKeep80Canary).length;
  return {
    ok: pre.ok && keep80 === 0,
    companies: 0,
    indexable: 0,
    publicationStateChanges: pre.ok ? manifest.members.length : 0,
    psa: 0,
    contacts: 0,
    trustScore: 0,
    keep80CanaryTouched: keep80,
    applyExecuted: false,
    reasons: pre.reasons,
  };
}

export function validateWave1ApplyPreconditions(
  manifest: Wave1Manifest,
  live: readonly Wave1LiveRow[],
  providedHash: string
): { ok: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (providedHash !== manifest.hash) reasons.push('manifest_hash_mismatch');
  if (live.length !== manifest.members.length) reasons.push('readiness_count_changed');
  const byId = new Map(live.map((r) => [r.companyId, r]));
  for (const m of manifest.members) {
    const row = byId.get(m.companyId);
    if (!row) {
      reasons.push(`missing_${m.companyId}`);
      continue;
    }
    if (row.publicationState !== 'INGESTED') reasons.push(`not_ingested_${m.companyId}`);
    if (row.indexable) reasons.push(`indexable_${m.companyId}`);
    if (String(row.authorityStatus).toLowerCase() !== 'active') {
      reasons.push(`authority_${m.companyId}`);
    }
    if (row.inKeep80Canary) reasons.push(`keep80_collision_${m.companyId}`);
  }
  try {
    const canary = loadExactCanaryManifests();
    for (const m of manifest.members) {
      if (canary.companyIds.includes(m.companyId)) reasons.push(`keep80_manifest_${m.companyId}`);
    }
  } catch {
    /* manifests present in repo tests */
  }
  return { ok: reasons.length === 0, reasons };
}

export function planWave1Rollback(manifest: Wave1Manifest): {
  waveId: typeof FL_STATE_WAVE_1_ID;
  companyIds: string[];
  toPublicationState: 'INGESTED';
  toIndexable: false;
  preservePsa: true;
  preserveCanary80: true;
  membershipTable: 'local_hhg_canary_publication';
  membershipWaveId: typeof FL_STATE_WAVE_1_ID;
} {
  return {
    waveId: FL_STATE_WAVE_1_ID,
    companyIds: manifest.members.map((m) => m.companyId),
    toPublicationState: 'INGESTED',
    toIndexable: false,
    preservePsa: true,
    preserveCanary80: true,
    membershipTable: 'local_hhg_canary_publication',
    membershipWaveId: FL_STATE_WAVE_1_ID,
  };
}

export function abortConditions(): string[] {
  return [
    'manifest_hash_mismatch',
    'readiness_count_changed',
    'stale_fdacs_status',
    'ingested_http_not_404',
    'sitemap_leakage',
    'indexable_delta_nonzero',
    'incorrect_federal_copy',
    'keep80_canary_regression',
    'company_duplication',
    'public_api_leak',
    'unexpected_county_publication',
    'failing_production_build',
    'failing_browser_qa',
  ];
}

export function wave1DiscoveryContract(): {
  directProfile: 'authorized_when_publishable';
  directorySearch: 'authorized_when_publishable';
  compare: 'authorized_when_publishable';
  keep80CountyDiscovery: 'not_authorized';
  sitemap: 'excluded';
  robots: 'noindex, follow';
} {
  return {
    directProfile: 'authorized_when_publishable',
    directorySearch: 'authorized_when_publishable',
    compare: 'authorized_when_publishable',
    keep80CountyDiscovery: 'not_authorized',
    sitemap: 'excluded',
    robots: 'noindex, follow',
  };
}

export function assertWave1NotAnonymousWhileIngested(company: {
  id: string;
  publicationState?: string | null;
}): boolean {
  if (!isFloridaStateWave1Member(company.id)) return true;
  return !isAnonymousPublicProfileAllowed({
    publicationState: company.publicationState as 'INGESTED',
  });
}
