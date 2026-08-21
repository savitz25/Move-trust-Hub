/**
 * FL-004 — controlled internal canonicalization of FL_HHG_PUBLICATION_V1.
 * Reuses 011D state-only IDs/slugs. publication_state=INGESTED, indexable=false.
 * Google Places requests: 0. Not a public launch.
 */

import { createHash } from 'node:crypto';
import {
  allocateCompanySlug,
  buildDisplayName,
  buildStateOnlyCompanyId,
} from '@/lib/state-hhg/canonicalization/ids';
import { isConsumerVisibleCompany, isSeoIndexableCompany } from '@/lib/provider/publication';
import { parseFdacsRegulatoryId } from '@/lib/state-hhg/fl/regulatory-id';
import { FL_003_SAFETY, FL_PUBLICATION_RULESET_VERSION } from '@/lib/state-hhg/fl/publication-v1';

export const FL_004_TASK = 'FL-004' as const;
export const FL_004_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_004_PUBLICATION_STATE = 'INGESTED' as const;
export const FL_004_INDEXABLE = false as const;

export const FL_004_SAFETY = {
  ...FL_003_SAFETY,
  googlePlacesRequests: 0 as const,
  livePublication: false as const,
  indexable: false as const,
  publicationState: 'INGESTED' as const,
  canaryMembershipChanged: false as const,
  rulesetVersion: FL_PUBLICATION_RULESET_VERSION,
};

export type EligibilityRow = {
  regulatory_id: string;
  candidate_company_key: string;
  publication_status: string;
  eligibility_reason: string;
  legal_name: string;
  dba: string | null;
  registration_type: string;
  registration_status: string;
  status_raw: string | null;
  expiration: string | null;
  phone: string | null;
  email: string | null;
  physical_address: string | null;
  city: string | null;
  zip: string | null;
  county: string | null;
  county_fips: string | null;
  county_resolution_status: string | null;
  existing_company_id: string | null;
  existing_publication_state: string | null;
  match_decision: string | null;
  match_method: string | null;
  collision: string | null;
  federal_id_label: string | null;
  source_provenance: string | null;
  ruleset_version: string;
};

export type Fl004Action = 'INSERT' | 'LINK' | 'HOLD' | 'SKIP_ALREADY_CANONICAL';

export type Fl004ManifestRow = {
  regulatory_id: string;
  fdacs_im_number: string;
  legal_name: string;
  dba: string | null;
  registration_status: string;
  physical_address: string | null;
  city: string | null;
  zip: string | null;
  county: string | null;
  county_fips: string | null;
  county_verification: string | null;
  phone: string | null;
  email: string | null;
  qualification_result: string;
  ruleset_version: string;
  collision: string | null;
  match_method: string | null;
  intended_company_id: string;
  intended_slug: string | null;
  publication_state: 'INGESTED';
  indexable: false;
  federal_id_label: string;
  source_provenance: string | null;
  action: Fl004Action;
  hold_reason: string | null;
  existing_company_id: string | null;
  google_places_requests: 0;
};

export function authorityNumberFromRegulatoryId(regulatoryId: string): string | null {
  const parsed = parseFdacsRegulatoryId(regulatoryId);
  if (!parsed || parsed.kind !== 'IM') return null;
  return `IM${parsed.number}`;
}

export function intendedCompanyIdFor(regulatoryId: string): string | null {
  const auth = authorityNumberFromRegulatoryId(regulatoryId);
  if (!auth) return null;
  return buildStateOnlyCompanyId('FL', auth);
}

const STRONG_LINK_METHODS = new Set([
  'exact_usdot',
  'exact_prior_state_authority',
  'exact_legal_name_and_address',
  'exact_legal_name_and_phone',
  'exact_legal_name_and_email',
  'exact_dba_and_corroboration',
]);

export function classifyFl004Action(row: EligibilityRow): {
  action: Fl004Action;
  holdReason: string | null;
} {
  if (row.publication_status === 'PUBLICATION_READY') {
    return { action: 'INSERT', holdReason: null };
  }
  if (row.publication_status === 'EXISTING_PROVIDER_LINK_CANDIDATE') {
    if (row.match_decision !== 'VERIFIED' || !STRONG_LINK_METHODS.has(String(row.match_method))) {
      return { action: 'HOLD', holdReason: 'link_evidence_not_strong' };
    }
    if (!row.existing_company_id) {
      return { action: 'HOLD', holdReason: 'missing_existing_company_id' };
    }
    const existing = row.existing_company_id.toLowerCase();
    if (existing.startsWith('wa-') || existing.startsWith('wa_')) {
      return {
        action: 'HOLD',
        holdReason: 'florida_im_matched_out_of_state_company_ambiguous',
      };
    }
    return { action: 'LINK', holdReason: null };
  }
  return { action: 'HOLD', holdReason: `not_in_fl004_scope:${row.publication_status}` };
}

