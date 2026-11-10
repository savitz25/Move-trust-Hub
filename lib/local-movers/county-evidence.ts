import {
  distanceHqToCountyMiles,
  hasInCountyNameMatch,
  LOCAL_HQ_MAX_MILES,
} from '@/lib/local-movers/locality-rules';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';

/** A selected county alone is a claim, not evidence of service there. */
export function hasCountyServiceEvidence(mover: LocalMover, county: LocalCounty): boolean {
  if (mover.countyEvidence === 'verified_home_county') return true;
  if (mover.headquartersState?.toUpperCase() !== county.stateCode.toUpperCase()) return false;
  if (hasInCountyNameMatch(mover, county)) return true;
  const miles = distanceHqToCountyMiles(mover, county);
  return miles != null && miles <= LOCAL_HQ_MAX_MILES;
}

/** Match the public profile contract, then reject independently unsafe standing. */
export function isPublishableCountyCompany(company: {
  publication_state?: string | null;
  out_of_service?: boolean | null;
  authority_active?: boolean | null;
  service_scope?: string | null;
}): boolean {
  const state = company.publication_state;
  if (
    state != null &&
    state !== 'PUBLISHABLE' &&
    state !== 'INDEXABLE' &&
    state !== 'VERIFIED'
  ) return false;
  if (!isAnonymousPublicProfileAllowed({ publicationState: state as PublicationState | null })) {
    return false;
  }
  if (company.out_of_service === true) return false;
  return true;
}
