import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import { getCountyMarketMoverCount } from '../lib/local-movers/county-market-mover-counts';

const counties = getCountiesForState('texas');
let mapBad = 0;
let empty = 0;

for (const c of counties) {
  const listed = getMoversForCounty('texas', c.slug)?.movers.length ?? 0;
  const badge = getCountyMarketMoverCount('texas', c.slug);
  if (listed === 0) empty++;
  if (badge !== listed) {
    mapBad++;
    if (mapBad <= 10) console.log('mismatch', c.slug, 'badge', badge, 'listed', listed);
  }
}

const harris = getMoversForCounty('texas', 'harris');
console.log({
  counties: counties.length,
  mapMismatches: mapBad,
  emptyListings: empty,
  harrisListed: harris?.movers.length,
  harrisBadge: getCountyMarketMoverCount('texas', 'harris'),
  harrisTop: harris?.movers.slice(0, 6).map((m) => `${m.name} (${m.city})`),
});
