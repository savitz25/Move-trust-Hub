/**
 * Phase 1 compliance — fabrication, indexability, live rendered HTML probes.
 * Run: npx tsx scripts/audit-phase1-compliance.ts
 * Preview: AUDIT_ORIGIN=https://your-preview.vercel.app npx tsx scripts/audit-phase1-compliance.ts
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
import { INDEXABILITY_RECONCILIATION } from './lib/indexability-reconciliation';
import {
  buildAllAuditProbes,
  fetchAllAuditProbes,
  PRODUCTION_ORIGIN,
  serializeProbeResults,
} from './lib/live-county-audit';
import {
  evaluateTier1CircuitBreaker,
  MAX_TIER1_COUNT,
} from './lib/tier1-circuit-breaker';

const fabricatedCatalogIds = Object.keys(fullMoversCatalog).filter(isFabricatedMoverId);
const displayableCatalogIds = Object.keys(fullMoversCatalog).filter((id) => {
  const mover = fullMoversCatalog[id];
  return mover && isCuratedMover(mover);
});

let indexSyncAsyncMismatch = 0;
let indexedWithZeroMovers = 0;
let indexedRegionalFallback = 0;
let renderedFabricatedNames = 0;
let legacyTestimonialLeak = 0;

const sampleMismatches: string[] = [];

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
    if ((sync?.movers.length ?? 0) === 0) indexedWithZeroMovers += 1;
    if (sync?.isRegionalFallback) indexedRegionalFallback += 1;
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
  const origin = process.env.AUDIT_ORIGIN ?? PRODUCTION_ORIGIN;
  const commitHash = process.env.DEPLOY_COMMIT_HASH;
  const circuitBreaker = evaluateTier1CircuitBreaker();
  const probePlan = buildAllAuditProbes(commitHash);

  let liveResults = [];
  let liveFetchError: string | undefined;
  try {
    liveResults = await fetchAllAuditProbes(probePlan.all, origin);
  } catch (error) {
    liveFetchError = error instanceof Error ? error.message : String(error);
  }

  const liveSerialized = serializeProbeResults(origin, liveResults);

  const report = {
    generatedAt: new Date().toISOString(),
    auditOrigin: origin,
    deployCommitHash: probePlan.commitHash,
    catalog: {
      total: Object.keys(fullMoversCatalog).length,
      fabricatedIds: fabricatedCatalogIds.length,
      displayableIds: displayableCatalogIds.length,
    },
    circuitBreaker,
    indexabilityReconciliation: INDEXABILITY_RECONCILIATION,
    counties: {
      total: getAllCountyParams().length,
      minExplicitMoversToIndex: MIN_EXPLICIT_MOVERS_TO_INDEX,
      maxTier1Allowed: MAX_TIER1_COUNT,
      tier1: circuitBreaker.tier1,
      tier2: circuitBreaker.tier2,
      tier1Reasons: circuitBreaker.tier1Reasons,
      tier2Reasons: circuitBreaker.tier2Reasons,
      indexSyncAsyncMismatch,
      indexedWithZeroMovers,
      indexedRegionalFallback,
      renderedFabricatedNames,
      legacyTestimonialLeak,
    },
    probePlan: {
      named: probePlan.named.map((p) => ({ label: p.label, path: p.path })),
      seededRandom: probePlan.seededRandom.map((p) => ({ label: p.label, path: p.path })),
      seededSample: probePlan.seededSample,
    },
    sampleMismatches,
    liveVerification: {
      ...liveSerialized,
      fetchError: liveFetchError,
    },
    phase1Pass:
      circuitBreaker.pass &&
      renderedFabricatedNames === 0 &&
      legacyTestimonialLeak === 0 &&
      indexedWithZeroMovers === 0 &&
      indexedRegionalFallback === 0 &&
      liveSerialized.failedProbeCount === 0 &&
      !liveFetchError,
  };

  writeFileSync('scripts/output/phase1-compliance-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));

  if (!report.phase1Pass) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});