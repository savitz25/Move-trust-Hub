import type { Redirect } from 'next/dist/lib/load-custom-routes';
import { INSURANCE_RESOURCE_SLUG_ALIASES } from '../insurance/resources/slug-aliases';
import {
  INSURANCE_CALCULATOR_SLUGS,
  LENDER_CALCULATOR_SLUG_MAP,
  MOVE_RESOURCE_SLUGS,
} from './hub-link-rules';

/**
 * Hub migration redirects for movetrusthub.com.
 *
 * Order matters in vercel.json:
 *   1. Host-based legacy domain rules FIRST (lendertrusthub / insurancetrusthub)
 *   2. Specific calculator + alias rules before broad catch-alls
 * Keep in sync with vercel.json `redirects` (edge runs before Next.js).
 *
 * IMPORTANT: Do NOT blanket-redirect `/resources` — Move marketing guides live at /resources/*.
 */

/** Insurance calculators must win over lender `/calculators/:path*` catch-all. */
const INSURANCE_CALCULATOR_REDIRECTS: Redirect[] = [
  {
    source: '/calculators/premium-estimator',
    destination: '/insurance/calculators/premium-estimator',
    permanent: true,
  },
  {
    source: '/calculators/medicare-gap',
    destination: '/insurance/calculators/medicare-gap',
    permanent: true,
  },
  {
    source: '/calculators/aca-subsidy',
    destination: '/insurance/calculators/aca-subsidy',
    permanent: true,
  },
];

/** Legacy lender calculator slugs → unified calculator hub with ?calc= id. */
export const LENDER_CALCULATOR_SLUG_REDIRECTS: Redirect[] = [
  { source: '/calculators/mortgage-payment', destination: '/lender/calculators?calc=payment', permanent: true },
  { source: '/calculators/affordability', destination: '/lender/calculators?calc=affordability', permanent: true },
  { source: '/calculators/refinance', destination: '/lender/calculators?calc=refinance', permanent: true },
  { source: '/calculators/amortization', destination: '/lender/calculators?calc=amortization', permanent: true },
  { source: '/calculators/rent-vs-buy', destination: '/lender/calculators?calc=rent-vs-buy', permanent: true },
  { source: '/calculators/heloc', destination: '/lender/calculators?calc=heloc', permanent: true },
  { source: '/calculators/down-payment', destination: '/lender/calculators?calc=down-payment', permanent: true },
  { source: '/calculators/rental', destination: '/lender/calculators?calc=rental', permanent: true },
  { source: '/calculators/dti', destination: '/lender/calculators?calc=dti', permanent: true },
  { source: '/calculators/closing', destination: '/lender/calculators?calc=closing', permanent: true },
  { source: '/calculators/va', destination: '/lender/calculators?calc=payment', permanent: true },
];

/** Duplicate specialty hub → canonical MSA page. */
const INSURANCE_HUB_ALIAS_REDIRECTS: Redirect[] = [
  {
    source: '/insurance/hubs/south-florida',
    destination: '/insurance/hubs/florida/miami-fort-lauderdale',
    permanent: true,
  },
  {
    source: '/hubs/south-florida',
    destination: '/insurance/hubs/florida/miami-fort-lauderdale',
    permanent: true,
  },
];

/** Bare root paths from legacy Insurance Trust Hub → `/insurance/*`. */
const INSURANCE_ROOT_REDIRECTS: Redirect[] = [
  { source: '/directory', destination: '/insurance/directory', permanent: true },
  { source: '/directory/:path*', destination: '/insurance/directory/:path*', permanent: true },
  { source: '/hubs', destination: '/insurance/hubs', permanent: true },
  { source: '/hubs/:path*', destination: '/insurance/hubs/:path*', permanent: true },
  { source: '/destinations', destination: '/insurance/destinations', permanent: true },
  { source: '/destinations/:path*', destination: '/insurance/destinations/:path*', permanent: true },
  { source: '/providers', destination: '/insurance/providers', permanent: true },
  { source: '/providers/:path*', destination: '/insurance/providers/:path*', permanent: true },
  { source: '/tools', destination: '/insurance/tools', permanent: true },
  { source: '/tools/:path*', destination: '/insurance/tools/:path*', permanent: true },
  { source: '/privacy', destination: '/insurance/privacy', permanent: true },
  { source: '/terms', destination: '/insurance/terms', permanent: true },
];

