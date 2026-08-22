/**
 * FL-011H — Florida FDACS moving-broker identity model and internal staging readiness.
 * Read-only. Production writes: 0. Google Places: 0. Does not start FL-012.
 */
import { createHash } from 'node:crypto';
import {
  matchStateRegistryIdentity,
  type CanonicalProviderIdentity,
  type StateIdentitySubject,
  type StateMatchMethod,
} from '@/lib/state-hhg/identity';
import { corporateForm } from '@/lib/state-hhg/multi-state-entity';
import {
  isFranchiseOrNetworkBrandName,
  normalizeLegalName,
  normalizePhone,
  normalizeEmail,
  normalizeAddressLine,
  normalizeUsdot,
} from '@/lib/state-hhg/normalize';
import { slugifyCompanyName } from '@/lib/utils/slugify';
import { usdotSlugIsNotFederalEvidence as federalSlugGuard } from '@/lib/state-hhg/fl/wave-011f';
import { ACCEPTED_LINK_EVIDENCE } from '@/lib/state-hhg/fl/wave-011d';
import { shouldRenderFloridaStateWaveChrome } from '@/lib/state-hhg/fl/wave-1';
import {
  EXPECTED_ACTIVE,
  EXPECTED_COVERAGE_PCT,
  EXPECTED_REPRESENTED,
  EXPECTED_UNRESOLVED,
} from '@/lib/state-hhg/fl/wave-011g';

export const FL_011H_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_011H_PRODUCTION_WRITES = 0 as const;
export const FL_011H_CONSUMER_PII = 0 as const;
export const FL_011H_TASK = 'FL-011H' as const;

export const FL_FDACS_MB_UNIVERSE_V1 = 'FL_FDACS_MB_UNIVERSE_V1' as const;
export const FL_FDACS_MB_INTERNAL_READY_POOL_V1 = 'FL_FDACS_MB_INTERNAL_READY_POOL_V1' as const;
export const FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT = 'FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT' as const;

export const BROKER_ROLE = 'MOVING_BROKER' as const;
export const INTRASTATE_MOVER_ROLE = 'INTRASTATE_MOVER' as const;

export const STATE_AUTHORITY_MODEL_VERDICT = 'REUSE_AS_IS' as const;

export const IM_DENOMINATOR_DELTA = {
  active: 0,
  represented: 0,
  unresolved: 0,
  coverage: 0,
} as const;

export const ACCEPTED_BROKER_LINK_EVIDENCE = ACCEPTED_LINK_EVIDENCE;

export const BROKER_TERMINAL_CLASSES = [
  'EXISTING_CANONICAL_LINK_READY',
  'NEW_BROKER_CANONICAL_READY',
  'EXISTING_CANONICAL_ALREADY_MODELED',
  'EXPIRED_NO_STAGING',
  'STATUS_BLOCKED',
  'REMAINS_IDENTITY_REVIEW',
  'CONFLICT',
  'OTHER_WITHHOLD',
] as const;
export type BrokerTerminalClass = (typeof BROKER_TERMINAL_CLASSES)[number];

export const BROKER_STATUS_CLASSES = [
  'ACTIVE_FRESH',
  'EXPIRED',
  'UNKNOWN',
  'STATUS_REFRESH_REQUIRED',
  'STATUS_CONFLICT',
] as const;
export type BrokerStatusClass = (typeof BROKER_STATUS_CLASSES)[number];

export const BROKER_ROLE_OVERLAP = [
  'BROKER_ONLY',
  'MOVER_AND_BROKER',
  'FEDERAL_AND_BROKER',
  'MOVER_FEDERAL_AND_BROKER',
  'OTHER',
] as const;
export type BrokerRoleOverlap = (typeof BROKER_ROLE_OVERLAP)[number];

export const BROKER_PUBLICATION_MODEL = [
  'PUBLICATION_MODEL_READY',
  'MODEL_EXTENSION_REQUIRED',
  'COMPANY_NOT_PUBLIC',
  'IDENTITY_NOT_READY',
  'STATUS_NOT_READY',
] as const;
export type BrokerPublicationModel = (typeof BROKER_PUBLICATION_MODEL)[number];

export const EXISTING_CANONICAL_VERDICTS = [
  'PASS',
  'IDENTITY_DRIFT',
  'ROLE_CONFLICT',
  'CANONICAL_CONFLICT',
] as const;
export type ExistingCanonicalVerdict = (typeof EXISTING_CANONICAL_VERDICTS)[number];

export const PROHIBITED_BROKER_LANGUAGE = [
  'licensed mover',
  'registered mover',
  'motor carrier',
  'approved mover',
  'certified mover',
  'government approved',
  'movetrusthub approved',
  'safe mover',
] as const;

