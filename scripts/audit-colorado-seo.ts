/**
 * Full SEO / E-E-A-T audit for Colorado local movers directory.
 * Run: npx tsx scripts/audit-colorado-seo.ts
 */
import { coloradoCountyResearch } from '../data/colorado-county-research';
import { getColoradoCountyTestimonials } from '../data/colorado-county-testimonials';
import { getColoradoNearbyCounties } from '../lib/local-movers/colorado-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
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
const EXPECTED_COUNT = 64;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(coloradoCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('colorado', slug);
  const result = getMoversForCounty('colorado', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!coloradoCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getColoradoCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getColoradoNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Colorado SEO audit');
console.log('==================');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(coloradoCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('colorado', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getColoradoCountyTestimonials(slug).length}, nearby ${getColoradoNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ Colorado curated counties meet full curation standard (${EXPECTED_COUNT}/${EXPECTED_COUNT}).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}