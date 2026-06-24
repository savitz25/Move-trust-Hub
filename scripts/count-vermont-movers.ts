import { vermontCountyResearch } from '../data/vermont-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const underTarget: string[] = [];

const curatedSlugs = Object.keys(vermontCountyResearch).sort();
console.log(`Vermont curated counties: ${curatedSlugs.length}`);
for (const slug of curatedSlugs) {
  const n = getMoversForCounty('vermont', slug)?.movers.length ?? 0;
  console.log(`  ${slug}: ${n} movers (target ${DEFAULT_TARGET})`);
  if (n < DEFAULT_TARGET) underTarget.push(`${slug}: ${n}/${DEFAULT_TARGET}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Vermont counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}