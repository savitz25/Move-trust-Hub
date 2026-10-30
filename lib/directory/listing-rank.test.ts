import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { performance } from 'node:perf_hooks';
import { directoryFiltersFromSearchParams } from '@/lib/directory/build-directory-api-query';
import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import {
  PLAIN_REPUTATION_LISTING_SQL,
  compareReputationListing,
  hydrateListingPage,
  isPlainReputationListing,
  listingSqlOmitsHeavyJson,
  pageReputationListing,
  readPlainListingPage,
  type ListingRankRow,
} from '@/lib/directory/listing-rank';
import {
  companyListProjectionCandidates,
  mapCompanyRow,
} from '@/lib/supabase/queries/companies';

function row(
  id: string,
  reputationScore: number | null,
  extras: Partial<ListingRankRow> = {}
): ListingRankRow {
  return {
    id,
    reputationScore,
    publicationState: 'PUBLISHABLE',
    serviceScope: 'interstate',
    ...extras,
  };
}

describe('listing field projection', () => {
  it('paged company list omits legacy JSON and still reads verification snapshots', () => {
    const columns = companyListProjectionCandidates(false);
    assert.ok(columns.length > 0);
    for (const projection of columns) {
      assert.equal(projection.includes('google_data'), false);
      assert.equal(projection.includes('public_scrape_data'), false);
      assert.equal(projection.includes('verification_sources'), true);
      assert.equal(projection.includes('reputation_score'), true);
    }
  });

  it('a row without legacy JSON still exposes Google and BBB from verification_sources', () => {
    const company = mapCompanyRow({
      id: 'co-1',
      slug: 'example-mover',
      name: 'Example Mover',
      headquarters: 'Dallas, TX',
      usdot_number: '1234567',
      service_scope: 'interstate',
      publication_state: 'PUBLISHABLE',
      reputation_score: 70,
      verification_sources: {
        google: { status: 'ok', source: 'google_places_api', rating: 4.6, review_count: 12 },
        public_scrape: {
          confidence: 'public',
          bbb_rating: 'A+',
          bbb_profile_url: 'https://www.bbb.org/profile/example-mover',
          sources: { bbb: { status: 'ok', method: 'profile' } },
        },
      },
    });
    assert.equal(company.googleData?.rating, 4.6);
    assert.equal(company.googleData?.review_count, 12);
    assert.equal(company.reputationScore, 70);
    assert.equal(company.bbbRating, 'A+');
    assert.equal(company.id, 'co-1');
  });

  it('Google and BBB that exist only in legacy JSON stay on the directory card', () => {
    const company = mapCompanyRow({
      id: 'legacy-1',
      slug: 'legacy-mover',
      name: 'Legacy Mover',
      headquarters: 'Austin, TX',
      usdot_number: '2222222',
      service_scope: 'interstate',
      publication_state: 'PUBLISHABLE',
      reputation_score: 12,
      overall_rating: 0,
      review_count: 0,
      google_data: {
        source: 'google_places_api',
        status: 'ok',
        rating: 4.2,
        review_count: 8,
      },
      public_scrape_data: {
        confidence: 'public',
        bbb_rating: 'A',
        bbb_profile_url: 'https://www.bbb.org/us/tx/austin/profile/movers/legacy-mover',
        sources: { bbb: { status: 'ok', method: 'profile' } },
      },
    });
    assert.equal(company.overallRating, 4.2);
    assert.equal(company.reviewCount, 8);
    assert.equal(company.bbbRating, 'A');
    assert.equal(company.googleData?.rating, 4.2);
    const [card] = prepareCompaniesForDirectoryClient([company]);
    assert.ok(card);
    assert.equal(card?.overallRating, 4.2);
    assert.equal(card?.reviewCount, 8);
    assert.equal(card?.bbbRating, 'A');
    assert.equal(card?.publicScrapeData?.bbb_rating, 'A');
    const hydration = companyListProjectionCandidates(true)[0] ?? '';
    assert.equal(hydration.includes('google_data'), true);
    assert.equal(hydration.includes('public_scrape_data'), true);
  });
});

