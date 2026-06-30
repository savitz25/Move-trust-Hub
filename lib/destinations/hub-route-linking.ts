import { routeGuides } from '@/lib/resources/routes';
import type { DestinationRouteLink, Market } from '@/lib/destinations/types';
import { getMarketPath } from '@/lib/destinations/markets';

const ORIGIN_NAME_TO_STATE: Record<string, string> = {
  'New York': 'NY',
  'New Jersey': 'NJ',
  Pennsylvania: 'PA',
  Massachusetts: 'MA',
  Connecticut: 'CT',
  Ohio: 'OH',
  Michigan: 'MI',
  Illinois: 'IL',
  Indiana: 'IN',
  Minnesota: 'MN',
  Wisconsin: 'WI',
  Virginia: 'VA',
  Maryland: 'MD',
  'North Carolina': 'NC',
  'South Carolina': 'SC',
  Georgia: 'GA',
  Florida: 'FL',
  Texas: 'TX',
  California: 'CA',
  Arizona: 'AZ',
  Colorado: 'CO',
  Washington: 'WA',
  Oregon: 'OR',
};

const HIGH_INTENT_ROUTE_SLUGS = [
  'new-york-to-florida',
  'california-to-texas',
  'new-york-to-texas',
  'new-jersey-to-florida',
  'california-to-florida',
  'pennsylvania-to-florida',
  'los-angeles-to-dallas-fort-worth',
] as const;

function routeToLink(route: (typeof routeGuides)[number]): DestinationRouteLink {
  return {
    label: `${route.from} → ${route.to}`,
    href: `/resources/routes/${route.slug}`,
    miles: route.distance.replace(/^~\s*/, ''),
  };
}

/** Suggest inbound route guides for a destination market from origins + state. */
export function getSuggestedRouteLinksForMarket(
  market: Market,
  limit = 6
): DestinationRouteLink[] {
  const originStates = new Set(
    market.topInboundOrigins
      .map((name) => ORIGIN_NAME_TO_STATE[name])
      .filter((code): code is string => Boolean(code))
  );

  const clusterPath = market.clusterParent
    ? `/moving-to/${market.clusterParent}`
    : getMarketPath(market);
  const cityPath = getMarketPath(market);

  const scored = routeGuides
    .map((route) => {
      let score = 0;
      if (route.toState === market.stateCode) score += 3;
      if (originStates.has(route.fromState)) score += 4;
      if (route.destinationHubPath === clusterPath || route.destinationHubPath === cityPath)
        score += 2;
      if ((HIGH_INTENT_ROUTE_SLUGS as readonly string[]).includes(route.slug)) score += 1;
      return { route, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.route.title.localeCompare(b.route.title));

  const seen = new Set<string>();
  const links: DestinationRouteLink[] = [];

  for (const { route } of scored) {
    if (seen.has(route.slug)) continue;
    seen.add(route.slug);
    links.push(routeToLink(route));
    if (links.length >= limit) break;
  }

  return links;
}

/** Merge hand-curated route links with data-driven suggestions (curated first). */
export function mergeHubRouteLinks(
  curated: DestinationRouteLink[],
  market: Market,
  max = 6
): DestinationRouteLink[] {
  const seen = new Set(curated.map((r) => r.href));
  const merged = [...curated];

  for (const suggested of getSuggestedRouteLinksForMarket(market, max)) {
    if (seen.has(suggested.href)) continue;
    seen.add(suggested.href);
    merged.push(suggested);
    if (merged.length >= max) break;
  }

  return merged.slice(0, max);
}

/** Route guides terminating in a destination state (for county pages). */
export function getRouteLinksForDestinationState(
  stateCode: string,
  limit = 4
): DestinationRouteLink[] {
  return routeGuides
    .filter((r) => r.toState === stateCode)
    .sort((a, b) => {
      const aPriority = (HIGH_INTENT_ROUTE_SLUGS as readonly string[]).includes(a.slug) ? 0 : 1;
      const bPriority = (HIGH_INTENT_ROUTE_SLUGS as readonly string[]).includes(b.slug) ? 0 : 1;
      return aPriority - bPriority || a.title.localeCompare(b.title);
    })
    .slice(0, limit)
    .map(routeToLink);
}