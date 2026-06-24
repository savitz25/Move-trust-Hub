/**
 * Full SEO / E-E-A-T audit for Arizona local movers directory.
 * Run: npx tsx scripts/audit-arizona-seo.ts
 */
import { arizonaCountyResearch } from '../data/arizona-county-research';
import { getArizonaCountyTestimonials } from '../data/arizona-county-testimonials';
import { getArizonaNearbyCounties } from '../lib/local-movers/arizona-nearby';
import { getCounty } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const DEFAULT_TARGET = 10;

const issues: string[] = [];
const curatedSlugs = Object.keys(arizonaCountyResearch).sort();

for (const slug of curatedSlugs) {
  const c = getCounty('arizona', slug);
  const result = getMoversForCounty('arizona', slug);
  const moverCount = result?.movers.length ?? 0;

  if (moverCount < DEFAULT_TARGET) {
    issues.push(`movers<${DEFAULT_TARGET}: ${slug} (${moverCount})`);
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
  const n = getMoversForCounty('arizona', slug)?.movers.length ?? 0;
  console.log(
    `  ${slug}: ${n} movers (target ${DEFAULT_TARGET}), testimonials ${getArizonaCountyTestimonials(slug).length}, nearby ${getArizonaNearbyCounties(slug).length}`
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