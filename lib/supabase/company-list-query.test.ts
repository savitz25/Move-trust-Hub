import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { describe, it } from 'node:test';
import { isVerifiedGoogleEvidence } from '@/lib/verification/rating-provenance';
import {
  applyLegacyListSnapshots,
  companyListProjectionCandidates,
  mapCompanyRow,
} from '@/lib/supabase/queries/companies';

const companiesSource = readFileSync('lib/supabase/queries/companies.ts', 'utf8');

function functionBody(source: string, startMark: string, endMark: string): string {
  const start = source.indexOf(startMark);
  const end = source.indexOf(endMark, start + startMark.length);
  assert.ok(start >= 0, startMark);
  assert.ok(end > start, endMark);
  return source.slice(start, end);
}

function columnNames(projection: string): string[] {
  return projection
    .split(',')
    .map((column) => column.trim())
    .filter(Boolean);
}

describe('legacy company list query shape', () => {
  it('sorts the catalog without google_data or public_scrape_data', () => {
    const narrow = companyListProjectionCandidates(false);
    const wide = companyListProjectionCandidates(true);
    assert.ok(narrow.length > 0);
    for (const projection of narrow) {
      assert.equal(projection.includes('google_data'), false);
      assert.equal(projection.includes('public_scrape_data'), false);
      assert.equal(projection.includes('verification_sources'), true);
      assert.equal(projection.includes('fmcsa_raw'), true);
      assert.equal(projection.includes('reputation_score'), true);
    }
    assert.equal(wide[0]?.endsWith(', google_data, public_scrape_data'), true);
    assert.equal(columnNames(wide[0] ?? '').length, columnNames(narrow[0] ?? '').length + 2);

    const fetchBody = functionBody(
      companiesSource,
      'async function fetchCompaniesFromDatabase',
      'const getCompaniesDataCached'
    );
    assert.match(fetchBody, /companyListProjectionCandidates\(false\)/);
    assert.match(fetchBody, /selectCompanyList\(supabase, cols\)/);
    assert.match(fetchBody, /readLegacyListSnapshots\(supabase\)/);
    assert.match(fetchBody, /snapshots \? applyLegacyListSnapshots\(records, snapshots\) : records/);
    assert.equal(fetchBody.includes('google_data'), false);
    assert.equal(fetchBody.includes('public_scrape_data'), false);
    assert.equal(fetchBody.includes('place_id'), false);
    assert.equal(fetchBody.includes('attributeDirectoryPageCompanies'), false);
    assert.equal(fetchBody.includes('samePlaceHolders'), false);

    const scan = functionBody(
      companiesSource,
      'async function selectCompanyList',
      'async function withTimeout'
    );
    assert.match(scan, /\.order\('reputation_score', \{ ascending: false \}\)/);
    assert.match(scan, /\.order\('id', \{ ascending: true \}\)/);
    assert.equal(scan.includes('google_data'), false);

    const snapshot = functionBody(
      companiesSource,
      'async function readLegacyListSnapshots',
      'export function applyLegacyListSnapshots'
    );
    assert.match(
      companiesSource,
      /const LEGACY_LIST_SNAPSHOT_SELECT = 'id, google_data, public_scrape_data';/
    );
    assert.match(snapshot, /LEGACY_LIST_SNAPSHOT_SELECT/);
    assert.match(snapshot, /google_data\.not\.is\.null,public_scrape_data\.not\.is\.null/);
    assert.match(snapshot, /\.order\('id', \{ ascending: true \}\)/);
    assert.equal(snapshot.includes('reputation_score'), false);
    assert.match(snapshot, /markEnrichmentColumnsMissing\(\)/);
    assert.match(snapshot, /return null/);

    const cache = companiesSource.slice(
      companiesSource.indexOf('const getCompaniesDataCached'),
      companiesSource.indexOf('export const getCompaniesCached')
    );
    assert.match(cache, /companies-directory-v20-wave3/);
    assert.match(cache, /revalidate: 300/);
  });

  it('leaves bounded profile and search projections in place', () => {
    assert.equal(
      (companiesSource.match(/companyListProjectionCandidates\(false\)/g) ?? []).length,
      1
    );
    assert.equal((companiesSource.match(/companyListProjectionCandidates\(\)/g) ?? []).length, 1);
    const search = readFileSync('lib/search/query.ts', 'utf8');
    const directory = readFileSync('lib/directory/query-db-directory-page.ts', 'utf8');
    assert.match(search, /companyListProjectionCandidates\(false\)/);
    assert.match(directory, /companyListProjectionCandidates\(false\)/);
    assert.match(directory, /companyListProjectionCandidates\(true\)/);
    const admin = readFileSync('lib/admin/load-companies-dashboard.ts', 'utf8');
    assert.match(admin, /google_data, public_scrape_data/);
    const clientList = readFileSync('lib/data.ts', 'utf8');
    assert.match(clientList, /\.select\('\*'\)/);
  });

  it('keeps one-id and one-carrier callers off the full catalog', () => {
    const detached = [
      'app/(move)/company/[slug]/page.tsx',
      'actions/reviews.ts',
      'lib/reviews/companies.ts',
      'lib/reviews/resolve-initial-carrier.ts',
      'lib/reviews/revalidate-paths.ts',
      'lib/reviews/send-approval-email.ts',
      'lib/verify-dot/directory-lookup.ts',
    ];
    for (const file of detached) {
      const text = readFileSync(file, 'utf8');
      assert.equal(text.includes('getAllCompanies'), false, file);
      assert.equal(text.includes('getCompaniesCached'), false, file);
    }
    assert.match(readFileSync('lib/verify-dot/directory-lookup.ts', 'utf8'), /seedCompanies/);
    assert.match(readFileSync('lib/supabase/queries/companies.ts', 'utf8'), /select\('slug'\)/);

    const stillFullCatalog = [
      'app/(move)/compare/page.tsx',
      'app/api/companies/route.ts',
      'lib/directory/unified-directory.ts',
      'lib/data-server.ts',
    ];
    for (const file of stillFullCatalog) {
      const text = readFileSync(file, 'utf8');
      assert.match(text, /getAllCompanies|getCompaniesCached/, file);
    }
  });
});

