import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityHubTemplate } from '@/components/destinations/city-hub-template';
import { getCityHubContent, getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { buildCityHubMetadata } from '@/lib/seo/destination-seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getPublishedCityHubSlugs()
    .filter((slug) => getMarketBySlug(slug)?.clusterParent === 'connecticut')
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getCityHubContent(slug);
  const market = getMarketBySlug(slug);
  if (!content || !market) return {};

  return buildCityHubMetadata(content);
}

export default async function ConnecticutCityHubPage({ params }: Props) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  const content = getCityHubContent(slug);

  if (!market || !content || market.clusterParent !== 'connecticut') notFound();

  return <CityHubTemplate market={market} content={content} />;
}