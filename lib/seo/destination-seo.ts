import type { Metadata } from 'next';
import type { CityHubContent } from '@/lib/destinations/types';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

/** Destinations index — high-intent inbound hub landing */
export const DESTINATIONS_INDEX_TITLE =
  'Popular Moving Destinations (2026) — City Guides, Costs & Free Quotes';
export const DESTINATIONS_INDEX_DESCRIPTION =
  'Explore 480+ inbound moving guides for Myrtle Beach, South Florida, Texas, Arizona, and fast-growing relocation markets. Compare FMCSA-verified movers, estimate costs with our free calculator, and get matched with 2–3 licensed quotes within 24 hours.';

/** Refined homepage meta — targets quote + directory + local movers keywords */
export const HOMEPAGE_SEO_TITLE =
  'Free Moving Quotes (2026) | Compare FMCSA-Licensed Interstate & Local Movers';
export const HOMEPAGE_SEO_DESCRIPTION =
  'Compare 25+ FMCSA-licensed interstate movers by attributable reviews, pricing, and safety ratings. Free moving calculator, 480+ city destination guides, and 3,100+ county local mover directories. Get matched with 2–3 quotes in 24 hours — independent directory, no sales pressure.';

export function buildCityHubMetadata(content: CityHubContent): Metadata {
  const canonical = `${SITE_URL}${content.seo.canonicalPath}`;

  return {
    title: { absolute: content.seo.title },
    description: content.seo.description,
    keywords: content.seo.keywords,
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
    keywords: [
      'moving destinations',
      'moving to myrtle beach',
      'moving to florida',
      'best cities to move to 2026',
      'inbound moving guides',
      'relocation cost guides',
      'FMCSA movers by city',
    ],
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