import type { CityHubContent } from '@/lib/destinations/types';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { myrtleBeachScContent } from '@/lib/destinations/content/myrtle-beach-sc';
import { bocaRatonFlContent } from '@/lib/destinations/content/boca-raton-fl';
import { deerfieldBeachFlContent } from '@/lib/destinations/content/deerfield-beach-fl';
import { boyntonBeachFlContent } from '@/lib/destinations/content/boynton-beach-fl';
import { delrayBeachFlContent } from '@/lib/destinations/content/delray-beach-fl';
import { miamiFlContent } from '@/lib/destinations/content/miami-fl';
import { fortLauderdaleFlContent } from '@/lib/destinations/content/fort-lauderdale-fl';
import { hollywoodFlContent } from '@/lib/destinations/content/hollywood-fl';
import { pompanoBeachFlContent } from '@/lib/destinations/content/pompano-beach-fl';

const cityHubContentBySlug: Record<string, CityHubContent> = {
  'myrtle-beach-sc': myrtleBeachScContent,
  'boca-raton': bocaRatonFlContent,
  'deerfield-beach': deerfieldBeachFlContent,
  'boynton-beach': boyntonBeachFlContent,
  'delray-beach': delrayBeachFlContent,
  'miami': miamiFlContent,
  'fort-lauderdale': fortLauderdaleFlContent,
  'hollywood': hollywoodFlContent,
  'pompano-beach': pompanoBeachFlContent,
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