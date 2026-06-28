/**
 * Site-wide thin county indexability audit.
 * Run: npx tsx scripts/audit-thin-counties.ts
 */
import { writeFileSync } from 'node:fs';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { getMoversForCounty, hasExplicitCountyAssignment } from '../lib/local-movers/index';
import { hasCountyResearch } from '../lib/local-movers/county-research';
import { hasAttributableCountyReviews } from '../lib/trust/verified-reviews';

const params = getAllCountyParams();
const byReason = new Map<string, string[]>();
const noindex: Array<{
  stateSlug: string;
  countySlug: string;
  reason: string;
  movers: number;
  regionalFallback: boolean;
  explicit: boolean;
  research: boolean;
  curatedReviews: boolean;
}> = [];

let indexed = 0;
let regionalFallback = 0;
let genericReviews = 0;

for (const { stateSlug, countySlug } of params) {
  const result = getMoversForCounty(stateSlug, countySlug);
  const decision = evaluateCountyIndexability(stateSlug, countySlug);
  const movers = result?.movers.length ?? 0;

  if (result?.isRegionalFallback) regionalFallback += 1;
  if (!hasAttributableCountyReviews(result?.movers ?? [])) genericReviews += 1;

  if (decision.tier === 'index') {
    indexed += 1;
    continue;
  }

  noindex.push({
    stateSlug,
    countySlug,
    reason: decision.reason,
    movers,
    regionalFallback: Boolean(result?.isRegionalFallback),
    explicit: hasExplicitCountyAssignment(stateSlug, countySlug),
    research: hasCountyResearch(stateSlug, countySlug),
    curatedReviews: hasAttributableCountyReviews(result?.movers ?? []),
  });
  const bucket = byReason.get(decision.reason) ?? [];
  bucket.push(`${stateSlug}/${countySlug} (${movers})`);
  byReason.set(decision.reason, bucket);
}

console.log('Thin county indexability audit');
console.log('==============================');
console.log(`Total counties: ${params.length}`);
console.log(`Indexed: ${indexed}`);
console.log(`Noindex: ${noindex.length}`);
console.log(`Regional fallback pages: ${regionalFallback}`);
console.log(`Pages without curated testimonials: ${genericReviews}`);
console.log('');

for (const [reason, counties] of [...byReason.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${reason}: ${counties.length}`);
}

writeFileSync(
  'scripts/output/thin-county-noindex-report.json',
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      total: params.length,
      indexed,
      noindexCount: noindex.length,
      regionalFallback,
      genericReviews,
      byReason: Object.fromEntries(byReason),
      noindex,
    },
    null,
    2
  )
);

console.log('\nWrote scripts/output/thin-county-noindex-report.json');