/**
 * FL-011D — internal Florida state canonicalization Wave.
 * INGESTED / indexable=false. apply is manifest-bound. Google Places: 0.
 */
import { createHash } from 'node:crypto';
import { shouldRenderFloridaStateWaveChrome } from '@/lib/state-hhg/fl/wave-1';
import {
  classifyActiveImGap,
  hashCanonicalizationDraft,
  proposedImCompanyId,
  type CanonicalizationDraftOp,
  type GapSubject,
} from '@/lib/state-hhg/fl/wave-2-canonicalization';
import type { CanonicalProviderIdentity } from '@/lib/state-hhg/identity';
import { isAnonymousCompanyNotFound } from '@/lib/provider/anonymous-company-route';
import { isConsumerVisibleCompany, isSeoIndexableCompany } from '@/lib/provider/publication';

export const FL_011D_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_011D_CONSUMER_PII = 0 as const;
export const FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1 =
  'FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1' as const;
export const FL_011C_DRAFT_HASH = '491de1629fa00c44' as const;
export const FL_011D_EXPECTED_LINK = 81 as const;
export const FL_011D_EXPECTED_INSERT = 32 as const;
export const FL_011D_EXPECTED_TOTAL = 113 as const;
export const FL_011D_WITHHELD = 168 as const;
export const FL_011D_MATCH_METHOD_PREFIX = 'fl011d:' as const;
export const FL_011D_TASK = 'FL-011D' as const;

export const FL_011D_MUTATION_TABLES = [
  'companies',
  'provider_state_authority',
  'provider_contact_observation',
] as const;

export const FL_011D_FORBIDDEN_TABLES = [
  'county_regulatory_program',
  'provider_county_credential',
  'local_hhg_canary_publication',
] as const;

export const EXISTING_COMPANY_IMMUTABLE_FIELDS = [
  'id',
  'slug',
  'name',
  'fmcsa_legal_name',
  'publication_state',
  'indexable',
  'phone',
  'email',
  'physical_address',
  'website',
] as const;

export const ACCEPTED_LINK_EVIDENCE = [
  'exact_legal_name_and_phone',
  'exact_legal_name_and_email',
] as const;

export type PsaPlanAction = 'INSERT_REQUIRED' | 'ALREADY_EXISTS' | 'ATTACH_ORPHAN' | 'COLLISION';
export type ContactPlanAction = 'INSERT' | 'ATTACH' | 'NOOP' | 'COLLISION';
export type ContactKind = 'business_phone' | 'business_email' | 'physical_address';

export type FinalCanonicalizationOp = {
  op: 'LINK_EXISTING_CANONICAL' | 'INSERT_NEW_CANONICAL';
  fdacsIm: string;
  fdacsLegalName: string | null;
  dba: string | null;
  companyId: string;
  slug: string;
  existingOrNew: 'existing' | 'new';
  identityEvidence: string;
  identityRuleset: typeof FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1;
  officialSourceStatus: string;
  sourceFreshness: string;
  sourcePhone: string | null;
  sourceEmail: string | null;
  sourceAddress: string | null;
  currentPublicationState: string | null;
  intendedPublicationState: 'INGESTED' | string;
  currentIndexable: boolean | null;
  intendedIndexable: false;
  stateAuthorityOperation: PsaPlanAction | 'PENDING';
  contactObservationOperation: 'SAFE_SOURCE_OBSERVATION' | 'DEFERRED' | 'PENDING';
  rollbackOperation: 'DETACH_FL011D_PSA' | 'DELETE_INGESTED_COMPANY';
};

export type LiveCompanyRow = CanonicalProviderIdentity & {
  slug: string;
  website?: string | null;
};

export type LivePsaRow = {
  id: string;
  companyId: string | null;
  authorityNumber: string;
  rawSourceKey: string;
  status?: string | null;
  verificationState?: string | null;
};

function isCurrentPsa(row: LivePsaRow): boolean {
  const status = String(row.status ?? '').toLowerCase();
  const vs = String(row.verificationState ?? '').toLowerCase();
  if (status === 'expired' || vs === 'historical') return false;
  return true;
}

export type LiveObservationRow = {
  regulatoryId: string;
  observationType: ContactKind;
  companyId: string | null;
  normalizedValue: string | null;
};

export function draftMembershipHash(ops: readonly CanonicalizationDraftOp[]): string {
  return hashCanonicalizationDraft(ops);
}

