/**
 * High-traffic metro counties targeted for balanced quality-gate expansion.
 * Each must maintain: explicit assignment, county research, 8+ FMCSA-verified movers, 60%+ USDOT coverage.
 */
export const PREMIUM_METRO_COUNTIES: ReadonlyArray<{ stateSlug: string; countySlug: string }> = [
  // Arizona
  { stateSlug: 'arizona', countySlug: 'maricopa' },
  { stateSlug: 'arizona', countySlug: 'pima' },
  // Washington
  { stateSlug: 'washington', countySlug: 'king' },
  { stateSlug: 'washington', countySlug: 'pierce' },
  { stateSlug: 'washington', countySlug: 'snohomish' },
  // Illinois
  { stateSlug: 'illinois', countySlug: 'cook' },
  { stateSlug: 'illinois', countySlug: 'dupage' },
  { stateSlug: 'illinois', countySlug: 'lake' },
  { stateSlug: 'illinois', countySlug: 'will' },
  // Colorado
  { stateSlug: 'colorado', countySlug: 'denver' },
  { stateSlug: 'colorado', countySlug: 'jefferson' },
  { stateSlug: 'colorado', countySlug: 'arapahoe' },
  { stateSlug: 'colorado', countySlug: 'adams' },
  { stateSlug: 'colorado', countySlug: 'douglas' },
  // Nevada
  { stateSlug: 'nevada', countySlug: 'clark' },
  { stateSlug: 'nevada', countySlug: 'washoe' },
  // Ohio
  { stateSlug: 'ohio', countySlug: 'franklin' },
  { stateSlug: 'ohio', countySlug: 'cuyahoga' },
  { stateSlug: 'ohio', countySlug: 'hamilton' },
  { stateSlug: 'ohio', countySlug: 'summit' },
  // Michigan
  { stateSlug: 'michigan', countySlug: 'wayne' },
  { stateSlug: 'michigan', countySlug: 'oakland' },
  { stateSlug: 'michigan', countySlug: 'macomb' },
  { stateSlug: 'michigan', countySlug: 'kent' },
  { stateSlug: 'michigan', countySlug: 'washtenaw' },
  // Virginia
  { stateSlug: 'virginia', countySlug: 'fairfax' },
  { stateSlug: 'virginia', countySlug: 'prince-william' },
  { stateSlug: 'virginia', countySlug: 'loudoun' },
  { stateSlug: 'virginia', countySlug: 'henrico' },
  { stateSlug: 'virginia', countySlug: 'chesterfield' },
  // Maryland
  { stateSlug: 'maryland', countySlug: 'montgomery' },
  { stateSlug: 'maryland', countySlug: 'prince-georges' },
  { stateSlug: 'maryland', countySlug: 'baltimore' },
  { stateSlug: 'maryland', countySlug: 'anne-arundel' },
  { stateSlug: 'maryland', countySlug: 'howard' },
  // Pennsylvania
  { stateSlug: 'pennsylvania', countySlug: 'philadelphia' },
  { stateSlug: 'pennsylvania', countySlug: 'allegheny' },
  { stateSlug: 'pennsylvania', countySlug: 'montgomery' },
  { stateSlug: 'pennsylvania', countySlug: 'bucks' },
  { stateSlug: 'pennsylvania', countySlug: 'delaware' },
  // California (expand beyond LA)
  { stateSlug: 'california', countySlug: 'orange' },
  { stateSlug: 'california', countySlug: 'san-diego' },
  { stateSlug: 'california', countySlug: 'santa-clara' },
  { stateSlug: 'california', countySlug: 'san-francisco' },
  { stateSlug: 'california', countySlug: 'alameda' },
  { stateSlug: 'california', countySlug: 'sacramento' },
  { stateSlug: 'california', countySlug: 'riverside' },
  { stateSlug: 'california', countySlug: 'san-bernardino' },
  // Georgia
  { stateSlug: 'georgia', countySlug: 'fulton' },
  { stateSlug: 'georgia', countySlug: 'gwinnett' },
  { stateSlug: 'georgia', countySlug: 'cobb' },
  { stateSlug: 'georgia', countySlug: 'dekalb' },
  // North Carolina
  { stateSlug: 'north-carolina', countySlug: 'wake' },
  { stateSlug: 'north-carolina', countySlug: 'mecklenburg' },
  { stateSlug: 'north-carolina', countySlug: 'guilford' },
  { stateSlug: 'north-carolina', countySlug: 'durham' },
  { stateSlug: 'north-carolina', countySlug: 'forsyth' },
  // Tennessee
  { stateSlug: 'tennessee', countySlug: 'davidson' },
  { stateSlug: 'tennessee', countySlug: 'shelby' },
  { stateSlug: 'tennessee', countySlug: 'knox' },
  { stateSlug: 'tennessee', countySlug: 'hamilton' },
  { stateSlug: 'tennessee', countySlug: 'williamson' },
  // Texas (expand)
  { stateSlug: 'texas', countySlug: 'travis' },
  { stateSlug: 'texas', countySlug: 'tarrant' },
  { stateSlug: 'texas', countySlug: 'bexar' },
  { stateSlug: 'texas', countySlug: 'collin' },
  { stateSlug: 'texas', countySlug: 'denton' },
  { stateSlug: 'texas', countySlug: 'fort-bend' },
  // New York
  { stateSlug: 'new-york', countySlug: 'kings' },
  { stateSlug: 'new-york', countySlug: 'new-york' },
  { stateSlug: 'new-york', countySlug: 'queens' },
  { stateSlug: 'new-york', countySlug: 'nassau' },
  { stateSlug: 'new-york', countySlug: 'westchester' },
  { stateSlug: 'new-york', countySlug: 'suffolk' },
  // New Jersey
  { stateSlug: 'new-jersey', countySlug: 'hudson' },
  { stateSlug: 'new-jersey', countySlug: 'essex' },
  { stateSlug: 'new-jersey', countySlug: 'bergen' },
  { stateSlug: 'new-jersey', countySlug: 'middlesex' },
  { stateSlug: 'new-jersey', countySlug: 'monmouth' },
  // Florida (expand)
  { stateSlug: 'florida', countySlug: 'miami-dade' },
  { stateSlug: 'florida', countySlug: 'broward' },
  { stateSlug: 'florida', countySlug: 'palm-beach' },
  { stateSlug: 'florida', countySlug: 'hillsborough' },
  { stateSlug: 'florida', countySlug: 'orange' },
  { stateSlug: 'florida', countySlug: 'pinellas' },
  { stateSlug: 'florida', countySlug: 'duval' },
  // South Carolina Core 12
  { stateSlug: 'south-carolina', countySlug: 'greenville' },
  { stateSlug: 'south-carolina', countySlug: 'charleston' },
  { stateSlug: 'south-carolina', countySlug: 'richland' },
  { stateSlug: 'south-carolina', countySlug: 'horry' },
  { stateSlug: 'south-carolina', countySlug: 'spartanburg' },
  { stateSlug: 'south-carolina', countySlug: 'york' },
  { stateSlug: 'south-carolina', countySlug: 'lexington' },
  { stateSlug: 'south-carolina', countySlug: 'berkeley' },
  { stateSlug: 'south-carolina', countySlug: 'beaufort' },
  { stateSlug: 'south-carolina', countySlug: 'dorchester' },
  { stateSlug: 'south-carolina', countySlug: 'anderson' },
  { stateSlug: 'south-carolina', countySlug: 'florence' },
  // Virginia Core 12
  { stateSlug: 'virginia', countySlug: 'fairfax' },
  { stateSlug: 'virginia', countySlug: 'prince-william' },
  { stateSlug: 'virginia', countySlug: 'loudoun' },
  { stateSlug: 'virginia', countySlug: 'chesterfield' },
  { stateSlug: 'virginia', countySlug: 'henrico' },
  { stateSlug: 'virginia', countySlug: 'virginia-beach' },
  { stateSlug: 'virginia', countySlug: 'arlington' },
  { stateSlug: 'virginia', countySlug: 'richmond' },
  { stateSlug: 'virginia', countySlug: 'chesapeake' },
  { stateSlug: 'virginia', countySlug: 'norfolk' },
  { stateSlug: 'virginia', countySlug: 'stafford' },
  { stateSlug: 'virginia', countySlug: 'spotsylvania' },
  // Indiana / Missouri / Minnesota
  { stateSlug: 'indiana', countySlug: 'marion' },
  { stateSlug: 'indiana', countySlug: 'hamilton' },
  { stateSlug: 'missouri', countySlug: 'st-louis' },
  { stateSlug: 'missouri', countySlug: 'jackson' },
  { stateSlug: 'minnesota', countySlug: 'hennepin' },
  { stateSlug: 'minnesota', countySlug: 'ramsey' },
  // Oregon / Utah
  { stateSlug: 'oregon', countySlug: 'multnomah' },
  { stateSlug: 'oregon', countySlug: 'washington' },
  { stateSlug: 'utah', countySlug: 'salt-lake' },
  { stateSlug: 'utah', countySlug: 'utah' },
] as const;

const premiumMetroKeySet = new Set(
  PREMIUM_METRO_COUNTIES.map((c) => `${c.stateSlug}/${c.countySlug}`)
);

export function isPremiumMetroCounty(stateSlug: string, countySlug: string): boolean {
  return premiumMetroKeySet.has(`${stateSlug}/${countySlug}`);
}