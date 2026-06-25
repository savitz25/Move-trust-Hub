import { coloradoCountyResearch } from '../data/colorado-county-research';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  denver: 12,
  arapahoe: 12,
  jefferson: 12,
  adams: 12,
  douglas: 12,
  'el-paso': 11,
  boulder: 9,
  larimer: 9,
  weld: 9,
};
const DEFAULT_TARGET = 6;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const curatedSlugs = Object.keys(coloradoCountyResearch).sort();
console.log(`Colorado curated counties: ${curatedSlugs.length}`);
const underTarget: string[] = [];

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('colorado', slug)?.movers.length ?? 0;
  console.log(`  ${slug}: ${n} movers (target ${target})`);
  if (n < target) underTarget.push(`${slug}: ${n}/${target}`);
}

if (underTarget.length === 0) {
  console.log('\n✓ All Colorado curated counties meet mover targets.');
} else {
  console.error('\n✗ Under target:', underTarget.join(', '));
  process.exit(1);
}