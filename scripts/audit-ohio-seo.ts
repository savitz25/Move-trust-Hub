/**
 * Full SEO / E-E-A-T audit for Ohio local movers directory.
 * Run: npx tsx scripts/audit-ohio-seo.ts
 */
import { generatedCounties } from '../data/generated/index';
import { ohioCountyResearch } from '../data/ohio-county-research';
import { getOhioCountyTestimonials } from '../data/ohio-county-testimonials';
import { getOhioNearbyCounties } from '../lib/local-movers/ohio-nearby';
import { applyOhioCountyOverrides } from '../lib/local-movers/geography/ohio-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const MAJOR = new Set([
  'franklin',
  'cuyahoga',
  'hamilton',
  'montgomery',
  'summit',
  'lucas',
  'butler',
  'stark',
  'lorain',
  'warren',
  'delaware',
  'lake',
  'mahoning',
  'clermont',
  'trumbull',
  'licking',
  'medina',
  'greene',
  'fairfield',
  'portage',
  'wood',
  'clark',
  'richland',
  'wayne',
  'miami',
  'allen',
  'columbiana',
  'ashtabula',
  'geauga',
  'tuscarawas',
  'muskingum',
  'ross',
  'hancock',
  'union',
  'erie',
  'scioto',
  'marion',
  'knox',
  'belmont',
  'pickaway',
  'highland',
  'mercer',
  'clinton',
  'crawford',
  'fulton',
  'preble',
  'ottawa',
  'champaign',
  'guernsey',
  'defiance',
  'coshocton',
  'morrow',
  'williams',
  'perry',
  'putnam',
  'jackson',
  'hardin',
  'gallia',
  'van-wert',
  'fayette',
  'adams',
  'henry',
  'hocking',
  'pike',
  'carroll',
  'meigs',
  'wyandot',
  'paulding',
  'noble',
  'harrison',
  'morgan',
  'monroe',
  'vinton',
  'ashland',
  'auglaize',
  'brown',
  'darke',
  'holmes',
  'huron',
  'jefferson',
  'lawrence',
  'logan',
  'madison',
  'sandusky',
  'seneca',
  'shelby',
  'athens',
  'washington',
]);

const counties = generatedCounties
  .filter((c) => c.stateSlug === 'ohio')
  .map(applyOhioCountyOverrides);

const issues: string[] = [];
let franklinCount = 0;

for (const c of counties) {
  const result = getMoversForCounty('ohio', c.slug);
  const n = result?.movers.length ?? 0;
  if (c.slug === 'franklin') franklinCount = n;

  if (n < 5) issues.push(`movers<5: ${c.slug} (${n})`);
  if (MAJOR.has(c.slug) && n < 8) issues.push(`major<8: ${c.slug} (${n})`);
  if (c.slug !== 'franklin' && MAJOR.has(c.slug) && n < 10) {
    issues.push(`major<10: ${c.slug} (${n})`);
  }
  if (c.slug === 'franklin' && n < 10) issues.push(`franklin<10: ${c.slug} (${n})`);

  if (!ohioCountyResearch[c.slug]) issues.push(`no research: ${c.slug}`);
  if (getOhioCountyTestimonials(c.slug).length < 3) {
    issues.push(`testimonials<3: ${c.slug}`);
  }
  if (getOhioNearbyCounties(c.slug).length === 0) {
    issues.push(`no nearby: ${c.slug}`);
  }
  if (result?.isRegionalFallback) {
    issues.push(`regional fallback: ${c.slug}`);
  }
}

const researchCount = Object.keys(ohioCountyResearch).length;
if (researchCount !== 88) {
  issues.push(`research count: ${researchCount} (expected 88)`);
}

console.log('Ohio SEO audit');
console.log('==============');
console.log(`Counties: ${counties.length}`);
console.log(`Research entries: ${researchCount}`);
console.log(`Franklin movers: ${franklinCount}`);
console.log(`Issues: ${issues.length}`);

if (issues.length === 0) {
  console.log(
    '\n✓ Ohio meets full curation standard (movers, research, testimonials, nearby).'
  );
} else {
  console.log('\nIssues:');
  for (const line of issues) console.log(`  ${line}`);
  process.exit(1);
}