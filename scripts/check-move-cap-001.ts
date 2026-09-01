import assert from 'node:assert/strict';
import {
  MOVE_SPECIALIST_EXECUTION_CONTRACT,
  MOVE_SPECIALIST_EXECUTION_CONTRACT_FINGERPRINT,
  MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT,
  type MoveSpecialistExecutionRequest,
  type MoveSpecialistExecutionResponse,
} from '../lib/specialist-execution/contract';
import { executeMoveSpecialist, requestFromNaturalQuery } from '../lib/specialist-execution/execute';
import { MOVE_NETWORK_RESOLVER_CONTRACT_FINGERPRINT } from '../lib/search/network-resolver';
import { publicAskPayloadFromSpecialist } from '../lib/move-ask/specialist-adapter';
import { MOVE_ASK_CONTRACT } from '../lib/move-ask/contract';

const calls: Array<{ label: string; elapsedMs: number; rowsFetched: number; rowsReturned: number }> = [];

async function execute(label: string, request: MoveSpecialistExecutionRequest): Promise<MoveSpecialistExecutionResponse> {
  const response = await executeMoveSpecialist(request);
  calls.push({
    label,
    elapsedMs: response.diagnostics.elapsedMs,
    rowsFetched: response.diagnostics.rowsFetched,
    rowsReturned: response.diagnostics.rowsReturned,
  });
  return response;
}

async function natural(query: string, page = 1, limit = 20) {
  return execute(query, requestFromNaturalQuery(query, page, limit));
}

async function allPages(query: string) {
  const first = await natural(query, 1, 50);
  const rows = [...first.rows];
  for (let page = 2; page <= Math.ceil(first.total / 50); page += 1) {
    rows.push(...(await natural(query, page, 50)).rows);
  }
  return { first, rows };
}

