import { connecticutCounties } from '../lib/local-movers/geography/connecticut';
import { getMoversForCounty } from '../lib/local-movers/index';

const TARGETS: Record<string, number> = {
  fairfield: 12,
};

const DEFAULT_TARGET = 8;

const underTarget: string[] = [];

console.log(`Connecticut curated counties: ${connecticutCounties.length}`);
for (const c of connecticutCounties) {
  const n = getMoversForCounty('connecticut', c.slug)?.movers.length ?? 0;
  const target = TARGETS[c.slug] ?? DEFAULT_TARGET;
  console.log(`  ${c.slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${c.slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Connecticut counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}