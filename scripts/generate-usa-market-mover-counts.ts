/**
 * Generate density-based market mover counts for every US county.
 * Preserves California hand-tuned map; other states use major overrides + heuristics.
 *
 * Run: npx tsx scripts/generate-usa-market-mover-counts.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { localStates } from '../lib/local-movers/states';
import { californiaMarketMoverCounts } from '../lib/local-movers/market-mover-counts/california';

/** Explicit high-signal county overrides: stateSlug -> countySlug -> count */
const MAJOR_OVERRIDES: Record<string, Record<string, number>> = {
  // California handled separately via californiaMarketMoverCounts

  alabama: {
    jefferson: 72, // Birmingham
    mobile: 48,
    madison: 54, // Huntsville
    montgomery: 38,
    shelby: 28,
    baldwin: 26,
    tuscaloosa: 32,
  },
  alaska: {
    anchorage: 42,
    'fairbanks-north-star': 18,
    'matanuska-susitna': 16,
    juneau: 10,
    kenai: 8,
  },
  arizona: {
    maricopa: 268, // Phoenix
    pima: 96, // Tucson
    pinal: 38,
    yavapai: 28,
    mohave: 24,
    yuma: 22,
    coconino: 20,
  },
  arkansas: {
    pulaski: 58, // Little Rock
    benton: 36,
    washington: 34,
    sebastian: 22,
    craighead: 18,
  },
  colorado: {
    denver: 112,
    'el-paso': 88, // Colorado Springs
    arapahoe: 72,
    jefferson: 68,
    adams: 58,
    douglas: 48,
    boulder: 46,
    larimer: 42,
    weld: 36,
    pueblo: 24,
  },
  connecticut: {
    fairfield: 92, // Gold Coast / NYC corridor
    hartford: 68,
    'new-haven': 62,
    'new-london': 28,
    litchfield: 18,
    middlesex: 22,
    tolland: 16,
    windham: 14,
  },
  delaware: {
    'new-castle': 58, // Wilmington
    kent: 24,
    sussex: 28,
  },
  'district-of-columbia': {
    'district-of-columbia': 86,
    washington: 86,
    dc: 86,
  },
  florida: {
    'miami-dade': 246,
    broward: 168,
    'palm-beach': 142,
    orange: 128, // Orlando
    hillsborough: 118, // Tampa
    pinellas: 86,
    duval: 92, // Jacksonville
    lee: 64,
    collier: 42,
    brevard: 48,
    polk: 52,
    seminole: 44,
    volusia: 46,
    sarasota: 48,
    manatee: 36,
    pasco: 38,
    'st-lucie': 28,
    osceola: 34,
    lake: 28,
    marion: 26,
    alachua: 32,
    leon: 30,
    escambia: 28,
  },
  georgia: {
    fulton: 148, // Atlanta
    dekalb: 86,
    gwinnett: 92,
    cobb: 88,
    clayton: 42,
    chatham: 48, // Savannah
    richmond: 32, // Augusta
    muscogee: 28, // Columbus
    bibb: 26, // Macon
    forsyth: 34,
    cherokee: 32,
    henry: 28,
    hall: 24,
  },
  hawaii: {
    honolulu: 78, // Oahu
    maui: 28,
    hawaii: 24, // Big Island
    kauai: 14,
    kalawao: 1,
  },
  idaho: {
    ada: 64, // Boise
    canyon: 32,
    kootenai: 24,
    bonneville: 18,
    'twin-falls': 14,
  },
  illinois: {
    cook: 298, // Chicago
    duPage: 86,
    dupage: 86,
    lake: 72,
    will: 64,
    kane: 48,
    mchenry: 36,
    winnebago: 32, // Rockford
    madison: 28, // Metro East
    'st-clair': 26,
    peoria: 34,
    sangamon: 28, // Springfield
    champaign: 26,
    mclean: 22,
  },
  indiana: {
    marion: 98, // Indianapolis
    lake: 48, // NW Indiana
    allen: 42, // Fort Wayne
    hamilton: 36,
    'st-joseph': 32, // South Bend
    elkhart: 24,
    vanderburgh: 26, // Evansville
    tippecanoe: 22,
  },
  iowa: {
    polk: 72, // Des Moines
    linn: 36, // Cedar Rapids
    'scott': 28, // Quad Cities
    johnson: 26, // Iowa City
    'black-hawk': 22,
    woodbury: 18, // Sioux City
  },
  kansas: {
    'johnson': 68, // KC metro
    sedgwick: 58, // Wichita
    shawnee: 28, // Topeka
    wyandotte: 26,
    douglas: 22, // Lawrence
  },
  kentucky: {
    jefferson: 88, // Louisville
    fayette: 48, // Lexington
    boone: 24,
    kenton: 22,
    warren: 20,
  },
  louisiana: {
    'east-baton-rouge': 58,
    orleans: 72, // New Orleans
    jefferson: 64,
    caddo: 32, // Shreveport
    lafayette: 34,
    'st-tammany': 36,
    calcasieu: 24,
  },
  maine: {
    cumberland: 42, // Portland
    york: 28,
    penobscot: 18,
    kennebec: 14,
  },
  maryland: {
    montgomery: 98,
    'prince-georges': 86,
    baltimore: 92,
    'baltimore-city': 78,
    'anne-arundel': 64,
    howard: 48,
    frederick: 36,
    harford: 32,
    carroll: 24,
  },
  massachusetts: {
    middlesex: 148,
    suffolk: 112, // Boston
    worcester: 68,
    essex: 62,
    norfolk: 72,
    plymouth: 48,
    bristol: 42,
    hampden: 36,
    barnstable: 32, // Cape Cod
    berkshire: 16,
  },
  michigan: {
    wayne: 142, // Detroit
    oakland: 118,
    macomb: 86,
    kent: 64, // Grand Rapids
    genesee: 38, // Flint
    washtenaw: 48, // Ann Arbor
    ingham: 36, // Lansing
    ottawa: 32,
    kalamazoo: 34,
    saginaw: 24,
  },
  minnesota: {
    hennepin: 128, // Minneapolis
    ramsey: 72, // St Paul
    dakota: 48,
    anoka: 42,
    washington: 36,
    scott: 28,
    carver: 22,
    olmsted: 26, // Rochester
    'st-louis': 24, // Duluth
  },
  mississippi: {
    hinds: 38, // Jackson
    harrison: 28, // Gulfport
    desoto: 26,
    rankin: 22,
    madison: 20,
  },
  missouri: {
    'st-louis': 86,
    'st-louis-city': 64,
    jackson: 78, // Kansas City
    'st-charles': 42,
    clay: 32,
    greene: 36, // Springfield
    'jefferson': 28,
    boone: 24, // Columbia
  },
  montana: {
    yellowstone: 32, // Billings
    missoula: 26,
    gallatin: 28, // Bozeman
    cascade: 18, // Great Falls
    flathead: 16,
  },
  nebraska: {
    douglas: 72, // Omaha
    lancaster: 48, // Lincoln
    sarpy: 32,
    hall: 14,
  },
  nevada: {
    clark: 186, // Las Vegas
    washoe: 58, // Reno
    'carson-city': 12,
    douglas: 10,
  },
  'new-hampshire': {
    hillsborough: 48, // Manchester–Nashua
    rockingham: 36,
    merrimack: 22,
    strafford: 16,
  },
  'new-jersey': {
    bergen: 98,
    middlesex: 86,
    essex: 82,
    hudson: 78,
    monmouth: 64,
    ocean: 58,
    union: 56,
    passaic: 48,
    morris: 52,
    camden: 46,
    burlington: 42,
    mercer: 44, // Trenton / Princeton
    somerset: 36,
    atlantic: 28,
  },
  'new-mexico': {
    bernalillo: 68, // Albuquerque
    'dona-ana': 28, // Las Cruces
    'santa-fe': 26,
    sandoval: 22,
  },
  'new-york': {
    'new-york': 286, // Manhattan
    kings: 248, // Brooklyn
    queens: 212,
    bronx: 128,
    richmond: 64, // Staten Island
    nassau: 142,
    suffolk: 118,
    westchester: 98,
    erie: 72, // Buffalo
    monroe: 68, // Rochester
    onondaga: 48, // Syracuse
    albany: 42,
    dutchess: 32,
    orange: 36,
    rockland: 34,
    saratoga: 28,
  },
  'north-carolina': {
    mecklenburg: 128, // Charlotte
    'wake': 112, // Raleigh
    guilford: 58, // Greensboro
    forsyth: 48, // Winston-Salem
    durham: 52,
    buncombe: 36, // Asheville
    'new-hanover': 34, // Wilmington
    union: 28,
    cabarrus: 26,
    gaston: 28,
  },
  'north-dakota': {
    cass: 36, // Fargo
    burleigh: 24, // Bismarck
    'grand-forks': 18,
    williams: 14, // Williston
  },
  ohio: {
    cuyahoga: 118, // Cleveland
    franklin: 112, // Columbus
    hamilton: 98, // Cincinnati
    montgomery: 52, // Dayton
    summit: 54, // Akron
    lucas: 48, // Toledo
    stark: 36, // Canton
    butler: 34,
    lorain: 28,
    warren: 26,
  },
  oklahoma: {
    oklahoma: 78, // OKC
    tulsa: 72,
    cleveland: 32,
    canadian: 22,
  },
  oregon: {
    multnomah: 98, // Portland
    washington: 64,
    clackamas: 52,
    lane: 42, // Eugene
    marion: 36, // Salem
    deschutes: 28, // Bend
    jackson: 22,
  },
  pennsylvania: {
    philadelphia: 186,
    allegheny: 112, // Pittsburgh
    montgomery: 86,
    bucks: 64,
    delaware: 58,
    chester: 52,
    lancaster: 42,
    berks: 32,
    york: 34,
    lehigh: 36,
    erie: 28,
    dauphin: 32, // Harrisburg
    northampton: 26,
  },
  'rhode-island': {
    providence: 68,
    kent: 28,
    washington: 22,
    newport: 18,
    bristol: 14,
  },
  'south-carolina': {
    greenville: 58,
    richland: 52, // Columbia
    charleston: 64,
    horry: 48, // Myrtle Beach
    spartanburg: 36,
    lexington: 32,
    york: 34,
    berkeley: 28,
  },
  'south-dakota': {
    minnehaha: 42, // Sioux Falls
    pennington: 28, // Rapid City
    lincoln: 16,
  },
  tennessee: {
    shelby: 92, // Memphis
    davidson: 98, // Nashville
    knox: 54, // Knoxville
    hamilton: 48, // Chattanooga
    rutherford: 36,
    williamson: 32,
    sumner: 24,
    montgomery: 22,
  },
  texas: {
    harris: 268, // Houston
    'dallas': 198,
    tarrant: 142, // Fort Worth
    bexar: 128, // San Antonio
    travis: 118, // Austin
    collin: 86,
    denton: 72,
    'fort-bend': 64,
    hidalgo: 42,
    'el-paso': 58,
    williamson: 48,
    montgomery: 46,
    brazoria: 32,
    galveston: 34,
    nueces: 32, // Corpus
    cameron: 28,
    bell: 28,
    lubbock: 32,
    'web': 18,
    webb: 22,
    jefferson: 24,
    smith: 22,
    mclennan: 24,
  },
  utah: {
    'salt-lake': 98,
    utah: 64, // Provo–Orem
    davis: 42,
    weber: 36,
    washington: 32, // St George
    cache: 18,
  },
  vermont: {
    chittenden: 32, // Burlington
    washington: 12,
    rutland: 10,
    windsor: 8,
  },
  virginia: {
    fairfax: 128,
    'prince-william': 72,
    loudoun: 68,
    arlington: 64,
    chesterfield: 48,
    henrico: 52,
    'virginia-beach': 68,
    norfolk: 42,
    'chesapeake': 36,
    richmond: 48,
    alexandria: 34,
    'newport-news': 28,
    hampton: 22,
    roanoke: 26,
  },
  washington: {
    king: 186, // Seattle
    pierce: 78, // Tacoma
    snohomish: 86,
    spokane: 52,
    clark: 42, // Vancouver
    thurston: 32,
    kitsap: 28,
    whatcom: 26,
    yakima: 22,
  },
  'west-virginia': {
    kanawha: 28, // Charleston
    monongalia: 18, // Morgantown
    cabell: 16,
    berkeley: 14,
  },
  wisconsin: {
    milwaukee: 98,
    dane: 64, // Madison
    waukesha: 52,
    brown: 36, // Green Bay
    racine: 28,
    kenosha: 26,
    outagamie: 24,
    winnebago: 22,
  },
  wyoming: {
    laramie: 22, // Cheyenne
    natrona: 18, // Casper
    teton: 14, // Jackson
    albany: 10,
  },
};

