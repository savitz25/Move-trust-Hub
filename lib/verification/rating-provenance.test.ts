import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { pathToFileURL } from 'node:url';
import { seedReviews } from '@/data/seed-reviews';
import { mergeDirectoryCompanies, mergeEnrichmentOntoProfile } from '@/lib/directory/merge-directory';
import { buildCompanyDirectorySchemaGraph } from '@/lib/seo/build-company-directory-schema';
import { mapCompanyRow } from '@/lib/supabase/queries/companies';
import { companyProfileReviewMeta } from '@/lib/trust/review-display-policy';
import { buildVerificationBackfillUpdate, type MoverCompanyRow } from '@/lib/verification/backfill-helpers';
import { scoreGooglePlaceMatch } from '@/lib/verification/google-places-name-queries';
import { persistGoogleSnapshot } from '@/lib/verification/persist-google-snapshot';
import {
  applyRatingProvenance,
  classifySharedPlaceHolders,
  decidePlaceAttachment,
  displayedRatingValue,
  googleReviewCardsForProvenance,
  isVerifiedGoogleEvidence,
  nameIdentityScore,
  PLACE_HOLDER_READ_LIMIT,
  selectRatingProvenance,
  type PlaceHolder,
} from '@/lib/verification/rating-provenance';
import type { CompanyEnrichmentResult, GooglePlacesData } from '@/lib/verification/types';
import type { Company } from '@/types';

function company(partial: Partial<Company>): Company {
  const base: Company = {
    id: 'co-harbor',
    slug: 'harbor-gate-movers',
    name: 'Harbor Gate Movers',
    shortDescription: '',
    description: '',
    foundedYear: 0,
    headquarters: 'Savannah, GA',
    website: 'https://harborgate.example',
    usdotNumber: '1002003',
    mcNumber: '',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 1,
    bbbRating: 'NR',
    bbbAccredited: false,
    overallRating: 0,
    reviewCount: 0,
    reputationScore: 0,
    yearsInBusiness: 0,
    avgPricePerMove: 0,
    priceRange: '',
    coverage: 'Continental US',
    services: ['Carrier'],
    specialties: [],
    ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
    isVerified: true,
    lastUpdated: '2026-06-01',
    authorityActive: true,
    outOfService: false,
    entityType: 'Carrier',
    serviceScope: 'interstate',
  };
  return Object.assign(base, partial);
}

function google(partial: Partial<GooglePlacesData> = {}): GooglePlacesData {
  return {
    source: 'google_places_api',
    place_id: 'place-harbor',
    name: 'Harbor Gate Movers',
    rating: 4.1,
    review_count: 20,
    formatted_address: '10 Dock Street, Savannah, GA 31401',
    website_url: 'https://harborgate.example',
    review_snippets: [],
    last_fetched: '2026-06-01T00:00:00.000Z',
    status: 'ok',
    ...partial,
  };
}

function holder(partial: Partial<PlaceHolder> = {}): PlaceHolder {
  return {
    companyId: 'co-other',
    companyName: 'Northline Van Lines',
    usdotNumber: '3004005',
    placeId: 'place-shared',
    placeName: 'Northline Van Lines',
    formattedAddress: '900 Market Street, Dallas, TX 75201',
    ...partial,
  };
}

describe('rating provenance fixtures', () => {
  it('withholds a Google listing that names a different business', () => {
    const selected = selectRatingProvenance({
      provider: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
        website: 'https://harborgate.example',
      },
      google: google({
        place_id: 'place-northline',
        name: 'Northline Van Lines',
        formatted_address: '900 Market Street, Dallas, TX 75201',
        website_url: 'https://northline.example',
        rating: 4.9,
        review_count: 400,
      }),
      storedRating: 4.9,
      storedReviewCount: 400,
      realBusiness: true,
    });
    assert.equal(selected.displayGoogle, null);
    assert.equal(selected.provenance.rating, null);
    assert.equal(selected.provenance.source, 'none');
    assert.match(selected.provenance.withheldReason ?? '', /does not match this business identity/);
    assert.equal(selected.review?.placeId, 'place-northline');
    assert.deepEqual(selected.review?.holderIds, []);
  });

  it('uses the location observation instead of a higher brand or seed scalar', () => {
    const merged = mergeEnrichmentOntoProfile(
      company({
        id: 'seed-cedar',
        name: 'Cedar Bin Storage',
        headquarters: 'Boise, ID',
        usdotNumber: '5006007',
        website: 'https://cedarbin.example',
        overallRating: 4.8,
        reviewCount: 220,
      }),
      company({
        id: 'co-cedar',
        name: 'Cedar Bin Storage',
        headquarters: 'Boise, ID',
        usdotNumber: '5006007',
        website: 'https://cedarbin.example',
        overallRating: 4.8,
        reviewCount: 220,
        googleData: google({
          place_id: 'place-cedar-boise',
          name: 'Cedar Bin Storage',
          formatted_address: '400 River Road, Boise, ID 83702',
          website_url: 'https://cedarbin.example',
          rating: 3.4,
          review_count: 11,
          last_fetched: '2026-07-15T12:00:00.000Z',
        }),
      })
    );
    assert.equal(merged.overallRating, 3.4);
    assert.equal(merged.reviewCount, 11);
    assert.equal(merged.ratingProvenance?.source, 'google_places_api');
    assert.equal(merged.ratingProvenance?.sourceLabel, 'Google Places');
    assert.equal(merged.ratingProvenance?.scope, 'location');
    assert.match(merged.ratingProvenance?.scopeLabel ?? '', /400 River Road, Boise, ID 83702/);
    assert.equal(merged.ratingProvenance?.observedAt, '2026-07-15T12:00:00.000Z');
    assert.equal(merged.ratingProvenance?.applicable, true);
    assert.equal(merged.googleData?.rating, 3.4);
  });

  it('keeps a legacy matching snapshot that omits status', () => {
    const legacy = google({
      place_id: 'place-legacy',
      name: 'Harbor Gate Movers',
      rating: 4.2,
      review_count: 8,
      last_fetched: '2025-11-02T00:00:00.000Z',
    });
    delete (legacy as { status?: string }).status;
    const selected = selectRatingProvenance({
      provider: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        headquarters: 'Savannah, GA',
        website: 'https://harborgate.example',
      },
      google: legacy,
      storedRating: 4.9,
      storedReviewCount: 80,
      seedRating: 5,
      realBusiness: true,
    });
    assert.equal(selected.provenance.rating, 4.2);
    assert.equal(selected.provenance.reviewCount, 8);
    assert.equal(selected.provenance.source, 'google_places_api');
    assert.equal(selected.provenance.scope, 'location');
    assert.equal(selected.provenance.observedAt, '2025-11-02T00:00:00.000Z');
    assert.equal(selected.displayGoogle?.place_id, 'place-legacy');
  });

  it('keeps a nameless legacy rating on the card without calling it a verified location', () => {
    const companyRow = mapCompanyRow({
      id: 'legacy-1',
      slug: 'legacy-mover',
      name: 'Legacy Mover',
      headquarters: 'Austin, TX',
      usdot_number: '2222222',
      service_scope: 'interstate',
      publication_state: 'PUBLISHABLE',
      overall_rating: 0,
      review_count: 0,
      google_data: {
        source: 'google_places_api',
        status: 'ok',
        rating: 4.2,
        review_count: 8,
      },
    });
    assert.equal(companyRow.overallRating, 4.2);
    assert.equal(companyRow.reviewCount, 8);
    assert.equal(companyRow.googleData?.rating, 4.2);
    assert.equal(companyRow.ratingProvenance?.sourceLabel, 'Google Places');
    assert.equal(companyRow.ratingProvenance?.scope, 'unverified');
    assert.match(companyRow.ratingProvenance?.scopeLabel ?? '', /not on this snapshot/);
    assert.equal(companyRow.ratingProvenance?.applicable, false);
  });

  it('labels a stored column when no Google observation applies and ignores a higher seed', () => {
    const merged = mergeEnrichmentOntoProfile(
      company({ overallRating: 4.9, reviewCount: 500 }),
      company({
        id: 'co-harbor',
        overallRating: 3.1,
        reviewCount: 9,
        googleData: null,
      })
    );
    assert.equal(merged.overallRating, 3.1);
    assert.equal(merged.reviewCount, 9);
    assert.equal(merged.ratingProvenance?.source, 'stored_column');
    assert.equal(merged.ratingProvenance?.sourceLabel, 'Stored rating');
    assert.equal(merged.ratingProvenance?.scopeLabel, 'Source not verified on this record');
    assert.notEqual(merged.ratingProvenance?.source, 'google_places_api');
    assert.equal(merged.googleData ?? null, null);
  });

  it('sends an ambiguous shared listing to review and does not delete holders', () => {
    const incoming = google({
      place_id: 'place-shared',
      name: 'Harbor Gate Movers',
      formatted_address: '10 Dock Street, Savannah, GA 31401',
      website_url: 'https://harborgate.example',
    });
    const holders = [holder()];
    const decision = decidePlaceAttachment({
      target: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
        website: 'https://harborgate.example',
      },
      incoming,
      holders,
    });
    assert.equal(decision.action, 'review');
    assert.deepEqual(decision.deleteHolderIds, []);
    assert.deepEqual(decision.review?.holderIds, ['co-other']);
    assert.match(decision.reason, /Unresolved identity conflict/);

    const planned = buildVerificationBackfillUpdate(
      {
        id: 'co-harbor',
        slug: 'harbor-gate-movers',
        name: 'Harbor Gate Movers',
        headquarters: 'Savannah, GA',
        usdotNumber: '1002003',
        website: 'https://harborgate.example',
        verification_sources: {},
        verification_last_synced_at: null,
        overall_rating: 4.4,
        review_count: 15,
      },
      { google: incoming, publicScrape: null, fetchedAt: '2026-08-01T00:00:00.000Z' },
      true,
      false,
      { holders }
    );
    assert.equal(planned.updates, null);
    assert.equal(planned.review?.providerId, 'co-harbor');
    assert.equal(planned.review?.holderIds.includes('co-other'), true);
  });

  it('keeps an evidenced shared location and still does not delete the other holder', () => {
    const incoming = google({
      place_id: 'place-shared',
      name: 'Northline Van Lines',
      formatted_address: '900 Market Street, Dallas, TX 75201',
      website_url: 'https://northline.example',
      rating: 3.6,
      review_count: 14,
      association_scope: 'shared_location',
      shared_location_evidence: {
        premise: 'Warehouse bay 4',
        observed_at: '2026-04-02T00:00:00.000Z',
        relationship: 'same_premise',
        source: { system: 'field_inspection', record_id: 'obs-2026-04-02' },
      },
    });
    const decision = decidePlaceAttachment({
      target: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
      },
      incoming,
      holders: [
        holder({
          sharedLocationEvidence: {
            premise: 'Warehouse bay 4',
            observed_at: '2026-04-02T00:00:00.000Z',
            relationship: 'same_premise',
            source: { system: 'field_inspection', record_id: 'obs-2026-04-02' },
          },
        }),
      ],
    });
    assert.equal(decision.action, 'attach');
    assert.equal(decision.scope, 'shared_location');
    assert.deepEqual(decision.deleteHolderIds, []);
    assert.equal(decision.review, null);

    const planned = buildVerificationBackfillUpdate(
      {
        id: 'co-harbor',
        slug: 'harbor-gate-movers',
        name: 'Harbor Gate Movers',
        headquarters: 'Savannah, GA',
        usdotNumber: '1002003',
        verification_sources: {},
        verification_last_synced_at: null,
        overall_rating: null,
        review_count: null,
      },
      {
        google: incoming,
        publicScrape: null,
        fetchedAt: '2026-08-01T00:00:00.000Z',
      } satisfies CompanyEnrichmentResult,
      true,
      false,
      { holders: [holder()] }
    );
    const stored = planned.updates?.verification_sources as {
      google?: GooglePlacesData;
    };
    assert.equal(stored.google?.association_scope, 'shared_location');
    assert.equal(stored.google?.shared_location_evidence?.premise, 'Warehouse bay 4');
    assert.equal(planned.updates?.overall_rating, 3.6);
    assert.equal(JSON.stringify(planned).includes('delete'), false);
  });

  it('does not let a catalog snapshot replace a withheld directory listing', () => {
    const directory = company({
      id: 'co-harbor',
      usdotNumber: '1002003',
      overallRating: 4.9,
      reviewCount: 80,
      googleData: google({
        name: 'Northline Van Lines',
        place_id: 'place-northline',
        formatted_address: '900 Market Street, Dallas, TX 75201',
        website_url: 'https://northline.example',
        rating: 4.9,
        review_count: 80,
      }),
    });
    const catalog = company({
      id: 'seed-harbor',
      usdotNumber: '1002003',
      overallRating: 4.8,
      reviewCount: 10,
      googleData: null,
    });
    const [merged] = mergeDirectoryCompanies([directory], [catalog]);
    assert.equal(merged?.overallRating, 0);
    assert.equal(merged?.googleData ?? null, null);
    assert.match(merged?.ratingProvenance?.withheldReason ?? '', /does not match/);
  });
});

