/**
 * SEO / E-E-A-T audit for Massachusetts local movers directory (batch 1).
 * Run: npx tsx scripts/audit-massachusetts-seo.ts
 */
import { massachusettsCountyResearch } from '../data/massachusetts-county-research';
import { getMassachusettsCountyTestimonials } from '../data/massachusetts-county-testimonials';
import { getMassachusettsNearbyCounties } from '../lib/local-movers/massachusetts-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const issues: string[] = [];
const curatedSlugs = Object.keys(massachusettsCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('massachusetts', slug);
  const result = getMoversForCounty('massachusetts', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < DEFAULT_TARGET) {
    issues.push(`movers<${DEFAULT_TARGET}: ${slug} (${moverCount})`);
  }
  if (!massachusettsCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getMassachusettsCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getMassachusettsNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

const researchCount = Object.keys(massachusettsCountyResearch).length;
if (researchCount !== 3) {
  issues.push(`research count: ${researchCount} (expected 3)`);
}

console.log('Massachusetts SEO audit (batch 1)');
console.log('=================================');
console.log(`Curated counties: ${curatedSlugs.length}`);
console.log(`Research entries: ${researchCount}`);

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('massachusetts', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${DEFAULT_TARGET}), testimonials ${getMassachusettsCountyTestimonials(slug).length}, nearby ${getMassachusettsNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Massachusetts batch 1 meets full curation standard (3/3 counties).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}