/** Metro keyword → base count range midpoints */
const METRO_KEYWORD_TIERS: Array<{ re: RegExp; base: number; spread: number }> = [
  { re: /nyc|new-york-city|manhattan|brooklyn|queens|bronx/i, base: 180, spread: 40 },
  { re: /chicago|cook|los-angeles|greater-la|bay-area|houston|dfw|dallas|miami|south-florida/i, base: 120, spread: 35 },
  { re: /seattle|portland|denver|phoenix|atlanta|boston|philadelphia|detroit|minneapolis|tampa|orlando|charlotte|austin|san-antonio|san-diego|sacramento|washington-dc|dc-metro/i, base: 70, spread: 20 },
  { re: /metro|urban|city|suburban|corridor/i, base: 28, spread: 12 },
  { re: /rural|sierra|panhandle|plains|remote|north-country|frontier|outback|wilderness/i, base: 5, spread: 3 },
  { re: /region|valley|coast|central|northern|southern|eastern|western/i, base: 14, spread: 8 },
];

function hashSlug(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function estimateFromMetro(stateSlug: string, countySlug: string, metro?: string): number {
  const key = `${stateSlug}/${countySlug}`;
  const h = hashSlug(key);
  const unit = (h % 1000) / 1000; // 0..1

  if (!metro) {
    return clamp(Math.round(6 + unit * 10), 2, 18);
  }

  for (const tier of METRO_KEYWORD_TIERS) {
    if (tier.re.test(metro)) {
      const delta = Math.round((unit - 0.5) * 2 * tier.spread);
      return clamp(tier.base + delta, 1, 320);
    }
  }

  // Generic metro-*-xx tags: mid-small markets
  if (/-metro-/i.test(metro) || /metro-/i.test(metro)) {
    return clamp(Math.round(12 + unit * 18), 4, 40);
  }

  return clamp(Math.round(8 + unit * 14), 2, 28);
}

function resolveCount(
  stateSlug: string,
  countySlug: string,
  metro?: string
): number {
  if (stateSlug === 'california') {
    const ca = californiaMarketMoverCounts[countySlug];
    if (typeof ca === 'number') return ca;
  }

  const override =
    MAJOR_OVERRIDES[stateSlug]?.[countySlug] ??
    MAJOR_OVERRIDES[stateSlug]?.[countySlug.toLowerCase()];
  if (typeof override === 'number') return override;

  // DC single-jurisdiction fallbacks
  if (stateSlug === 'district-of-columbia') {
    return 86;
  }

  return estimateFromMetro(stateSlug, countySlug, metro);
}

function main() {
  const byState: Record<string, Record<string, number>> = {};
  let total = 0;
  let high = 0;
  let medium = 0;
  let low = 0;

  for (const state of localStates) {
    const counties = getCountiesForState(state.slug);
    const map: Record<string, number> = {};
    for (const county of counties) {
      const n = resolveCount(state.slug, county.slug, county.metro);
      map[county.slug] = n;
      total++;
      if (n >= 50) high++;
      else if (n >= 10) medium++;
      else low++;
    }
    // stable key order
    const ordered: Record<string, number> = {};
    for (const k of Object.keys(map).sort()) ordered[k] = map[k];
    byState[state.slug] = ordered;
  }

  // Ensure CA exact match
  byState.california = { ...californiaMarketMoverCounts };

  const outPath = path.join(
    process.cwd(),
    'lib/local-movers/market-mover-counts/usa-market-mover-counts.generated.ts'
  );
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const header = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: scripts/generate-usa-market-mover-counts.ts
 * Generated: ${new Date().toISOString()}
 *
 * Density-based market mover availability estimates per county.
 * California values are the hand-tuned map; other states use major-metro
 * overrides + metro-tag heuristics. Distinct from curated listing length.
 */
/* eslint-disable */
`;

  const body = `export const usaMarketMoverCounts: Record<string, Record<string, number>> = ${JSON.stringify(
    byState,
    null,
    2
  )};\n`;

  fs.writeFileSync(outPath, header + body, 'utf8');

  console.log(`Wrote ${outPath}`);
  console.log(`Counties: ${total} | high(≥50): ${high} | medium(10–49): ${medium} | low(<10): ${low}`);
  console.log(
    'Sample TX Harris:',
    byState.texas?.harris,
    'FL Miami-Dade:',
    byState.florida?.['miami-dade'],
    'NY Kings:',
    byState['new-york']?.kings,
    'CA LA:',
    byState.california?.['los-angeles']
  );
}

main();
