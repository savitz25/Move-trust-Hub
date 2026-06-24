/**
 * Full SEO / E-E-A-T audit for Arizona local movers directory.
 * Run: npx tsx scripts/audit-arizona-seo.ts
 */
import { arizonaCountyResearch } from '../data/arizona-county-research';
import { getArizonaCountyTestimonials } from '../data/arizona-county-testimonials';
import { getArizonaNearbyCounties } from '../lib/local-movers/arizona-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  maricopa: 12,
  pima: 9,
};
const DEFAULT_TARGET = 6;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(arizonaCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('arizona', slug);
  const result = getMoversForCounty('arizona', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!arizonaCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getArizonaCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getArizonaNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Arizona SEO audit');
console.log('===============');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(arizonaCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== 15) {
  issues.push(`research count: ${researchCount} (expected 15)`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('arizona', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getArizonaCountyTestimonials(slug).length}, nearby ${getArizonaNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Arizona curated counties meet full curation standard (15/15).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}