/**
 * FL-011F — read-only unresolved ACTIVE IM resolution.
 * Official sources only. Google Places: 0. Production writes: 0.
 */
import { createHash } from 'node:crypto';
import { shouldRenderFloridaStateWaveChrome } from '@/lib/state-hhg/fl/wave-1';
import { ACCEPTED_LINK_EVIDENCE } from '@/lib/state-hhg/fl/wave-011d';
import type { GapClassification, GapClass, GapSubject } from '@/lib/state-hhg/fl/wave-2-canonicalization';
import type { CanonicalProviderIdentity } from '@/lib/state-hhg/identity';
import { normalizeUsdot } from '@/lib/state-hhg/normalize';
import { corporateForm, classifyMultiStateEntity } from '@/lib/state-hhg/multi-state-entity';
import { isAnonymousCompanyNotFound } from '@/lib/provider/anonymous-company-route';
import { isConsumerVisibleCompany } from '@/lib/provider/publication';

export const FL_011F_GOOGLE_PLACES_REQUESTS = 0 as const;
export const FL_011F_PRODUCTION_WRITES = 0 as const;
export const FL_011F_TASK = 'FL-011F' as const;
export const FL_STATE_UNRESOLVED_ACTIVE_IM_V1 = 'FL_STATE_UNRESOLVED_ACTIVE_IM_V1' as const;
export const FL_STATE_UNRESOLVED_RESOLUTION_READY_POOL_V1 =
  'FL_STATE_UNRESOLVED_RESOLUTION_READY_POOL_V1' as const;
export const FL_STATE_UNRESOLVED_RESOLUTION_INTERNAL_V1_DRAFT =
  'FL_STATE_UNRESOLVED_RESOLUTION_INTERNAL_V1_DRAFT' as const;
export const FL_011E_UNRESOLVED_HISTORICAL = 168 as const;

export const TERMINAL_CLASSES = [
  'EXISTING_CANONICAL_LINK_READY',
  'NEW_CANONICAL_COMPANY_READY',
  'DISTINCT_ENTITY_ALREADY_REPRESENTED',
  'NO_LONGER_ACTIVE',
  'REMAINS_POSSIBLE_DUPLICATE',
  'REMAINS_CORPORATE_FAMILY_REVIEW',
  'CONFLICT_REMAINS',
  'SOURCE_STATUS_BLOCKED',
  'OTHER_REVIEW_REQUIRED',
] as const;
export type TerminalClass = (typeof TERMINAL_CLASSES)[number];

export const HOLD_REASONS = [
  'MISSING_CORPORATE_REGISTRY_LINK',
  'AMBIGUOUS_SUBSIDIARY_STRUCTURE',
  'MULTIPLE_CANONICAL_CANDIDATES',
  'ADDRESS_CONFLICT',
  'LEGAL_FORM_CONFLICT',
  'STALE_STATUS',
  'FEDERAL_IDENTITY_CONFLICT',
  'INSUFFICIENT_OFFICIAL_EVIDENCE',
  'FRANCHISE_OR_NETWORK_BRAND',
] as const;
export type HoldReason = (typeof HOLD_REASONS)[number];

const STRONG_LINK = new Set(ACCEPTED_LINK_EVIDENCE);

export type UnresolvedResolutionInput = {
  priorClass: GapClass | string;
  live: GapClassification;
  subject: GapSubject;
  candidate: CanonicalProviderIdentity | null;
  /** Authoritative companies.usdot_number — never inferred from usdot-* slug. */
  candidateUsdotNumber: string | null;
};

export type UnresolvedResolution = {
  terminal: TerminalClass;
  holdReason: HoldReason | null;
  evidenceMethod: string;
  officialSources: string[];
  publicationGateRemediationRequired: boolean;
  googlePlacesRequests: 0;
};

function authoritativeUsdot(value: string | null | undefined): string | null {
  return normalizeUsdot(value);
}

/** True when we are not treating a `usdot-*` company id as a federal identifier. */
export function usdotSlugIsNotFederalEvidence(companyId: string, usdotNumber: string | null): boolean {
  if (!companyId.startsWith('usdot-')) return true;
  return authoritativeUsdot(usdotNumber) === null;
}

export function federalIdOptionalIsNotAHold(subjectUsdot: string | null): boolean {
  return !authoritativeUsdot(subjectUsdot);
}

