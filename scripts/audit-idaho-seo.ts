/**
 * Full SEO / E-E-A-T audit for Idaho local movers directory.
 * Run: npx tsx scripts/audit-idaho-seo.ts
 */
import { idahoCountyResearch } from '../data/idaho-county-research';
import { getIdahoCountyTestimonials } from '../data/idaho-county-testimonials';
import { getIdahoNearbyCounties } from '../lib/local-movers/idaho-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;
const EXPECTED_COUNT = 44;

function getTarget(_slug: string): number {
  return DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(idahoCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('idaho', slug);
  const result = getMoversForCounty('idaho', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!idahoCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getIdahoCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getIdahoNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Idaho SEO audit');
console.log('==================');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(idahoCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('idaho', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getIdahoCountyTestimonials(slug).length}, nearby ${getIdahoNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ Idaho curated counties meet full curation standard (${EXPECTED_COUNT}/${EXPECTED_COUNT}).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}