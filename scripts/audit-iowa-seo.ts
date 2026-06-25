/**
 * Full SEO / E-E-A-T audit for Iowa local movers directory (batch 1 — 21 counties).
 * Run: npx tsx scripts/audit-iowa-seo.ts
 */
import { iowaCountyResearch } from '../data/iowa-county-research';
import { getIowaCountyTestimonials } from '../data/iowa-county-testimonials';
import { getIowaNearbyCounties } from '../lib/local-movers/iowa-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  polk: 10,
  linn: 10,
  johnson: 10,
};
const SECONDARY_TARGETS: Record<string, number> = {
  scott: 8,
  'black-hawk': 8,
  dallas: 8,
};
const DEFAULT_TARGET = 5;
const EXPECTED_COUNT = 21;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? SECONDARY_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(iowaCountyResearch).sort();

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const c = getCounty('iowa', slug);
  const result = getMoversForCounty('iowa', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!iowaCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getIowaCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getIowaNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Iowa SEO audit');
console.log('====================');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(iowaCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== EXPECTED_COUNT) {
  issues.push(`research count: ${researchCount} (expected ${EXPECTED_COUNT})`);
}

for (const slug of curatedSlugs) {
  const target = getTarget(slug);
  const n = getMoversForCounty('iowa', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getIowaCountyTestimonials(slug).length}, nearby ${getIowaNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(`\n✓ Iowa curated counties meet full curation standard (${EXPECTED_COUNT}/${EXPECTED_COUNT}).`);
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}