export function resolveUnresolvedIm(input: UnresolvedResolutionInput): UnresolvedResolution {
  const sources = ['FDACS_COMMITTED_SNAPSHOT', 'MTH_CANONICAL_COMPANY_READ'];
  const status = String(input.subject.status || '').toLowerCase();
  if (status && status !== 'active') {
    return done('NO_LONGER_ACTIVE', 'STALE_STATUS', 'source_status', sources, false);
  }
  if (input.live.statusFreshness === 'NO_LONGER_ACTIVE') {
    return done('NO_LONGER_ACTIVE', 'STALE_STATUS', 'source_status', sources, false);
  }
  if (
    input.live.statusFreshness === 'STATUS_REFRESH_REQUIRED' ||
    input.live.classification === 'SOURCE_STATUS_BLOCKED'
  ) {
    return done('SOURCE_STATUS_BLOCKED', 'STALE_STATUS', 'fdacs_freshness', sources, false);
  }

  const live = input.live;
  const cand = input.candidate;

  if (live.classification === 'EXISTING_CANONICAL_LINK_READY' && live.matchedCompanyId) {
    if (!STRONG_LINK.has(live.matchMethod as (typeof ACCEPTED_LINK_EVIDENCE)[number]) && live.matchMethod !== 'exact_usdot') {
      return done('REMAINS_POSSIBLE_DUPLICATE', 'INSUFFICIENT_OFFICIAL_EVIDENCE', live.matchMethod, sources, false);
    }
    if (live.matchMethod === 'exact_usdot') {
      const subDot = authoritativeUsdot(input.subject.usdot);
      const coDot = authoritativeUsdot(input.candidateUsdotNumber);
      if (!subDot || !coDot || subDot !== coDot) {
        return done(
          'REMAINS_POSSIBLE_DUPLICATE',
          'FEDERAL_IDENTITY_CONFLICT',
          'usdot_slug_alone_rejected',
          sources,
          false
        );
      }
      sources.push('FMCSA_USDOT_ON_COMPANY_ROW');
    }
    const gate = cand
      ? shouldRenderFloridaStateWaveChrome({
          id: cand.companyId,
          publicationState: cand.publicationState,
        })
      : false;
    if (gate) {
      return done('OTHER_REVIEW_REQUIRED', 'INSUFFICIENT_OFFICIAL_EVIDENCE', live.matchMethod, sources, true);
    }
    return done('EXISTING_CANONICAL_LINK_READY', null, live.matchMethod, sources, false);
  }

  if (cand) {
    const multi = classifyMultiStateEntity({
      subject: {
        legalName: input.subject.legalName,
        dba: input.subject.dba,
        usdot: input.subject.usdot,
        phone: input.subject.phone,
        email: input.subject.email,
        physicalAddress: input.subject.physicalAddress,
        stateCode: 'FL',
      },
      candidate: {
        legalName: cand.legalName,
        dba: cand.dbaName,
        usdot: input.candidateUsdotNumber,
        phone: cand.phone,
        email: cand.email,
        physicalAddress: cand.address,
      },
    });
    if (multi.state === 'DISTINCT_LEGAL_ENTITIES' && (live.classification === 'CONFLICT' || input.priorClass === 'CONFLICT')) {
      return done('CONFLICT_REMAINS', 'LEGAL_FORM_CONFLICT', 'inc_llc_or_legal_name_conflict', sources, false);
    }
  }

  if (live.classification === 'CONFLICT' || input.priorClass === 'CONFLICT') {
    return done('CONFLICT_REMAINS', 'LEGAL_FORM_CONFLICT', live.matchMethod || 'conflict', sources, false);
  }

  if (
    live.classification === 'CORPORATE_FAMILY_REVIEW' ||
    input.priorClass === 'CORPORATE_FAMILY_REVIEW' ||
    live.reasons.some((r) => r.includes('franchise'))
  ) {
    return done(
      'REMAINS_CORPORATE_FAMILY_REVIEW',
      'FRANCHISE_OR_NETWORK_BRAND',
      'franchise_or_corporate_family',
      sources,
      false
    );
  }

  if (live.classification === 'POSSIBLE_DUPLICATE' || input.priorClass === 'POSSIBLE_DUPLICATE') {
    const subDot = authoritativeUsdot(input.subject.usdot);
    const coDot = authoritativeUsdot(input.candidateUsdotNumber);
    if (subDot && coDot && subDot === coDot && cand) {
      sources.push('FMCSA_USDOT_ON_COMPANY_ROW');
      const formA = corporateForm(input.subject.legalName);
      const formB = corporateForm(cand.legalName);
      if (formA && formB && formA !== formB) {
        return done('CONFLICT_REMAINS', 'LEGAL_FORM_CONFLICT', 'usdot_legal_form_conflict', sources, false);
      }
      const gate = shouldRenderFloridaStateWaveChrome({
        id: cand.companyId,
        publicationState: cand.publicationState,
      });
      if (gate) {
        return done('OTHER_REVIEW_REQUIRED', 'INSUFFICIENT_OFFICIAL_EVIDENCE', 'exact_usdot', sources, true);
      }
      return done('EXISTING_CANONICAL_LINK_READY', null, 'exact_usdot', sources, false);
    }
    const reason = live.reasons[0] || 'name_similarity_insufficient_without_corroboration';
    const hold: HoldReason =
      reason.includes('dba')
        ? 'MULTIPLE_CANONICAL_CANDIDATES'
        : 'INSUFFICIENT_OFFICIAL_EVIDENCE';
    return done('REMAINS_POSSIBLE_DUPLICATE', hold, reason, sources, false);
  }

  if (live.classification === 'NEW_CANONICAL_COMPANY_READY') {
    return done(
      'NEW_CANONICAL_COMPANY_READY',
      null,
      'new_canonical_from_official_fdacs_im',
      sources,
      false
    );
  }

  return done('OTHER_REVIEW_REQUIRED', 'INSUFFICIENT_OFFICIAL_EVIDENCE', live.classification, sources, false);
}

