/**
 * Move hub navigation — five scannable top-level items with mega-dropdowns.
 * About, Contact, and Reviews live in Guides dropdown + footer (not top bar).
 */

export type NavLinkItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavMegaColumn = {
  title: string;
  links: NavLinkItem[];
};

export const FIND_MOVERS_NAV: NavMegaColumn[] = [
  {
    title: 'Directories',
    links: [
      {
        label: 'All Companies',
        href: '/companies',
        description: 'FMCSA-licensed interstate movers',
      },
      {
        label: 'Local Movers by State',
        href: '/local-movers',
        description: 'County guides in all 50 states',
      },
      {
        label: 'Auto Transport',
        href: '/auto-transport',
        description: 'Licensed car shipping carriers',
      },
      {
        label: 'Compare Tool',
        href: '/compare',
        description: 'Side-by-side up to 4 movers',
      },
      {
        label: 'My Move',
        href: '/my-move',
        description: 'Saved inventories, movers & comparisons',
      },
    ],
  },
];

export const GUIDES_NAV: NavMegaColumn[] = [
  {
    title: 'Essential guides',
    links: [
      {
        label: 'How to Choose a Mover',
        href: '/resources/how-to-choose',
        description: 'Step-by-step interstate research',
      },
      {
        label: '2026 Moving Costs',
        href: '/resources/interstate-moving-costs',
        description: 'Average prices by size & distance',
      },
      {
        label: 'Avoid Scams',
        href: '/resources/scams',
        description: 'Red flags and rogue brokers',
      },
      {
        label: 'Packing Checklist',
        href: '/resources/packing-checklist',
        description: 'Room-by-room prep timeline',
      },
      {
        label: 'How We Score Movers',
        href: '/about/how-we-score-movers',
        description: 'Reputation scores & review policy',
      },
    ],
  },
  {
    title: 'Company & community',
    links: [
      { label: 'All Guides', href: '/resources', description: 'Full resource library' },
      { label: 'Route Guides', href: '/resources/routes', description: 'Popular interstate corridors' },
      { label: 'About', href: '/about', description: 'Mission & trust center' },
      { label: 'Contact', href: '/contact', description: 'Questions & corrections' },
      { label: 'Leave a Review', href: '/review', description: 'Moderated community reviews' },
    ],
  },
];

/** Direct top-bar links (no dropdown). */
export const MOVE_DIRECT_NAV = [
  { label: 'Calculator', href: '/moving-calculator' },
  { label: 'Verify DOT', href: '/verify-dot' },
] as const;

/** Flat list for scripts/audits that expect simple nav links. */
export const MOVE_NAV_AUDIT_PATHS = [
  '/companies',
  '/local-movers',
  '/auto-transport',
  '/compare',
  '/my-move',
  '/moving-to',
  '/moving-calculator',
  '/verify-dot',
  '/resources',
] as const;