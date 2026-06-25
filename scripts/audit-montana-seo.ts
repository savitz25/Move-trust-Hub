/**
 * Full SEO / E-E-A-T audit for Montana local movers directory.
 * Run: npx tsx scripts/audit-montana-seo.ts
 */
import { montanaCountyResearch } from '../data/montana-county-research';
import { getMontanaCountyTestimonials } from '../data/montana-county-testimonials';
import { getMontanaNearbyCounties } from '../lib/local-movers/montana-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  yellowstone: 10,
  gallatin: 10,
  missoula: 10,
};
const DEFAULT_TARGET = 5;
const EXPECTED_COUNT = 25;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(montanaCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('montana', slug);
  const result = getMoversForCounty('montana', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!montanaCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getMontanaCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getMontanaNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Montana SEO audit');
console.log('==================');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(montanaCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('montana', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getMontanaCountyTestimonials(slug).length}, nearby ${getMontanaNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ Montana curated counties meet full curation standard (${EXPECTED_COUNT}/${EXPECTED_COUNT}).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}