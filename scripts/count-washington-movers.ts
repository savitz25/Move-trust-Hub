import { washingtonCountyResearch } from '../data/washington-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const underTarget: string[] = [];

const curatedSlugs = Object.keys(washingtonCountyResearch).sort();
console.log(`Washington curated counties: ${curatedSlugs.length}`);
for (const slug of curatedSlugs) {
  const n = getMoversForCounty('washington', slug)?.movers.length ?? 0;
  console.log(`  ${slug}: ${n} movers (target ${DEFAULT_TARGET})`);
  if (n < DEFAULT_TARGET) underTarget.push(`${slug}: ${n}/${DEFAULT_TARGET}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Washington curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}