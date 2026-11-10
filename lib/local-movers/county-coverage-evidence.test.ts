import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { isCountyAdjacent } from '@/lib/local-movers/county-adjacency';
import {
  BLANKET_SELF_SELECTED_COUNTY_THRESHOLD,
  countyAssignmentCountsAsCoverage,
  seedSlotCountsAsCoverage,
  type CountyCoverageFacts,
} from '@/lib/local-movers/county-coverage-evidence';
import { isPublishableCountyCompany } from '@/lib/local-movers/county-publication';
import { getMoversForCounty, seedCountiesForMover } from '@/lib/local-movers/index';
import { seedMoverCountsForCounty } from '@/lib/local-movers/seed-county-coverage';
import type { LocalMover } from '@/lib/local-movers/types';

const root = dirname(fileURLToPath(import.meta.url));

function owner(overrides: Partial<CountyCoverageFacts> = {}): CountyCoverageFacts {
  return {
    source: 'local_intrastate_selection',
    ownerSelectedCountyCountInState: 4,
    headquartersKnown: true,
    headquartersCounty: false,
    adjacentToHeadquarters: true,
    serviceAreaForCounty: false,
    discoveryForCounty: false,
    stateLevelEvidence: false,
    ...overrides,
  };
}

test('blanket threshold is the 50-county signal', () => {
  assert.equal(BLANKET_SELF_SELECTED_COUNTY_THRESHOLD, 50);
});

test('owner selections count only with headquarters, adjacency, or stronger evidence', () => {
  assert.equal(countyAssignmentCountsAsCoverage(owner()).counts, true);
  assert.equal(
    countyAssignmentCountsAsCoverage(owner({ headquartersCounty: true, adjacentToHeadquarters: false }))
      .reason,
    'headquarters_county'
  );

  const duval = owner({
    ownerSelectedCountyCountInState: 8,
    adjacentToHeadquarters: false,
  });
  assert.equal(countyAssignmentCountsAsCoverage(duval).counts, false);
  assert.equal(countyAssignmentCountsAsCoverage(duval).reason, 'not_adjacent_to_headquarters');

  assert.equal(
    countyAssignmentCountsAsCoverage(
      owner({
        ownerSelectedCountyCountInState: 6,
        adjacentToHeadquarters: false,
        stateLevelEvidence: true,
      })
    ).counts,
    true
  );

  const blanket = owner({
    ownerSelectedCountyCountInState: 50,
    adjacentToHeadquarters: true,
  });
  assert.equal(countyAssignmentCountsAsCoverage(blanket).counts, false);
  assert.equal(
    countyAssignmentCountsAsCoverage(
      owner({
        ownerSelectedCountyCountInState: 254,
        adjacentToHeadquarters: false,
        discoveryForCounty: true,
      })
    ).reason,
    'discovery'
  );
  assert.equal(
    countyAssignmentCountsAsCoverage(
      owner({
        ownerSelectedCountyCountInState: 159,
        serviceAreaForCounty: true,
        adjacentToHeadquarters: false,
      })
    ).counts,
    true
  );
  assert.equal(
    countyAssignmentCountsAsCoverage(
      owner({
        ownerSelectedCountyCountInState: 49,
        headquartersKnown: false,
        headquartersInState: true,
        adjacentToHeadquarters: false,
        headquartersCounty: false,
      })
    ).reason,
    'in_state_headquarters_unresolved'
  );
  assert.equal(
    countyAssignmentCountsAsCoverage(
      owner({
        ownerSelectedCountyCountInState: 8,
        headquartersKnown: false,
        headquartersInState: false,
        adjacentToHeadquarters: false,
        headquartersCounty: false,
      })
    ).counts,
    false
  );
  assert.equal(
    countyAssignmentCountsAsCoverage({
      source: 'onboarding_coverage',
      ownerSelectedCountyCountInState: 80,
      headquartersKnown: true,
      headquartersCounty: false,
      adjacentToHeadquarters: false,
      serviceAreaForCounty: false,
      discoveryForCounty: false,
      stateLevelEvidence: false,
    }).counts,
    true
  );
});

