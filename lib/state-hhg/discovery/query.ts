/**
 * Internal-only local discovery query prototype.
 * NOT exposed through public API. Consumer-facing: NO.
 */
import {
  CONSUMER_APPROVED_DISCOVERY_BASES,
  DISCOVERY_EVIDENCE_PRECEDENCE,
  type LocalDiscoveryBasis,
  type ProviderLocalDiscoveryEvidence,
} from '@/lib/state-hhg/discovery/types';

export type LocalDiscoveryAuthority = {
  providerId: string;
  stateCode: string;
  authorityNumber: string | null;
  authorityType: string;
  status: 'active' | string;
  verificationState: 'VERIFIED' | string;
  roleClass: 'mover' | string;
};

export type LocalDiscoveryProviderMeta = {
  providerId: string;
  canonicalName: string | null;
  legalName: string | null;
  reviewRequired?: boolean;
  brokerOnly?: boolean;
  franchiseHold?: boolean;
  activeVerifiedAuthority: boolean;
  roleClass: 'mover' | string;
};

export type LocalDiscoveryCandidate = {
  providerId: string;
  authority: LocalDiscoveryAuthority;
  discoveryBasis: LocalDiscoveryBasis;
  evidence: ProviderLocalDiscoveryEvidence[];
  provenance: string[];
};

export type GetLocalDiscoveryCandidatesInput = {
  state: string;
  originCountyFips: string;
  /** Destination state legality is SEPARATE — not filtered here. */
  evidence: readonly ProviderLocalDiscoveryEvidence[];
  providers: readonly LocalDiscoveryProviderMeta[];
  authorities: readonly LocalDiscoveryAuthority[];
  /** If true, only consumer-approved bases (default true). */
  consumerApprovedOnly?: boolean;
};

function basisRank(basis: LocalDiscoveryBasis): number {
  const i = DISCOVERY_EVIDENCE_PRECEDENCE.indexOf(basis);
  return i === -1 ? 999 : i;
}

/**
 * Bounded internal query: active verified mover authority + discovery
 * evidence for the origin/pickup county. No radius. No adjacent inference.
 */
export function getLocalDiscoveryCandidates(
  input: GetLocalDiscoveryCandidatesInput
): LocalDiscoveryCandidate[] {
  const state = input.state.toUpperCase();
  const origin = input.originCountyFips;
  const consumerOnly = input.consumerApprovedOnly !== false;

  const providerById = new Map(input.providers.map((p) => [p.providerId, p]));
  const authByProvider = new Map<string, LocalDiscoveryAuthority>();
  for (const a of input.authorities) {
    if (a.stateCode.toUpperCase() !== state) continue;
    if (a.status !== 'active') continue;
    if (a.verificationState !== 'VERIFIED') continue;
    if (a.roleClass !== 'mover') continue;
    if (!authByProvider.has(a.providerId)) {
      authByProvider.set(a.providerId, a);
    }
  }

  const evidenceForOrigin = input.evidence.filter(
    (e) =>
      e.stateCode.toUpperCase() === state &&
      e.countyFips === origin &&
      e.consumerEligible &&
      (!consumerOnly ||
        (CONSUMER_APPROVED_DISCOVERY_BASES as readonly string[]).includes(
          e.basis
        )) &&
      e.basis !== 'DERIVED_EXPERIMENTAL' &&
      e.basis !== 'NONE'
  );

  // Group evidence by provider; pick strongest basis
  const byProvider = new Map<string, ProviderLocalDiscoveryEvidence[]>();
  for (const e of evidenceForOrigin) {
    const list = byProvider.get(e.providerId) ?? [];
    list.push(e);
    byProvider.set(e.providerId, list);
  }

  const out: LocalDiscoveryCandidate[] = [];
  for (const [providerId, evs] of byProvider) {
    const meta = providerById.get(providerId);
    if (!meta) continue;
    if (!meta.activeVerifiedAuthority) continue;
    if (meta.roleClass !== 'mover') continue;
    if (meta.brokerOnly) continue;
    if (meta.reviewRequired) continue;
    if (meta.franchiseHold) continue;

    const authority = authByProvider.get(providerId);
    if (!authority) continue;

    const sorted = [...evs].sort(
      (a, b) => basisRank(a.basis) - basisRank(b.basis)
    );
    const strongest = sorted[0];
    out.push({
      providerId,
      authority,
      discoveryBasis: strongest.basis,
      evidence: sorted,
      provenance: sorted.map(
        (e) =>
          `${e.basis}:${e.evidenceSource}${e.sourceUrl ? `@${e.sourceUrl}` : ''}`
      ),
    });
  }

  // Stable order: precedence then providerId
  out.sort((a, b) => {
    const r = basisRank(a.discoveryBasis) - basisRank(b.discoveryBasis);
    if (r !== 0) return r;
    return a.providerId.localeCompare(b.providerId);
  });
  return out;
}

/** Origin discovery vs destination legality — locked contract. */
export const ORIGIN_DESTINATION_CONTRACT = {
  localDiscoveryCounty: 'origin/pickup geography',
  stateAuthority: 'legal same-state transportation eligibility',
  note:
    'A Palm Beach → Orange move may discover a Palm Beach–based mover without Orange being in origin evidence, if Florida authority permits the intrastate destination.',
} as const;
