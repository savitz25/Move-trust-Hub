/**
 * Full SEO / E-E-A-T audit for Minnesota local movers directory (11 curated counties).
 * Run: npx tsx scripts/audit-minnesota-seo.ts
 */
import { minnesotaCountyResearch } from '../data/minnesota-county-research';
import { getMinnesotaCountyTestimonials } from '../data/minnesota-county-testimonials';
import { getMinnesotaNearbyCounties } from '../lib/local-movers/minnesota-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  hennepin: 10,
  ramsey: 10,
};
const DEFAULT_TARGET = 5;
const EXPECTED_COUNT = 37;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(minnesotaCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('minnesota', slug);
  const result = getMoversForCounty('minnesota', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!minnesotaCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getMinnesotaCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getMinnesotaNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Minnesota SEO audit');
console.log('====================');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(minnesotaCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('minnesota', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getMinnesotaCountyTestimonials(slug).length}, nearby ${getMinnesotaNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(
    `\n✓ Minnesota curated counties meet full curation standard (${EXPECTED_COUNT}/${EXPECTED_COUNT}).`
  );
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}