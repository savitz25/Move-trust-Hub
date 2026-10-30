import type { Company } from '@/types';
import {
  GOOGLE_PLACES_MIN_ACCEPT_SCORE,
  normalizeNameForMatch,
  parseCityStateFromHeadquarters,
  scoreGooglePlaceMatch,
  stripLegalEntitySuffixes,
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
  phone?: string | null;
  /** Company headquarters, not the Google formatted address. */
  headquarters?: string | null;
  placeId: string;
  placeName?: string | null;
  formattedAddress?: string | null;
  /**
   * Raw evidence copied from the holder row. A boolean or a prose note is
   * not evidence; only an auditable relationship and source qualify.
   */
  sharedLocationEvidence?: unknown;
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
const USDOT_CONFLICT_REASON =
  'Unresolved identity conflict between distinct USDOT records; listing was not attached';
const LOOKUP_FAILED_REASON = 'Place association lookup failed; listing was not attached';
const INCOMPLETE_ENUMERATION_REASON =
  'Holder enumeration is incomplete; listing was not attached';
const AMBIGUOUS_ENUMERATION_REASON =
  'Holder enumeration is ambiguous; listing was not attached';
const UNRESERVED_REASON =
  'Place association cannot be reserved atomically; listing was not attached';

/**
 * Each PostgREST holder query stops at this many rows. A full page is not
 * proof that a later row is absent.
 */
export const PLACE_HOLDER_READ_LIMIT = 25;

export type HolderEnumeration = 'complete' | 'incomplete' | 'failed' | 'ambiguous';

/** Relationship classes that may bypass a place conflict. Free text is not a class. */
export const SHARED_LOCATION_RELATIONSHIPS = [
  'same_premise',
  'co_located_office',
  'shared_terminal',
] as const;

export type SharedLocationRelationship = (typeof SHARED_LOCATION_RELATIONSHIPS)[number];

const SOURCE_SYSTEM = /^[a-z][a-z0-9_]{1,40}$/;
const SOURCE_RECORD_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,80}$/;

/**
 * A premise sentence and a date do not identify who established the
 * relationship or where that record can be audited.
 */
export function isAuditableSharedLocationEvidence(
  evidence: unknown,
  scope?: string | null
): boolean {
  if (scope != null && scope !== 'shared_location') return false;
  if (!evidence || typeof evidence !== 'object') return false;
  const row = evidence as {
    observed_at?: unknown;
    premise?: unknown;
    relationship?: unknown;
    source?: { system?: unknown; record_id?: unknown } | null;
  };
  const relationship = typeof row.relationship === 'string' ? row.relationship : '';
  const system = typeof row.source?.system === 'string' ? row.source.system : '';
  const recordId = typeof row.source?.record_id === 'string' ? row.source.record_id.trim() : '';
  return (
    (SHARED_LOCATION_RELATIONSHIPS as readonly string[]).includes(relationship) &&
    SOURCE_SYSTEM.test(system) &&
    SOURCE_RECORD_ID.test(recordId) &&
    typeof row.premise === 'string' &&
    row.premise.trim().length > 0 &&
    typeof row.observed_at === 'string' &&
    Number.isFinite(Date.parse(row.observed_at))
  );
}

