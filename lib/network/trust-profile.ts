/**
 * Network-wide Trust Profile shell contract (Step 5).
 * Shell is shared; verification engines remain vertical-specific.
 * @see docs/TRUST-PROFILE-CONTRACT.md
 */

import { ASK_TRUST_HUB, HUB_METHODOLOGY_URLS } from '@/lib/network/ask-trust-hub';

export type TrustHubId = 'move' | 'insurance' | 'lender' | 'ask';

export type TrustSourceStatus =
  | 'verified'
  | 'unverified'
  | 'not_applicable'
  | 'error'
  | 'stale';

export type TrustSourceRef = {
  /** Stable source key, e.g. fmcsa | nmls | doi | google | bbb */
  id: string;
  label: string;
  status: TrustSourceStatus;
  /** ISO timestamp when known */
  lastChecked?: string;
  /** Regulator or public source link */
  url?: string;
  /** Short limitation */
  note?: string;
};

export type TrustProfileContact = {
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
};

export type TrustProfileReputation = {
  /** Only if hub actually computes one */
  score?: number;
  scoreLabel?: string;
  scoreMax?: number;
  /** One-line limitation */
  summary?: string;
};

export type TrustProfileVerification = {
  /** e.g. "FMCSA authority checked" */
  primaryLabel: string;
  /** Hub-defined meaning of verified */
  isVerified: boolean;
  sources: TrustSourceRef[];
};

/** Core shell — vertical engines map into this shape via adapters. */
export type TrustProfileShell = {
  hub: TrustHubId;
  /** Stable hub-local id (slug, UUID, USDOT, NMLS, etc.) */
  entityId: string;
  /** Public display name (DBA preferred when policy says so) */
  displayName: string;
  /** Optional legal name if different */
  legalName?: string;
  /** Canonical https URL on the hub */
  profileUrl: string;
  serviceScope?: 'interstate' | 'intrastate' | 'unknown';

  verification: TrustProfileVerification;
  reputation?: TrustProfileReputation;
  contact?: TrustProfileContact;

  /** Last material data refresh (ISO) */
  updatedAt?: string;
  methodologyUrl: string;
  standardUrl: string;

  /** Optional vertical bags — not mixed into core blindly */
  extensions?: TrustProfileExtensions;
};

export type MoveTrustExtensions = {
  usdot?: string;
  mcNumber?: string;
  authorityStatus?: string;
  fmcsaSafetyRating?: string;
  outOfService?: boolean;
};

export type InsuranceTrustExtensions = {
  licenseNumber?: string;
  npn?: string;
  state?: string;
  city?: string;
  linesOfAuthority?: string[];
};

export type LenderTrustExtensions = {
  nmlsId?: string;
  companyType?: string;
  state?: string;
  county?: string;
  /** Editorial/seed estimates only — never present as NMLS fields */
  avgCloseDaysEstimate?: number;
  onTimeCloseRateEstimate?: number;
};

export type TrustProfileExtensions = {
  move?: MoveTrustExtensions;
  insurance?: InsuranceTrustExtensions;
  lender?: LenderTrustExtensions;
};

export function defaultMethodologyUrl(hub: Exclude<TrustHubId, 'ask'>): string {
  return HUB_METHODOLOGY_URLS[hub];
}

export function defaultStandardUrl(): string {
  return ASK_TRUST_HUB.standardUrl ?? ASK_TRUST_HUB.methodologyUrl;
}

/**
 * Sources safe to show as chips.
 * Prefer hide: not_applicable, unverified, and empty labels never render as noise.
 */
export function visibleTrustSources(sources: TrustSourceRef[]): TrustSourceRef[] {
  return sources.filter(
    (s) =>
      Boolean(s.label?.trim()) &&
      (s.status === 'verified' || s.status === 'stale' || s.status === 'error')
  );
}

/** Format ISO date for shell freshness (omit if unparseable). */
export function formatTrustProfileDate(iso?: string | null): string | null {
  if (!iso?.trim()) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** True when reputation has a real score to display. */
export function hasDisplayableScore(
  reputation?: TrustProfileReputation | null
): reputation is TrustProfileReputation & { score: number } {
  return (
    reputation != null &&
    typeof reputation.score === 'number' &&
    Number.isFinite(reputation.score) &&
    (reputation.scoreMax == null || reputation.scoreMax > 0)
  );
}

export function hubBadgeLabel(hub: TrustHubId): string {
  switch (hub) {
    case 'move':
      return 'Move Trust Hub';
    case 'insurance':
      return 'Insurance Trust Hub';
    case 'lender':
      return 'Lender Trust Hub';
    case 'ask':
      return 'Ask Trust Hub';
    default:
      return 'Trust Hub';
  }
}
