import { resolveDirectoryPlaceQuery } from '@/lib/directory/resolve-place-query';
import type { SearchPlaceHit } from '@/lib/search/types';

export function placeResultsForQuery(raw: string): SearchPlaceHit[] {
  const place = resolveDirectoryPlaceQuery(raw);
  if (!place) return [];
  const results: SearchPlaceHit[] = [];

  if (place.kind === 'city' && place.countyHref && place.countyName) {
    results.push({
      kind: 'city',
      label: `Local movers in ${place.countyName} County, ${place.stateCode}`,
      href: place.countyHref,
      explanation: `${place.placeLabel} maps to ${place.countyName} County, ${place.stateCode}. Headquarters is not service territory.`,
    });
  } else if (place.kind === 'county' && place.countyHref) {
    results.push({
      kind: 'county',
      label: place.headline,
      href: place.countyHref,
      explanation: `${place.placeLabel} is a county research surface. Headquarters is not service territory.`,
    });
  }

  results.push({
    kind: 'state',
    label:
      place.stateCode === 'FL'
        ? 'Florida Moving Intelligence'
        : `${place.stateName} local movers`,
    href: place.stateCode === 'FL' ? '/florida' : place.stateHref,
    explanation:
      place.stateCode === 'FL'
        ? 'Open Florida state intelligence. This is place research, not a company ranking.'
        : `Open the ${place.stateName} local-movers guide. Headquarters is not service territory.`,
  });

  if (place.stateCode === 'FL' && results.length < 2) {
    results.push({
      kind: 'state',
      label: 'Local movers in Florida',
      href: place.stateHref,
      explanation: 'Florida local-movers research. Headquarters is not service territory.',
    });
  }

  return results.slice(0, 2);
}
