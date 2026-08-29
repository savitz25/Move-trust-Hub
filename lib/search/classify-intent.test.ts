import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifySearchQuery } from '@/lib/search/classify-intent';

test('explicit DOT stays DOT-only', () => {
  const q = classifySearchQuery('DOT 3244649');
  assert.equal(q.intent, 'REGULATORY_IDENTIFIER');
  assert.equal(q.identifier?.namespace, 'DOT');
  assert.equal(q.identifier?.digits, '3244649');
});

test('explicit MC stays MC-only', () => {
  const q = classifySearchQuery('MC-1019808');
  assert.equal(q.intent, 'REGULATORY_IDENTIFIER');
  assert.equal(q.identifier?.namespace, 'MC');
  assert.equal(q.identifier?.digits, '1019808');
});

test('bare digits are BARE not DOT-only', () => {
  const q = classifySearchQuery('1019808');
  assert.equal(q.intent, 'REGULATORY_IDENTIFIER');
  assert.equal(q.identifier?.namespace, 'BARE');
  assert.equal(q.identifier?.digits, '1019808');
});

test('company identity for SHIFL', () => {
  const q = classifySearchQuery('SHIFL');
  assert.equal(q.intent, 'COMPANY_IDENTITY');
});

test('Miami, FL is place intent', () => {
  const q = classifySearchQuery('Miami, FL');
  assert.equal(q.intent, 'PLACE');
});

test('Florida is place intent', () => {
  const q = classifySearchQuery('Florida');
  assert.equal(q.intent, 'PLACE');
});

test('Two Men and a Truck Austin TX keeps company identity with HQ hint', () => {
  const q = classifySearchQuery('Two Men and a Truck Austin TX');
  assert.equal(q.intent, 'COMPANY_IDENTITY');
  assert.ok(q.locationHint);
  assert.match(q.companyQuery, /two men and a truck/i);
  assert.equal(q.locationHint?.stateCode, 'TX');
});

test('nonsense stays unknown or company without identifier', () => {
  const q = classifySearchQuery('zzzzqxxq 999');
  assert.notEqual(q.intent, 'REGULATORY_IDENTIFIER');
  assert.equal(q.identifier, null);
});
