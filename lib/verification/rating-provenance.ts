import type { Company } from '@/types';
import {
  GOOGLE_PLACES_MIN_ACCEPT_SCORE,
  parseCityStateFromHeadquarters,
  scoreGooglePlaceMatch,
} from '@/lib/verification/google-places-name-queries';
import { hasGoogleReputationSnapshot } from '@/lib/verification/google-reputation-snapshot';
import type { GooglePlacesData } from '@/lib/verification/types';

/**
 * Shared card/profile/backfill contract for one rating observation.
 * A scalar is displayed only with the provider, source, observation date,
 * and brand/location scope that produced it.
 */
export type RatingScope = 'location' | 'shared_location' | 'unverified';

export type ProviderIdentity = {
  id: string;
  name: string;
  legalName?: string | null;
  usdotNumber?: string | null;
  website?: string | null;
  phone?: string | null;
  headquarters?: string | null;
};

export type RatingProvenance = {
  providerId: string;
  source: 'google_places_api' | 'stored_column' | 'none';
  sourceLabel: string;
  scope: RatingScope | 'none';
  scopeLabel: string;
  observedAt: string | null;
  rating: number | null;
  reviewCount: number | null;
  placeId: string | null;
  placeName: string | null;
  applicable: boolean;
  withheldReason: string | null;
};

export type PlaceHolder = {
  companyId: string;
  companyName: string;
  legalName?: string | null;
  usdotNumber?: string | null;
  website?: string | null;
  placeId: string;
  placeName?: string | null;
  formattedAddress?: string | null;
  sharedLocationEvidence?: boolean;
};

export type PlaceAttachmentDecision = {
  action: 'attach' | 'review';
  scope: 'location' | 'shared_location' | null;
  reason: string;
  /** This guard never deletes another company's place association. */
  deleteHolderIds: [];
};

export type RatingReview = {
  providerId: string;
  placeId: string | null;
  reason: string;
  holderIds: string[];
};

const CONFLICT_REASON = 'Google listing does not match this business identity';

export function hasSharedLocationEvidence(
  data: GooglePlacesData | null | undefined
): boolean {
  const evidence = data?.shared_location_evidence;
  return (
    data?.association_scope === 'shared_location' &&
    typeof evidence?.premise === 'string' &&
    evidence.premise.trim().length > 0 &&
    typeof evidence.observed_at === 'string' &&
    Number.isFinite(Date.parse(evidence.observed_at))
  );
}

export function googleIdentityScore(
  google: Pick<GooglePlacesData, 'name' | 'formatted_address' | 'phone' | 'website_url'>,
  provider: ProviderIdentity
): number {
  const geo = parseCityStateFromHeadquarters(provider.headquarters);
  const names = [provider.name, provider.legalName]
    .map((value) => value?.trim() || '')
    .filter((value) => value.length > 0);
  let best = 0;
  for (const name of names) {
    best = Math.max(
      best,
      scoreGooglePlaceMatch(
        {
          displayName: google.name,
          formattedAddress: google.formatted_address,
          phone: google.phone,
          websiteUri: google.website_url,
        },
        name,
        geo.city,
        geo.state,
        provider.phone,
        provider.website
      )
    );
  }
  return best;
}

/** A named listing that fails identity and has no shared-location evidence. */
export function isRejectedGoogleListing(
  google: GooglePlacesData | null | undefined,
  provider: ProviderIdentity
): boolean {
  if (!google?.name?.trim()) return false;
  if (hasSharedLocationEvidence(google)) return false;
  return googleIdentityScore(google, provider) < GOOGLE_PLACES_MIN_ACCEPT_SCORE;
}

function googleHasDisplayNumbers(google: GooglePlacesData): boolean {
  const sourceOk = google.source == null || google.source === 'google_places_api';
  return (
    sourceOk &&
    typeof google.rating === 'number' &&
    Number.isFinite(google.rating) &&
    google.rating > 0 &&
    google.rating <= 5 &&
    typeof google.review_count === 'number' &&
    google.review_count > 0
  );
}

function sameBusiness(left: ProviderIdentity, right: ProviderIdentity): boolean {
  const leftDot = (left.usdotNumber ?? '').replace(/\D/g, '');
  const rightDot = (right.usdotNumber ?? '').replace(/\D/g, '');
  if (leftDot.length >= 5 && leftDot === rightDot) return true;
  return (
    googleIdentityScore(
      {
        name: right.name,
        formatted_address: right.headquarters ?? null,
        phone: right.phone ?? null,
        website_url: right.website ?? null,
      },
      left
    ) >= GOOGLE_PLACES_MIN_ACCEPT_SCORE
  );
}

function locationLabel(google: GooglePlacesData): string {
  const place = google.name?.trim() || 'Google listing';
  const address = google.formatted_address?.trim();
  return address ? `Location listing · ${place} · ${address}` : `Location listing · ${place}`;
}

function emptyProvenance(providerId: string, withheldReason: string | null): RatingProvenance {
  return {
    providerId,
    source: 'none',
    sourceLabel: 'No verified rating source',
    scope: 'none',
    scopeLabel: 'No applicable scope',
    observedAt: null,
    rating: null,
    reviewCount: null,
    placeId: null,
    placeName: null,
    applicable: false,
    withheldReason,
  };
}

