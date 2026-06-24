/**
 * Full SEO / E-E-A-T audit for Washington local movers directory.
 * Run: npx tsx scripts/audit-washington-seo.ts
 */
import { washingtonCountyResearch } from '../data/washington-county-research';
import { getWashingtonCountyTestimonials } from '../data/washington-county-testimonials';
import { getWashingtonNearbyCounties } from '../lib/local-movers/washington-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const issues: string[] = [];
const curatedSlugs = Object.keys(washingtonCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('washington', slug);
  const result = getMoversForCounty('washington', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < DEFAULT_TARGET) {
    issues.push(`movers<${DEFAULT_TARGET}: ${slug} (${moverCount})`);
  }
  if (!washingtonCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getWashingtonCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getWashingtonNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Washington SEO audit');
console.log('==============');
console.log(`Curated counties: ${curatedSlugs.length}`);
console.log(`Research entries: ${Object.keys(washingtonCountyResearch).length}`);

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('washington', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${DEFAULT_TARGET}), testimonials ${getWashingtonCountyTestimonials(slug).length}, nearby ${getWashingtonNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Washington curated counties meet full curation standard.');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}