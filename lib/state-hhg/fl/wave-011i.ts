/**
 * FL-011I — manifest-bound Florida FDACS moving-broker internal apply.
 * INGESTED / indexable=false. Google Places: 0. Does not start FL-012.
 */
import { createHash } from 'node:crypto';
import {
  matchStateRegistryIdentity,
  type CanonicalProviderIdentity,
} from '@/lib/state-hhg/identity';
import { corporateForm } from '@/lib/state-hhg/multi-state-entity';
import { normalizeLegalName, normalizePhone, normalizeEmail } from '@/lib/state-hhg/normalize';
import { shouldRenderFloridaStateWaveChrome } from '@/lib/state-hhg/fl/wave-1';
import { isAnonymousCompanyNotFound } from '@/lib/provider/anonymous-company-route';
import { isConsumerVisibleCompany, isSeoIndexableCompany } from '@/lib/provider/publication';
import {
  ACCEPTED_BROKER_LINK_EVIDENCE,
  BROKER_ROLE,
  hashBrokerStagingDraft,
  proposedMbCompanyId,
} from '@/lib/state-hhg/fl/wave-011h';
import { planPsaAction, planContactAction, type LivePsaRow, type LiveObservationRow, type ContactKind } from '@/lib/state-hhg/fl/wave-011d';
import { PROHIBITED_BROKER_LANGUAGE } from '@/lib/state-hhg/fl/wave-011h';

export const FL_011I_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_011I_CONSUMER_PII = 0 as const;
export const FL_011I_PRODUCTION_WRITES_IN_PR = 0 as const;
export const FL_011I_TASK = 'FL-011I' as const;
export const FL_011I_MATCH_METHOD_PREFIX = 'fl011i:' as const;

export const FL_FDACS_MB_INTERNAL_STAGING_V1 = 'FL_FDACS_MB_INTERNAL_STAGING_V1' as const;
export const FL_011I_DRAFT_HASH = 'e1e78a4d18cf2c0c' as const;
export const FL_011I_EXPECTED_LINK = 1 as const;
export const FL_011I_EXPECTED_INSERT = 17 as const;
export const FL_011I_EXPECTED_TOTAL = 18 as const;

export const FL_011I_MB159_LINK = {
  mb: 'MB159',
  companyId: 'fl-im-3405',
  legalName: 'REAL TIME RELOCATION LLC',
} as const;

export const FL_011I_MB171_CONTROL = {
  mb: 'MB171',
  companyId: 'usdot-3197443',
} as const;

export const FL_011I_MB12 = 'MB12' as const;

export const SAFE_BROKER_ENTITY_TYPE = 'BROKER' as const;
export const BROKER_AUTHORITY_TYPE = 'intrastate_hhg_broker' as const;

export const FL_011I_FORBIDDEN_TABLES = [
  'county_regulatory_program',
  'provider_county_credential',
  'local_hhg_canary_publication',
] as const;

export type DraftBrokerOp = {
  operation: 'LINK' | 'INSERT';
  mb: string;
  sourceLegalName: string;
  sourceStatus: string;
  sourceFreshness: string;
  brokerRole: string;
  targetCompanyId: string | null;
  proposedCompanyId: string | null;
  proposedSlug: string | null;
  existingSlug: string | null;
  imIdentifier: string | null;
  federalIdentifier: string | null;
  matchMethod: string;
  intendedPublicationState: string;
  intendedIndexable: boolean;
  currentPublicationState: string | null;
  currentIndexable: boolean | null;
  rollbackOperation: string;
  contactObservationDisposition?: Array<{ kind: string; disposition: string }>;
};

