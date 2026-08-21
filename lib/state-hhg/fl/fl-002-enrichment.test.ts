import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  fdacsRegistrationKind,
  fdacsRegulatoryId,
  parseFdacsRegulatoryId,
} from '@/lib/state-hhg/fl/regulatory-id';
import {
  classifyEmail,
  classifyStateCandidate,
  isPoBox,
  parsePhoneParts,
} from '@/lib/state-hhg/contact-quality';
import { matchStateRegistryIdentity } from '@/lib/state-hhg/identity';

test('stable FDACS IDs distinguish IM vs MB and never use the business name', () => {
  assert.equal(fdacsRegulatoryId('IM2736'), 'FL-FDACS-IM-2736');
  assert.equal(fdacsRegulatoryId('MB165', 'Moving Broker'), 'FL-FDACS-MB-165');
  assert.equal(fdacsRegistrationKind('IM2736'), 'IM');
  assert.equal(fdacsRegistrationKind('MB165'), 'MB');
  assert.deepEqual(parseFdacsRegulatoryId('FL-FDACS-IM-2736'), { kind: 'IM', number: '2736' });
  assert.notEqual(fdacsRegulatoryId('IM2736'), fdacsRegulatoryId('MB2736'));
});

test('dual-license identities remain two regulatory rows', () => {
  const im = fdacsRegulatoryId('IM100', 'Intrastate Mover');
  const mb = fdacsRegulatoryId('MB100', 'Moving Broker');
  assert.notEqual(im, mb);
});

test('email normalization lowercases and rejects malformed values', () => {
  assert.equal(classifyEmail('  Info@Example.COM ').normalized, 'info@example.com');
  assert.equal(classifyEmail('Info@Example.COM').class, 'role');
  assert.equal(classifyEmail('jane.doe@movers.com').class, 'named');
  assert.equal(classifyEmail('not-an-email').class, 'malformed');
  assert.equal(classifyEmail('').class, 'empty');
});

test('phone normalization keeps extension separately and flags malformed', () => {
  const ok = parsePhoneParts('(305) 555-1212 x89');
  assert.equal(ok.normalized, '3055551212');
  assert.equal(ok.extension, '89');
  assert.equal(parsePhoneParts('123').malformed, true);
});

test('address preservation detects PO Box without geocoding', () => {
  assert.equal(isPoBox('PO Box 123, Miami, FL 33101'), true);
  assert.equal(isPoBox('100 Main St, Miami, FL 33101'), false);
});

test('expired and revoked unmatched records are preserved, not deleted', () => {
  assert.equal(
    classifyStateCandidate({ matchedCompanyId: null, statusNormalized: 'expired' }),
    'EXPIRED_STATE_RECORD'
  );
  assert.equal(
    classifyStateCandidate({ matchedCompanyId: null, statusNormalized: 'revoked' }),
    'REVOKED_STATE_RECORD'
  );
  assert.equal(
    classifyStateCandidate({ matchedCompanyId: null, statusNormalized: 'active' }),
    'ACTIVE_STATE_ONLY_CANDIDATE'
  );
});

test('name-only is never VERIFIED; legal name + email can match', () => {
  const candidates = [
    {
      companyId: 'acme',
      legalName: 'ACME MOVING LLC',
      dbaName: null,
      publicName: 'Acme Moving',
      usdot: '1234567',
      phone: '3055559999',
      email: 'ops@acmemoving.com',
      address: '100 MAIN ST',
      city: 'MIAMI',
      state: 'FL',
      postalCode: '33101',
    },
  ];
  const nameOnly = matchStateRegistryIdentity(
    {
      legalName: 'ACME MOVING LLC',
      dba: null,
      usdot: null,
      phone: null,
      email: null,
      physicalAddress: null,
      city: 'Miami',
      postalCode: null,
      statusNormalized: 'active',
      roleClass: 'mover',
      authorityNumber: 'IM1',
    },
    candidates
  );
  assert.notEqual(nameOnly.disposition, 'MATCHED_EXISTING');
  const byEmail = matchStateRegistryIdentity(
    {
      legalName: 'ACME MOVING LLC',
      dba: null,
      usdot: null,
      phone: null,
      email: 'ops@acmemoving.com',
      physicalAddress: null,
      city: null,
      postalCode: null,
      statusNormalized: 'active',
      roleClass: 'mover',
      authorityNumber: 'IM2',
    },
    candidates
  );
  assert.equal(byEmail.disposition, 'MATCHED_EXISTING');
  assert.equal(byEmail.matchMethod, 'exact_legal_name_and_email');
});

test('franchise names without USDOT fail closed', () => {
  const result = matchStateRegistryIdentity(
    {
      legalName: 'NBF Moving LLC',
      dba: 'Two Men and a Truck',
      usdot: null,
      phone: '8505551212',
      email: 'x@y.com',
      physicalAddress: '1 Main',
      city: 'Tallahassee',
      postalCode: '32301',
      statusNormalized: 'active',
      roleClass: 'mover',
      authorityNumber: 'IM2068',
    },
    []
  );
  assert.equal(result.franchiseSafetyHold, true);
  assert.equal(result.disposition, 'REVIEW_REQUIRED');
});