export function hasSharedLocationEvidence(
  data: GooglePlacesData | null | undefined
): boolean {
  return isAuditableSharedLocationEvidence(
    data?.shared_location_evidence,
    data?.association_scope
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

function addressHasStreetNumber(address: string | null | undefined): boolean {
  return /\d/.test(address ?? '');
}

function headquartersCityInAddress(
  headquarters: string | null | undefined,
  formattedAddress: string | null | undefined
): boolean {
  const city = parseCityStateFromHeadquarters(headquarters).city.trim();
  return city.length >= 4 && (formattedAddress ?? '').toUpperCase().includes(city.toUpperCase());
}

/**
 * A trailing market token ("Birmingham") or "of {place}" can name the
 * franchise territory while the listing address names the headquarters city.
 * Only a street address is eligible, so a headquarters-to-headquarters
 * comparison does not become a looser write-guard match. One trailing token
 * is removed. An earlier brand token that the place name lacks still fails.
 */
function locationScopedSearchNames(
  name: string | null | undefined,
  formattedAddress: string | null | undefined,
  headquarters: string | null | undefined
): string[] {
  if (!addressHasStreetNumber(formattedAddress)) return [];
  if (!headquartersCityInAddress(headquarters, formattedAddress)) return [];
  const base = stripLegalEntitySuffixes(name ?? '').trim();
  if (!base) return [];
  const names: string[] = [];
  const ofStripped = base.replace(/\s+of\s+\S+(?:\s+\S+){0,2}$/i, '').trim();
  if (ofStripped && ofStripped !== base && ofStripped.split(/\s+/).length >= 2) {
    names.push(ofStripped);
  }
  const parts = base.split(/\s+/);
  if (parts.length >= 3) {
    const dropped = parts.slice(0, -1).join(' ');
    if (dropped.split(/\s+/).length >= 2) names.push(dropped);
  }
  return names;
}

/**
 * Name and location agreement only. Website and phone are excluded because
 * a copied listing contact must not make two businesses the same identity.
 * The returned score is the best of the given names and a location-scoped
 * variant, so an existing exact match cannot get worse.
 */
export function nameIdentityScore(
  placeName: string | null | undefined,
  formattedAddress: string | null | undefined,
  provider: ProviderIdentity
): number {
  const providerNoContact = { ...provider, phone: null, website: null };
  let best = googleIdentityScore(
    {
      name: placeName ?? null,
      formatted_address: formattedAddress ?? null,
      phone: null,
      website_url: null,
    },
    providerNoContact
  );
  const geo = parseCityStateFromHeadquarters(provider.headquarters);
  const extras = [
    ...locationScopedSearchNames(provider.name, formattedAddress, provider.headquarters),
    ...locationScopedSearchNames(provider.legalName, formattedAddress, provider.headquarters),
  ];
  for (const name of extras) {
    best = Math.max(
      best,
      scoreGooglePlaceMatch(
        {
          displayName: placeName ?? null,
          formattedAddress: formattedAddress ?? null,
          phone: null,
          websiteUri: null,
        },
        name,
        geo.city,
        geo.state,
        null,
        null
      )
    );
  }
  return best;
}

function usdotKey(value: string | null | undefined): string {
  const digits = (value ?? '').replace(/\D/g, '');
  return digits.length >= 5 ? digits : '';
}

/** A named listing that fails name identity and has no auditable shared-location evidence. */
export function isRejectedGoogleListing(
  google: GooglePlacesData | null | undefined,
  provider: ProviderIdentity
): boolean {
  if (!google?.name?.trim()) return false;
  if (hasSharedLocationEvidence(google)) return false;
  return (
    nameIdentityScore(google.name, google.formatted_address, provider) <
    GOOGLE_PLACES_MIN_ACCEPT_SCORE
  );
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
  const leftDot = usdotKey(left.usdotNumber);
  const rightDot = usdotKey(right.usdotNumber);
  if (leftDot && rightDot && leftDot === rightDot) return true;
  // Distinct USDOT values are an unresolved conflict. Name, website, or
  // phone similarity must not close it.
  if (leftDot && rightDot && leftDot !== rightDot) return false;
  return (
    nameIdentityScore(right.name, right.headquarters, left) >= GOOGLE_PLACES_MIN_ACCEPT_SCORE
  );
}

function holderSharesLocation(holder: PlaceHolder): boolean {
  return isAuditableSharedLocationEvidence(holder.sharedLocationEvidence, 'shared_location');
}

export type PlaceAssociationClass =
  | 'rightful_owner'
  | 'same_legal_business'
  | 'shared_location'
  | 'distinct_unresolved'
  | 'missing_profile';

export type ClassifiedPlaceAssociation = {
  companyId: string;
  associationClass: PlaceAssociationClass;
  displayRating: boolean;
  score: number;
};

function identityName(holder: PlaceHolder): string {
  return normalizeNameForMatch(stripLegalEntitySuffixes(holder.companyName));
}

function sameNormalizedName(left: PlaceHolder, right: PlaceHolder): boolean {
  const a = identityName(left);
  const b = identityName(right);
  return Boolean(a) && a === b;
}

/** One trade name contains the other, so "Cord … Memphis" can match "Cord …". */
function namesContain(left: PlaceHolder, right: PlaceHolder): boolean {
  const a = identityName(left);
  const b = identityName(right);
  if (!a || !b) return false;
  const shorter = a.length <= b.length ? a : b;
  const longer = a.length <= b.length ? b : a;
  if (shorter.split(' ').length < 2) return false;
  return ` ${longer} `.includes(` ${shorter} `);
}

function usdotConflicts(left: PlaceHolder, right: PlaceHolder): boolean {
  const a = usdotKey(left.usdotNumber);
  const b = usdotKey(right.usdotNumber);
  return Boolean(a && b && a !== b);
}

function sameUsdot(left: PlaceHolder, right: PlaceHolder): boolean {
  const a = usdotKey(left.usdotNumber);
  const b = usdotKey(right.usdotNumber);
  return Boolean(a) && a === b;
}

function holdersShareIdentity(group: PlaceHolder[]): boolean {
  if (group.length <= 1) return true;
  const first = group[0]!;
  return group.every((holder) => sameUsdot(first, holder) || sameNormalizedName(first, holder));
}

/**
 * Classify companies that already store one Google place id.
 * This does not reserve the place and does not delete an association.
 * A failed or incomplete holder read must not call this with a partial page
 * and then withhold the rightful owner; callers omit the list in that case.
 */
export function classifySharedPlaceHolders(holders: PlaceHolder[]): ClassifiedPlaceAssociation[] {
  const drafts = holders.map((holder) => {
    const missing = !holder.companyName?.trim() || !holder.placeName?.trim() || !holder.placeId?.trim();
    const shared = !missing && holderSharesLocation(holder);
    const score = missing
      ? 0
      : nameIdentityScore(holder.placeName, holder.formattedAddress, {
          id: holder.companyId,
          name: holder.companyName,
          legalName: holder.legalName,
          usdotNumber: holder.usdotNumber,
          headquarters: holder.headquarters,
          phone: null,
          website: null,
        });
    return {
      holder,
      score,
      missing,
      shared,
      locationAgrees: headquartersCityInAddress(holder.headquarters, holder.formattedAddress),
    };
  });

  const competitive = drafts.filter(
    (draft) => !draft.missing && !draft.shared && draft.score >= GOOGLE_PLACES_MIN_ACCEPT_SCORE
  );
  const agreeing = competitive.filter((draft) => draft.locationAgrees);
  const pool = agreeing.length > 0 ? agreeing : competitive;
  const topScore = pool.reduce((max, draft) => Math.max(max, draft.score), 0);
  const tops = pool.filter((draft) => draft.score === topScore);
  const topHolders = tops.map((draft) => draft.holder);
  const topIds = new Set(topHolders.map((holder) => holder.companyId));
  const sharedTopIdentity = tops.length > 1 && holdersShareIdentity(topHolders);
  const unresolvedTie = tops.length > 1 && !sharedTopIdentity;

  const sameAsWinner = (holder: PlaceHolder) => topHolders.some((top) => sameUsdot(holder, top));

  return drafts.map((draft) => {
    const companyId = draft.holder.companyId;
    if (draft.missing) {
      return { companyId, associationClass: 'missing_profile', displayRating: false, score: 0 };
    }
    if (draft.shared) {
      return {
        companyId,
        associationClass: 'shared_location',
        displayRating: true,
        score: draft.score,
      };
    }
    if (unresolvedTie && topIds.has(companyId)) {
      return {
        companyId,
        associationClass: 'distinct_unresolved',
        displayRating: false,
        score: draft.score,
      };
    }
    if (tops.length === 1 && companyId === tops[0]!.holder.companyId) {
      return { companyId, associationClass: 'rightful_owner', displayRating: true, score: draft.score };
    }
    if (sharedTopIdentity && topIds.has(companyId)) {
      return {
        companyId,
        associationClass: 'same_legal_business',
        displayRating: true,
        score: draft.score,
      };
    }
    const containedLegalSlug =
      draft.locationAgrees &&
      topHolders.some(
        (top) => !usdotConflicts(draft.holder, top) && namesContain(draft.holder, top)
      );
    if (
      !unresolvedTie &&
      draft.score >= GOOGLE_PLACES_MIN_ACCEPT_SCORE &&
      (sameAsWinner(draft.holder) || containedLegalSlug)
    ) {
      return {
        companyId,
        associationClass: 'same_legal_business',
        displayRating: true,
        score: draft.score,
      };
    }
    return {
      companyId,
      associationClass: 'distinct_unresolved',
      displayRating: false,
      score: draft.score,
    };
  });
}

function completeHolderRead(
  holders: PlaceHolder[] | undefined,
  enumeration: HolderEnumeration | undefined
): PlaceHolder[] | null {
  if (!holders) return null;
  const status =
    enumeration ?? (holders.length >= PLACE_HOLDER_READ_LIMIT ? 'incomplete' : 'complete');
  if (status !== 'complete') return null;
  return holders;
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
  /**
   * Other rows that store this place id, including this provider.
   * Omit the list when the read failed, was ambiguous, or hit the row cap.
   * A partial list must not withhold a rightful owner.
   */
  samePlaceHolders?: PlaceHolder[];
  holderEnumeration?: HolderEnumeration;
}): { provenance: RatingProvenance; displayGoogle: GooglePlacesData | null; review: RatingReview | null } {
  const google = input.google ?? null;
  const providerId = input.provider.id;
  const seedOffered = (input.seedRating ?? 0) > 0;
  void input.seedReviewCount;
  const holders = completeHolderRead(input.samePlaceHolders, input.holderEnumeration);
  let classifiedMine: ClassifiedPlaceAssociation | undefined;
  if (holders && google?.place_id) {
    const classified = classifySharedPlaceHolders(
      holders.filter((holder) => holder.placeId === google.place_id)
    );
    classifiedMine = classified.find((row) => row.companyId === providerId);
    if (classifiedMine && !classifiedMine.displayRating) {
      return {
        displayGoogle: null,
        review: {
          providerId,
          placeId: google.place_id,
          reason: CONFLICT_REASON,
          holderIds: holders
            .filter((holder) => holder.companyId !== providerId)
            .map((holder) => holder.companyId),
        },
        provenance: emptyProvenance(providerId, CONFLICT_REASON),
      };
    }
  }

  if (google && isRejectedGoogleListing(google, input.provider) && !classifiedMine?.displayRating) {
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
    const shared =
      hasSharedLocationEvidence(google) || classifiedMine?.associationClass === 'shared_location';
    const named = Boolean(google.name?.trim());
    const full = hasGoogleReputationSnapshot(google);
    const scope = shared ? 'shared_location' : named ? 'location' : 'unverified';
    const scopeLabel = shared
      ? `Shared location · ${google.shared_location_evidence?.relationship} · ${google.shared_location_evidence?.premise?.trim()}`
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
    samePlaceHolders?: PlaceHolder[];
    holderEnumeration?: HolderEnumeration;
  }
): Company {
  const holderContext = company.placeAssociationContext;
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
    samePlaceHolders: input?.samePlaceHolders ?? holderContext?.holders,
    holderEnumeration: input?.holderEnumeration ?? holderContext?.enumeration,
  });
  if (company.ratingProvenance?.withheldReason && !selected.provenance.applicable) {
    return {
      ...company,
      overallRating: 0,
      reviewCount: 0,
      googleData: null,
      ratingProvenance: {
        ...company.ratingProvenance,
        rating: null,
        reviewCount: null,
      },
    };
  }
  return {
    ...company,
    overallRating: selected.provenance.rating ?? 0,
    reviewCount: selected.provenance.reviewCount ?? 0,
    googleData: selected.displayGoogle,
    ratingProvenance: selected.provenance,
  };
}

