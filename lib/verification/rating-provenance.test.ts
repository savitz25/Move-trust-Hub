import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { mergeDirectoryCompanies, mergeEnrichmentOntoProfile } from '@/lib/directory/merge-directory';
import { buildCompanyDirectorySchemaGraph } from '@/lib/seo/build-company-directory-schema';
import { mapCompanyRow } from '@/lib/supabase/queries/companies';
import { companyProfileReviewMeta } from '@/lib/trust/review-display-policy';
import { buildVerificationBackfillUpdate } from '@/lib/verification/backfill-helpers';
import { scoreGooglePlaceMatch } from '@/lib/verification/google-places-name-queries';
import { persistGoogleSnapshot } from '@/lib/verification/persist-google-snapshot';
import {
  applyRatingProvenance,
  decidePlaceAttachment,
  displayedRatingValue,
  nameIdentityScore,
  selectRatingProvenance,
  type PlaceHolder,
} from '@/lib/verification/rating-provenance';
import type { CompanyEnrichmentResult, GooglePlacesData } from '@/lib/verification/types';
import type { Company } from '@/types';

function company(partial: Partial<Company>): Company {
  return {
    id: partial.id ?? 'co-harbor',
    slug: partial.slug ?? 'harbor-gate-movers',
    name: partial.name ?? 'Harbor Gate Movers',
    shortDescription: '',
    description: '',
    headquarters: partial.headquarters ?? 'Savannah, GA',
    website: partial.website ?? 'https://harborgate.example',
    usdotNumber: partial.usdotNumber ?? '1002003',
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
    coverage: 'Interstate household-goods authority — confirm origin and destination with this company',
    services: ['Carrier'],
    specialties: [],
    ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
    isVerified: true,
    lastUpdated: '2026-06-01',
    authorityActive: true,
    outOfService: false,
    entityType: 'Carrier',
    serviceScope: 'interstate',
    ...partial,
  };
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
    assert.equal(succeeded.action, 'attach');

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
