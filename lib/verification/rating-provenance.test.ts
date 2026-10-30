import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { mergeDirectoryCompanies, mergeEnrichmentOntoProfile } from '@/lib/directory/merge-directory';
import { mapCompanyRow } from '@/lib/supabase/queries/companies';
import { buildVerificationBackfillUpdate } from '@/lib/verification/backfill-helpers';
import {
  decidePlaceAttachment,
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
    assert.match(decision.reason, /different business/);

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
      holders: [holder({ sharedLocationEvidence: true })],
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
