import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import {
  getClusterParentMarkets,
  getMarketPath,
  getSortedClusterMarkets,
} from '@/lib/destinations/markets';
import type { Market } from '@/lib/destinations/types';
import {
  FEATURED_STATES_LIMIT,
  rankFeaturedStates,
} from '@/lib/nav/destinations-menu-priority';

/**
 * Stable popular corridors for nav — kept lightweight (no routeGuides import)
 * so client mega menu code stays small.
 * `featured: true` marks highest-conversion corridors for visual emphasis.
 */
export const POPULAR_ROUTES_NAV = [
  {
    label: 'NY → FL',
    href: '/resources/routes/new-york-to-florida',
    distance: '~1,100–1,300 miles',
    featured: true,
  },
  {
    label: 'CA → TX',
    href: '/resources/routes/california-to-texas',
    distance: '~1,400–1,800 miles',
    featured: true,
  },
  {
    label: 'NJ → FL',
    href: '/resources/routes/new-jersey-to-florida',
    distance: '~1,000–1,200 miles',
    featured: true,
  },
  {
    label: 'MN → FL',
    href: '/resources/routes/minnesota-to-florida',
    distance: '~1,600–1,850 miles',
    featured: true,
  },
  {
    label: 'NY → TX',
    href: '/resources/routes/new-york-to-texas',
    distance: '~1,600–1,800 miles',
  },
  {
    label: 'MN → TX',
    href: '/resources/routes/minnesota-to-texas',
    distance: '~1,000–1,200 miles',
  },
  {
    label: 'MA → FL',
    href: '/resources/routes/massachusetts-to-florida',
    distance: '~1,200–1,400 miles',
  },
  {
    label: 'PA → FL',
    href: '/resources/routes/pennsylvania-to-florida',
    distance: '~1,000–1,200 miles',
  },
  {
    label: 'LA → DFW',
    href: '/resources/routes/los-angeles-to-dallas-fort-worth',
    distance: '~1,400–1,550 miles',
  },
  {
    label: 'NJ → SC',
    href: '/resources/routes/new-jersey-to-south-carolina',
    distance: '~650–750 miles',
  },
] as const;

const FEATURED_CITIES_PER_STATE = 4;
const ACCORDION_CITIES_PREVIEW = 6;

export type CityNavLink = {
  name: string;
  href: string;
};

export type StateNavGroup = {
  cluster: Market;
  hubPath: string;
  cityCount: number;
  featuredCities: CityNavLink[];
  previewCities: CityNavLink[];
  allCities: CityNavLink[];
};

export type RouteNavLink = {
  label: string;
  href: string;
  distance: string;
  featured?: boolean;
};

export type QuickToolLink = {
  id: string;
  label: string;
  description: string;
  href: string;
  external?: boolean;
};

export type DestinationsMenuData = {
  featuredStates: StateNavGroup[];
  allStatesAlphabetical: StateNavGroup[];
  popularRoutes: RouteNavLink[];
  quickTools: QuickToolLink[];
};

function buildStateGroup(cluster: Market, published: Set<string>): StateNavGroup | null {
  const cities = getSortedClusterMarkets(cluster.slug)
    .filter((m) => published.has(m.slug))
    .map((m) => ({ name: m.displayName, href: getMarketPath(m) }));

  const hasHub = published.has(cluster.slug) || cities.length > 0;
  if (!hasHub) return null;

  return {
    cluster,
    hubPath: getMarketPath(cluster),
    cityCount: cities.length,
    featuredCities: cities.slice(0, FEATURED_CITIES_PER_STATE),
    previewCities: cities.slice(0, ACCORDION_CITIES_PREVIEW),
    allCities: cities,
  };
}

function buildMenuData(): DestinationsMenuData {
  const published = new Set(getPublishedCityHubSlugs());
  const clusterParents = getClusterParentMarkets().sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );

  const groups = clusterParents
    .map((cluster) => buildStateGroup(cluster, published))
    .filter((g): g is StateNavGroup => g !== null);

  const featuredStates = rankFeaturedStates(groups, FEATURED_STATES_LIMIT);

  return {
    featuredStates,
    allStatesAlphabetical: groups,
    popularRoutes: POPULAR_ROUTES_NAV.map((route) => ({ ...route })),
    quickTools: [
      {
        id: 'fmcsa',
        label: 'Verify a DOT Number',
        description: 'Look up USDOT & MC on FMCSA',
        href: '/resources/fmcsa',
      },
      {
        id: 'reviews',
        label: 'Leave a Review',
        description: 'Browse movers to review',
        href: '/companies?sort=rating',
      },
      {
        id: 'calculator',
        label: 'Moving Calculator',
        description: 'Estimate cubic feet & weight',
        href: '/moving-calculator',
      },
      {
        id: 'local',
        label: 'Local Movers by County',
        description: '3,000+ county guides',
        href: '/local-movers',
      },
    ],
  };
}

let cachedMenuData: DestinationsMenuData | null = null;

/** Module-level memo — safe for client components; data is static per build. */
export function getDestinationsMenuData(): DestinationsMenuData {
  if (!cachedMenuData) {
    cachedMenuData = buildMenuData();
  }
  return cachedMenuData;
}

export function resetDestinationsMenuDataCache(): void {
  cachedMenuData = null;
}

/** Client-side filter for scalable A–Z browse (50+ states). */
export function filterStateNavGroups(
  states: StateNavGroup[],
  query: string
): StateNavGroup[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return states;
  return states.filter(
    (state) =>
      state.cluster.displayName.toLowerCase().includes(normalized) ||
      state.cluster.stateCode?.toLowerCase().includes(normalized)
  );
}