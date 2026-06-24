/**
 * Full SEO / E-E-A-T audit for Pennsylvania local movers directory.
 * Run: npx tsx scripts/audit-pennsylvania-seo.ts
 */
import { pennsylvaniaCountyResearch } from '../data/pennsylvania-county-research';
import { getPennsylvaniaCountyTestimonials } from '../data/pennsylvania-county-testimonials';
import { getPennsylvaniaNearbyCounties } from '../lib/local-movers/pennsylvania-nearby';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const CURATED_SLUGS = new Set(Object.keys(pennsylvaniaCountyResearch));
const TARGET = 10;

const counties = getCountiesForState('pennsylvania').filter((c) =>
  CURATED_SLUGS.has(c.slug)
);

const issues: string[] = [];

for (const c of counties) {
  const result = getMoversForCounty('pennsylvania', c.slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < TARGET) {
    issues.push(`movers<${TARGET}: ${c.slug} (${moverCount})`);
  }
  if (!pennsylvaniaCountyResearch[c.slug]) {
    issues.push(`no research: ${c.slug}`);
  }
  if (getPennsylvaniaCountyTestimonials(c.slug).length < 3) {
    issues.push(`testimonials<3: ${c.slug}`);
  }
  if (getPennsylvaniaNearbyCounties(c.slug).length < 3) {
    issues.push(`nearby<3: ${c.slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${c.slug}`);
  }
  if (!c.seat) {
    issues.push(`missing seat: ${c.slug}`);
  }
}

const researchCount = Object.keys(pennsylvaniaCountyResearch).length;

console.log('Pennsylvania SEO audit');
console.log('====================');
console.log(`Curated counties: ${counties.length}`);
console.log(`Research entries: ${researchCount}`);

for (const c of counties.sort((a, b) => a.slug.localeCompare(b.slug))) {
  const n = getMoversForCounty('pennsylvania', c.slug)?.movers.length ?? 0;
  console.log(
    `  ${c.slug}: ${n} movers (target ${TARGET}), testimonials ${getPennsylvaniaCountyTestimonials(c.slug).length}, nearby ${getPennsylvaniaNearbyCounties(c.slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ Pennsylvania meets full curation standard (${researchCount}/${researchCount} counties).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}