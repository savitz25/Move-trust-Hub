/**
 * County Intelligence catalog — plug-in source keys per research county.
 * Absence of a source key means no county credential dataset is contributing.
 * Do not treat that as zero credentials or zero incidents.
 */
import {
  MDC_CREDENTIAL_TYPE_PUBLIC,
  MDC_REGULATOR,
  MDC_SOURCE_KEY,
  MDC_SOURCE_LOOKUP_URL,
} from '@/lib/county-regulatory/mdc/public-read-core';
import {
  PBC_REGULATOR,
  PBC_SOURCE_KEY,
  PBC_SOURCE_LOOKUP_URL,
} from '@/lib/county-regulatory/pbc/public-read-core';
import type { FloridaResearchCountySlug } from './coverage';
import { FLORIDA_RESEARCH_COUNTIES } from './coverage';

export type FloridaCountyIntelCatalogEntry = {
  slug: FloridaResearchCountySlug;
  name: string;
  canonicalPath: string;
  sourceKey: string | null;
  fallbackAgency: string | null;
  fallbackCredentialType: string | null;
  fallbackSourceUrl: string | null;
  credentialEntityLabel: string;
};

export const FLORIDA_COUNTY_INTEL_CATALOG: Record<
  FloridaResearchCountySlug,
  FloridaCountyIntelCatalogEntry
> = {
  broward: {
    slug: 'broward',
    name: 'Broward',
    canonicalPath: '/local-movers/florida/broward',
    sourceKey: null,
    fallbackAgency: null,
    fallbackCredentialType: null,
    fallbackSourceUrl: null,
    credentialEntityLabel: 'county credential',
  },
  'palm-beach': {
    slug: 'palm-beach',
    name: 'Palm Beach',
    canonicalPath: '/local-movers/florida/palm-beach',
    sourceKey: PBC_SOURCE_KEY,
    fallbackAgency: PBC_REGULATOR,
    fallbackCredentialType: 'Palm Beach County moving-business permit',
    fallbackSourceUrl: PBC_SOURCE_LOOKUP_URL,
    credentialEntityLabel: 'county moving-business permit',
  },
  'miami-dade': {
    slug: 'miami-dade',
    name: 'Miami-Dade',
    canonicalPath: '/local-movers/florida/miami-dade',
    sourceKey: MDC_SOURCE_KEY,
    fallbackAgency: MDC_REGULATOR,
    fallbackCredentialType: MDC_CREDENTIAL_TYPE_PUBLIC,
    fallbackSourceUrl: MDC_SOURCE_LOOKUP_URL,
    credentialEntityLabel: 'county moving-business registration',
  },
  pinellas: {
    slug: 'pinellas',
    name: 'Pinellas',
    canonicalPath: '/local-movers/florida/pinellas',
    sourceKey: null,
    fallbackAgency: null,
    fallbackCredentialType: null,
    fallbackSourceUrl: null,
    credentialEntityLabel: 'county credential',
  },
};

export function catalogEntryForCounty(slug: string): FloridaCountyIntelCatalogEntry | null {
  const known = FLORIDA_RESEARCH_COUNTIES.find((c) => c.slug === slug);
  if (!known) return null;
  return FLORIDA_COUNTY_INTEL_CATALOG[known.slug];
}
