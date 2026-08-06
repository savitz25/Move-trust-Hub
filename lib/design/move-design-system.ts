/**
 * Move Trust Hub — Master Design System tokens (2026 redesign).
 * Source of truth for product UI. Brand architecture sheet + neon logo refs:
 * - Ask family mark (brackets + hub)
 * - Move accent: vibrant orange #FF5A1F
 * - Navy ink #0A2540 for research/trust surfaces
 *
 * CSS variables live on [data-hub="move"] in app/globals.css.
 * Dark mode: [data-hub="move"].dark (neon orange treatment).
 */

export const MOVE_BRAND = {
  /** Primary CTA / energy accent */
  orange: '#FF5A1F',
  orangeSoft: '#FF7A4D',
  orangeDeep: '#E04410',
  /** Research ink / navy */
  navy: '#0A2540',
  navySoft: '#1A3654',
  /** Surfaces */
  white: '#FFFFFF',
  canvas: '#FAFBFC',
  muted: '#F1F5F9',
  /** Borders */
  border: '#E2E8F0',
  /** Text */
  ink: '#0F172A',
  inkMuted: '#475569',
  /** Network siblings (architecture sheet) */
  ask: '#1E3A8A',
  lender: '#16A34A',
  insurance: '#0D9488',
} as const;

/** Taglines from brand architecture */
export const MOVE_TAGLINE = 'PLAN SMART. MOVE CONFIDENTLY.';
export const ASK_TAGLINE = 'SOURCES. VERIFIED. YOU DECIDE.';

/**
 * Homepage primary nav labels (redesign brief).
 * Switch Hub lives in AskNetworkBar above the product header.
 */
export const MOVE_HEADER_NAV = [
  { label: 'Find Movers', href: '/companies' },
  { label: 'By State', href: '/local-movers' },
  { label: 'Compare Movers', href: '/compare' },
  { label: 'Verify DOT', href: '/verify-dot' },
] as const;

export const MOVE_HEADER_CTA = {
  label: 'Calculator',
  href: '/moving-calculator',
} as const;

/** Four footer columns (redesign PDF) */
export const MOVE_FOOTER_COLUMNS = [
  {
    title: 'Directory',
    links: [
      { href: '/companies', label: 'Find Movers' },
      { href: '/local-movers', label: 'Local Movers by State' },
      { href: '/auto-transport', label: 'Auto Transport' },
      { href: '/compare', label: 'Compare Movers' },
      { href: '/my-move', label: 'My Move' },
    ],
  },
  {
    title: 'Tools & Trust',
    links: [
      { href: '/moving-calculator', label: 'Moving Calculator' },
      { href: '/verify-dot', label: 'Verify DOT' },
      { href: '/about/how-we-score-movers', label: 'How We Vet Movers' },
      { href: '/resources', label: 'Guides' },
      { href: '/review', label: 'Leave a Review' },
      { href: '/for-movers', label: 'For Moving Companies' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { href: '/moving-to', label: 'All Destinations' },
      { href: '/resources/routes', label: 'Route Guides' },
      { href: '/moving-to/florida', label: 'Florida' },
      { href: '/moving-to/texas', label: 'Texas' },
      { href: '/moving-to/south-carolina', label: 'South Carolina' },
    ],
  },
] as const;

/** Hero feature chips (exact redesign set) */
export const MOVE_HERO_CHIPS = [
  'FMCSA licenses confirmed',
  'County-level mover data',
  'Free volume calculator',
  'Side-by-side comparisons',
] as const;

export const MOVE_HERO_EYEBROW = 'MOVE TRUST HUB  ·  INDEPENDENT FMCSA MOVER RESEARCH';

export const MOVE_HERO_HEADLINE = 'Where are you going?';

export const MOVE_HERO_SUPPORT =
  "Tell us where you're moving from and to. We'll shortlist FMCSA-licensed movers for that corridor, estimate volume, and compare carriers side by side — independent research, not a lead marketplace or paid ranking board.";

export const MOVE_HERO_FORM = {
  stepLabel: 'STEP 1 — ROUTE',
  title: 'Start your free Move Plan',
  cta: 'Start free Move Plan →',
  micro: 'No lead fees · Independent directory · Works with city or ZIP',
  fromLabel: 'FROM',
  toLabel: 'TO',
  fieldPlaceholder: 'City or ZIP',
} as const;

export const MOVE_INDEPENDENCE_LINE =
  'Independent research directory — common ownership with Ask Trust Hub, separated research and listing rules. No paid placements. No lead fees.';

/** Phase 3 — local coverage map */
export const MOVE_MAP_SECTION = {
  eyebrow: 'Local mover coverage map',
  headline: 'Browse local movers by state & county',
  support:
    'Click any state for county guides, mover counts, and FMCSA research tools. Prefer text? Use the directory grid below.',
} as const;
