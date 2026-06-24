import { vermontCountyResearch } from '../data/vermont-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const CHITTENDEN_TARGET = 8;
const DEFAULT_TARGET = 6;

function getTarget(slug: string): number {
  return slug === 'chittenden' ? CHITTENDEN_TARGET : DEFAULT_TARGET;
}

const underTarget: string[] = [];

const curatedSlugs = Object.keys(vermontCountyResearch).sort();
console.log(`Vermont curated counties: ${curatedSlugs.length}`);
for (const slug of curatedSlugs) {
  const n = getMoversForCounty('vermont', slug)?.movers.length ?? 0;
  const target = getTarget(slug);
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Vermont counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}