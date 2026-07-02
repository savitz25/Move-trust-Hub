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

export function buildHubMetadata(
  hub: HubId,
  input: HubPageMetadataInput
): Metadata {
  const config = getHubConfig(hub);
  const canonical = hubCanonicalUrl(hub, input.path ?? '/');
  const title =
    hub === 'move'
      ? input.title
      : input.title.includes(config.siteName)
        ? input.title
        : `${input.title} | ${config.siteName}`;

  return {
    title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title,
      description: input.description,
      url: canonical,
    }),
    twitter: buildTwitter({
      title,
      description: input.description,
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