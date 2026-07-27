import type { Metadata } from 'next';
import { INSURANCE_HUB_LOGO } from '@/lib/hub/config';
import { INSURANCE_SITE_URL } from '@/lib/hub/domains';
import { hubCanonicalUrl, normalizeHubMetadataPath } from '@/lib/hub/paths';
import { SITE_NAME } from '@/lib/insurance/constants';

export const SITE_URL = hubCanonicalUrl('insurance', '/');

export const HOMEPAGE_TITLE =
  'Find Trusted Insurance Agents (2026) | Compare Licensed Agencies by State';
export const HOMEPAGE_DESCRIPTION =
  'Compare independent and captive insurance agencies by reviews, specialties, and state licensing. Research auto, home, life, and business coverage options.';

export const DEFAULT_SITE_DESCRIPTION =
  'InsuranceTrustHub is an independent directory of licensed insurance agencies. Research providers, read verified reviews, and request quotes for auto, home, life, and business insurance — no paid placements.';

/** Prefer generated OG image; logo used as fallback only. */
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'InsuranceTrustHub — independent DOI-verified insurance agent directory',
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
        url: '/insurance/brand/insurance-trust-hub-favicon-32.png?v=20260728r2',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/insurance/brand/insurance-trust-hub-icon-192.png?v=20260728r2',
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