/**
 * Lightweight cross-hub entity reference (Step 5.4).
 * Not a global UUID graph — hub-local ids only.
 */

import type { TrustHubId } from '@/lib/network/trust-profile';
import { hubCanonicalUrl } from '@/lib/hub/paths';

export type NetworkEntityRef = {
  hub: Exclude<TrustHubId, 'ask'>;
  /** Hub-local stable id (slug preferred for URLs) */
  entityId: string;
  /** Canonical public profile URL */
  profileUrl: string;
};

/** Profile path patterns by hub (existing production routes). */
export const ENTITY_PROFILE_PATH = {
  move: (slug: string) => `/companies/${slug}`,
  insurance: (slug: string) => `/providers/${slug}`,
  lender: (slug: string) => `/lenders/${slug}`,
} as const;

export function entityRef(
  hub: NetworkEntityRef['hub'],
  entityId: string,
  profileUrl?: string
): NetworkEntityRef {
  const path = ENTITY_PROFILE_PATH[hub](entityId);
  return {
    hub,
    entityId,
    profileUrl: profileUrl ?? hubCanonicalUrl(hub, path),
  };
}

export function entityRefFromProfile(profile: {
  hub: TrustHubId;
  entityId: string;
  profileUrl: string;
}): NetworkEntityRef | null {
  if (profile.hub === 'ask') return null;
  return {
    hub: profile.hub,
    entityId: profile.entityId,
    profileUrl: profile.profileUrl,
  };
}
