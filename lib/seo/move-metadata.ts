import type { Metadata } from 'next';
import {
  SITE_URL,
  buildOpenGraph,
  buildTwitter,
} from '@/lib/seo/site-metadata';

export type MovePageMetadataInput = {
  title: string;
  description: string;
  /** App path starting with `/` (e.g. `/companies`, `/about`). */
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  noIndex?: boolean;
};

/** Canonical + OG/Twitter metadata for Move hub pages at the site root. */
export function buildMovePageMetadata(input: MovePageMetadataInput): Metadata {
  const path = input.path.startsWith('/') ? input.path : `/${input.path}`;
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`.replace(/\/$/, '') || SITE_URL;
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: buildOpenGraph({
      title: input.title,
      description: input.description,
      url,
      type: input.type ?? 'website',
      hub: 'move',
    }),
    twitter: buildTwitter({
      title: input.title,
      description: input.description,
      hub: 'move',
    }),
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}