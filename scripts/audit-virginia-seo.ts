/**
 * Full SEO / E-E-A-T audit for Virginia local movers directory.
 * Run: npx tsx scripts/audit-virginia-seo.ts
 */
import { generatedCounties } from '../data/generated/index';
import { virginiaCountyResearch } from '../data/virginia-county-research';
import { getVirginiaCountyTestimonials } from '../data/virginia-county-testimonials';
import { getVirginiaNearbyCounties } from '../lib/local-movers/virginia-nearby';
import { applyVirginiaCountyOverrides } from '../lib/local-movers/geography/virginia-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const MAJOR = new Set([
  'fairfax',
  'loudoun',
  'prince-william',
  'arlington',
  'alexandria',
  'virginia-beach',
  'norfolk',
  'chesapeake',
  'richmond',
  'henrico',
  'chesterfield',
  'newport-news',
  'hampton',
  'stafford',
  'spotsylvania',
  'roanoke',
  'roanoke-county',
  'salem',
]);

const counties = generatedCounties
  .filter((c) => c.stateSlug === 'virginia')
  .map(applyVirginiaCountyOverrides);

const issues: string[] = [];
let fairfaxCount = 0;

for (const c of counties) {
  const result = getMoversForCounty('virginia', c.slug);
  const n = result?.movers.length ?? 0;
  if (c.slug === 'fairfax') fairfaxCount = n;

  if (n < 5) issues.push(`movers<5: ${c.slug} (${n})`);
  if (MAJOR.has(c.slug) && n < 8) issues.push(`major<8: ${c.slug} (${n})`);
  if (MAJOR.has(c.slug) && n < 10) issues.push(`major<10: ${c.slug} (${n})`);

  if (!virginiaCountyResearch[c.slug]) issues.push(`no research: ${c.slug}`);
  if (getVirginiaCountyTestimonials(c.slug).length < 3) {
    issues.push(`testimonials<3: ${c.slug}`);
  }
  if (getVirginiaNearbyCounties(c.slug).length === 0) {
    issues.push(`no nearby: ${c.slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${c.slug}`);
  }
}

const researchCount = Object.keys(virginiaCountyResearch).length;
const expected = counties.length;
if (researchCount !== expected) {
  issues.push(`research count: ${researchCount} (expected ${expected})`);
}

console.log('Virginia SEO audit');
console.log('==================');
console.log(`Localities: ${counties.length}`);
console.log(`Research entries: ${researchCount}`);
console.log(`Fairfax movers: ${fairfaxCount}`);
console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(
    '\n✓ Virginia meets full curation standard (movers, research, testimonials, nearby).'
  );
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}