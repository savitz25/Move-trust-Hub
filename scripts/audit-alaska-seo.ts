/**
 * Full SEO / E-E-A-T audit for Alaska local movers directory.
 * Run: npx tsx scripts/audit-alaska-seo.ts
 */
import { alaskaCountyResearch } from '../data/alaska-county-research';
import { getAlaskaCountyTestimonials } from '../data/alaska-county-testimonials';
import { getAlaskaNearbyCounties } from '../lib/local-movers/alaska-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const issues: string[] = [];
const curatedSlugs = Object.keys(alaskaCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('alaska', slug);
  const result = getMoversForCounty('alaska', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < DEFAULT_TARGET) {
    issues.push(`movers<${DEFAULT_TARGET}: ${slug} (${moverCount})`);
  }
  if (!alaskaCountyResearch[slug]) {
    issues.push(`no research: ${slug}`);
  }
  if (getAlaskaCountyTestimonials(slug).length < 3) {
    issues.push(`testimonials<3: ${slug}`);
  }
  if (getAlaskaNearbyCounties(slug).length < 3) {
    issues.push(`nearby<3: ${slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${slug}`);
  }
  if (!c?.seat) {
    issues.push(`missing seat: ${slug}`);
  }
}

const researchCount = Object.keys(alaskaCountyResearch).length;
if (researchCount !== 5) {
  issues.push(`research count: ${researchCount} (expected 5)`);
}

console.log('Alaska SEO audit');
console.log('==============');
console.log(`Curated boroughs: ${curatedSlugs.length}`);
console.log(`Research entries: ${researchCount}`);

for (const slug of curatedSlugs) {
  const n = getMoversForCounty('alaska', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${DEFAULT_TARGET}), testimonials ${getAlaskaCountyTestimonials(slug).length}, nearby ${getAlaskaNearbyCounties(slug).length}`
  );
}

console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log('\n✓ Alaska major boroughs meet full curation standard (5/5).');
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}