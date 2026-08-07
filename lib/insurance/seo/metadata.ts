import type { Metadata } from 'next';
import {
  INSURANCE_HUB_LOGO,
  INSURANCE_LOGO_VERSION,
  insuranceHubOgImageUrl,
} from '@/lib/hub/config';
import { INSURANCE_SITE_URL } from '@/lib/hub/domains';
import { hubCanonicalUrl, normalizeHubMetadataPath } from '@/lib/hub/paths';
import { SITE_NAME } from '@/lib/insurance/constants';

export const SITE_URL = hubCanonicalUrl('insurance', '/');

export const HOMEPAGE_TITLE =
  'Research Licensed Insurance Agencies (2026) | Independent Directory';
export const HOMEPAGE_DESCRIPTION =
  'Independent research directory of state-licensed insurance agencies and agents. Compare listing signals and re-check licenses on official DOI tools — no free quotes, no paid placements, no policy sales.';

export const DEFAULT_SITE_DESCRIPTION =
  'InsuranceTrustHub is an independent research directory of state-licensed insurance agencies. Research listings, educational calculators, and license re-check pathways for auto, home, life, health, and business coverage — no paid placements. We do not sell policies or run a quote marketplace.';

/** Final lockup on Shield navy — static asset for reliable social previews. */
export const OG_IMAGE = {
  url: `/insurance/brand/insurance-trust-hub-og.png?v=${INSURANCE_LOGO_VERSION}`,
  width: 1200,
  height: 630,
  alt: 'Insurance Trust Hub — independent DOI-verified insurance research',
  absoluteUrl: insuranceHubOgImageUrl(INSURANCE_SITE_URL),
} as const;

export const INSURANCE_ICON = {
  url: INSURANCE_HUB_LOGO.headerSrc,
  width: INSURANCE_HUB_LOGO.width,
  height: INSURANCE_HUB_LOGO.height,
  alt: INSURANCE_HUB_LOGO.alt,
} as const;

export function buildOpenGraph(
  overrides: {
    title?: string;
    description?: string;
    url?: string;
    type?: 'website' | 'article';
  } = {}
): NonNullable<Metadata['openGraph']> {
  return {
    title: overrides.title ?? HOMEPAGE_TITLE,
    description: overrides.description ?? HOMEPAGE_DESCRIPTION,
    url: overrides.url ?? SITE_URL,
    siteName: SITE_NAME,
    type: overrides.type ?? 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  };
}

export function buildTwitter(
  overrides: {
    title?: string;
    description?: string;
  } = {}
): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title: overrides.title ?? HOMEPAGE_TITLE,
    description: overrides.description ?? HOMEPAGE_DESCRIPTION,
    images: [OG_IMAGE.url],
  };
}

export interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const cleanPath = normalizeHubMetadataPath('insurance', options.path ?? '/');
  const url = hubCanonicalUrl('insurance', cleanPath);

  return {
    title: options.title,
    description: options.description,
    applicationName: SITE_NAME,
    category: 'insurance services',
    alternates: { canonical: url },
    metadataBase: new URL(INSURANCE_SITE_URL),
    openGraph: buildOpenGraph({
      title: options.title,
      description: options.description,
      url,
      type: options.type,
    }),
    twitter: buildTwitter({
      title: options.title,
      description: options.description,
    }),
    robots: options.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

export const rootLayoutMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'insurance',
  title: {
    default: HOMEPAGE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  icons: {
    icon: [
      {
        url: `/insurance/brand/insurance-trust-hub-favicon-16.png?v=${INSURANCE_LOGO_VERSION}`,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: `/insurance/brand/insurance-trust-hub-favicon-32.png?v=${INSURANCE_LOGO_VERSION}`,
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: `/insurance/brand/insurance-trust-hub-favicon-48.png?v=${INSURANCE_LOGO_VERSION}`,
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: `/insurance/brand/favicon.ico?v=${INSURANCE_LOGO_VERSION}`,
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: `/insurance/brand/apple-touch-icon.png?v=${INSURANCE_LOGO_VERSION}`,
        sizes: '180x180',
        type: 'image/png',
      },
      {
        url: `/insurance/brand/insurance-trust-hub-icon-192.png?v=${INSURANCE_LOGO_VERSION}`,
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },
  openGraph: buildOpenGraph(),
  twitter: buildTwitter(),
  robots: {
    index: true,
    follow: true,
  },
};