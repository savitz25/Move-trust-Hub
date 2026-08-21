/**
 * FL-008 — Florida state-layer publication readiness gate.
 * Evaluates INGESTED Florida state-only profiles. Does not publish.
 * Google Places requests: 0. Trust Score unchanged.
 */

import { createHash } from 'node:crypto';
import {
  isAnonymousPublicProfileAllowed,
  isConsumerVisibleCompany,
  isSeoIndexableCompany,
} from '@/lib/provider/publication';
import { isFranchiseOrNetworkBrandName, normalizeLegalName } from '@/lib/state-hhg/normalize';
import type { Fl004ManifestRow } from '@/lib/state-hhg/fl/fl-004';

export const FL_STATE_PUBLICATION_READINESS_V1 = 'FL_STATE_PUBLICATION_READINESS_V1' as const;
export const FL_008_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_008_POST_FL004_ADDITIONS = ['fl-im-4099'] as const;
export const FL_008_MAX_SNAPSHOT_AGE_DAYS = 365;

export const READINESS_STATES = [
  'READY_FOR_PUBLISHABLE_CANARY',
  'HOLD_PROFILE_THIN',
  'REVIEW_REQUIRED',
  'NOT_ELIGIBLE',
  'DEFERRED',
] as const;

export type ReadinessState = (typeof READINESS_STATES)[number];
export type StatusFreshness = 'STATUS_FRESH' | 'STATUS_REFRESH_REQUIRED' | 'STATUS_UNKNOWN';
export type ConsumerValue = 'SUFFICIENT' | 'THIN' | 'INSUFFICIENT';

export const FL_STATE_WAVE_1 = {
  id: 'FL_STATE_WAVE_1' as const,
  publicationState: 'PUBLISHABLE' as const,
  indexable: false as const,
  robots: 'noindex, follow' as const,
  sitemapExcluded: true as const,
  apply: false as const,
};

export type Fl008CandidateSeed = {
  companyId: string;
  regulatoryId: string;
  cohortOrigin: 'FL-004' | 'FL-006' | string;
};

export type ReadinessInput = {
  companyId: string;
  slug: string | null;
  displayName: string;
  legalName: string;
  publicationState: string;
  indexable: boolean;
  fdacsRegulatoryId: string;
  fdacsAuthorityNumber: string;
  authorityType: string;
  authorityStatus: string;
  regulator: string;
  sourceProvenance: string | null;
  retrievedAt: string | null;
  expiration: string | null;
  physicalStreet: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  county: string | null;
  countyFips: string | null;
  countyVerification: string | null;
  phoneObservation: boolean;
  emailObservation: boolean;
  addressObservation: boolean;
  canonicalPhone: string | null;
  canonicalEmail: string | null;
  usdot: string | null;
  mcNumber: string | null;
  unresolvedDuplicate: boolean;
  unresolvedMultiStateCollision: boolean;
  brandOnlyIdentity: boolean;
  corporateFamilyDeferral: boolean;
  currentlyInCanary: boolean;
  cohortOrigin: string;
  asOf?: string;
};

export type ReadinessResult = {
  rulesetVersion: typeof FL_STATE_PUBLICATION_READINESS_V1;
  state: ReadinessState;
  reasons: string[];
  missingRequirements: string[];
  statusFreshness: StatusFreshness;
  consumerValue: ConsumerValue;
  federalIdLabel: 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA' | 'FEDERAL_ID_VERIFIED';
  indexableAuthorized: false;
  googlePlacesRequests: 0;
  trustScoreChanged: false;
  publicationMutation: false;
};

function dayStamp(iso: string): number {
  return Date.parse(`${iso.slice(0, 10)}T00:00:00Z`);
}