const copiedWebsite = 'https://copied-listing.example';
const copiedPhone = '4045550199';

function auditableEvidence(recordId = 'obs-2026-04-02') {
  return {
    premise: 'Warehouse bay 4',
    observed_at: '2026-04-02T00:00:00.000Z',
    relationship: 'same_premise',
    source: { system: 'field_inspection', record_id: recordId },
  };
}

describe('identity boundaries', () => {
  it('does not let a copied website or phone validate a different business', () => {
    const listing = google({
      place_id: 'place-northline',
      name: 'Northline Van Lines',
      formatted_address: '900 Market Street, Dallas, TX 75201',
      website_url: copiedWebsite,
      phone: copiedPhone,
      rating: 4.9,
      review_count: 400,
    });
    const harbor = {
      id: 'co-harbor',
      name: 'Harbor Gate Movers',
      usdotNumber: '1002003',
      headquarters: 'Savannah, GA',
      website: copiedWebsite,
      phone: copiedPhone,
    };
    const contaminatedScore = scoreGooglePlaceMatch(
      {
        displayName: listing.name,
        formattedAddress: listing.formatted_address,
        phone: listing.phone,
        websiteUri: listing.website_url,
      },
      harbor.name,
      'Savannah',
      'GA',
      copiedPhone,
      copiedWebsite
    );
    assert.ok(contaminatedScore >= 52);
    assert.ok(nameIdentityScore(listing.name, listing.formatted_address, harbor) < 52);

    const selected = selectRatingProvenance({
      provider: harbor,
      google: listing,
      storedRating: 4.9,
      storedReviewCount: 400,
      seedRating: 4.8,
      realBusiness: true,
    });
    assert.equal(selected.displayGoogle, null);
    assert.equal(selected.provenance.rating, null);
    assert.equal(selected.provenance.source, 'none');
    assert.match(selected.provenance.withheldReason ?? '', /does not match/);

    const northlineHolder = holder({
      companyId: 'co-northline',
      companyName: 'Northline Van Lines',
      usdotNumber: '3004005',
      website: copiedWebsite,
      phone: copiedPhone,
      placeId: 'place-northline',
    });
    const decision = decidePlaceAttachment({
      target: harbor,
      incoming: listing,
      holders: [northlineHolder],
    });
    assert.equal(decision.action, 'review');
    assert.deepEqual(decision.deleteHolderIds, []);
    assert.equal(decision.review?.holderIds.includes('co-northline'), true);
  });

  it('routes distinct USDOT records to review when only the name and copied contacts agree', () => {
    const incoming = google({
      place_id: 'place-shared',
      name: 'Harbor Gate Movers',
      website_url: copiedWebsite,
      phone: copiedPhone,
      rating: 4.4,
      review_count: 30,
    });
    const decision = decidePlaceAttachment({
      target: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
        website: copiedWebsite,
        phone: copiedPhone,
      },
      incoming,
      holders: [
        holder({
          companyId: 'co-other-dot',
          companyName: 'Harbor Gate Movers',
          usdotNumber: '3004005',
          website: copiedWebsite,
          phone: copiedPhone,
          placeId: 'place-shared',
          placeName: 'Harbor Gate Movers',
        }),
      ],
    });
    assert.equal(decision.action, 'review');
    assert.match(decision.reason, /Unresolved identity conflict/);
    assert.doesNotMatch(decision.reason, /different business/);
    assert.deepEqual(decision.deleteHolderIds, []);
    assert.deepEqual(decision.review?.holderIds, ['co-other-dot']);

    const planned = buildVerificationBackfillUpdate(
      {
        id: 'co-harbor',
        slug: 'harbor-gate-movers',
        name: 'Harbor Gate Movers',
        headquarters: 'Savannah, GA',
        usdotNumber: '1002003',
        website: copiedWebsite,
        verification_sources: {},
        verification_last_synced_at: null,
        overall_rating: 4.4,
        review_count: 30,
      },
      { google: incoming, publicScrape: null, fetchedAt: '2026-08-01T00:00:00.000Z' },
      true,
      false,
      { holders: decision.review ? [
        holder({
          companyId: 'co-other-dot',
          companyName: 'Harbor Gate Movers',
          usdotNumber: '3004005',
          website: copiedWebsite,
          phone: copiedPhone,
          placeId: 'place-shared',
        }),
      ] : [] }
    );
    assert.equal(planned.updates, null);
    assert.match(planned.review?.reason ?? '', /Unresolved identity conflict/);
  });

  it('rejects a shared-location note that has only an explanation and a date', () => {
    const incoming = google({
      place_id: 'place-shared',
      name: 'Northline Van Lines',
      formatted_address: '900 Market Street, Dallas, TX 75201',
      website_url: 'https://northline.example',
      rating: 3.6,
      review_count: 14,
      association_scope: 'shared_location',
      shared_location_evidence: {
        premise: 'An old note says these companies once used the same dock',
        observed_at: '2026-04-02T00:00:00.000Z',
      },
    });
    const decision = decidePlaceAttachment({
      target: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
      },
      incoming,
      holders: [holder()],
    });
    assert.equal(decision.action, 'review');
    assert.notEqual(decision.scope, 'shared_location');
    assert.deepEqual(decision.deleteHolderIds, []);

    const selected = selectRatingProvenance({
      provider: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
      },
      google: incoming,
      storedRating: 3.6,
      storedReviewCount: 14,
      realBusiness: true,
    });
    assert.equal(selected.displayGoogle, null);
    assert.equal(selected.provenance.scope, 'none');
    assert.notEqual(selected.provenance.source, 'google_places_api');
  });

  it('honors auditable shared-location evidence on the incoming snapshot and on an existing holder', () => {
    const incoming = google({
      place_id: 'place-shared',
      name: 'Northline Van Lines',
      formatted_address: '900 Market Street, Dallas, TX 75201',
      website_url: 'https://northline.example',
      rating: 3.6,
      review_count: 14,
      association_scope: 'shared_location',
      shared_location_evidence: auditableEvidence(),
    });
    const incomingDecision = decidePlaceAttachment({
      target: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
      },
      incoming,
      holders: [holder({ usdotNumber: '3004005' })],
    });
    assert.equal(incomingDecision.action, 'attach');
    assert.equal(incomingDecision.scope, 'shared_location');
    assert.deepEqual(incomingDecision.deleteHolderIds, []);

    const holderDecision = decidePlaceAttachment({
      target: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
        website: 'https://harborgate.example',
      },
      incoming: google({ place_id: 'place-shared', name: 'Harbor Gate Movers' }),
      holders: [
        holder({
          usdotNumber: '3004005',
          sharedLocationEvidence: auditableEvidence('holder-obs-14'),
        }),
      ],
    });
    assert.equal(holderDecision.action, 'attach');
    assert.equal(holderDecision.scope, 'location');
    assert.deepEqual(holderDecision.deleteHolderIds, []);
    assert.equal(holderDecision.review, null);

    const weakHolder = decidePlaceAttachment({
      target: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
      },
      incoming: google({ place_id: 'place-shared', name: 'Harbor Gate Movers' }),
      holders: [
        holder({
          usdotNumber: '3004005',
          companyName: 'Harbor Gate Movers',
          sharedLocationEvidence: true,
        }),
      ],
    });
    assert.equal(weakHolder.action, 'review');
    assert.match(weakHolder.reason, /Unresolved identity conflict/);
    assert.deepEqual(weakHolder.deleteHolderIds, []);
  });

  it('does not revive a withheld rating as a scalar, zero stars, or verified Google metadata', () => {
    const conflicting = google({
      place_id: 'place-northline',
      name: 'Northline Van Lines',
      formatted_address: '900 Market Street, Dallas, TX 75201',
      website_url: copiedWebsite,
      phone: copiedPhone,
      rating: 4.9,
      review_count: 80,
    });
    const withheld = applyRatingProvenance(
      company({
        name: 'Harbor Gate Movers',
        website: copiedWebsite,
        phone: copiedPhone,
        overallRating: 4.9,
        reviewCount: 80,
        googleData: conflicting,
      }),
      { storedRating: 4.9, storedReviewCount: 80, seedRating: 4.8, seedReviewCount: 10, realBusiness: true }
    );
    assert.equal(withheld.overallRating, 0);
    assert.equal(withheld.reviewCount, 0);
    assert.equal(withheld.googleData ?? null, null);
    assert.equal(displayedRatingValue(withheld), null);
    assert.match(withheld.ratingProvenance?.withheldReason ?? '', /does not match/);

    const revived = applyRatingProvenance(
      { ...withheld, overallRating: 4.9, reviewCount: 80, googleData: null },
      { storedRating: 4.9, storedReviewCount: 80, seedRating: 4.8, realBusiness: true }
    );
    assert.equal(revived.overallRating, 0);
    assert.equal(revived.reviewCount, 0);
    assert.equal(revived.googleData ?? null, null);
    assert.equal(displayedRatingValue(revived), null);
    assert.equal(revived.ratingProvenance?.source, 'none');
    assert.match(revived.ratingProvenance?.withheldReason ?? '', /does not match/);

    const schema = JSON.stringify(buildCompanyDirectorySchemaGraph(revived));
    assert.equal(schema.includes('AggregateRating'), false);
    assert.equal(schema.includes('ratingValue'), false);
    assert.equal(schema.includes('4.9'), false);
    const meta = companyProfileReviewMeta({
      companyId: revived.id,
      editorialReviewCount: revived.reviewCount,
      editorialRating: revived.overallRating,
    });
    assert.equal(meta.headline, 'Not reported');
    assert.equal(`${meta.headline} ${meta.detail}`.includes('4.9'), false);
    assert.equal(`${meta.headline} ${meta.detail}`.includes('verified Google'), false);
  });

  it('keeps brand, location, missing dates, and nameless legacy data aligned on the card and profile', () => {
    const locationGoogle = {
      source: 'google_places_api',
      status: 'ok',
      place_id: 'place-cedar-boise',
      name: 'Cedar Bin Storage',
      rating: 3.4,
      review_count: 11,
      formatted_address: '400 River Road, Boise, ID 83702',
      website_url: 'https://cedarbin.example',
      review_snippets: [],
      last_fetched: '2026-07-15T12:00:00.000Z',
    };
    const card = mapCompanyRow({
      id: 'co-cedar',
      slug: 'cedar-bin-storage',
      name: 'Cedar Bin Storage',
      headquarters: 'Boise, ID',
      usdot_number: '5006007',
      website: 'https://cedarbin.example',
      service_scope: 'interstate',
      publication_state: 'PUBLISHABLE',
      overall_rating: 4.8,
      review_count: 220,
      verification_sources: { google: locationGoogle },
    });
    const profile = mergeEnrichmentOntoProfile(
      company({
        id: 'seed-cedar',
        name: 'Cedar Bin Storage',
        headquarters: 'Boise, ID',
        usdotNumber: '5006007',
        website: 'https://cedarbin.example',
        overallRating: 4.8,
        reviewCount: 220,
      }),
      card
    );
    assert.equal(card.overallRating, 3.4);
    assert.equal(profile.overallRating, 3.4);
    assert.equal(card.ratingProvenance?.scope, 'location');
    assert.equal(profile.ratingProvenance?.scope, 'location');
    assert.match(card.ratingProvenance?.scopeLabel ?? '', /400 River Road/);
    assert.equal(card.ratingProvenance?.observedAt, profile.ratingProvenance?.observedAt);
    assert.equal(card.ratingProvenance?.source, profile.ratingProvenance?.source);

    const undated = { ...locationGoogle };
    delete (undated as { last_fetched?: string }).last_fetched;
    const undatedCard = mapCompanyRow({
      id: 'co-cedar',
      slug: 'cedar-bin-storage',
      name: 'Cedar Bin Storage',
      headquarters: 'Boise, ID',
      usdot_number: '5006007',
      website: 'https://cedarbin.example',
      service_scope: 'interstate',
      publication_state: 'PUBLISHABLE',
      overall_rating: 4.8,
      review_count: 220,
      verification_sources: { google: undated },
    });
    const undatedProfile = mergeEnrichmentOntoProfile(
      company({
        id: 'seed-cedar',
        name: 'Cedar Bin Storage',
        headquarters: 'Boise, ID',
        usdotNumber: '5006007',
        overallRating: 4.8,
        reviewCount: 220,
      }),
      undatedCard
    );
    assert.equal(undatedCard.ratingProvenance?.observedAt ?? null, null);
    assert.equal(undatedProfile.ratingProvenance?.observedAt ?? null, null);
    assert.equal(undatedCard.ratingProvenance?.applicable, false);
    assert.equal(undatedCard.overallRating, undatedProfile.overallRating);
    assert.equal(undatedCard.overallRating, 3.4);

    const namelessCard = mapCompanyRow({
      id: 'legacy-1',
      slug: 'legacy-mover',
      name: 'Legacy Mover',
      headquarters: 'Austin, TX',
      usdot_number: '2222222',
      service_scope: 'interstate',
      publication_state: 'PUBLISHABLE',
      overall_rating: 4.9,
      review_count: 50,
      google_data: {
        source: 'google_places_api',
        status: 'ok',
        rating: 4.2,
        review_count: 8,
      },
    });
    const namelessProfile = mergeEnrichmentOntoProfile(
      company({
        id: 'seed-legacy',
        name: 'Legacy Mover',
        headquarters: 'Austin, TX',
        usdotNumber: '2222222',
        overallRating: 4.9,
        reviewCount: 50,
      }),
      namelessCard
    );
    assert.equal(namelessCard.overallRating, 4.2);
    assert.equal(namelessProfile.overallRating, 4.2);
    assert.equal(namelessCard.ratingProvenance?.scope, 'unverified');
    assert.equal(namelessProfile.ratingProvenance?.scope, 'unverified');
    assert.equal(namelessCard.ratingProvenance?.sourceLabel, namelessProfile.ratingProvenance?.sourceLabel);
  });

  it('does not treat a failed holder lookup as an unclaimed place', async () => {
    const incoming = google({
      place_id: 'place-shared',
      name: 'Harbor Gate Movers',
      rating: 4.4,
      review_count: 30,
    });
    const failed = decidePlaceAttachment({
      target: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
        website: 'https://harborgate.example',
      },
      incoming,
      holders: [],
      holderLookup: 'failed',
    });
    assert.equal(failed.action, 'review');
    assert.match(failed.reason, /lookup failed/);
    assert.deepEqual(failed.deleteHolderIds, []);

    const succeeded = decidePlaceAttachment({
      target: {
        id: 'co-harbor',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
        website: 'https://harborgate.example',
      },
      incoming,
      holders: [],
      holderLookup: 'succeeded',
    });
    assert.equal(succeeded.action, 'review');
    assert.match(succeeded.reason, /cannot be reserved atomically/);
    assert.doesNotMatch(succeeded.reason, /lookup failed/);
    assert.deepEqual(succeeded.deleteHolderIds, []);

    const planned = buildVerificationBackfillUpdate(
      {
        id: 'co-harbor',
        slug: 'harbor-gate-movers',
        name: 'Harbor Gate Movers',
        headquarters: 'Savannah, GA',
        usdotNumber: '1002003',
        website: 'https://harborgate.example',
        verification_sources: {},
        verification_last_synced_at: null,
        overall_rating: 4.4,
        review_count: 30,
      },
      { google: incoming, publicScrape: null, fetchedAt: '2026-08-01T00:00:00.000Z' },
      true,
      false,
      { holders: [], holderLookup: 'failed' }
    );
    assert.equal(planned.updates, null);
    assert.match(planned.review?.reason ?? '', /lookup failed/);

    const updates: unknown[] = [];
    const admin = {
      from() {
        const chain = {
          select() {
            return chain;
          },
          neq() {
            return chain;
          },
          filter() {
            return chain;
          },
          limit() {
            return Promise.resolve({ data: null, error: { message: 'holder lookup failed' } });
          },
          update(payload: unknown) {
            updates.push(payload);
            return Promise.resolve({ error: null });
          },
        };
        return chain;
      },
    };
    const persisted = await persistGoogleSnapshot(
      admin as never,
      'co-harbor',
      incoming,
      {
        existingRow: {
          id: 'co-harbor',
          name: 'Harbor Gate Movers',
          headquarters: 'Savannah, GA',
          usdot_number: '1002003',
          website: 'https://harborgate.example',
          verification_sources: {},
          google_data: null,
        },
      }
    );
    assert.equal(persisted.applied, false);
    assert.match(persisted.review?.reason ?? '', /lookup failed/);
    assert.equal(updates.length, 0);

    const thrown = await persistGoogleSnapshot(
      {
        from() {
          const chain = {
            select() {
              return chain;
            },
            neq() {
              return chain;
            },
            filter() {
              return chain;
            },
            limit() {
              return Promise.reject(new Error('connection reset'));
            },
            update(payload: unknown) {
              updates.push(payload);
              return Promise.resolve({ error: null });
            },
          };
          return chain;
        },
      } as never,
      'co-harbor',
      incoming,
      {
        existingRow: {
          id: 'co-harbor',
          name: 'Harbor Gate Movers',
          headquarters: 'Savannah, GA',
          usdot_number: '1002003',
          verification_sources: {},
        },
      }
    );
    assert.equal(thrown.applied, false);
    assert.match(thrown.review?.reason ?? '', /connection reset|lookup failed/);
    assert.equal(updates.length, 0);
  });
});

