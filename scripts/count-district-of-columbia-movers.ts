import { getMoversForCounty } from '../lib/local-movers/index';

const result = getMoversForCounty('district-of-columbia', 'district-of-columbia');
const count = result?.movers.length ?? 0;

console.log(`District of Columbia movers: ${count}`);

if (count === 15) {
  console.log('✓ DC meets 15-mover large-market target.');
} else {
  console.error(`✗ Expected 15 movers, found ${count}`);
  process.exit(1);
}