export function assessStatusFreshness(input: {
  status: string;
  expiration: string | null;
  retrievedAt: string | null;
  asOf: string;
}): StatusFreshness {
  if (String(input.status).toLowerCase() !== 'active') return 'STATUS_REFRESH_REQUIRED';
  const asOf = dayStamp(input.asOf);
  if (!Number.isFinite(asOf)) return 'STATUS_UNKNOWN';
  if (input.expiration) {
    const exp = dayStamp(input.expiration);
    if (Number.isFinite(exp) && exp < asOf) return 'STATUS_REFRESH_REQUIRED';
  }
  if (!input.retrievedAt) return 'STATUS_UNKNOWN';
  const retrieved = Date.parse(input.retrievedAt);
  if (!Number.isFinite(retrieved)) return 'STATUS_UNKNOWN';
  const ageDays = (asOf - retrieved) / 86_400_000;
  if (ageDays > FL_008_MAX_SNAPSHOT_AGE_DAYS) return 'STATUS_REFRESH_REQUIRED';
  return 'STATUS_FRESH';
}

export function evaluateConsumerValue(input: ReadinessInput): ConsumerValue {
  const name = normalizeLegalName(input.legalName) || input.displayName.trim();
  const permit = String(input.fdacsAuthorityNumber).toUpperCase().startsWith('IM');
  const address = Boolean(input.physicalStreet && input.city && input.zip);
  if (!name || !permit || !address) return 'INSUFFICIENT';
  const usableContact = input.phoneObservation || input.emailObservation;
  if (!usableContact) return 'THIN';
  return 'SUFFICIENT';
}

function finish(
  state: ReadinessState,
  input: ReadinessInput,
  reasons: string[],
  missing: string[],
  freshness: StatusFreshness,
  value: ConsumerValue
): ReadinessResult {
  return {
    rulesetVersion: FL_STATE_PUBLICATION_READINESS_V1,
    state,
    reasons,
    missingRequirements: missing,
    statusFreshness: freshness,
    consumerValue: value,
    federalIdLabel: input.usdot
      ? 'FEDERAL_ID_VERIFIED'
      : 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA',
    indexableAuthorized: false,
    googlePlacesRequests: 0,
    trustScoreChanged: false,
    publicationMutation: false,
  };
}

