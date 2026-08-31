import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildMoveNetworkResolverResponse, MOVE_NETWORK_RESOLVER_CONTRACT_FINGERPRINT, MOVE_NETWORK_RESOLVER_SCHEMA_FINGERPRINT, MOVE_NETWORK_RESOLVER_VERSION, validateMoveNetworkRequest } from '@/lib/search/network-resolver';
import type { MoverSearchResponse, SearchCompanyHit } from '@/lib/search/types';

function hit(partial: Partial<SearchCompanyHit> = {}): SearchCompanyHit {
  return { companyId: 'private-id-never-serialized', slug: 'shifl-inc', displayName: 'SHIFL INC', legalName: null, headquarters: 'Jersey City, NJ', usdot: '3244649', mc: '1019808', role: 'Carrier', authorityStatus: 'Current authority recorded', matchType: 'exact_usdot', matchTier: 1, matchExplanation: 'Exact USDOT match', sourceLastChecked: '2026-08-30', ...partial };
}
function search(query: string, results: SearchCompanyHit[], partial: Partial<MoverSearchResponse> = {}): MoverSearchResponse {
  return { query, intent: 'COMPANY_IDENTITY', results, placeResults: [], verificationAction: null, exactNameGroupSize: 0, directJumpSlug: null, ambiguity: false, resultCount: results.length, latencyMs: 3, dbMs: 2, candidateCount: results.length, searchPath: 'fixture:canonical-search-v1', ...partial };
}

test('contract version and deterministic fingerprints are present', () => {
  assert.equal(MOVE_NETWORK_RESOLVER_VERSION, 'move-network-resolver-v1');
  assert.match(MOVE_NETWORK_RESOLVER_SCHEMA_FINGERPRINT, /^[a-f0-9]{64}$/);
  assert.match(MOVE_NETWORK_RESOLVER_CONTRACT_FINGERPRINT, /^[a-f0-9]{64}$/);
  assert.throws(
    () => validateMoveNetworkRequest({ query: 'SHIFL', contractVersion: 'move-network-resolver-v0' }),
    (error: unknown) => error instanceof Error && 'code' in error && error.code === 'CONTRACT_VERSION_ERROR',
  );
});

test('USDOT and DOT 3244649 resolve SHIFL as exact identifier', () => {
  for (const query of ['USDOT 3244649', 'DOT 3244649']) {
    const response = buildMoveNetworkResolverResponse({ query }, search(query, [hit()]));
    assert.equal(response.resolutionClass, 'EXACT_IDENTIFIER');
    assert.equal(response.results[0]?.publicDisplayName, 'SHIFL INC');
    assert.equal(response.results[0]?.usdot, '3244649');
  }
});

test('MC and accepted bare digit semantics resolve SHIFL identifier', () => {
  for (const query of ['MC 1019808', '1019808']) {
    const response = buildMoveNetworkResolverResponse({ query }, search(query, [hit({ matchType: 'exact_mc', matchTier: query.startsWith('MC') ? 2 : 3, matchExplanation: 'Exact MC match' })]));
    assert.equal(response.resolutionClass, 'EXACT_IDENTIFIER');
    assert.equal(response.results[0]?.mc, '1019808');
  }
});

test('exact public, canonical, normalized, and SHIFL prefix preserve Search V1 match semantics', () => {
  assert.equal(buildMoveNetworkResolverResponse({ query: 'SHIFL INC' }, search('SHIFL INC', [hit({ matchType: 'exact_display_name', matchTier: 4 })])).resolutionClass, 'EXACT_PUBLIC_NAME');
  assert.equal(buildMoveNetworkResolverResponse({ query: 'ACME LEGAL LLC' }, search('ACME LEGAL LLC', [hit({ displayName: 'ACME MOVING', legalName: 'ACME LEGAL LLC', matchType: 'exact_legal_name', matchTier: 5 })])).resolutionClass, 'EXACT_CANONICAL_NAME');
  assert.equal(buildMoveNetworkResolverResponse({ query: 'SHIFL, INC.' }, search('SHIFL, INC.', [hit({ matchType: 'exact_display_name', matchTier: 4 })])).resolutionClass, 'NORMALIZED_NAME');
  assert.equal(buildMoveNetworkResolverResponse({ query: 'SHIFL' }, search('SHIFL', [hit({ matchType: 'display_prefix', matchTier: 7 })])).resolutionClass, 'FUZZY_CANDIDATES');
});