export type FinalBrokerOp = {
  op: 'LINK' | 'INSERT';
  mb: string;
  legalName: string;
  role: typeof BROKER_ROLE;
  companyId: string;
  slug: string;
  sourceStatus: string;
  sourceFreshness: string;
  imIdentifier: string | null;
  federalIdentifier: string | null;
  matchEvidence: string;
  provenance: Record<string, unknown>;
  intendedPublicationState: 'INGESTED' | string;
  intendedIndexable: false;
  currentPublicationState: string | null;
  currentIndexable: boolean | null;
  stateAuthorityOperation: 'INSERT_REQUIRED' | 'ALREADY_EXISTS' | 'ATTACH_ORPHAN' | 'COLLISION';
  contactObservationOperation: 'SAFE_SOURCE_OBSERVATION' | 'DEFERRED';
  rollbackOperation: 'DETACH_FL011I_MB_PSA' | 'DELETE_INGESTED_FL_MB_COMPANY';
};

export function assertExactBrokerDraft(
  ops: readonly DraftBrokerOp[],
  committedHash: string
): { ok: true; link: number; insert: number; total: number; hash: string } {
  const link = ops.filter((o) => o.operation === 'LINK').length;
  const insert = ops.filter((o) => o.operation === 'INSERT').length;
  const hash = hashBrokerStagingDraft(
    ops.map((o) => ({
      op: o.operation,
      mb: o.mb,
      companyId: o.targetCompanyId,
      proposedCompanyId: o.proposedCompanyId,
    }))
  );
  if (ops.length !== FL_011I_EXPECTED_TOTAL) {
    throw new Error(`REFUSAL — draft total ${ops.length} != ${FL_011I_EXPECTED_TOTAL}`);
  }
  if (link !== FL_011I_EXPECTED_LINK || insert !== FL_011I_EXPECTED_INSERT) {
    throw new Error(`REFUSAL — draft split ${link}/${insert} != ${FL_011I_EXPECTED_LINK}/${FL_011I_EXPECTED_INSERT}`);
  }
  if (hash !== FL_011I_DRAFT_HASH || committedHash !== FL_011I_DRAFT_HASH) {
    throw new Error(`REFUSAL — draft hash ${hash}/${committedHash} != ${FL_011I_DRAFT_HASH}`);
  }
  const mbs = new Set(ops.map((o) => o.mb.toUpperCase()));
  if (mbs.size !== ops.length) throw new Error('REFUSAL — duplicate MB in draft');
  if (mbs.has(FL_011I_MB171_CONTROL.mb)) throw new Error('REFUSAL — MB171 control leaked into apply manifest');
  const linkOp = ops.find((o) => o.operation === 'LINK');
  if (linkOp?.mb !== FL_011I_MB159_LINK.mb || linkOp.targetCompanyId !== FL_011I_MB159_LINK.companyId) {
    throw new Error('REFUSAL — MB159 LINK target drifted');
  }
  return { ok: true, link, insert, total: ops.length, hash };
}

