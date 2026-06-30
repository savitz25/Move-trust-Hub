import { routeGuides } from '@/lib/resources/routes';
import type { RouteGuide } from '@/lib/resources/routes';

export type StateRouteLink = {
  slug: string;
  label: string;
  href: string;
  avgCostRange: string;
};

function toLink(route: RouteGuide): StateRouteLink {
  return {
    slug: route.slug,
    label: route.title,
    href: `/resources/routes/${route.slug}`,
    avgCostRange: route.avgCostRange,
  };
}

/** Outbound interstate route guides originating from a state code (e.g. CA). */
export function getOutboundRouteLinksForState(stateCode: string, limit = 4): StateRouteLink[] {
  return routeGuides.filter((r) => r.fromState === stateCode).slice(0, limit).map(toLink);
}

/** Inbound interstate route guides terminating in a state code. */
export function getInboundRouteLinksForState(stateCode: string, limit = 3): StateRouteLink[] {
  return routeGuides.filter((r) => r.toState === stateCode).slice(0, limit).map(toLink);
}