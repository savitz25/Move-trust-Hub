import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityHubTemplate } from '@/components/destinations/city-hub-template';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildCityHubSchemaGraph } from '@/lib/seo/build-city-hub-schema';
import { getCityHubContent, getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { getMoversForMarket } from '@/lib/destinations/get-movers-for-market';
import { buildCityHubMetadata } from '@/lib/seo/destination-seo';
import { SITE_URL } from '@/lib/seo/site-metadata';

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getPublishedCityHubSlugs()
    .filter((slug) => getMarketBySlug(slug)?.clusterParent === 'louisiana')
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getCityHubContent(slug);
  const market = getMarketBySlug(slug);
  if (!content || !market) return {};

  return buildCityHubMetadata(content);
}

export default async function LouisianaCityHubPage({ params }: Props) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  const content = getCityHubContent(slug);

  if (!market || !content || market.clusterParent !== 'louisiana') notFound();

  const canonical = `${SITE_URL}${content.seo.canonicalPath}`;
  const movers = getMoversForMarket(market, 6);

  return (
    <>
      <JsonLd data={buildCityHubSchemaGraph(market, content, canonical, movers)} />
      <CityHubTemplate market={market} content={content} />
    </>
  );
}