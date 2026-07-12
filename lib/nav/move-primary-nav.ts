/**
 * @deprecated Display nav uses mega-dropdowns via lib/nav/move-nav-config.ts.
 * Kept for backward-compatible imports in audits and legacy components.
 */
import { MOVE_DIRECT_NAV, MOVE_NAV_AUDIT_PATHS } from '@/lib/nav/move-nav-config';

export const MOVE_PRIMARY_NAV = [
  { href: '/companies', label: 'Find Movers' },
  { href: '/moving-to', label: 'Destinations' },
  ...MOVE_DIRECT_NAV.map((item) => ({ href: item.href, label: item.label })),
  { href: '/resources', label: 'Guides' },
] as const;

export type MovePrimaryNavLink = (typeof MOVE_PRIMARY_NAV)[number];

export { MOVE_NAV_AUDIT_PATHS };