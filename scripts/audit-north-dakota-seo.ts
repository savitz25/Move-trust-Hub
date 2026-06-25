/**
 * Full SEO / E-E-A-T audit for North Dakota local movers directory (53/53).
 * Run: npx tsx scripts/audit-north-dakota-seo.ts
 */
import { northDakotaCountyResearch } from '../data/north-dakota-county-research';
import { getNorthDakotaCountyTestimonials } from '../data/north-dakota-county-testimonials';
import { getNorthDakotaNearbyCounties } from '../lib/local-movers/north-dakota-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  cass: 10,
  burleigh: 10,
  williams: 10,
};
const DEFAULT_TARGET = 10;
const EXPECTED_COUNT = 53;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(northDakotaCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('north-dakota', slug);
  const result = getMoversForCounty('north-dakota', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!northDakotaCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getNorthDakotaCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getNorthDakotaNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('North Dakota SEO audit');
console.log('========================');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(northDakotaCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('north-dakota', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getNorthDakotaCountyTestimonials(slug).length}, nearby ${getNorthDakotaNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ North Dakota curated counties meet full curation standard (${EXPECTED_COUNT}/${EXPECTED_COUNT}).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}