describe('listing reputation rank', () => {
  it('default listing SQL does not read google_data or public_scrape_data', () => {
    assert.equal(listingSqlOmitsHeavyJson(PLAIN_REPUTATION_LISTING_SQL), true);
    assert.match(PLAIN_REPUTATION_LISTING_SQL, /COALESCE\(c\.reputation_score, 0\)/);
    assert.match(PLAIN_REPUTATION_LISTING_SQL, /ORDER BY v\.reputation_key DESC, v\.id ASC/);
    assert.match(PLAIN_REPUTATION_LISTING_SQL, /SELECT count\(\*\)::bigint AS total_count/);
    assert.match(PLAIN_REPUTATION_LISTING_SQL, /LEFT JOIN paged p ON true/);
    assert.match(PLAIN_REPUTATION_LISTING_SQL, /service_scope IS DISTINCT FROM 'intrastate'/);
    assert.match(PLAIN_REPUTATION_LISTING_SQL, /PUBLISHABLE', 'INDEXABLE', 'VERIFIED'/);
    assert.doesNotMatch(PLAIN_REPUTATION_LISTING_SQL, /select c\.\*/i);
  });

  it('keeps filtered sorts on the existing directory function', () => {
    const plain = {
      excludeLocal: true,
      usdot: null,
      mc: null,
      filters: {},
    };
    assert.equal(isPlainReputationListing(plain), true);
    assert.equal(isPlainReputationListing({ ...plain, filters: { sort: 'complaints' } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { state: 'TX' } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { services: ['Carrier'] } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { services: ['Storage'] } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { specialties: ['piano'] } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { scope: { stateCode: 'TX' } } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { coverage: 'National' } }), false);
    assert.equal(
      isPlainReputationListing({
        ...plain,
        filters: { coverageFilter: { mode: 'state', stateCode: 'TX' } },
      }),
      false
    );
    assert.equal(isPlainReputationListing({ ...plain, filters: { minRating: 4 } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { maxPrice: 4000 } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { bbbMin: 'A' } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { onlyFullService: true } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { onlyVerified: true } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { counties: ['miami-dade'] } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { recordedHqState: 'TX' } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { recordedHqCity: 'DALLAS' } }), false);
    assert.equal(isPlainReputationListing({ ...plain, filters: { search: 'atlas' } }), false);
    assert.equal(
      isPlainReputationListing({
        ...plain,
        filters: { unexpected: 'on' } as never,
      }),
      false
    );
    assert.equal(isPlainReputationListing({ ...plain, excludeLocal: false }), false);
    assert.equal(isPlainReputationListing({ ...plain, usdot: '76235' }), false);
    assert.equal(
      isPlainReputationListing({
        ...plain,
        filters: {
          search: ' ',
          sort: 'reputation',
          minRating: 0,
          maxPrice: 12000,
          services: [],
          coverage: 'Any',
          coverageFilter: { mode: 'any' },
          bbbMin: '',
          onlyFullService: false,
          onlyVerified: false,
          specialties: [],
          scope: {},
          state: null,
          counties: [],
          recordedHqState: null,
          recordedHqCity: ' ',
        },
      }),
      true
    );
    assert.equal(
      isPlainReputationListing({
        excludeLocal: true,
        usdot: null,
        mc: null,
        filters: directoryFiltersFromSearchParams({}),
      }),
      true
    );
    assert.equal(
      isPlainReputationListing({
        excludeLocal: true,
        usdot: null,
        mc: null,
        filters: directoryFiltersFromSearchParams({ services: 'Storage' }),
      }),
      false
    );
  });

  it('keeps publication and interstate eligibility', () => {
    const rows = [
      row('visible', 10),
      row('review', 99, { publicationState: 'REVIEW_REQUIRED' }),
      row('inactive', 98, { publicationState: 'INACTIVE' }),
      row('ingested', 97, { publicationState: 'INGESTED' }),
      row('classified', 96, { publicationState: 'CLASSIFIED' }),
      row('null-state', 9, { publicationState: null }),
      row('local', 100, { serviceScope: 'intrastate' }),
      row('other-scope', 8, { serviceScope: 'regional' }),
    ];
    const page = pageReputationListing(rows, 0, 10);
    assert.deepEqual(page.ids, ['visible', 'null-state', 'other-scope']);
    assert.equal(page.total, 3);
  });

  it('orders null reputation with zero and breaks ties by id', () => {
    const rows = [
      row('m', 0),
      row('a', null),
      row('z', 0),
      row('b', 5),
    ];
    assert.deepEqual(
      rows.slice().sort(compareReputationListing).map((item) => item.id),
      ['b', 'a', 'm', 'z']
    );
  });

  it('page boundaries do not overlap or skip when scores tie', () => {
    const rows = ['c', 'a', 'b', 'd'].map((id) => row(id, 40));
    const first = pageReputationListing(rows, 0, 2);
    const second = pageReputationListing(rows, 2, 2);
    assert.deepEqual(first.ids, ['a', 'b']);
    assert.deepEqual(second.ids, ['c', 'd']);
    assert.equal(first.hasMore, true);
    assert.equal(second.hasMore, false);
    assert.equal(new Set([...first.ids, ...second.ids]).size, 4);
    const past = pageReputationListing(rows, 50, 2);
    assert.deepEqual(past.ids, []);
    assert.equal(past.total, 4);
  });

  it('an empty SQL page keeps the count and hydration does not reshuffle it', () => {
    const page = readPlainListingPage([{ company_id: null, total_count: '17' }]);
    assert.deepEqual(page.ids, []);
    assert.equal(page.total, 17);

    const shuffled = [
      { id: 'm', label: 'm' },
      { id: 'm', label: 'duplicate' },
      { id: 'z', label: 'z' },
      { id: 'extra', label: 'extra' },
      { id: 'b', label: 'b' },
    ];
    const hydrated = hydrateListingPage(['b', 'a', 'm', 'b'], shuffled);
    assert.deepEqual(
      hydrated.map((item) => item.id),
      ['b', 'm']
    );
    assert.equal(hydrated.length, new Set(hydrated.map((item) => item.id)).size);
    assert.equal(hydrated.some((item) => item.id === 'extra'), false);
    assert.equal(hydrated.some((item) => item.label === 'duplicate'), false);
  });

  it('narrow sort payload is much smaller than rows that carry both JSON blobs', () => {
    const blob = 'x'.repeat(8_192);
    const rows = Array.from({ length: 1_000 }, (_, index) => ({
      id: String(index).padStart(6, '0'),
      reputation_score: index % 101,
      google_data: { raw_response: blob },
      public_scrape_data: { snippets: blob },
    }));
    const wideBytes = Buffer.byteLength(JSON.stringify(rows));
    const narrow = rows.map((item) => ({ id: item.id, reputation_score: item.reputation_score }));
    const narrowBytes = Buffer.byteLength(JSON.stringify(narrow));

    const wideStarted = performance.now();
    rows.slice().sort((a, b) => b.reputation_score - a.reputation_score || (a.id < b.id ? -1 : 1));
    const wideMs = performance.now() - wideStarted;

    const narrowStarted = performance.now();
    narrow.slice().sort((a, b) => b.reputation_score - a.reputation_score || (a.id < b.id ? -1 : 1));
    const narrowMs = performance.now() - narrowStarted;

    assert.ok(narrowBytes * 20 < wideBytes, `narrow ${narrowBytes} wide ${wideBytes}`);
    assert.ok(wideMs >= 0 && narrowMs >= 0);
    // Evidence for the receipt. Not a production measurement.
    console.log(
      JSON.stringify({
        rows: rows.length,
        wideBytes,
        narrowBytes,
        wideMs: Number(wideMs.toFixed(3)),
        narrowMs: Number(narrowMs.toFixed(3)),
        byteReduction: Number((1 - narrowBytes / wideBytes).toFixed(4)),
      })
    );
  });
});
