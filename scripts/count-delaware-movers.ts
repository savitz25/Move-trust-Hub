import { generatedCounties } from '../data/generated/index';
import { applyDelawareCountyOverrides } from '../lib/local-movers/geography/delaware-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const TARGETS: Record<string, number> = {
  'new-castle': 12,
  sussex: 8,
  kent: 8,
};

const deCounties = generatedCounties
  .filter((c) => c.stateSlug === 'delaware')
  .map(applyDelawareCountyOverrides);

const underTarget: string[] = [];

console.log(`Delaware counties: ${deCounties.length}`);
for (const c of deCounties) {
  const n = getMoversForCounty('delaware', c.slug)?.movers.length ?? 0;
  const target = TARGETS[c.slug] ?? 8;
  console.log(`  ${c.slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${c.slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Delaware counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}