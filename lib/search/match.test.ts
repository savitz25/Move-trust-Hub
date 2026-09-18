import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  applyLocationFilter,
  compareIdentityCompanies,
  matchCompanyIdentity,
  uniqueExactIdentity,
} from '@/lib/search/match';
import type { Company } from '@/types';

function company(partial: Partial<Company> & Pick<Company, 'id' | 'slug' | 'name'>): Company {
  return {
    shortDescription: '',
    description: '',
    foundedYear: 2000,
    headquarters: 'Dallas, TX',
    website: '',
    usdotNumber: '',
    mcNumber: '',
    fmcsaLegalName: '',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    bbbRating: 'NR',
    bbbAccredited: false,
    overallRating: 0,
    reviewCount: 0,
    reputationScore: 99,
    yearsInBusiness: 10,
    avgPricePerMove: 0,
    priceRange: '',
    coverage: 'Continental US',
    services: ['Carrier'],
    specialties: [],
    ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
    isVerified: true,
    lastUpdated: '2026-01-01',
    publicationState: 'PUBLISHABLE',
    entityType: 'Carrier',
    authorityActive: true,
    ...partial,
  };
}

test('exact USDOT / MC / name / legal name tiers', () => {
  const shifl = company({
    id: 'usdot-3244649',
    slug: 'shifl-inc',
    name: 'SHIFL INC',
    fmcsaLegalName: 'SHIFL INC',
    usdotNumber: '3244649',
    mcNumber: '1019808',
    reputationScore: 10,
  });
  assert.equal(matchCompanyIdentity(shifl, 'DOT 3244649', { namespace: 'DOT', identifierDigits: '3244649' })?.tier, 1);
  assert.equal(matchCompanyIdentity(shifl, 'MC 1019808', { namespace: 'MC', identifierDigits: '1019808' })?.tier, 2);
  assert.equal(matchCompanyIdentity(shifl, '1019808', { namespace: 'BARE', identifierDigits: '1019808' })?.type, 'exact_mc');
  assert.equal(matchCompanyIdentity(shifl, 'SHIFL INC')?.type, 'exact_display_name');
});

test('duplicate brand never unique-jumps', () => {
  const a = company({ id: 'a', slug: 'tm-a', name: 'TWO MEN AND A TRUCK', usdotNumber: '1', reputationScore: 99 });
  const b = company({ id: 'b', slug: 'tm-b', name: 'TWO MEN AND A TRUCK', usdotNumber: '2', reputationScore: 1 });
  const matches = [
    { company: a, match: matchCompanyIdentity(a, 'TWO MEN AND A TRUCK')! },
    { company: b, match: matchCompanyIdentity(b, 'TWO MEN AND A TRUCK')! },
  ];
  assert.equal(uniqueExactIdentity(matches), null);
});

test('neutral tie-break ignores reputation', () => {
  const high = company({
    id: 'z',
    slug: 'z',
    name: 'TWO MEN AND A TRUCK',
    headquarters: 'Zanesville, OH',
    usdotNumber: '999',
    reputationScore: 99,
  });
  const low = company({
    id: 'a',
    slug: 'a',
    name: 'TWO MEN AND A TRUCK',
    headquarters: 'Austin, TX',
    usdotNumber: '111',
    reputationScore: 1,
  });
  const mh = matchCompanyIdentity(high, 'TWO MEN AND A TRUCK')!;
  const ml = matchCompanyIdentity(low, 'TWO MEN AND A TRUCK')!;
  const cmp = compareIdentityCompanies(low, high, ml, mh);
  assert.ok(cmp < 0, 'Austin should sort before Zanesville, not by reputation');
});

test('missing-word Two Men Truck still matches', () => {
  const c = company({ id: 't', slug: 't', name: 'TWO MEN AND A TRUCK' });
  const match = matchCompanyIdentity(c, 'Two Men Truck');
  assert.ok(match);
  assert.ok((match?.tier ?? 99) <= 8);
});

