/** Canonical Move hub primary navigation — max five high-intent items. */
export const MOVE_PRIMARY_NAV = [
  { href: '/companies', label: 'Find Movers' },
  { href: '/moving-calculator', label: 'Calculator' },
  { href: '/verify-dot', label: 'Verify DOT' },
  { href: '/resources', label: 'Guides' },
  { href: '/compare', label: 'Compare' },
] as const;

export type MovePrimaryNavLink = (typeof MOVE_PRIMARY_NAV)[number];