/**
 * Unit checks for FMCSA onboarding path classifier.
 * Run: npx tsx scripts/check-authority-routing.ts
 */
import {
  hasActiveInterstateOperatingAuthority,
  isActiveBrokerInterstatePath,
  isFmcsaBrokerEntity,
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

// Active USDOT + no OA → force local (carrier default)
assert(
  shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    authorityStatus: 'Common: None · Contract: None · Broker: None',
    commonAuthorityStatus: 'N',
    contractAuthorityStatus: 'N',
    brokerAuthorityStatus: 'N',
    entityType: 'CARRIER',
  }),
  'ACTIVE carrier + None OA forces intrastate'
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
  'NOT AUTHORIZED label forces intrastate for non-broker'
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

// --- Broker exception (USDOT 3583108 pattern) ---
assert(isFmcsaBrokerEntity('BROKER'), 'BROKER entity type detected');
assert(isFmcsaBrokerEntity('HHG Broker'), 'HHG Broker detected');
assert(isFmcsaBrokerEntity('Property Broker'), 'Property Broker detected');
assert(!isFmcsaBrokerEntity('CARRIER'), 'CARRIER is not broker-only');
assert(
  !isFmcsaBrokerEntity('CARRIER/BROKER'),
  'CARRIER/BROKER mixed type does not get pure-broker exception'
);

assert(
  isActiveBrokerInterstatePath({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    entityType: 'BROKER',
    authorityStatus: 'NOT AUTHORIZED',
    commonAuthorityStatus: 'N',
    contractAuthorityStatus: 'N',
    brokerAuthorityStatus: 'N',
  }),
  'ACTIVE broker is interstate path'
);

// American Moving Solutions LLC — USDOT 3583108
assert(
  !shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    entityType: 'BROKER',
    authorityStatus: 'NOT AUTHORIZED',
    commonAuthorityStatus: 'N',
    contractAuthorityStatus: 'N',
    brokerAuthorityStatus: 'N',
  }),
  'USDOT 3583108 pattern: BROKER + ACTIVE + OA Not Authorized → interstate (not local)'
);

assert(
  !shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    entityType: 'Broker',
    authorityStatus: 'Not Authorized',
  }),
  'Broker label (mixed case) + Not Authorized stays interstate'
);

// Carrier + NOT AUTHORIZED still local
assert(
  shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    entityType: 'CARRIER',
    authorityStatus: 'NOT AUTHORIZED',
    commonAuthorityStatus: 'N',
    contractAuthorityStatus: 'N',
    brokerAuthorityStatus: 'N',
  }),
  'ACTIVE carrier + OA Not Authorized → local only'
);

// Entity from fmcsa_raw only
assert(
  !shouldForceIntrastateFromAuthority({
    usdotStatus: 'ACTIVE',
    allowedToOperate: 'Y',
    authorityStatus: 'NOT AUTHORIZED',
    fmcsaRaw: {
      entityType: 'BROKER',
      commonAuthorityStatus: 'N',
      contractAuthorityStatus: 'N',
      brokerAuthorityStatus: 'N',
      allowedToOperate: 'Y',
    },
  }),
  'entityType from fmcsa_raw BROKER stays interstate'
);

if (process.exitCode) {
  console.error('\nAuthority routing checks failed.');
  process.exit(1);
}
console.log('\nAll authority routing checks passed.');
