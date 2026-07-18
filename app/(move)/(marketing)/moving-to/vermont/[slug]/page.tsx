import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityHubTemplate } from '@/components/destinations/city-hub-template';
import { getCityHubContent, getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { buildCityHubMetadata } from '@/lib/seo/destination-seo';
import { ssgParams } from '@/lib/ssg/ssg-params';

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  return ssgParams(getPublishedCityHubSlugs()
    .filter((slug) => getMarketBySlug(slug)?.clusterParent === 'vermont')
    .map((slug) => ({ slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getCityHubContent(slug);
  const market = getMarketBySlug(slug);
  if (!content || !market) return {};

  return buildCityHubMetadata(content);
}

export default async function VermontCityHubPage({ params }: Props) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  const content = getCityHubContent(slug);

  if (!market || !content || market.clusterParent !== 'vermont') notFound();

  return <CityHubTemplate market={market} content={content} />;
}