export function qualifyFloridaPublicationReadiness(input: ReadinessInput): ReadinessResult {
  const asOf = input.asOf ?? new Date().toISOString().slice(0, 10);
  const freshness = assessStatusFreshness({
    status: input.authorityStatus,
    expiration: input.expiration,
    retrievedAt: input.retrievedAt,
    asOf,
  });
  const value = evaluateConsumerValue(input);
  const missing: string[] = [];
  const reasons: string[] = [];

  if (!input.companyId?.trim() || !input.slug?.trim()) {
    missing.push('stable_canonical_id_or_slug');
    return finish('NOT_ELIGIBLE', input, ['Missing stable canonical company ID or slug.'], missing, freshness, value);
  }
  if (input.publicationState !== 'INGESTED' || input.indexable !== false) {
    missing.push('must_remain_ingested_indexable_false');
    return finish(
      'NOT_ELIGIBLE',
      input,
      [`Publication state ${input.publicationState} / indexable=${input.indexable} is outside the FL-008 INGESTED gate.`],
      missing,
      freshness,
      value
    );
  }
  if (input.currentlyInCanary) {
    return finish('NOT_ELIGIBLE', input, ['Already in the KEEP_80_NOINDEX canary.'], ['already_canary'], freshness, value);
  }

  const im = String(input.fdacsAuthorityNumber).toUpperCase();
  const type = String(input.authorityType).toLowerCase();
  if (!im.startsWith('IM') || (!type.includes('intrastate') && type !== 'im')) {
    missing.push('active_fdacs_im');
    return finish('NOT_ELIGIBLE', input, ['Florida IM mover registration is required.'], missing, freshness, value);
  }
  if (String(input.authorityStatus).toLowerCase() !== 'active') {
    missing.push('active_fdacs_status');
    return finish('NOT_ELIGIBLE', input, ['FDACS authority is not active.'], missing, freshness, value);
  }
  if (freshness === 'STATUS_REFRESH_REQUIRED' && input.expiration && dayStamp(input.expiration) < dayStamp(asOf)) {
    missing.push('fdacs_status_expired');
    return finish(
      'NOT_ELIGIBLE',
      input,
      ['FDACS expiration is in the past; cannot claim Registered / Active without a refresh.'],
      missing,
      freshness,
      value
    );
  }

  if (input.unresolvedDuplicate || input.unresolvedMultiStateCollision) {
    missing.push(input.unresolvedDuplicate ? 'unresolved_duplicate' : 'unresolved_multi_state');
    return finish(
      'REVIEW_REQUIRED',
      input,
      ['Unresolved identity collision; fail closed.'],
      missing,
      freshness,
      value
    );
  }
  const brandOnly =
    input.brandOnlyIdentity ||
    (isFranchiseOrNetworkBrandName(input.legalName) && !input.usdot);
  if (brandOnly) {
    return finish(
      'REVIEW_REQUIRED',
      input,
      ['Brand-only or franchise identity is not unique without a federal identifier.'],
      ['brand_only_identity'],
      freshness,
      value
    );
  }
  if (!normalizeLegalName(input.legalName) && !input.displayName.trim()) {
    return finish('NOT_ELIGIBLE', input, ['Usable business name is missing.'], ['usable_name'], freshness, value);
  }

  if (
    input.countyVerification !== 'COUNTY_VERIFIED' ||
    !input.county ||
    !input.countyFips
  ) {
    return finish(
      'REVIEW_REQUIRED',
      input,
      ['Home county is not COUNTY_VERIFIED from existing non-Google geography.'],
      ['county_verified'],
      freshness,
      value
    );
  }
  if (
    !input.physicalStreet?.trim() ||
    !input.city?.trim() ||
    !input.zip?.trim() ||
    String(input.state).toUpperCase() !== 'FL'
  ) {
    return finish(
      'REVIEW_REQUIRED',
      input,
      ['Physical Florida street, city, state, and ZIP are required.'],
      ['geography'],
      freshness,
      value
    );
  }

  if (input.corporateFamilyDeferral) {
    return finish(
      'DEFERRED',
      input,
      ['Technically sound identity, deferred from the first wave (corporate family / dual-credential presentation).'],
      ['first_wave_corporate_family'],
      freshness,
      value
    );
  }

  if (value === 'THIN' || value === 'INSUFFICIENT') {
    return finish(
      'HOLD_PROFILE_THIN',
      input,
      ['Identity and registration are present but the profile is name + permit + address only.'],
      ['usable_contact_observation'],
      freshness,
      value
    );
  }

  if (!input.addressObservation) missing.push('address_observation');
  reasons.push(
    'Active Florida IM intrastate mover registration with verified identity, COUNTY_VERIFIED geography, and usable FDACS contact evidence.'
  );
  reasons.push('PUBLISHABLE readiness does not authorize INDEXABLE / sitemap / SEO expansion.');
  if (!input.usdot) {
    reasons.push("No federal mover identifier is currently linked in MoveTrustHub's data.");
  }
  return finish('READY_FOR_PUBLISHABLE_CANARY', input, reasons, missing, freshness, value);
}

export function buildFl008Cohort(
  fl004Rows: readonly Fl004ManifestRow[],
  extras: readonly string[] = FL_008_POST_FL004_ADDITIONS
): Fl008CandidateSeed[] {
  const allowedExtras = new Set<string>(FL_008_POST_FL004_ADDITIONS);
  const seeds: Fl008CandidateSeed[] = [];
  const seen = new Set<string>();
  for (const row of fl004Rows) {
    if (row.action !== 'INSERT') continue;
    if (seen.has(row.intended_company_id)) continue;
    seen.add(row.intended_company_id);
    seeds.push({
      companyId: row.intended_company_id,
      regulatoryId: row.regulatory_id,
      cohortOrigin: 'FL-004',
    });
  }
  for (const id of extras) {
    if (!allowedExtras.has(id) || seen.has(id)) continue;
    seen.add(id);
    seeds.push({
      companyId: id,
      regulatoryId: `FL-FDACS-${id.replace(/^fl-/, '').toUpperCase().replace('-', '-')}`,
      cohortOrigin: 'FL-006',
    });
  }
  return seeds.sort((a, b) => a.companyId.localeCompare(b.companyId));
}

