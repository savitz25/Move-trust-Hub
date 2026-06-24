import { generatedCounties } from '../data/generated/index';
import { applyDelawareCountyOverrides } from '../lib/local-movers/geography/delaware-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const deCounties = generatedCounties
  .filter((c) => c.stateSlug === 'delaware')
  .map(applyDelawareCountyOverrides);

const under10: string[] = [];

for (const c of deCounties) {
  const n = getMoversForCounty('delaware', c.slug)?.movers.length ?? 0;
  if (n < 10) under10.push(`${c.slug}: ${n}`);
}

console.log(`Delaware counties: ${deCounties.length}`);
for (const c of deCounties) {
  const n = getMoversForCounty('delaware', c.slug)?.movers.length ?? 0;
  console.log(`  ${c.slug}: ${n} movers`);
}

if (under10.length === 0) {
  console.log('\n✓ All Delaware counties meet 10-mover target.');
} else {
  console.error('\n✗ Under 10:', under10.join(', '));
  process.exit(1);
}