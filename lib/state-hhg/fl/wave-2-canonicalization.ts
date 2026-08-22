/**
 * FL-011C — classify ACTIVE FDACS IM records that lack a safe fl-im-* company.
 * Read-only. Google Places: 0. Does not insert or link.
 */
import { createHash } from 'node:crypto';
import { buildStateOnlyCompanyId } from '@/lib/state-hhg/canonicalization/ids';
import {
  matchStateRegistryIdentity,
  type CanonicalProviderIdentity,
  type StateIdentitySubject,
  type StateMatchMethod,
} from '@/lib/state-hhg/identity';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';
import { corporateForm, classifyMultiStateEntity } from '@/lib/state-hhg/multi-state-entity';
import { assessStatusFreshness } from '@/lib/state-hhg/fl/publication-readiness';
import { FL_009_DEFERRED_COMPANY_ID } from '@/lib/state-hhg/fl/wave-1';

export const FL_011C_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT =
  'FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT' as const;
export const FL_STATE_ACTIVE_IM_CANONICALIZATION_GAP_V1 =
  'FL_STATE_ACTIVE_IM_CANONICALIZATION_GAP_V1' as const;

export const GAP_CLASSES = [
  'EXISTING_CANONICAL_LINK_READY',
  'NEW_CANONICAL_COMPANY_READY',
  'CORPORATE_FAMILY_REVIEW',
  'POSSIBLE_DUPLICATE',
  'REVIEW_REQUIRED',
  'CONFLICT',
  'SOURCE_STATUS_BLOCKED',
] as const;
export type GapClass = (typeof GAP_CLASSES)[number];

export type GapSubject = {
  fdacsIm: string;
  legalName: string | null;
  dba: string | null;
  status: string;
  expiration: string | null;
  retrievedAt: string | null;
  physicalAddress: string | null;
  city: string | null;
  postalCode: string | null;
  phone: string | null;
  email: string | null;
  usdot: string | null;
  county: string | null;
};

export type GapClassification = {
  fdacsIm: string;
  classification: GapClass;
  statusFreshness: ReturnType<typeof assessStatusFreshness> | 'ACTIVE_FRESH' | 'NO_LONGER_ACTIVE' | 'STATUS_CONFLICT';
  matchMethod: StateMatchMethod | 'none';
  matchedCompanyId: string | null;
  proposedCompanyId: string | null;
  reasons: string[];
  evidence: Record<string, unknown>;
  googlePlacesRequests: 0;
};

export type CanonicalizationDraftOp = {
  op: 'LINK_EXISTING_CANONICAL' | 'INSERT_NEW_CANONICAL';
  fdacsIm: string;
  sourceLegalName: string | null;
  dba: string | null;
  canonicalCompanyId: string | null;
  proposedCompanyId: string | null;
  sourceAddress: string | null;
  sourcePhone: string | null;
  sourceEmail: string | null;
  evidenceMethod: string;
  ruleset: typeof FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT;
  intendedPublicationState: 'INGESTED';
  intendedIndexable: false;
  rollbackOp: 'DETACH_PSA' | 'DELETE_INGESTED_COMPANY';
};

const STRONG_LINK: ReadonlySet<StateMatchMethod> = new Set([
  'exact_usdot',
  'exact_prior_state_authority',
  'exact_legal_name_and_address',
  'exact_legal_name_and_phone',
  'exact_legal_name_and_email',
  'exact_dba_and_corroboration',
]);

export function proposedImCompanyId(fdacsIm: string): string {
  return buildStateOnlyCompanyId('FL', fdacsIm);
}

