/**
 * Phase 2 compliance — deep research wiring, tier classification, live rendered probes.
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

const tierClassificationSample: Array<{
  key: string;
  explicitMovers: number;
  guideTier: string;
  indexReason: string;
  badge: string;
}> = [];

async function main() {
  const origin = process.env.AUDIT_ORIGIN ?? PRODUCTION_ORIGIN;
  const circuitBreaker = evaluateTier1CircuitBreaker();
  const probePlan = buildAllAuditProbes(process.env.DEPLOY_COMMIT_HASH);

  let tier1 = 0;
  let tier2 = 0;
  let tier1Enriched = 0;

  for (const { stateSlug, countySlug } of getAllCountyParams()) {
    const decision = evaluateCountyIndexability(stateSlug, countySlug);
    const guideTier = classifyCountyGuideTier(decision);
    const tierMeta = getCountyGuideTierMeta(decision, stateSlug, countySlug);
    const explicitMovers = countExplicitCountyMovers(stateSlug, countySlug);

    if (guideTier === 'tier1') {
      tier1 += 1;
      if (
        getCountyResearch(stateSlug, countySlug) &&
        DEEP_COUNTY_UPGRADE_ALL.some(
          (p) => p.stateSlug === stateSlug && p.countySlug === countySlug
        )
      ) {
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

  const liveResults = await fetchAllAuditProbes(probePlan.all, origin);
  const liveSerialized = serializeProbeResults(origin, liveResults);

  const report = {
    generatedAt: new Date().toISOString(),
    auditOrigin: origin,
    deployCommitHash: probePlan.commitHash,
    indexabilityReconciliation: INDEXABILITY_RECONCILIATION,
    circuitBreaker,
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
      maxTier1Allowed: MAX_TIER1_COUNT,
      tier1WithinLimit: tier1 <= MAX_TIER1_COUNT,
      sample: tierClassificationSample,
    },
    probePlan: {
      seededSample: probePlan.seededSample,
      seededRandomUrls: probePlan.seededRandom.map((p) => p.path),
    },
    liveVerification: liveSerialized,
    phase2Pass:
      deepNotServed === 0 &&
      deepStillBatchTemplate === 0 &&
      deepUncited === 0 &&
      circuitBreaker.pass &&
      liveSerialized.failedProbeCount === 0,
  };

  writeFileSync('scripts/output/phase2-compliance-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));

  if (!report.phase2Pass) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});