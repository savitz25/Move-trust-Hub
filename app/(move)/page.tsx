import type { Metadata } from 'next';
import Link from 'next/link';
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
import { getMoveHomeIntelligenceSnapshot } from '@/lib/intelligence/home-snapshot';

export const dynamic = 'force-static';
/** Revalidate static homepage chrome and navigation independently of the longer CDN max-age. */
export const revalidate = 300;

/** Trailing-slash policy: no trailing slash (canonical = https://www.movetrusthub.com). */
const HOMEPAGE_CANONICAL = SITE_URL.replace(/\/$/, '');
const HOMEPAGE_DOCUMENT_TITLE = formatDocumentTitle('Independent Moving Research', SITE_NAME);

export const metadata: Metadata = {
  title: absoluteDocumentTitle('Independent Moving Research', SITE_NAME),
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

export default async function Page() {
  const payload = await getMoveHomeIntelligenceSnapshot();
  return (
    <>
      <JsonLd data={buildHomepageSchemaGraph()} />
      <HomePage payload={payload} mapSection={<LocalMoversMapLoader />} />
      <p className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Link prefetch={false} href="/states" className="underline underline-offset-4">All states →</Link>
      </p>
    </>
  );
}
