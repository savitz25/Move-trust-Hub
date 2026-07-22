import {
  resolveCompanyTypeBadges,
  LOCAL_MOVER_BADGE,
  CARRIER_BADGE,
  BROKER_BADGE,
  CARRIER_BROKER_BADGE,
} from '../lib/companies/type-badges';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL', msg);
    process.exitCode = 1;
  } else {
    console.log('ok', msg);
  }
}

assert(
  resolveCompanyTypeBadges({ serviceScope: 'intrastate' })[0]?.id === 'local-mover',
  'intrastate → Local Mover'
);

assert(
  resolveCompanyTypeBadges({
    serviceScope: null,
    usdotNumber: '',
  })[0]?.id === 'local-mover',
  'no scope + no USDOT → Local Mover'
);

assert(
  resolveCompanyTypeBadges({
    serviceScope: 'interstate',
    entityType: 'CARRIER',
    usdotNumber: '1234567',
  })[0]?.label === 'Carrier',
  'CARRIER → Carrier'
);

assert(
  resolveCompanyTypeBadges({
    entityType: 'BROKER',
    usdotNumber: '1234567',
  })[0]?.label === 'Broker',
  'BROKER → Broker'
);

assert(
  resolveCompanyTypeBadges({
    entityType: 'CARRIER/BROKER',
    usdotNumber: '1234567',
  })[0]?.label === 'Carrier/Broker',
  'CARRIER/BROKER → Carrier/Broker'
);

assert(
  resolveCompanyTypeBadges({
    services: ['Broker'],
    usdotNumber: '1234567',
  })[0]?.label === 'Broker',
  'services Broker → Broker'
);

// Directory DTO often omits serviceScope — still show Carrier when USDOT exists
assert(
  resolveCompanyTypeBadges({
    usdotNumber: '1234567',
    entityType: null,
    services: ['Full Service'],
  })[0]?.label === 'Carrier',
  'USDOT + Full Service only → default Carrier'
);

// Directory DTO with entityType from backfill, no serviceScope
assert(
  resolveCompanyTypeBadges({
    entityType: 'Carrier',
    usdotNumber: '3475743',
  })[0]?.id === 'carrier',
  'entityType Carrier without scope → Carrier'
);

assert(
  resolveCompanyTypeBadges({
    fmcsaRaw: {
      brokerAuthorityStatus: 'ACTIVE',
      commonAuthorityStatus: 'NOT AUTHORIZED',
      contractAuthorityStatus: 'NOT AUTHORIZED',
    },
    usdotNumber: '9999999',
  })[0]?.label === 'Broker',
  'fmcsa_raw broker-only → Broker'
);

// Identity checks for exports used by UI
assert(LOCAL_MOVER_BADGE.label === 'Local Mover', 'LOCAL label');
assert(CARRIER_BADGE.label === 'Carrier', 'CARRIER label');
assert(BROKER_BADGE.label === 'Broker', 'BROKER label');
assert(CARRIER_BROKER_BADGE.label === 'Carrier/Broker', 'MIXED label');

if (process.exitCode) process.exit(1);
console.log('\nAll type badge consistency checks passed.');
