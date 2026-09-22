import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildAggregateRatingSchema } from '@/lib/reviews/aggregate-rating';
import type { PublicReview } from '@/lib/reviews/queries';

// MOVE-PROFILE-V3-001E regression coverage: /company/[slug] must never emit a
// schema.org AggregateRating, at any review count, while individual Review
// nodes and valid entity structured data must be preserved.

function makeReview(overrides: Partial<PublicReview> = {}): PublicReview {
  return {
    id: overrides.id ?? 'rev-1',
    company_id: 'company-1',
    reviewer_name: overrides.reviewer_name ?? 'Jane Doe',
    rating: overrides.rating ?? 5,
    title: overrides.title ?? null,
    content: overrides.content ?? 'Great move, on time and careful with our stuff.',
    photo_urls: overrides.photo_urls ?? [],
    move_date: overrides.move_date ?? null,
    created_at: overrides.created_at ?? '2026-01-15T00:00:00.000Z',
    owner_response: overrides.owner_response ?? null,
    owner_response_at: overrides.owner_response_at ?? null,
    dispute_status: overrides.dispute_status ?? null,
    ...overrides,
  };
}

function baseParams(reviews: PublicReview[], avgRating: number) {
  return {
    companyName: 'Acme Moving LLC',
    slug: 'acme-moving-llc',
    avgRating,
    reviewCount: reviews.length,
    reviews,
    address: '123 Main St',
    city: 'Boise',
    state: 'ID',
    zip: '83702',
    phone: '2085551234',
    website: 'https://acmemoving.example.com',
  };
}

function findBusinessNode(graph: Record<string, unknown>[]) {
  return graph.find(
    (node) => Array.isArray(node['@type']) && (node['@type'] as string[]).includes('LocalBusiness')
  ) as Record<string, unknown> | undefined;
}

test('one community review does NOT produce AggregateRating', () => {
  const reviews = [makeReview({ id: 'r1', rating: 5 })];
  const schema = buildAggregateRatingSchema(baseParams(reviews, 5));
  const business = findBusinessNode(schema['@graph']);

  assert.ok(business, 'expected a LocalBusiness node in the graph');
  assert.equal(business!.aggregateRating, undefined);
  assert.equal(JSON.stringify(schema).includes('AggregateRating'), false);
});

test('multiple community reviews also do NOT produce AggregateRating', () => {
  const reviews = [
    makeReview({ id: 'r1', rating: 5 }),
    makeReview({ id: 'r2', rating: 4 }),
    makeReview({ id: 'r3', rating: 3 }),
    makeReview({ id: 'r4', rating: 5 }),
    makeReview({ id: 'r5', rating: 2 }),
    makeReview({ id: 'r6', rating: 5 }),
  ];
  const schema = buildAggregateRatingSchema(baseParams(reviews, 4.0));
  const business = findBusinessNode(schema['@graph']);

  assert.ok(business, 'expected a LocalBusiness node in the graph');
  assert.equal(business!.aggregateRating, undefined);
  assert.equal(JSON.stringify(schema).includes('AggregateRating'), false);
});

test('zero reviews still does not produce AggregateRating (fail-closed, no invented threshold)', () => {
  const schema = buildAggregateRatingSchema(baseParams([], 0));
  const business = findBusinessNode(schema['@graph']);

  assert.ok(business);
  assert.equal(business!.aggregateRating, undefined);
  assert.equal(business!.review, undefined);
});

test('individual reviewer ratings remain intact in nested Review nodes', () => {
  const reviews = [
    makeReview({ id: 'r1', rating: 5, reviewer_name: 'Jane Doe' }),
    makeReview({ id: 'r2', rating: 2, reviewer_name: 'Sam Smith' }),
  ];
  const schema = buildAggregateRatingSchema(baseParams(reviews, 3.5));
  const business = findBusinessNode(schema['@graph']);
  const nested = business!.review as Record<string, unknown>[];

  assert.equal(nested.length, 2);
  assert.equal((nested[0].reviewRating as Record<string, unknown>).ratingValue, '5');
  assert.equal((nested[0].author as Record<string, unknown>).name, 'Jane Doe');
  assert.equal((nested[1].reviewRating as Record<string, unknown>).ratingValue, '2');
  assert.equal((nested[1].author as Record<string, unknown>).name, 'Sam Smith');
});

test('review counts in nested/standalone Review nodes match input review count (capped at 5)', () => {
  const reviews = Array.from({ length: 7 }, (_, i) =>
    makeReview({ id: `r${i}`, rating: 5, content: `Review body number ${i}` })
  );
  const schema = buildAggregateRatingSchema(baseParams(reviews, 5));
  const business = findBusinessNode(schema['@graph']);
  const nested = business!.review as Record<string, unknown>[];

  // buildAggregateRatingSchema caps nested reviews at 5 by design (unrelated to
  // the aggregate-rating fix) — confirm that cap still holds and reflects
  // truthfully in the standalone per-review graph nodes.
  assert.equal(nested.length, 5);
  const standaloneReviewNodes = schema['@graph'].filter((n) => n['@type'] === 'Review');
  assert.equal(standaloneReviewNodes.length, 5);
});

test('no external rating source can leak into the schema — only local PublicReview fields are used', () => {
  const reviews = [makeReview({ id: 'r1', rating: 5 })];
  const schema = buildAggregateRatingSchema(baseParams(reviews, 5));
  const serialized = JSON.stringify(schema);

  for (const externalMarker of ['Google', 'BBB', 'Yelp', 'externalReview', 'google_rating']) {
    assert.equal(
      serialized.includes(externalMarker),
      false,
      `unexpected external source marker leaked into schema: ${externalMarker}`
    );
  }
});

test('valid Organization/LocalBusiness/WebPage entity structured data remains present', () => {
  const reviews = [makeReview({ id: 'r1', rating: 5 })];
  const schema = buildAggregateRatingSchema(baseParams(reviews, 5));

  assert.equal(schema['@context'], 'https://schema.org');
  const types = schema['@graph'].map((n) =>
    Array.isArray(n['@type']) ? n['@type'].join(',') : n['@type']
  );
  assert.ok(types.includes('Organization'));
  assert.ok(types.includes('WebPage'));
  assert.ok(types.some((t) => String(t).includes('LocalBusiness')));

  const business = findBusinessNode(schema['@graph']);
  assert.equal(business!.name, 'Acme Moving LLC');
  assert.ok((business!.address as Record<string, unknown>)?.addressLocality === 'Boise');
});

test('no site-level aggregate star score renders — no ratingValue/bestRating/worstRating outside nested Review nodes', () => {
  const reviews = [makeReview({ id: 'r1', rating: 5 })];
  const schema = buildAggregateRatingSchema(baseParams(reviews, 5));
  const business = findBusinessNode(schema['@graph']);

  assert.equal('ratingValue' in business!, false);
  assert.equal('bestRating' in business!, false);
  assert.equal('worstRating' in business!, false);
  assert.equal('ratingCount' in business!, false);
});
