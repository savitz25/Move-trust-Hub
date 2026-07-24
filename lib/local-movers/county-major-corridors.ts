/**
 * Factual major roads/routes for County Moving Snapshot "Major corridors".
 * Roads only — never operational commentary (HOA density, tourism calendars, curb staging).
 * Covers all shipped Tier-1 intelligence packs (CA, FL, TX, GA, NY, AZ, NJ, SC).
 */

const CORRIDORS: Record<string, string> = {
  // ——— California ———
  'california/los-angeles':
    'I-405 · I-10 · I-5 · US-101 · I-110 · CA-1 (PCH)',
  'california/orange': 'I-5 · I-405 · CA-55 · CA-91 · CA-22 · Pacific Coast Hwy',
  'california/san-diego': 'I-5 · I-15 · I-8 · I-805 · CA-52 · CA-163',
  'california/santa-clara': 'US-101 · I-280 · CA-85 · CA-17 · CA-237 · I-680',
  'california/alameda': 'I-880 · I-580 · I-80 · I-680 · SR-24 · SR-13',
  'california/riverside': 'I-15 · I-215 · CA-91 · CA-60 · I-10',
  'california/san-bernardino': 'I-10 · I-15 · I-215 · CA-210 · CA-60',
  'california/sacramento': 'I-5 · I-80 · US-50 · CA-99 · Business 80',
  'california/contra-costa': 'I-680 · CA-4 · CA-24 · I-80 · CA-242',
  'california/san-francisco':
    'US-101 · I-280 · I-80 · Bay Bridge approaches · 19th Avenue / Park Presidio',
  'california/san-mateo': 'US-101 · I-280 · CA-92 · CA-1 · CA-84',
  'california/ventura': 'US-101 · CA-1 · CA-118 · CA-23 · CA-126',
  'california/fresno': 'CA-99 · CA-41 · CA-180 · CA-168 · I-5 (west approach)',
  'california/kern': 'CA-99 · CA-58 · I-5 · CA-178 · CA-119',
  'california/san-joaquin': 'I-5 · CA-99 · I-205 · CA-4 · CA-120',
  'california/sonoma': 'US-101 · CA-12 · CA-116 · CA-121 · CA-1',
  'california/placer': 'I-80 · CA-65 · CA-49 · I-80 Donner approaches',
  'california/santa-barbara': 'US-101 · CA-154 · CA-1 · CA-246',
  'california/monterey': 'CA-1 · CA-68 · US-101 · CA-156 · CA-183',

  // ——— Florida ———
  'florida/miami-dade': 'I-95 · I-75 · Florida Turnpike · US-1 · Dolphin Expressway (FL-836)',
  'florida/broward': 'I-95 · Florida Turnpike · I-595 · US-1 · Sawgrass Expressway (FL-869)',
  'florida/palm-beach': 'I-95 · Florida Turnpike · US-1 · PGA Boulevard · Glades Road',
  'florida/hillsborough': 'I-275 · I-4 · I-75 · US-41 · Selmon Expressway',
  'florida/orange': 'I-4 · FL-408 · FL-417 · US-17/92 · International Drive',
  'florida/pinellas': 'I-275 · US-19 · Courtney Campbell Causeway · Gandy Bridge · FL-60',
  'florida/duval': 'I-95 · I-10 · I-295 · US-1 · FL-9A (JTB)',
  'florida/lee': 'I-75 · US-41 · Summerlin Road · Colonial Boulevard · Sanibel Causeway approaches',
  'florida/polk': 'I-4 · US-27 · US-98 · Florida Turnpike · FL-570 (Polk Pkwy)',
  'florida/brevard': 'I-95 · US-1 · FL-528 · A1A · FL-520',
  'florida/pasco': 'I-75 · US-19 · FL-54 · FL-52 · Suncoast Parkway (FL-589)',
  'florida/volusia': 'I-4 · I-95 · US-1 · FL-40 · A1A',

  // ——— Texas ———
  'texas/harris': 'I-10 · I-45 · I-69/US-59 · Beltway 8 · Sam Houston Tollway · Hardy Toll Road',
  'texas/dallas': 'I-35E · I-30 · I-635 · Dallas North Tollway · PGBT',
  'texas/tarrant': 'I-30 · I-35W · I-820 · SH-183 · SH-121 · Chisholm Trail Pkwy',
  'texas/bexar': 'I-10 · I-35 · I-37 · Loop 1604 · US-281 · Loop 410',
  'texas/travis': 'I-35 · US-183 · SH-45 · SH-130 · MoPac (Loop 1) · US-290',
  'texas/collin': 'US-75 · PGBT · Dallas North Tollway · SH-121 · US-380',
  'texas/denton': 'I-35E · I-35W · US-380 · Loop 288 · Sam Rayburn Tollway',
  'texas/fort-bend': 'US-59/I-69 · Grand Parkway (SH-99) · Westpark Tollway · US-90A · SH-6',
  'texas/montgomery': 'I-45 · SH-99 · FM-1488 · SH-242 · US-59 (south approach)',
  'texas/williamson': 'I-35 · SH-130 · US-183 · SH-45 · RM-620',
  'texas/el-paso': 'I-10 · US-54 · Loop 375 · I-110 · Mesa Street corridor',
  'texas/hidalgo': 'US-83 · I-2 · I-69C · US-281 · SH-107',

  // ——— Georgia ———
  'georgia/fulton': 'I-75/85 Connector · I-285 · GA-400 · I-20',
  'georgia/gwinnett': 'I-85 · I-985 · GA-316 · US-78 · Sugarloaf Pkwy',
  'georgia/cobb': 'I-75 · I-285 · US-41 · GA-120 · East-West Connector',
  'georgia/dekalb': 'I-285 · I-20 · US-78 · Clairmont Road · Buford Highway',
  'georgia/chatham': 'I-16 · I-95 · US-17 · US-80 · Truman Pkwy',
  'georgia/cherokee': 'I-575 · GA-20 · GA-92 · GA-140 · I-75 (south approach)',
  'georgia/clayton': 'I-75 · I-285 · US-19/41 · GA-138 · Tara Boulevard',
  'georgia/forsyth': 'GA-400 · GA-20 · GA-141 · US-19 · McFarland Pkwy',
  'georgia/henry': 'I-75 · I-675 · US-23 · GA-20 · GA-155',
  'georgia/hall': 'I-985 · US-129 · GA-365 · GA-53 · Spout Springs Road',
  'georgia/richmond': 'I-20 · I-520 · US-1 · Gordon Highway · Washington Road',
  'georgia/muscogee': 'I-185 · US-27 · US-280 · Victory Drive · Manchester Expressway',

  // ——— New York ———
  'new-york/kings':
    'I-278 (BQE) · Belt Parkway · Gowanus Expressway · Prospect Expressway · Ocean Pkwy',
  'new-york/queens':
    'I-495 (LIE) · Grand Central Pkwy · Van Wyck Expressway · Cross Island Pkwy · I-678',
  'new-york/new-york':
    'FDR Drive · West Side Highway · Harlem River Drive · I-95 approaches · Midtown Tunnel approaches',
  'new-york/bronx':
    'I-87 (Major Deegan) · I-95 · Cross Bronx Expressway · Bruckner Expressway · Grand Concourse',
  'new-york/richmond':
    'I-278 · Korean War Veterans Pkwy · West Shore Expressway · Richmond Pkwy · Outerbridge approaches',
  'new-york/nassau': 'I-495 (LIE) · Northern State Pkwy · Southern State Pkwy · Meadowbrook Pkwy · Wantagh Pkwy',
  'new-york/suffolk': 'I-495 (LIE) · Sunrise Highway (NY-27) · Northern State Pkwy · NY-25 · Sagtikos Pkwy',
  'new-york/westchester': 'I-87 · I-95 · I-287 · Hutchinson River Pkwy · Sprain Brook Pkwy · Saw Mill River Pkwy',
  'new-york/erie': 'I-90 · I-190 · NY-33 (Kensington) · NY-5 · I-290',
  'new-york/monroe': 'I-490 · I-390 · I-590 · NY-104 · Inner Loop approaches',
  'new-york/onondaga': 'I-81 · I-90 · I-690 · NY-481 · NY-5',
  'new-york/albany': 'I-87 · I-90 · US-9 · NY-7 · I-787',

  // ——— Arizona ———
  'arizona/maricopa': 'I-10 · I-17 · Loop 101 · Loop 202 · US-60 · Loop 303',
  'arizona/pima': 'I-10 · I-19 · AZ-77 · AZ-86 · Grant / Broadway corridors',
  'arizona/pinal': 'I-10 · AZ-347 · AZ-79 · US-60 · AZ-287',
  'arizona/yavapai': 'I-17 · AZ-69 · AZ-89 · AZ-89A · AZ-69/169 corridors',
  'arizona/mohave': 'I-40 · US-93 · AZ-95 · I-15 (northwest edge) · AZ-68',
  'arizona/yuma': 'I-8 · US-95 · AZ-195 · Business 8 · 4th Avenue corridor',
  'arizona/coconino': 'I-40 · I-17 · US-89 · US-180 · AZ-89A',

  // ——— South Carolina Core 12 ———
  'south-carolina/greenville': 'I-85 · I-385 · US-123 · SC-183 · Woodruff Road · Pelham Road',
  'south-carolina/charleston': 'I-26 · I-526 · US-17 · SC-7 · peninsula approaches',
  'south-carolina/richland': 'I-20 · I-26 · I-77 · US-1 · SC-277',
  'south-carolina/horry': 'US-17 · SC-31 (Carolina Bays) · US-501 · SC-9',
  'south-carolina/spartanburg': 'I-85 · I-26 · US-221 · Business I-85 links',
  'south-carolina/york': 'I-77 · US-21 · SC-161 · SC-5 · SC-160',
  'south-carolina/lexington': 'I-20 · I-26 · US-1 · US-378',
  'south-carolina/berkeley': 'I-26 · US-52 · US-17A · Clements Ferry corridors',
  'south-carolina/beaufort': 'US-278 · US-21 · SC-170 · island-causeway approaches',
  'south-carolina/dorchester': 'I-26 · US-78 · SC-165 · Summerville arterials',
  'south-carolina/anderson': 'I-85 · US-76 · SC-28 · SC-81',
  'south-carolina/florence': 'I-95 · I-20 · US-52 · US-76',

  // ——— Virginia Core 12 ———
  'virginia/fairfax': 'I-66 · I-495 · VA-28 · Dulles Toll Road · VA-236 · I-95 links',
  'virginia/prince-william': 'I-95 · I-66 · VA-234 · US-1 · Prince William Pkwy',
  'virginia/loudoun': 'VA-7 · VA-28 · Dulles Toll Road · US-15 · Loudoun County Pkwy',
  'virginia/chesterfield': 'Chippenham Pkwy · VA-288 · US-60 · US-360 · I-95 links',
  'virginia/henrico': 'I-64 · I-295 · US-33 · US-250 · Parham Road corridors',
  'virginia/virginia-beach': 'I-264 · I-64 · VA-44 links · Shore Drive · Virginia Beach Blvd',
  'virginia/arlington': 'I-395 · I-66 · GW Parkway · VA-50 · local arterial grid',
  'virginia/richmond': 'I-95 · I-64 · I-195 · Downtown Expressway · Broad Street corridor',
  'virginia/chesapeake': 'I-64 · I-464 · VA-168 · Dominion Blvd · Greenbrier Pkwy',
  'virginia/norfolk': 'I-64 · I-264 · I-564 · Downtown Tunnel approaches · Naval Base access corridors',
  'virginia/stafford': 'I-95 · US-1 · VA-610 (Garrisonville) · VA-17',
  'virginia/spotsylvania': 'I-95 · VA-3 · US-1 · VA-208',

  // ——— Tennessee Core 12 ———
  'tennessee/shelby': 'I-40 · I-55 · I-240 · I-69 links · US-51 · US-61',
  'tennessee/davidson': 'I-40 · I-24 · I-65 · Briley Pkwy · Ellington Pkwy · US-41',
  'tennessee/knox': 'I-40 · I-75 · I-640 · US-129 · Alcoa Hwy · Kingston Pike',
  'tennessee/hamilton': 'I-24 · I-75 · US-27 · TN-153 · Broad Street corridor',
  'tennessee/rutherford': 'I-24 · US-41/70S · TN-840 links · Medical Center Pkwy · Old Fort Pkwy',
  'tennessee/williamson': 'I-65 · TN-840 · US-31 · Cool Springs Blvd · Hillsboro Rd corridors',
  'tennessee/montgomery': 'I-24 · US-41A · TN-374 · 101st Airborne Pkwy · Fort Campbell Blvd',
  'tennessee/sumner': 'I-65 · Vietnam Veterans Blvd · US-31E · TN-386 · Gallatin Pike',
  'tennessee/wilson': 'I-40 · US-70 · TN-109 · Mt. Juliet Road · Lebanon Pike corridors',
  'tennessee/blount': 'US-129 · US-321 · I-140 links · Alcoa Hwy · scenic foothill approaches',
  'tennessee/sevier': 'US-441 · US-321 · US-411 · Forks of the River Pkwy · tourism spur corridors',
  'tennessee/sullivan': 'I-81 · I-26 · US-11W · US-23 · State of Franklin Rd corridors',

  // ——— North Carolina Core 12 ———
  'north-carolina/mecklenburg': 'I-77 · I-85 · I-485 · US-74 · NC-16 · Billy Graham Pkwy',
  'north-carolina/wake': 'I-40 · I-440 · I-540 · US-1 · US-70 · NC-54',
  'north-carolina/guilford': 'I-40 · I-85 · US-29 · US-220 · Bryan Boulevard · Wendover Avenue',
  'north-carolina/forsyth': 'I-40 · US-52 · US-421 · I-285 · Business 40 · Silas Creek Pkwy',
  'north-carolina/durham': 'I-40 · I-85 · NC-147 (Durham Freeway) · US-15-501 · NC-55',
  'north-carolina/cumberland':
    'I-95 · All American Freeway · NC-24 · NC-87 · Bragg Boulevard · Raeford Road',
  'north-carolina/buncombe': 'I-40 · I-26 · US-19/23 · US-70 · Smoky Park Hwy · tunnel approaches',
  'north-carolina/new-hanover': 'I-40 terminus · US-17 · US-74/76 · Oleander Drive · College Road',
  'north-carolina/union': 'US-74 · I-485 links · NC-16 · NC-84 · Providence Road corridor',
  'north-carolina/cabarrus': 'I-85 · US-29 · Concord Mills Blvd · NC-49 · NC-73',
  'north-carolina/gaston': 'I-85 · US-321 · US-74 · NC-279 · Wilkinson Blvd',
  'north-carolina/onslow': 'US-17 · NC-24 · Western Boulevard · Lejeune Boulevard · base-access roads',

  // ——— New Jersey (shared Tier-1 template) ———
  'new-jersey/bergen': 'I-95 / NJ Turnpike · I-80 · Route 17 · Route 4 · GWB approaches',
  'new-jersey/essex': 'I-280 · Garden State Pkwy · I-78 · Route 21 · Route 24',
  'new-jersey/middlesex': 'NJ Turnpike · Garden State Pkwy · Route 1 · Route 18 · I-287',
  'new-jersey/monmouth': 'Garden State Pkwy · Route 18 · Route 35 · Route 36 · I-195',
  'new-jersey/morris': 'I-80 · I-287 · Route 24 · Route 10 · Route 46',
  'new-jersey/ocean': 'Garden State Pkwy · Route 9 · Route 37 · Route 70 · Route 72',
  'new-jersey/warren': 'I-80 · Route 46 · Route 31 · Route 57 · Delaware River approaches',
  'new-jersey/mercer': 'I-95 / NJ Turnpike · I-295 · Route 1 · Route 29 · Route 206',
  'new-jersey/somerset': 'I-287 · Route 22 · Route 202/206 · Route 28 · I-78',
  'new-jersey/atlantic': 'ACE · Garden State Pkwy · US-30 · US-40/322 · Route 9',
  'new-jersey/gloucester': 'NJ Turnpike · I-295 · Route 42 · Route 55 · US-322',
  'new-jersey/hunterdon': 'I-78 · Route 31 · Route 202 · Route 12 · Route 29',
  'new-jersey/sussex': 'I-80 · Route 15 · Route 23 · Route 206 · Route 94',
};

