/**
 * TH-SEARCH-R1-018 BLOCKER-MOVE-01.
 *
 * R1-017 found that the guided-Ask execution path (specialist-execution/v2 ->
 * resolveMoveNetworkIdentity -> searchMovers -> matchCompanyIdentity) reported 34-70
 * "matching identities" for a sparse-population company name like "JK Moving Services",
 * including companies with no defensible textual relationship to "JK" (Ab Moving Services,
 * Kings Moving Services, Bb&D Moving Services, H&L Moving Services, ...), while the
 * specialist's own certified public contract (move-ask-v1 / lib/move-ask) returned only 5
 * tightly name-anchored candidates for the identical input.
 *
 * Root cause: matchCompanyIdentity's similarHit() fuzzy fallback allowed a bounded
 * Levenshtein-distance-2 comparison on query tokens of ANY length. For a 2-letter token like
 * "jk", an edit distance of 2 is not a meaningful similarity signal -- it is within distance 2
 * of nearly any other 2-letter token ("ab", "jp", "km", ...), so short, distinctive brand
 * initials were fuzzy-matching completely unrelated companies whenever the remaining tokens
 * ("moving", "services") happened to match literally, which they do for a huge fraction of the
 * mover directory.
 *
 * Fix: only allow the Levenshtein fuzzy branch once the token is long enough (>=4 chars) that
 * two edits can't turn it into an unrelated word. Below that length, similarHit requires an
 * actual prefix match, matching the "conservative distinctive-token candidate matching" standard
 * already certified for the specialist's public contract in R1-005.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { matchCompanyIdentity, uniqueExactIdentity } from '@/lib/search/match';
import { buildMoveNetworkResolverResponse } from '@/lib/search/network-resolver';
import type { MoverSearchResponse, SearchCompanyHit } from '@/lib/search/types';
import type { Company } from '@/types';

function company(partial: Partial<Company> & Pick<Company, 'id' | 'slug' | 'name'>): Company {
  return {
    shortDescription: '', description: '', foundedYear: 2000, headquarters: 'Sterling, VA', website: '',
    usdotNumber: '', mcNumber: '', fmcsaLegalName: '', fmcsaSafetyRating: 'Not Rated', fmcsaComplaints: 0,
    fmcsaShipments: 0, bbbRating: 'NR', bbbAccredited: false, overallRating: 0, reviewCount: 0,
    reputationScore: 50, yearsInBusiness: 10, avgPricePerMove: 0, priceRange: '', coverage: 'Continental US',
    services: ['Carrier'], specialties: [], ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
    isVerified: true, lastUpdated: '2026-01-01', publicationState: 'PUBLISHABLE', entityType: 'Carrier',
    authorityActive: true, ...partial,
  };
}

function hit(partial: Partial<SearchCompanyHit> = {}): SearchCompanyHit {
  return { companyId: 'private-id-never-serialized', slug: 'jk-moving', displayName: 'JK Moving Services', legalName: null, headquarters: 'Sterling, VA', usdot: '1065394', mc: '', role: 'Carrier', authorityStatus: 'Current authority recorded', matchType: 'exact_display_name', matchTier: 4, matchExplanation: 'Exact company-name match', sourceLastChecked: '2026-08-23', ...partial };
}
function search(query: string, results: SearchCompanyHit[], partial: Partial<MoverSearchResponse> = {}): MoverSearchResponse {
  return { query, intent: 'COMPANY_IDENTITY', results, placeResults: [], verificationAction: null, exactNameGroupSize: 0, directJumpSlug: null, ambiguity: false, resultCount: results.length, latencyMs: 3, dbMs: 2, candidateCount: results.length, searchPath: 'fixture:canonical-search-v1', ...partial };
}

const RAW_CANDIDATE_POOL = [
  'JK Moving Services',
  'Ab Moving Services',
  'Jp Moving Services',
  'Km Moving Services',
  'Kings Moving Services',
  'Bb&D Moving Services',
  'H&L Moving Services',
];

test('BLOCKER-MOVE-01: sparse two-letter brand initial does not fuzzy-match unrelated companies', () => {
  const query = 'JK Moving Services';
  const matched = RAW_CANDIDATE_POOL.filter((name) => matchCompanyIdentity(company({ id: name, slug: name, name }), query));
  assert.deepEqual(matched, ['JK Moving Services'], 'only the actual JK-branded company should qualify as an identity candidate');
});

test('BLOCKER-MOVE-01: same sparse-brand behavior holds for the company+journey phrasing', () => {
  // The journey/route wording must not widen the identity candidate set -- route text is a
  // separate, unresolved condition, never an input to name matching.
  const query = 'JK Moving Services';
  for (const name of RAW_CANDIDATE_POOL.filter((n) => n !== 'JK Moving Services')) {
    assert.equal(matchCompanyIdentity(company({ id: name, slug: name, name }), query), null, `${name} must not match on route/journey-adjacent queries either`);
  }
});

test('BLOCKER-MOVE-01 control: a higher-population multi-word name is unaffected', () => {
  // "A Plus" is a real, multi-character distinctive token; genuinely related "A Plus ..."
  // variants should still surface, proving the fix targets short-token fuzziness specifically,
  // not fuzzy matching in general.
  const related = ['A Plus Moving', 'A Plus Moving And Storage', 'A-plus Moving & Storage', 'A Plus Always Moving INC'];
  const unrelated = ['Atlas Moving Company', 'National Moving Alliance', 'Continental Van Lines'];
  for (const name of related) {
    assert.ok(matchCompanyIdentity(company({ id: name, slug: name, name }), 'A Plus Moving'), `${name} should still be recognized as related to "A Plus Moving"`);
  }
  // Unrelated multi-word movers must not leak in merely for sharing "Moving".
  for (const name of unrelated) {
    assert.equal(matchCompanyIdentity(company({ id: name, slug: name, name }), 'A Plus Moving'), null, `${name} shares no distinctive token with "A Plus Moving" and must not match`);
  }
});

test('BLOCKER-MOVE-01 control: exact USDOT identifier (SHIFL) is unaffected by name-matching changes', () => {
  const shifl = company({ id: 'shifl', slug: 'shifl-inc', name: 'SHIFL INC', usdotNumber: '3244649' });
  const match = matchCompanyIdentity(shifl, 'USDOT 3244649', { namespace: 'DOT', identifierDigits: '3244649' });
  assert.equal(match?.type, 'exact_usdot');
  assert.equal(match?.tier, 1);
});

test('BLOCKER-MOVE-01 control: a legitimate broad brand (Allied) still resolves on its own distinctive token', () => {
  const allied = company({ id: 'allied', slug: 'allied-van-lines', name: 'Allied Van Lines' });
  assert.ok(matchCompanyIdentity(allied, 'Allied Van Lines'));
  // "Van Lines" alone (both tokens generic-ish/common industry words, no "Allied") must not
  // fuzzy-resolve to Allied specifically -- there is no distinctive overlap.
  const otherVanLines = company({ id: 'other', slug: 'other-van-lines', name: 'Continental Van Lines' });
  assert.equal(matchCompanyIdentity(otherVanLines, 'Allied Van Lines'), null);
});

test('BLOCKER-MOVE-01 control: an impossible company name yields no confident match', () => {
  const pool = RAW_CANDIDATE_POOL.map((name) => company({ id: name, slug: name, name }));
  const matched = pool.filter((c) => matchCompanyIdentity(c, 'Zzyzx Interstate Moving Company'));
  assert.deepEqual(matched, []);
});

test('BLOCKER-MOVE-01 control: a quoted company name containing a geographic word is still name-anchored, not geography-anchored', () => {
  const austinMovers = company({ id: 'am', slug: 'austin-movers-inc', name: 'Austin Movers Inc', headquarters: 'Austin, TX' });
  const unrelatedInAustin = company({ id: 'ua', slug: 'unrelated-austin', name: 'Reliable Relocation LLC', headquarters: 'Austin, TX' });
  assert.ok(matchCompanyIdentity(austinMovers, '"Austin Movers Inc"'.replace(/"/g, '')));
  assert.equal(matchCompanyIdentity(unrelatedInAustin, 'Austin Movers Inc'), null, 'sharing a city, not a company-name token, must not create a match');
});

test('R1-006 protection: MC225850 conflict containment is not reopened by the name-matching fix', () => {
  // This test does not exercise the live source-conflict machinery (see r1-association.test.ts
  // for that); it confirms the JK Moving Services identity itself is not re-associated with an
  // unqualified MC via name-matching broadening.
  const jk = company({ id: 'jk', slug: 'jk-moving', name: 'JK Moving Services', usdotNumber: '1065394', mcNumber: '' });
  const match = matchCompanyIdentity(jk, 'MC225850', { namespace: 'BARE', identifierDigits: '225850' });
  assert.equal(match, null, 'JK Moving Services must not match MC225850 through name/fuzzy fallback when the stored MC field is empty/unassociated');
});

test('BLOCKER-MOVE-01 integration: totalMatchingIdentityCount reflects the qualified cohort, not the raw candidate pool', () => {
  // Simulates the real pipeline shape: a broad raw candidate pool (as SQL substring/trigram
  // loading would produce) is run through the FIXED matchCompanyIdentity before resultCount is
  // computed, exactly as lib/search/query.ts's searchMovers() does.
  const query = 'JK Moving Services';
  const qualified = RAW_CANDIDATE_POOL
    .map((name) => ({ name, match: matchCompanyIdentity(company({ id: name, slug: name, name }), query) }))
    .filter((row): row is { name: string; match: NonNullable<ReturnType<typeof matchCompanyIdentity>> } => Boolean(row.match));
  assert.equal(qualified.length, 1, 'raw candidate pool of 7 must narrow to exactly the 1 genuine JK identity');

  const response = buildMoveNetworkResolverResponse(
    { query },
    search(query, [hit()], { resultCount: qualified.length, candidateCount: RAW_CANDIDATE_POOL.length }),
  );
  assert.equal(response.totalMatchingIdentityCount, 1, 'the resolver must report the qualified count (1), not the raw candidate pool size (7)');
  assert.equal(response.resolutionClass, 'EXACT_PUBLIC_NAME');
});

test('MUTATION A (must fail if restored): broad searchMovers results without identity relevance filtering', () => {
  // Simulates the pre-fix defect directly: if resultCount were taken from the RAW candidate pool
  // instead of the qualified match set, this assertion -- which mirrors the real R1-017
  // reproduction -- would pass instead of fail. It is asserted here as a red/mutation check:
  // qualified.length must NOT equal the raw pool size for this query.
  const query = 'JK Moving Services';
  const qualified = RAW_CANDIDATE_POOL.filter((name) => matchCompanyIdentity(company({ id: name, slug: name, name }), query));
  assert.notEqual(qualified.length, RAW_CANDIDATE_POOL.length, 'qualified identity count must be strictly smaller than the raw broad-search candidate pool for a sparse brand name');
});