export function freezeFl004Manifest(
  rows: EligibilityRow[],
  ctx: { takenIds: Set<string>; takenSlugs: Set<string> }
): Fl004ManifestRow[] {
  const takenSlugs = new Set(ctx.takenSlugs);
  const takenIds = new Set(ctx.takenIds);
  const out: Fl004ManifestRow[] = [];

  for (const row of rows) {
    if (
      row.publication_status !== 'PUBLICATION_READY' &&
      row.publication_status !== 'EXISTING_PROVIDER_LINK_CANDIDATE'
    ) {
      continue;
    }
    const auth = authorityNumberFromRegulatoryId(row.regulatory_id);
    const intendedId = intendedCompanyIdFor(row.regulatory_id);
    if (!auth || !intendedId) continue;

    let { action, holdReason } = classifyFl004Action(row);
    let slug: string | null = null;

    if (action === 'INSERT') {
      if (takenIds.has(intendedId) || row.existing_company_id) {
        action = 'SKIP_ALREADY_CANONICAL';
        holdReason = `company_id_exists:${intendedId}`;
      } else if (row.county_resolution_status !== 'COUNTY_VERIFIED' || !row.county_fips) {
        action = 'HOLD';
        holdReason = 'county_not_verified';
      } else {
        const display = buildDisplayName(row.legal_name, row.dba);
        const allocated = allocateCompanySlug({
          displayName: display,
          stateCode: 'FL',
          authorityNumber: auth,
          takenSlugs,
        });
        slug = allocated.slug;
        takenSlugs.add(slug);
        takenIds.add(intendedId);
      }
    }

    out.push({
      regulatory_id: row.regulatory_id,
      fdacs_im_number: auth,
      legal_name: row.legal_name,
      dba: row.dba,
      registration_status: row.registration_status,
      physical_address: row.physical_address,
      city: row.city,
      zip: row.zip,
      county: row.county,
      county_fips: row.county_fips,
      county_verification: row.county_resolution_status,
      phone: row.phone,
      email: row.email,
      qualification_result: row.publication_status,
      ruleset_version: row.ruleset_version || FL_PUBLICATION_RULESET_VERSION,
      collision: row.collision,
      match_method: row.match_method,
      intended_company_id: action === 'LINK' ? row.existing_company_id! : intendedId,
      intended_slug: slug,
      publication_state: FL_004_PUBLICATION_STATE,
      indexable: FL_004_INDEXABLE,
      federal_id_label: row.federal_id_label || 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA',
      source_provenance: row.source_provenance,
      action,
      hold_reason: holdReason,
      existing_company_id: row.existing_company_id,
      google_places_requests: 0,
    });
  }
  return out.sort((a, b) => a.regulatory_id.localeCompare(b.regulatory_id));
}

export function hashFl004Manifest(rows: Fl004ManifestRow[]): string {
  const payload = rows
    .map(
      (r) =>
        `${r.regulatory_id}|${r.action}|${r.intended_company_id}|${r.intended_slug ?? ''}|${r.publication_state}|${r.indexable}`
    )
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

export function assertManifestBound(
  requestedIds: readonly string[],
  allowedIds: readonly string[]
): { ok: true } | { ok: false; rejected: string[] } {
  const allowed = new Set(allowedIds);
  const rejected = requestedIds.filter((id) => !allowed.has(id));
  if (rejected.length) return { ok: false, rejected };
  return { ok: true };
}

export function fl004PublicExposure(company: {
  publicationState?: string | null;
  indexable?: boolean | null;
}): {
  consumerVisible: boolean;
  seoIndexable: boolean;
} {
  return {
    consumerVisible: isConsumerVisibleCompany({
      publicationState: company.publicationState as 'INGESTED',
    }),
    seoIndexable: isSeoIndexableCompany({
      publicationState: company.publicationState as 'INGESTED',
      indexable: company.indexable === true,
    }),
  };
}

export function neverInventFederalId(label: string): boolean {
  return label !== 'NO_USDOT_EXISTS' && !/no usdot exists/i.test(label);
}
