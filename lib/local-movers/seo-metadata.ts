import type { Metadata } from 'next';
import {
  evaluateCountyIndexability,
  type CountyIndexDecision,
} from '@/lib/local-movers/county-indexability';
import { buildCountyPageTitle } from '@/lib/local-movers/county-display-copy';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';
import {
  buildCountyDescription,
  buildStateDescription,
  buildStateTitle,
  getSeoYear,
} from '@/lib/local-movers/county-seo';
import {
  SITE_URL,
  buildOpenGraph,
  buildTwitter,
} from '@/lib/seo/site-metadata';
import { absoluteDocumentTitle, formatDocumentTitle } from '@/lib/seo/document-title';

export function buildCountyPageMetadata(
  county: LocalCounty,
  stateName: string,
  movers: LocalMover[],
  path: string,
  indexDecision?: CountyIndexDecision
): Metadata {
  const title = buildCountyPageTitle(county, getSeoYear());
  const description = buildCountyDescription(county, stateName, movers.length);
  const url = `${SITE_URL}${path}`;
  const documentTitle = formatDocumentTitle(title);
  const resolvedIndexDecision =
    indexDecision ?? evaluateCountyIndexability(county.stateSlug, county.slug);
  const shouldIndex = resolvedIndexDecision.tier === 'index';

  return {
    title: absoluteDocumentTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title: documentTitle, description, url }),
    twitter: buildTwitter({ title: documentTitle, description }),
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
    category: 'Local Moving Services',
  };
}

export function buildStatePageMetadata(
  stateName: string,
  _stateCode: string,
  countyCount: number,
  path: string
): Metadata {
  const title = buildStateTitle(stateName, countyCount);
  const description = buildStateDescription(stateName, countyCount);
  const url = `${SITE_URL}${path}`;
  const documentTitle = formatDocumentTitle(title);

  return {
    title: absoluteDocumentTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title: documentTitle, description, url }),
    twitter: buildTwitter({ title: documentTitle, description }),
    robots: { index: true, follow: true },
    category: 'Local Moving Services',
  };
}

export function buildHubPageMetadata(): Metadata {
  const title = 'Local Movers by State & County — Find Trusted Movers Near You 2026';
  const description =
    'Browse 3,100+ county-level local mover guides across all 50 states. FMCSA licensing, ratings, cost estimates, and moving tips. Compare trusted movers in our independent directory.';
  const path = '/local-movers';
  const url = `${SITE_URL}${path}`;
  const documentTitle = formatDocumentTitle(title);

  return {
    title: absoluteDocumentTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title: documentTitle, description, url }),
    twitter: buildTwitter({ title: documentTitle, description }),
    robots: { index: true, follow: true },
    category: 'Local Moving Services',
  };
}

export { buildCountyPageH1 as buildCountyH1 } from '@/lib/local-movers/county-display-copy';
