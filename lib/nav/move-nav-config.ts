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
        // Canonical label for /companies site-wide (nav, footer, CTAs).
        label: 'Find Movers',
        href: '/companies',
        description: 'FMCSA-licensed interstate movers',
      },
      {
        label: 'Local Movers by State',
        href: '/local-movers',
        description: 'County guides in all 50 states',
      },
      {
        label: 'Ask MoveTrustHub',
        href: '/ask',
        description: 'Structured FMCSA & FDACS research',
      },
      {
        label: 'Florida research',
        href: '/florida',
        description: 'State registrations, authority & HQ',
      },
      {
        label: 'New Jersey research',
        href: '/new-jersey',
        description: 'State authority, Safe Move & interstate evidence',
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
      {
        label: 'Move Reports',
        href: '/my-move/reports',
        description: 'All plans built on the site',
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
      {
        label: 'For Moving Companies',
        href: '/for-movers',
        description: 'Claim profile & portal for carriers',
      },
    ],
  },
];

/**
 * Direct top-bar links (no dropdown).
 * Order: tools first after Find Movers / Destinations for scannable moving IA.
 */
export const MOVE_DIRECT_NAV = [
  { label: 'Ask', href: '/ask' },
  { label: 'Local Movers', href: '/local-movers' },
  { label: 'Calculator', href: '/moving-calculator' },
  { label: 'Quote Check', href: '/tools/move-quote-check' },
  { label: 'Verify DOT', href: '/verify-dot' },
] as const;

/** Flat list for scripts/audits that expect simple nav links. */
export const MOVE_NAV_AUDIT_PATHS = [
  '/ask',
  '/companies',
  '/local-movers',
  '/auto-transport',
  '/compare',
  '/my-move',
  '/my-move/reports',
  '/moving-to',
  '/moving-calculator',
  '/tools/move-quote-check',
  '/verify-dot',
  '/florida',
  '/resources',
] as const;