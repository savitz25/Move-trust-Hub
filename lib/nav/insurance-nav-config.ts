/**
 * Insurance Trust Hub primary navigation.
 * Paths are apex-relative (insurancetrusthub.com); middleware rewrites to /insurance/*.
 * Every href must be a published route — no dead links.
 */

export type InsuranceNavLink = {
  label: string;
  href: string;
  description?: string;
};

/** Primary product links always visible on desktop (md/lg+). */
export const INSURANCE_PRIMARY_NAV: InsuranceNavLink[] = [
  { href: '/directory', label: 'Directory', description: 'Licensed agencies & agents' },
  { href: '/calculators', label: 'Calculators', description: 'ACA, Medicare & premium tools' },
  { href: '/resources', label: 'Guides', description: 'Coverage research articles' },
  { href: '/methodology', label: 'Methodology', description: 'How we verify agencies' },
  {
    href: '/about',
    label: 'Trust & Transparency',
    description: 'Independence and listing standards',
  },
];

/** Directory dropdown — multiple real entry points. */
export const INSURANCE_DIRECTORY_NAV: InsuranceNavLink[] = [
  {
    href: '/directory',
    label: 'All agencies & agents',
    description: 'Search the full licensed directory',
  },
  {
    href: '/hubs',
    label: 'Health insurance hubs',
    description: 'Market hubs by specialty',
  },
  {
    href: '/hubs/browse',
    label: 'Browse by state',
    description: 'State & MSA browser',
  },
  {
    href: '/destinations',
    label: 'Relocation destinations',
    description: 'Coverage notes for popular moves',
  },
  {
    href: '/providers',
    label: 'Featured providers',
    description: 'Highlighted agency profiles',
  },
];

/** Right-cluster account + contact (not buried in hamburger-only). */
export const INSURANCE_ACCOUNT_NAV: InsuranceNavLink[] = [
  {
    href: '/my-insurance',
    label: 'My Insurance',
    description: 'Saved agencies, tools & comparisons',
  },
  { href: '/contact', label: 'Contact', description: 'Corrections and general inquiries' },
];

/** Green CTA — independent directory tone (no lead-gen / free quotes). */
export const INSURANCE_NAV_CTA = {
  href: '/directory',
  label: 'Compare agencies',
} as const;

/** Full ordered list for mobile drawer (primary + account). */
export const INSURANCE_MOBILE_NAV: InsuranceNavLink[] = [
  ...INSURANCE_PRIMARY_NAV,
  ...INSURANCE_ACCOUNT_NAV,
];

/** Flat paths for audits / sitemap checks. */
export const INSURANCE_NAV_AUDIT_PATHS = [
  ...INSURANCE_PRIMARY_NAV.map((l) => l.href),
  ...INSURANCE_DIRECTORY_NAV.map((l) => l.href),
  ...INSURANCE_ACCOUNT_NAV.map((l) => l.href),
  INSURANCE_NAV_CTA.href,
] as const;

/**
 * Normalize Next pathname for active-link matching on apex (/directory)
 * or monorepo prefix (/insurance/directory).
 */
export function insurancePathnameBare(pathname: string | null | undefined): string {
  if (!pathname) return '/';
  let p = pathname.split('?')[0] || '/';
  if (p === '/insurance' || p === '/insurance/') return '/';
  if (p.startsWith('/insurance/')) p = p.slice('/insurance'.length) || '/';
  return p.startsWith('/') ? p : `/${p}`;
}

export function insuranceNavLinkActive(href: string, barePath: string): boolean {
  if (href === '/') return barePath === '/';
  return barePath === href || barePath.startsWith(`${href}/`);
}
