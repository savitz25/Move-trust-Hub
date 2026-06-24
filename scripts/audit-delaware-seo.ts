/**
 * Full SEO / E-E-A-T audit for Delaware local movers directory.
 * Run: npx tsx scripts/audit-delaware-seo.ts
 */
import { generatedCounties } from '../data/generated/index';
import { delawareCountyResearch } from '../data/delaware-county-research';
import { getDelawareCountyTestimonials } from '../data/delaware-county-testimonials';
import { getDelawareNearbyCounties } from '../lib/local-movers/delaware-nearby';
import { applyDelawareCountyOverrides } from '../lib/local-movers/geography/delaware-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const TARGETS: Record<string, number> = {
  'new-castle': 12,
  sussex: 8,
  kent: 8,
};

const counties = generatedCounties
  .filter((c) => c.stateSlug === 'delaware')
  .map(applyDelawareCountyOverrides);

const issues: string[] = [];

for (const c of counties) {
  const result = getMoversForCounty('delaware', c.slug);
  const moverCount = result?.movers.length ?? 0;
  const target = TARGETS[c.slug] ?? 8;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${c.slug} (${moverCount})`);
  }
  if (!delawareCountyResearch[c.slug]) {
    issues.push(`no research: ${c.slug}`);
  }
  if (getDelawareCountyTestimonials(c.slug).length < 3) {
    issues.push(`testimonials<3: ${c.slug}`);
  }
  if (getDelawareNearbyCounties(c.slug).length < 3) {
    issues.push(`nearby<3: ${c.slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${c.slug}`);
  }
  if (!c.seat) {
    issues.push(`missing seat: ${c.slug}`);
  }
}

const researchCount = Object.keys(delawareCountyResearch).length;
if (researchCount !== 3) {
  issues.push(`research count: ${researchCount} (expected 3)`);
}

console.log('Delaware SEO audit');
console.log('==================');
console.log(`Counties: ${counties.length}`);
console.log(`Research entries: ${researchCount}`);

for (const c of counties) {
  const n = getMoversForCounty('delaware', c.slug)?.movers.length ?? 0;
  console.log(
    `  ${c.slug}: ${n} movers (target ${TARGETS[c.slug] ?? 8}), testimonials ${getDelawareCountyTestimonials(c.slug).length}, nearby ${getDelawareNearbyCounties(c.slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Delaware meets full curation standard (3/3 counties).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}