export function assertExactDraftMembership(ops: readonly CanonicalizationDraftOp[]): {
  ok: true;
  link: number;
  insert: number;
  hash: string;
} {
  const link = ops.filter((o) => o.op === 'LINK_EXISTING_CANONICAL').length;
  const insert = ops.filter((o) => o.op === 'INSERT_NEW_CANONICAL').length;
  const hash = draftMembershipHash(ops);
  if (ops.length !== FL_011D_EXPECTED_TOTAL) {
    throw new Error(`REFUSAL — draft total ${ops.length} != ${FL_011D_EXPECTED_TOTAL}`);
  }
  if (link !== FL_011D_EXPECTED_LINK || insert !== FL_011D_EXPECTED_INSERT) {
    throw new Error(`REFUSAL — draft split ${link}/${insert} != ${FL_011D_EXPECTED_LINK}/${FL_011D_EXPECTED_INSERT}`);
  }
  if (hash !== FL_011C_DRAFT_HASH) {
    throw new Error(`REFUSAL — draft hash ${hash} != ${FL_011C_DRAFT_HASH}`);
  }
  const ims = new Set(ops.map((o) => o.fdacsIm));
  if (ims.size !== ops.length) throw new Error('REFUSAL — duplicate FDACS IM in draft');
  return { ok: true, link, insert, hash };
}

