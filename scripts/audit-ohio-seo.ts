/**
 * SEO / E-E-A-T audit for curated Ohio local movers counties.
 * Run: npx tsx scripts/audit-ohio-seo.ts
 */
import { ohioCountyResearch } from '../data/ohio-county-research';
import { getOhioCountyTestimonials } from '../data/ohio-county-testimonials';
import { getOhioNearbyCounties } from '../lib/local-movers/ohio-nearby';
import { getMoversForCounty } from '../lib/local-movers/index';

const curatedSlugs = Object.keys(ohioCountyResearch);
const issues: string[] = [];

for (const slug of curatedSlugs) {
  const result = getMoversForCounty('ohio', slug);
  const n = result?.movers.length ?? 0;

  if (n < 10) issues.push(`movers<10: ${slug} (${n})`);
  if (getOhioCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getOhioNearbyCounties(slug).length === 0) {
    issues.push(`no nearby: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
}

console.log('Ohio SEO audit');
console.log('==============');
console.log(`Curated counties: ${curatedSlugs.length}`);
console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Ohio curated counties meet full curation standard.');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}