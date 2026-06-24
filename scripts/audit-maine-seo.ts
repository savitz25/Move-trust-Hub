/**
 * Full SEO / E-E-A-T audit for Maine local movers directory.
 * Run: npx tsx scripts/audit-maine-seo.ts
 */
import { maineCountyResearch } from '../data/maine-county-research';
import { getMaineCountyTestimonials } from '../data/maine-county-testimonials';
import { getMaineNearbyCounties } from '../lib/local-movers/maine-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  cumberland: 8,
  york: 7,
};
const DEFAULT_TARGET = 6;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(maineCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('maine', slug);
  const result = getMoversForCounty('maine', slug);
  const moverCount = result?.movers.length ?? 0;

  const target = getTarget(slug);
  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!maineCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getMaineCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getMaineNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

const researchCount = Object.keys(maineCountyResearch).length;
if (researchCount !== 16) {
  issues.push(`research count: ${researchCount} (expected 16)`);
}

console.log('Maine SEO audit');
console.log('=============');
console.log(`Curated counties: ${curatedSlugs.length}`);
console.log(`Research entries: ${researchCount}`);

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('maine', slug)?.movers.length ?? 0;
  const target = getTarget(slug);
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getMaineCountyTestimonials(slug).length}, nearby ${getMaineNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Maine meets full curation standard (16/16 counties).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}