export function hashFinalBrokerManifest(
  ops: readonly Array<{
    op: 'LINK' | 'INSERT';
    mb: string;
    companyId: string;
    slug: string;
    intendedPublicationState: string;
    intendedIndexable: boolean;
  }>
): string {
  const payload = [...ops]
    .map(
      (o) =>
        `${o.op}|${o.mb}|${o.companyId}|${o.slug}|${o.intendedPublicationState}|${String(o.intendedIndexable)}`
    )
    .sort()
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

export function fl011iMatchMethod(evidence: string): string {
  return `${FL_011I_MATCH_METHOD_PREFIX}${evidence}`;
}

export function evaluateSuddathMb12Gate(input: {
  mb: string;
  legalName: string;
  proposedCompanyId: string;
  proposedSlug: string;
  candidates: readonly CanonicalProviderIdentity[];
  takenIds: ReadonlySet<string>;
  takenSlugs: ReadonlySet<string>;
}): { result: 'DISTINCT_INSERT_SAFE' | 'BLOCK_SAME_CANONICAL' | 'BLOCK_AMBIGUOUS'; reasons: string[] } {
  const reasons: string[] = [];
  if (input.mb.toUpperCase() !== FL_011I_MB12) {
    return { result: 'BLOCK_AMBIGUOUS', reasons: ['not_mb12'] };
  }
  const form = corporateForm(input.legalName);
  if (form !== 'INC') reasons.push(`legal_form_${form ?? 'missing'}`);
  const subjectName = normalizeLegalName(input.legalName);
  const exactNameHits = input.candidates.filter((c) =>
    [c.legalName, c.dbaName, c.publicName].some((n) => normalizeLegalName(n) === subjectName)
  );
  if (exactNameHits.length === 1) {
    return {
      result: 'BLOCK_SAME_CANONICAL',
      reasons: ['exact_legal_name_already_canonical', exactNameHits[0].companyId],
    };
  }
  if (exactNameHits.length > 1) {
    return { result: 'BLOCK_AMBIGUOUS', reasons: ['exact_legal_name_collision', ...exactNameHits.map((c) => c.companyId)] };
  }
  const match = matchStateRegistryIdentity(
    {
      legalName: input.legalName,
      dba: null,
      usdot: null,
      phone: null,
      email: null,
      physicalAddress: null,
      city: null,
      postalCode: null,
      statusNormalized: 'active',
      roleClass: 'broker',
      authorityNumber: input.mb,
    },
    input.candidates
  );
  if (match.disposition === 'MATCHED_EXISTING' && match.matchedCompanyId) {
    return {
      result: 'BLOCK_SAME_CANONICAL',
      reasons: ['deterministic_same_entity', match.matchMethod, match.matchedCompanyId],
    };
  }
  if (input.takenIds.has(input.proposedCompanyId)) {
    return { result: 'BLOCK_AMBIGUOUS', reasons: [`id_taken_${input.proposedCompanyId}`] };
  }
  if (input.takenSlugs.has(input.proposedSlug)) {
    return { result: 'BLOCK_AMBIGUOUS', reasons: [`slug_taken_${input.proposedSlug}`] };
  }
  if (reasons.length) return { result: 'BLOCK_AMBIGUOUS', reasons };
  return {
    result: 'DISTINCT_INSERT_SAFE',
    reasons: ['distinct_legal_name_inc_form', 'no_same_entity_proof', 'family_brand_is_not_a_link'],
  };
}

export function brokerInsertRoleSafety(input: {
  entityType: string | null;
  serviceScope: string | null;
  shortDescription: string;
  description: string;
}): { ok: boolean; failures: string[] } {
  const failures: string[] = [];
  if (input.entityType !== SAFE_BROKER_ENTITY_TYPE) failures.push(`entity_type_${input.entityType}`);
  const scope = String(input.serviceScope ?? '').toLowerCase();
  if (scope === 'intrastate') failures.push('service_scope_intrastate_implies_local_mover');
  const blob = `${input.shortDescription} ${input.description}`.toLowerCase();
  for (const term of PROHIBITED_BROKER_LANGUAGE) {
    if (blob.includes(term)) failures.push(`prohibited_copy_${term}`);
  }
  if (/\bmoving company\b/.test(blob) && !/\bbroker\b/.test(blob)) {
    failures.push('copy_claims_mover');
  }
  return { ok: failures.length === 0, failures };
}

export function brokerChromeWouldRender(company: {
  id: string;
  publicationState?: string | null;
}): boolean {
  return shouldRenderFloridaStateWaveChrome(company);
}

export function newBrokerPublicExposure(company: {
  publicationState: string;
  indexable: boolean;
}): { consumerVisible: boolean; seoIndexable: boolean; anonymousHttp: 200 | 404 } {
  const row = { publicationState: company.publicationState as 'INGESTED', indexable: company.indexable };
  return {
    consumerVisible: isConsumerVisibleCompany(row),
    seoIndexable: isSeoIndexableCompany(row),
    anonymousHttp: isAnonymousCompanyNotFound(row) ? 404 : 200,
  };
}

export function rollbackBrokerOp(op: { op: 'LINK' | 'INSERT'; intendedPublicationState: string; intendedIndexable: boolean }): {
  kind: 'DETACH_FL011I_MB_PSA' | 'DELETE_INGESTED_FL_MB_COMPANY';
  mayDeleteCompany: boolean;
} {
  if (op.op === 'LINK') return { kind: 'DETACH_FL011I_MB_PSA', mayDeleteCompany: false };
  return {
    kind: 'DELETE_INGESTED_FL_MB_COMPANY',
    mayDeleteCompany: op.intendedPublicationState === 'INGESTED' && op.intendedIndexable === false,
  };
}

export function revalidateBrokerDraftOp(input: {
  draft: DraftBrokerOp;
  legalName: string;
  status: string;
  phone: string | null;
  email: string | null;
  physicalAddress: string | null;
  candidates: readonly CanonicalProviderIdentity[];
  liveCompany: CanonicalProviderIdentity | null;
  takenIds: ReadonlySet<string>;
  psa: readonly LivePsaRow[];
}): { pass: boolean; failures: string[] } {
  const failures: string[] = [];
  const mb = input.draft.mb.toUpperCase();
  if (input.draft.brokerRole !== BROKER_ROLE) failures.push('role_not_moving_broker');
  if (String(input.status).toLowerCase() !== 'active') failures.push(`source_status_${input.status}`);
  if (normalizeLegalName(input.legalName) !== normalizeLegalName(input.draft.sourceLegalName)) {
    failures.push('legal_name_drift');
  }
  if (input.draft.operation === 'LINK') {
    if (input.draft.mb !== FL_011I_MB159_LINK.mb) failures.push('unexpected_link_mb');
    if (!input.liveCompany) failures.push('link_target_missing');
    const names = input.liveCompany
      ? [input.liveCompany.legalName, input.liveCompany.dbaName, input.liveCompany.publicName]
      : [];
    const nameOk = names.some((n) => normalizeLegalName(n) === normalizeLegalName(input.legalName));
    const phoneOk =
      Boolean(normalizePhone(input.phone)) &&
      normalizePhone(input.phone) === normalizePhone(input.liveCompany?.phone ?? null);
    const emailOk =
      Boolean(normalizeEmail(input.email)) &&
      normalizeEmail(input.email) === normalizeEmail(input.liveCompany?.email ?? null);
    if (!nameOk || !(phoneOk || emailOk)) failures.push('link_evidence_drift');
    if (input.liveCompany && brokerChromeWouldRender({ id: input.liveCompany.companyId, publicationState: input.liveCompany.publicationState })) {
      failures.push('link_would_render_wave1_fdacs_chrome');
    }
    const psaPlan = planPsaAction({
      fdacsIm: mb,
      companyId: input.draft.targetCompanyId ?? '',
      existing: input.psa,
    });
    if (psaPlan.action === 'COLLISION') failures.push(psaPlan.reason);
  }
  if (input.draft.operation === 'INSERT') {
    const proposed = input.draft.proposedCompanyId ?? proposedMbCompanyId(mb);
    if (input.takenIds.has(proposed)) failures.push(`company_id_collision_${proposed}`);
    const match = matchStateRegistryIdentity(
      {
        legalName: input.legalName,
        dba: null,
        usdot: null,
        phone: input.phone,
        email: input.email,
        physicalAddress: input.physicalAddress,
        city: null,
        postalCode: null,
        statusNormalized: 'active',
        roleClass: 'broker',
        authorityNumber: mb,
      },
      input.candidates
    );
    if (match.disposition === 'MATCHED_EXISTING' && ACCEPTED_BROKER_LINK_EVIDENCE.includes(match.matchMethod as never)) {
      failures.push(`insert_now_matches_${match.matchedCompanyId}`);
    }
    if (match.reviewReason === 'name_similarity_insufficient_without_corroboration') {
      failures.push('name_only_not_insert_ready');
    }
    const psaPlan = planPsaAction({
      fdacsIm: mb,
      companyId: proposed,
      existing: input.psa,
    });
    if (psaPlan.action === 'COLLISION') failures.push(psaPlan.reason);
  }
  return { pass: failures.length === 0, failures };
}

export { planPsaAction, planContactAction };
export type { LivePsaRow, LiveObservationRow, ContactKind };
