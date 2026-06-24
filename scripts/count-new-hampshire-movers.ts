import { newHampshireCountyResearch } from '../data/new-hampshire-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  hillsborough: 10,
  rockingham: 9,
};
const DEFAULT_TARGET = 7;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const underTarget: string[] = [];

const curatedSlugs = Object.keys(newHampshireCountyResearch).sort();
console.log(`New Hampshire curated counties: ${curatedSlugs.length}`);
for (const slug of curatedSlugs) {
  const n = getMoversForCounty('new-hampshire', slug)?.movers.length ?? 0;
  const target = getTarget(slug);
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All New Hampshire counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}