/** Bidirectional county ↔ destination hub links for internal linking SEO */

export type DestinationHubLink = {
  label: string;
  href: string;
  description: string;
};

const COUNTY_DESTINATION_HUBS: Record<string, Record<string, DestinationHubLink>> = {
  'south-carolina': {
    horry: {
      label: 'Moving to Myrtle Beach',
      href: '/moving-to/myrtle-beach-sc',
      description: 'Grand Strand inbound guide — costs, routes, and interstate movers',
    },
  },
  'north-carolina': {
    brunswick: {
      label: 'Moving to Myrtle Beach area',
      href: '/moving-to/myrtle-beach-sc',
      description: 'Wilmington–Brunswick corridor inbound moving guide',
    },
    'new-hanover': {
      label: 'Moving to Myrtle Beach area',
      href: '/moving-to/myrtle-beach-sc',
      description: 'Wilmington-area inbound moving guide and cost data',
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