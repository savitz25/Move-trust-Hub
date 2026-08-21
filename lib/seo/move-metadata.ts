import type { Metadata } from 'next';
import {
  SITE_URL,
  buildOpenGraph,
  buildTwitter,
} from '@/lib/seo/site-metadata';
import { absoluteDocumentTitle, formatDocumentTitle } from '@/lib/seo/document-title';

export type MovePageMetadataInput = {
  title: string;
  description: string;
  /** App path starting with `/` (e.g. `/companies`, `/about`). */
  path: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  /** When set, omit the SHARE-002 default image so the route file convention can inject the hashed contextual card. */
  contextualImage?: boolean;
  imageAlt?: string;
};

/** Canonical + OG/Twitter metadata for Move hub pages at the site root. */
export function buildMovePageMetadata(input: MovePageMetadataInput): Metadata {
  const path = input.path.startsWith('/') ? input.path : `/${input.path}`;
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`.replace(/\/$/, '');
  const documentTitle = formatDocumentTitle(input.title);
  return {
    // absolute — never rely on layout template (prevents "| Move Trust Hub | Move Trust Hub")
    title: absoluteDocumentTitle(input.title),
    description: input.description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: buildOpenGraph({
      title: documentTitle,
      description: input.description,
      url,
      type: input.type ?? 'website',
      hub: 'move',
      // File-based opengraph-image.tsx supplies the hashed image URL.
      omitDefaultImage: Boolean(input.contextualImage),
    }),
    twitter: buildTwitter({
      title: documentTitle,
      description: input.description,
      hub: 'move',
      omitDefaultImage: Boolean(input.contextualImage),
    }),
    robots: input.noIndex
      ? // Faceted/filtered views: stay crawlable for links, keep out of the index.
        { index: false, follow: true }
      : { index: true, follow: true },
  };
}
