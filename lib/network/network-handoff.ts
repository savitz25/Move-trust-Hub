/**
 * Step 3 — Contextual network handoffs (hub → hub research only).
 * Editorial modules for real decision moments — not sitewide cross-sell.
 */

import { hubPath } from '@/lib/hub/paths';
import { networkHubById, type NetworkHubId } from '@/lib/network/ask-trust-hub';
import {
  buildInsuranceJourneyUrl,
  buildLenderJourneyUrl,
  journeyGeoFromState,
  stateSlugFromName,
} from '@/lib/network/journey-context';

export type NetworkHandoffContext =
  | 'move-destination'
  | 'move-plan'
  | 'lender-closing'
  | 'lender-calculator'
  | 'lender-directory'
  | 'insurance-home'
  | 'insurance-renters'
  | 'insurance-destination';

export type NetworkHandoffGeography = {
  state?: string;
  stateCode?: string;
  stateSlug?: string;
  county?: string;
  city?: string;
  /** buy | rent — Lender only when buying. */
  intent?: 'buy' | 'rent' | 'refi' | 'unknown';
  journey?: 'relocate' | 'purchase' | 'coverage' | 'refi' | 'unknown';
};

export type NetworkHandoffVariant = 'inline' | 'card' | 'compact';

export type NetworkHandoffLink = {
  href: string;
  label: string;
  hub: NetworkHubId;
};

export type NetworkHandoffContent = {
  label: string;
  body: string;
  links: NetworkHandoffLink[];
};

function placeLabel(geo?: NetworkHandoffGeography): string | null {
  if (!geo) return null;
  if (geo.city && (geo.stateCode || geo.state)) {
    return `${geo.city}, ${geo.stateCode || geo.state}`;
  }
  if (geo.city) return geo.city;
  if (geo.state) return geo.state;
  if (geo.stateCode) return geo.stateCode;
  return null;
}

/** Lender state/county with Stage A′ journey params (crawlable absolute URL). */
function lenderStateHref(geo?: NetworkHandoffGeography): string {
  const code = geo?.stateCode?.toUpperCase();
  const slug =
    geo?.stateSlug?.toLowerCase().replace(/\s+/g, '-') ||
    (geo?.state ? stateSlugFromName(geo.state) : undefined);
  if (code && slug) {
    return buildLenderJourneyUrl(
      journeyGeoFromState({
        stateCode: code,
        stateSlug: slug,
        stateName: geo?.state || slug,
      }),
      'buy'
    );
  }
  return hubPath('lender', '/local-lenders');
}

function insuranceDirectoryHref(geo?: NetworkHandoffGeography): string {
  const code = geo?.stateCode?.toUpperCase();
  const slug =
    geo?.stateSlug?.toLowerCase().replace(/\s+/g, '-') ||
    (geo?.state ? stateSlugFromName(geo.state) : undefined);
  if (code && slug) {
    return buildInsuranceJourneyUrl(
      journeyGeoFromState({
        stateCode: code,
        stateSlug: slug,
        stateName: geo?.state || slug,
      }),
      'unknown'
    );
  }
  return hubPath('insurance', '/directory');
}

function moveVerifyHref(): string {
  return hubPath('move', '/verify-dot');
}

function moveHomeHref(): string {
  return hubPath('move', '/');
}

/**
 * Resolve editorial body + 1–2 outbound research links for a handoff context.
 */
