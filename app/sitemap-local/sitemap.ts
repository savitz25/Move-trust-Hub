import type { MetadataRoute } from 'next';
import {
  CALIFORNIA_COUNTY_CONTENT_UPDATED,
  FLORIDA_COUNTY_CONTENT_UPDATED,
  NEW_JERSEY_COUNTY_CONTENT_UPDATED,
  NEW_YORK_COUNTY_CONTENT_UPDATED,
} from '@/components/local-movers/county-editorial-trust';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';

const SITE_URL = 'https://www.movetrusthub.com';

/** High-traffic CA counties — sitemap priority 0.85 */
const CA_HIGH_TRAFFIC_COUNTIES = new Set([
  'alameda',
  'contra-costa',
  'los-angeles',
  'orange',
  'riverside',
  'sacramento',
  'san-diego',
  'san-francisco',
  'san-mateo',
  'santa-clara',
]);

/** High-traffic NY counties — sitemap priority 0.85 */
const NY_HIGH_TRAFFIC_COUNTIES = new Set([
  'albany',
  'bronx',
  'dutchess',
  'erie',
  'kings',
  'monroe',
  'nassau',
  'new-york',
  'niagara',
  'onondaga',
  'orange',
  'queens',
  'richmond',
  'rockland',
  'suffolk',
  'westchester',
]);

export async function generateSitemaps() {
  return localStates.map((state) => ({ id: state.slug }));
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const counties = getCountiesForState(id);
  const lastModified =
    id === 'california'
      ? new Date(CALIFORNIA_COUNTY_CONTENT_UPDATED)
      : id === 'florida'
        ? new Date(FLORIDA_COUNTY_CONTENT_UPDATED)
        : id === 'new-jersey'
          ? new Date(NEW_JERSEY_COUNTY_CONTENT_UPDATED)
          : id === 'new-york'
            ? new Date(NEW_YORK_COUNTY_CONTENT_UPDATED)
            : new Date();

  return [
    {
      url: `${SITE_URL}/local-movers/${id}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...counties.map((county) => ({
      url: `${SITE_URL}/local-movers/${id}/${county.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority:
        county.slug === 'miami-dade' ||
        county.slug === 'broward' ||
        county.slug === 'bergen' ||
        county.slug === 'hudson' ||
        county.slug === 'essex' ||
        county.slug === 'middlesex' ||
        county.slug === 'monmouth' ||
        county.slug === 'ocean' ||
        county.slug === 'union' ||
        county.slug === 'passaic' ||
        (id === 'california' && CA_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'new-york' && NY_HIGH_TRAFFIC_COUNTIES.has(county.slug))
          ? 0.85
          : 0.8,
    })),
  ];
}