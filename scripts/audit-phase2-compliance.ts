/**
 * Phase 2 compliance — deep research wiring, tier classification, live production probes.
 * Run: npx tsx scripts/audit-phase2-compliance.ts
 */
import { writeFileSync } from 'node:fs';
import { DEEP_COUNTY_UPGRADE_ALL } from '../data/deep-county-research';
import { getCountyResearch, getRawCountyResearch } from '../lib/local-movers/county-research';
import { buildCountyFaqItems, buildCountyMarketNotes, buildCountyTips } from '../lib/local-movers/county-seo';
import { countExplicitCountyMovers, getMoversForCounty } from '../lib/local-movers/index';
import { classifyCountyGuideTier, getCountyGuideTierMeta } from '../lib/local-movers/county-tier';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { hasCitedCountyResearchContent } from '../lib/local-movers/county-research-citations';
import { isBatchTemplateCountyResearch } from '../lib/local-movers/county-content-quality';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { getLocalState } from '../lib/local-movers/states';
import {
  fetchAllRequiredLiveCounties,
  type LiveCountyFetchResult,
} from './lib/live-county-audit';

let deepNotServed = 0;
let deepStillBatchTemplate = 0;
let deepUncited = 0;
const deepFailures: string[] = [];

for (const { stateSlug, countySlug } of DEEP_COUNTY_UPGRADE_ALL) {
  const research = getCountyResearch(stateSlug, countySlug);
  const raw = getRawCountyResearch(stateSlug, countySlug);
  const state = getLocalState(stateSlug);
  const movers = getMoversForCounty(stateSlug, countySlug)?.movers ?? [];

  if (isBatchTemplateCountyResearch(stateSlug, countySlug)) {
    deepStillBatchTemplate += 1;
    if (deepFailures.length < 15) deepFailures.push(`${stateSlug}/${countySlug} (batch template)`);
  }

  if (!hasCitedCountyResearchContent(research)) {
    deepUncited += 1;
    if (deepFailures.length < 15) deepFailures.push(`${stateSlug}/${countySlug} (uncited)`);
  }

  if (!research?.marketNotes || !research.tips?.length) {
    deepNotServed += 1;
    if (deepFailures.length < 15) deepFailures.push(`${stateSlug}/${countySlug}`);
    continue;
  }

  const notes = buildCountyMarketNotes({
    stateSlug,
    slug: countySlug,
    name: countySlug,
    stateCode: state?.code ?? '',
    seat: undefined,
  });
  const tips = buildCountyTips(
    { stateSlug, slug: countySlug, name: countySlug, stateCode: state?.code ?? '' },
    state?.name ?? ''
  );
  const faqs = buildCountyFaqItems(
    { stateSlug, slug: countySlug, name: countySlug, stateCode: state?.code ?? '' },
    state?.name ?? '',
    movers
  );

  if (!notes || tips.length === 0 || faqs.length < 6 || !raw?.marketNotes) {
    deepNotServed += 1;
    if (deepFailures.length < 15) deepFailures.push(`${stateSlug}/${countySlug} (runtime partial)`);
  }
}

let tier1 = 0;
let tier2 = 0;
let tier1Enriched = 0;
const tierClassificationSample: Array<{
  key: string;
  explicitMovers: number;
  guideTier: string;
  indexReason: string;
  badge: string;
}> = [];

for (const { stateSlug, countySlug } of getAllCountyParams()) {
  const decision = evaluateCountyIndexability(stateSlug, countySlug);
  const guideTier = classifyCountyGuideTier(decision);
  const tierMeta = getCountyGuideTierMeta(decision, stateSlug, countySlug);
  const explicitMovers = countExplicitCountyMovers(stateSlug, countySlug);

  if (guideTier === 'tier1') {
    tier1 += 1;
    if (getCountyResearch(stateSlug, countySlug) && DEEP_COUNTY_UPGRADE_ALL.some(
      (p) => p.stateSlug === stateSlug && p.countySlug === countySlug
    )) {
      tier1Enriched += 1;
    }
    if (tierClassificationSample.length < 25) {
      tierClassificationSample.push({
        key: `${stateSlug}/${countySlug}`,
        explicitMovers,
        guideTier,
        indexReason: decision.reason,
        badge: tierMeta.badge,
      });
    }
  } else {
    tier2 += 1;
  }
}

async function main() {
let liveResults: LiveCountyFetchResult[] = [];
let liveFetchError: string | undefined;
try {
  liveResults = await fetchAllRequiredLiveCounties();
} catch (error) {
  liveFetchError = error instanceof Error ? error.message : String(error);
}

const liveFailures = liveResults.filter((result) => result.errors.length > 0);

const report = {
  generatedAt: new Date().toISOString(),
  deepResearch: {
    totalDeepCounties: DEEP_COUNTY_UPGRADE_ALL.length,
    deepNotServed,
    deepStillBatchTemplate,
    deepUncited,
    sampleFailures: deepFailures,
  },
  guideTiers: {
    tier1,
    tier2,
    tier1Enriched,
    tier1WithinLowHundreds: tier1 <= 500,
    sample: tierClassificationSample,
  },
  liveProduction: {
    origin: 'https://www.movetrusthub.com',
    fetchError: liveFetchError,
    probes: liveResults.map((result) => ({
      label: result.probe.label,
      path: result.probe.path,
      status: result.status,
      title: result.title,
      metaDescription: result.metaDescription?.slice(0, 160) ?? null,
      robots: result.robots,
      hasKeywordsMeta: result.hasKeywordsMeta,
      hasMoversServingTitle: result.hasMoversServingTitle,
      hasJsonLd: result.hasJsonLd,
      errors: result.errors,
      pass: result.errors.length === 0,
    })),
    failedProbeCount: liveFailures.length,
  },
  phase2Pass:
    deepNotServed === 0 &&
    deepStillBatchTemplate === 0 &&
    deepUncited === 0 &&
    tier1 <= 500 &&
    liveFailures.length === 0 &&
    !liveFetchError,
};

writeFileSync('scripts/output/phase2-compliance-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (!report.phase2Pass) {
  process.exitCode = 1;
}
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});