export function classifyActiveImGap(input: {
  subject: GapSubject;
  candidates: readonly CanonicalProviderIdentity[];
  existingImCompanyIds: ReadonlySet<string>;
  wave1Ids: ReadonlySet<string>;
  keep80Ids: ReadonlySet<string>;
  asOf: string;
}): GapClassification {
  const im = input.subject.fdacsIm.toUpperCase();
  const proposed = proposedImCompanyId(im);
  const reasons: string[] = [];
  const status = String(input.subject.status || 'unknown').toLowerCase();

  if (status !== 'active') {
    return finish(im, 'SOURCE_STATUS_BLOCKED', 'NO_LONGER_ACTIVE', 'none', null, proposed, [
      `source_status_${status}`,
    ]);
  }

  const freshness = assessStatusFreshness({
    status: 'active',
    expiration: input.subject.expiration,
    retrievedAt: input.subject.retrievedAt,
    asOf: input.asOf,
  });
  if (freshness === 'STATUS_REFRESH_REQUIRED' || freshness === 'STATUS_UNKNOWN') {
    return finish(im, 'SOURCE_STATUS_BLOCKED', freshness, 'none', null, proposed, [
      `freshness_${freshness}`,
    ]);
  }

  if (input.existingImCompanyIds.has(proposed) || input.wave1Ids.has(proposed) || proposed === FL_009_DEFERRED_COMPANY_ID) {
    return finish(im, 'CONFLICT', 'ACTIVE_FRESH', 'none', proposed, proposed, [
      'proposed_fl_im_id_already_exists',
    ]);
  }

  const identitySubject: StateIdentitySubject = {
    legalName: input.subject.legalName,
    dba: input.subject.dba,
    usdot: input.subject.usdot,
    phone: input.subject.phone,
    email: input.subject.email,
    physicalAddress: input.subject.physicalAddress,
    city: input.subject.city,
    postalCode: input.subject.postalCode,
    statusNormalized: 'active',
    roleClass: 'mover',
    authorityNumber: im,
  };

  const match = matchStateRegistryIdentity(identitySubject, input.candidates);

  if (match.disposition === 'MATCHED_EXISTING' && match.matchedCompanyId && STRONG_LINK.has(match.matchMethod)) {
    if (input.wave1Ids.has(match.matchedCompanyId)) {
      return finish(im, 'REVIEW_REQUIRED', 'ACTIVE_FRESH', match.matchMethod, match.matchedCompanyId, proposed, [
        'strong_match_is_wave1_member_do_not_mutate_observation_cohort',
      ], match.evidence);
    }
    if (input.keep80Ids.has(match.matchedCompanyId)) {
      return finish(im, 'REVIEW_REQUIRED', 'ACTIVE_FRESH', match.matchMethod, match.matchedCompanyId, proposed, [
        'strong_match_is_keep80_member',
      ], match.evidence);
    }
    const hit = input.candidates.find((c) => c.companyId === match.matchedCompanyId);
    if (hit) {
      const multi = classifyMultiStateEntity({
        subject: { legalName: input.subject.legalName, dba: input.subject.dba, usdot: input.subject.usdot, phone: input.subject.phone, email: input.subject.email, physicalAddress: input.subject.physicalAddress, stateCode: 'FL' },
        candidate: { legalName: hit.legalName, dba: hit.dbaName, usdot: hit.usdot, phone: hit.phone, email: hit.email, physicalAddress: hit.address },
      });
      if (multi.state === 'DISTINCT_LEGAL_ENTITIES') {
        return finish(im, 'CONFLICT', 'ACTIVE_FRESH', match.matchMethod, hit.companyId, proposed, multi.reasons, {
          ...match.evidence,
          multiState: multi.state,
        });
      }
      if (multi.state === 'CORPORATE_FAMILY_RELATED' || match.franchiseSafetyHold) {
        return finish(im, 'CORPORATE_FAMILY_REVIEW', 'ACTIVE_FRESH', match.matchMethod, hit.companyId, proposed, [
          'corporate_or_franchise_family_not_auto_same_entity',
        ], match.evidence);
      }
    }
    return finish(im, 'EXISTING_CANONICAL_LINK_READY', 'ACTIVE_FRESH', match.matchMethod, match.matchedCompanyId, proposed, [
      'strong_deterministic_link',
    ], match.evidence);
  }

  if (match.reviewReason === 'name_similarity_insufficient_without_corroboration' || match.reviewReason === 'dba_without_unique_corroboration') {
    return finish(im, 'POSSIBLE_DUPLICATE', 'ACTIVE_FRESH', 'none', null, proposed, [
      match.reviewReason,
    ], match.evidence);
  }

  if (
    match.franchiseSafetyHold ||
    match.reviewReason === 'franchise_or_network_brand_fail_closed' ||
    isFranchiseOrNetworkBrandName(input.subject.legalName) ||
    isFranchiseOrNetworkBrandName(input.subject.dba)
  ) {
    return finish(im, 'CORPORATE_FAMILY_REVIEW', 'ACTIVE_FRESH', 'none', match.matchedCompanyId, proposed, [
      'franchise_or_network_brand_fail_closed',
    ], match.evidence);
  }

  if (match.disposition === 'REVIEW_REQUIRED') {
    const cls =
      String(match.reviewReason || '').includes('collision') || String(match.reviewReason || '').includes('usdot')
        ? 'CONFLICT'
        : 'REVIEW_REQUIRED';
    return finish(im, cls, 'ACTIVE_FRESH', 'none', match.matchedCompanyId, proposed, [
      match.reviewReason || 'review_required',
    ], match.evidence);
  }

  const hasName = Boolean(input.subject.legalName?.trim());
  const hasPlace = Boolean(input.subject.physicalAddress?.trim() && input.subject.city && input.subject.postalCode);
  const hasPhone = Boolean(input.subject.phone?.trim());
  if (match.disposition === 'NEW_PROVIDER_CANDIDATE' && hasName && (hasPlace || hasPhone)) {
    return finish(im, 'NEW_CANONICAL_COMPANY_READY', 'ACTIVE_FRESH', 'none', null, proposed, [
      'no_existing_canonical_match_sufficient_official_identity',
    ]);
  }

  reasons.push(match.reviewReason || 'insufficient_official_identity');
  return finish(im, 'REVIEW_REQUIRED', 'ACTIVE_FRESH', 'none', null, proposed, reasons, match.evidence);
}

