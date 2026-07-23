/**
 * Quick verification of local-first ranking + progressive list edge cases.
 * Run: npx tsx scripts/verify-progressive-county-movers.ts
 */
import { getMoversForCounty } from '../lib/local-movers/index';
import {
  COUNTY_MOVER_PAGE_SIZE,
  localRelevanceScore,
  nextRevealCount,
  rankCountyMovers,
  revealButtonLabel,
} from '../lib/local-movers/rank-county-movers';

const probes = [
  { stateSlug: 'new-jersey', countySlug: 'atlantic' },
  { stateSlug: 'new-jersey', countySlug: 'bergen' },
  { stateSlug: 'california', countySlug: 'orange' },
  { stateSlug: 'nebraska', countySlug: 'sherman' }, // rural / limited
];

let failed = 0;

for (const { stateSlug, countySlug } of probes) {
  const result = getMoversForCounty(stateSlug, countySlug);
  if (!result) {
    console.error(`FAIL ${stateSlug}/${countySlug}: not found`);
    failed++;
    continue;
  }

  const ranked = rankCountyMovers(result.movers, result.county);
  const total = ranked.length;
  const idsMatch =
    ranked.map((m) => m.id).join('|') === result.movers.map((m) => m.id).join('|');

  // Determinism
  const ranked2 = rankCountyMovers(result.movers, result.county);
  const deterministic =
    ranked.map((m) => m.id).join() === ranked2.map((m) => m.id).join();

  // Local-first: any isLocalOnly should appear before all non-local-only
  let localOrderOk = true;
  let sawNonLocal = false;
  for (const m of ranked) {
    if (!m.isLocalOnly) sawNonLocal = true;
    if (m.isLocalOnly && sawNonLocal) localOrderOk = false;
  }

  // Progressive edge cases
  if (total <= COUNTY_MOVER_PAGE_SIZE) {
    // no button needed — remaining 0
    if (nextRevealCount(total, total) !== total) {
      console.error(`FAIL ${stateSlug}/${countySlug}: ≤10 reveal edge`);
      failed++;
    }
  } else {
    const afterFirst = nextRevealCount(COUNTY_MOVER_PAGE_SIZE, total);
    const expected =
      total - COUNTY_MOVER_PAGE_SIZE <= COUNTY_MOVER_PAGE_SIZE
        ? total
        : COUNTY_MOVER_PAGE_SIZE * 2;
    if (afterFirst !== expected) {
      console.error(
        `FAIL ${stateSlug}/${countySlug}: next reveal expected ${expected} got ${afterFirst}`
      );
      failed++;
    }
  }

  const topLocalScores = ranked.slice(0, Math.min(10, total)).map((m) => ({
    name: m.name,
    city: m.city,
    isLocalOnly: Boolean(m.isLocalOnly),
    localScore: localRelevanceScore(m, result.county),
  }));

  console.log(
    JSON.stringify(
      {
        county: `${stateSlug}/${countySlug}`,
        total,
        seat: result.county.seat,
        idsMatchSorted: idsMatch,
        deterministic,
        localOrderOk,
        showButton: total > COUNTY_MOVER_PAGE_SIZE,
        firstRevealLabel:
          total > COUNTY_MOVER_PAGE_SIZE
            ? revealButtonLabel(COUNTY_MOVER_PAGE_SIZE, total)
            : null,
        top10: topLocalScores,
      },
      null,
      2
    )
  );

  if (!deterministic || !localOrderOk) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log('\nAll progressive mover ranking checks passed.');
