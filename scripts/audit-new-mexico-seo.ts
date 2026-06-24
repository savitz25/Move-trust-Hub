/**
 * Full SEO / E-E-A-T audit for New Mexico local movers directory.
 * Run: npx tsx scripts/audit-new-mexico-seo.ts
 */
import { newMexicoCountyResearch } from '../data/new-mexico-county-research';
import { getNewMexicoCountyTestimonials } from '../data/new-mexico-county-testimonials';
import { getNewMexicoNearbyCounties } from '../lib/local-movers/new-mexico-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  bernalillo: 11,
  'santa-fe': 9,
  'doa-ana': 9,
};
const DEFAULT_TARGET = 5;
const EXPECTED_COUNT = 33;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(newMexicoCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('new-mexico', slug);
  const result = getMoversForCounty('new-mexico', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!newMexicoCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getNewMexicoCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getNewMexicoNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('New Mexico SEO audit');
console.log('====================');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(newMexicoCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('new-mexico', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getNewMexicoCountyTestimonials(slug).length}, nearby ${getNewMexicoNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ New Mexico curated counties meet full curation standard (${EXPECTED_COUNT}/${EXPECTED_COUNT}).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}