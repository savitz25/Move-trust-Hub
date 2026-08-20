import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyProvider } from '@/lib/provider/classification';
import { resolveProviderEligibility } from '@/lib/provider/eligibility';
import { detectIdentityCollisions, shouldCreateCanonicalProfile } from '@/lib/provider/identity';
import { resolvePublicationState } from '@/lib/provider/publication';
import { regulatoryCopyForProvider, shouldShowHouseholdMovePrice } from '@/lib/provider/copy';

test('broker-only is not presented as the physical HHG carrier', () => {
  const classified = classifyProvider({
    serviceScope: 'interstate',
    entityType: 'BROKER',
    services: ['Broker'],
    usdotNumber: '2239816',
    mcNumber: 'MC-611862',
  });
  assert.deepEqual(classified.roles, ['hhg_broker']);
  assert.equal(classified.hhgLabel, 'Broker');
  assert.equal(classified.capabilities.includes('hhg_interstate_carrier'), false);
  const copy = regulatoryCopyForProvider({
    serviceScope: 'interstate',
    entityType: 'BROKER',
    services: ['Broker'],
    usdotNumber: '2239816',
  });
  assert.match(copy.detail, /not itself the motor carrier/i);
});

test('local-only mover is not described as interstate-authorized', () => {
  const classified = classifyProvider({
    serviceScope: 'intrastate',
    services: ['Local Mover'],
    usdotNumber: '1234567',
  });
  assert.deepEqual(classified.roles, ['local_mover']);
  assert.equal(classified.capabilities.includes('hhg_interstate_carrier'), false);
  const eligibility = resolveProviderEligibility({
    serviceScope: 'intrastate',
    services: ['Local Mover'],
    usdotNumber: '1234567',
  });
  assert.equal(eligibility.interstateHhgCarrier, false);
  const copy = regulatoryCopyForProvider({
    serviceScope: 'intrastate',
    services: ['Local Mover'],
    usdotNumber: '1234567',
  });
  assert.match(copy.detail, /does not by itself mean/i);
});

test('carrier + broker retains both authorities', () => {
  const classified = classifyProvider({
    serviceScope: 'interstate',
    entityType: 'CARRIER/BROKER',
    services: ['Carrier / Broker'],
    usdotNumber: '614506',
  });
  assert.ok(classified.capabilities.includes('hhg_interstate_carrier'));
  assert.ok(classified.capabilities.includes('hhg_broker'));
  assert.equal(classified.hhgLabel, 'Carrier + Broker');
});

test('auto-only company does not inherit HHG profile copy', () => {
  const classified = classifyProvider({
    serviceScope: 'interstate',
    entityType: 'BROKER',
    services: ['Auto Transport', 'Broker'],
    specialties: ['Open Transport'],
    usdotNumber: '2239816',
  });
  assert.ok(classified.roles.includes('auto_broker'));
  assert.equal(classified.roles.includes('hhg_broker'), false);
  assert.equal(shouldShowHouseholdMovePrice({
    serviceScope: 'interstate',
    entityType: 'BROKER',
    services: ['Auto Transport', 'Broker'],
  }), false);
  const copy = regulatoryCopyForProvider({
    serviceScope: 'interstate',
    entityType: 'BROKER',
    services: ['Auto Transport', 'Broker'],
  });
  assert.match(copy.headline, /Auto transport broker/i);
});

test('HHG + auto resolves to one identity with multiple roles', () => {
  const classified = classifyProvider({
    serviceScope: 'interstate',
    entityType: 'CARRIER/BROKER',
    services: ['Full Service', 'Carrier', 'Broker', 'Auto Transport'],
    usdotNumber: '1111111',
  });
  assert.ok(classified.roles.includes('multi_service'));
  assert.ok(classified.hhgLabel);
  assert.ok(classified.autoLabel);
});

test('inactive authority cannot receive an active-authority eligibility flag', () => {
  const eligibility = resolveProviderEligibility({
    serviceScope: 'interstate',
    entityType: 'CARRIER',
    services: ['Carrier'],
    usdotNumber: '614506',
    authorityActive: false,
    usdotStatus: 'INACTIVE',
  });
  assert.equal(eligibility.interstateHhgCarrier, false);
});

test('REVIEW_REQUIRED is not indexable', () => {
  const pub = resolvePublicationState({
    serviceScope: 'interstate',
    entityType: 'CARRIER',
    services: ['Carrier'],
    identityReviewRequired: true,
    isVerified: true,
  });
  assert.equal(pub.publicationState, 'REVIEW_REQUIRED');
  assert.equal(pub.indexable, false);
});

test('duplicate USDOT cannot generate a second canonical identity', () => {
  const collisions = detectIdentityCollisions([
    { id: 'a', name: 'Example A', usdotNumber: '614506', headquarters: 'Phoenix, AZ' },
    { id: 'b', name: 'Example B', usdotNumber: '614506', headquarters: 'Tampa, FL' },
  ]);
  assert.equal(collisions[0]?.kind, 'usdot');
  assert.equal(collisions[0]?.resolution, 'REVIEW_REQUIRED');
  assert.equal(
    shouldCreateCanonicalProfile({
      existingCanonicalKey: 'usdot:614506',
      incomingCanonicalKey: 'usdot:614506',
    }),
    'same_identity'
  );
});

test('service area is not inferred as regulatory authority', () => {
  const eligibility = resolveProviderEligibility({
    serviceScope: 'intrastate',
    services: ['Local Mover'],
    coverage: 'All 50 States',
  });
  assert.equal(eligibility.interstateHhgCarrier, false);
  assert.equal(eligibility.intrastateHhg, true);
});
