import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateCountyIndexabilityFromResult } from '@/lib/local-movers/county-indexability';
import { getMoversForCounty } from '@/lib/local-movers/index';
import { seedMoverCountsForCounty } from '@/lib/local-movers/seed-county-coverage';
import {
  canonicalEvidenceCompanyIds,
  evidenceRowMatchesCompany,
} from '@/lib/local-movers/evidence-company-ids';
import { resolveHeadquartersCounty } from '@/lib/local-movers/resolve-headquarters-county';
import type { LocalMover } from '@/lib/local-movers/types';

test('a resolved Tampa ZIP drops the Duval seed slot; an unresolved street does not', () => {
  const duval = getMoversForCounty('florida', 'duval');
  assert.ok(duval);
  const mover = duval!.movers.find((item) => item.id === 'directory-flex-moving');
  assert.ok(mover);
  assert.equal(seedMoverCountsForCounty(duval!.county, mover!), true);
  assert.equal(
    seedMoverCountsForCounty(duval!.county, {
      ...mover!,
      headquartersAddress: '5815 Memorial Hwy Ste B, Tampa, FL 33615',
    }),
    false
  );
});

test('ZIP resolves headquarters counties the city-seat list misses', () => {
  assert.equal(
    resolveHeadquartersCounty('Sunnyvale, CA 94086').countySlug,
    'santa-clara'
  );
  assert.equal(resolveHeadquartersCounty('Hayward, CA 94541').countySlug, 'alameda');
  assert.equal(
    resolveHeadquartersCounty('Myrtle Beach, SC 29577').countySlug,
    'horry'
  );
  assert.equal(
    resolveHeadquartersCounty('Plant City, FL 33566').countySlug,
    'hillsborough'
  );
  assert.equal(
    resolveHeadquartersCounty('Evesham Township, NJ 08053').countySlug,
    'burlington'
  );
  assert.equal(resolveHeadquartersCounty('Somewhere, ZZ').countyResolved, false);
});

test('one qualifying mover can index and zero stays noindex', () => {
  const local: LocalMover = {
    id: 'directory-local',
    name: 'Local Mover',
    profileSlug: 'local-mover',
    listingSource: 'directory',
    profilePublished: true,
    rating: 4.8,
    reviewCount: 20,
    shortDescription: '',
    services: ['Local Mover'],
    city: 'Houston',
    headquartersState: 'TX',
    isLocalOnly: true,
  };
  const one = evaluateCountyIndexabilityFromResult('texas', 'harris', {
    county: {
      slug: 'harris',
      name: 'Harris',
      stateCode: 'TX',
      stateSlug: 'texas',
    },
    movers: [local],
    isRegionalFallback: false,
  });
  assert.notEqual(one.reason, 'insufficient_local_or_licensed_movers');
  assert.notEqual(one.reason, 'no_qualifying_publishable_movers');
  assert.equal(one.tier, 'index');

  const none = evaluateCountyIndexabilityFromResult('texas', 'harris', {
    county: {
      slug: 'harris',
      name: 'Harris',
      stateCode: 'TX',
      stateSlug: 'texas',
    },
    movers: [],
    isRegionalFallback: false,
  });
  assert.equal(none.tier, 'noindex');
  assert.equal(none.reason, 'no_qualifying_publishable_movers');
});

test('evidence lookups use companies.id when the assignment key is a slug', () => {
  const company = { id: 'fl-im-1426', slug: 'a1ace-movers-inc' };
  const ids = canonicalEvidenceCompanyIds([
    company,
    { id: 'a1ace-movers-inc', slug: 'a1ace-movers-inc' },
  ]);
  assert.deepEqual(ids, ['fl-im-1426', 'a1ace-movers-inc']);
  assert.equal(ids[0], company.id);
  assert.equal(evidenceRowMatchesCompany('fl-im-1426', company), true);
  assert.equal(evidenceRowMatchesCompany('a1ace-movers-inc', company), true);
  assert.equal(evidenceRowMatchesCompany('other-row', company), false);
  const queried = canonicalEvidenceCompanyIds([company]);
  assert.equal(queried.includes('a1ace-movers-inc'), false);
  assert.equal(queried.includes('fl-im-1426'), true);
});