async function main() {
const ny = await allPages('movers in New York');
assert.equal(ny.first.resultType, 'SUPPORTED_RESULTS');
assert.ok(ny.first.total > 0);
assert.equal(ny.rows.length, ny.first.total);
assert.ok(ny.rows.every((row) => row.recordedHq.state === 'NY'));
assert.ok(ny.rows.every((row) => row.recordedHq.locationMeaning === 'RECORDED_HQ'));
assert.match(ny.first.provenance.geographyMeaning, /Headquarters is not service territory/i);

const uniqueNy = new Set(ny.rows.map((row) => `${row.usdot ?? ''}:${row.canonicalSlug}`));
assert.equal(uniqueNy.size, ny.rows.length);
const authority = {
  current: ny.rows.filter((row) => row.authorityState === 'Current authority recorded').length,
  notCurrent: ny.rows.filter((row) => row.authorityState === 'Authority not current in stored evidence').length,
  unknown: ny.rows.filter((row) => row.authorityState === 'Authority status unknown').length,
};
const roles = {
  Carrier: ny.rows.filter((row) => row.role === 'Carrier').length,
  Broker: ny.rows.filter((row) => row.role === 'Broker').length,
  'Carrier/Broker': ny.rows.filter((row) => row.role === 'Carrier/Broker').length,
  Unknown: ny.rows.filter((row) => row.role === 'Unknown').length,
};
assert.equal(Object.values(authority).reduce((sum, value) => sum + value, 0), ny.rows.length);
assert.equal(Object.values(roles).reduce((sum, value) => sum + value, 0), ny.rows.length);

const repeat = await natural('movers in New York');
const repeatAgain = await natural('movers in New York');
assert.deepEqual(repeat.rows.map((row) => row.usdot), repeatAgain.rows.map((row) => row.usdot));
const second = await natural('movers in New York', 2);
assert.equal(second.rows.some((row) => repeat.rows.some((first) => first.canonicalSlug === row.canonicalSlug)), false);
const lastPage = Math.ceil(ny.first.total / 20);
const last = await natural('movers in New York', lastPage);
assert.ok(last.rows.length > 0);
const outOfRange = await natural('movers in New York', lastPage + 1);
assert.equal(outOfRange.resultType, 'ZERO_MATCHING_ROWS');
assert.equal(outOfRange.rows.length, 0);
assert.equal(outOfRange.total, ny.first.total);

const stateCounts: Record<string, number> = {};
for (const [code, name] of [
  ['FL', 'Florida'], ['TX', 'Texas'], ['NJ', 'New Jersey'], ['CA', 'California'],
  ['WA', 'Washington'], ['IL', 'Illinois'], ['NY', 'New York'],
] as const) {
  const response = await natural(`movers in ${name}`);
  assert.equal(response.resultType, 'SUPPORTED_RESULTS', name);
  assert.ok(response.rows.every((row) => row.recordedHq.state === code), name);
  stateCounts[code] = response.total;
}

const dallas = await natural('moving company in Dallas Texas');
assert.equal(dallas.resultType, 'SUPPORTED_RESULTS');
assert.ok(dallas.rows.every((row) => row.recordedHq.state === 'TX'));
assert.match(dallas.limitations.join(' '), /Dallas.*applied only.*TX recorded-headquarters state/i);

const askCompatibility = publicAskPayloadFromSpecialist(ny.first);
assert.equal(askCompatibility.contract, MOVE_ASK_CONTRACT);
assert.equal(askCompatibility.pagination.total, ny.first.total);
assert.match(askCompatibility.provenance.geographyMeaning, /Recorded headquarters/i);

const autoCounts: Record<string, number> = {};
for (const [query, state, role] of [
  ['auto transport companies in New York', 'NY', null],
  ['auto transport carriers in New York', 'NY', 'Carrier'],
  ['auto transport brokers in Florida', 'FL', 'Broker'],
  ['car shipping companies in Texas', 'TX', null],
] as const) {
  const response = await natural(query);
  assert.notEqual(response.resultType, 'UNSUPPORTED_CAPABILITY', query);
  assert.ok(response.rows.every((row) => row.autoTransportEvidence), query);
  assert.ok(response.rows.every((row) => row.recordedHq.state === state), query);
  if (role) assert.ok(response.rows.every((row) => row.role === role || row.role === 'Carrier/Broker'), query);
  autoCounts[query] = response.total;
}
const autoNyBrokerZero = await natural('auto transport brokers in New York');
assert.equal(autoNyBrokerZero.resultType, 'ZERO_MATCHING_ROWS');
assert.equal(autoNyBrokerZero.total, 0);
assert.match(autoNyBrokerZero.limitations.join(' '), /No public Auto Transport identities.*Broker role.*recorded NY headquarters/i);

for (const query of [
  'movers serving New York',
  'moving companies that serve Dallas Texas',
  'auto transport companies serving New York',
  'ship my car from Florida to New York',
  'movers near me',
]) {
  const response = await natural(query);
  assert.equal(response.resultType, 'UNSUPPORTED_CAPABILITY', query);
  assert.equal(response.rows.length, 0, query);
  assert.ok(response.destinations.research, query);
}

const dot = await natural('USDOT 3244649');
assert.equal(dot.queryInterpretation.identityResolutionClass, 'EXACT_IDENTIFIER');
assert.equal(dot.rows[0]?.usdot, '3244649');
const mc = await natural('MC 1019808');
assert.equal(mc.queryInterpretation.identityResolutionClass, 'EXACT_IDENTIFIER');
assert.equal(mc.rows[0]?.mc, '1019808');
const shifl = await natural('SHIFL');
assert.equal(shifl.queryInterpretation.identityResolutionClass, 'FUZZY_CANDIDATES');
const twoMen = await natural('Two Men and a Truck');
assert.equal(twoMen.queryInterpretation.identityResolutionClass, 'AMBIGUOUS_NAME');
const sunshine = await natural('Sunshine State Movers');
assert.equal(sunshine.queryInterpretation.identityResolutionClass, 'NO_CONFIDENT_MATCH');
assert.equal(sunshine.resultType, 'ZERO_MATCHING_ROWS');
assert.equal(sunshine.rows.length, 0);

const publicJson = JSON.stringify({ ny: ny.first, dot, autoCounts });
assert.doesNotMatch(publicJson, /"(?:entityId|company_id|reputationScore|trustScore|overallRating|reviewCount|paid|subscription|admin)"\s*:/i);
assert.match(publicJson, /canonicalProfileUrl/);
assert.match(ny.first.limitations.join(' '), /neutral source order/i);
assert.match(ny.first.limitations.join(' '), /broker may arrange/i);
assert.equal(MOVE_NETWORK_RESOLVER_CONTRACT_FINGERPRINT, '72bbf42f66073afd945f8ff3ad5813a0a98e8e787ebff8bf8d69bb552eb1c42c');

const sortedLatencies = calls.map((call) => call.elapsedMs).sort((a, b) => a - b);
const percentile = (p: number) => sortedLatencies[Math.min(sortedLatencies.length - 1, Math.ceil(sortedLatencies.length * p) - 1)] ?? 0;

console.log(JSON.stringify({
  status: 'PASS',
  contract: MOVE_SPECIALIST_EXECUTION_CONTRACT,
  schemaFingerprint: MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT,
  contractFingerprint: MOVE_SPECIALIST_EXECUTION_CONTRACT_FINGERPRINT,
  newYorkCensus: {
    MNY1_publicMoverIdentities: ny.first.total,
    MNY2_validRecordedHqState: ny.rows.filter((row) => Boolean(row.recordedHq.state)).length,
    MNY3_recordedHqStateNY: ny.rows.length,
    MNY4_carrier: roles.Carrier,
    MNY5_broker: roles.Broker,
    MNY6_carrierBroker: roles['Carrier/Broker'],
    MNY7_unknownRole: roles.Unknown,
    MNY8_currentAuthority: authority.current,
    MNY9_authorityNotCurrent: authority.notCurrent,
    MNY10_authorityUnknown: authority.unknown,
    MNY11_sourceFreshnessPresent: ny.rows.filter((row) => Boolean(row.sourceLastChecked)).length,
  },
  stateCounts,
  autoTransportCounts: autoCounts,
  performance: {
    calls: calls.length,
    p50: percentile(0.5),
    p95: percentile(0.95),
    max: sortedLatencies.at(-1) ?? 0,
    samples: calls,
  },
  databaseWrites: 0,
  publicationDelta: 0,
}, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