test('typo Colleg Hunks matches College Hunks', () => {
  const c = company({ id: 'h', slug: 'h', name: 'College Hunks Hauling Junk' });
  const match = matchCompanyIdentity(c, 'Colleg Hunks');
  assert.ok(match);
});

test('Two Men Truck ranks TWO MEN AND A TRUCK ahead of Junk Truck', () => {
  const franchise = company({
    id: 'franchise',
    slug: 'franchise',
    name: 'TWO MEN AND A TRUCK',
    usdotNumber: '111',
    reputationScore: 1,
  });
  const junk = company({
    id: 'junk',
    slug: 'junk',
    name: 'Two Men And A Junk Truck',
    usdotNumber: '222',
    reputationScore: 99,
  });
  const mf = matchCompanyIdentity(franchise, 'Two Men Truck')!;
  const mj = matchCompanyIdentity(junk, 'Two Men Truck')!;
  assert.ok(mf && mj);
  assert.equal(mf.tier, mj.tier);
  assert.ok(mf.textScore > mj.textScore);
  assert.ok(compareIdentityCompanies(franchise, junk, mf, mj) < 0);
});

test('text score does not outrank exact USDOT', () => {
  const named = company({ id: 'n', slug: 'n', name: 'SHIFL INC', usdotNumber: '1', reputationScore: 99 });
  const exact = company({ id: 'e', slug: 'e', name: 'Other', usdotNumber: '3244649', reputationScore: 1 });
  const mn = matchCompanyIdentity(named, 'DOT 3244649', { namespace: 'DOT', identifierDigits: '3244649' });
  const me = matchCompanyIdentity(exact, 'DOT 3244649', { namespace: 'DOT', identifierDigits: '3244649' });
  assert.equal(me?.tier, 1);
  assert.notEqual(mn?.type, 'exact_usdot');
});

test('College Hunks / Colleg Hunks / Square Cow / Apple Moving stay identity matches', () => {
  const hunks = company({ id: 'h', slug: 'h', name: 'College Hunks Hauling Junk' });
  const cow = company({ id: 'c', slug: 'c', name: 'Square Cow Movers' });
  const apple = company({ id: 'a', slug: 'a', name: 'Apple Moving and Storage' });
  assert.ok(matchCompanyIdentity(hunks, 'College Hunks'));
  assert.ok(matchCompanyIdentity(hunks, 'Colleg Hunks'));
  assert.ok(matchCompanyIdentity(cow, 'Square Cow'));
  assert.ok(matchCompanyIdentity(apple, 'Apple Moving'));
});

test('HQ hint is not a service-territory claim', () => {
  const c = company({
    id: 'h',
    slug: 'h',
    name: 'TWO MEN AND A TRUCK',
    headquarters: 'Austin, TX',
  });
  const match = matchCompanyIdentity(c, 'TWO MEN AND A TRUCK', { locationHint: 'Austin, TX' });
  assert.ok(match);
  assert.notEqual(match?.explanation.toLowerCase().includes('serves'), true);
});

// TH-DISCOVERY-PARITY-001A DANGEROUS finding: "moving companies Denver" returned real
// Denver movers blended with a company literally NAMED "Denver Moving" but recorded
// headquartered in Plano, TX -- with no distinguishing label. applyLocationFilter is
// the extracted, directly-testable rule that must now reject this for a category query.
test('DANGEROUS regression: a company NAMED after the place but headquartered elsewhere is excluded for a category query', () => {
  const denverMoving = company({ id: 'dm', slug: 'denver-moving', name: 'Denver Moving', headquarters: 'Plano, TX' });
  // "moving Denver" reproduces a real classifySearchQuery split that scores a
  // NAME-TEXT match against this fixture (tier 8, not an exact identifier/name
  // match) -- the exact scenario the DANGEROUS finding described.
  const match = matchCompanyIdentity(denverMoving, 'moving Denver', { locationHint: 'Denver, CO' });
  assert.ok(match, 'precondition: the company must actually name-match, or this test proves nothing');
  assert.ok(match!.tier > 5, 'precondition: this must be a name-text match, not an exact identifier/name match');
  const filtered = applyLocationFilter(denverMoving, match!, { city: 'Denver', stateCode: 'CO' }, true);
  assert.equal(filtered, null, 'a Plano, TX company must not survive a Denver, CO category search');
});

