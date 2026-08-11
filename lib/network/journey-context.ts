/**
 * Stage A′ — emit non-PII journey context for crawlable inter-hub handoffs.
 * Receivers: LenderTrustHub + InsuranceTrustHub (already parse this contract).
 *
 * Example:
 *   ?src=move&journey=relocate&state=FL&county=miami-dade&intent=buy
 */

import { INSURANCE_SITE_URL, LENDER_SITE_URL } from '@/lib/hub/domains';
import type { Market } from '@/lib/destinations/types';

export type JourneyIntent = 'buy' | 'rent' | 'unknown';

export type MoveJourneyGeo = {
  stateCode: string;
  stateSlug: string;
  stateName: string;
  /** Lender-style county slug when known (e.g. miami-dade) */
  countySlug?: string;
  placeLabel: string;
};

/** Parse `horry-sc` / `miami-dade-fl` → county slug for Lender */
export function countySlugFromMarketKey(key: string): string | undefined {
  const parts = key.toLowerCase().split('-').filter(Boolean);
  if (parts.length < 2) return undefined;
  // last segment is state code
  const countyParts = parts.slice(0, -1);
  return countyParts.join('-') || undefined;
}

export function stateSlugFromName(stateName: string): string {
  return stateName.toLowerCase().replace(/\s+/g, '-');
}

export function journeyGeoFromMarket(market: Market): MoveJourneyGeo {
  const primary = market.primaryCounties?.[0];
  const countySlug = primary ? countySlugFromMarketKey(primary) : undefined;
  return {
    stateCode: market.stateCode.toUpperCase(),
    stateSlug: stateSlugFromName(market.stateName),
    stateName: market.stateName,
    countySlug,
    placeLabel: market.isClusterParent
      ? market.stateName
      : `${market.displayName}, ${market.stateCode}`,
  };
}

export function journeyGeoFromState(input: {
  stateCode: string;
  stateSlug: string;
  stateName: string;
}): MoveJourneyGeo {
  return {
    stateCode: input.stateCode.toUpperCase(),
    stateSlug: input.stateSlug,
    stateName: input.stateName,
    placeLabel: input.stateName,
  };
}

function buildQuery(
  geo: MoveJourneyGeo,
  intent: JourneyIntent
): string {
  const p = new URLSearchParams();
  p.set('src', 'move');
  p.set('journey', 'relocate');
  p.set('state', geo.stateCode);
  if (geo.countySlug) p.set('county', geo.countySlug);
  if (intent !== 'unknown') p.set('intent', intent);
  return p.toString();
}

/** Absolute crawlable Lender URL — county preferred, else state. */
export function buildLenderJourneyUrl(
  geo: MoveJourneyGeo,
  intent: JourneyIntent = 'buy'
): string {
  // Mortgage research is always purchase-intent when linking to Lender
  const q = buildQuery(geo, intent === 'rent' ? 'buy' : intent === 'unknown' ? 'buy' : intent);
  const path = geo.countySlug
    ? `/local-lenders/${geo.stateSlug}/${geo.countySlug}`
    : `/local-lenders/${geo.stateSlug}`;
  return `${LENDER_SITE_URL}${path}?${q}`;
}

/**
 * Insurance destination guides published on InsuranceTrustHub (keep in sync).
 * States without a guide soft-land via /destinations?state=XX → directory.
 */
const INSURANCE_DESTINATION_SLUGS = new Set([
  'florida',
  'texas',
  'california',
  'illinois',
  'new-york',
  'north-carolina',
]);

/** Absolute crawlable Insurance destination URL. */
export function buildInsuranceJourneyUrl(
  geo: MoveJourneyGeo,
  intent: JourneyIntent = 'unknown'
): string {
  const p = new URLSearchParams();
  p.set('src', 'move');
  p.set('journey', 'relocate');
  p.set('state', geo.stateCode);
  if (geo.countySlug) p.set('county', geo.countySlug);
  if (intent === 'rent') p.set('intent', 'rent');
  else if (intent === 'buy') p.set('intent', 'buy');
  const qs = p.toString();
  // Prefer published destination guides; never deep-link a 404 slug
  if (INSURANCE_DESTINATION_SLUGS.has(geo.stateSlug)) {
    return `${INSURANCE_SITE_URL}/destinations/${geo.stateSlug}?${qs}`;
  }
  // Hub entry with params — Insurance soft-lands to directory when no guide exists
  return `${INSURANCE_SITE_URL}/destinations?${qs}`;
}

export type JourneyCard = {
  priority: 'primary' | 'secondary';
  title: string;
  body: string;
  cta: string;
  href: string;
  hub: 'lender' | 'insurance';
};

/**
 * Routing:
 * - buy → Lender primary, Insurance secondary
 * - rent → Insurance primary only (no forced mortgage)
 * - unknown → Insurance primary, Lender secondary
 */
export function buildMoveJourneyCards(
  geo: MoveJourneyGeo,
  intent: JourneyIntent = 'unknown'
): JourneyCard[] {
  const place = geo.placeLabel;
  const countyOrState = geo.countySlug
    ? `${geo.countySlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')} County, ${geo.stateName}`
    : geo.stateName;

  const lender: JourneyCard = {
    hub: 'lender',
    priority: 'primary',
    title: `Buying after your move to ${place}?`,
    body: `Research mortgage activity, local lenders, and Loan Estimate tools for ${countyOrState}.`,
    cta: 'Research local lenders',
    href: buildLenderJourneyUrl(geo, 'buy'),
  };

  const insurance: JourneyCard = {
    hub: 'insurance',
    priority: 'primary',
    title: 'Your move changes more than your address',
    body:
      intent === 'rent'
        ? `Research renters and auto coverage considerations for ${geo.stateName}.`
        : `Research coverage considerations for ${geo.stateName} — homeowners, renters, and auto as relevant.`,
    cta: 'Research coverage',
    href: buildInsuranceJourneyUrl(
      geo,
      intent === 'buy' ? 'buy' : intent === 'rent' ? 'rent' : 'unknown'
    ),
  };

  if (intent === 'buy') {
    return [
      { ...lender, priority: 'primary' },
      { ...insurance, priority: 'secondary' },
    ];
  }
  if (intent === 'rent') {
    return [{ ...insurance, priority: 'primary' }];
  }
  // unknown: insurance first, lender optional secondary
  return [
    { ...insurance, priority: 'primary' },
    { ...lender, priority: 'secondary' },
  ];
}