/** Bare root paths from legacy Lender Trust Hub → `/lender/*`. */
const LENDER_ROOT_REDIRECTS: Redirect[] = [
  { source: '/local-lenders', destination: '/lender/local-lenders', permanent: true },
  { source: '/local-lenders/:path*', destination: '/lender/local-lenders/:path*', permanent: true },
  { source: '/fdic-insured-banks', destination: '/lender/fdic-insured-banks', permanent: true },
  { source: '/fdic-insured-banks/:path*', destination: '/lender/fdic-insured-banks/:path*', permanent: true },
  { source: '/auto-loan-companies', destination: '/lender/auto-loan-companies', permanent: true },
  { source: '/auto-loan-companies/:path*', destination: '/lender/auto-loan-companies/:path*', permanent: true },
  { source: '/lenders', destination: '/lender/lenders', permanent: true },
  { source: '/lenders/:path*', destination: '/lender/lenders/:path*', permanent: true },
  // /compare stays on Move hub at /compare — lender compare is /lender/compare only
];

/** Bare /calculators index → lender hub. */
const CALCULATOR_INDEX_REDIRECT: Redirect = {
  source: '/calculators',
  destination: '/lender/calculators',
  permanent: true,
};

/**
 * Unknown legacy calculator slugs (Vercel edge only).
 * Do NOT add `/calculators/:path*` to next.config — Next.js rewrites the
 * destination to `/lender/calculators/:path*`, shadowing specific rules.
 * Middleware + resolveHubMigrationRedirect() handle unknown slugs locally.
 */
const CALCULATOR_VERCEL_CATCHALL: Redirect = {
  source: '/calculators/:path*',
  destination: '/lender/calculators',
  permanent: true,
};

function resourceAliasRedirects(): Redirect[] {
  const rules: Redirect[] = [];
  for (const [alias, canonical] of Object.entries(INSURANCE_RESOURCE_SLUG_ALIASES)) {
    if (alias === canonical) continue;
    rules.push({
      source: `/resources/${alias}`,
      destination: `/insurance/resources/${canonical}`,
      permanent: true,
    });
    rules.push({
      source: `/insurance/resources/${alias}`,
      destination: `/insurance/resources/${canonical}`,
      permanent: true,
    });
  }
  return rules;
}

/** Standalone Trust Hub domains → movetrusthub.com subdirectories (+ ?from= for welcome banner). */
export const HUB_DOMAIN_REDIRECTS: Redirect[] = [
  {
    source: '/:path*',
    has: [{ type: 'host', value: 'www.lendertrusthub.com' }],
    destination: 'https://www.movetrusthub.com/lender/:path*?from=lendertrusthub',
    permanent: true,
  },
  {
    source: '/:path*',
    has: [{ type: 'host', value: 'lendertrusthub.com' }],
    destination: 'https://www.movetrusthub.com/lender/:path*?from=lendertrusthub',
    permanent: true,
  },
  {
    source: '/:path*',
    has: [{ type: 'host', value: 'www.insurancetrusthub.com' }],
    destination: 'https://www.movetrusthub.com/insurance/:path*?from=insurancetrusthub',
    permanent: true,
  },
  {
    source: '/:path*',
    has: [{ type: 'host', value: 'insurancetrusthub.com' }],
    destination: 'https://www.movetrusthub.com/insurance/:path*?from=insurancetrusthub',
    permanent: true,
  },
];

/** Path redirects for Vercel edge (vercel.json) — includes calculator catch-all. */
export function getVercelHubRedirects(): Redirect[] {
  return [
    ...INSURANCE_CALCULATOR_REDIRECTS,
    ...LENDER_CALCULATOR_SLUG_REDIRECTS,
    ...resourceAliasRedirects(),
    ...INSURANCE_HUB_ALIAS_REDIRECTS,
    ...INSURANCE_ROOT_REDIRECTS,
    ...LENDER_ROOT_REDIRECTS,
    CALCULATOR_INDEX_REDIRECT,
    CALCULATOR_VERCEL_CATCHALL,
  ];
}

/**
 * Path redirects safe for next.config.
 * Calculator + resource-alias rules live in middleware (Next.js collapses
 * `/calculators/:slug` rules into a broken `/calculators/:path*` catch-all).
 */
