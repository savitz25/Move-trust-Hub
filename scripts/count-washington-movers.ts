import { washingtonCountyResearch } from '../data/washington-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  king: 12,
  snohomish: 10,
  pierce: 10,
  spokane: 9,
};
const DEFAULT_TARGET = 6;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const underTarget: string[] = [];

const curatedSlugs = Object.keys(washingtonCountyResearch).sort();
console.log(`Washington curated counties: ${curatedSlugs.length}`);
for (const slug of curatedSlugs) {
  const n = getMoversForCounty('washington', slug)?.movers.length ?? 0;
  const target = getTarget(slug);
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Washington curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}