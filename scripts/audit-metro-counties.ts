import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import {
  getMoversForCounty,
  hasExplicitCountyAssignment,
} from '../lib/local-movers/index';
import { hasCountyResearch } from '../lib/local-movers/county-research';
import { hasAttributableCountyReviews } from '../lib/trust/verified-reviews';

const targets: [string, string][] = [
  ['arizona', 'maricopa'],
  ['washington', 'king'],
  ['illinois', 'cook'],
  ['texas', 'harris'],
  ['texas', 'dallas'],
  ['texas', 'travis'],
  ['florida', 'miami-dade'],
  ['florida', 'broward'],
  ['california', 'los-angeles'],
  ['california', 'orange'],
  ['california', 'san-diego'],
  ['new-york', 'kings'],
  ['new-york', 'new-york'],
  ['georgia', 'fulton'],
  ['north-carolina', 'wake'],
  ['colorado', 'denver'],
  ['nevada', 'clark'],
  ['tennessee', 'davidson'],
  ['pennsylvania', 'philadelphia'],
  ['ohio', 'franklin'],
  ['michigan', 'wayne'],
  ['virginia', 'fairfax'],
  ['maryland', 'montgomery'],
];

for (const [stateSlug, countySlug] of targets) {
  const result = getMoversForCounty(stateSlug, countySlug);
  const decision = evaluateCountyIndexability(stateSlug, countySlug);
  const movers = result?.movers.length ?? 0;
  const usdot = result ? result.movers.filter((m) => m.usdotNumber).length : 0;
  console.log(
    [
      `${stateSlug}/${countySlug}`,
      decision.tier,
      decision.reason,
      `movers=${movers}`,
      `usdot=${usdot}`,
      `research=${hasCountyResearch(stateSlug, countySlug)}`,
      `explicit=${hasExplicitCountyAssignment(stateSlug, countySlug)}`,
      `reviews=${hasAttributableCountyReviews(result?.movers ?? [])}`,
      `fallback=${Boolean(result?.isRegionalFallback)}`,
    ].join(' | ')
  );
}