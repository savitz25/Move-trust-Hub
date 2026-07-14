/**
 * Phase 1 compliance audit — fabrication, indexability alignment, legacy testimonials.
 * Run: npx tsx scripts/audit-phase1-compliance.ts
 */
import { writeFileSync } from 'node:fs';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import {
  evaluateCountyIndexability,
  evaluateCountyIndexabilityFromResult,
} from '../lib/local-movers/county-indexability';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';
import { isFabricatedMoverId } from '../lib/trust/fabricated-mover-id';
import { buildCountyTestimonials } from '../lib/local-movers/county-seo';

const fabricatedCatalogIds = Object.keys(fullMoversCatalog).filter(isFabricatedMoverId);
const displayableCatalogIds = Object.keys(fullMoversCatalog).filter((id) => {
  const mover = fullMoversCatalog[id];
  return mover && isCuratedMover(mover);
});

let indexSyncAsyncMismatch = 0;
let indexedWithZeroMovers = 0;
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

  if (asyncDecision.tier === 'index' && (sync?.movers.length ?? 0) === 0) {
    indexedWithZeroMovers += 1;
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

const report = {
  generatedAt: new Date().toISOString(),
  catalog: {
    total: Object.keys(fullMoversCatalog).length,
    fabricatedIds: fabricatedCatalogIds.length,
    displayableIds: displayableCatalogIds.length,
  },
  counties: {
    total: getAllCountyParams().length,
    indexSyncAsyncMismatch,
    indexedWithZeroMovers,
    renderedFabricatedNames,
    legacyTestimonialLeak,
  },
  sampleMismatches,
  phase1Pass:
    renderedFabricatedNames === 0 &&
    legacyTestimonialLeak === 0 &&
    indexedWithZeroMovers === 0,
};

writeFileSync('scripts/output/phase1-compliance-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (!report.phase1Pass) {
  process.exitCode = 1;
}