test('seed fills do not count without county evidence', () => {
  assert.equal(
    seedSlotCountsAsCoverage({
      countiesInState: 67,
      headquartersKnown: true,
      headquartersCounty: false,
      adjacentToHeadquarters: false,
    }).counts,
    false
  );
  assert.equal(
    seedSlotCountsAsCoverage({
      countiesInState: 67,
      headquartersKnown: true,
      headquartersCounty: true,
      adjacentToHeadquarters: false,
    }).counts,
    true
  );
  assert.equal(
    seedSlotCountsAsCoverage({
      countiesInState: 8,
      headquartersKnown: true,
      headquartersCounty: false,
      adjacentToHeadquarters: false,
    }).reason,
    'seed_not_adjacent_to_headquarters'
  );
  assert.equal(
    seedSlotCountsAsCoverage({
      countiesInState: 8,
      headquartersKnown: true,
      headquartersCounty: false,
      adjacentToHeadquarters: true,
    }).counts,
    true
  );
  assert.equal(
    seedSlotCountsAsCoverage({
      countiesInState: 8,
      headquartersKnown: false,
      headquartersCounty: false,
      adjacentToHeadquarters: false,
      headquartersInState: true,
    }).counts,
    true
  );
});

test('Duval is not adjacent to Hillsborough, and statewide seed slots stay off Duval', () => {
  assert.equal(isCountyAdjacent('florida', 'hillsborough', 'duval'), false);
  assert.equal(isCountyAdjacent('florida', 'hillsborough', 'pinellas'), true);
  assert.equal(isCountyAdjacent('florida', 'palm-beach', 'duval'), false);
  assert.equal(isCountyAdjacent('florida', 'broward', 'duval'), false);

  const duval = getMoversForCounty('florida', 'duval');
  assert.ok(duval);
  const listedIds = new Set(
    duval!.movers.filter((mover) => seedMoverCountsForCounty(duval!.county, mover)).map((mover) => mover.id)
  );
  for (const id of ['amerisafe-van-lines', 'american-van-lines']) {
    assert.equal(listedIds.has(id), false, id);
    assert.ok(seedCountiesForMover(id, 'florida').length >= 50, id);
  }
  // Catalog cards store a street and no ZIP, so the county is unresolved.
  // An unresolved in-state slot under 50 counties stays.
  for (const id of ['directory-brothers-ez-moving-of-tampa', 'directory-flex-moving']) {
    assert.equal(listedIds.has(id), true, id);
    const mover: LocalMover | undefined = duval!.movers.find((item) => item.id === id);
    assert.ok(mover);
    assert.equal(
      seedMoverCountsForCounty(duval!.county, {
        ...mover!,
        headquartersAddress: '1220 S Dale Mabry Hwy Ste 205, Tampa, FL 33629',
      }),
      false
    );
  }

  const palmBeach = getMoversForCounty('florida', 'palm-beach');
  assert.ok(palmBeach);
  const amerisafe = palmBeach!.movers.find((mover) => mover.id === 'amerisafe-van-lines');
  assert.ok(amerisafe);
  assert.equal(seedMoverCountsForCounty(palmBeach!.county, amerisafe!), true);

  const broward = getMoversForCounty('florida', 'broward');
  assert.ok(broward);
  const american = broward!.movers.find((mover) => mover.id === 'american-van-lines');
  assert.ok(american);
  assert.equal(seedMoverCountsForCounty(broward!.county, american!), true);
});

test('publication gate hides internal states and keeps legacy nulls', () => {
  for (const state of ['REVIEW_REQUIRED', 'INACTIVE', 'INGESTED', 'CLASSIFIED']) {
    assert.equal(isPublishableCountyCompany(state), false, state);
  }
  assert.equal(isPublishableCountyCompany('PUBLISHABLE'), true);
  assert.equal(isPublishableCountyCompany('INDEXABLE'), true);
  assert.equal(isPublishableCountyCompany(null), true);
  assert.equal(isPublishableCountyCompany(undefined), true);
});

test('county loader selects publication_state and does not select usdot_status', () => {
  const src = readFileSync(join(root, 'approved-county-movers.ts'), 'utf8');
  for (const name of ['COMPANY_MOVER_SELECT_FULL', 'COMPANY_MOVER_SELECT_CORE']) {
    const match = src.match(new RegExp(`${name} =\\s*'([^']+)'`));
    assert.ok(match, name);
    assert.match(match![1]!, /publication_state/);
    assert.equal(match![1]!.includes('usdot_status'), false);
  }
  assert.match(src, /approved-county-movers-all-v11-canonical-evidence/);
  assert.match(src, /approved-county-movers-one-v11/);
  assert.match(src, /canonicalEvidenceCompanyIds/);
  assert.match(src, /Publication gate: moversFromAssignments/);
  assert.match(src, /Publication gate: loadIntrastateCoverageForCounty/);
  assert.match(src, /Publication gate: loadIntrastateCoverageCounties/);
  assert.match(src, /Publication and coverage gate: loadAllApprovedMoversByCounty/);
});
