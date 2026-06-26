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