import type { Metadata } from 'next';
import { HomePage } from '@/components/home-page';
import { LocalMoversMapSection } from '@/components/map/LocalMoversMapSection';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildHomepageSchemaGraph } from '@/lib/seo/schemas';
import {
  buildOpenGraph,
  buildTwitter,
  HOMEPAGE_DESCRIPTION,
  HOMEPAGE_TITLE,
  SITE_URL,
} from '@/lib/seo/site-metadata';

export const metadata: Metadata = {
  title: HOMEPAGE_TITLE,
  description: HOMEPAGE_DESCRIPTION,
  openGraph: buildOpenGraph({
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    url: SITE_URL,
  }),
  twitter: buildTwitter({
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
  }),
  alternates: {
    canonical: SITE_URL,
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