import { alaskaCountyResearch } from '../data/alaska-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  anchorage: 10,
  'fairbanks-north-star': 8,
  'matanuska-susitna': 8,
  'kenai-peninsula': 5,
  juneau: 5,
};
const DEFAULT_TARGET = 5;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const underTarget: string[] = [];

const curatedSlugs = Object.keys(alaskaCountyResearch).sort();
console.log(`Alaska curated boroughs: ${curatedSlugs.length}`);
for (const slug of curatedSlugs) {
  const n = getMoversForCounty('alaska', slug)?.movers.length ?? 0;
  const target = getTarget(slug);
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Alaska major boroughs meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}