export function getNextConfigHubRedirects(): Redirect[] {
  return [...INSURANCE_HUB_ALIAS_REDIRECTS, ...INSURANCE_ROOT_REDIRECTS, ...LENDER_ROOT_REDIRECTS];
}

/** @deprecated Use getVercelHubRedirects or getNextConfigHubRedirects */
export function getHubMigrationRedirects(): Redirect[] {
  return getVercelHubRedirects();
}

/** All redirects including legacy domain host rules (for next.config). */
export function getAllHubRedirects(): Redirect[] {
  return [...getNextConfigHubRedirects(), ...HUB_DOMAIN_REDIRECTS];
}

const INSURANCE_BARE_ROOTS = [
  '/directory',
  '/hubs',
  '/destinations',
  '/providers',
  '/tools',
  '/privacy',
  '/terms',
] as const;

const LENDER_BARE_ROOTS = [
  '/local-lenders',
  '/fdic-insured-banks',
  '/auto-loan-companies',
  '/lenders',
] as const;

function normalizeHost(host: string): string {
  return host.toLowerCase().replace(/:\d+$/, '');
}

/**
 * Programmatic redirect resolver for middleware (and local dev parity).
 * Next.js may collapse duplicate redirect rules in routes-manifest; Vercel edge
 * uses vercel.json order. Middleware ensures blanket legacy paths always resolve.
 */
export function resolveHubMigrationRedirect(
  pathname: string,
  host?: string
): string | null {
  if (host) {
    const h = normalizeHost(host);
    if (h === 'lendertrusthub.com' || h === 'www.lendertrusthub.com') {
      const path = `/lender${pathname === '/' ? '' : pathname}`;
      return `${path}?from=lendertrusthub`;
    }
    if (h === 'insurancetrusthub.com' || h === 'www.insurancetrusthub.com') {
      const path = `/insurance${pathname === '/' ? '' : pathname}`;
      return `${path}?from=insurancetrusthub`;
    }
  }

  if (pathname === '/calculators') {
    return '/lender/calculators';
  }

  if (pathname.startsWith('/calculators/')) {
    const slug = pathname.slice('/calculators/'.length).split('/')[0];
    if (INSURANCE_CALCULATOR_SLUGS.has(slug)) {
      return `/insurance/calculators/${slug}`;
    }
    const calcId = LENDER_CALCULATOR_SLUG_MAP[slug];
    if (calcId) {
      return `/lender/calculators?calc=${calcId}`;
    }
    return '/lender/calculators';
  }

  const bareResource = pathname.match(/^\/resources\/([^/]+)$/);
  if (bareResource) {
    const slug = bareResource[1];
    if (MOVE_RESOURCE_SLUGS.has(slug)) return null;
    const canonical = INSURANCE_RESOURCE_SLUG_ALIASES[slug];
    if (canonical && canonical !== slug) {
      return `/insurance/resources/${canonical}`;
    }
    return null;
  }

  const prefixedResource = pathname.match(/^\/insurance\/resources\/([^/]+)$/);
  if (prefixedResource) {
    const slug = prefixedResource[1];
    const canonical = INSURANCE_RESOURCE_SLUG_ALIASES[slug];
    if (canonical && canonical !== slug) {
      return `/insurance/resources/${canonical}`;
    }
    return null;
  }

  // Doubled hub prefixes from bad absolute links (GSC 404 / soft-404)
  if (pathname.startsWith('/insurance/insurance')) {
    return pathname.replace(/^\/insurance\/insurance/, '/insurance') || '/insurance';
  }
  if (pathname.startsWith('/lender/lender')) {
    return pathname.replace(/^\/lender\/lender/, '/lender') || '/lender';
  }

  if (pathname === '/from-georgia-to-huntsville' || pathname.startsWith('/from-georgia-to-huntsville')) {
    return '/moving-to/alabama/huntsville-al';
  }

  if (pathname.startsWith('/insurance/') || pathname.startsWith('/lender/')) {
    return null;
  }

  for (const root of INSURANCE_BARE_ROOTS) {
    if (pathname === root || pathname.startsWith(`${root}/`)) {
      return `/insurance${pathname}`;
    }
  }

  for (const root of LENDER_BARE_ROOTS) {
    if (pathname === root || pathname.startsWith(`${root}/`)) {
      return `/lender${pathname}`;
    }
  }

  return null;
}