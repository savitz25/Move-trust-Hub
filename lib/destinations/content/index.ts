import type { CityHubContent } from '@/lib/destinations/types';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { myrtleBeachScContent } from '@/lib/destinations/content/myrtle-beach-sc';
import { bocaRatonFlContent } from '@/lib/destinations/content/boca-raton-fl';
import { deerfieldBeachFlContent } from '@/lib/destinations/content/deerfield-beach-fl';
import { boyntonBeachFlContent } from '@/lib/destinations/content/boynton-beach-fl';
import { delrayBeachFlContent } from '@/lib/destinations/content/delray-beach-fl';

const cityHubContentBySlug: Record<string, CityHubContent> = {
  'myrtle-beach-sc': myrtleBeachScContent,
  'boca-raton': bocaRatonFlContent,
  'deerfield-beach': deerfieldBeachFlContent,
  'boynton-beach': boyntonBeachFlContent,
  'delray-beach': delrayBeachFlContent,
};

export function getCityHubContent(slug: string): CityHubContent | undefined {
  return cityHubContentBySlug[slug];
}

export function getPublishedCityHubSlugs(): string[] {
  return Object.keys(cityHubContentBySlug);
}

export function getPublishedFloridaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'florida'
  );
}