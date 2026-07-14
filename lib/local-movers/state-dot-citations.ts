/** State DOT / highway authority sources for cited county research enrichment. */
const STATE_DOT_SOURCES: Record<string, string> = {
  florida: 'Florida Department of Transportation (FDOT) oversize/overweight permit rules',
  california: 'California DMV and Caltrans household-goods carrier requirements',
  georgia: 'Georgia Department of Transportation (GDOT) permit and routing guidelines',
  'new-york': 'New York State DOT oversize vehicle permit requirements',
  'new-jersey': 'New Jersey DOT oversize/overweight permit regulations',
  maryland: 'Maryland State Highway Administration permit requirements',
  tennessee: 'Tennessee Department of Transportation permit guidelines',
  washington: 'Washington State DOT permit and routing requirements',
  arizona: 'Arizona DOT oversize/overweight permit rules',
  colorado: 'Colorado DOT permit requirements for commercial hauls',
  michigan: 'Michigan Department of Transportation permit guidelines',
  texas: 'Texas Department of Transportation permit requirements',
  virginia: 'Virginia DOT oversize/overweight permit rules',
  illinois: 'Illinois DOT household-goods carrier and permit requirements',
  pennsylvania: 'Pennsylvania DOT oversize vehicle permit rules',
  ohio: 'Ohio Department of Transportation permit guidelines',
  'north-carolina': 'NCDOT oversize/overweight permit requirements',
};

export function getStateDotSource(stateSlug: string): string | undefined {
  return STATE_DOT_SOURCES[stateSlug];
}

export function getStateDotCitationList(stateSlug: string): string[] {
  const source = getStateDotSource(stateSlug);
  return source ? [source] : [];
}