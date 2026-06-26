import type { Metadata } from 'next';
import { HomePage } from '@/components/home-page';
import { HomeQuoteProvider } from '@/components/home/home-quote-provider';
import { LocalMoversMapLoader } from '@/components/map/local-movers-map-loader';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildHomepageSchemaGraph } from '@/lib/seo/schemas';
import {
  HOMEPAGE_SEO_DESCRIPTION,
  HOMEPAGE_SEO_TITLE,
} from '@/lib/seo/destination-seo';
import {
  buildOpenGraph,
  buildTwitter,
  SITE_URL,
} from '@/lib/seo/site-metadata';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: HOMEPAGE_SEO_TITLE,
  description: HOMEPAGE_SEO_DESCRIPTION,
  keywords: [
    'free moving quotes',
    'compare moving companies',
    'FMCSA licensed movers',
    'interstate movers',
    'local movers directory',
    'moving to myrtle beach',
    'moving to florida',
    'moving calculator',
  ],
  openGraph: buildOpenGraph({
    title: HOMEPAGE_SEO_TITLE,
    description: HOMEPAGE_SEO_DESCRIPTION,
    url: SITE_URL,
  }),
  twitter: buildTwitter({
    title: HOMEPAGE_SEO_TITLE,
    description: HOMEPAGE_SEO_DESCRIPTION,
  }),
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={buildHomepageSchemaGraph()} />
      <HomeQuoteProvider>
        <HomePage mapSection={<LocalMoversMapLoader />} />
      </HomeQuoteProvider>
    </>
  );
}