export function hashFl008Manifest(rows: readonly Fl008CandidateSeed[]): string {
  const payload = [...rows]
    .map((r) => `${r.companyId}|${r.regulatoryId}|${r.cohortOrigin}`)
    .sort()
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

export function simulatePublishableNoindexSurface(company: {
  publicationState: 'PUBLISHABLE' | 'INGESTED';
  indexable: boolean;
}): {
  anonymousProfileRenders: boolean;
  robots: 'noindex, follow';
  sitemapIncluded: boolean;
  seoIndexable: boolean;
  directorySearchIncluded: boolean;
  authorizedDiscoveryOnly: boolean;
  indexableFlag: boolean;
} {
  const pub = {
    publicationState: company.publicationState,
    indexable: company.indexable,
  };
  return {
    anonymousProfileRenders: isAnonymousPublicProfileAllowed(pub),
    robots: 'noindex, follow',
    sitemapIncluded: isSeoIndexableCompany(pub),
    seoIndexable: isSeoIndexableCompany(pub),
    directorySearchIncluded: isConsumerVisibleCompany(pub),
    authorizedDiscoveryOnly: true,
    indexableFlag: company.indexable,
  };
}

export function simulateStateOnlyStructuredData(input: {
  name: string;
  slug: string;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  usdot: string | null;
  reviewCount: number;
  avgRating: number;
  fdacsNumber: string;
  serviceAreaClaimed: boolean;
  emitUnsupportedRating?: boolean;
  emitUnevidencedUsdot?: string | null;
}): {
  ok: boolean;
  hasAggregateRating: boolean;
  hasUsdot: boolean;
  hasAreaServed: boolean;
  hasFdacsRegistration: boolean;
  bannedClaims: string[];
  graph: Record<string, unknown>;
} {
  const banned: string[] = [];
  const hasAggregateRating = Boolean(input.emitUnsupportedRating && input.reviewCount > 0);
  const unevidencedUsdot = Boolean(input.emitUnevidencedUsdot && !input.usdot);
  const hasUsdot = Boolean(input.usdot) || unevidencedUsdot;
  const hasAreaServed = Boolean(input.serviceAreaClaimed);
  if (hasAggregateRating) banned.push('aggregate_rating');
  if (unevidencedUsdot) banned.push('unevidenced_usdot');
  if (hasAreaServed) banned.push('unevidenced_area_served');

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

  const graph = {
    '@type': ['LocalBusiness', 'MovingCompany'],
    name: input.name,
    url: `/companies/${input.slug}`,
    additionalProperty,
  };

  return {
    ok: banned.length === 0,
    hasAggregateRating,
    hasUsdot: Boolean(input.usdot),
    hasAreaServed: false,
    hasFdacsRegistration: true,
    bannedClaims: banned,
    graph,
  };
}

export function evaluatePresentationLayout(input: {
  displayName: string;
  hasEmail: boolean;
  hasPhone: boolean;
  address: string;
  fdacsNumber: string;
  usdot: string | null;
  statusLabel: string;
  viewport: 'mobile' | 'desktop';
  showUsdotAsFdacs?: boolean;
}): {
  overflowRisk: boolean;
  confusingLabels: boolean;
  duplicatedCredentials: boolean;
  inaccessibleStatus: boolean;
} {
  const overflowRisk = input.displayName.length > 32 || input.address.length > 48;
  const duplicatedCredentials = Boolean(
    input.showUsdotAsFdacs || (input.usdot && input.usdot === input.fdacsNumber)
  );
  const confusingLabels = /approved|certified|trusthub endorsement/i.test(input.statusLabel);
  return {
    overflowRisk,
    confusingLabels,
    duplicatedCredentials,
    inaccessibleStatus: !input.statusLabel.trim(),
  };
}
