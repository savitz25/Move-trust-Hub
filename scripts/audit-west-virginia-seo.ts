/**
 * Full SEO / E-E-A-T audit for West Virginia local movers directory.
 * Run: npx tsx scripts/audit-west-virginia-seo.ts
 */
import { generatedCounties } from '../data/generated/index';
import { westVirginiaCountyResearch } from '../data/west-virginia-county-research';
import { getWestVirginiaCountyTestimonials } from '../data/west-virginia-county-testimonials';
import { getWestVirginiaNearbyCounties } from '../lib/local-movers/west-virginia-nearby';
import { applyWestVirginiaCountyOverrides } from '../lib/local-movers/geography/west-virginia-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const MAJOR = new Set([
  'kanawha',
  'berkeley',
  'monongalia',
  'cabell',
  'wood',
  'raleigh',
  'jefferson',
  'harrison',
  'mercer',
  'putnam',
  'marion',
  'ohio',
  'fayette',
  'wayne',
  'preston',
]);

const counties = generatedCounties
  .filter((c) => c.stateSlug === 'west-virginia')
  .map(applyWestVirginiaCountyOverrides);

const issues: string[] = [];
let kanawhaCount = 0;

for (const c of counties) {
  const result = getMoversForCounty('west-virginia', c.slug);
  const n = result?.movers.length ?? 0;
  if (c.slug === 'kanawha') kanawhaCount = n;

  if (n < 5) issues.push(`movers<5: ${c.slug} (${n})`);
  if (MAJOR.has(c.slug) && n < 8) issues.push(`major<8: ${c.slug} (${n})`);
  if (MAJOR.has(c.slug) && n < 10) issues.push(`major<10: ${c.slug} (${n})`);

  if (!westVirginiaCountyResearch[c.slug]) issues.push(`no research: ${c.slug}`);
  if (getWestVirginiaCountyTestimonials(c.slug).length < 3) {
    issues.push(`testimonials<3: ${c.slug}`);
  }
  if (getWestVirginiaNearbyCounties(c.slug).length === 0) {
    issues.push(`no nearby: ${c.slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${c.slug}`);
  }
}

const researchCount = Object.keys(westVirginiaCountyResearch).length;
if (researchCount !== 55) {
  issues.push(`research count: ${researchCount} (expected 55)`);
}

console.log('West Virginia SEO audit');
console.log('=======================');
console.log(`Counties: ${counties.length}`);
console.log(`Research entries: ${researchCount}`);
console.log(`Kanawha movers: ${kanawhaCount}`);
console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(
    '\n✓ West Virginia meets full curation standard (movers, research, testimonials, nearby).'
  );
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}