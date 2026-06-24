/**
 * Full SEO / E-E-A-T audit for Rhode Island local movers directory.
 * Run: npx tsx scripts/audit-rhode-island-seo.ts
 */
import { rhodeIslandCountyResearch } from '../data/rhode-island-county-research';
import { getRhodeIslandCountyTestimonials } from '../data/rhode-island-county-testimonials';
import { getRhodeIslandNearbyCounties } from '../lib/local-movers/rhode-island-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const issues: string[] = [];
const curatedSlugs = Object.keys(rhodeIslandCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('rhode-island', slug);
  const result = getMoversForCounty('rhode-island', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < DEFAULT_TARGET) {
    issues.push(`movers<${DEFAULT_TARGET}: ${slug} (${moverCount})`);
  }
  if (!rhodeIslandCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getRhodeIslandCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getRhodeIslandNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

const researchCount = Object.keys(rhodeIslandCountyResearch).length;
if (researchCount !== 5) {
  issues.push(`research count: ${researchCount} (expected 5)`);
}

console.log('Rhode Island SEO audit');
console.log('======================');
console.log(`Curated counties: ${curatedSlugs.length}`);
console.log(`Research entries: ${researchCount}`);

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('rhode-island', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${DEFAULT_TARGET}), testimonials ${getRhodeIslandCountyTestimonials(slug).length}, nearby ${getRhodeIslandNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Rhode Island meets full curation standard (5/5 counties).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}