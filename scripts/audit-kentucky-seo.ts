/**
 * Full SEO / E-E-A-T audit for Kentucky local movers directory.
 * Run: npx tsx scripts/audit-kentucky-seo.ts
 */
import { generatedCounties } from '../data/generated/index';
import { kentuckyCountyResearch } from '../data/kentucky-county-research';
import { getKentuckyCountyTestimonials } from '../data/kentucky-county-testimonials';
import { getKentuckyNearbyCounties } from '../lib/local-movers/kentucky-nearby';
import { applyKentuckyCountyOverrides } from '../lib/local-movers/geography/kentucky-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const MAJOR = new Set([
  'jefferson',
  'fayette',
  'kenton',
  'boone',
  'warren',
  'hardin',
  'daviess',
  'madison',
  'campbell',
  'mccracken',
  'bullitt',
  'oldham',
  'scott',
  'shelby',
  'christian',
  'pulaski',
  'laurel',
  'jessamine',
  'pike',
  'franklin',
  'nelson',
  'boyd',
  'barren',
  'hopkins',
  'henderson',
  'calloway',
  'clark',
  'whitley',
  'graves',
  'greenup',
  'floyd',
  'boyle',
  'marshall',
  'meade',
  'muhlenberg',
  'knox',
  'logan',
  'montgomery',
  'woodford',
  'grayson',
  'taylor',
  'grant',
  'perry',
  'carter',
  'lincoln',
  'anderson',
  'rowan',
  'harlan',
  'mercer',
  'allen',
  'bell',
  'johnson',
  'breckinridge',
  'spencer',
  'simpson',
  'hart',
  'marion',
]);

const counties = generatedCounties
  .filter((c) => c.stateSlug === 'kentucky')
  .map(applyKentuckyCountyOverrides);

const issues: string[] = [];
let jeffersonCount = 0;

for (const c of counties) {
  const result = getMoversForCounty('kentucky', c.slug);
  const n = result?.movers.length ?? 0;
  if (c.slug === 'jefferson') jeffersonCount = n;

  if (n < 5) issues.push(`movers<5: ${c.slug} (${n})`);
  if (MAJOR.has(c.slug) && n < 8) issues.push(`major<8: ${c.slug} (${n})`);
  if (MAJOR.has(c.slug) && n < 10) issues.push(`major<10: ${c.slug} (${n})`);

  if (!kentuckyCountyResearch[c.slug]) issues.push(`no research: ${c.slug}`);
  if (getKentuckyCountyTestimonials(c.slug).length < 3) {
    issues.push(`testimonials<3: ${c.slug}`);
  }
  if (getKentuckyNearbyCounties(c.slug).length === 0) {
    issues.push(`no nearby: ${c.slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${c.slug}`);
  }
}

const researchCount = Object.keys(kentuckyCountyResearch).length;
if (researchCount !== 120) {
  issues.push(`research count: ${researchCount} (expected 120)`);
}

console.log('Kentucky SEO audit');
console.log('==================');
console.log(`Counties: ${counties.length}`);
console.log(`Research entries: ${researchCount}`);
console.log(`Jefferson movers: ${jeffersonCount}`);
console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(
    '\n✓ Kentucky meets full curation standard (movers, research, testimonials, nearby).'
  );
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}