import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GoogleReviewsSection } from '../verification/google-reviews-section';
import { AttributedReviewsPanel } from '../reviews/attributed-reviews-panel';
import { BbbPublicDetail } from '../verification/bbb-public-detail';
import { ExternalReputationHeader } from './external-reputation-header';
import { hasGoogleReputationSnapshot } from '@/lib/verification/google-reputation-snapshot';
import { buildCompanyDirectorySchemaGraph } from '@/lib/seo/build-company-directory-schema';
import { seedCompanies } from '@/data/seed-companies';
import { seedReviews } from '@/data/seed-reviews';
import { isAttributableReview } from '@/lib/trust/verified-reviews';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

// Match the repository's existing tsx render-test setup.
Object.assign(globalThis, { React });
const root = path.resolve(__dirname, '../..');
// Actual committed snapshot; test-only incomplete variants below never enter app data.
const snapshot: GooglePlacesData = JSON.parse(fs.readFileSync(
  path.join(root, 'data/auto-transport-google-enrichment.json'), 'utf8'
))['reliable-carriers'].google;
const reference = seedReviews.find(isAttributableReview)!;
const google = (data: GooglePlacesData | null | undefined) => renderToStaticMarkup(
  React.createElement(GoogleReviewsSection, { data, companyName: 'Reliable Carriers' })
);
const header = (data: GooglePlacesData | null | undefined, reviews = [] as typeof seedReviews) =>
  renderToStaticMarkup(React.createElement(ExternalReputationHeader, { googleData: data, reviews }));
const references = (initialReviews: typeof seedReviews) => renderToStaticMarkup(
  React.createElement(AttributedReviewsPanel, { companyId: reference.companyId, companyName: 'Company', initialReviews })
);

const incomplete: Array<[string, GooglePlacesData | null | undefined]> = [
  ['null', null], ['undefined', undefined],
  ['empty object', {} as GooglePlacesData],
  ...(['error', 'not_found', 'skipped'] as const).map((status): [string, GooglePlacesData] =>
    [status, { ...snapshot, status }]),
  ...([
    ['rating missing', { rating: null }], ['rating zero', { rating: 0 }],
    ['rating out of range', { rating: 6 }], ['rating NaN', { rating: NaN }],
    ['count missing', { review_count: null }], ['count zero', { review_count: 0 }],
    ['count negative', { review_count: -1 }], ['count fractional', { review_count: 1.5 }],
    ['count infinite', { review_count: Infinity }],
    ['source missing', { source: undefined }],
    ['date missing', { last_fetched: '' }], ['date invalid', { last_fetched: 'unknown' }],
    ['listing missing', { place_id: null, name: null, formatted_address: null }],
    ['listing whitespace', { place_id: ' ', name: ' ', formatted_address: ' ' }],
  ] as Array<[string, Partial<GooglePlacesData>]>).map(([name, partial]): [string, GooglePlacesData] =>
    [name, { ...snapshot, ...partial }]),
];

for (const [name, data] of incomplete) {
  test(`no Google card, search CTA, heading, or spacing markup for ${name}`, () => {
    assert.equal(hasGoogleReputationSnapshot(data), false);
    assert.equal(google(data), '');
    assert.equal(header(data), '');
  });
}

test('real Google snapshot retains stored values, provenance, checked date and listing link', () => {
  const html = google(snapshot);
  assert.match(html, /Google rating \(external\)/);
  assert.match(html, /4\.8/);
  assert.match(html, /135 Google reviews/);
  assert.match(html, /Snapshot checked Jul 26, 2026/);
  assert.match(html, /Source: Google Places/);
  assert.ok(html.includes(`query_place_id=${snapshot.place_id}`));
  assert.doesNotMatch(html, /Search Google for|live Google|application\/ld\+json/);
  assert.match(header(snapshot), /External Reputation Snapshots/);
});

test('legacy snapshot can omit status but cannot omit evidence', () => {
  const { status: _status, ...legacy } = snapshot;
  assert.match(google(legacy as GooglePlacesData), /Google rating \(external\)/);
  assert.equal(google({ ...legacy, last_fetched: '' } as GooglePlacesData), '');
});