export function hashFinalManifest(ops: readonly FinalCanonicalizationOp[]): string {
  const payload = [...ops]
    .map(
      (o) =>
        `${o.op}|${o.fdacsIm}|${o.companyId}|${o.slug}|${o.intendedPublicationState}|${String(o.intendedIndexable)}`
    )
    .sort()
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

export function fl011dMatchMethod(evidence: string): string {
  return `${FL_011D_MATCH_METHOD_PREFIX}${evidence}`;
}

export function isFl011dMatchMethod(method: string | null | undefined): boolean {
  return Boolean(method && method.startsWith(FL_011D_MATCH_METHOD_PREFIX));
}

export function unauthorizedFdacsChromeRisk(company: {
  id: string;
  publicationState?: string | null;
}): boolean {
  return shouldRenderFloridaStateWaveChrome({
    id: company.id,
    publicationState: company.publicationState,
  });
}

/** Linking PSA to a non-Wave-1 company must not render FDACS chrome. */
export function publicExposureGateForExistingLink(company: {
  id: string;
  publicationState?: string | null;
}): { pass: boolean; reason: string } {
  if (unauthorizedFdacsChromeRisk(company)) {
    return {
      pass: false,
      reason: 'target_is_wave1_publishable_fdacs_chrome_would_apply',
    };
  }
  return { pass: true, reason: 'fdacs_chrome_gated_to_wave1_publishable_only' };
}

export function newCompanyPublicExposure(company: {
  publicationState: string;
  indexable: boolean;
}): {
  consumerVisible: boolean;
  seoIndexable: boolean;
  anonymousHttp: 200 | 404;
} {
  const row = {
    publicationState: company.publicationState as 'INGESTED',
    indexable: company.indexable,
  };
  return {
    consumerVisible: isConsumerVisibleCompany(row),
    seoIndexable: isSeoIndexableCompany(row),
    anonymousHttp: isAnonymousCompanyNotFound(row) ? 404 : 200,
  };
}

export function canonicalContactOverwriteForbidden(
  before: Record<string, unknown>,
  after: Record<string, unknown>
): boolean {
  for (const field of EXISTING_COMPANY_IMMUTABLE_FIELDS) {
    if (String(before[field] ?? '') !== String(after[field] ?? '')) return true;
  }
  return false;
}

export function planPsaAction(input: {
  fdacsIm: string;
  companyId: string;
  existing: readonly LivePsaRow[];
}): { action: PsaPlanAction; reason: string } {
  const im = input.fdacsIm.toUpperCase();
  const current = input.existing.filter(
    (r) => r.authorityNumber.toUpperCase() === im && isCurrentPsa(r)
  );
  const other = current.find((r) => r.companyId && r.companyId !== input.companyId);
  if (other) {
    return { action: 'COLLISION', reason: `im_already_attached_to_${other.companyId}` };
  }
  if (current.some((r) => r.companyId === input.companyId)) {
    return { action: 'ALREADY_EXISTS', reason: 'exact_authority_already_present' };
  }
  if (current.some((r) => !r.companyId)) {
    return { action: 'ATTACH_ORPHAN', reason: 'orphan_active_psa_attach' };
  }
  return { action: 'INSERT_REQUIRED', reason: 'no_existing_current_psa' };
}

export function planContactAction(input: {
  regulatoryId: string;
  kind: ContactKind;
  companyId: string;
  existing: readonly LiveObservationRow[];
}): { action: ContactPlanAction; reason: string } {
  const hit = input.existing.find(
    (r) => r.regulatoryId === input.regulatoryId && r.observationType === input.kind
  );
  if (!hit) return { action: 'INSERT', reason: 'no_existing_observation' };
  if (hit.companyId && hit.companyId !== input.companyId) {
    return { action: 'COLLISION', reason: `observation_owned_by_${hit.companyId}` };
  }
  if (hit.companyId === input.companyId) return { action: 'NOOP', reason: 'exact_existing' };
  return { action: 'ATTACH', reason: 'observation_company_id_null' };
}

export function revalidateDraftOp(input: {
  draft: CanonicalizationDraftOp;
  subject: GapSubject;
  candidates: readonly CanonicalProviderIdentity[];
  existingImCompanyIds: ReadonlySet<string>;
  wave1Ids: ReadonlySet<string>;
  keep80Ids: ReadonlySet<string>;
  asOf: string;
  liveCompany: LiveCompanyRow | null;
  takenIds: ReadonlySet<string>;
  psa: readonly LivePsaRow[];
}): { pass: boolean; failures: string[] } {
  const failures: string[] = [];
  const classified = classifyActiveImGap({
    subject: input.subject,
    candidates: input.candidates,
    existingImCompanyIds: input.existingImCompanyIds,
    wave1Ids: input.wave1Ids,
    keep80Ids: input.keep80Ids,
    asOf: input.asOf,
  });

  if (input.draft.op === 'LINK_EXISTING_CANONICAL') {
    if (classified.classification !== 'EXISTING_CANONICAL_LINK_READY') {
      failures.push(`link_class_now_${classified.classification}`);
    }
    if (classified.matchedCompanyId !== input.draft.canonicalCompanyId) {
      failures.push(
        `matched_company_drift_${classified.matchedCompanyId}_vs_${input.draft.canonicalCompanyId}`
      );
    }
    if (!ACCEPTED_LINK_EVIDENCE.includes(classified.matchMethod as (typeof ACCEPTED_LINK_EVIDENCE)[number])) {
      failures.push(`evidence_not_accepted_${classified.matchMethod}`);
    }
    if (!input.liveCompany) failures.push('target_company_missing');
    if (input.liveCompany && input.wave1Ids.has(input.liveCompany.companyId)) {
      failures.push('wave1_overlap');
    }
    if (input.liveCompany && input.keep80Ids.has(input.liveCompany.companyId)) {
      failures.push('keep80_overlap');
    }
    if (input.liveCompany) {
      const exp = publicExposureGateForExistingLink({
        id: input.liveCompany.companyId,
        publicationState: input.liveCompany.publicationState,
      });
      if (!exp.pass) failures.push(exp.reason);
    }
    const psaPlan = planPsaAction({
      fdacsIm: input.draft.fdacsIm,
      companyId: input.draft.canonicalCompanyId ?? '',
      existing: input.psa,
    });
    if (psaPlan.action === 'COLLISION') failures.push(psaPlan.reason);
  }

  if (input.draft.op === 'INSERT_NEW_CANONICAL') {
    const proposed = input.draft.proposedCompanyId ?? proposedImCompanyId(input.draft.fdacsIm);
    const alreadyInternal =
      input.liveCompany?.companyId === proposed &&
      input.liveCompany.publicationState === 'INGESTED' &&
      input.liveCompany.indexable === false;
    if (alreadyInternal) {
      const psaPlan = planPsaAction({
        fdacsIm: input.draft.fdacsIm,
        companyId: proposed,
        existing: input.psa,
      });
      if (psaPlan.action === 'COLLISION') failures.push(psaPlan.reason);
    } else {
      if (classified.classification !== 'NEW_CANONICAL_COMPANY_READY') {
        failures.push(`insert_class_now_${classified.classification}`);
      }
      if (input.takenIds.has(proposed)) failures.push(`company_id_collision_${proposed}`);
      if (classified.matchedCompanyId) failures.push(`insert_now_matches_${classified.matchedCompanyId}`);
      const psaPlan = planPsaAction({
        fdacsIm: input.draft.fdacsIm,
        companyId: proposed,
        existing: input.psa,
      });
      if (psaPlan.action === 'COLLISION' || psaPlan.action === 'ALREADY_EXISTS') {
        failures.push(`insert_psa_${psaPlan.action}_${psaPlan.reason}`);
      }
    }
  }

  if (classified.statusFreshness !== 'ACTIVE_FRESH' && classified.classification !== 'SOURCE_STATUS_BLOCKED') {
    /* freshness other than ACTIVE_FRESH already classified above */
  }
  if (String(input.subject.status || '').toLowerCase() !== 'active') {
    failures.push(`source_status_${input.subject.status}`);
  }

  return { pass: failures.length === 0, failures };
}

export function rollbackForOp(op: FinalCanonicalizationOp): {
  kind: 'DETACH_FL011D_PSA' | 'DELETE_INGESTED_COMPANY';
  mayDeleteCompany: boolean;
} {
  if (op.op === 'LINK_EXISTING_CANONICAL') {
    return { kind: 'DETACH_FL011D_PSA', mayDeleteCompany: false };
  }
  return {
    kind: 'DELETE_INGESTED_COMPANY',
    mayDeleteCompany:
      op.intendedPublicationState === 'INGESTED' && op.intendedIndexable === false,
  };
}

export function collapsedSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function slugCollidesInsensitively(candidate: string, takenSlugs: Iterable<string>): boolean {
  const key = collapsedSlug(candidate);
  if (!key) return false;
  for (const taken of takenSlugs) {
    if (collapsedSlug(taken) === key) return true;
  }
  return false;
}

export function postApplyIdempotentDelta(input: {
  companiesInserted: number;
  psaInserted: number;
  contactsInserted: number;
}): { ok: boolean } {
  return {
    ok:
      input.companiesInserted === 0 &&
      input.psaInserted === 0 &&
      input.contactsInserted === 0,
  };
}
