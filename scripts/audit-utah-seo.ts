/**
 * Full SEO / E-E-A-T audit for Utah local movers directory.
 * Run: npx tsx scripts/audit-utah-seo.ts
 */
import { utahCountyResearch } from '../data/utah-county-research';
import { getUtahCountyTestimonials } from '../data/utah-county-testimonials';
import { getUtahNearbyCounties } from '../lib/local-movers/utah-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;
const EXPECTED_COUNT = 29;

function getTarget(_slug: string): number {
  return DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(utahCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('utah', slug);
  const result = getMoversForCounty('utah', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!utahCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getUtahCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getUtahNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Utah SEO audit');
console.log('==============');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(utahCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('utah', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getUtahCountyTestimonials(slug).length}, nearby ${getUtahNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ Utah curated counties meet full curation standard (29/29).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}