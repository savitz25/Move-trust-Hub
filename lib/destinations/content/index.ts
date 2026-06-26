import type { CityHubContent } from '@/lib/destinations/types';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { myrtleBeachScContent } from '@/lib/destinations/content/myrtle-beach-sc';
import { northMyrtleBeachScContent } from '@/lib/destinations/content/north-myrtle-beach-sc';
import { surfsideBeachScContent } from '@/lib/destinations/content/surfside-beach-sc';
import { atlanticBeachScContent } from '@/lib/destinations/content/atlantic-beach-sc';
import { gardenCityBeachScContent } from '@/lib/destinations/content/garden-city-beach-sc';
import { littleRiverScContent } from '@/lib/destinations/content/little-river-sc';
import { murrellsInletScContent } from '@/lib/destinations/content/murrells-inlet-sc';
import { socasteeScContent } from '@/lib/destinations/content/socastee-sc';
import { carolinaForestScContent } from '@/lib/destinations/content/carolina-forest-sc';
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
  'north-myrtle-beach': northMyrtleBeachScContent,
  'surfside-beach': surfsideBeachScContent,
  'atlantic-beach': atlanticBeachScContent,
  'garden-city-beach': gardenCityBeachScContent,
  'little-river': littleRiverScContent,
  'murrells-inlet': murrellsInletScContent,
  'socastee': socasteeScContent,
  'carolina-forest': carolinaForestScContent,
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

export function getPublishedGrandStrandHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'myrtle-beach-sc'
  );
}