import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityHubTemplate } from '@/components/destinations/city-hub-template';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug } from '@/lib/destinations/markets';
import {
  cityHubMetadataForSlug,
  resolveCityHubStandalone,
} from '@/lib/destinations/resolve-city-hub-page';
import { ssgParams } from '@/lib/ssg/ssg-params';

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-static';
export const dynamicParams = true;
/** ISR: pick up nearby local movers within ~150mi after approval. */
export const revalidate = 60;

export async function generateStaticParams() {
  return ssgParams(
    getPublishedCityHubSlugs()
      .filter((slug) => !getMarketBySlug(slug)?.clusterParent)
      .map((slug) => ({ slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return cityHubMetadataForSlug(slug);
}

export default async function CityHubPage({ params }: Props) {
  const { slug } = await params;
  const resolved = resolveCityHubStandalone(slug);
  if (!resolved) notFound();

  return <CityHubTemplate market={resolved.market} content={resolved.content} />;
}