const harborTarget = {
  id: 'co-harbor',
  name: 'Harbor Gate Movers',
  usdotNumber: '1002003',
  headquarters: 'Savannah, GA',
  website: 'https://harborgate.example',
};

function sameBusinessPage(): PlaceHolder[] {
  return Array.from({ length: PLACE_HOLDER_READ_LIMIT }, (_, index) =>
    holder({
      companyId: `co-same-${index}`,
      companyName: 'Harbor Gate Movers',
      usdotNumber: '1002003',
      placeId: 'place-shared',
      placeName: 'Harbor Gate Movers',
      formattedAddress: '10 Dock Street, Savannah, GA 31401',
    })
  );
}

function holderAdmin(limitResult: { data: unknown; error: { message?: string } | null }) {
  const updates: unknown[] = [];
  const admin = {
    from() {
      const chain = {
        select() {
          return chain;
        },
        neq() {
          return chain;
        },
        filter() {
          return chain;
        },
        limit() {
          return Promise.resolve(limitResult);
        },
        update(payload: unknown) {
          updates.push(payload);
          return Promise.resolve({ error: null });
        },
      };
      return chain;
    },
  };
  return { admin, updates };
}

describe('write safety', () => {
  it('does not treat a capped holder page as proof that no conflict exists', () => {
    const visible = sameBusinessPage();
    const hidden = holder({
      companyId: 'co-beyond-cap',
      companyName: 'Northline Van Lines',
      usdotNumber: '3004005',
      placeId: 'place-shared',
      placeName: 'Northline Van Lines',
    });
    const incoming = google({
      place_id: 'place-shared',
      name: 'Harbor Gate Movers',
      rating: 4.4,
      review_count: 30,
    });
    const capped = decidePlaceAttachment({
      target: harborTarget,
      incoming,
      holders: visible,
      holderEnumeration: 'incomplete',
      holderLookup: 'succeeded',
    });
    assert.equal(capped.action, 'review');
    assert.match(capped.reason, /enumeration is incomplete/);
    assert.doesNotMatch(capped.reason, /unclaimed|identity_match|no conflicting/i);
    assert.equal(capped.review?.holderIds.includes('co-beyond-cap'), false);
    assert.deepEqual(capped.deleteHolderIds, []);

    const seen = decidePlaceAttachment({
      target: harborTarget,
      incoming,
      holders: [...visible, hidden],
      holderEnumeration: 'complete',
    });
    assert.equal(seen.action, 'review');
    assert.match(seen.reason, /Unresolved identity conflict/);
    assert.deepEqual(seen.review?.holderIds, ['co-beyond-cap']);
    assert.deepEqual(seen.deleteHolderIds, []);
  });

  it('fails closed when holder enumeration is incomplete, failed, or ambiguous', async () => {
    const incoming = google({
      place_id: 'place-shared',
      name: 'Harbor Gate Movers',
      rating: 4.4,
      review_count: 30,
    });
    const ambiguous = decidePlaceAttachment({
      target: harborTarget,
      incoming,
      holders: [],
      holderEnumeration: 'ambiguous',
    });
    assert.equal(ambiguous.action, 'review');
    assert.match(ambiguous.reason, /enumeration is ambiguous/);

    const sharedButCapped = decidePlaceAttachment({
      target: harborTarget,
      incoming: google({
        place_id: 'place-shared',
        name: 'Harbor Gate Movers',
        association_scope: 'shared_location',
        shared_location_evidence: auditableEvidence(),
      }),
      holders: [],
      holderEnumeration: 'incomplete',
    });
    assert.equal(sharedButCapped.action, 'review');
    assert.notEqual(sharedButCapped.scope, 'shared_location');
    assert.match(sharedButCapped.reason, /enumeration is incomplete/);

    const rows = sameBusinessPage().map((item) => ({
      id: item.companyId,
      name: item.companyName,
      usdot_number: item.usdotNumber,
      fmcsa_legal_name: null,
      website: 'https://harborgate.example',
      google_data: {
        source: 'google_places_api',
        status: 'ok',
        place_id: 'place-shared',
        name: 'Harbor Gate Movers',
      },
      verification_sources: {
        google: {
          source: 'google_places_api',
          status: 'ok',
          place_id: 'place-shared',
          name: 'Harbor Gate Movers',
        },
      },
    }));
    const cappedAdmin = holderAdmin({ data: rows, error: null });
    const cappedWrite = await persistGoogleSnapshot(
      cappedAdmin.admin as never,
      'co-harbor',
      incoming,
      {
        existingRow: {
          id: 'co-harbor',
          name: 'Harbor Gate Movers',
          headquarters: 'Savannah, GA',
          usdot_number: '1002003',
          website: 'https://harborgate.example',
          verification_sources: {},
          google_data: null,
        },
      }
    );
    assert.equal(cappedWrite.applied, false);
    assert.match(cappedWrite.review?.reason ?? '', /enumeration is incomplete/);
    assert.equal(cappedAdmin.updates.length, 0);

    const ambiguousAdmin = holderAdmin({ data: null, error: null });
    const ambiguousWrite = await persistGoogleSnapshot(
      ambiguousAdmin.admin as never,
      'co-harbor',
      incoming,
      {
        existingRow: {
          id: 'co-harbor',
          name: 'Harbor Gate Movers',
          headquarters: 'Savannah, GA',
          usdot_number: '1002003',
          verification_sources: {},
          google_data: null,
        },
      }
    );
    assert.equal(ambiguousWrite.applied, false);
    assert.match(ambiguousWrite.review?.reason ?? '', /enumeration is ambiguous/);
    assert.equal(ambiguousAdmin.updates.length, 0);
  });

  it('refreshes an association this company already holds and does not clear it on an incomplete read', () => {
    const incoming = google({
      place_id: 'place-shared',
      name: 'Harbor Gate Movers',
      rating: 4.1,
      review_count: 12,
    });
    const stored = google({
      place_id: 'place-shared',
      name: 'Harbor Gate Movers',
      rating: 4.1,
      review_count: 12,
    });
    const refresh = decidePlaceAttachment({
      target: harborTarget,
      incoming,
      holders: [],
      holderEnumeration: 'complete',
      existingPlaceId: 'place-shared',
    });
    assert.equal(refresh.action, 'attach');
    assert.equal(refresh.reason, 'existing_association');
    assert.deepEqual(refresh.deleteHolderIds, []);

    const row: MoverCompanyRow = {
      id: 'co-harbor',
      slug: 'harbor-gate-movers',
      name: 'Harbor Gate Movers',
      headquarters: 'Savannah, GA',
      usdotNumber: '1002003',
      website: 'https://harborgate.example',
      verification_sources: { google: stored },
      verification_last_synced_at: '2026-04-02T00:00:00.000Z',
      overall_rating: 4.1,
      review_count: 12,
    };
    const blocked = buildVerificationBackfillUpdate(
      row,
      { google: incoming, publicScrape: null, fetchedAt: '2026-08-01T00:00:00.000Z' },
      true,
      false,
      { holders: [], holderEnumeration: 'incomplete', holderLookup: 'succeeded' }
    );
    assert.equal(blocked.updates, null);
    assert.match(blocked.review?.reason ?? '', /enumeration is incomplete/);
    const storedGoogle = row.verification_sources.google;
    assert.ok(storedGoogle);
    assert.equal(storedGoogle.place_id, 'place-shared');
    assert.equal(storedGoogle.rating, 4.1);

    const kept = buildVerificationBackfillUpdate(
      row,
      { google: incoming, publicScrape: null, fetchedAt: '2026-08-01T00:00:00.000Z' },
      true,
      false,
      { holders: [], holderEnumeration: 'complete', holderLookup: 'succeeded' }
    );
    const next = kept.updates?.verification_sources as { google?: GooglePlacesData };
    assert.equal(next.google?.place_id, 'place-shared');
    assert.equal(kept.review, null);
  });

  it('refuses two competing automatic attachments in a simulated fixture', async () => {
    const table = new Map<string, string | null>([
      ['co-harbor', null],
      ['co-second', null],
    ]);
    const evidence = { kind: 'simulated' as const, databaseExecuted: false, guardedWrites: 0 };
    async function guarded(companyId: string, usdotNumber: string) {
      const holders = [...table.entries()]
        .filter(([id, place]) => id !== companyId && place === 'place-shared')
        .map(([id]) =>
          holder({
            companyId: id,
            companyName: 'Harbor Gate Movers',
            usdotNumber: id === 'co-harbor' ? '1002003' : '3004005',
            placeId: 'place-shared',
            placeName: 'Harbor Gate Movers',
          })
        );
      const decision = decidePlaceAttachment({
        target: { ...harborTarget, id: companyId, usdotNumber },
        incoming: google({ place_id: 'place-shared', name: 'Harbor Gate Movers' }),
        holders,
        holderEnumeration: 'complete',
        holderLookup: 'succeeded',
      });
      assert.equal(decision.action === 'attach', false);
      assert.equal(decision.action, 'review');
      assert.match(decision.reason, /cannot be reserved atomically/);
      return decision;
    }
    await Promise.all([
      guarded('co-harbor', '1002003'),
      guarded('co-second', '3004005'),
    ]);
    assert.equal([...table.values()].every((place) => place == null), true);
    assert.equal(evidence.databaseExecuted, false);
    assert.equal(evidence.guardedWrites, 0);

    const seen: number[] = [];
    let reads = 0;
    let openWrites: (() => void) | null = null;
    const bothRead = new Promise<void>((resolve) => {
      openWrites = resolve;
    });
    async function unguarded(companyId: string) {
      seen.push([...table.values()].filter((place) => place === 'place-shared').length);
      reads += 1;
      if (reads === 2) openWrites?.();
      await bothRead;
      table.set(companyId, 'place-shared');
    }
    await Promise.all([unguarded('co-harbor'), unguarded('co-second')]);
    assert.deepEqual(seen, [0, 0]);
    assert.equal([...table.values()].filter((place) => place === 'place-shared').length, 2);
    assert.equal(evidence.kind, 'simulated');
  });

  it('keeps the place-claim dependency out of the migration runner', () => {
    const sql = readFileSync('docs/move-pr227-write-safety-003-place-claim.sql', 'utf8');
    assert.match(sql, /DO NOT APPLY/);
    assert.match(sql, /pg_advisory_xact_lock/);
    assert.match(sql, /same_premise/);
    assert.match(sql, /co_located_office/);
    assert.match(sql, /shared_terminal/);
    assert.match(sql, /REVOKE ALL ON FUNCTION/);
    assert.match(sql, /BEGIN ROLLBACK/);
    assert.match(sql, /DROP FUNCTION IF EXISTS public\.claim_google_place_association/);
    assert.doesNotMatch(sql, /LIMIT\s+25/i);
    assert.doesNotMatch(sql, /DELETE FROM/i);
    assert.doesNotMatch(sql, /GRANT /);
    assert.equal(
      existsSync('supabase/migrations/20261030_move_pr227_place_claim.sql'),
      false
    );
  });

  it('distinguishes a disposable database claim from the simulated race', async (t) => {
    const opened = await openDisposableClaimDatabase();
    if (!opened) {
      t.skip(
        'no loopback Postgres or PGlite available; competing writers above are simulated only'
      );
      return;
    }
    const schema = 'move_pr227_ws003';
    try {
      await opened.exec(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
      await opened.exec(`CREATE SCHEMA ${schema}`);
      await opened.exec(`
        CREATE TABLE ${schema}.companies (
          id text PRIMARY KEY,
          verification_sources jsonb,
          google_data jsonb,
          verification_last_synced_at timestamptz,
          updated_at timestamptz
        )
      `);
      await opened.exec(`
        INSERT INTO ${schema}.companies (id) VALUES ('co-harbor'), ('co-second')
      `);
      const raw = readFileSync('docs/move-pr227-write-safety-003-place-claim.sql', 'utf8');
      const apply = raw.split('-- BEGIN APPLY')[1]?.split('-- END APPLY')[0] ?? '';
      await opened.exec(apply.replaceAll('public.', `${schema}.`));
      const payload = JSON.stringify({
        source: 'google_places_api',
        status: 'ok',
        place_id: 'place-shared',
        name: 'Harbor Gate Movers',
        rating: 4.4,
        review_count: 12,
      });
      if (opened.concurrent) {
        const [left, right] = await Promise.all([
          opened.claim('co-harbor', payload),
          opened.claim('co-second', payload),
        ]);
        const applied = [left, right].filter((row) => row.applied === true);
        assert.equal(applied.length, 1);
        assert.equal([left, right].some((row) => row.action === 'review'), true);
      } else {
        const first = await opened.claim('co-harbor', payload);
        const second = await opened.claim('co-second', payload);
        assert.equal(first.applied, true);
        assert.equal(second.applied, false);
        assert.equal(second.action, 'review');
        assert.equal(opened.concurrent, false);
      }
      const holders = await opened.query(
        `SELECT id FROM ${schema}.companies
          WHERE google_data->>'place_id' = 'place-shared'
          ORDER BY id`
      );
      assert.equal(holders.rows.length, 1);

      await opened.exec(`
        UPDATE ${schema}.companies
           SET google_data = NULL,
               verification_sources = NULL
      `);
      await opened.exec(`
        UPDATE ${schema}.companies
           SET google_data = jsonb_build_object(
                 'status', 'ok',
                 'place_id', 'place-shared',
                 'association_scope', 'shared_location',
                 'name', 'Harbor Gate Movers',
                 'shared_location_evidence', jsonb_build_object(
                   'relationship', 'same_premise',
                   'premise', 'Warehouse bay 4',
                   'observed_at', '2026-04-02T00:00:00Z',
                   'source', jsonb_build_object('system', 'field_inspection', 'record_id', 'obs-14')
                 )
               ),
               verification_sources = jsonb_build_object(
                 'google',
                 jsonb_build_object(
                   'status', 'ok',
                   'place_id', 'place-shared',
                   'association_scope', 'shared_location',
                   'name', 'Harbor Gate Movers',
                   'shared_location_evidence', jsonb_build_object(
                     'relationship', 'same_premise',
                     'premise', 'Warehouse bay 4',
                     'observed_at', '2026-04-02T00:00:00Z',
                     'source', jsonb_build_object('system', 'field_inspection', 'record_id', 'obs-14')
                   )
                 )
               )
         WHERE id = 'co-harbor'
      `);
      const shared = await opened.claim('co-second', payload);
      assert.equal(shared.applied, true);
      assert.equal(shared.shared, true);
      const both = await opened.query(
        `SELECT id FROM ${schema}.companies WHERE google_data->>'place_id' = 'place-shared'`
      );
      assert.equal(both.rows.length, 2);
    } finally {
      await opened.exec(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
      await opened.close();
    }
  });
});

type ClaimRow = {
  applied?: boolean;
  action?: string;
  shared?: boolean;
};

type DisposableClaimDatabase = {
  concurrent: boolean;
  exec: (sql: string) => Promise<void>;
  query: (sql: string) => Promise<{ rows: Record<string, unknown>[] }>;
  claim: (companyId: string, payload: string) => Promise<ClaimRow>;
  close: () => Promise<void>;
};

async function openDisposableClaimDatabase(): Promise<DisposableClaimDatabase | null> {
  const raw = process.env.MOVE_LISTING_FIXTURE_DATABASE_URL?.trim();
  if (raw) {
    let host = '';
    try {
      host = new URL(raw.replace(/^postgres(?:ql)?:\/\//i, 'http://')).hostname;
    } catch {
      throw new Error('MOVE_LISTING_FIXTURE_DATABASE_URL is not a database URL');
    }
    if (host !== '127.0.0.1' && host !== 'localhost') {
      throw new Error('place-claim fixture database must be loopback');
    }
    const pg = await import('pg');
    const left = new pg.Client({ connectionString: raw, connectionTimeoutMillis: 5_000 });
    const right = new pg.Client({ connectionString: raw, connectionTimeoutMillis: 5_000 });
    await left.connect();
    await right.connect();
    return {
      concurrent: true,
      exec: async (sql) => {
        await left.query(sql);
      },
      query: async (sql) => left.query(sql),
      claim: async (companyId, payload) => {
        const client = companyId === 'co-harbor' ? left : right;
        const result = await client.query(
          'SELECT move_pr227_ws003.claim_google_place_association($1, $2::jsonb) AS claim',
          [companyId, payload]
        );
        return (result.rows[0]?.claim ?? {}) as ClaimRow;
      },
      close: async () => {
        await left.end();
        await right.end();
      },
    };
  }

  const specifier = path.isAbsolute('@electric-sql/pglite')
    ? pathToFileURL(path.join('@electric-sql/pglite', 'dist', 'index.js')).href
    : '@electric-sql/pglite';
  try {
    const loaded = (await import(specifier)) as {
      PGlite: new () => {
        query: (sql: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;
        exec: (sql: string) => Promise<unknown>;
        close: () => Promise<void>;
      };
    };
    const db = new loaded.PGlite();
    return {
      concurrent: false,
      exec: (sql) => db.exec(sql).then(() => undefined),
      query: async (sql) => {
        const result = await db.query(sql);
        return { rows: result.rows ?? [] };
      },
      claim: async (companyId, payload) => {
        const result = await db.query(
          'SELECT move_pr227_ws003.claim_google_place_association($1, $2::jsonb) AS claim',
          [companyId, payload]
        );
        return (result.rows[0]?.claim ?? {}) as ClaimRow;
      },
      close: () => db.close(),
    };
  } catch {
    return null;
  }
}

describe('live rating identity correction', () => {
  const savannahAddress = '10 Dock Street, Savannah, GA 31401';
  const savannahGoogle = google({
    place_id: 'place-shared-harbor',
    name: 'Harbor Gate Movers',
    formatted_address: savannahAddress,
    rating: 4.8,
    review_count: 40,
  });
  const savannahHolder = holder({
    companyId: 'co-savannah',
    companyName: 'Harbor Gate Movers',
    usdotNumber: '1002003',
    headquarters: 'Savannah, GA',
    placeId: 'place-shared-harbor',
    placeName: 'Harbor Gate Movers',
    formattedAddress: savannahAddress,
  });
  const dallasHolder = holder({
    companyId: 'co-dallas',
    companyName: 'Harbor Gate Movers',
    usdotNumber: '3004005',
    headquarters: 'Dallas, TX',
    placeId: 'place-shared-harbor',
    placeName: 'Harbor Gate Movers',
    formattedAddress: savannahAddress,
  });

  it('keeps the rightful shared-place owner and withholds the other holder', () => {
    const classified = classifySharedPlaceHolders([savannahHolder, dallasHolder]);
    const owner = classified.find((row) => row.companyId === 'co-savannah');
    const other = classified.find((row) => row.companyId === 'co-dallas');
    assert.equal(owner?.associationClass, 'rightful_owner');
    assert.equal(owner?.displayRating, true);
    assert.equal(other?.displayRating, false);
    assert.equal(other?.associationClass, 'distinct_unresolved');

    const kept = selectRatingProvenance({
      provider: {
        id: 'co-savannah',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
      },
      google: savannahGoogle,
      samePlaceHolders: [savannahHolder, dallasHolder],
      holderEnumeration: 'complete',
      storedRating: 4.8,
      storedReviewCount: 40,
      realBusiness: true,
    });
    assert.equal(kept.provenance.applicable, true);
    assert.equal(kept.provenance.rating, 4.8);
    assert.equal(kept.provenance.source, 'google_places_api');

    const dropped = selectRatingProvenance({
      provider: {
        id: 'co-dallas',
        name: 'Harbor Gate Movers',
        usdotNumber: '3004005',
        headquarters: 'Dallas, TX',
      },
      google: savannahGoogle,
      samePlaceHolders: [savannahHolder, dallasHolder],
      holderEnumeration: 'complete',
      storedRating: 4.8,
      storedReviewCount: 40,
      realBusiness: true,
    });
    assert.equal(dropped.displayGoogle, null);
    assert.equal(dropped.provenance.applicable, false);
    assert.match(dropped.provenance.withheldReason ?? '', /does not match this business identity/);
    assert.equal(displayedRatingValue({ overallRating: 0, ratingProvenance: dropped.provenance }), null);

    const omitted = selectRatingProvenance({
      provider: {
        id: 'co-dallas',
        name: 'Harbor Gate Movers',
        usdotNumber: '3004005',
        headquarters: 'Dallas, TX',
      },
      google: savannahGoogle,
      storedRating: 4.8,
      storedReviewCount: 40,
      realBusiness: true,
    });
    assert.equal(omitted.provenance.applicable, true);

    const failedRead = selectRatingProvenance({
      provider: {
        id: 'co-savannah',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
      },
      google: savannahGoogle,
      samePlaceHolders: [dallasHolder],
      holderEnumeration: 'failed',
      realBusiness: true,
    });
    assert.equal(failedRead.provenance.applicable, true);
    const incomplete = selectRatingProvenance({
      provider: {
        id: 'co-savannah',
        name: 'Harbor Gate Movers',
        usdotNumber: '1002003',
        headquarters: 'Savannah, GA',
      },
      google: savannahGoogle,
      samePlaceHolders: Array.from({ length: PLACE_HOLDER_READ_LIMIT }, (_, index) =>
        holder({ companyId: `co-${index}`, placeId: 'place-shared-harbor' })
      ),
      realBusiness: true,
    });
    assert.equal(incomplete.provenance.applicable, true);
  });

  it('does not let a seed merge restore a withheld shared-place rating', () => {
    const dallas = applyRatingProvenance(
      company({
        id: 'co-dallas',
        name: 'Harbor Gate Movers',
        headquarters: 'Dallas, TX',
        usdotNumber: '3004005',
        googleData: savannahGoogle,
        placeAssociationContext: {
          holders: [savannahHolder, dallasHolder],
          enumeration: 'complete',
        },
      }),
      { storedRating: 4.8, storedReviewCount: 40, realBusiness: true }
    );
    assert.equal(dallas.googleData ?? null, null);
    const merged = mergeEnrichmentOntoProfile(
      company({
        id: 'co-dallas',
        name: 'Harbor Gate Movers',
        headquarters: 'Dallas, TX',
        usdotNumber: '3004005',
        googleData: savannahGoogle,
        overallRating: 4.8,
        reviewCount: 40,
      }),
      dallas
    );
    assert.equal(merged.googleData ?? null, null);
    assert.equal(displayedRatingValue(merged), null);
    assert.equal(isVerifiedGoogleEvidence(merged.ratingProvenance), false);
  });

  it('preserves American Van Lines when it is the independent name match', () => {
    const address = '1351 NW 22nd St, Pompano Beach, FL 33069, USA';
    const placeId = 'place-avl';
    const avl = holder({
      companyId: 'american-van-lines',
      companyName: 'American Van Lines',
      legalName: 'AMERICAN VAN LINES INC',
      usdotNumber: '614506',
      headquarters: 'Davie, FL',
      placeId,
      placeName: 'American Van Lines',
      formattedAddress: address,
    });
    const amerisafe = holder({
      companyId: 'amerisafe-van-lines',
      companyName: 'Amerisafe Van Lines',
      legalName: 'AMS MOVING INC',
      usdotNumber: '3341650',
      headquarters: 'Boynton Beach, FL',
      placeId,
      placeName: 'American Van Lines',
      formattedAddress: address,
    });
    const classified = classifySharedPlaceHolders([avl, amerisafe]);
    assert.equal(classified.find((row) => row.companyId === 'american-van-lines')?.displayRating, true);
    assert.equal(classified.find((row) => row.companyId === 'american-van-lines')?.associationClass, 'rightful_owner');
    assert.equal(classified.find((row) => row.companyId === 'amerisafe-van-lines')?.displayRating, false);
    const listing = google({
      place_id: placeId,
      name: 'American Van Lines',
      formatted_address: address,
      rating: 4.2,
      review_count: 2150,
    });
    const kept = selectRatingProvenance({
      provider: {
        id: avl.companyId,
        name: avl.companyName,
        legalName: avl.legalName,
        usdotNumber: avl.usdotNumber,
        headquarters: avl.headquarters,
      },
      google: listing,
      samePlaceHolders: [avl, amerisafe],
      holderEnumeration: 'complete',
      realBusiness: true,
    });
    assert.equal(kept.provenance.applicable, true);
    assert.equal(kept.provenance.rating, 4.2);
    assert.equal(kept.provenance.scope, 'location');
    const dropped = selectRatingProvenance({
      provider: {
        id: amerisafe.companyId,
        name: amerisafe.companyName,
        legalName: amerisafe.legalName,
        usdotNumber: amerisafe.usdotNumber,
        headquarters: amerisafe.headquarters,
      },
      google: listing,
      samePlaceHolders: [avl, amerisafe],
      holderEnumeration: 'complete',
      realBusiness: true,
    });
    assert.equal(dropped.provenance.applicable, false);
    assert.equal(isVerifiedGoogleEvidence(dropped.provenance), false);
  });

  it('preserves a Dumbo rating only for the independently higher identity score', () => {
    const address = '15 N Oxford St, Brooklyn, NY 11205, USA';
    const placeId = 'place-dumbo';
    const storage = holder({
      companyId: 'dumbo-moving-storage',
      companyName: 'Dumbo Moving & Storage',
      legalName: '2001-31 REALTY LLC',
      usdotNumber: '2458910',
      headquarters: '545 N ARLINGTON AVE, EAST ORANGE, NJ, 07017',
      placeId,
      placeName: 'Dumbo Moving and Storage NYC',
      formattedAddress: address,
    });
    const movers = holder({
      companyId: 'dumbo-movers-inc',
      companyName: 'Dumbo Movers INC',
      legalName: 'DUMBO MOVERS INC',
      usdotNumber: '4411535',
      headquarters: '528 FERRY ST STE 2, NEWARK, NJ, 07105-4489',
      placeId,
      placeName: 'Dumbo Moving and Storage NYC',
      formattedAddress: address,
    });
    const classified = classifySharedPlaceHolders([storage, movers]);
    const displayed = classified.filter((row) => row.displayRating);
    const storageScore = classified.find((row) => row.companyId === storage.companyId)!;
    const moversScore = classified.find((row) => row.companyId === movers.companyId)!;
    assert.notEqual(storage.usdotNumber, movers.usdotNumber);
    if (storageScore.score === moversScore.score) {
      assert.equal(displayed.length, 0);
      assert.equal(storageScore.associationClass, 'distinct_unresolved');
      assert.equal(moversScore.associationClass, 'distinct_unresolved');
    } else {
      const winner = storageScore.score > moversScore.score ? storageScore : moversScore;
      const loser = winner === storageScore ? moversScore : storageScore;
      assert.deepEqual(displayed.map((row) => row.companyId), [winner.companyId]);
      assert.equal(winner.associationClass, 'rightful_owner');
      assert.equal(loser.displayRating, false);
      const winnerHolder = winner.companyId === storage.companyId ? storage : movers;
      const selected = selectRatingProvenance({
        provider: {
          id: winnerHolder.companyId,
          name: winnerHolder.companyName,
          legalName: winnerHolder.legalName,
          usdotNumber: winnerHolder.usdotNumber,
          headquarters: winnerHolder.headquarters,
        },
        google: google({
          place_id: placeId,
          name: 'Dumbo Moving and Storage NYC',
          formatted_address: address,
          rating: 4.6,
          review_count: 4437,
        }),
        samePlaceHolders: [storage, movers],
        holderEnumeration: 'complete',
        realBusiness: true,
      });
      assert.equal(selected.provenance.applicable, true);
      assert.equal(selected.provenance.rating, 4.6);
    }
    for (const row of classified) {
      assert.equal(row.displayRating, row.score === Math.max(storageScore.score, moversScore.score) && displayed.length === 1);
    }
  });

  it('keeps a franchise rating when the headquarters city is on the listing', () => {
    const address = '3430 Lorna Ln, Hoover, AL 35216';
    const listing = google({
      place_id: 'place-franchise',
      name: 'All My Sons Moving & Storage',
      formatted_address: address,
      rating: 4.6,
      review_count: 2510,
    });
    const selected = selectRatingProvenance({
      provider: {
        id: 'all-my-sons-birmingham',
        name: 'All My Sons Moving & Storage Birmingham',
        legalName: 'ALL MY SONS MOVING AND STORAGE OF BIRMINGHAM LLC',
        usdotNumber: '1605569',
        headquarters: 'Hoover',
      },
      google: listing,
      realBusiness: true,
    });
    assert.equal(selected.provenance.applicable, true);
    assert.equal(selected.provenance.rating, 4.6);
    assert.equal(selected.provenance.scope, 'location');

    const otherState = selectRatingProvenance({
      provider: {
        id: 'cedar-branch-austin',
        name: 'Cedar Branch Movers Savannah',
        legalName: 'CEDAR BRANCH MOVERS OF AUSTIN LLC',
        usdotNumber: '5006007',
        headquarters: 'Austin, TX',
      },
      google: google({
        place_id: 'place-cedar-savannah',
        name: 'Cedar Branch Movers',
        formatted_address: '18 River Street, Savannah, GA 31401',
        rating: 4.4,
        review_count: 20,
      }),
      realBusiness: true,
    });
    assert.equal(otherState.provenance.applicable, false);
  });

  it('does not give a different brand the listing of the same city', () => {
    const selected = selectRatingProvenance({
      provider: {
        id: 'spyder-moving-kalamazoo',
        name: 'Spyder Moving Kalamazoo',
        legalName: 'RELIABLE RUSH LOGISTICS LLC',
        usdotNumber: '4474403',
        headquarters: 'Portage',
      },
      google: google({
        place_id: 'place-college-hunks-kalamazoo',
        name: 'College Hunks Hauling Junk and Moving Kalamazoo',
        formatted_address: '2927 Millcork St, Kalamazoo, MI 49001',
        rating: 5,
        review_count: 4923,
      }),
      storedRating: 5,
      storedReviewCount: 4923,
      realBusiness: true,
    });
    assert.equal(selected.provenance.applicable, false);
    assert.equal(selected.displayGoogle, null);
    assert.equal(isVerifiedGoogleEvidence(selected.provenance), false);
    assert.match(selected.provenance.withheldReason ?? '', /does not match this business identity/);
  });

  it('withholds a same-brand listing whose headquarters city is a different place', () => {
    const address = '139 Donelson Pike, Nashville, TN 37214, USA';
    const listing = google({
      place_id: 'place-nashville-hunks',
      name: 'College Hunks Hauling Junk and Moving Nashville',
      formatted_address: address,
      rating: 4.7,
      review_count: 2396,
    });
    const knoxville = holder({
      companyId: 'college-hunks-knoxville',
      companyName: 'College Hunks Hauling Junk',
      headquarters: '6219 Riverview Crossing Dr, Knoxville, TN 37924',
      placeId: 'place-nashville-hunks',
      placeName: listing.name,
      formattedAddress: address,
    });
    const nashville = holder({
      companyId: 'college-hunks-nashville',
      companyName: 'College Hunks Hauling Junk & Moving Nashville',
      legalName: 'NORTHERN VOLUNTEER ENTERPRISES LLC',
      usdotNumber: '2533629',
      headquarters: 'Nashville',
      placeId: 'place-nashville-hunks',
      placeName: listing.name,
      formattedAddress: address,
    });
    const classified = classifySharedPlaceHolders([knoxville, nashville]);
    assert.equal(classified.find((row) => row.companyId === 'college-hunks-nashville')?.displayRating, true);
    assert.equal(classified.find((row) => row.companyId === 'college-hunks-knoxville')?.displayRating, false);
    const hidden = selectRatingProvenance({
      provider: {
        id: knoxville.companyId,
        name: knoxville.companyName,
        headquarters: knoxville.headquarters,
      },
      google: listing,
      samePlaceHolders: [knoxville, nashville],
      holderEnumeration: 'complete',
      realBusiness: true,
    });
    assert.equal(hidden.provenance.applicable, false);
    const kept = selectRatingProvenance({
      provider: {
        id: nashville.companyId,
        name: nashville.companyName,
        legalName: nashville.legalName,
        usdotNumber: nashville.usdotNumber,
        headquarters: nashville.headquarters,
      },
      google: listing,
      samePlaceHolders: [knoxville, nashville],
      holderEnumeration: 'complete',
      realBusiness: true,
    });
    assert.equal(kept.provenance.applicable, true);
    assert.equal(kept.provenance.rating, 4.7);
  });

  it('treats duplicate slugs as one business and leaves a missing profile undisplayed', () => {
    const address = '1743 US-9, Howell Township, NJ 07731';
    const duplicates = ['1st-moving-corp', '1st-moving-corp-2', '1st-moving-corp-3'].map((id, index) =>
      holder({
        companyId: id,
        companyName: index === 0 ? '1st Moving Corp.' : '1st Moving Corp',
        usdotNumber: null,
        headquarters: address,
        placeId: 'place-1st',
        placeName: '1st Moving Corp.',
        formattedAddress: address,
      })
    );
    const classified = classifySharedPlaceHolders(duplicates);
    assert.equal(classified.every((row) => row.displayRating), true);
    assert.equal(classified.every((row) => row.associationClass === 'same_legal_business'), true);
    const missing = classifySharedPlaceHolders([
      holder({
        companyId: 'missing-row',
        companyName: '',
        placeId: 'place-1st',
        placeName: '',
        formattedAddress: '',
      }),
    ]);
    assert.equal(missing[0]?.associationClass, 'missing_profile');
    assert.equal(missing[0]?.displayRating, false);

    const spring = '22026 Mossy Oaks Rd, Spring, TX 77389';
    const incorporated = classifySharedPlaceHolders(
      ['finest', 'finest-2', 'finest-inc'].map((id, index) =>
        holder({
          companyId: id,
          companyName:
            index === 2
              ? "Firefighting's Finest Moving & Storage INC"
              : "Firefighting's Finest Moving & Storage",
          usdotNumber: null,
          headquarters: spring,
          placeId: 'place-finest',
          placeName: "Firefighting's Finest Moving & Storage",
          formattedAddress: spring,
        })
      )
    );
    assert.equal(incorporated.every((row) => row.displayRating), true);
    assert.equal(incorporated.every((row) => row.associationClass === 'same_legal_business'), true);

    const memphis = '3264 Democrat Rd #5, Memphis, TN 38118';
    const cord = classifySharedPlaceHolders([
      holder({
        companyId: 'cord',
        companyName: 'Cord Moving & Storage',
        usdotNumber: null,
        headquarters: memphis,
        placeId: 'place-cord',
        placeName: 'Cord Moving Company and Storage - Movers Memphis',
        formattedAddress: memphis,
      }),
      holder({
        companyId: 'cord-memphis',
        companyName: 'Cord Moving & Storage Memphis',
        legalName: 'CORD MOVING AND STORAGE COMPANY',
        usdotNumber: '181102',
        headquarters: 'Memphis',
        placeId: 'place-cord',
        placeName: 'Cord Moving Company and Storage - Movers Memphis',
        formattedAddress: memphis,
      }),
    ]);
    assert.equal(cord.every((row) => row.displayRating), true);
  });

  it('keeps an evidenced shared location and does not display a different business on that place', () => {
    const evidence = {
      premise: 'Warehouse bay 4',
      observed_at: '2026-04-02T00:00:00.000Z',
      relationship: 'same_premise',
      source: { system: 'field_inspection', record_id: 'obs-2026-04-02' },
    };
    const shared = holder({
      companyId: 'co-shared',
      companyName: 'Harbor Gate Movers',
      usdotNumber: '1002003',
      headquarters: 'Savannah, GA',
      placeId: 'place-shared',
      placeName: 'Northline Van Lines',
      formattedAddress: '900 Market Street, Dallas, TX 75201',
      sharedLocationEvidence: evidence,
    });
    const other = holder({
      companyId: 'co-other',
      companyName: 'Cedar Bin Storage',
      usdotNumber: '5006007',
      headquarters: 'Boise, ID',
      placeId: 'place-shared',
      placeName: 'Northline Van Lines',
      formattedAddress: '900 Market Street, Dallas, TX 75201',
    });
    const classified = classifySharedPlaceHolders([shared, other]);
    assert.equal(classified.find((row) => row.companyId === 'co-shared')?.associationClass, 'shared_location');
    assert.equal(classified.find((row) => row.companyId === 'co-shared')?.displayRating, true);
    assert.equal(classified.find((row) => row.companyId === 'co-other')?.displayRating, false);
  });

  it('does not present seed Google cards or unverified snapshots as verified Google evidence', () => {
    const amerisafeCards = seedReviews.filter(
      (review) => review.companyId === 'amerisafe' && review.source === 'Google'
    );
    assert.equal(amerisafeCards.length, 2);
    assert.equal(amerisafeCards.every((review) => review.rating === 5 && review.verified), true);
    const withheld = selectRatingProvenance({
      provider: {
        id: 'amerisafe',
        name: 'Amerisafe Van Lines',
        legalName: 'AMS MOVING INC',
        usdotNumber: '3341650',
        headquarters: 'Boynton Beach, FL',
      },
      google: google({
        place_id: 'place-avl',
        name: 'American Van Lines',
        formatted_address: '1351 NW 22nd St, Pompano Beach, FL 33069, USA',
        rating: 4.2,
        review_count: 2150,
      }),
      seedRating: 4.7,
      seedReviewCount: 1650,
      realBusiness: true,
    });
    const shown = googleReviewCardsForProvenance(amerisafeCards, withheld.provenance);
    assert.equal(shown.length, 0);
    assert.equal(amerisafeCards.length, 2);
    assert.equal(amerisafeCards[0]?.id, 'r-amerisafe-1');
    assert.equal(amerisafeCards[1]?.id, 'r-amerisafe-5');
    const unknown = googleReviewCardsForProvenance(
      [{ source: 'Unknown', verified: true }],
      withheld.provenance
    );
    assert.equal(unknown.length, 0);
    const nameless = selectRatingProvenance({
      provider: { id: 'legacy-1', name: 'Legacy Mover', headquarters: 'Austin, TX', usdotNumber: '2222222' },
      google: google({
        name: null,
        place_id: null,
        formatted_address: null,
        rating: 4.2,
        review_count: 8,
      }),
      realBusiness: true,
    });
    assert.equal(nameless.provenance.sourceLabel, 'Google Places');
    assert.equal(nameless.provenance.scope, 'unverified');
    assert.equal(nameless.provenance.applicable, false);
    assert.equal(isVerifiedGoogleEvidence(nameless.provenance), false);
    assert.equal(googleReviewCardsForProvenance(amerisafeCards, nameless.provenance).length, 0);
    const stored = selectRatingProvenance({
      provider: { id: 'co-harbor', name: 'Harbor Gate Movers', headquarters: 'Savannah, GA' },
      google: null,
      storedRating: 3.1,
      storedReviewCount: 9,
      realBusiness: true,
    });
    assert.equal(stored.provenance.sourceLabel, 'Stored rating');
    assert.equal(stored.provenance.source, 'stored_column');
    assert.equal(isVerifiedGoogleEvidence(stored.provenance), false);
    const schema = JSON.stringify(
      buildCompanyDirectorySchemaGraph(
        applyRatingProvenance(
          company({
            name: 'Amerisafe Van Lines',
            usdotNumber: '3341650',
            headquarters: 'Boynton Beach, FL',
            googleData: google({
              place_id: 'place-avl',
              name: 'American Van Lines',
              formatted_address: '1351 NW 22nd St, Pompano Beach, FL 33069, USA',
              rating: 4.2,
              review_count: 2150,
            }),
          }),
          { storedRating: 4.2, storedReviewCount: 2150, seedRating: 4.7, realBusiness: true }
        )
      )
    );
    assert.equal(schema.includes('AggregateRating'), false);
    assert.equal(schema.includes('Review'), false);
  });
});

describe('rating provenance surfaces', () => {
  it('labels source and scope on the card, table, and profile panel', () => {
    const card = readFileSync('components/directory/company-card.tsx', 'utf8');
    const table = readFileSync('components/directory/directory-client.tsx', 'utf8');
    const panel = readFileSync('components/verification/google-reviews-section.tsx', 'utf8');
    const backfill = readFileSync('lib/verification/run-production-backfill.ts', 'utf8');
    const persist = readFileSync('lib/verification/persist-google-snapshot.ts', 'utf8');
    for (const source of [card, table]) {
      assert.match(source, /ratingProvenance/);
      assert.match(source, /sourceLabel/);
      assert.match(source, /scopeLabel/);
    }
    assert.match(panel, /sourceLabel/);
    assert.match(panel, /scopeLabel/);
    assert.match(panel, /provenance/);
    assert.match(card, /withheldReason/);
    assert.match(table, /withheldReason/);
    assert.match(backfill, /rating_reviews/);
    assert.match(persist, /decidePlaceAttachment/);
    assert.doesNotMatch(persist, /\.delete\(/);
    for (const file of [
      'lib/verification/rating-provenance.ts',
      'lib/verification/persist-google-snapshot.ts',
      'lib/directory/merge-directory.ts',
      'lib/verification/backfill-helpers.ts',
    ]) {
      const text = readFileSync(file, 'utf8');
      assert.equal(text.includes('AmeriSafe'), false, file);
      assert.equal(text.includes('Pack-Rat'), false, file);
      assert.equal(text.includes('American Van Lines'), false, file);
    }
  });
});
