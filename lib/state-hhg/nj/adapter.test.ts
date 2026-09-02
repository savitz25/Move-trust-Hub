import assert from 'node:assert/strict';
import {
  NewJerseyPmwAdapter,
  fmcsaActiveImpliesNjLicensed,
  mapNjPmwClass,
  njLicenseImpliesFmcsaInterstate,
  pwOnlyAppearsInConsumerMoverSearch,
} from '@/lib/state-hhg/nj/adapter';

assert.equal(pwOnlyAppearsInConsumerMoverSearch(), false);
assert.equal(njLicenseImpliesFmcsaInterstate(), false);
assert.equal(fmcsaActiveImpliesNjLicensed(), false);
assert.equal(mapNjPmwClass('PM')?.consumerMoverSearch, true);
assert.equal(mapNjPmwClass('PW')?.consumerMoverSearch, false);
assert.equal(mapNjPmwClass('PC')?.authorityType, 'intrastate_public_mover_and_warehouseman');
const adapter = new NewJerseyPmwAdapter('2026-09-02T00:00:00.000Z');
assert.equal(adapter.stateCode, 'NJ');
assert.equal(adapter.getSourceMetadata().googlePlacesRequests, 0);
assert.equal(adapter.resolveBrokerRole(), false);
console.log('NJ PMW adapter tests: PASS');
