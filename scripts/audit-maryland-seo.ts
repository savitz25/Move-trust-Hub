/**
 * Full SEO / E-E-A-T audit for Maryland local movers directory.
 * Run: npx tsx scripts/audit-maryland-seo.ts
 */
import { marylandCountyResearch } from '../data/maryland-county-research';
import { getMarylandCountyTestimonials } from '../data/maryland-county-testimonials';
import { getMarylandNearbyCounties } from '../lib/local-movers/maryland-nearby';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const CURATED_SLUGS = new Set(Object.keys(marylandCountyResearch));
const TARGET = 10;

const counties = getCountiesForState('maryland').filter((c) =>
  CURATED_SLUGS.has(c.slug)
);

const issues: string[] = [];

for (const c of counties) {
  const result = getMoversForCounty('maryland', c.slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < TARGET) {
    issues.push(`movers<${TARGET}: ${c.slug} (${moverCount})`);
  }
  if (!marylandCountyResearch[c.slug]) {
    issues.push(`no research: ${c.slug}`);
  }
  if (getMarylandCountyTestimonials(c.slug).length < 3) {
    issues.push(`testimonials<3: ${c.slug}`);
  }
  if (getMarylandNearbyCounties(c.slug).length < 3) {
    issues.push(`nearby<3: ${c.slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${c.slug}`);
  }
  if (!c.seat) {
    issues.push(`missing seat: ${c.slug}`);
  }
}

const researchCount = Object.keys(marylandCountyResearch).length;
if (researchCount !== CURATED_SLUGS.size) {
  issues.push(`research count: ${researchCount} (expected ${CURATED_SLUGS.size})`);
}

console.log('Maryland SEO audit');
console.log('==================');
console.log(`Curated counties: ${counties.length}`);
console.log(`Research entries: ${researchCount}`);

for (const c of counties.sort((a, b) => a.slug.localeCompare(b.slug))) {
  const n = getMoversForCounty('maryland', c.slug)?.movers.length ?? 0;
  console.log(
    `  ${c.slug}: ${n} movers (target ${TARGET}), testimonials ${getMarylandCountyTestimonials(c.slug).length}, nearby ${getMarylandNearbyCounties(c.slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ Maryland meets full curation standard (${researchCount}/${researchCount} counties).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}