import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { STATEWIDE_ROUTES } from './statewide-routes';
import { PUBLISHED_STATEWIDE_SLUGS } from './published-state-path';

test('Montana Move route publishes PSC evidence without converting authority entries to companies', () => {
  const page = readFileSync('app/montana/page.tsx', 'utf8');
  const sitemap = readFileSync('app/sitemap.ts', 'utf8');
  assert.ok(STATEWIDE_ROUTES.includes('/montana'));
  assert.ok(PUBLISHED_STATEWIDE_SLUGS.includes('montana'));
  assert.match(sitemap, /route === '\/montana'/);
  assert.match(page, /3_5_26_INTRABOOK\.pdf/);
  assert.match(page, /60 authority entries/);
  assert.match(page, /NOT_ACQUIRED \/ NOT_RECONCILED/);
  assert.match(page, /not a distinct company/);
  assert.match(page, /FMCSA interstate authority/);
  assert.doesNotMatch(page, /AggregateRating|Trust Score|StateCountyLinks/);
});