describe('legacy list payload and rating parity', () => {
  it('estimates a smaller reputation sort tuple from a disposable fixture', () => {
    const narrowColumns = columnNames(companyListProjectionCandidates(false)[0] ?? '');
    const blob = 'x'.repeat(8_192);
    const sources = {
      google: { status: 'ok', source: 'google_places_api', rating: 4.6, review_count: 12 },
    };
    const fmcsaRaw = { safetyRating: 'Satisfactory' };
    const rows = Array.from({ length: 1_000 }, (_, index) => {
      const row: Record<string, unknown> = {};
      for (const column of narrowColumns) {
        if (column === 'verification_sources') row[column] = sources;
        else if (column === 'fmcsa_raw') row[column] = fmcsaRaw;
        else if (column === 'reputation_score') row[column] = index % 101;
        else row[column] = String(index).padStart(6, '0');
      }
      return row;
    });
    const wide = rows.map((row) => ({
      ...row,
      google_data: { raw_response: blob },
      public_scrape_data: { snippets: blob },
    }));
    const wideBytes = Buffer.byteLength(JSON.stringify(wide));
    const narrowBytes = Buffer.byteLength(JSON.stringify(rows));
    const snapshot = wide.map((row) => ({
      id: row.id,
      google_data: row.google_data,
      public_scrape_data: row.public_scrape_data,
    }));
    const snapshotBytes = Buffer.byteLength(JSON.stringify(snapshot));
    const catalogRows = 5_957;
    const pageSize = 1_000;
    const sortedPages = Math.ceil(catalogRows / pageSize);

    const wideStarted = performance.now();
    wide
      .slice()
      .sort(
        (a, b) =>
          Number(b.reputation_score) - Number(a.reputation_score) ||
          String(a.id).localeCompare(String(b.id))
      );
    const wideMs = performance.now() - wideStarted;
    const narrowStarted = performance.now();
    rows
      .slice()
      .sort(
        (a, b) =>
          Number(b.reputation_score) - Number(a.reputation_score) ||
          String(a.id).localeCompare(String(b.id))
      );
    const narrowMs = performance.now() - narrowStarted;

    assert.ok(narrowBytes * 5 < wideBytes, `narrow ${narrowBytes} wide ${wideBytes}`);
    assert.equal(snapshot.length, 1_000);
    assert.equal(Object.keys(snapshot[0] ?? {}).length, 3);
    assert.ok(wideMs >= 0 && narrowMs >= 0);

    const proof = {
      productionMeasurement: false,
      fixtureRows: rows.length,
      catalogRowsObservedElsewhere: catalogRows,
      sortedPages,
      columnsBefore: narrowColumns.length + 2,
      columnsAfterSort: narrowColumns.length,
      snapshotColumns: 3,
      queriesBefore: sortedPages,
      queriesAfterUpperBound: sortedPages * 2,
      sortBytesBeforePerThousand: wideBytes,
      sortBytesAfterPerThousand: narrowBytes,
      snapshotBytesPerThousandNonNull: snapshotBytes,
      estimatedSortBytesBefore: Math.round((wideBytes / rows.length) * catalogRows),
      estimatedSortBytesAfter: Math.round((narrowBytes / rows.length) * catalogRows),
      wideSortMs: Number(wideMs.toFixed(3)),
      narrowSortMs: Number(narrowMs.toFixed(3)),
      sortByteReduction: Number((1 - narrowBytes / wideBytes).toFixed(4)),
    };
    assert.equal(proof.productionMeasurement, false);
    assert.equal(proof.queriesBefore, 6);
    assert.ok(proof.estimatedSortBytesAfter < proof.estimatedSortBytesBefore);
    console.log(JSON.stringify(proof));
  });

  it('merges a legacy snapshot without turning a missing or conflicting rating into verified Google', () => {
    const base = {
      id: 'co-1',
      slug: 'example-mover',
      name: 'Example Mover',
      headquarters: 'Dallas, TX',
      usdot_number: '1234567',
      service_scope: 'interstate',
      publication_state: 'PUBLISHABLE',
      reputation_score: 70,
    };
    const google = {
      status: 'ok',
      source: 'google_places_api',
      rating: 4.6,
      review_count: 12,
    };
    const fromSources = mapCompanyRow({
      ...base,
      verification_sources: { google },
    });
    const fromColumn = mapCompanyRow({
      ...base,
      google_data: google,
    });
    assert.equal(fromSources.overallRating, fromColumn.overallRating);
    assert.equal(fromSources.reviewCount, fromColumn.reviewCount);
    assert.equal(fromSources.googleData?.rating, 4.6);
    assert.equal(fromColumn.googleData?.rating, 4.6);
    assert.equal(isVerifiedGoogleEvidence(fromSources.ratingProvenance), false);
    assert.equal(isVerifiedGoogleEvidence(fromColumn.ratingProvenance), false);

    const narrow = {
      ...base,
      verification_sources: { google },
    };
    const columnGoogle = { ...google, rating: 3.1, review_count: 4 };
    const [hydrated] = applyLegacyListSnapshots(
      [narrow],
      new Map([['co-1', { google_data: columnGoogle, public_scrape_data: null }]])
    );
    assert.ok(hydrated);
    const merged = mapCompanyRow(hydrated);
    const direct = mapCompanyRow({ ...narrow, google_data: columnGoogle, public_scrape_data: null });
    assert.equal(merged.overallRating, direct.overallRating);
    assert.equal(merged.reviewCount, direct.reviewCount);
    assert.equal(merged.googleData?.rating, 3.1);
    assert.equal(merged.reviewCount, 4);
    assert.equal(isVerifiedGoogleEvidence(merged.ratingProvenance), false);
    assert.equal(merged.ratingProvenance?.scope, 'unverified');

    const untouched = applyLegacyListSnapshots([narrow], new Map());
    assert.equal(untouched[0], narrow);
    const sourcesOnly = mapCompanyRow(untouched[0] ?? narrow);
    assert.equal(sourcesOnly.googleData?.rating, 4.6);
    assert.equal(isVerifiedGoogleEvidence(sourcesOnly.ratingProvenance), false);

    const named = mapCompanyRow({
      ...base,
      id: 'named-1',
      google_data: {
        ...google,
        rating: 4.8,
        review_count: 20,
        name: 'A Different Listing',
        place_id: 'place-not-proven',
      },
    });
    assert.equal(named.overallRating, 0);
    assert.equal(named.reviewCount, 0);
    assert.equal(isVerifiedGoogleEvidence(named.ratingProvenance), false);
    assert.ok(named.ratingProvenance?.withheldReason);

    const stored = mapCompanyRow({
      ...base,
      id: 'stored-1',
      overall_rating: 4.9,
      review_count: 40,
    });
    assert.equal(stored.googleData ?? null, null);
    assert.equal(stored.ratingProvenance?.source, 'stored_column');
    assert.equal(stored.ratingProvenance?.applicable, false);
    assert.equal(isVerifiedGoogleEvidence(stored.ratingProvenance), false);
  });
});
