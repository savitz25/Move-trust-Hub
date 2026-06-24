import { newMexicoCountyResearch } from '../data/new-mexico-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  bernalillo: 11,
  'santa-fe': 9,
  'doa-ana': 9,
};
const DEFAULT_TARGET = 5;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const curatedSlugs = Object.keys(newMexicoCountyResearch).sort();
console.log(`New Mexico curated counties: ${curatedSlugs.length}`);
const underTarget: string[] = [];

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('new-mexico', slug)?.movers.length ?? 0;
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All New Mexico curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}