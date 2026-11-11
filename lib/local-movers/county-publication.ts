import { isConsumerVisibleCompany } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';

/**
 * County listings use the consumer-profile gate.
 * REVIEW_REQUIRED, INACTIVE, INGESTED, and CLASSIFIED stay off the page,
 * so the card cannot link to a profile that returns not found.
 * Null publication_state stays visible (legacy rows).
 * The companies table has no is_published column; publication_state is the flag.
 */
export function isPublishableCountyCompany(
  publicationState: string | null | undefined
): boolean {
  return isConsumerVisibleCompany({
    publicationState: (publicationState ?? null) as PublicationState | null,
  });
}