export function selectRatingProvenance(input: {
  provider: ProviderIdentity;
  google?: GooglePlacesData | null;
  storedRating?: number | null;
  storedReviewCount?: number | null;
  /** Offered only so callers can prove a catalog seed is not selected. */
  seedRating?: number | null;
  seedReviewCount?: number | null;
  realBusiness?: boolean;
}): { provenance: RatingProvenance; displayGoogle: GooglePlacesData | null; review: RatingReview | null } {
  const google = input.google ?? null;
  const providerId = input.provider.id;
  const seedOffered = (input.seedRating ?? 0) > 0;
  void input.seedReviewCount;

  if (google && isRejectedGoogleListing(google, input.provider)) {
    return {
      displayGoogle: null,
      review: {
        providerId,
        placeId: google.place_id,
        reason: CONFLICT_REASON,
        holderIds: [],
      },
      provenance: emptyProvenance(providerId, CONFLICT_REASON),
    };
  }

  if (google && (hasGoogleReputationSnapshot(google) || googleHasDisplayNumbers(google))) {
    const shared = hasSharedLocationEvidence(google);
    const named = Boolean(google.name?.trim());
    const full = hasGoogleReputationSnapshot(google);
    const scope = shared ? 'shared_location' : named ? 'location' : 'unverified';
    const scopeLabel = shared
      ? `Shared location · ${google.shared_location_evidence?.premise?.trim()}`
      : named
        ? locationLabel(google)
        : 'Listing identity is not on this snapshot';
    return {
      displayGoogle: google,
      review: null,
      provenance: {
        providerId,
        source: 'google_places_api',
        sourceLabel: 'Google Places',
        scope,
        scopeLabel,
        observedAt: full ? google.last_fetched : null,
        rating: google.rating,
        reviewCount: google.review_count,
        placeId: google.place_id,
        placeName: google.name,
        applicable: Boolean(full && (named || shared)),
        withheldReason: null,
      },
    };
  }

  const storedRating = Number(input.storedRating) || 0;
  const storedCount = Number(input.storedReviewCount) || 0;
  if (input.realBusiness && storedRating > 0 && storedCount > 0) {
    return {
      displayGoogle: null,
      review: null,
      provenance: {
        providerId,
        source: 'stored_column',
        sourceLabel: 'Stored rating',
        scope: 'unverified',
        scopeLabel: 'Source not verified on this record',
        observedAt: null,
        rating: storedRating,
        reviewCount: storedCount,
        placeId: null,
        placeName: null,
        applicable: false,
        withheldReason: null,
      },
    };
  }

  return {
    displayGoogle: null,
    review: null,
    provenance: emptyProvenance(
      providerId,
      seedOffered ? 'Catalog seed rating is not a verified source for this business' : null
    ),
  };
}

export function applyRatingProvenance(
  company: Company,
  input?: {
    storedRating?: number | null;
    storedReviewCount?: number | null;
    seedRating?: number | null;
    seedReviewCount?: number | null;
    realBusiness?: boolean;
  }
): Company {
  const selected = selectRatingProvenance({
    provider: {
      id: company.id,
      name: company.name,
      legalName: company.fmcsaLegalName,
      usdotNumber: company.usdotNumber,
      website: company.website,
      phone: company.phone,
      headquarters: company.headquarters,
    },
    google: company.googleData,
    storedRating: input?.storedRating,
    storedReviewCount: input?.storedReviewCount,
    seedRating: input?.seedRating,
    seedReviewCount: input?.seedReviewCount,
    realBusiness: input?.realBusiness,
  });
  return {
    ...company,
    overallRating: selected.provenance.rating ?? 0,
    reviewCount: selected.provenance.reviewCount ?? 0,
    googleData: selected.displayGoogle,
    ratingProvenance: selected.provenance,
  };
}

/**
 * Decide whether an enrichment write may store this Google listing.
 * Ambiguous and conflicting listings are review records. Existing holders
 * are never deleted, including evidenced shared-location rows.
 */
export function decidePlaceAttachment(input: {
  target: ProviderIdentity;
  incoming: GooglePlacesData;
  holders?: PlaceHolder[];
}): PlaceAttachmentDecision & { review: RatingReview | null } {
  const holders = input.holders ?? [];
  const placeId = input.incoming.place_id?.trim() || null;
  if (!placeId || input.incoming.status !== 'ok') {
    return {
      action: 'attach',
      scope: null,
      reason: 'no_place_listing',
      deleteHolderIds: [],
      review: null,
    };
  }

  const shared = hasSharedLocationEvidence(input.incoming);
  const identityOk =
    googleIdentityScore(input.incoming, input.target) >= GOOGLE_PLACES_MIN_ACCEPT_SCORE;
  const foreignHolders = holders.filter((holder) => holder.companyId !== input.target.id && holder.placeId === placeId);
  const conflictingHolders = foreignHolders.filter((holder) => {
    if (holder.sharedLocationEvidence) return false;
    return !sameBusiness(input.target, {
      id: holder.companyId,
      name: holder.companyName,
      legalName: holder.legalName,
      usdotNumber: holder.usdotNumber,
      website: holder.website,
      headquarters: holder.formattedAddress,
    });
  });

  if (shared) {
    return {
      action: 'attach',
      scope: 'shared_location',
      reason: 'evidenced_shared_location',
      deleteHolderIds: [],
      review: null,
    };
  }

  if (!identityOk || conflictingHolders.length > 0) {
    const reason = !identityOk
      ? CONFLICT_REASON
      : 'Google listing is already associated with a different business';
    return {
      action: 'review',
      scope: null,
      reason,
      deleteHolderIds: [],
      review: {
        providerId: input.target.id,
        placeId,
        reason,
        holderIds: conflictingHolders.map((holder) => holder.companyId),
      },
    };
  }

  return {
    action: 'attach',
    scope: 'location',
    reason: 'identity_match',
    deleteHolderIds: [],
    review: null,
  };
}
