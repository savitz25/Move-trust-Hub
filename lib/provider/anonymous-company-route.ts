/**
 * Anonymous /companies/{slug} HTTP contract.
 * INGESTED / unknown → 404. Public federal + PUBLISHABLE canary remain 200.
 * Google Places requests: 0.
 */
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';

export const ANONYMOUS_COMPANY_GOOGLE_PLACES_REQUESTS = 0 as const;

export function anonymousCompanyHttpStatus(
  company:
    | {
        publicationState?: PublicationState | null;
        indexable?: boolean | null;
      }
    | null
    | undefined
): 200 | 404 {
  if (!company) return 404;
  return isAnonymousPublicProfileAllowed(company) ? 200 : 404;
}

export function isAnonymousCompanyNotFound(
  company:
    | {
        publicationState?: PublicationState | null;
        indexable?: boolean | null;
      }
    | null
    | undefined
): boolean {
  return anonymousCompanyHttpStatus(company) === 404;
}