function done(
  terminal: TerminalClass,
  holdReason: HoldReason | null,
  evidenceMethod: string,
  officialSources: string[],
  publicationGateRemediationRequired: boolean
): UnresolvedResolution {
  return {
    terminal,
    holdReason,
    evidenceMethod,
    officialSources,
    publicationGateRemediationRequired,
    googlePlacesRequests: 0,
  };
}

export function hashUnresolvedDraft(
  ops: ReadonlyArray<{ op: string; fdacsIm: string; companyId: string | null; proposedCompanyId: string | null }>
): string {
  const payload = [...ops]
    .map((o) => `${o.op}|${o.fdacsIm}|${o.companyId ?? ''}|${o.proposedCompanyId ?? ''}`)
    .sort()
    .join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

export function simulateCoverage(input: {
  active: number;
  represented: number;
  linkReady: number;
  insertReady: number;
  noLongerActive: number;
}): {
  currentCoverage: number;
  simulatedActive: number;
  simulatedRepresented: number;
  simulatedUnresolved: number;
  simulatedCoverage: number;
  netGain: number;
} {
  const simulatedActive = input.active - input.noLongerActive;
  const simulatedRepresented = input.represented + input.linkReady + input.insertReady;
  const simulatedUnresolved = simulatedActive - simulatedRepresented;
  const pct = (n: number, d: number) => (d === 0 ? 0 : Math.round((n / d) * 1000) / 10);
  return {
    currentCoverage: pct(input.represented, input.active),
    simulatedActive,
    simulatedRepresented,
    simulatedUnresolved,
    simulatedCoverage: pct(simulatedRepresented, simulatedActive),
    netGain: input.linkReady + input.insertReady,
  };
}

export function simulatedNewCompanyContract(): {
  publicationState: 'INGESTED';
  indexable: false;
  anonymousHttp: 404;
} {
  const row = { publicationState: 'INGESTED' as const, indexable: false };
  return {
    publicationState: 'INGESTED',
    indexable: false,
    anonymousHttp: isAnonymousCompanyNotFound(row) ? 404 : 200,
  };
}

export function futureLinkWouldExposeWaveChrome(company: {
  id: string;
  publicationState?: string | null;
}): boolean {
  return shouldRenderFloridaStateWaveChrome({
    id: company.id,
    publicationState: company.publicationState,
  });
}

export function consumerVisible(company: { publicationState?: string | null }): boolean {
  return isConsumerVisibleCompany({ publicationState: company.publicationState as 'INGESTED' });
}
