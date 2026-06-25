import { southDakotaCountyResearch } from '../data/south-dakota-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  minnehaha: 11,
  pennington: 10,
};
const SECONDARY_TARGETS: Record<string, number> = {
  brown: 8,
  codington: 8,
  lincoln: 8,
};
const DEFAULT_TARGET = 5;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? SECONDARY_TARGETS[slug] ?? DEFAULT_TARGET;
}

const curatedSlugs = Object.keys(southDakotaCountyResearch).sort();
console.log(`South Dakota curated counties: ${curatedSlugs.length}`);
const underTarget: string[] = [];

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('south-dakota', slug)?.movers.length ?? 0;
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All South Dakota curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}