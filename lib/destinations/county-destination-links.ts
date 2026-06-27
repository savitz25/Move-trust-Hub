/** Bidirectional county ↔ destination hub links for internal linking SEO */

export type DestinationHubLink = {
  label: string;
  href: string;
  description: string;
};

const COUNTY_DESTINATION_HUBS: Record<string, Record<string, DestinationHubLink>> = {
  'south-carolina': {
    horry: {
      label: 'Moving to South Carolina',
      href: '/moving-to/south-carolina',
      description: 'Grand Strand inbound guide — costs, routes, and interstate movers',
    },
    georgetown: {
      label: 'Moving to the Grand Strand',
      href: '/moving-to/south-carolina/myrtle-beach-sc',
      description: 'Myrtle Beach, Murrells Inlet, and Georgetown County coastal guides',
    },
    beaufort: {
      label: 'Moving to Hilton Head',
      href: '/moving-to/south-carolina/hilton-head-sc',
      description: 'Premier Lowcountry island and resort inbound moving guide',
    },
    greenville: {
      label: 'Moving to Greenville',
      href: '/moving-to/south-carolina/greenville-sc',
      description: 'Upstate SC economic powerhouse inbound moving guide',
    },
    spartanburg: {
      label: 'Moving to Spartanburg',
      href: '/moving-to/south-carolina/spartanburg-sc',
      description: 'Automotive and logistics Upstate SC inbound guide',
    },
  },
  'north-carolina': {
    brunswick: {
      label: 'Moving to Wilmington & Leland',
      href: '/moving-to/north-carolina/wilmington-leland-nc',
      description: 'Wilmington–Brunswick corridor inbound moving guide',
    },
    'new-hanover': {
      label: 'Moving to Wilmington & Leland',
      href: '/moving-to/north-carolina/wilmington-leland-nc',
      description: 'Wilmington-area inbound moving guide and cost data',
    },
    mecklenburg: {
      label: 'Moving to Charlotte',
      href: '/moving-to/north-carolina/charlotte-nc',
      description: 'Charlotte metro inbound guide — banking, corporate, and lakefront suburbs',
    },
    wake: {
      label: 'Moving to the Research Triangle',
      href: '/moving-to/north-carolina/raleigh-durham-nc',
      description: 'Raleigh, Durham, and Triangle tech/biotech relocation guides',
    },
    iredell: {
      label: 'Moving to Mooresville',
      href: '/moving-to/north-carolina/mooresville-nc',
      description: 'Lake Norman lifestyle and Charlotte-commute inbound guide',
    },
    catawba: {
      label: 'Moving to Hickory',
      href: '/moving-to/north-carolina/hickory-nc',
      description: 'Blue Ridge foothills affordable alternative near Charlotte',
    },
  },
  idaho: {
    ada: {
      label: 'Moving to Idaho',
      href: '/moving-to/idaho',
      description: 'Treasure Valley inbound guide — Boise, Meridian, Eagle city hubs',
    },
    canyon: {
      label: 'Moving to Nampa & Caldwell',
      href: '/moving-to/idaho/nampa-caldwell-id',
      description: 'Affordable Treasure Valley corridor with Boise job access',
    },
    kootenai: {
      label: "Moving to Coeur d'Alene",
      href: '/moving-to/idaho/coeur-dalene-id',
      description: 'Panhandle lakeside inbound moving guide',
    },
    bonner: {
      label: 'Moving to Sandpoint',
      href: '/moving-to/idaho/sandpoint-id',
      description: 'Lake Pend Oreille and Schweitzer Mountain relocation guide',
    },
    bonneville: {
      label: 'Moving to Idaho Falls',
      href: '/moving-to/idaho/idaho-falls-id',
      description: 'Eastern Idaho INL corridor inbound guide',
    },
    'twin-falls': {
      label: 'Moving to Twin Falls',
      href: '/moving-to/idaho/twin-falls-id',
      description: 'Snake River Canyon affordable outdoor living guide',
    },
  },
  oregon: {
    multnomah: {
      label: 'Moving to Portland',
      href: '/moving-to/oregon/portland-or',
      description: 'Portland metro inbound moving guide — creative urban neighborhoods',
    },
    washington: {
      label: 'Moving to Hillsboro & Beaverton',
      href: '/moving-to/oregon/hillsboro-beaverton-or',
      description: 'Silicon Forest tech corridor inbound guide with MAX light-rail access',
    },
    clackamas: {
      label: 'Moving to Oregon',
      href: '/moving-to/oregon',
      description: 'Portland metro spillover — Oregon inbound cluster overview',
    },
    deschutes: {
      label: 'Moving to Bend',
      href: '/moving-to/oregon/bend-or',
      description: 'Central Oregon outdoor capital inbound moving guide',
    },
    lane: {
      label: 'Moving to Eugene',
      href: '/moving-to/oregon/eugene-or',
      description: 'University of Oregon Willamette Valley inbound guide',
    },
    benton: {
      label: 'Moving to Corvallis',
      href: '/moving-to/oregon/corvallis-or',
      description: 'Oregon State University research corridor inbound guide',
    },
    marion: {
      label: 'Moving to Salem',
      href: '/moving-to/oregon/salem-or',
      description: 'Affordable Oregon state capital inbound moving guide',
    },
    polk: {
      label: 'Moving to Salem',
      href: '/moving-to/oregon/salem-or',
      description: 'West Salem and Polk County — state capital corridor guide',
    },
  },
  oklahoma: {
    oklahoma: {
      label: 'Moving to Oklahoma City',
      href: '/moving-to/oklahoma/oklahoma-city-ok',
      description: 'OKC metro inbound guide — MAPS revitalization and aerospace corridor',
    },
    canadian: {
      label: 'Moving to Edmond',
      href: '/moving-to/oklahoma/edmond-ok',
      description: 'Premier OKC suburb with top schools and family neighborhoods',
    },
    cleveland: {
      label: 'Moving to Norman',
      href: '/moving-to/oklahoma/norman-ok',
      description: 'University of Oklahoma college-town inbound moving guide',
    },
    tulsa: {
      label: 'Moving to Tulsa',
      href: '/moving-to/oklahoma/tulsa-ok',
      description: 'Tulsa metro cultural hub — Art Deco, Gathering Place, arts scene',
    },
    wagoner: {
      label: 'Moving to Oklahoma',
      href: '/moving-to/oklahoma',
      description: 'Tulsa metro spillover — Oklahoma inbound cluster overview',
    },
    payne: {
      label: 'Moving to Stillwater',
      href: '/moving-to/oklahoma/stillwater-ok',
      description: 'Oklahoma State University affordable college-town guide',
    },
  },
  arizona: {
    maricopa: {
      label: 'Moving to Phoenix',
      href: '/moving-to/arizona/phoenix-az',
      description: 'Valley of the Sun flagship metro inbound moving guide',
    },
    pinal: {
      label: 'Moving to Maricopa & Casa Grande',
      href: '/moving-to/arizona/maricopa-casa-grande-az',
      description: 'Pinal County affordable Phoenix commute corridor guide',
    },
    pima: {
      label: 'Moving to Tucson & Marana',
      href: '/moving-to/arizona/tucson-marana-az',
      description: 'Southern Arizona mountain lifestyle inbound guide',
    },
  },
  alabama: {
    madison: {
      label: 'Moving to Huntsville & Madison',
      href: '/moving-to/alabama/huntsville-al',
      description: 'Rocket City NASA and Redstone Arsenal inbound moving guide',
    },
    limestone: {
      label: 'Moving to Athens',
      href: '/moving-to/alabama/athens-al',
      description: 'Limestone County Huntsville spillover inbound guide',
    },
    baldwin: {
      label: 'Moving to Baldwin County',
      href: '/moving-to/alabama/fairhope-gulf-shores-al',
      description: 'Coastal South Foley, Daphne, Fairhope and Gulf Shores guide',
    },
    jefferson: {
      label: 'Moving to Hoover',
      href: '/moving-to/alabama/hoover-al',
      description: 'Upscale Birmingham-metro Hoover inbound moving guide',
    },
    shelby: {
      label: 'Moving to Hoover',
      href: '/moving-to/alabama/hoover-al',
      description: 'Shelby County Hoover master-planned suburb guide',
    },
    lee: {
      label: 'Moving to Auburn & Opelika',
      href: '/moving-to/alabama/auburn-opelika-al',
      description: 'Auburn University Lee County inbound moving guide',
    },
  },
  california: {
    sacramento: {
      label: 'Moving to Sacramento',
      href: '/moving-to/california/sacramento-ca',
      description: 'Capital region tech and government inbound moving guide',
    },
    riverside: {
      label: 'Moving to Inland Empire',
      href: '/moving-to/california/riverside-san-bernardino-ca',
      description: 'Riverside and San Bernardino affordable SoCal corridor guide',
    },
    'san-bernardino': {
      label: 'Moving to Inland Empire',
      href: '/moving-to/california/riverside-san-bernardino-ca',
      description: 'Inland Empire logistics and suburban growth inbound guide',
    },
    kern: {
      label: 'Moving to Bakersfield',
      href: '/moving-to/california/bakersfield-ca',
      description: 'Kern County Central Valley affordability inbound guide',
    },
    fresno: {
      label: 'Moving to Fresno',
      href: '/moving-to/california/fresno-ca',
      description: 'Central Valley agriculture hub inbound moving guide',
    },
    'san-joaquin': {
      label: 'Moving to Stockton',
      href: '/moving-to/california/stockton-ca',
      description: 'San Joaquin County port logistics inbound guide',
    },
    stanislaus: {
      label: 'Moving to Modesto',
      href: '/moving-to/california/modesto-ca',
      description: 'Stanislaus County agribusiness inbound moving guide',
    },
    'san-diego': {
      label: 'Moving to San Diego',
      href: '/moving-to/california/san-diego-ca',
      description: 'San Diego and North County biotech corridor inbound guide',
    },
    ventura: {
      label: 'Moving to Ventura & Oxnard',
      href: '/moving-to/california/ventura-oxnard-ca',
      description: 'Ventura County coastal corridor inbound guide',
    },
    'los-angeles': {
      label: 'Moving to Palmdale & Lancaster',
      href: '/moving-to/california/palmdale-lancaster-ca',
      description: 'Antelope Valley high-desert affordability inbound guide',
    },
    shasta: {
      label: 'Moving to Redding',
      href: '/moving-to/california/redding-ca',
      description: 'Shasta County Northern California outdoor gateway guide',
    },
  },
  arkansas: {
    benton: {
      label: 'Moving to Bentonville & NWA',
      href: '/moving-to/arkansas/bentonville-ar',
      description: 'Walmart HQ corridor and Northwest Arkansas inbound guide',
    },
    washington: {
      label: 'Moving to Fayetteville',
      href: '/moving-to/arkansas/fayetteville-ar',
      description: 'University of Arkansas NWA college-town inbound guide',
    },
    faulkner: {
      label: 'Moving to Conway',
      href: '/moving-to/arkansas/conway-ar',
      description: 'City of Colleges central Arkansas inbound guide',
    },
    saline: {
      label: 'Moving to Benton & Bryant',
      href: '/moving-to/arkansas/benton-bryant-ar',
      description: 'Saline County Little Rock bedroom community guide',
    },
  },
  tennessee: {
    davidson: {
      label: 'Moving to Nashville',
      href: '/moving-to/tennessee/nashville-tn',
      description: 'Music City inbound guide — corporate, healthcare, and suburban growth corridors',
    },
    williamson: {
      label: 'Moving to Franklin & Brentwood',
      href: '/moving-to/tennessee/franklin-brentwood-tn',
      description: 'Williamson County premium Nashville suburb inbound guide',
    },
    rutherford: {
      label: 'Moving to Murfreesboro',
      href: '/moving-to/tennessee/murfreesboro-tn',
      description: 'Murfreesboro and Rutherford County Nashville spillover guide',
    },
    knox: {
      label: 'Moving to Knoxville',
      href: '/moving-to/tennessee/knoxville-tn',
      description: 'East Tennessee university and Oak Ridge corridor inbound guide',
    },
    hamilton: {
      label: 'Moving to Chattanooga',
      href: '/moving-to/tennessee/chattanooga-tn',
      description: 'Chattanooga riverfront and Lookout Mountain inbound guide',
    },
    montgomery: {
      label: 'Moving to Clarksville',
      href: '/moving-to/tennessee/clarksville-tn',
      description: 'Fort Campbell and Austin Peay corridor inbound guide',
    },
    wilson: {
      label: 'Moving to Mount Juliet',
      href: '/moving-to/tennessee/mount-juliet-tn',
      description: 'Wilson County Nashville eastern suburb inbound guide',
    },
  },
  texas: {
    harris: {
      label: 'Moving to Houston',
      href: '/moving-to/texas/houston-tx',
      description: 'Houston metro energy and medical corridor inbound guide',
    },
    travis: {
      label: 'Moving to Austin',
      href: '/moving-to/texas/austin-tx',
      description: 'Austin tech corridor inbound moving guide and cost data',
    },
    dallas: {
      label: 'Moving to Dallas–Fort Worth',
      href: '/moving-to/texas/dallas-fort-worth-tx',
      description: 'DFW corporate and suburban growth inbound guide',
    },
    tarrant: {
      label: 'Moving to Dallas–Fort Worth',
      href: '/moving-to/texas/dallas-fort-worth-tx',
      description: 'Fort Worth and Arlington metro inbound relocation guide',
    },
    bexar: {
      label: 'Moving to San Antonio',
      href: '/moving-to/texas/san-antonio-tx',
      description: 'San Antonio military and healthcare corridor inbound guide',
    },
    'el-paso': {
      label: 'Moving to El Paso',
      href: '/moving-to/texas/el-paso-tx',
      description: 'West Texas border metro inbound moving guide',
    },
    lubbock: {
      label: 'Moving to Lubbock',
      href: '/moving-to/texas/lubbock-tx',
      description: 'South Plains university and agriculture hub inbound guide',
    },
    midland: {
      label: 'Moving to Midland & Odessa',
      href: '/moving-to/texas/midland-odessa-tx',
      description: 'Permian Basin energy corridor inbound guide',
    },
    denton: {
      label: 'Moving to Dallas–Fort Worth',
      href: '/moving-to/texas/dallas-fort-worth-tx',
      description: 'Denton County DFW northern growth corridor guide',
    },
    collin: {
      label: 'Moving to Dallas–Fort Worth',
      href: '/moving-to/texas/dallas-fort-worth-tx',
      description: 'Collin County Plano–Frisco corporate suburb guide',
    },
  },
  'west-virginia': {
    berkeley: {
      label: 'Moving to Martinsburg',
      href: '/moving-to/west-virginia/martinsburg-wv',
      description: 'Berkeley County Eastern Panhandle DC commuter inbound guide',
    },
    jefferson: {
      label: 'Moving to the Eastern Panhandle',
      href: '/moving-to/west-virginia/charles-town-ranson-wv',
      description: 'Charles Town, Ranson, and Shepherdstown Jefferson County guides',
    },
    monongalia: {
      label: 'Moving to Morgantown',
      href: '/moving-to/west-virginia/morgantown-wv',
      description: 'WVU and Monongalia County tech/healthcare inbound guide',
    },
    harrison: {
      label: 'Moving to Bridgeport',
      href: '/moving-to/west-virginia/bridgeport-wv',
      description: 'Bridgeport North Central WV suburban inbound guide',
    },
    kanawha: {
      label: 'Moving to Charleston',
      href: '/moving-to/west-virginia/charleston-wv',
      description: 'West Virginia capital Kanawha County inbound guide',
    },
    putnam: {
      label: 'Moving to Hurricane & Teays Valley',
      href: '/moving-to/west-virginia/hurricane-teays-valley-wv',
      description: 'Putnam County I-64 suburban family growth inbound guide',
    },
    greenbrier: {
      label: 'Moving to Lewisburg',
      href: '/moving-to/west-virginia/lewisburg-wv',
      description: 'Greenbrier Valley arts and resort corridor inbound guide',
    },
    randolph: {
      label: 'Moving to Elkins',
      href: '/moving-to/west-virginia/elkins-wv',
      description: 'Randolph County mountain town affordable inbound guide',
    },
  },
  virginia: {
    arlington: {
      label: 'Moving to Arlington & Alexandria',
      href: '/moving-to/virginia/arlington-alexandria-va',
      description: 'Urban D.C. suburb inbound guide — federal contractors and Metro access',
    },
    alexandria: {
      label: 'Moving to Arlington & Alexandria',
      href: '/moving-to/virginia/arlington-alexandria-va',
      description: 'Old Town Alexandria and National Landing inbound moving guide',
    },
    loudoun: {
      label: 'Moving to Leesburg & Fairfax',
      href: '/moving-to/virginia/leesburg-fairfax-va',
      description: 'Dulles corridor Loudoun County suburban inbound guide',
    },
    fairfax: {
      label: 'Moving to Leesburg & Fairfax',
      href: '/moving-to/virginia/leesburg-fairfax-va',
      description: 'Fairfax County NoVA schools and defense contractor suburb guide',
    },
    frederick: {
      label: 'Moving to Winchester',
      href: '/moving-to/virginia/winchester-va',
      description: 'Shenandoah Valley fastest-growing metro inbound guide',
    },
    fredericksburg: {
      label: 'Moving to Fredericksburg & Culpeper',
      href: '/moving-to/virginia/fredericksburg-culpeper-va',
      description: 'I-95 corridor commuter-belt inbound moving guide',
    },
    culpeper: {
      label: 'Moving to Fredericksburg & Culpeper',
      href: '/moving-to/virginia/fredericksburg-culpeper-va',
      description: 'Culpeper wine-country and I-95 spillover inbound guide',
    },
    richmond: {
      label: 'Moving to Richmond',
      href: '/moving-to/virginia/richmond-va',
      description: 'Virginia capital revitalized downtown inbound moving guide',
    },
    suffolk: {
      label: 'Moving to Suffolk & Chesapeake',
      href: '/moving-to/virginia/suffolk-chesapeake-va',
      description: 'Hampton Roads fastest-growing coastal corridor inbound guide',
    },
    chesapeake: {
      label: 'Moving to Suffolk & Chesapeake',
      href: '/moving-to/virginia/suffolk-chesapeake-va',
      description: 'Chesapeake suburban Hampton Roads inbound moving guide',
    },
    albemarle: {
      label: 'Moving to Charlottesville',
      href: '/moving-to/virginia/charlottesville-va',
      description: 'UVA and Blue Ridge foothill college-town inbound guide',
    },
    charlottesville: {
      label: 'Moving to Charlottesville',
      href: '/moving-to/virginia/charlottesville-va',
      description: 'Charlottesville UVA Health and Downtown Mall inbound guide',
    },
    roanoke: {
      label: 'Moving to Roanoke',
      href: '/moving-to/virginia/roanoke-va',
      description: 'Blue Ridge valley outdoor recreation inbound moving guide',
    },
  },
  florida: {
    'miami-dade': {
      label: 'Moving to Miami',
      href: '/moving-to/florida/miami',
      description: 'Miami-Dade inbound guide — high-rise, condo, and corporate moves',
    },
    broward: {
      label: 'Moving to South Florida',
      href: '/moving-to/florida',
      description: 'Broward County corridor guides — Fort Lauderdale, Hollywood, Pompano',
    },
    'palm-beach': {
      label: 'Moving to Palm Beach County',
      href: '/moving-to/florida',
      description: 'Boca Raton, Delray, Boynton, and Deerfield Beach city guides',
    },
  },
};

export function getDestinationHubLinkForCounty(
  stateSlug: string,
  countySlug: string
): DestinationHubLink | undefined {
  return COUNTY_DESTINATION_HUBS[stateSlug]?.[countySlug];
}