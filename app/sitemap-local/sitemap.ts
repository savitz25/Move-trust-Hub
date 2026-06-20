import type { MetadataRoute } from 'next';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';

const SITE_URL = 'https://www.movetrusthub.com';

export async function generateSitemaps() {
  return localStates.map((state) => ({ id: state.slug }));
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const counties = getCountiesForState(id);
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/local-movers/${id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...counties.map((county) => ({
      url: `${SITE_URL}/local-movers/${id}/${county.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  ];
}