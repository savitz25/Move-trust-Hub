/**
 * Full SEO / E-E-A-T audit for Oregon local movers directory.
 * Run: npx tsx scripts/audit-oregon-seo.ts
 */
import { oregonCountyResearch } from '../data/oregon-county-research';
import { getOregonCountyTestimonials } from '../data/oregon-county-testimonials';
import { getOregonNearbyCounties } from '../lib/local-movers/oregon-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const issues: string[] = [];
const curatedSlugs = Object.keys(oregonCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('oregon', slug);
  const result = getMoversForCounty('oregon', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < DEFAULT_TARGET) {
    issues.push(`movers<${DEFAULT_TARGET}: ${slug} (${moverCount})`);
  }
  if (!oregonCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getOregonCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getOregonNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Oregon SEO audit');
console.log('==============');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(oregonCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== 25) {
  issues.push(`research count: ${researchCount} (expected 25)`);
}

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('oregon', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${DEFAULT_TARGET}), testimonials ${getOregonCountyTestimonials(slug).length}, nearby ${getOregonNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Oregon curated counties meet full curation standard (25/36 batches 1–2).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}