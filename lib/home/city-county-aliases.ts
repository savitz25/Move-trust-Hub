/**
 * Offline city → county fallbacks when Census reverse-geocode is unavailable.
 * Keys: `${normalizedCity}|${stateCode}` → county slug (must exist in state data).
 * Prefer Census coordinates resolution in resolve-route-from-zip; this is backup only.
 */

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** High-traffic / fuzzy-match failures (city name ≠ county name). */
const ALIASES: Record<string, string> = {
  // Florida — South FL metros
  "boca raton|fl": "palm-beach",
  "delray beach|fl": "palm-beach",
  "boynton beach|fl": "palm-beach",
  "west palm beach|fl": "palm-beach",
  "jupiter|fl": "palm-beach",
  "wellington|fl": "palm-beach",
  "lake worth|fl": "palm-beach",
  "lake worth beach|fl": "palm-beach",
  "riviera beach|fl": "palm-beach",
  "palm beach gardens|fl": "palm-beach",
  "royal palm beach|fl": "palm-beach",
  "greenacres|fl": "palm-beach",
  "belle glade|fl": "palm-beach",
  "fort lauderdale|fl": "broward",
  "hollywood beach|fl": "broward",
  "pompano beach|fl": "broward",
  "coral springs|fl": "broward",
  "hollywood|fl": "broward",
  "plantation|fl": "broward",
  "miramar|fl": "broward",
  "pembroke pines|fl": "broward",
  "davie|fl": "broward",
  "sunrise|fl": "broward",
  "deerfield beach|fl": "broward",
  "miami|fl": "miami-dade",
  "miami beach|fl": "miami-dade",
  "hialeah|fl": "miami-dade",
  "homestead|fl": "miami-dade",
  "coral gables|fl": "miami-dade",
  "doral|fl": "miami-dade",
  "kendall|fl": "miami-dade",
  "aventura|fl": "miami-dade",
  "north miami|fl": "miami-dade",
  "orlando|fl": "orange",
  "winter park|fl": "orange",
  "kissimmee|fl": "osceola",
  "tampa|fl": "hillsborough",
  "st petersburg|fl": "pinellas",
  "saint petersburg|fl": "pinellas",
  "clearwater|fl": "pinellas",
  "jacksonville|fl": "duval",
  "tallahassee|fl": "leon",
  "gainesville|fl": "alachua",
  "pensacola|fl": "escambia",
  "fort myers|fl": "lee",
  "cape coral|fl": "lee",
  "naples|fl": "collier",
  "sarasota|fl": "sarasota",
  "bradenton|fl": "manatee",
  "lakeland|fl": "polk",
  "port st lucie|fl": "st-lucie",
  "port saint lucie|fl": "st-lucie",
  "melbourne|fl": "brevard",
  "daytona beach|fl": "volusia",
  // Texas — seat ≠ county name
  "austin|tx": "travis",
  "houston|tx": "harris",
  "dallas|tx": "dallas",
  "san antonio|tx": "bexar",
  "fort worth|tx": "tarrant",
  "el paso|tx": "el-paso",
  "plano|tx": "collin",
  "irving|tx": "dallas",
  "arlington|tx": "tarrant",
  // California
  "los angeles|ca": "los-angeles",
  "san diego|ca": "san-diego",
  "san francisco|ca": "san-francisco",
  "san jose|ca": "santa-clara",
  "sacramento|ca": "sacramento",
  "oakland|ca": "alameda",
  "long beach|ca": "los-angeles",
  "anaheim|ca": "orange",
  "fresno|ca": "fresno",
  "irvine|ca": "orange",
  // New York
  "new york|ny": "new-york",
  "brooklyn|ny": "kings",
  "queens|ny": "queens",
  "bronx|ny": "bronx",
  "manhattan|ny": "new-york",
  "staten island|ny": "richmond",
  "buffalo|ny": "erie",
  "rochester|ny": "monroe",
  "albany|ny": "albany",
  // Illinois / Georgia / Arizona / Colorado / Washington / Massachusetts / Nevada
  "chicago|il": "cook",
  "atlanta|ga": "fulton",
  "savannah|ga": "chatham",
  "phoenix|az": "maricopa",
  "tucson|az": "pima",
  "scottsdale|az": "maricopa",
  "mesa|az": "maricopa",
  "denver|co": "denver",
  "colorado springs|co": "el-paso",
  "seattle|wa": "king",
  "spokane|wa": "spokane",
  "tacoma|wa": "pierce",
  "bellevue|wa": "king",
  "boston|ma": "suffolk",
  "cambridge|ma": "middlesex",
  "worcester|ma": "worcester",
  "las vegas|nv": "clark",
  "henderson|nv": "clark",
  "reno|nv": "washoe",
  // Carolinas / Virginia / Pennsylvania / Ohio / Michigan / Oregon / Utah / Tennessee
  "charlotte|nc": "mecklenburg",
  "raleigh|nc": "wake",
  "durham|nc": "durham",
  "charleston|sc": "charleston",
  "columbia|sc": "richland",
  "richmond|va": "richmond-city",
  "virginia beach|va": "virginia-beach-city",
  "arlington|va": "arlington",
  "philadelphia|pa": "philadelphia",
  "pittsburgh|pa": "allegheny",
  "columbus|oh": "franklin",
  "cleveland|oh": "cuyahoga",
  "cincinnati|oh": "hamilton",
  "detroit|mi": "wayne",
  "grand rapids|mi": "kent",
  "portland|or": "multnomah",
  "salem|or": "marion",
  "salt lake city|ut": "salt-lake",
  "provo|ut": "utah",
  "nashville|tn": "davidson",
  "memphis|tn": "shelby",
  "knoxville|tn": "knox",
};

export function lookupCityCountyAlias(
  city: string,
  stateCode: string
): string | null {
  const key = `${norm(city)}|${stateCode.trim().toLowerCase()}`;
  return ALIASES[key] ?? null;
}
