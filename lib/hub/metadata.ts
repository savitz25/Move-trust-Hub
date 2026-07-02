import type { Metadata } from 'next';
import { getHubConfig } from '@/lib/hub/config';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

export type HubPageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

function resolveHubTitle(hub: HubId, rawTitle: string): string {
  const config = getHubConfig(hub);
  if (hub === 'move') return rawTitle;
  if (rawTitle.includes(config.siteName)) return rawTitle;
  return `${rawTitle} | ${config.siteName}`;
}

export function buildHubMetadata(
  hub: HubId,
  input: HubPageMetadataInput
): Metadata {
  const canonical = hubCanonicalUrl(hub, input.path ?? '/');
  const title = resolveHubTitle(hub, input.title);

  // Sub-hub pages bypass the root Move title template to prevent duplicate suffixes.
  const titleField: Metadata['title'] =
    hub === 'move' ? title : { absolute: title };

  return {
    title: titleField,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title,
      description: input.description,
      url: canonical,
      hub,
    }),
    twitter: buildTwitter({
      title,
      description: input.description,
      hub,
    }),
    robots: input.noIndex ? { index: false, follow: false } : undefined,
    metadataBase: new URL(SITE_URL),
  };
}

export function buildHubLayoutMetadata(hub: HubId): Metadata {
  const config = getHubConfig(hub);
  return buildHubMetadata(hub, {
    title: config.homeTitle,
    description: config.homeDescription,
    path: '/',
    keywords:
      hub === 'lender'
        ? ['mortgage lenders', 'NMLS verified', 'county lenders', 'mortgage calculator']
        : hub === 'insurance'
          ? ['insurance agents', 'health insurance', 'DOI verified', 'ACA', 'Medicare']
          : undefined,
  });
}