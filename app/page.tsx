import type { Metadata } from 'next';
import { HomePage } from '@/components/home-page';
import { LocalMoversMapSection } from '@/components/map/LocalMoversMapSection';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildHomepageSchemaGraph } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Free Interstate Moving Quotes | Compare Licensed Long-Distance Movers',
  description:
    'Compare 25+ FMCSA-licensed interstate movers by reviews, reputation scores, and pricing. Use our free moving calculator, then get matched with 2-3 quotes within 24 hours.',
  keywords: [
    'interstate moving quotes',
    'long distance movers',
    'compare moving companies',
    'FMCSA licensed movers',
    'free moving quotes',
    'moving calculator',
    'trusted movers directory',
  ],
  openGraph: {
    title: 'Free Interstate Moving Quotes | Compare Licensed Long-Distance Movers',
    description:
      'Research, compare, and get free quotes from trusted interstate movers. FMCSA data, real reviews, and a free move estimator in one place.',
    url: 'https://www.movetrusthub.com',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.movetrusthub.com',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={buildHomepageSchemaGraph()} />
      <HomePage mapSection={<LocalMoversMapSection />} />
    </>
  );
}