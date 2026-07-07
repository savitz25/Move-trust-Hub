import type { HubId } from '@/lib/hub/types';

export type LegacyRedirectSource = 'lendertrusthub' | 'insurancetrusthub';

export const LEGACY_REDIRECT_SOURCES: Record<
  LegacyRedirectSource,
  { hubId: HubId; brand: string; host: string; emoji: string }
> = {
  lendertrusthub: {
    hubId: 'lender',
    brand: 'Lender Trust Hub',
    host: 'lendertrusthub.com',
    emoji: '🏠',
  },
  insurancetrusthub: {
    hubId: 'insurance',
    brand: 'Insurance Trust Hub',
    host: 'insurancetrusthub.com',
    emoji: '🛡️',
  },
};

const SOURCE_ALIASES: Record<string, LegacyRedirectSource> = {
  lendertrusthub: 'lendertrusthub',
  'lender-trust': 'lendertrusthub',
  'lender-trust-hub': 'lendertrusthub',
  insurancetrusthub: 'insurancetrusthub',
  'insurance-trust': 'insurancetrusthub',
  'insurance-trust-hub': 'insurancetrusthub',
};

export function normalizeLegacySource(raw: string): LegacyRedirectSource | null {
  const normalized = raw.toLowerCase().replace(/\.com|www\.|https?:\/\//g, '');
  const key = Object.keys(SOURCE_ALIASES).find((alias) => normalized.includes(alias));
  return key ? SOURCE_ALIASES[key] : null;
}

/** Query string appended to 308 redirect targets for welcome banner + GA4 attribution */
export function legacyRedirectQuery(source: LegacyRedirectSource): string {
  return `from=${source}`;
}

export function appendLegacyFromParam(url: string, source: LegacyRedirectSource): string {
  const parsed = new URL(url, 'https://www.movetrusthub.com');
  if (!parsed.searchParams.has('from')) {
    parsed.searchParams.set('from', source);
  }
  return `${parsed.pathname}${parsed.search}`;
}