import { localStates } from '../lib/local-movers/states';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import { getCountyMarketMoverCount } from '../lib/local-movers/county-market-mover-counts';
import { ACTIVE_MOVER_ID_WHITELIST } from '../data/active-directory-movers';

let empty = 0;
let leaks = 0;
let mapDrift = 0;
let total = 0;
const perState: Array<{
  slug: string;
  counties: number;
  empty: number;
  sample: string;
  count: number;
}> = [];

for (const s of localStates) {
  const cs = getCountiesForState(s.slug);
  let stateEmpty = 0;
  let sampleCount = 0;
  let sampleSlug = '';
  for (const c of cs) {
    total++;
    const r = getMoversForCounty(s.slug, c.slug);
    const n = r?.movers.length ?? 0;
    if (n === 0) {
      empty++;
      stateEmpty++;
    }
    for (const m of r?.movers ?? []) {
      if (!ACTIVE_MOVER_ID_WHITELIST.has(m.id)) leaks++;
    }
    const badge = getCountyMarketMoverCount(s.slug, c.slug);
    if (badge !== null && badge !== n) mapDrift++;
    if (!sampleSlug) {
      sampleSlug = c.slug;
      sampleCount = n;
    }
  }
  perState.push({
    slug: s.slug,
    counties: cs.length,
    empty: stateEmpty,
    sample: sampleSlug,
    count: sampleCount,
  });
}

console.log(
  JSON.stringify(
    {
      totalCounties: total,
      empty,
      leaks,
      mapDrift,
      whitelistSize: ACTIVE_MOVER_ID_WHITELIST.size,
      states: perState.length,
      emptyStates: perState.filter((s) => s.empty > 0).map((s) => s.slug),
      sample: perState
        .filter((s) =>
          [
            'florida',
            'new-york',
            'illinois',
            'ohio',
            'georgia',
            'alabama',
            'colorado',
            'pennsylvania',
            'texas',
            'california',
            'arizona',
            'nevada',
          ].includes(s.slug)
        )
        .map((s) => `${s.slug}/${s.sample}=${s.count}`),
    },
    null,
    2
  )
);
