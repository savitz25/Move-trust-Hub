import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  COLLISION_HOLD_USDOTS,
  DUPLICATE_USDOT_REASON,
  EXACT_USDOT_REASON,
  FEDERAL_HHG_MATCH_CANDIDATE_SQL,
  MATCHER_SCOPE_EXCLUDED_NON_LEGACY_USDOT_SPINE,
  NAME_SIMILARITY_ONLY_REASON,
  NO_EXACT_USDOT_OR_MC_REASON,
  USDOT_MC_DISAGREE_REASON,
  assertFederalHhgMatchCandidateSql,
  federalHhgMatchCandidateSqlScopeIssue,
  isExactUsdotMatchCandidate,
  matchStagedToCompanies,
  type MatchCompany,
} from '@/lib/federal-hhg/match';

function spine(partial: Partial<MatchCompany> = {}): MatchCompany {
  return {
    id: 'usdot-4523001',
    usdotNumber: '4523001',
    mcNumber: '123456',
    name: 'Spine Carrier LLC',
    legacyDirectoryRow: false,
    publicationState: 'INGESTED',
    entityType: 'Carrier',
    ...partial,
  };
}

test('candidate SQL keeps non-legacy usdot spine in the exact-USDOT universe', () => {
  assert.equal(federalHhgMatchCandidateSqlScopeIssue(FEDERAL_HHG_MATCH_CANDIDATE_SQL), null);
  assert.doesNotThrow(() => assertFederalHhgMatchCandidateSql(FEDERAL_HHG_MATCH_CANDIDATE_SQL));
  assert.match(FEDERAL_HHG_MATCH_CANDIDATE_SQL, /legacy_directory_row/);
  assert.match(FEDERAL_HHG_MATCH_CANDIDATE_SQL, /publication_state/);
  assert.match(FEDERAL_HHG_MATCH_CANDIDATE_SQL, /entity_type/);
  assert.doesNotMatch(FEDERAL_HHG_MATCH_CANDIDATE_SQL, /\bwhere\b/i);
});

test('legacy_directory_row, usdot-% exclusion, publication_state, and entity_type are rejected filters', () => {
  const cases = [
    `SELECT id FROM public.companies WHERE legacy_directory_row = true`,
    `SELECT id FROM public.companies WHERE legacy_directory_row = false`,
    `SELECT id FROM public.companies WHERE id NOT LIKE 'usdot-%'`,
    `SELECT id FROM public.companies WHERE publication_state = 'PUBLISHABLE'`,
    `SELECT id FROM public.companies WHERE entity_type ILIKE '%carrier%'`,
  ];
  for (const sql of cases) {
    const issue = federalHhgMatchCandidateSqlScopeIssue(sql);
    assert.ok(issue, sql);
    assert.throws(
      () => assertFederalHhgMatchCandidateSql(sql),
      new RegExp(MATCHER_SCOPE_EXCLUDED_NON_LEGACY_USDOT_SPINE)
    );
  }
});

test('exact-USDOT candidacy ignores legacy flag, id prefix, publication_state, and entity_type', () => {
  assert.equal(isExactUsdotMatchCandidate(spine()), true);
  assert.equal(
    isExactUsdotMatchCandidate(
      spine({
        id: 'legacy-slug',
        legacyDirectoryRow: true,
        publicationState: 'PUBLISHABLE',
        entityType: 'Broker',
      })
    ),
    true
  );
  assert.equal(
    isExactUsdotMatchCandidate(
      spine({
        id: 'usdot-1',
        usdotNumber: null,
        legacyDirectoryRow: false,
        publicationState: 'PUBLISHABLE',
        entityType: 'Carrier',
      })
    ),
    false
  );
});

test('non-legacy usdot spine with literal USDOT equality is exact USDOT, not a non-match', () => {
  const match = matchStagedToCompanies(
    { usdot: 'USDOT 004523001', mc: 'MC-0123456', legalName: 'SPINE CARRIER LLC' },
    [spine({ usdotNumber: '4523001', mcNumber: 'MC123456' })]
  );
  assert.equal(match.disposition, 'MATCHED_EXISTING');
  assert.equal(match.companyId, 'usdot-4523001');
  assert.equal(match.reason, EXACT_USDOT_REASON);
  assert.notEqual(match.reason, NO_EXACT_USDOT_OR_MC_REASON);
});