test('TWO MEN AND A TRUCK returns bounded neutral ambiguity and full census separately', () => {
  const a = hit({ companyId: 'a', slug: 'two-men-austin', displayName: 'TWO MEN AND A TRUCK', legalName: 'AUSTIN MOVING LLC', headquarters: 'Austin, TX', usdot: '111', mc: '', matchType: 'exact_display_name', matchTier: 4 });
  const b = hit({ companyId: 'b', slug: 'two-men-zanesville', displayName: 'TWO MEN AND A TRUCK', legalName: 'ZANESVILLE MOVING LLC', headquarters: 'Zanesville, OH', usdot: '222', mc: '', matchType: 'exact_display_name', matchTier: 4 });
  const response = buildMoveNetworkResolverResponse({ query: 'two men and a truck', limit: 2 }, search('two men and a truck', [a, b], { exactNameGroupSize: 37, ambiguity: true, resultCount: 37 }));
  assert.equal(response.resolutionClass, 'AMBIGUOUS_NAME');
  assert.equal(response.returnedResultCount, 2);
  assert.equal(response.totalMatchingIdentityCount, 37);
  assert.equal(response.duplicateNameCount, 37);
  assert.deepEqual(response.results.map((r) => r.recordedHq.city), ['Austin', 'Zanesville']);
});

test('College Hunks and Colleg Hunks remain fuzzy candidates, never exact', () => {
  for (const query of ['College Hunks', 'Colleg Hunks']) {
    const response = buildMoveNetworkResolverResponse({ query }, search(query, [hit({ slug: 'college-hunks', displayName: 'College Hunks Hauling Junk', matchType: query === 'College Hunks' ? 'display_prefix' : 'similar_name', matchTier: query === 'College Hunks' ? 7 : 9 })]));
    assert.equal(response.resolutionClass, 'FUZZY_CANDIDATES');
  }
});

test('unknown identity is no confident match with no cohort fallback', () => {
  const response = buildMoveNetworkResolverResponse({ query: 'Unknown Mover XYZ' }, search('Unknown Mover XYZ', [], { resultCount: 0 }));
  assert.equal(response.resolutionClass, 'NO_CONFIDENT_MATCH');
  assert.deepEqual(response.results, []);
  assert.equal(response.returnedResultCount, 0);
  assert.equal(response.totalMatchingIdentityCount, 0);
});

test('malformed identifiers and invalid input fail structurally', () => {
  for (const query of ['', 'x', 'USDOT ABC', 'USDOT 12', 'MC ABC', 'MC 12']) assert.throws(() => validateMoveNetworkRequest({ query }), /query|identifier/i);
  assert.throws(() => validateMoveNetworkRequest({ query: 'SHIFL', limit: Number.NaN }), /limit/i);
});

test('public shape distinguishes display/legal identity, HQ, role and authority semantics', () => {
  const response = buildMoveNetworkResolverResponse({ query: 'ACME MOVING' }, search('ACME MOVING', [hit({ displayName: 'ACME MOVING', legalName: 'ACME HOLDINGS LLC', matchType: 'exact_display_name', matchTier: 4, role: 'Carrier-Broker' })]));
  const identity = response.results[0]!;
  assert.equal(identity.publicDisplayName, 'ACME MOVING');
  assert.equal(identity.legalName, 'ACME HOLDINGS LLC');
  assert.equal(identity.role, 'Carrier/Broker');
  assert.equal(identity.recordedHq.locationMeaning, 'RECORDED_HQ');
  assert.match(response.limitations.join(' '), /Headquarters is not service territory/i);
  assert.match(response.limitations.join(' '), /not approval.*recommendation/i);
});

test('sparse published mover remains valid and internal/private/ranking fields never serialize', () => {
  const response = buildMoveNetworkResolverResponse({ query: 'Sparse Mover' }, search('Sparse Mover', [hit({ displayName: 'Sparse Mover', legalName: null, headquarters: '', usdot: '', mc: '', authorityStatus: null, sourceLastChecked: null, matchType: 'exact_display_name', matchTier: 4 })]));
  assert.equal(response.results[0]?.recordedHq.raw, null);
  const json = JSON.stringify(response);
  assert.doesNotMatch(json, /private-id-never-serialized|companyId|reputation|trust.?score|review.?score|paid|subscription|admin|private contact/i);
});

test('deterministic output preserves Search V1 ordering and canonical URLs', () => {
  const rows = [hit({ slug: 'a', displayName: 'A MOVER' }), hit({ slug: 'b', displayName: 'B MOVER' })];
  const one = buildMoveNetworkResolverResponse({ query: 'mover' }, search('mover', rows));
  const two = buildMoveNetworkResolverResponse({ query: 'mover' }, search('mover', rows));
  assert.deepEqual(one.results, two.results);
  assert.deepEqual(one.results.map((r) => r.canonicalUrl), ['https://www.movetrusthub.com/companies/a', 'https://www.movetrusthub.com/companies/b']);
});
