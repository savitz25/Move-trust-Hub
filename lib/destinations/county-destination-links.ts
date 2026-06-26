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
      label: 'Moving to South Carolina',
      href: '/moving-to/south-carolina',
      description: 'Lowcountry and Hilton Head inbound moving guides',
    },
    greenville: {
      label: 'Moving to South Carolina',
      href: '/moving-to/south-carolina',
      description: 'Upstate SC inbound guide — Greenville, Spartanburg, and beyond',
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