test('exact USDOT wins over name similarity when a different legacy company shares the name', () => {
  const match = matchStagedToCompanies(
    { usdot: '4523001', mc: null, legalName: 'SPINE CARRIER LLC' },
    [
      {
        id: 'legacy-spine-carrier',
        usdotNumber: '111',
        mcNumber: '222',
        name: 'Spine Carrier',
        legacyDirectoryRow: true,
        publicationState: 'PUBLISHABLE',
        entityType: 'Carrier',
      },
      spine({ mcNumber: null, publicationState: 'INACTIVE', entityType: 'Broker' }),
    ]
  );
  assert.equal(match.reason, EXACT_USDOT_REASON);
  assert.equal(match.companyId, 'usdot-4523001');
  assert.equal(match.disposition, 'MATCHED_EXISTING');
});

test('USDOT-only links when MC is missing on either side', () => {
  const stagedMissing = matchStagedToCompanies(
    { usdot: '4523001', mc: '', legalName: 'SPINE CARRIER LLC' },
    [spine()]
  );
  assert.equal(stagedMissing.reason, EXACT_USDOT_REASON);
  assert.equal(stagedMissing.companyId, 'usdot-4523001');

  const companyMissing = matchStagedToCompanies(
    { usdot: '4523001', mc: 'MC-123456', legalName: 'SPINE CARRIER LLC' },
    [spine({ mcNumber: null })]
  );
  assert.equal(companyMissing.reason, EXACT_USDOT_REASON);
  assert.equal(companyMissing.companyId, 'usdot-4523001');
});

test('MC digits on both sides must agree before an exact USDOT link', () => {
  const agree = matchStagedToCompanies(
    { usdot: '4523001', mc: 'MC 0123456', legalName: 'SPINE CARRIER LLC' },
    [spine({ mcNumber: '123456' })]
  );
  assert.equal(agree.reason, EXACT_USDOT_REASON);
  assert.equal(agree.companyId, 'usdot-4523001');

  const disagree = matchStagedToCompanies(
    { usdot: '4523001', mc: '999999', legalName: 'SPINE CARRIER LLC' },
    [spine({ mcNumber: '123456', name: 'Spine Carrier' })]
  );
  assert.equal(disagree.disposition, 'IDENTITY_REVIEW_REQUIRED');
  assert.equal(disagree.companyId, null);
  assert.equal(disagree.reason, USDOT_MC_DISAGREE_REASON);
  assert.notEqual(disagree.reason, NO_EXACT_USDOT_OR_MC_REASON);
  assert.notEqual(disagree.reason, NAME_SIMILARITY_ONLY_REASON);
});

test('collision USDOT 1398726 is never auto-linked, even from a single visible company', () => {
  assert.equal(COLLISION_HOLD_USDOTS.has('1398726'), true);
  const oneSided = matchStagedToCompanies(
    { usdot: '1398726', mc: '490742', legalName: 'NORTHERN MICHIGAN MOVING' },
    [
      {
        id: 'northern-michigan-moving',
        usdotNumber: '1398726',
        mcNumber: '490742',
        name: 'Northern Michigan Moving',
        legacyDirectoryRow: true,
        publicationState: 'PUBLISHABLE',
        entityType: 'Carrier',
      },
    ]
  );
  assert.equal(oneSided.disposition, 'IDENTITY_REVIEW_REQUIRED');
  assert.equal(oneSided.companyId, null);
  assert.equal(oneSided.reason, DUPLICATE_USDOT_REASON);

  const both = matchStagedToCompanies(
    { usdot: 'USDOT 1398726', mc: null, legalName: 'NORTHERN MICHIGAN MOVING' },
    [
      {
        id: 'northern-michigan-moving',
        usdotNumber: '1398726',
        mcNumber: '490742',
        name: 'Northern Michigan Moving',
        legacyDirectoryRow: true,
      },
      {
        id: 'northern-michigan-moving-2',
        usdotNumber: '001398726',
        mcNumber: null,
        name: 'Northern Michigan Moving 2',
        legacyDirectoryRow: false,
        publicationState: 'INGESTED',
        entityType: 'Carrier',
      },
    ]
  );
  assert.equal(both.companyId, null);
  assert.equal(both.reason, DUPLICATE_USDOT_REASON);
});

