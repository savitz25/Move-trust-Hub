/**
 * Full SEO / E-E-A-T audit for Indiana local movers directory.
 * Run: npx tsx scripts/audit-indiana-seo.ts
 */
import { generatedCounties } from '../data/generated/index';
import { getIndianaCountyResearch } from '../data/indiana-county-research';
import { getIndianaCountyTestimonials } from '../data/indiana-county-testimonials';
import { getIndianaNearbyCounties } from '../lib/local-movers/indiana-nearby';
import { applyIndianaCountyOverrides } from '../lib/local-movers/geography/indiana-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const MAJOR = new Set([
  'marion',
  'lake',
  'allen',
  'hamilton',
  'st-joseph',
  'elkhart',
  'hendricks',
  'tippecanoe',
  'vanderburgh',
  'johnson',
  'porter',
  'monroe',
  'madison',
  'clark',
  'delaware',
  'laporte',
  'vigo',
  'hancock',
  'bartholomew',
  'howard',
  'boone',
  'floyd',
]);

const counties = generatedCounties
  .filter((c) => c.stateSlug === 'indiana')
  .map(applyIndianaCountyOverrides);

const issues: string[] = [];
let marionCount = 0;

for (const c of counties) {
  const result = getMoversForCounty('indiana', c.slug);
  const n = result?.movers.length ?? 0;
  if (c.slug === 'marion') marionCount = n;

  if (n < 5) issues.push(`movers<5: ${c.slug} (${n})`);
  if (MAJOR.has(c.slug) && n < 8) issues.push(`major<8: ${c.slug} (${n})`);
  if (c.slug !== 'marion' && MAJOR.has(c.slug) && n < 10) {
    issues.push(`major<10: ${c.slug} (${n})`);
  }
  if (c.slug === 'marion' && n < 12) issues.push(`marion<12: ${c.slug} (${n})`);

  if (!getIndianaCountyResearch(c.slug)) issues.push(`no research: ${c.slug}`);
  if (getIndianaCountyTestimonials(c.slug).length < 3) {
    issues.push(`testimonials<3: ${c.slug}`);
  }
  if (getIndianaNearbyCounties(c.slug).length === 0) {
    issues.push(`no nearby: ${c.slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${c.slug}`);
  }
}

console.log('Indiana SEO audit');
console.log('=================');
console.log(`Counties: ${counties.length}`);
console.log(`Marion movers: ${marionCount}`);
console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Indiana meets full curation standard (movers, research, testimonials, nearby).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}