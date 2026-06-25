/**
 * Full SEO / E-E-A-T audit for Wisconsin local movers directory (batches 1–2 — 30 counties).
 * Run: npx tsx scripts/audit-wisconsin-seo.ts
 */
import { wisconsinCountyResearch } from '../data/wisconsin-county-research';
import { getWisconsinCountyTestimonials } from '../data/wisconsin-county-testimonials';
import { getWisconsinNearbyCounties } from '../lib/local-movers/wisconsin-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  milwaukee: 10,
};
const DEFAULT_TARGET = 5;
const EXPECTED_COUNT = 30;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(wisconsinCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('wisconsin', slug);
  const result = getMoversForCounty('wisconsin', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!wisconsinCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getWisconsinCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getWisconsinNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Wisconsin SEO audit');
console.log('====================');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(wisconsinCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('wisconsin', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getWisconsinCountyTestimonials(slug).length}, nearby ${getWisconsinNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(
    `\n✓ Wisconsin curated counties meet full curation standard (${EXPECTED_COUNT}/${EXPECTED_COUNT}).`
  );
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}