function finish(
  fdacsIm: string,
  classification: GapClass,
  statusFreshness: GapClassification['statusFreshness'],
  matchMethod: StateMatchMethod | 'none',
  matchedCompanyId: string | null,
  proposedCompanyId: string | null,
  reasons: string[],
  evidence: Record<string, unknown> = {}
): GapClassification {
  return {
    fdacsIm,
    classification,
    statusFreshness,
    matchMethod,
    matchedCompanyId,
    proposedCompanyId,
    reasons,
    evidence,
    googlePlacesRequests: 0,
  };
}

export function hashCanonicalizationDraft(ops: readonly CanonicalizationDraftOp[]): string {
  const payload = [...ops]
    .map((o) => `${o.op}|${o.fdacsIm}|${o.canonicalCompanyId ?? ''}|${o.proposedCompanyId ?? ''}`)
    .sort()
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

export function toDraftOp(row: GapClassification, subject: GapSubject): CanonicalizationDraftOp | null {
  if (row.classification === 'EXISTING_CANONICAL_LINK_READY' && row.matchedCompanyId) {
    return {
      op: 'LINK_EXISTING_CANONICAL',
      fdacsIm: row.fdacsIm,
      sourceLegalName: subject.legalName,
      dba: subject.dba,
      canonicalCompanyId: row.matchedCompanyId,
      proposedCompanyId: null,
      sourceAddress: subject.physicalAddress,
      sourcePhone: subject.phone,
      sourceEmail: subject.email,
      evidenceMethod: String(row.matchMethod),
      ruleset: FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT,
      intendedPublicationState: 'INGESTED',
      intendedIndexable: false,
      rollbackOp: 'DETACH_PSA',
    };
  }
  if (row.classification === 'NEW_CANONICAL_COMPANY_READY' && row.proposedCompanyId) {
    return {
      op: 'INSERT_NEW_CANONICAL',
      fdacsIm: row.fdacsIm,
      sourceLegalName: subject.legalName,
      dba: subject.dba,
      canonicalCompanyId: null,
      proposedCompanyId: row.proposedCompanyId,
      sourceAddress: subject.physicalAddress,
      sourcePhone: subject.phone,
      sourceEmail: subject.email,
      evidenceMethod: 'new_canonical_from_official_fdacs_im',
      ruleset: FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT,
      intendedPublicationState: 'INGESTED',
      intendedIndexable: false,
      rollbackOp: 'DELETE_INGESTED_COMPANY',
    };
  }
  return null;
}
