import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityHubTemplate } from '@/components/destinations/city-hub-template';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildCityHubSchemaGraph } from '@/lib/seo/build-city-hub-schema';
import { getCityHubContent, getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPublishedCityHubSlugs()
    .filter((slug) => getMarketBySlug(slug)?.clusterParent === 'florida')
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getCityHubContent(slug);
  const market = getMarketBySlug(slug);
  if (!content || !market) return {};

  const canonical = `${SITE_URL}${content.seo.canonicalPath}`;

  return {
    title: { absolute: content.seo.title },
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: { canonical },
    openGraph: {
      ...buildOpenGraph({
        title: content.seo.title,
        description: content.seo.description,
        url: canonical,
      }),
      images: [
        {
          url: content.seo.ogImagePath,
          width: 1200,
          height: 630,
          alt: content.seo.ogImageAlt,
        },
      ],
    },
    twitter: buildTwitter({
      title: content.seo.title,
      description: content.seo.description,
    }),
    robots: { index: true, follow: true },
    category: 'Moving Destination Guides',
  };
}

export default async function FloridaCityHubPage({ params }: Props) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  const content = getCityHubContent(slug);

  if (!market || !content || market.clusterParent !== 'florida') notFound();

  const canonical = `${SITE_URL}${content.seo.canonicalPath}`;

  return (
    <>
      <JsonLd data={buildCityHubSchemaGraph(market, content, canonical)} />
      <CityHubTemplate market={market} content={content} />
    </>
  );
}