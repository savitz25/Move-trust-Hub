import type { RouteGuideExtendedContent } from '@/lib/resources/routes/types';
import { newYorkToTexasContent } from '@/lib/resources/routes/new-york-to-texas';

const extendedRouteGuides: Record<string, RouteGuideExtendedContent> = {
  'new-york-to-texas': newYorkToTexasContent,
};

export function getExtendedRouteGuide(slug: string): RouteGuideExtendedContent | undefined {
  return extendedRouteGuides[slug];
}

export function getExtendedRouteSlugs(): string[] {
  return Object.keys(extendedRouteGuides);
}