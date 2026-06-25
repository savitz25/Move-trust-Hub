import { utahCountyResearch } from '../data/utah-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

function getTarget(_slug: string): number {
  return DEFAULT_TARGET;
}

const curatedSlugs = Object.keys(utahCountyResearch).sort();
console.log(`Utah curated counties: ${curatedSlugs.length}`);
const underTarget: string[] = [];

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('utah', slug)?.movers.length ?? 0;
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Utah curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}