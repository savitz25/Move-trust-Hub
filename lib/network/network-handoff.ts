/**
 * Step 3 — Contextual network handoffs (hub → hub research only).
 * Editorial modules for real decision moments — not sitewide cross-sell.
 */

import { hubPath } from '@/lib/hub/paths';
import { networkHubById, type NetworkHubId } from '@/lib/network/ask-trust-hub';

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

/** Lender state pages use full-name slugs (e.g. florida). Only when known. */
function lenderStateHref(geo?: NetworkHandoffGeography): string {
  const slug = geo?.stateSlug?.toLowerCase().replace(/\s+/g, '-');
  if (slug && /^[a-z-]+$/.test(slug) && slug.length > 1) {
    return hubPath('lender', `/local-lenders/${slug}`);
  }
  return hubPath('lender', '/local-lenders');
}

function insuranceDirectoryHref(geo?: NetworkHandoffGeography): string {
  const code = geo?.stateCode?.toUpperCase();
  if (code && /^[A-Z]{2}$/.test(code)) {
    return hubPath('insurance', `/directory?state=${code}`);
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
  const label = 'Related research in the Ask Trust Hub network';

  switch (context) {
    case 'move-destination': {
      const where = place ? `Moving to ${place}?` : 'Settling into a new area?';
      return {
        label,
        body: `${where} If you’re buying or refinancing, research NMLS-verified lenders on Lender Trust Hub. For homeowners or renters coverage, compare licensed options on Insurance Trust Hub — research only, no paid placements.`,
        links: [
          {
            href: lenderStateHref(geography),
            label: place
              ? `Research lenders near ${place}`
              : 'Research NMLS-verified lenders',
            hub: 'lender',
          },
          {
            href: insuranceDirectoryHref(geography),
            label: 'Compare licensed insurance options',
            hub: 'insurance',
          },
        ],
      };
    }
    case 'move-plan': {
      return {
        label,
        body: 'Mover shortlist ready. Next for many families: confirm homeowners or renters coverage and, if buying, financing — independent research only, no paid placements.',
        links: [
          {
            href: insuranceDirectoryHref(geography),
            label: 'Research homeowners or renters coverage',
            hub: 'insurance',
          },
          {
            href: lenderStateHref(geography),
            label: 'Research NMLS-verified lenders',
            hub: 'lender',
          },
        ],
      };
    }
    case 'lender-closing': {
      return {
        label,
        body: 'Closing on a home? Lenders often require homeowners insurance — research DOI-licensed options on Insurance Trust Hub (independent directory; verify licenses directly).',
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
        body: 'Estimating a payment is one step. Moving after closing? Research FMCSA-verified movers on Move Trust Hub before you book.',
        links: [
          {
            href: moveVerifyHref(),
            label: 'Research FMCSA-verified movers',
            hub: 'move',
          },
        ],
      };
    }
    case 'lender-directory': {
      return {
        label,
        body: 'Home purchase often pairs with coverage and a move. Research homeowners insurance and FMCSA movers independently — rankings are not for sale on any Trust Hub.',
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
          ? `Buying or relocating near ${place}? Research NMLS-verified lenders and FMCSA-licensed movers on the specialist Trust Hubs.`
          : 'Buying the property too? Research NMLS-verified lenders on Lender Trust Hub. Relocating? Research licensed movers on Move Trust Hub.',
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
          ? `Moving to ${place} or already planning a relocation? Research licensed movers on Move Trust Hub before you sign a lease or book a truck.`
          : 'Moving to this area or already planning a relocation? Research licensed movers on Move Trust Hub.',
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
          ? `Moving to ${place}? Research FMCSA-licensed movers on Move Trust Hub. If you’re buying, compare NMLS-verified lenders on Lender Trust Hub.`
          : 'Planning a relocation? Research licensed movers on Move Trust Hub. Buying the home? Research NMLS-verified lenders on Lender Trust Hub.',
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