export type BrokerClassifyInput = {
  mb: string;
  legalName: string | null;
  dba: string | null;
  status: string;
  expiration: string | null;
  retrievedAt: string | null;
  asOf: string;
  phone: string | null;
  email: string | null;
  physicalAddress: string | null;
  city: string | null;
  postalCode: string | null;
  usdot: string | null;
  attachedCompanyId: string | null;
  existingMbCompanyIds: ReadonlySet<string>;
  wave1Ids: ReadonlySet<string>;
  keep80Ids: ReadonlySet<string>;
  candidates: readonly CanonicalProviderIdentity[];
  candidateUsdotById: Record<string, string | null>;
  imAuthorityByCompany: Record<string, string | null>;
};

export type BrokerClassifyResult = {
  mb: string;
  terminal: BrokerTerminalClass;
  matchMethod: StateMatchMethod | 'none';
  matchedCompanyId: string | null;
  proposedCompanyId: string;
  reasons: string[];
  role: typeof BROKER_ROLE;
  overlap: BrokerRoleOverlap;
  googlePlacesRequests: 0;
};

export function proposedMbCompanyId(mb: string): string {
  const raw = String(mb || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
  const digits = raw.replace(/^MB/, '');
  return `fl-mb-${digits}`;
}

export function proposedMbSlug(legalName: string, mb: string, taken: ReadonlySet<string>): string {
  const base = slugifyCompanyName(legalName) || 'moving-broker';
  if (!taken.has(base) && base !== 'moving-broker') return base;
  const token = proposedMbCompanyId(mb);
  const disambiguated = `${base}-${token}`.slice(0, 96);
  if (!taken.has(disambiguated)) return disambiguated;
  return `${disambiguated}-fl011h`.slice(0, 96);
}

export function usdotSlugIsNotFederalEvidence(companyId: string, usdotNumber: string | null): boolean {
  return federalSlugGuard(companyId, usdotNumber);
}

export function imCoverageUnchanged(
  active: number,
  represented: number,
  unresolved: number,
  coverage: number
): boolean {
  return (
    active === EXPECTED_ACTIVE &&
    represented === EXPECTED_REPRESENTED &&
    unresolved === EXPECTED_UNRESOLVED &&
    coverage === EXPECTED_COVERAGE_PCT &&
    IM_DENOMINATOR_DELTA.active === 0
  );
}

export function revalidateBrokerStatus(input: {
  snapshotStatus: string;
  liveStatus: string | null;
}): BrokerStatusClass {
  const snap = String(input.snapshotStatus || '').toLowerCase();
  const live = input.liveStatus ? String(input.liveStatus).toLowerCase() : null;
  if (live && live !== snap) return 'STATUS_CONFLICT';
  if (live === 'expired') return 'EXPIRED';
  if (live === 'unknown') return 'UNKNOWN';
  if (live === 'active') return 'ACTIVE_FRESH';
  if (snap === 'active') return 'ACTIVE_FRESH';
  return 'STATUS_REFRESH_REQUIRED';
}

export function classifyBrokerRoleOverlap(input: {
  imAuthorityNumber: string | null;
  usdotNumber: string | null;
  companyId: string | null;
}): BrokerRoleOverlap {
  const hasIm = Boolean(input.imAuthorityNumber && /^IM\d+/i.test(input.imAuthorityNumber));
  const hasFederal = Boolean(normalizeUsdot(input.usdotNumber));
  if (hasIm && hasFederal) return 'MOVER_FEDERAL_AND_BROKER';
  if (hasIm) return 'MOVER_AND_BROKER';
  if (hasFederal) return 'FEDERAL_AND_BROKER';
  if (input.companyId?.startsWith('usdot-') && !hasFederal) return 'BROKER_ONLY';
  if (!hasIm && !hasFederal) return 'BROKER_ONLY';
  return 'OTHER';
}

export function auditExistingCanonicalBroker(input: {
  mb: string;
  legalName: string | null;
  phone: string | null;
  email: string | null;
  physicalAddress: string | null;
  company: CanonicalProviderIdentity | null;
}): { mb: string; verdict: ExistingCanonicalVerdict; reasons: string[] } {
  if (!input.company) {
    return { mb: input.mb, verdict: 'CANONICAL_CONFLICT', reasons: ['target_company_missing'] };
  }
  const names = [input.company.legalName, input.company.dbaName, input.company.publicName];
  const nameOk = names.some((n) => normalizeLegalName(n) && normalizeLegalName(n) === normalizeLegalName(input.legalName));
  if (!nameOk) {
    return { mb: input.mb, verdict: 'IDENTITY_DRIFT', reasons: ['legal_name_no_longer_matches'] };
  }
  const phoneOk =
    Boolean(normalizePhone(input.phone)) &&
    normalizePhone(input.phone) === normalizePhone(input.company.phone);
  const emailOk =
    Boolean(normalizeEmail(input.email)) &&
    normalizeEmail(input.email) === normalizeEmail(input.company.email);
  const addrOk =
    Boolean(normalizeAddressLine(input.physicalAddress)) &&
    normalizeAddressLine(input.physicalAddress) === normalizeAddressLine(input.company.address);
  if (!phoneOk && !emailOk && !addrOk) {
    return { mb: input.mb, verdict: 'IDENTITY_DRIFT', reasons: ['no_remaining_strong_corroboration'] };
  }
  return { mb: input.mb, verdict: 'PASS', reasons: ['exact_legal_identity_and_corroboration'] };
}

export function classifyBrokerTerminal(input: BrokerClassifyInput): BrokerClassifyResult {
  const mb = String(input.mb).toUpperCase();
  const proposed = proposedMbCompanyId(mb);
  const overlapFor = (companyId: string | null): BrokerRoleOverlap =>
    classifyBrokerRoleOverlap({
      imAuthorityNumber: companyId ? input.imAuthorityByCompany[companyId] ?? null : null,
      usdotNumber: companyId ? input.candidateUsdotById[companyId] ?? null : null,
      companyId,
    });

  const finish = (
    terminal: BrokerTerminalClass,
    matchMethod: StateMatchMethod | 'none',
    matchedCompanyId: string | null,
    reasons: string[]
  ): BrokerClassifyResult => ({
    mb,
    terminal,
    matchMethod,
    matchedCompanyId,
    proposedCompanyId: proposed,
    reasons,
    role: BROKER_ROLE,
    overlap: overlapFor(matchedCompanyId),
    googlePlacesRequests: 0,
  });

  const st = String(input.status || '').toLowerCase();
  if (st === 'expired') {
    return finish('EXPIRED_NO_STAGING', 'none', input.attachedCompanyId, ['snapshot_expired']);
  }
  if (st && st !== 'active') {
    return finish('STATUS_BLOCKED', 'none', input.attachedCompanyId, [`snapshot_status_${st}`]);
  }

  if (input.attachedCompanyId) {
    return finish('EXISTING_CANONICAL_ALREADY_MODELED', 'exact_prior_state_authority', input.attachedCompanyId, [
      'mb_already_attached',
    ]);
  }

  if (input.existingMbCompanyIds.has(proposed)) {
    return finish('CONFLICT', 'none', proposed, ['proposed_fl_mb_id_already_exists']);
  }

  const subject: StateIdentitySubject = {
    legalName: input.legalName,
    dba: input.dba,
    usdot: input.usdot,
    phone: input.phone,
    email: input.email,
    physicalAddress: input.physicalAddress,
    city: input.city,
    postalCode: input.postalCode,
    statusNormalized: 'active',
    roleClass: 'broker',
    authorityNumber: mb,
  };
  const match = matchStateRegistryIdentity(subject, input.candidates);

  if (match.disposition === 'MATCHED_EXISTING' && match.matchedCompanyId) {
    const method = match.matchMethod;
    const accepted = ACCEPTED_BROKER_LINK_EVIDENCE.includes(
      method as (typeof ACCEPTED_BROKER_LINK_EVIDENCE)[number]
    );
    if (!accepted) {
      return finish('REMAINS_IDENTITY_REVIEW', 'none', match.matchedCompanyId, [
        `match_method_${method}_not_accepted_for_broker_link`,
      ]);
    }
    if (input.wave1Ids.has(match.matchedCompanyId) || input.keep80Ids.has(match.matchedCompanyId)) {
      return finish('OTHER_WITHHOLD', method, match.matchedCompanyId, [
        'observation_cohort_not_mutated_for_broker_attach',
      ]);
    }
    return finish('EXISTING_CANONICAL_LINK_READY', method, match.matchedCompanyId, [
      'strong_deterministic_link',
    ]);
  }

  if (
    match.reviewReason === 'name_similarity_insufficient_without_corroboration' ||
    match.reviewReason === 'dba_without_unique_corroboration'
  ) {
    return finish('REMAINS_IDENTITY_REVIEW', 'none', null, [match.reviewReason]);
  }

  if (
    match.franchiseSafetyHold ||
    match.reviewReason === 'franchise_or_network_brand_fail_closed' ||
    isFranchiseOrNetworkBrandName(input.legalName) ||
    isFranchiseOrNetworkBrandName(input.dba)
  ) {
    return finish('REMAINS_IDENTITY_REVIEW', 'none', match.matchedCompanyId, [
      'franchise_or_network_brand_fail_closed',
    ]);
  }

  if (match.disposition === 'REVIEW_REQUIRED') {
    const collision = String(match.reviewReason || '').includes('collision');
    return finish(collision ? 'CONFLICT' : 'REMAINS_IDENTITY_REVIEW', 'none', match.matchedCompanyId, [
      match.reviewReason || 'review_required',
    ]);
  }

  const hasName = Boolean(input.legalName?.trim());
  const hasForm = corporateForm(input.legalName) !== null;
  const hasPlace = Boolean(input.physicalAddress?.trim());
  const hasPhone = Boolean(input.phone?.trim());
  if (match.disposition === 'NEW_PROVIDER_CANDIDATE' && hasName && hasForm && (hasPlace || hasPhone)) {
    return finish('NEW_BROKER_CANONICAL_READY', 'none', null, [
      'no_existing_canonical_match_sufficient_official_identity',
    ]);
  }

  return finish('OTHER_WITHHOLD', 'none', null, [match.reviewReason || 'insufficient_official_identity']);
}

export function nameOnlyAutoLinkCount(rows: readonly BrokerClassifyResult[]): number {
  return rows.filter(
    (r) =>
      r.terminal === 'EXISTING_CANONICAL_LINK_READY' &&
      (r.matchMethod === 'none' || !ACCEPTED_BROKER_LINK_EVIDENCE.includes(r.matchMethod as never))
  ).length;
}

export function brokerCoveragePct(active: number, represented: number): number {
  if (active <= 0) return 0;
  return Math.round((represented / active) * 1000) / 10;
}

export function classifyBrokerPublicationModel(input: {
  terminal: BrokerTerminalClass;
  companyPublic: boolean;
}): BrokerPublicationModel {
  if (input.terminal === 'EXPIRED_NO_STAGING' || input.terminal === 'STATUS_BLOCKED') {
    return 'STATUS_NOT_READY';
  }
  if (
    input.terminal === 'REMAINS_IDENTITY_REVIEW' ||
    input.terminal === 'CONFLICT' ||
    input.terminal === 'OTHER_WITHHOLD'
  ) {
    return 'IDENTITY_NOT_READY';
  }
  if (input.terminal === 'NEW_BROKER_CANONICAL_READY' || !input.companyPublic) {
    return 'COMPANY_NOT_PUBLIC';
  }
  return 'MODEL_EXTENSION_REQUIRED';
}

export function floridaFdacsBrokerEvidenceBlock(input: {
  authorityNumber: string;
  status: string;
  retrievedAt?: string | null;
}): {
  regulator: string;
  registrationNumber: string;
  registrationType: string;
  role: typeof BROKER_ROLE;
  status: string;
  headline: string;
  detail: string;
  roleClarification: string;
  verificationWording: string;
  endorsement: false;
} {
  const statusLabel = String(input.status).toLowerCase() === 'active' ? 'Registered / Active' : input.status;
  return {
    regulator: 'Florida Department of Agriculture and Consumer Services',
    registrationNumber: input.authorityNumber,
    registrationType: 'Moving Broker',
    role: BROKER_ROLE,
    status: statusLabel,
    headline: 'Florida Moving Broker Registration',
    detail:
      'Registration information verified against Florida FDACS records. This record reflects a Florida moving-broker registration.',
    roleClarification:
      'This record reflects a Florida moving-broker registration and is distinct from registration as an intrastate household-goods mover.',
    verificationWording: 'Registration information verified against Florida FDACS records.',
    endorsement: false,
  };
}

export function hashBrokerStagingDraft(
  ops: readonly Array<{
    op: 'LINK' | 'INSERT';
    mb: string;
    companyId: string | null;
    proposedCompanyId: string | null;
  }>
): string {
  const payload = [...ops]
    .map((o) => `${o.op}|${o.mb}|${o.companyId ?? ''}|${o.proposedCompanyId ?? ''}`)
    .sort()
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

export function successStateFromReadyPool(total: number): string {
  if (STATE_AUTHORITY_MODEL_VERDICT === 'MODEL_NOT_SAFE') return 'BLOCKED — FL_BROKER_MODEL_NOT_SAFE';
  if (total > 0) return 'READY_FOR_FL_BROKER_INTERNAL_STAGING';
  return 'FL_BROKER_SCOPE_DISPOSITIONED — NO_SAFE_INTERNAL_STAGING';
}

export function terminalTallyValid(
  tally: Record<BrokerTerminalClass, number>,
  universe: number
): boolean {
  const sum = BROKER_TERMINAL_CLASSES.reduce((n, k) => n + (tally[k] ?? 0), 0);
  return sum === universe;
}

export function wave1ClockReset(): false {
  return false;
}

export function brokerAttachWouldRenderChrome(company: {
  id: string;
  publicationState?: string | null;
}): boolean {
  return shouldRenderFloridaStateWaveChrome(company);
}

export { EXPECTED_ACTIVE, EXPECTED_REPRESENTED, EXPECTED_UNRESOLVED, EXPECTED_COVERAGE_PCT };
