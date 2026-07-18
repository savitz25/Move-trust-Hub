import type { Metadata } from 'next';
import type { OgHub } from '@/lib/seo/site-metadata';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';
import { absoluteDocumentTitle, formatDocumentTitle } from '@/lib/seo/document-title';

/** Standard SEO metadata for evergreen /resources/* articles */
export function buildResourceMetadata(
  path: string,
  title: string,
  description: string,
  hub: OgHub = 'move',
  type: 'website' | 'article' = 'article'
): Metadata {
  const url = `${SITE_URL}${path}`;
  const documentTitle = formatDocumentTitle(title);
  return {
    title: absoluteDocumentTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title: documentTitle, description, url, type, hub }),
    twitter: buildTwitter({ title: documentTitle, description, hub }),
    robots: { index: true, follow: true },
  };
}