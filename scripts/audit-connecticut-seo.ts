/**
 * Full SEO / E-E-A-T audit for Connecticut local movers directory.
 * Run: npx tsx scripts/audit-connecticut-seo.ts
 */
import { connecticutCountyResearch } from '../data/connecticut-county-research';
import { getConnecticutCountyTestimonials } from '../data/connecticut-county-testimonials';
import { getConnecticutNearbyCounties } from '../lib/local-movers/connecticut-nearby';
import { connecticutCounties } from '../lib/local-movers/geography/connecticut';
import { getMoversForCounty } from '../lib/local-movers/index';

const TARGET = 10;
const issues: string[] = [];

for (const c of connecticutCounties) {
  const result = getMoversForCounty('connecticut', c.slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < TARGET) {
    issues.push(`movers<${TARGET}: ${c.slug} (${moverCount})`);
  }
  if (!connecticutCountyResearch[c.slug]) {
    issues.push(`no research: ${c.slug}`);
  }
  if (getConnecticutCountyTestimonials(c.slug).length < 3) {
    issues.push(`testimonials<3: ${c.slug}`);
  }
  if (getConnecticutNearbyCounties(c.slug).length < 3) {
    issues.push(`nearby<3: ${c.slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${c.slug}`);
  }
  if (!c.seat) {
    issues.push(`missing seat: ${c.slug}`);
  }
}

const researchCount = Object.keys(connecticutCountyResearch).length;
if (researchCount !== 9) {
  issues.push(`research count: ${researchCount} (expected 9)`);
}

console.log('Connecticut SEO audit');
console.log('=====================');
console.log(`Curated regions: ${connecticutCounties.length}`);
console.log(`Research entries: ${researchCount}`);

for (const c of connecticutCounties) {
  const n = getMoversForCounty('connecticut', c.slug)?.movers.length ?? 0;
  console.log(
    `  ${c.slug}: ${n} movers (target ${TARGET}), testimonials ${getConnecticutCountyTestimonials(c.slug).length}, nearby ${getConnecticutNearbyCounties(c.slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Connecticut meets full curation standard (9/9 planning regions).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}