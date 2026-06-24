/**
 * Full SEO / E-E-A-T audit for Maryland local movers directory — batch 1.
 * Run: npx tsx scripts/audit-maryland-seo.ts
 */
import { generatedCounties } from '../data/generated/index';
import { marylandCountyResearch } from '../data/maryland-county-research';
import { getMarylandCountyTestimonials } from '../data/maryland-county-testimonials';
import { getMarylandNearbyCounties } from '../lib/local-movers/maryland-nearby';
import { applyMarylandCountyOverrides } from '../lib/local-movers/geography/maryland-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const BATCH1 = new Set(['montgomery', 'prince-georges', 'baltimore']);
const TARGET = 10;

const counties = generatedCounties
  .filter((c) => c.stateSlug === 'maryland' && BATCH1.has(c.slug))
  .map(applyMarylandCountyOverrides);

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
if (researchCount !== 3) {
  issues.push(`research count: ${researchCount} (expected 3)`);
}

console.log('Maryland SEO audit (batch 1)');
console.log('============================');
console.log(`Counties: ${counties.length}`);
console.log(`Research entries: ${researchCount}`);

for (const c of counties) {
  const n = getMoversForCounty('maryland', c.slug)?.movers.length ?? 0;
  console.log(
    `  ${c.slug}: ${n} movers (target ${TARGET}), testimonials ${getMarylandCountyTestimonials(c.slug).length}, nearby ${getMarylandNearbyCounties(c.slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Maryland batch 1 meets full curation standard (3/3 counties).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}