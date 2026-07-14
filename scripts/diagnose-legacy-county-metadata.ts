/**
 * Lists counties whose live title would diverge from canonical builder if seat overrides were skipped.
 */
import { writeFileSync } from 'node:fs';
import { getAllCountyParams, getCounty } from '../lib/local-movers/geography/index';
import { evaluateCountyIndexabilityFromResult } from '../lib/local-movers/county-indexability';
import { buildCountyPageMetadata } from '../lib/local-movers/seo-metadata';
import { getMoversForCounty } from '../lib/local-movers/index';
import { getLocalState } from '../lib/local-movers/states';
import { generatedCounties } from '../data/generated/index';

function getRawGeneratedCounty(stateSlug: string, countySlug: string) {
  return generatedCounties.find(
    (c) => c.stateSlug === stateSlug && c.slug === countySlug
  );
}

const legacyRisk: Array<{
  key: string;
  canonicalSeat: string | undefined;
  rawSeat: string | undefined;
  tier: string;
  reason: string;
}> = [];

for (const { stateSlug, countySlug } of getAllCountyParams()) {
  const county = getCounty(stateSlug, countySlug);
  const raw = getRawGeneratedCounty(stateSlug, countySlug);
  if (!county || !raw) continue;

  if (county.seat !== raw.seat) {
    const result = getMoversForCounty(stateSlug, countySlug);
    const decision = evaluateCountyIndexabilityFromResult(stateSlug, countySlug, result);
    legacyRisk.push({
      key: `${stateSlug}/${countySlug}`,
      canonicalSeat: county.seat,
      rawSeat: raw.seat,
      tier: decision.tier,
      reason: 'seat_override_applied_in_geography_pipeline',
    });
  }
}

const metadataPath = {
  route: 'app/(move)/(marketing)/local-movers/[stateSlug]/[countySlug]/page.tsx',
  generateMetadata: 'resolveCountyPageSeo() → buildCountyPageMetadata()',
  evaluator: 'evaluateCountyIndexabilityFromResult() via getMoversForCountyAsync()',
  staticGeneration: 'force-static + generateStaticParams (ISR/prerender cache may serve stale HTML until revalidate)',
  seatOverrides: 'lib/local-movers/geography/county-seat-overrides.ts (final pass after state overrides)',
  noAlternateCountyRoutes: true,
};

const report = {
  generatedAt: new Date().toISOString(),
  metadataPath,
  countiesWithSeatOverrides: legacyRisk.length,
  spotlight: {
    'nebraska/sherman': {
      tier: evaluateCountyIndexabilityFromResult(
        'nebraska',
        'sherman',
        getMoversForCounty('nebraska', 'sherman')
      ),
      canonicalSeat: getCounty('nebraska', 'sherman')?.seat,
      metadataTitle: (() => {
        const c = getCounty('nebraska', 'sherman');
        const s = getLocalState('nebraska');
        const r = getMoversForCounty('nebraska', 'sherman');
        if (!c || !s || !r) return null;
        const d = evaluateCountyIndexabilityFromResult('nebraska', 'sherman', r);
        return buildCountyPageMetadata(c, s.name, r.movers, '/local-movers/nebraska/sherman', d).title;
      })(),
    },
    'colorado/douglas': {
      tier: evaluateCountyIndexabilityFromResult(
        'colorado',
        'douglas',
        getMoversForCounty('colorado', 'douglas')
      ),
      canonicalSeat: getCounty('colorado', 'douglas')?.seat,
      metadataTitle: (() => {
        const c = getCounty('colorado', 'douglas');
        const s = getLocalState('colorado');
        const r = getMoversForCounty('colorado', 'douglas');
        if (!c || !s || !r) return null;
        const d = evaluateCountyIndexabilityFromResult('colorado', 'douglas', r);
        return buildCountyPageMetadata(c, s.name, r.movers, '/local-movers/colorado/douglas', d).title;
      })(),
    },
  },
  legacyRiskSample: legacyRisk.slice(0, 40),
};

writeFileSync('scripts/output/legacy-county-metadata-diagnosis.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));