test('a genuine local company with recorded HQ in the requested city survives and is labeled as a real match', () => {
  const realDenverMover = company({ id: 'rd', slug: 'real-denver-movers', name: 'Denver Movers Inc', headquarters: 'Denver, CO' });
  const match = matchCompanyIdentity(realDenverMover, 'moving Denver', { locationHint: 'Denver, CO' });
  assert.ok(match);
  const filtered = applyLocationFilter(realDenverMover, match!, { city: 'Denver', stateCode: 'CO' }, true);
  assert.ok(filtered);
  assert.match(filtered!.explanation, /headquarters identity hint/);
});

test('a genuine brand-name identity search (categoryOnly=false) keeps the previous lenient cross-city behavior', () => {
  const brand = company({ id: 'b', slug: 'two-men-plano', name: 'Two Men and a Truck', headquarters: 'Plano, TX' });
  const match = matchCompanyIdentity(brand, 'Two Men and a Truck', { locationHint: 'Denver, CO' });
  assert.ok(match);
  const filtered = applyLocationFilter(brand, match!, { city: 'Denver', stateCode: 'CO' }, false);
  assert.ok(filtered, 'naming a specific brand should still find it even if HQ is elsewhere');
});

// TH-DISCOVERY-PARITY-001A-REVIEW: Vercel finding on PR #152 -- applyLocationFilter's
// city-inclusion branch ignored the requested STATE, so a same-named city in a
// DIFFERENT state (Portland, ME vs. Portland, OR) could survive as an authoritative
// "headquarters identity hint" local match. A local match now requires BOTH city AND
// state agreement.
test('DANGEROUS-class regression: same-named city in the WRONG STATE is excluded from the local cohort for a category query', () => {
  const portlandMaine = company({ id: 'pm', slug: 'portland-movers-me', name: 'Portland Movers', headquarters: 'Portland, ME' });
  const match = matchCompanyIdentity(portlandMaine, 'movers Portland', { locationHint: 'Portland, OR' });
  assert.ok(match, 'precondition: the company must actually name-match');
  assert.ok(match!.tier > 5, 'precondition: this must be a name-text match, not an exact identifier/name match');
  const filtered = applyLocationFilter(portlandMaine, match!, { city: 'Portland', stateCode: 'OR' }, true);
  assert.equal(filtered, null, 'a Portland, ME company must not survive a Portland, OR category search');
});

test('same-named city in the right state is correctly labeled as the local match', () => {
  const portlandOregon = company({ id: 'po', slug: 'portland-movers-or', name: 'Portland Movers', headquarters: 'Portland, OR' });
  const match = matchCompanyIdentity(portlandOregon, 'movers Portland', { locationHint: 'Portland, OR' });
  assert.ok(match);
  const filtered = applyLocationFilter(portlandOregon, match!, { city: 'Portland', stateCode: 'OR' }, true);
  assert.ok(filtered);
  assert.match(filtered!.explanation, /headquarters identity hint/);
});

test('same-named city, wrong state, genuine brand-name search (categoryOnly=false): still findable, but never mislabeled as a local match', () => {
  const brandInMaine = company({ id: 'bm', slug: 'brand-portland-me', name: 'Acme Movers Co', headquarters: 'Portland, ME' });
  const match = matchCompanyIdentity(brandInMaine, 'Acme Movers Co', { locationHint: 'Portland, OR' });
  assert.ok(match);
  const filtered = applyLocationFilter(brandInMaine, match!, { city: 'Portland', stateCode: 'OR' }, false);
  assert.ok(filtered, 'a genuine brand-name search should still surface the company even if HQ is in a same-named city elsewhere');
  assert.doesNotMatch(filtered!.explanation, /headquarters identity hint/, 'must never be labeled as if it were the confirmed local match');
});
