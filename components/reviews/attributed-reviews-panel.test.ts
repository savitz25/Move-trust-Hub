import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hasAttributableReviews } from '@/components/reviews/attributed-reviews-panel';
import type { Review } from '@/types';

function review(partial: Partial<Review>): Review {
  return {
    id: partial.id ?? 'r1',
    companyId: 'c1',
    author: partial.author ?? 'Jane Doe',
    rating: partial.rating ?? 5,
    date: partial.date ?? '2026-01-01',
    source: partial.source ?? 'Google',
    content: partial.content ?? 'Great move.',
    verified: partial.verified ?? true,
    ...partial,
  };
}

test('SECTION 13.6/13.7: no reviews at all -> no attributable references (section should be omitted)', () => {
  assert.equal(hasAttributableReviews([]), false);
});

test('reviews exist but none verified -> not attributable', () => {
  assert.equal(hasAttributableReviews([review({ verified: false })]), false);
});

test('reviews exist and verified but from a non-attributable source -> not attributable', () => {
  assert.equal(hasAttributableReviews([review({ source: 'Verified Customer' })]), false);
  assert.equal(hasAttributableReviews([review({ source: 'Yelp' })]), false);
});

test('SECTION 13.7: a genuine verified Google review -> attributable, panel should render', () => {
  assert.equal(hasAttributableReviews([review({ source: 'Google', verified: true })]), true);
});

test('mixed set: one real attributable review among several non-attributable ones -> true', () => {
  const reviews = [
    review({ id: 'r1', source: 'Verified Customer' }),
    review({ id: 'r2', source: 'Google', verified: false }),
    review({ id: 'r3', source: 'Google', verified: true }),
  ];
  assert.equal(hasAttributableReviews(reviews), true);
});

test('the retired always-render empty-state message is gone from source', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(
    path.resolve(__dirname, 'attributed-reviews-panel.tsx'),
    'utf8'
  );
  assert.ok(!source.includes('No attributed external review references on file'));
  assert.ok(source.includes('return null'), 'the panel must have an early-return-null path when empty');
});