test('empty or unattributable references render no section', () => {
  assert.equal(references([]), '');
  assert.equal(references([{ ...reference, verified: false }]), '');
  assert.equal(references([{ ...reference, source: 'Verified Customer' }]), '');
  assert.equal(header(null, [{ ...reference, verified: false }]), '');
});

test('actual attributed references can render without a Google snapshot', () => {
  const html = references([reference]);
  assert.match(html, /id="attributed-reviews"/);
  assert.ok(html.includes(reference.author));
  assert.match(html, /View on Google/);
  assert.doesNotMatch(html, /No external review|No attributed|application\/ld\+json/);
  assert.match(header(null, [reference]), /External Reputation Snapshots/);
  assert.equal(google(null), '');
  assert.equal((html.match(/<h3\b/g) ?? []).length, 1);
});

// Public fields from the stored movesafe-relocation record, read 2026-09-22.
const bbb: PublicScrapeData = {
  confidence: 'public', bbb_rating: 'B-', bbb_review_count: null, bbb_accredited: false,
  bbb_profile_url: 'https://www.bbb.org/us/fl/lake-worth/profile/moving-brokers/movesafe-relocation-0633-92032708',
  sources: { bbb: { status: 'ok', method: 'public_scrape' } },
  last_scraped_at: '2026-08-06T18:15:31.156Z',
  trustpilot_rating: null, trustpilot_review_count: null, yelp_rating: null, yelp_review_count: null,
};
test('confirmed BBB evidence remains visible independently of Google', () => {
  const html = renderToStaticMarkup(React.createElement(BbbPublicDetail, { data: bbb }));
  assert.match(html, /B-/);
  assert.match(html, /View BBB profile/);
  assert.match(html, /Aug 6, 2026/);
  assert.doesNotMatch(html, /application\/ld\+json/);
  assert.equal(google(null), '');
});

test('external evidence never becomes directory AggregateRating or Review schema', () => {
  const schema = buildCompanyDirectorySchemaGraph({ ...seedCompanies[0], googleData: snapshot, publicScrapeData: bbb });
  const visit = (value: unknown): void => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) return value.forEach(visit);
    const node = value as Record<string, unknown>;
    assert.ok(!('aggregateRating' in node) && !('review' in node));
    assert.ok(!['AggregateRating', 'Review'].includes(String(node['@type'])));
    Object.values(node).forEach(visit);
  };
  visit(schema);
});

test('both route families use the evidence-aware header and community remains separate', () => {
  const company = fs.readFileSync(path.join(root, 'app/(move)/companies/[slug]/page.tsx'), 'utf8');
  const auto = fs.readFileSync(path.join(root, 'app/(move)/auto-transport/[slug]/page.tsx'), 'utf8');
  assert.match(company, /<ExternalReputationHeader googleData=\{googlePlaces\} reviews=\{reviews\}/);
  assert.match(auto, /<ExternalReputationHeader googleData=\{company.googleData\}/);
  assert.match(company, /<AttributedReviewsPanel[\s\S]*?\/>\s*\{\/\*[^}]*\*\/\}\s*<LegacyCompanyUserReviews/);
  const communityRoute = fs.readFileSync(path.join(root, 'app/(move)/company/[slug]/page.tsx'), 'utf8');
  assert.doesNotMatch(communityRoute, /GoogleReviewsSection|ExternalReputationHeader|AttributedReviewsPanel/);
});

test('public profile code cannot describe stored external evidence as live', () => {
  const dirs = ['components/company', 'components/verification', 'components/reviews', 'components/trust',
    'app/(move)/companies', 'app/(move)/auto-transport', 'app/(move)/company'];
  for (const dir of dirs) {
    for (const rel of fs.readdirSync(path.join(root, dir), { recursive: true }) as string[]) {
      if (!/\.tsx?$/.test(rel) || /\.test\./.test(rel)) continue;
      const source = fs.readFileSync(path.join(root, dir, rel), 'utf8');
      assert.doesNotMatch(source, /live Google rating|live snapshot|live third.party/i, `${dir}/${rel}`);
    }
  }
});
