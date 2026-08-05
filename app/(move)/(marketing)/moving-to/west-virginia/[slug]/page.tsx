import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityHubTemplate } from '@/components/destinations/city-hub-template';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug } from '@/lib/destinations/markets';
import {
  cityHubMetadataForSlug,
  resolveCityHubForState,
} from '@/lib/destinations/resolve-city-hub-page';
import { ssgParams } from '@/lib/ssg/ssg-params';

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-static';
export const dynamicParams = true;
/** ISR: pick up nearby local movers within ~150mi after approval. */
export const revalidate = 60;

const CLUSTER = 'west-virginia';

export async function generateStaticParams() {
  return ssgParams(
    getPublishedCityHubSlugs()
      .filter((slug) => getMarketBySlug(slug)?.clusterParent === CLUSTER)
      .map((slug) => ({ slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveCityHubForState(slug, CLUSTER);
  if (!resolved) {
    // Avoid root ZIP Planner title on unknown/unpublished slugs
    return cityHubMetadataForSlug(slug);
  }
  return cityHubMetadataForSlug(resolved.resolvedSlug);
}

export default async function CityHubPage({ params }: Props) {
  const { slug } = await params;
  const resolved = resolveCityHubForState(slug, CLUSTER);
  if (!resolved) notFound();

  return <CityHubTemplate market={resolved.market} content={resolved.content} />;
}
