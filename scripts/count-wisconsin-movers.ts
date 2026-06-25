import { wisconsinCountyResearch } from '../data/wisconsin-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  milwaukee: 12,
  waukesha: 12,
};
const SECONDARY_TARGETS: Record<string, number> = {
  dane: 10,
  brown: 9,
  racine: 9,
  kenosha: 9,
  outagamie: 9,
  winnebago: 9,
};
const DEFAULT_TARGET = 5;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? SECONDARY_TARGETS[slug] ?? DEFAULT_TARGET;
}

const curatedSlugs = Object.keys(wisconsinCountyResearch).sort();
console.log(`Wisconsin curated counties: ${curatedSlugs.length}`);
const underTarget: string[] = [];

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('wisconsin', slug)?.movers.length ?? 0;
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Wisconsin curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}