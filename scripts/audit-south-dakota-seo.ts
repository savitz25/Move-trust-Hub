/**
 * Full SEO / E-E-A-T audit for South Dakota local movers directory (full 66 counties).
 * Run: npx tsx scripts/audit-south-dakota-seo.ts
 */
import { southDakotaCountyResearch } from '../data/south-dakota-county-research';
import { getSouthDakotaCountyTestimonials } from '../data/south-dakota-county-testimonials';
import { getSouthDakotaNearbyCounties } from '../lib/local-movers/south-dakota-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  minnehaha: 10,
  pennington: 10,
};
const DEFAULT_TARGET = 10;
const EXPECTED_COUNT = 66;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(southDakotaCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('south-dakota', slug);
  const result = getMoversForCounty('south-dakota', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!southDakotaCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getSouthDakotaCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getSouthDakotaNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('South Dakota SEO audit');
console.log('======================');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(southDakotaCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('south-dakota', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getSouthDakotaCountyTestimonials(slug).length}, nearby ${getSouthDakotaNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ South Dakota curated counties meet full curation standard (${EXPECTED_COUNT}/${EXPECTED_COUNT}).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}