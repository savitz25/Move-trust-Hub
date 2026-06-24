/**
 * Full SEO / E-E-A-T audit for Nevada local movers directory.
 * Run: npx tsx scripts/audit-nevada-seo.ts
 */
import { nevadaCountyResearch } from '../data/nevada-county-research';
import { getNevadaCountyTestimonials } from '../data/nevada-county-testimonials';
import { getNevadaNearbyCounties } from '../lib/local-movers/nevada-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const PREMIUM_TARGETS: Record<string, number> = {
  clark: 12,
  washoe: 9,
};
const DEFAULT_TARGET = 6;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? DEFAULT_TARGET;
}

const issues: string[] = [];
const curatedSlugs = Object.keys(nevadaCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('nevada', slug);
  const result = getMoversForCounty('nevada', slug);
  const moverCount = result?.movers.length ?? 0;
  const target = getTarget(slug);

  if (moverCount < target) {
    issues.push(`movers<${target}: ${slug} (${moverCount})`);
  }
  if (!nevadaCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getNevadaCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getNevadaNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

console.log('Nevada SEO audit');
console.log('==============');
console.log(`Curated counties: ${curatedSlugs.length}`);
const researchCount = Object.keys(nevadaCountyResearch).length;
console.log(`Research entries: ${researchCount}`);
if (researchCount !== 17) {
  issues.push(`research count: ${researchCount} (expected 17)`);
}

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('nevada', slug)?.movers.length ?? 0;
  const target = getTarget(slug);
  console.log(
    `  ${slug}: ${n} movers (target ${target}), testimonials ${getNevadaCountyTestimonials(slug).length}, nearby ${getNevadaNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Nevada curated counties meet full curation standard (17/17).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}