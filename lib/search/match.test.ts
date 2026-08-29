import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
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
