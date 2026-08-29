import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  authorityLabel,
  namesDiffer,
  profileSeoDescription,
  profileSeoTitle,
  researchRole,
  roleExplanation,
} from '@/lib/company/research-profile';

test('display name differs from legal name', () => {
  assert.equal(
    namesDiffer({ name: 'TWO MEN AND A TRUCK', fmcsaLegalName: 'Example Moving LLC' }),
    true,
  );
  assert.equal(namesDiffer({ name: 'SHIFL INC', fmcsaLegalName: 'SHIFL INC' }), false);
});

test('roles are factual and unknown is not broker', () => {
  assert.equal(researchRole({ entityType: 'Carrier', services: ['Carrier'] }), 'Carrier');
  assert.equal(researchRole({ entityType: 'Broker', services: ['Broker'] }), 'Broker');
  assert.equal(researchRole({ entityType: 'Carrier/Broker', services: [] }), 'Carrier / Broker');
  assert.equal(researchRole({ entityType: '', services: [] }), 'Unknown');
  assert.match(roleExplanation('Unknown'), /not the same as broker/i);
  assert.doesNotMatch(roleExplanation('Unknown'), /this is a broker|classified as a broker/i);
});

test('authority labels are regulatory not endorsement', () => {
  assert.equal(authorityLabel({ authorityActive: true }), 'Current authority recorded');
  assert.equal(authorityLabel({ authorityActive: false }), 'Authority not current in stored evidence');
  assert.equal(authorityLabel({ authorityActive: null }), 'Authority status unknown');
  assert.doesNotMatch(authorityLabel({ authorityActive: true }), /approved|trusted|safe|recommended/i);
});

test('SEO title uses USDOT research language not ratings', () => {
  const title = profileSeoTitle({ name: 'SHIFL INC', usdotNumber: '3244649' });
  assert.match(title, /USDOT 3244649/);
  assert.doesNotMatch(title, /best|top|trusted|recommended|safest|reviews/i);
});

test('SEO description is research not endorsement', () => {
  const d = profileSeoDescription({ name: 'SHIFL INC', usdotNumber: '3244649', mcNumber: '1019808' });
  assert.match(d, /You decide/);
  assert.doesNotMatch(d, /best|top|trusted|recommended/i);
});
