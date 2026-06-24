/**
 * Full SEO / E-E-A-T audit for New Hampshire local movers directory.
 * Run: npx tsx scripts/audit-new-hampshire-seo.ts
 */
import { newHampshireCountyResearch } from '../data/new-hampshire-county-research';
import { getNewHampshireCountyTestimonials } from '../data/new-hampshire-county-testimonials';
import { getNewHampshireNearbyCounties } from '../lib/local-movers/new-hampshire-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const issues: string[] = [];
const curatedSlugs = Object.keys(newHampshireCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('new-hampshire', slug);
  const result = getMoversForCounty('new-hampshire', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < DEFAULT_TARGET) {
    issues.push(`movers<${DEFAULT_TARGET}: ${slug} (${moverCount})`);
  }
  if (!newHampshireCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getNewHampshireCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getNewHampshireNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

const researchCount = Object.keys(newHampshireCountyResearch).length;
if (researchCount !== 10) {
  issues.push(`research count: ${researchCount} (expected 10)`);
}

console.log('New Hampshire SEO audit');
console.log('=======================');
console.log(`Curated counties: ${curatedSlugs.length}`);
console.log(`Research entries: ${researchCount}`);

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('new-hampshire', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${DEFAULT_TARGET}), testimonials ${getNewHampshireCountyTestimonials(slug).length}, nearby ${getNewHampshireNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ New Hampshire meets full curation standard (10/10 counties).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}