/**
 * Full SEO / E-E-A-T audit for District of Columbia local movers directory.
 * Run: npx tsx scripts/audit-district-of-columbia-seo.ts
 *
 * DC is a federal district with one jurisdiction — treated as a premium large-market hub.
 */
import { districtOfColumbiaCountyResearch } from '../data/district-of-columbia-county-research';
import { getDistrictOfColumbiaCountyTestimonials } from '../data/district-of-columbia-county-testimonials';
import { getDistrictOfColumbiaNearbyCounties } from '../lib/local-movers/district-of-columbia-nearby';
import { districtOfColumbiaCounties } from '../lib/local-movers/geography/district-of-columbia';
import { getMoversForCounty } from '../lib/local-movers/index';

const DC_SLUG = 'district-of-columbia';
const TARGET_MOVERS = 15;

const issues: string[] = [];
const county = districtOfColumbiaCounties[0];
const result = getMoversForCounty('district-of-columbia', DC_SLUG);
const moverCount = result?.movers.length ?? 0;

if (moverCount < 10) issues.push(`movers<10: ${DC_SLUG} (${moverCount})`);
if (moverCount < TARGET_MOVERS) issues.push(`movers<${TARGET_MOVERS}: ${DC_SLUG} (${moverCount})`);

if (!districtOfColumbiaCountyResearch[DC_SLUG]) {
  issues.push(`no research: ${DC_SLUG}`);
}
if (getDistrictOfColumbiaCountyTestimonials(DC_SLUG).length < 3) {
  issues.push(`testimonials<3: ${DC_SLUG}`);
}
if (getDistrictOfColumbiaNearbyCounties(DC_SLUG).length === 0) {
  issues.push(`no nearby: ${DC_SLUG}`);
}
if (result?.isRegionalFallback) {
  issues.push(`regional fallback: ${DC_SLUG}`);
}
if (!county?.seat) {
  issues.push('missing county seat');
}

const researchCount = Object.keys(districtOfColumbiaCountyResearch).length;
if (researchCount !== 1) {
  issues.push(`research count: ${researchCount} (expected 1)`);
}

console.log('District of Columbia SEO audit');
console.log('==============================');
console.log(`Jurisdiction: ${county?.name ?? DC_SLUG}`);
console.log(`Research entries: ${researchCount}`);
console.log(`Movers: ${moverCount} (target ${TARGET_MOVERS})`);
console.log(`Testimonials: ${getDistrictOfColumbiaCountyTestimonials(DC_SLUG).length}`);
console.log(`Nearby metro links: ${getDistrictOfColumbiaNearbyCounties(DC_SLUG).length}`);
console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(
    '\n✓ District of Columbia meets full curation standard (premium large-market hub).'
  );
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}