/**
 * Phase 2 compliance — deep research wiring, tier classification, testimonial isolation.
 * Run: npx tsx scripts/audit-phase2-compliance.ts
 */
import { writeFileSync } from 'node:fs';
import { DEEP_COUNTY_UPGRADE_ALL } from '../data/deep-county-research';
import { getCountyResearch } from '../lib/local-movers/county-research';
import { buildCountyFaqItems, buildCountyMarketNotes, buildCountyTips } from '../lib/local-movers/county-seo';
import { getMoversForCounty } from '../lib/local-movers/index';
import { classifyCountyGuideTier } from '../lib/local-movers/county-tier';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { getLocalState } from '../lib/local-movers/states';

let deepNotServed = 0;
const deepFailures: string[] = [];

for (const { stateSlug, countySlug } of DEEP_COUNTY_UPGRADE_ALL) {
  const research = getCountyResearch(stateSlug, countySlug);
  const state = getLocalState(stateSlug);
  const movers = getMoversForCounty(stateSlug, countySlug)?.movers ?? [];
  if (!research?.marketNotes || !research.tips?.length) {
    deepNotServed += 1;
    if (deepFailures.length < 15) {
      deepFailures.push(`${stateSlug}/${countySlug}`);
    }
    continue;
  }
  const notes = buildCountyMarketNotes({ stateSlug, slug: countySlug, name: countySlug, stateCode: state?.code ?? '', seat: undefined });
  const tips = buildCountyTips({ stateSlug, slug: countySlug, name: countySlug, stateCode: state?.code ?? '' }, state?.name ?? '');
  const faqs = buildCountyFaqItems(
    { stateSlug, slug: countySlug, name: countySlug, stateCode: state?.code ?? '' },
    state?.name ?? '',
    movers
  );
  if (!notes || tips.length === 0 || faqs.length < 6) {
    deepNotServed += 1;
    if (deepFailures.length < 15) {
      deepFailures.push(`${stateSlug}/${countySlug} (runtime partial)`);
    }
  }
}

let tier1 = 0;
let tier2 = 0;
let tier1Enriched = 0;

for (const { stateSlug, countySlug } of getAllCountyParams()) {
  const decision = evaluateCountyIndexability(stateSlug, countySlug);
  const guideTier = classifyCountyGuideTier(decision, stateSlug, countySlug);
  if (guideTier === 'tier1') {
    tier1 += 1;
    if (getCountyResearch(stateSlug, countySlug) && DEEP_COUNTY_UPGRADE_ALL.some(
      (p) => p.stateSlug === stateSlug && p.countySlug === countySlug
    )) {
      tier1Enriched += 1;
    }
  } else {
    tier2 += 1;
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  deepResearch: {
    totalDeepCounties: DEEP_COUNTY_UPGRADE_ALL.length,
    deepNotServed,
    sampleFailures: deepFailures,
  },
  guideTiers: {
    tier1,
    tier2,
    tier1Enriched,
  },
  phase2Pass: deepNotServed === 0,
};

writeFileSync('scripts/output/phase2-compliance-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (!report.phase2Pass) {
  process.exitCode = 1;
}