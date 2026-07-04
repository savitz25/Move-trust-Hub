/**
 * Canonical internal link resolution for the Trust Hub subdirectory architecture.
 * Used by fix-all-hub-links.ts and audit tooling.
 */

export const INSURANCE_ROUTE_ROOTS = [
  '/directory',
  '/hubs',
  '/providers',
  '/tools',
  '/destinations',
] as const;

export const LENDER_ROUTE_ROOTS = [
  '/local-lenders',
  '/fdic-insured-banks',
  '/auto-loan-companies',
  '/lenders',
  '/credit-repair',
  '/mca-companies',
] as const;

/** Paths that must stay at the Move hub root — never prefix. */
export const MOVE_PRESERVE_ROOTS = [
  '/companies',
  '/local-movers',
  '/moving-calculator',
  '/moving-to',
  '/verify-dot',
  '/review',
  '/auto-transport',
  '/compare',
  '/sitemap',
  '/api',
  '/admin',
  '/privacy-policy',
  '/terms-of-service',
] as const;

/** Move marketing resources live at /resources/* (not /insurance/resources). */
export const MOVE_RESOURCE_SLUGS = new Set([
  'move-size-weight',
  'interstate-moving-costs',
  'best-time-to-move',
  'how-to-choose',
  'packing-checklist',
  'checklist',
  'carrier-vs-broker',
  'fmcsa',
  'scams',
  'routes',
]);

export const INSURANCE_CALCULATOR_SLUGS = new Set([
  'premium-estimator',
  'medicare-gap',
  'aca-subsidy',
]);

export const LENDER_CALCULATOR_SLUG_MAP: Record<string, string> = {
  'mortgage-payment': 'payment',
  payment: 'payment',
  piti: 'payment',
  affordability: 'affordability',
  refinance: 'refinance',
  va: 'payment',
  amortization: 'amortization',
  'rent-vs-buy': 'rent-vs-buy',
  heloc: 'heloc',
  'down-payment': 'down-payment',
  rental: 'rental',
  dti: 'dti',
  closing: 'closing',
  compare: 'compare',
};

export type HubLinkContext = 'insurance' | 'lender' | 'move' | 'shared';

export function inferHubContext(filePath: string): HubLinkContext {
  const normalized = filePath.replace(/\\/g, '/');
  if (normalized.includes('/app/insurance/') || normalized.includes('/components/insurance/') || normalized.includes('/lib/insurance/')) {
    return 'insurance';
  }
  if (normalized.includes('/app/lender/') || normalized.includes('/components/lender/') || normalized.includes('/lib/lender/')) {
    return 'lender';
  }
  if (normalized.includes('/components/hub/') || normalized.includes('/lib/hub/')) {
    return 'shared';
  }
  return 'move';
}

function matchesRoot(path: string, root: string): boolean {
  return path === root || path.startsWith(`${root}/`) || path.startsWith(`${root}?`) || path.startsWith(`${root}#`);
}

function isAlreadyPrefixed(path: string): boolean {
  return (
    path.startsWith('/insurance') ||
    path.startsWith('/lender') ||
    path.startsWith('//') ||
    path.startsWith('/http')
  );
}

function resolveCalculatorPath(path: string): string | null {
  const bare = path.replace(/^\/lender/, '');
  const match = bare.match(/^\/calculators\/([^/?#]+)/);
  if (!match) return null;

  const slug = match[1];
  if (INSURANCE_CALCULATOR_SLUGS.has(slug)) {
    return `/insurance/calculators/${slug}${path.includes('?') ? path.slice(path.indexOf('?')) : ''}`;
  }

  const calcId = LENDER_CALCULATOR_SLUG_MAP[slug] ?? slug;
  return `/lender/calculators?calc=${calcId}`;
}

function resolveResourcesPath(path: string, context: HubLinkContext): string {
  const slugMatch = path.match(/^\/resources\/([^/?#]+)/);
  if (!slugMatch) {
    return context === 'insurance' ? '/insurance/resources' : path;
  }
  const slug = slugMatch[1];
  if (context === 'insurance' || !MOVE_RESOURCE_SLUGS.has(slug)) {
    return `/insurance${path}`;
  }
  return path;
}

function resolveAmbiguousHubPath(path: string, context: HubLinkContext): string {
  if (context === 'insurance') {
    if (path === '/about' || path === '/contact' || path === '/privacy' || path === '/terms') {
      return `/insurance${path}`;
    }
  }
  if (context === 'lender') {
    if (path === '/about' || path === '/contact' || path === '/privacy' || path === '/terms') {
      return `/lender${path}`;
    }
    if (path === '/compare') {
      return '/lender/compare';
    }
  }
  return path;
}

/**
 * Resolve a root-relative path to its canonical hub-prefixed URL.
 * Returns the original path when no rule applies.
 */
export function resolveCanonicalHubPath(path: string, context: HubLinkContext = 'move'): string {
  if (!path.startsWith('/')) {
    return path;
  }

  // Fix /calculators/{slug} and /lender/calculators/{slug} before the prefixed early-return.
  const calcResolved = resolveCalculatorPath(path);
  if (calcResolved) return calcResolved;

  if (isAlreadyPrefixed(path)) {
    return path;
  }

  if (path === '/calculators' || path.startsWith('/calculators?')) {
    return context === 'insurance' ? '/insurance/calculators' : '/lender/calculators';
  }

  for (const root of MOVE_PRESERVE_ROOTS) {
    if (matchesRoot(path, root)) return path;
  }

  if (matchesRoot(path, '/resources')) {
    return resolveResourcesPath(path, context);
  }

  for (const root of INSURANCE_ROUTE_ROOTS) {
    if (matchesRoot(path, root)) return `/insurance${path}`;
  }

  for (const root of LENDER_ROUTE_ROOTS) {
    if (matchesRoot(path, root)) return `/lender${path}`;
  }

  return resolveAmbiguousHubPath(path, context);
}

/** True when path still needs migration (bare hub path detected). */
export function isMigratableHubPath(path: string, context: HubLinkContext = 'move'): boolean {
  if (!path.startsWith('/') || isAlreadyPrefixed(path)) return false;
  return resolveCanonicalHubPath(path, context) !== path;
}