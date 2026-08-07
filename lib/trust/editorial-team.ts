/**
 * Research attribution for Move Trust Hub (Phase 0 integrity).
 *
 * Path B: no unverifiable named bylines. Content is attributed to
 * "Move Trust Hub Research"; the founder is the accountable operator.
 * Aligns with Ask Trust Hub solo-founder accountability language.
 */

import { SITE_URL } from '@/lib/seo/site-metadata';

export type EditorialEntity = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
};

/** @deprecated Use EditorialEntity — kept as alias for import stability */
export type EditorialExpert = EditorialEntity;

export const EDITORIAL_ORGANIZATION = {
  name: 'Move Trust Hub Research',
  url: 'https://www.movetrusthub.com/about/editorial-team',
} as const;

/** Canonical public page for research accountability (not a multi-editor roster). */
export const EDITORIAL_TEAM_PAGE_PATH = '/about/editorial-team';

/**
 * Accountable operator — matches Ask Trust Hub founder disclosure.
 * Do not invent additional staff or credentials.
 */
export const ACCOUNTABLE_OPERATOR = {
  name: 'Michael Henry',
  role: 'Founder and accountable operator',
  bio: 'Founder of the Ask Trust Hub network, including Move Trust Hub. Responsible for research standards, independence policy, corrections, and commercial decisions until governance is expanded and disclosed.',
  contactPath: '/contact',
} as const;

/** Single public research attribution for bylines and schema author. */
export const MOVE_RESEARCH_DESK: EditorialEntity = {
  id: 'move-research',
  name: 'Move Trust Hub Research',
  role: 'Moving research desk',
  bio: 'Move Trust Hub Research produces and reviews moving-only content: FMCSA-oriented licensing context, county and corridor guides, and reputation methodology. Work is directed by the founder-operated research desk. AI tools may assist drafting or data organization; published claims are reviewed against public sources before release. We do not invent reviews or sell ranking position.',
  expertise: [
    'FMCSA / SAFER public records',
    'Interstate household goods research',
    'County and corridor guides',
    'Reputation methodology',
  ],
};

/**
 * Historical multi-name roster removed (Phase 0 Path B).
 * Kept as empty array so accidental map() call sites fail safe.
 */
export const EDITORIAL_EXPERTS: EditorialEntity[] = [];

export function getPrimaryEditorForContent(
  _contentType: 'county' | 'route' | 'city-hub' | 'directory'
): EditorialEntity {
  return MOVE_RESEARCH_DESK;
}

/** Organization author schema for guides, counties, and hubs. */
export function buildEditorPersonSchema(entity: EditorialEntity = MOVE_RESEARCH_DESK) {
  const pageUrl = `${SITE_URL}${EDITORIAL_TEAM_PAGE_PATH}`;
  return {
    '@type': 'Organization' as const,
    '@id': `${pageUrl}#${entity.id}`,
    name: entity.name,
    description: entity.bio,
    url: pageUrl,
    parentOrganization: {
      '@type': 'Organization' as const,
      '@id': `${SITE_URL}/#organization`,
      name: 'Move Trust Hub',
      url: SITE_URL,
    },
    knowsAbout: entity.expertise,
  };
}

export function editorialExpertHref(_expertId?: string): string {
  return EDITORIAL_TEAM_PAGE_PATH;
}

export function buildResearchAccountabilitySchema() {
  const pageUrl = `${SITE_URL}${EDITORIAL_TEAM_PAGE_PATH}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        name: 'Move Trust Hub Research Accountability',
        url: pageUrl,
        description:
          'How Move Trust Hub attributes research: founder-operated moving research desk, public-source checks, and corrections contact — not multi-vertical directories.',
        isPartOf: { '@type': 'WebSite', name: 'Move Trust Hub', url: SITE_URL },
        about: {
          '@type': 'Organization',
          name: EDITORIAL_ORGANIZATION.name,
          url: EDITORIAL_ORGANIZATION.url,
        },
      },
      buildEditorPersonSchema(MOVE_RESEARCH_DESK),
      {
        '@type': 'Person',
        '@id': `${pageUrl}#operator`,
        name: ACCOUNTABLE_OPERATOR.name,
        jobTitle: ACCOUNTABLE_OPERATOR.role,
        description: ACCOUNTABLE_OPERATOR.bio,
        url: pageUrl,
        worksFor: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Move Trust Hub',
          url: SITE_URL,
        },
      },
    ],
  };
}
