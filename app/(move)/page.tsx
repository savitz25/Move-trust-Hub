import type { Metadata } from 'next';
import { HomePage } from '@/components/home-page';

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
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo/site-metadata';
import { absoluteDocumentTitle, formatDocumentTitle } from '@/lib/seo/document-title';

export const dynamic = 'force-static';
/** Pick up chrome/nav deploy updates without waiting for full CDN max-age. */
export const revalidate = 300;

/** Trailing-slash policy: no trailing slash (canonical = https://www.movetrusthub.com). */
const HOMEPAGE_CANONICAL = SITE_URL.replace(/\/$/, '');
const HOMEPAGE_DOCUMENT_TITLE = formatDocumentTitle(HOMEPAGE_SEO_TITLE, SITE_NAME);

export const metadata: Metadata = {
  title: absoluteDocumentTitle(HOMEPAGE_SEO_TITLE, SITE_NAME),
  description: HOMEPAGE_SEO_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: buildOpenGraph({
    title: HOMEPAGE_DOCUMENT_TITLE,
    description: HOMEPAGE_SEO_DESCRIPTION,
    url: HOMEPAGE_CANONICAL,
  }),
  twitter: buildTwitter({
    title: HOMEPAGE_DOCUMENT_TITLE,
    description: HOMEPAGE_SEO_DESCRIPTION,
  }),
  alternates: {
    canonical: HOMEPAGE_CANONICAL,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={buildHomepageSchemaGraph()} />
      <HomePage mapSection={<LocalMoversMapLoader />} />
    </>
  );
}