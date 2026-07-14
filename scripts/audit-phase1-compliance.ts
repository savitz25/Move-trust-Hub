/**
 * Phase 1 compliance — fabrication, indexability alignment, legacy testimonials, live URL probes.
 * Run: npx tsx scripts/audit-phase1-compliance.ts
 */
import { writeFileSync } from 'node:fs';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import {
  evaluateCountyIndexability,
  evaluateCountyIndexabilityFromResult,
  MIN_EXPLICIT_MOVERS_TO_INDEX,
} from '../lib/local-movers/county-indexability';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';
import { isFabricatedMoverId } from '../lib/trust/fabricated-mover-id';
import { buildCountyTestimonials } from '../lib/local-movers/county-seo';
import {
  fetchAllRequiredLiveCounties,
  type LiveCountyFetchResult,
} from './lib/live-county-audit';

const fabricatedCatalogIds = Object.keys(fullMoversCatalog).filter(isFabricatedMoverId);
const displayableCatalogIds = Object.keys(fullMoversCatalog).filter((id) => {
  const mover = fullMoversCatalog[id];
  return mover && isCuratedMover(mover);
});

let indexSyncAsyncMismatch = 0;
let indexedWithZeroMovers = 0;
let indexedRegionalFallback = 0;
let indexedInsufficientExplicit = 0;
let renderedFabricatedNames = 0;
let legacyTestimonialLeak = 0;
let tier1Count = 0;
let tier2Count = 0;

const sampleMismatches: string[] = [];
const tier1Reasons: Record<string, number> = {};
const tier2Reasons: Record<string, number> = {};

for (const { stateSlug, countySlug } of getAllCountyParams()) {
  const sync = getMoversForCounty(stateSlug, countySlug);
  const syncDecision = evaluateCountyIndexability(stateSlug, countySlug);
  const asyncDecision = evaluateCountyIndexabilityFromResult(stateSlug, countySlug, sync);

  if (syncDecision.tier !== asyncDecision.tier) {
    indexSyncAsyncMismatch += 1;
    if (sampleMismatches.length < 20) {
      sampleMismatches.push(
        `${stateSlug}/${countySlug}: sync=${syncDecision.tier}/${syncDecision.reason} async=${asyncDecision.tier}/${asyncDecision.reason}`
      );
    }
  }

  if (asyncDecision.tier === 'index') {
    tier1Count += 1;
    tier1Reasons[asyncDecision.reason] = (tier1Reasons[asyncDecision.reason] ?? 0) + 1;
    if ((sync?.movers.length ?? 0) === 0) indexedWithZeroMovers += 1;
    if (sync?.isRegionalFallback) indexedRegionalFallback += 1;
  } else {
    tier2Count += 1;
    tier2Reasons[asyncDecision.reason] = (tier2Reasons[asyncDecision.reason] ?? 0) + 1;
  }

  for (const mover of sync?.movers ?? []) {
    if (/^Regional /i.test(mover.name) || /^All My Sons /i.test(mover.name)) {
      renderedFabricatedNames += 1;
    }
  }

  if (sync) {
    const testimonials = buildCountyTestimonials(sync.county, stateSlug, sync.movers);
    if (testimonials.some((t) => !t.reviewId && !t.source)) {
      legacyTestimonialLeak += 1;
    }
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
  catalog: {
    total: Object.keys(fullMoversCatalog).length,
    fabricatedIds: fabricatedCatalogIds.length,
    displayableIds: displayableCatalogIds.length,
  },
  counties: {
    total: getAllCountyParams().length,
    minExplicitMoversToIndex: MIN_EXPLICIT_MOVERS_TO_INDEX,
    tier1: tier1Count,
    tier2: tier2Count,
    tier1Reasons,
    tier2Reasons,
    indexSyncAsyncMismatch,
    indexedWithZeroMovers,
    indexedRegionalFallback,
    renderedFabricatedNames,
    legacyTestimonialLeak,
  },
  sampleMismatches,
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
      hasMoversServingH1: result.hasMoversServingH1,
      hasArtifactText: result.hasArtifactText,
      hasJsonLd: result.hasJsonLd,
      errors: result.errors,
      pass: result.errors.length === 0,
    })),
    failedProbeCount: liveFailures.length,
  },
  phase1Pass:
    renderedFabricatedNames === 0 &&
    legacyTestimonialLeak === 0 &&
    indexedWithZeroMovers === 0 &&
    indexedRegionalFallback === 0 &&
    tier1Count <= 500 &&
    liveFailures.length === 0 &&
    !liveFetchError,
};

writeFileSync('scripts/output/phase1-compliance-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (!report.phase1Pass) {
  process.exitCode = 1;
}
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});