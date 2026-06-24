/**
 * Full SEO / E-E-A-T audit for Vermont local movers directory.
 * Run: npx tsx scripts/audit-vermont-seo.ts
 */
import { vermontCountyResearch } from '../data/vermont-county-research';
import { getVermontCountyTestimonials } from '../data/vermont-county-testimonials';
import { getVermontNearbyCounties } from '../lib/local-movers/vermont-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const CHITTENDEN_TARGET = 8;
const DEFAULT_TARGET = 6;

function getTarget(slug: string): number {
  return slug === 'chittenden' ? CHITTENDEN_TARGET : DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(vermontCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('vermont', slug);
  const result = getMoversForCounty('vermont', slug);
  const moverCount = result?.movers.length ?? 0;

  const target = getTarget(slug);
  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!vermontCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getVermontCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getVermontNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

const researchCount = Object.keys(vermontCountyResearch).length;
if (researchCount !== 14) {
  issues.push(`research count: ${researchCount} (expected 14)`);
}

console.log('Vermont SEO audit');
console.log('=================');
console.log(`Curated counties: ${curatedSlugs.length}`);
console.log(`Research entries: ${researchCount}`);

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('vermont', slug)?.movers.length ?? 0;
  const target = getTarget(slug);
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getVermontCountyTestimonials(slug).length}, nearby ${getVermontNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Vermont meets full curation standard (14/14 counties).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}