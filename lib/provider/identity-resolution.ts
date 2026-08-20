import type { CapabilityEvidenceState } from '@/lib/provider/types';

export const IDENTITY_RESOLUTION_OUTCOMES = [
  'RESOLVED_UNIQUE_AUTHORITY',
  'BRAND_WITH_OPERATING_ENTITY',
  'NETWORK_OR_VAN_LINE',
  'MULTI_LOCATION_SAME_PROVIDER',
  'TRUE_DUPLICATE',
  'HISTORICAL_OR_INACTIVE_IDENTITY',
  'UNRESOLVED_REVIEW_REQUIRED',
] as const;

export type IdentityResolutionKind = (typeof IDENTITY_RESOLUTION_OUTCOMES)[number];

export type IdentityResolutionOutcome = {
  readonly kind: IdentityResolutionKind;
  readonly publicName: string;
  readonly legalName: string;
  readonly usdot: string | null;
};

export type AuthorityLifecycleStatus = 'active' | 'inactive' | 'revoked' | 'unknown';

/**
 * A shared USDOT is a collision signal, not a merge instruction.
 * Distinct legal names must stay separate public identities.
 */
export function sharedUsdotRequiresMerge(input: {
  usdot: string;
  legalNames: readonly string[];
}): boolean {
  if (!input.usdot) return false;
  const names = [
    ...new Set(input.legalNames.map((name) => name.trim().toUpperCase()).filter(Boolean)),
  ];
  return names.length === 1;
}

export function shouldInheritAgentUsdot(_input: {
  networkUsdot: string;
  agentUsdot: string;
}): boolean {
  return false;
}

/** Prefer the unsuffixed directory id as the canonical duplicate. */
export function chooseCanonicalDuplicateId(ids: readonly string[]): string {
  const unique = [...new Set(ids.filter(Boolean))];
  const unsuffixed = unique.filter((id) => !/-\d+$/.test(id));
  const pool = unsuffixed.length ? unsuffixed : unique;
  return [...pool].sort((a, b) => a.localeCompare(b))[0] ?? unique[0] ?? '';
}

export function canRenderAuthorityVerifiedBadge(
  evidenceState: CapabilityEvidenceState
): boolean {
  return evidenceState === 'VERIFIED';
}

export function isHistoricalAuthorityStatus(status: AuthorityLifecycleStatus): boolean {
  return status === 'inactive' || status === 'revoked';
}

export function evidenceStateForCopy(
  states: readonly CapabilityEvidenceState[]
): CapabilityEvidenceState {
  if (states.includes('VERIFIED') && states.every((state) => state === 'VERIFIED')) {
    return 'VERIFIED';
  }
  if (states.includes('VERIFIED')) return 'VERIFIED';
  if (states.includes('REVIEW_REQUIRED')) return 'REVIEW_REQUIRED';
  return 'INFERRED';
}
