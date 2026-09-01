import assert from 'node:assert/strict';
import test from 'node:test';
import {
  MOVE_SPECIALIST_EXECUTION_CONTRACT,
  MOVE_SPECIALIST_EXECUTION_CONTRACT_FINGERPRINT,
  MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT,
  MOVE_SPECIALIST_EXECUTION_VERSION,
  MoveSpecialistExecutionError,
} from './contract';
import { executeMoveSpecialist, requestFromNaturalQuery, validateMoveSpecialistRequest } from './execute';

test('V2 contract version and deterministic fingerprints are present', () => {
  assert.equal(MOVE_SPECIALIST_EXECUTION_CONTRACT, 'trusthub-specialist-execution-v2');
  assert.equal(MOVE_SPECIALIST_EXECUTION_VERSION, MOVE_SPECIALIST_EXECUTION_CONTRACT);
  assert.match(MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT, /^[a-f0-9]{64}$/);
  assert.match(MOVE_SPECIALIST_EXECUTION_CONTRACT_FINGERPRINT, /^[a-f0-9]{64}$/);
});

test('natural state cohorts reuse the MOVE-DIR-002 plan', () => {
  const ny = requestFromNaturalQuery('movers in New York');
  assert.equal(ny.queryType, 'cohort');
  assert.equal(ny.entityClass, 'mover');
  assert.deepEqual(ny.geography, {
    stateCode: 'NY',
    stateName: 'New York',
    city: undefined,
    intent: 'RECORDED_HQ',
  });
  const dallas = requestFromNaturalQuery('moving company in Dallas Texas');
  assert.equal(dallas.geography?.stateCode, 'TX');
  assert.equal(dallas.geography?.city, 'Dallas');
});

test('Auto Transport class and regulatory role stay separate', () => {
  const carrier = requestFromNaturalQuery('auto transport carriers in New York');
  assert.equal(carrier.entityClass, 'auto_transport');
  assert.equal(carrier.role, 'Carrier');
  assert.equal(carrier.geography?.stateCode, 'NY');
  const broker = requestFromNaturalQuery('auto transport brokers in Florida');
  assert.equal(broker.entityClass, 'auto_transport');
  assert.equal(broker.role, 'Broker');
});

test('service-territory and route intent fail closed without a data call', async () => {
  for (const query of [
    'movers serving New York',
    'auto transport companies serving New York',
    'ship my car from Florida to New York',
    'movers near me',
  ]) {
    const response = await executeMoveSpecialist(requestFromNaturalQuery(query));
    assert.equal(response.resultType, 'UNSUPPORTED_CAPABILITY', query);
    assert.equal(response.rows.length, 0, query);
    assert.match(response.limitations.join(' '), /service-territory|route|availability/i, query);
    assert.match(response.limitations.join(' '), /Headquarters is not service territory/i, query);
  }
});

test('identifier precedence and malformed inputs are deterministic', () => {
  const dot = requestFromNaturalQuery('USDOT 3244649');
  assert.equal(dot.queryType, 'identifier');
  assert.deepEqual(dot.identifier, { type: 'USDOT', value: '3244649' });
  const mc = requestFromNaturalQuery('MC 1019808');
  assert.deepEqual(mc.identifier, { type: 'MC', value: '1019808' });
  assert.throws(
    () => validateMoveSpecialistRequest({
      contract: MOVE_SPECIALIST_EXECUTION_CONTRACT,
      queryType: 'identifier',
      entityClass: 'mover',
      identifier: { type: 'USDOT', value: 'bad' },
    }),
    (error) => error instanceof MoveSpecialistExecutionError && error.code === 'INVALID_QUERY',
  );
});

test('public contract has no scoring, rating, paid, subscription or internal-id field', () => {
  const source = JSON.stringify({
    request: validateMoveSpecialistRequest({
      contract: MOVE_SPECIALIST_EXECUTION_CONTRACT,
      queryType: 'cohort',
      entityClass: 'mover',
      geography: { stateCode: 'NY', intent: 'RECORDED_HQ' },
    }),
    schema: MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT,
  });
  assert.doesNotMatch(source, /reputation.?score|trust.?score|rating|paid|subscription|internal.?id/i);
});
