/**
 * Full SEO / E-E-A-T audit for Hawaii local movers directory.
 * Run: npx tsx scripts/audit-hawaii-seo.ts
 */
import { hawaiiCountyResearch } from '../data/hawaii-county-research';
import { getHawaiiCountyTestimonials } from '../data/hawaii-county-testimonials';
import { getHawaiiNearbyCounties } from '../lib/local-movers/hawaii-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const issues: string[] = [];
const curatedSlugs = Object.keys(hawaiiCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('hawaii', slug);
  const result = getMoversForCounty('hawaii', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < DEFAULT_TARGET) {
    issues.push(`movers<${DEFAULT_TARGET}: ${slug} (${moverCount})`);
  }
  if (!hawaiiCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getHawaiiCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getHawaiiNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

const researchCount = Object.keys(hawaiiCountyResearch).length;
if (researchCount !== 5) {
  issues.push(`research count: ${researchCount} (expected 5)`);
}

console.log('Hawaii SEO audit');
console.log('================');
console.log(`Curated counties: ${curatedSlugs.length}`);
console.log(`Research entries: ${researchCount}`);

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('hawaii', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${DEFAULT_TARGET}), testimonials ${getHawaiiCountyTestimonials(slug).length}, nearby ${getHawaiiNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Hawaii meets full curation standard (5/5 counties).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}