/**
 * Number to pass to a star widget. A withheld rating and a missing rating
 * are both absent, so neither becomes a zero-star display.
 */
export function displayedRatingValue(company: {
  overallRating?: number | null;
  ratingProvenance?: RatingProvenance | null;
}): number | null {
  if (company.ratingProvenance?.withheldReason) return null;
  const value = Number(company.overallRating) || 0;
  return value > 0 ? value : null;
}

/** Applicable Google Places observation for this business. Not a stored scalar. */
export function isVerifiedGoogleEvidence(
  provenance: RatingProvenance | null | undefined
): boolean {
  if (!provenance?.applicable || provenance.withheldReason) return false;
  return (
    provenance.source === 'google_places_api' &&
    (provenance.scope === 'location' || provenance.scope === 'shared_location')
  );
}

/**
 * Google review cards follow the same decision as the aggregate.
 * The input array is not mutated. Non-Google sources are not labeled Google.
 */
export function googleReviewCardsForProvenance<T extends { source: string; verified?: boolean }>(
  reviews: readonly T[],
  provenance: RatingProvenance | null | undefined
): T[] {
  if (!isVerifiedGoogleEvidence(provenance)) return [];
  return reviews.filter((review) => review.verified === true && review.source === 'Google');
}

function resolveHolderEnumeration(input: {
  holders?: PlaceHolder[];
  holderLookup?: 'succeeded' | 'failed';
  holderEnumeration?: HolderEnumeration;
}): HolderEnumeration {
  if (input.holderLookup === 'failed' || input.holderEnumeration === 'failed') return 'failed';
  if (input.holderEnumeration === 'ambiguous' || input.holderEnumeration === 'incomplete') {
    return input.holderEnumeration;
  }
  if (input.holderEnumeration === 'complete') return 'complete';
  if (input.holders == null) return 'ambiguous';
  if (input.holders.length >= PLACE_HOLDER_READ_LIMIT) return 'incomplete';
  return 'complete';
}

