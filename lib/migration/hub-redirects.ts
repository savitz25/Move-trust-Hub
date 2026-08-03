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
 *   1. Host-based legacy domain rules FIRST (lendertrusthub; insurance is standalone)
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

const LENDER_APEX = 'https://www.lendertrusthub.com';

/** Legacy lender calculator slugs → standalone LTH calculator hub with ?calc= id. */
export const LENDER_CALCULATOR_SLUG_REDIRECTS: Redirect[] = [
  { source: '/calculators/mortgage-payment', destination: `${LENDER_APEX}/calculators?calc=payment`, permanent: true },
  { source: '/calculators/affordability', destination: `${LENDER_APEX}/calculators?calc=affordability`, permanent: true },
  { source: '/calculators/refinance', destination: `${LENDER_APEX}/calculators?calc=refinance`, permanent: true },
  { source: '/calculators/amortization', destination: `${LENDER_APEX}/calculators?calc=amortization`, permanent: true },
  { source: '/calculators/rent-vs-buy', destination: `${LENDER_APEX}/calculators?calc=rent-vs-buy`, permanent: true },
  { source: '/calculators/heloc', destination: `${LENDER_APEX}/calculators?calc=heloc`, permanent: true },
  { source: '/calculators/down-payment', destination: `${LENDER_APEX}/calculators?calc=down-payment`, permanent: true },
  { source: '/calculators/rental', destination: `${LENDER_APEX}/calculators?calc=rental`, permanent: true },
  { source: '/calculators/dti', destination: `${LENDER_APEX}/calculators?calc=dti`, permanent: true },
  { source: '/calculators/closing', destination: `${LENDER_APEX}/calculators?calc=closing`, permanent: true },
  { source: '/calculators/va', destination: `${LENDER_APEX}/calculators?calc=payment`, permanent: true },
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

/**
 * Bare root paths from legacy Lender Trust Hub → standalone apex (no /lender prefix).
 * /compare stays on Move (mover compare tool).
 */
const LENDER_ROOT_REDIRECTS: Redirect[] = [
  { source: '/local-lenders', destination: `${LENDER_APEX}/local-lenders`, permanent: true },
  { source: '/local-lenders/:path*', destination: `${LENDER_APEX}/local-lenders/:path*`, permanent: true },
  { source: '/fdic-insured-banks', destination: `${LENDER_APEX}/fdic-insured-banks`, permanent: true },
  { source: '/fdic-insured-banks/:path*', destination: `${LENDER_APEX}/fdic-insured-banks/:path*`, permanent: true },
  { source: '/auto-loan-companies', destination: `${LENDER_APEX}/auto-loan-companies`, permanent: true },
  { source: '/auto-loan-companies/:path*', destination: `${LENDER_APEX}/auto-loan-companies/:path*`, permanent: true },
  { source: '/lenders', destination: `${LENDER_APEX}/lenders`, permanent: true },
  { source: '/lenders/:path*', destination: `${LENDER_APEX}/lenders/:path*`, permanent: true },
];

/**
 * Monorepo /lender/* → standalone LenderTrustHub (strip prefix).
 * /lender → /  and  /lender/foo → /foo
 */
const LENDER_PREFIX_REDIRECTS: Redirect[] = [
  { source: '/lender', destination: `${LENDER_APEX}/`, permanent: true },
  { source: '/lender/', destination: `${LENDER_APEX}/`, permanent: true },
  { source: '/lender/:path*', destination: `${LENDER_APEX}/:path*`, permanent: true },
];

/** Bare /calculators index → standalone LTH calculator hub. */
const CALCULATOR_INDEX_REDIRECT: Redirect = {
  source: '/calculators',
  destination: `${LENDER_APEX}/calculators`,
  permanent: true,
};

/**
 * Unknown legacy calculator slugs (Vercel edge only).
 * Do NOT add `/calculators/:path*` to next.config — Next.js rewrites destinations
 * in ways that can shadow specific rules. Middleware handles local parity.
 */
const CALCULATOR_VERCEL_CATCHALL: Redirect = {
  source: '/calculators/:path*',
  destination: `${LENDER_APEX}/calculators`,
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

/**
 * Host-based domain rules for the Move Vercel project.
 * LenderTrustHub and InsuranceTrustHub are standalone projects — do NOT 308 their
 * hosts back into movetrusthub.com (that created loops and blocked LTH apex).
 */
export const HUB_DOMAIN_REDIRECTS: Redirect[] = [];

/** Path migration rules must not fire on insurancetrusthub.com (standalone apex). */
const MOVE_HOSTS = ['www.movetrusthub.com', 'movetrusthub.com'] as const;

function scopeToMoveHosts(rules: Redirect[]): Redirect[] {
  return rules.flatMap((rule) =>
    MOVE_HOSTS.map((host) => ({
      ...rule,
      has: [...(rule.has ?? []), { type: 'host' as const, value: host }],
    }))
  );
}

/** Path redirects for Vercel edge (vercel.json) — includes calculator catch-all. */
export function getVercelHubRedirects(): Redirect[] {
  return scopeToMoveHosts([
    ...INSURANCE_CALCULATOR_REDIRECTS,
    ...LENDER_CALCULATOR_SLUG_REDIRECTS,
    ...resourceAliasRedirects(),
    ...INSURANCE_HUB_ALIAS_REDIRECTS,
    ...INSURANCE_ROOT_REDIRECTS,
    ...LENDER_ROOT_REDIRECTS,
    // /lender/* after more specific bare-root rules
    ...LENDER_PREFIX_REDIRECTS,
    CALCULATOR_INDEX_REDIRECT,
    CALCULATOR_VERCEL_CATCHALL,
  ]);
}

/**
 * Path redirects safe for next.config.
 * Calculator + resource-alias rules live in middleware (Next.js collapses
 * `/calculators/:slug` rules into a broken `/calculators/:path*` catch-all).
 * Scoped to Move hosts so insurancetrusthub.com is never rewritten by these rules.
 */
export function getNextConfigHubRedirects(): Redirect[] {
  return scopeToMoveHosts([
    ...INSURANCE_HUB_ALIAS_REDIRECTS,
    ...INSURANCE_ROOT_REDIRECTS,
    ...LENDER_ROOT_REDIRECTS,
    ...LENDER_PREFIX_REDIRECTS,
  ]);
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
    // Lender + Insurance apexes are standalone — never bounce into Move paths.
    if (
      h === 'lendertrusthub.com' ||
      h === 'www.lendertrusthub.com' ||
      h === 'insurancetrusthub.com' ||
      h === 'www.insurancetrusthub.com'
    ) {
      return null;
    }
  }

  if (pathname === '/calculators') {
    return `${LENDER_APEX}/calculators`;
  }

  if (pathname.startsWith('/calculators/')) {
    const slug = pathname.slice('/calculators/'.length).split('/')[0];
    if (INSURANCE_CALCULATOR_SLUGS.has(slug)) {
      return `/insurance/calculators/${slug}`;
    }
    const calcId = LENDER_CALCULATOR_SLUG_MAP[slug];
    if (calcId) {
      return `${LENDER_APEX}/calculators?calc=${calcId}`;
    }
    return `${LENDER_APEX}/calculators`;
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
  if (pathname === '/lender/lender' || pathname.startsWith('/lender/lender/')) {
    const stripped = pathname.replace(/^\/lender\/lender(?=\/|$)/, '') || '/';
    return `${LENDER_APEX}${stripped === '/' ? '/' : stripped}`;
  }

  // Monorepo /lender/* → standalone LTH (strip prefix)
  if (pathname === '/lender' || pathname === '/lender/') {
    return `${LENDER_APEX}/`;
  }
  if (pathname.startsWith('/lender/')) {
    const bare = pathname.slice('/lender'.length) || '/';
    return `${LENDER_APEX}${bare}`;
  }

  if (pathname === '/from-georgia-to-huntsville' || pathname.startsWith('/from-georgia-to-huntsville')) {
    return '/moving-to/alabama/huntsville-al';
  }

  if (pathname.startsWith('/insurance/')) {
    return null;
  }

  for (const root of INSURANCE_BARE_ROOTS) {
    if (pathname === root || pathname.startsWith(`${root}/`)) {
      return `/insurance${pathname}`;
    }
  }

  for (const root of LENDER_BARE_ROOTS) {
    if (pathname === root || pathname.startsWith(`${root}/`)) {
      return `${LENDER_APEX}${pathname}`;
    }
  }

  return null;
}