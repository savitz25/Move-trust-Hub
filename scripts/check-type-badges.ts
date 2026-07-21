import { resolveCompanyTypeBadges } from '../lib/companies/type-badges';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL', msg);
    process.exitCode = 1;
  } else {
    console.log('ok', msg);
  }
}

const local = resolveCompanyTypeBadges({ serviceScope: 'intrastate' });
assert(local[0]?.label === 'Local Mover', 'intrastate → Local Mover');

const carrier = resolveCompanyTypeBadges({
  serviceScope: 'interstate',
  entityType: 'CARRIER',
});
assert(carrier[0]?.label === 'Carrier', 'CARRIER → Carrier');

const broker = resolveCompanyTypeBadges({
  serviceScope: 'interstate',
  entityType: 'BROKER',
});
assert(broker[0]?.label === 'Broker', 'BROKER → Broker');

const mixed = resolveCompanyTypeBadges({
  serviceScope: 'interstate',
  entityType: 'CARRIER/BROKER',
});
assert(mixed[0]?.label === 'Carrier/Broker', 'CARRIER/BROKER → Carrier/Broker');

const fromServices = resolveCompanyTypeBadges({
  serviceScope: 'interstate',
  services: ['Broker'],
});
assert(fromServices[0]?.label === 'Broker', 'services Broker → Broker');

if (process.exitCode) process.exit(1);
console.log('\nAll type badge checks passed.');