test('other duplicate USDOTs stay in review and are not linked to the first row', () => {
  const match = matchStagedToCompanies(
    { usdot: '555', mc: '1', legalName: 'ACME LLC' },
    [
      { id: 'usdot-555-a', usdotNumber: '555', mcNumber: '1', name: 'Acme A', legacyDirectoryRow: false },
      { id: 'legacy-acme', usdotNumber: '555', mcNumber: '1', name: 'Acme B', legacyDirectoryRow: true },
    ]
  );
  assert.equal(match.companyId, null);
  assert.equal(match.reason, DUPLICATE_USDOT_REASON);
});

test('exact MC still links when the staged row has no USDOT and the company is not a collision hold', () => {
  const match = matchStagedToCompanies(
    { usdot: '', mc: 'MC-015735', legalName: 'SOME OTHER NAME LLC' },
    [{ id: 'allied', usdotNumber: null, mcNumber: '15735', name: 'Allied Van Lines', legacyDirectoryRow: true }]
  );
  assert.equal(match.disposition, 'MATCHED_EXISTING');
  assert.equal(match.companyId, 'allied');
  assert.equal(match.reason, 'exact MC');
});

test('Task 002 copied USDOT is not reassigned onto the remediated company', () => {
  const match = matchStagedToCompanies(
    { usdot: '125563', mc: '2934', legalName: 'MAYFLOWER TRANSIT LLC' },
    [{ id: 'allied', usdotNumber: '125563', mcNumber: '15735', name: 'Allied Van Lines', legacyDirectoryRow: true }]
  );
  assert.equal(match.disposition, 'IDENTITY_REVIEW_REQUIRED');
  assert.equal(match.companyId, null);
  assert.match(match.reason, /Task 002/);
  assert.notEqual(match.reason, NO_EXACT_USDOT_OR_MC_REASON);
});

test('name-only similarity is not promoted and does not create a company', () => {
  const match = matchStagedToCompanies(
    { usdot: '9999999', mc: '111', legalName: 'ALLIED VAN LINES FAKE LLC' },
    [{ id: 'allied', usdotNumber: '76235', mcNumber: '15735', name: 'Allied Van Lines', legacyDirectoryRow: true }]
  );
  assert.equal(match.disposition, 'IDENTITY_REVIEW_REQUIRED');
  assert.equal(match.companyId, null);
  assert.equal(match.reason, NAME_SIMILARITY_ONLY_REASON);
});

test('a true non-match may be a new canonical candidate but never inserts a company id', () => {
  const match = matchStagedToCompanies(
    { usdot: '8888888', mc: null, legalName: 'UNIQUE QUARTZ HAULING LLC' },
    [spine()]
  );
  assert.equal(match.disposition, 'NEW_CANONICAL_CANDIDATE');
  assert.equal(match.companyId, null);
  assert.equal(match.reason, NO_EXACT_USDOT_OR_MC_REASON);
});

test('literal USDOT equality never receives the no-exact stamp', () => {
  const samples: MatchCompany[][] = [
    [spine()],
    [spine({ mcNumber: '1' })],
    [
      spine({ id: 'usdot-4523001' }),
      spine({ id: 'usdot-4523001-b', usdotNumber: '4523001', legacyDirectoryRow: true }),
    ],
  ];
  for (const companies of samples) {
    const match = matchStagedToCompanies(
      { usdot: '4523001', mc: companies.length > 1 ? '123456' : '999', legalName: 'SPINE CARRIER LLC' },
      companies
    );
    assert.notEqual(match.reason, NO_EXACT_USDOT_OR_MC_REASON);
    if (match.reason === EXACT_USDOT_REASON) {
      assert.equal(match.companyId, 'usdot-4523001');
    } else {
      assert.equal(match.companyId, null);
    }
  }
});
