import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fingerprintMoveHomePayload } from '../lib/intelligence/home-fingerprint';
import { assembleMoveHomePayload } from '../lib/intelligence/home-assemble';
import { buildMoveHomeSiteCoverage } from '../lib/intelligence/home-site-coverage';
import { MOVE_HOME_H1, MOVE_HOME_INTEL_VERSION } from '../lib/intelligence/home-types';
import { classifySearchQuery } from '../lib/search/classify-intent';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf8');

const LOCKED_FINGERPRINT = '3f2d144f65d5ab20bd57a1536eabf44825f18f4c8501130913c0a98a7787726e';

const intelFiles = [
  'lib/intelligence/home-assemble.ts',
  'lib/intelligence/home-snapshot.ts',
  'lib/intelligence/home-types.ts',
  'lib/intelligence/home-fingerprint.ts',
];

for (const file of intelFiles) {
  const src = read(file);
  assert.doesNotMatch(src, /directory_search_suggestions/);
  assert.doesNotMatch(src, /mover-omnibox/);
}

assert.equal(MOVE_HOME_INTEL_VERSION, 'move-home-intel-v1');
assert.equal(MOVE_HOME_H1, 'Understand the moving market before you book.');

const hero = read('components/home/home-intel-hero.tsx');
assert.match(hero, /HomeMoverSearch/);
assert.match(hero, /Explore Moving Intelligence/);
assert.match(hero, /Plan your move/);
assert.equal((hero.match(/<h1\b/g) ?? []).length, 1);

const omnibox = read('components/search/mover-omnibox.tsx');
assert.match(omnibox, /role="combobox"/);
assert.match(omnibox, /aria-expanded/);
assert.match(omnibox, /role="listbox"/);
assert.match(omnibox, /AbortController/);
assert.doesNotMatch(omnibox, /reputationScore|Trust Score|Google Places/);
assert.match(omnibox, /Search all matching companies/);
assert.match(omnibox, /payload\.results\.length > 0/);

const api = read('app/api/search/movers/route.ts');
assert.match(api, /searchMovers/);
assert.doesNotMatch(api, /reputation_score/);
assert.doesNotMatch(api, /places\.googleapis/);

const sql = read('supabase/migrations/20260829180000_move_search_001_suggestions.sql');
assert.match(sql, /directory_search_suggestions/);
assert.match(sql, /pg_trgm/);
assert.match(sql, /PUBLISHABLE/);
assert.doesNotMatch(sql, /REVIEW_REQUIRED/);
assert.match(sql, /GRANT EXECUTE/);

const scoring = read('lib/directory/query-db-directory-page.ts');
assert.doesNotMatch(scoring, /reputationScore - a.company.reputationScore/);
assert.match(scoring, /compareIdentityCompanies/);

const query = read('lib/search/query.ts');
assert.match(query, /countExactPublicDisplayName/);
assert.match(query, /exactNameCensus/);
assert.doesNotMatch(query, /matched.filter\(\s*\(row\) => normalizeSearchText\(row.company.name\) === exactName/);

const matchSrc = read('lib/search/match.ts');
assert.match(matchSrc, /textualIdentityScore/);
assert.match(matchSrc, /SEARCH_STOPWORDS/);
assert.match(matchSrc, /bMatch.textScore !== aMatch.textScore/);
assert.doesNotMatch(matchSrc, /reputationScore/);
assert.doesNotMatch(matchSrc, /overallRating|reviewCount|fmcsaComplaints/);

const countSql = read('supabase/migrations/20260829193000_move_search_001b_exact_name_count.sql');
assert.match(countSql, /directory_exact_display_name_count/);
assert.match(countSql, /PUBLISHABLE/);
assert.match(countSql, /SECURITY INVOKER/);

assert.equal(classifySearchQuery('DOT 3244649').identifier?.namespace, 'DOT');
assert.equal(classifySearchQuery('MC 1019808').identifier?.namespace, 'MC');
assert.equal(classifySearchQuery('1019808').identifier?.namespace, 'BARE');
assert.equal(classifySearchQuery('Miami, FL').intent, 'PLACE');
assert.equal(classifySearchQuery('SHIFL').intent, 'COMPANY_IDENTITY');

const florida = read('app/(move)/florida/page.tsx') + read('lib/intelligence/florida-snapshot.ts');
assert.match(florida, /force-dynamic|await /);

const payload = assembleMoveHomePayload({
  generatedAt: '2026-08-28T12:00:00.000Z',
  timedOut: false,
  asOf: '2026-08-27T00:00:00.000Z',
  publishableProfiles: 100,
  entityClasses: [
    { class: 'Carrier', count: 70 },
    { class: 'Broker', count: 10 },
    { class: 'Carrier/Broker', count: 15 },
    { class: 'Unknown', count: 5 },
  ],
  authority: { active: 80, notCurrent: 12, unknown: 8, total: 100 },
  fmcsaClock: {
    latestObservedRefresh: '2026-08-27T00:00:00.000Z',
    oldestObservedRefresh: '2026-08-20T00:00:00.000Z',
    withRefreshDate: 90,
    withoutRefreshDate: 10,
    total: 100,
    buckets: [
      { id: '0-30', label: '0–30 days since last recorded refresh', count: 90 },
      { id: '31-60', label: '31–60 days', count: 0 },
      { id: '61-90', label: '61–90 days', count: 0 },
      { id: '91-365', label: '91–365 days', count: 0 },
      { id: '>365', label: 'More than 365 days', count: 0 },
      { id: 'unknown', label: 'No refresh date recorded', count: 10 },
    ],
  },
  siteCoverage: buildMoveHomeSiteCoverage(),
});
assert.equal(fingerprintMoveHomePayload(payload), payload.canonicalFingerprint);
assert.notEqual(payload.canonicalFingerprint, LOCKED_FINGERPRINT, 'sample payload is not the live census');

console.log('check:move-search-001 source contracts PASS');
console.log(`locked live fingerprint to preserve: ${LOCKED_FINGERPRINT}`);
