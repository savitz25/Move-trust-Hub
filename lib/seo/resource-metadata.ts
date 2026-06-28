import type { Metadata } from 'next';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

/** Standard SEO metadata for evergreen /resources/* articles */
export function buildResourceMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title, description, url, type: 'article' }),
    twitter: buildTwitter({ title, description }),
    robots: { index: true, follow: true },
  };
}