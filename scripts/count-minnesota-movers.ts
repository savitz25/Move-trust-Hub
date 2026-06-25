import { minnesotaCountyResearch } from '../data/minnesota-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  hennepin: 13,
  ramsey: 13,
};
const SECONDARY_TARGETS: Record<string, number> = {
  dakota: 10,
  anoka: 10,
  washington: 10,
  scott: 10,
  carver: 10,
  olmsted: 10,
  'st-louis': 9,
};
const DEFAULT_TARGET = 5;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? SECONDARY_TARGETS[slug] ?? DEFAULT_TARGET;
}

const curatedSlugs = Object.keys(minnesotaCountyResearch).sort();
console.log(`Minnesota curated counties: ${curatedSlugs.length}`);
const underTarget: string[] = [];

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('minnesota', slug)?.movers.length ?? 0;
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Minnesota curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}