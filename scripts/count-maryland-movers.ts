import { marylandCountyResearch } from '../data/maryland-county-research';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const TARGET = 10;
const curatedSlugs = new Set(Object.keys(marylandCountyResearch));

const mdCounties = getCountiesForState('maryland').filter((c) =>
  curatedSlugs.has(c.slug)
);

const underTarget: string[] = [];

console.log(`Maryland curated counties: ${mdCounties.length}`);
for (const c of mdCounties.sort((a, b) => a.slug.localeCompare(b.slug))) {
  const n = getMoversForCounty('maryland', c.slug)?.movers.length ?? 0;
  console.log(`  ${c.slug}: ${n} movers (target ${TARGET})`);
  if (n < TARGET) underTarget.push(`${c.slug}: ${n}/${TARGET}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Maryland curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}