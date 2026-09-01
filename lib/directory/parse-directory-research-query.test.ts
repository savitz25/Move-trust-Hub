import assert from 'node:assert/strict';
import { test } from 'node:test';
import { directoryFiltersFromSearchParams } from '@/lib/directory/build-directory-api-query';
import { parseDirectoryResearchQuery } from '@/lib/directory/parse-directory-research-query';

test('fully structural Auto Transport queries consume category, role, and state', () => {
  const cases = [
    ['auto transport new york', undefined, 'NY'],
    ['auto transport carrier new york', 'Carrier', 'NY'],
    ['auto transport broker NY', 'Broker', 'NY'],
    ['auto transport carrier broker florida', 'Carrier / Broker', 'FL'],
    ['car shipping new jersey', undefined, 'NJ'],
    ['vehicle transport washington', undefined, 'WA'],
  ] as const;
  for (const [query, role, state] of cases) {
    const plan = parseDirectoryResearchQuery(query);
    assert.equal(plan.evidenceClass, 'Auto Transport', query);
    assert.equal(plan.role, role, query);
    assert.equal(plan.geography?.stateCode, state, query);
    assert.equal(plan.identityQuery, '', query);
    assert.equal(plan.locationIntent, 'RECORDED_HQ', query);
  }
});

test('service territory and route language never becomes recorded-HQ evidence', () => {
  for (const query of [
    'auto transport serving new york',
    'auto transport companies that serve ny',
    'car shipping to new york',
    'ship my car from florida to new york',
    'auto transport near me',
  ]) {
    const plan = parseDirectoryResearchQuery(query);
    assert.equal(plan.researchMode, true, query);
    assert.equal(plan.geography, undefined, query);
    assert.match(plan.locationIntent, /SERVICE_TERRITORY|ROUTE_OR_AVAILABILITY/, query);
  }
});

test('identity and identifier precedence protects accepted Search V1 behavior', () => {
  for (const query of ['SHIFL', 'TWO MEN AND A TRUCK', 'College Hunks', 'Colleg Hunks', 'unknown mover', 'New York Moving Company', 'Carrier Moving LLC', 'Florida Auto Transport LLC']) {
    const plan = parseDirectoryResearchQuery(query);
    assert.equal(plan.researchMode, false, query);
    assert.equal(plan.identityQuery, query, query);
  }
  const dot = parseDirectoryResearchQuery('USDOT 3244649');
  assert.equal(dot.identifierQuery, 'USDOT 3244649');
  assert.equal(dot.researchMode, false);
});

test('server filter contract uses identity residue, intersected services, recorded HQ, and neutral ordering', () => {
  const filters = directoryFiltersFromSearchParams({
    search: 'auto transport carrier new york',
    services: 'Auto Transport',
  });
  assert.equal(filters.search, '');
  assert.equal(filters.recordedHqState, 'NY');
  assert.deepEqual(filters.services, ['Auto Transport', 'Carrier']);
  assert.equal(filters.sort, 'relevance');
});

test('legacy Auto Transport URL and ordinary identity URL remain compatible', () => {
  const auto = directoryFiltersFromSearchParams({ services: 'Auto Transport' });
  assert.deepEqual(auto.services, ['Auto Transport']);
  const identity = directoryFiltersFromSearchParams({ search: 'SHIFL' });
  assert.equal(identity.search, 'SHIFL');
  assert.equal(identity.sort, 'relevance');
});
