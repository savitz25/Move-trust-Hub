/**
 * Quick unit checks for NOT AUTHORIZED → force Intrastate routing.
 * Run: npx tsx scripts/check-authority-routing.ts
 */
import {
  hasActiveInterstateOperatingAuthority,
  shouldForceIntrastateFromAuthority,
} from '../lib/fmcsa/authority-routing';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

// Active USDOT + no OA → force local
assert(
  shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    authorityStatus: 'Common: None · Contract: None · Broker: None',
    commonAuthorityStatus: 'N',
    contractAuthorityStatus: 'N',
    brokerAuthorityStatus: 'N',
  }),
  'ACTIVE USDOT + None OA forces intrastate'
);

assert(
  shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    authorityStatus: 'Registered',
    authorityActive: false,
  }),
  'ACTIVE USDOT + Registered (no OA) forces intrastate'
);

assert(
  shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    authorityStatus: 'NOT AUTHORIZED',
  }),
  'NOT AUTHORIZED label forces intrastate'
);

// Has real OA → do not force
assert(
  !shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    authorityStatus: 'Common: Active · Contract: None · Broker: None',
    commonAuthorityStatus: 'A',
    contractAuthorityStatus: 'N',
    brokerAuthorityStatus: 'N',
  }),
  'Active common authority stays interstate'
);

assert(
  hasActiveInterstateOperatingAuthority({
    commonAuthorityStatus: 'A',
  }),
  'common A is active OA'
);

// Bare "Active" free-text is NOT enough for OA
assert(
  !hasActiveInterstateOperatingAuthority({
    authorityStatus: 'Active',
    allowedToOperate: 'Y',
  }),
  'bare Active label is not interstate OA'
);

assert(
  shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    authorityStatus: 'Active',
  }),
  'ACTIVE USDOT + bare Active label still forces local without OA codes'
);

// Inactive USDOT alone does not force
assert(
  !shouldForceIntrastateFromAuthority({
    usdotStatus: 'INACTIVE',
    allowedToOperate: 'N',
    authorityStatus: 'None',
  }),
  'inactive USDOT does not force (other paths handle)'
);

if (process.exitCode) {
  console.error('\nAuthority routing checks failed.');
  process.exit(1);
}
console.log('\nAll authority routing checks passed.');
