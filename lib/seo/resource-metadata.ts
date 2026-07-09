import type { Metadata } from 'next';
import type { OgHub } from '@/lib/seo/site-metadata';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

/** Standard SEO metadata for evergreen /resources/* articles */
export function buildResourceMetadata(
  path: string,
  title: string,
  description: string,
  hub: OgHub = 'move'
): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title, description, url, type: 'article', hub }),
    twitter: buildTwitter({ title, description, hub }),
    robots: { index: true, follow: true },
  };
}