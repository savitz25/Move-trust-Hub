import { newMexicoCountyResearch } from '../data/new-mexico-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const curatedSlugs = Object.keys(newMexicoCountyResearch).sort();
console.log(`New Mexico curated counties: ${curatedSlugs.length}`);
const underTarget: string[] = [];

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('new-mexico', slug)?.movers.length ?? 0;
  console.log(`  ${slug}: ${n} movers (target ${DEFAULT_TARGET})`);
  if (n < DEFAULT_TARGET) underTarget.push(`${slug}: ${n}/${DEFAULT_TARGET}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All New Mexico curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}