import { connecticutCounties } from '../lib/local-movers/geography/connecticut';
import { getMoversForCounty } from '../lib/local-movers/index';

const TARGET = 10;

const underTarget: string[] = [];

console.log(`Connecticut curated regions: ${connecticutCounties.length}`);
for (const c of connecticutCounties) {
  const n = getMoversForCounty('connecticut', c.slug)?.movers.length ?? 0;
  console.log(`  ${c.slug}: ${n} movers (target ${TARGET})`);
  if (n < TARGET) underTarget.push(`${c.slug}: ${n}/${TARGET}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Connecticut curated regions meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}