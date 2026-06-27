import type { RouteGuideExtendedContent } from '@/lib/resources/routes/types';
import { californiaToTexasContent } from '@/lib/resources/routes/california-to-texas';
import { losAngelesToDallasFortWorthContent } from '@/lib/resources/routes/los-angeles-to-dallas-fort-worth';
import { newJerseyToFloridaContent } from '@/lib/resources/routes/new-jersey-to-florida';
import { newJerseyToGeorgiaContent } from '@/lib/resources/routes/new-jersey-to-georgia';
import { newJerseyToSouthCarolinaContent } from '@/lib/resources/routes/new-jersey-to-south-carolina';
import { newJerseyToTexasContent } from '@/lib/resources/routes/new-jersey-to-texas';
import { newYorkToTexasContent } from '@/lib/resources/routes/new-york-to-texas';
import { sanDiegoToHoustonContent } from '@/lib/resources/routes/san-diego-to-houston';
import { sanFranciscoToAustinContent } from '@/lib/resources/routes/san-francisco-to-austin';

const extendedRouteGuides: Record<string, RouteGuideExtendedContent> = {
  'california-to-texas': californiaToTexasContent,
  'los-angeles-to-dallas-fort-worth': losAngelesToDallasFortWorthContent,
  'san-francisco-to-austin': sanFranciscoToAustinContent,
  'san-diego-to-houston': sanDiegoToHoustonContent,
  'new-jersey-to-south-carolina': newJerseyToSouthCarolinaContent,
  'new-jersey-to-florida': newJerseyToFloridaContent,
  'new-jersey-to-georgia': newJerseyToGeorgiaContent,
  'new-jersey-to-texas': newJerseyToTexasContent,
  'new-york-to-texas': newYorkToTexasContent,
};

export function getExtendedRouteGuide(slug: string): RouteGuideExtendedContent | undefined {
  return extendedRouteGuides[slug];
}

export function getExtendedRouteSlugs(): string[] {
  return Object.keys(extendedRouteGuides);
}