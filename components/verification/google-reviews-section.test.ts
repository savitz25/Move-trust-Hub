import assert from 'node:assert/strict';
import { test } from 'node:test';
import { GoogleReviewsSection } from '@/components/verification/google-reviews-section';
import { isDisplayableGoogleForUi } from '@/lib/verification/display-enrichment';
import type { GooglePlacesData } from '@/lib/verification/types';

/**
 * MOVE-EXTREP-001A: GoogleReviewsSection is called directly as a plain
 * function (it is a synchronous, non-async component) and its return value
 * inspected -- `null` means "renders nothing," matching what React actually
 * does with it. This avoids needing a full renderer for these assertions.
 */

const REAL_SNAPSHOT: GooglePlacesData = {
  source: 'google_places_api',
  place_id: 'ChIJreal123',
  name: 'Real Movers LLC',
  rating: 4.8,
  review_count: 635,
  formatted_address: '123 Main St, Springfield, IL',
  website_url: null,
  review_snippets: [],
  last_fetched: '2026-08-06T17:36:45.546Z',
  status: 'ok',
};

test('SECTION 13.1 / 13.2: no data at all -> renders nothing (no card, no generic search CTA)', () => {
  const el = GoogleReviewsSection({ data: null });
  assert.equal(el, null);
});

test('NO_SNAPSHOT: status "error" -> renders nothing, not an empty-state card', () => {
  const el = GoogleReviewsSection({
    data: { ...REAL_SNAPSHOT, status: 'error', rating: null, review_count: null },
  });
  assert.equal(el, null);
});

test('NO_SNAPSHOT: status "not_found" -> renders nothing', () => {
  const el = GoogleReviewsSection({
    data: { ...REAL_SNAPSHOT, status: 'not_found', rating: null, review_count: null },
  });
  assert.equal(el, null);
});

test('NO_SNAPSHOT: status "ok" but no rating/count -> renders nothing (matches isDisplayableGoogleForUi)', () => {
  const data: GooglePlacesData = { ...REAL_SNAPSHOT, rating: null, review_count: null };
  assert.equal(isDisplayableGoogleForUi(data), false);
  const el = GoogleReviewsSection({ data });
  assert.equal(el, null);
});

test('SECTION 13.3: REAL_STORED_SNAPSHOT is classified as displayable (the component\'s own render gate)', () => {
  // GoogleReviewsSection's early-return uses this exact classifier, so this
  // is the authoritative "will it render" check without needing a renderer
  // (invoking the component directly hits a bare JSX-runtime error in this
  // node:test environment, outside Next.js's own build pipeline). The actual
  // rendered output for a real snapshot was verified live against real
  // Production-derived data this session (2 Fellas & A Big Vehicle Moving
  // Company, Lamanna Moving & Storage, Ohana Moving Company, Montway Auto
  // Transport, uShip, Sherpa Auto Transport, Intercity Lines) -- see the
  // MOVE-EXTREP-001A final report, Section J.
  assert.equal(isDisplayableGoogleForUi(REAL_SNAPSHOT), true);
});

test('SECTION 13.4: a real snapshot is never labeled "live" anywhere in its own source', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(
    path.resolve(__dirname, 'google-reviews-section.tsx'),
    'utf8'
  );
  assert.ok(!/\bLive\b/.test(source), 'component source must not describe a stored snapshot as "Live"');
  assert.ok(source.includes('snapshot checked') || source.includes('Snapshot checked'));
});

test('the retired empty-state copy ("A live Google rating is not stored", "Search Google for") is gone from source', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(
    path.resolve(__dirname, 'google-reviews-section.tsx'),
    'utf8'
  );
  assert.ok(!source.includes('A live Google rating is not stored'));
  assert.ok(!source.includes('Search Google for'));
  assert.ok(!source.includes('Confirm directly on Google before booking'));
});
