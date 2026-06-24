import { generatedCounties } from '../data/generated/index';
import { applyMarylandCountyOverrides } from '../lib/local-movers/geography/maryland-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const TARGETS: Record<string, number> = {
  montgomery: 10,
  'prince-georges': 10,
  baltimore: 10,
};

const mdCounties = generatedCounties
  .filter((c) => c.stateSlug === 'maryland')
  .map(applyMarylandCountyOverrides)
  .filter((c) => TARGETS[c.slug] !== undefined);

const underTarget: string[] = [];

console.log(`Maryland batch-1 counties: ${mdCounties.length}`);
for (const c of mdCounties) {
  const n = getMoversForCounty('maryland', c.slug)?.movers.length ?? 0;
  const target = TARGETS[c.slug] ?? 10;
  console.log(`  ${c.slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${c.slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Maryland batch-1 counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}