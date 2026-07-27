import type { Metadata } from 'next';
import { getHubConfig } from '@/lib/hub/config';
import { INSURANCE_SITE_URL, MOVE_SITE_URL } from '@/lib/hub/domains';
import { hubCanonicalUrl, normalizeHubMetadataPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

export type HubPageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

function resolveHubTitle(hub: HubId, rawTitle: string): string {
  const config = getHubConfig(hub);
  if (hub === 'move') return rawTitle;
  const brandTokens = [config.siteName, config.applicationName, config.shortName];
  if (brandTokens.some((token) => rawTitle.includes(token))) return rawTitle;
  if (/LenderTrustHub|InsuranceTrustHub|MoveTrustHub/i.test(rawTitle)) return rawTitle;
  return `${rawTitle} | ${config.siteName}`;
}

export function buildHubMetadata(
  hub: HubId,
  input: HubPageMetadataInput
): Metadata {
  const cleanPath = normalizeHubMetadataPath(hub, input.path ?? '/');
  const canonical = hubCanonicalUrl(hub, cleanPath);
  const title = resolveHubTitle(hub, input.title);
  const config = getHubConfig(hub);

  // Sub-hub pages bypass the root Move title template to prevent duplicate suffixes.
  const titleField: Metadata['title'] =
    hub === 'move' ? title : { absolute: title };

  return {
    title: titleField,
    description: input.description,
    applicationName: config.applicationName,
    category: config.category,
    // Prevent MoveTrustHub root-layout author leakage onto hub pages
    ...(hub === 'insurance'
      ? {
          creator: 'InsuranceTrustHub',
          publisher: 'InsuranceTrustHub',
          authors: [{ name: 'InsuranceTrustHub', url: INSURANCE_SITE_URL }],
        }
      : {}),
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
    // Class D soft-retire: noindex but keep follow so internal links remain useful.
    robots: input.noIndex ? { index: false, follow: true } : undefined,
    metadataBase: new URL(hub === 'insurance' ? INSURANCE_SITE_URL : MOVE_SITE_URL || SITE_URL),
  };
}

export function buildHubLayoutMetadata(hub: HubId): Metadata {
  const config = getHubConfig(hub);
  return buildHubMetadata(hub, {
    title: config.homeTitle,
    description: config.homeDescription,
    path: '/',
  });
}