function reviewDecision(
  providerId: string,
  placeId: string,
  reason: string,
  holderIds: string[]
): PlaceAttachmentDecision & { review: RatingReview } {
  return {
    action: 'review',
    scope: null,
    reason,
    deleteHolderIds: [],
    review: { providerId, placeId, reason, holderIds },
  };
}

/**
 * Decide whether an enrichment write may store this Google listing.
 * Existing holders are never deleted.
 *
 * This function does not reserve a place_id. It has no transaction and no
 * unique constraint. Refusing a write here does not stop another writer that
 * skips this guard. A complete holder array is not a lock. A result of
 * PLACE_HOLDER_READ_LIMIT rows is incomplete, not proof that no conflicting
 * holder exists. Failed, incomplete, and ambiguous enumeration is review.
 *
 * A new exclusive association stays in review until the unapplied function
 * claim_google_place_association is approved and used. Auditable shared-location
 * evidence can still attach when enumeration is complete. A company that
 * already stores this place_id may refresh that association.
 */
export function decidePlaceAttachment(input: {
  target: ProviderIdentity;
  incoming: GooglePlacesData;
  holders?: PlaceHolder[];
  /** `failed` must not be treated as proof that no other company holds the place. */
  holderLookup?: 'succeeded' | 'failed';
  /** Omitted means the caller did not prove the holder read was complete. */
  holderEnumeration?: HolderEnumeration;
  /** Place id already stored for this company. A match is a refresh, not a new claim. */
  existingPlaceId?: string | null;
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

  const enumeration = resolveHolderEnumeration(input);
  if (enumeration === 'failed') {
    return reviewDecision(input.target.id, placeId, LOOKUP_FAILED_REASON, []);
  }
  if (enumeration === 'ambiguous') {
    return reviewDecision(input.target.id, placeId, AMBIGUOUS_ENUMERATION_REASON, []);
  }

  const shared = hasSharedLocationEvidence(input.incoming);
  const identityOk =
    nameIdentityScore(input.incoming.name, input.incoming.formatted_address, input.target) >=
    GOOGLE_PLACES_MIN_ACCEPT_SCORE;
  const foreignHolders = holders.filter((holder) => holder.companyId !== input.target.id && holder.placeId === placeId);
  const unresolvedUsdotHolders = foreignHolders.filter((holder) => {
    if (holderSharesLocation(holder)) return false;
    const leftDot = usdotKey(input.target.usdotNumber);
    const rightDot = usdotKey(holder.usdotNumber);
    return Boolean(leftDot && rightDot && leftDot !== rightDot);
  });
  const conflictingHolders = foreignHolders.filter((holder) => {
    if (holderSharesLocation(holder)) return false;
    return !sameBusiness(input.target, {
      id: holder.companyId,
      name: holder.companyName,
      legalName: holder.legalName,
      usdotNumber: holder.usdotNumber,
      website: holder.website,
      phone: holder.phone,
      headquarters: holder.formattedAddress,
    });
  });
  const conflictIds = [
    ...new Set(
      [...conflictingHolders, ...unresolvedUsdotHolders].map((holder) => holder.companyId)
    ),
  ];

  if (shared && enumeration === 'complete') {
    return {
      action: 'attach',
      scope: 'shared_location',
      reason: 'evidenced_shared_location',
      deleteHolderIds: [],
      review: null,
    };
  }

  if (!identityOk || conflictingHolders.length > 0 || unresolvedUsdotHolders.length > 0) {
    const reason = unresolvedUsdotHolders.length > 0
      ? USDOT_CONFLICT_REASON
      : !identityOk
        ? CONFLICT_REASON
        : 'Google listing is already associated with a different business';
    return reviewDecision(input.target.id, placeId, reason, conflictIds);
  }

  if (enumeration === 'incomplete') {
    return reviewDecision(input.target.id, placeId, INCOMPLETE_ENUMERATION_REASON, []);
  }

  const alreadyHeld = (input.existingPlaceId?.trim() || '') === placeId;
  if (alreadyHeld) {
    return {
      action: 'attach',
      scope: 'location',
      reason: 'existing_association',
      deleteHolderIds: [],
      review: null,
    };
  }

  const evidencedForeign = foreignHolders.filter((holder) => holderSharesLocation(holder));
  if (foreignHolders.length > 0 && evidencedForeign.length === foreignHolders.length) {
    return {
      action: 'attach',
      scope: 'location',
      reason: 'evidenced_holder_shared_location',
      deleteHolderIds: [],
      review: null,
    };
  }

  return reviewDecision(input.target.id, placeId, UNRESERVED_REASON, []);
}
