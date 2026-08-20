import type { CapabilityInput } from '@/lib/provider/infer-capabilities';
import { classifyProvider } from '@/lib/provider/classification';
import type { PublicationState } from '@/lib/provider/types';

export type PublicationInput = CapabilityInput & {
  isVerified?: boolean | null;
  outOfService?: boolean | null;
  usdotStatus?: string | null;
  authorityActive?: boolean | null;
  identityReviewRequired?: boolean;
};

export function resolvePublicationState(input: PublicationInput): {
  publicationState: PublicationState;
  indexable: boolean;
} {
  if (input.identityReviewRequired) {
    return { publicationState: 'REVIEW_REQUIRED', indexable: false };
  }

  const status = (input.usdotStatus ?? '').toUpperCase();
  if (input.outOfService || status === 'OUT OF SERVICE' || status === 'INACTIVE') {
    return { publicationState: 'INACTIVE', indexable: false };
  }

  const classified = classifyProvider(input);
  if (classified.capabilities.length === 0) {
    return { publicationState: 'REVIEW_REQUIRED', indexable: false };
  }

  if (input.isVerified) {
    return { publicationState: 'PUBLISHABLE', indexable: true };
  }

  return { publicationState: 'INGESTED', indexable: false };
}

export function isIndexablePublication(state: PublicationState): boolean {
  return state === 'PUBLISHABLE' || state === 'INDEXABLE';
}

/**
 * Consumer directory visibility. Legacy rows without publication_state stay
 * visible. Explicit fail-closed states never appear in /companies search.
 */
export function isConsumerVisibleCompany(company: {
  publicationState?: PublicationState | null;
}): boolean {
  const state = company.publicationState;
  if (
    state === 'REVIEW_REQUIRED' ||
    state === 'INACTIVE' ||
    state === 'INGESTED' ||
    state === 'CLASSIFIED'
  ) {
    return false;
  }
  return true;
}

export function isSeoIndexableCompany(company: {
  indexable?: boolean | null;
  publicationState?: PublicationState | null;
}): boolean {
  if (company.indexable === false) return false;
  const state = company.publicationState;
  if (
    state === 'REVIEW_REQUIRED' ||
    state === 'INACTIVE' ||
    state === 'INGESTED' ||
    state === 'CLASSIFIED'
  ) {
    return false;
  }
  return true;
}

export function assertIndexableInvariant(input: {
  publicationState: PublicationState;
  indexable: boolean;
}): boolean {
  if (!input.indexable) return true;
  return isIndexablePublication(input.publicationState);
}