export function resolveNetworkHandoff(
  context: NetworkHandoffContext,
  geography?: NetworkHandoffGeography
): NetworkHandoffContent {
  const place = placeLabel(geography);
  /** Journey product language (Priority 1) — not generic cross-sell. */
  const label = 'Next in your journey';

  switch (context) {
    case 'move-destination': {
      const buying = geography?.intent === 'buy' || geography?.journey === 'purchase';
      const where = place
        ? `Moving changes more than your address in ${place}.`
        : 'Moving changes more than your address.';
      const links: NetworkHandoffLink[] = [
        {
          href: insuranceDirectoryHref(geography),
          label: 'Research insurance',
          hub: 'insurance',
        },
      ];
      if (buying) {
        links.push({
          href: lenderStateHref(geography),
          label: 'Research lenders',
          hub: 'lender',
        });
      }
      return {
        label,
        body: buying
          ? `${where} Review homeowners, renters, auto, or other relevant coverage for the new location. Buying at your destination? Research lenders before you commit.`
          : `${where} Review homeowners, renters, auto, or other relevant coverage for the new location. Mortgage research is not assumed.`,
        links,
      };
    }
    case 'move-plan': {
      const buying = geography?.intent === 'buy' || geography?.journey === 'purchase';
      const links: NetworkHandoffLink[] = [
        {
          href: insuranceDirectoryHref(geography),
          label: 'Research insurance',
          hub: 'insurance',
        },
      ];
      if (buying) {
        links.push({
          href: lenderStateHref(geography),
          label: 'Research lenders',
          hub: 'lender',
        });
      }
      return {
        label,
        body: buying
          ? 'Buying at your destination? Research lenders and financing before you commit, and review coverage for the new location.'
          : 'Review homeowners, renters, auto, or other relevant coverage for the new location. Financing is only offered when this move is a purchase.',
        links,
      };
    }
    case 'lender-closing': {
      return {
        label,
        body: 'Financing is one part of buying. Lenders often require homeowners insurance — research DOI-licensed options independently (verify licenses on the regulator).',
        links: [
          {
            href: insuranceDirectoryHref(geography),
            label: 'Research DOI-licensed insurance options',
            hub: 'insurance',
          },
        ],
      };
    }
    case 'lender-calculator': {
      return {
        label,
        body: 'A payment estimate is one step in buying. If you’re also relocating, research FMCSA-verified movers before you book.',
        links: [
          {
            href: moveVerifyHref(),
            label: 'Research FMCSA-verified movers',
            hub: 'move',
          },
          {
            href: insuranceDirectoryHref(geography),
            label: 'Research homeowners insurance',
            hub: 'insurance',
          },
        ],
      };
    }
    case 'lender-directory': {
      return {
        label,
        body: 'Financing is one part of buying. Next for many buyers: homeowners coverage research, then the move if you’re relocating.',
        links: [
          {
            href: insuranceDirectoryHref(geography),
            label: 'Research homeowners insurance options',
            hub: 'insurance',
          },
          {
            href: moveHomeHref(),
            label: 'Research interstate movers',
            hub: 'move',
          },
        ],
      };
    }
    case 'insurance-home': {
      return {
        label,
        body: place
          ? `If you’re relocating or buying near ${place}, financing and the move are related research steps on specialist Trust Hubs.`
          : 'If you’re relocating or buying, financing and the move are related research steps on specialist Trust Hubs.',
        links: [
          {
            href: lenderStateHref(geography),
            label: 'Research NMLS-verified lenders',
            hub: 'lender',
          },
          {
            href: moveVerifyHref(),
            label: 'Research licensed movers',
            hub: 'move',
          },
        ],
      };
    }
    case 'insurance-renters': {
      return {
        label,
        body: place
          ? `If you’re relocating to ${place}, research licensed movers before you sign a lease or book a truck.`
          : 'If you’re relocating, research licensed movers before you sign a lease or book a truck.',
        links: [
          {
            href: moveVerifyHref(),
            label: 'Research licensed movers',
            hub: 'move',
          },
        ],
      };
    }
    case 'insurance-destination': {
      return {
        label,
        body: place
          ? `If you’re relocating to ${place} — or buying there — research movers and, if purchase, lenders on the specialist hubs.`
          : 'If you’re relocating or buying, research movers and lenders on the specialist hubs.',
        links: [
          {
            href: moveVerifyHref(),
            label: 'Research licensed movers',
            hub: 'move',
          },
          {
            href: lenderStateHref(geography),
            label: 'Research NMLS-verified lenders',
            hub: 'lender',
          },
        ],
      };
    }
    default: {
      const _exhaustive: never = context;
      return _exhaustive;
    }
  }
}

export function handoffHubName(hub: NetworkHubId): string {
  return networkHubById(hub).proseName;
}
