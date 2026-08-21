import assert from 'node:assert/strict';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { test } from 'node:test';
import {
  CANONICAL_CONTACT_FIELDS_NEVER_TOUCHED,
  CONTACT_OBSERVATION_REFRESH_FIELDS,
  CONTACT_OBSERVATION_UPSERT_SQL,
  refreshCurrentObservation,
  type ContactObservationRow,
} from '@/lib/state-hhg/contact-observation';

function base(partial: Partial<ContactObservationRow> = {}): ContactObservationRow {
  return {
    company_id: 'usdot-1',
    regulatory_id: 'FL-FDACS-IM-2736',
    observation_type: 'business_email',
    raw_value: 'old@example.com',
    normalized_value: 'old@example.com',
    source: 'fdacs_legacy_xls',
    source_record_id: 'IM2736',
    source_url: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
    retrieved_at: '2026-08-01T00:00:00.000Z',
    verification_state: 'UNRESOLVED',
    match_status: 'NOT_FOUND',
    match_evidence: {},
    quality_class: 'named',
    ...partial,
  };
}

test('upsert SQL refreshes current observation fields on conflict', () => {
  for (const field of CONTACT_OBSERVATION_REFRESH_FIELDS) {
    assert.match(CONTACT_OBSERVATION_UPSERT_SQL, new RegExp(`${field} = EXCLUDED\\.${field}`));
  }
  assert.match(CONTACT_OBSERVATION_UPSERT_SQL, /ON CONFLICT \(regulatory_id, observation_type\)/);
});

test('email refresh keeps one current-source row', () => {
  const next = refreshCurrentObservation(
    base(),
    base({
      raw_value: 'office@example.com',
      normalized_value: 'office@example.com',
      quality_class: 'role',
      retrieved_at: '2026-08-21T00:00:00.000Z',
    })
  );
  assert.equal(next.raw_value, 'office@example.com');
  assert.equal(next.normalized_value, 'office@example.com');
  assert.equal(next.retrieved_at, '2026-08-21T00:00:00.000Z');
  assert.equal(next.regulatory_id, 'FL-FDACS-IM-2736');
});

test('phone refresh keeps one current-source row', () => {
  const next = refreshCurrentObservation(
    base({
      observation_type: 'business_phone',
      raw_value: '(305) 555-1111',
      normalized_value: '3055551111',
    }),
    base({
      observation_type: 'business_phone',
      raw_value: '(305) 555-2222',
      normalized_value: '3055552222',
      retrieved_at: '2026-08-21T00:00:00.000Z',
    })
  );
  assert.equal(next.raw_value, '(305) 555-2222');
  assert.equal(next.normalized_value, '3055552222');
});

test('address refresh keeps one current-source row', () => {
  const next = refreshCurrentObservation(
    base({
      observation_type: 'physical_address',
      raw_value: '1 Old St, Miami, FL 33101',
      normalized_value: '1 OLD ST',
    }),
    base({
      observation_type: 'physical_address',
      raw_value: '9 New Ave, Miami, FL 33101',
      normalized_value: '9 NEW AVE',
      retrieved_at: '2026-08-21T00:00:00.000Z',
    })
  );
  assert.equal(next.raw_value, '9 New Ave, Miami, FL 33101');
  assert.equal(next.normalized_value, '9 NEW AVE');
});

test('observation refresh never targets canonical company contact columns', () => {
  assert.deepEqual(CANONICAL_CONTACT_FIELDS_NEVER_TOUCHED, [
    'companies.email',
    'companies.phone',
    'companies.physical_address',
  ]);
  assert.equal(/UPDATE\s+public\.companies/i.test(CONTACT_OBSERVATION_UPSERT_SQL), false);
  const ingest = readFileSync(resolve(process.cwd(), 'scripts/ingest-task-fl-002.ts'), 'utf8');
  assert.equal(/UPDATE\s+public\.companies/i.test(ingest), false);
  assert.equal(/move-trust-hub-task004/i.test(ingest), false);
  assert.equal(/C:\/Users\/makei/i.test(ingest), false);
});

test('idempotent second apply of the same snapshot does not fork a second row', () => {
  const first = refreshCurrentObservation(null, base());
  const second = refreshCurrentObservation(first, base());
  assert.equal(second.raw_value, first.raw_value);
  assert.equal(second.regulatory_id, first.regulatory_id);
  assert.equal(second.observation_type, first.observation_type);
});
