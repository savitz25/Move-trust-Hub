import type { Metadata } from 'next';
import type { CityHubContent } from '@/lib/destinations/types';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

/** Destinations index — high-intent inbound hub landing */
export const DESTINATIONS_INDEX_TITLE =
  'Popular Moving Destinations (2026) — City Guides, Costs & Trusted Movers';
export const DESTINATIONS_INDEX_DESCRIPTION =
  'Explore 480+ inbound moving guides for Myrtle Beach, South Florida, Texas, Arizona, and fast-growing relocation markets. Compare FMCSA-verified movers, estimate costs with our free calculator, and research carriers in our independent directory — no lead fees.';

/** Refined homepage meta — targets quote + directory + local movers keywords */
export const HOMEPAGE_SEO_TITLE =
  'Where Are You Moving? ZIP Planner + FMCSA Movers | MoveTrustHub';
export const HOMEPAGE_SEO_DESCRIPTION =
  'Enter From & To ZIPs to find trusted movers for your route, estimate move size, and browse county guides. Independent FMCSA directory — no lead fees, no paid placements.';

export function buildCityHubMetadata(content: CityHubContent): Metadata {
  const canonical = `${SITE_URL}${content.seo.canonicalPath}`;

  return {
    title: { absolute: content.seo.title },
    description: content.seo.description,
    alternates: { canonical },
    openGraph: {
      ...buildOpenGraph({
        title: content.seo.title,
        description: content.seo.description,
        url: canonical,
      }),
      images: [
        {
          url: content.seo.ogImagePath,
          width: 1200,
          height: 630,
          alt: content.seo.ogImageAlt,
        },
      ],
    },
    twitter: buildTwitter({
      title: content.seo.title,
      description: content.seo.description,
    }),
    robots: { index: true, follow: true },
    category: 'Moving Destination Guides',
  };
}

export function buildDestinationsIndexMetadata(): Metadata {
  const canonical = `${SITE_URL}/moving-to`;

  return {
    title: { absolute: `${DESTINATIONS_INDEX_TITLE} | Move Trust Hub` },
    description: DESTINATIONS_INDEX_DESCRIPTION,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title: DESTINATIONS_INDEX_TITLE,
      description: DESTINATIONS_INDEX_DESCRIPTION,
      url: canonical,
    }),
    twitter: buildTwitter({
      title: DESTINATIONS_INDEX_TITLE,
      description: DESTINATIONS_INDEX_DESCRIPTION,
    }),
    robots: { index: true, follow: true },
    category: 'Moving Destination Guides',
  };
}