/** True when string looks like roads, not operational essay. */
export function isFactualCorridorList(value: string): boolean {
  const v = value.trim();
  if (v.length < 6) return false;
  if (
    /tourism calendars|operational inputs|hoa density|parking\/curb|curb staging|portal-to-portal/i.test(
      v
    )
  ) {
    return false;
  }
  // At least one road-like token (I-10, US-101, Loop 101, Route 17, etc.)
  return /\b(I[-\s]?\d{1,3}[A-Z]?|US[-\s]?\d{1,3}|FL[-\s]?\d{1,3}|CA[-\s]?\d{1,3}|GA[-\s]?\d{1,3}|NY[-\s]?\d{1,3}|AZ[-\s]?\d{1,3}|SC[-\s]?\d{1,3}|NC[-\s]?\d{1,3}|VA[-\s]?\d{1,3}|TN[-\s]?\d{1,3}|SR[-\s]?\d{1,3}|SH[-\s]?\d{1,3}|Route\s+\d{1,3}|Loop\s+\d{1,3}|Turnpike|Parkway|Expressway|Pkwy|Tollway|PGBT|Connector|Highway|Blvd|Boulevard|Drive|ACE|GWB|FDR|MoPac|Parkway)\b/i.test(
    v
  );
}

/** Curated major corridors for a county, if defined. */
export function getCountyMajorCorridors(
  stateSlug: string,
  countySlug: string
): string | undefined {
  return CORRIDORS[`${stateSlug}/${countySlug}`];
}

/** All curated corridor keys (for QA completeness). */
export function listCuratedMajorCorridorKeys(): string[] {
  return Object.keys(CORRIDORS);
}
