/**
 * Move Trust Hub primary nav mega menus (redesign 2026).
 * Easy to edit — each item maps to a live route.
 */

import type { NavMegaColumn } from '@/lib/nav/move-nav-config';

export type MoveMegaNavItem = {
  id: string;
  label: string;
  href: string;
  columns: NavMegaColumn[];
  /** Panel width */
  panelWidth?: 'sm' | 'md' | 'lg';
  /** Optional footer CTA inside panel */
  cta?: { label: string; href: string };
  /** Optional short intro under columns */
  note?: string;
};

/** Popular / high-traffic state landings for By State panel */
export const BY_STATE_QUICK_LINKS = [
  { label: 'Florida', href: '/local-movers/florida' },
  { label: 'Texas', href: '/local-movers/texas' },
  { label: 'California', href: '/local-movers/california' },
  { label: 'New York', href: '/local-movers/new-york' },
  { label: 'North Carolina', href: '/local-movers/north-carolina' },
  { label: 'South Carolina', href: '/local-movers/south-carolina' },
  { label: 'Georgia', href: '/local-movers/georgia' },
  { label: 'Arizona', href: '/local-movers/arizona' },
] as const;

export const MOVE_MEGA_NAV: MoveMegaNavItem[] = [
  {
    id: 'find-movers',
    label: 'Find Movers',
    href: '/companies',
    panelWidth: 'md',
    columns: [
      {
        title: 'Directories',
        links: [
          {
            label: 'Mover directory',
            href: '/companies',
            description: 'FMCSA-licensed interstate carriers',
          },
          {
            label: 'Local movers by state',
            href: '/local-movers',
            description: 'County guides across the U.S.',
          },
          {
            label: 'Auto transport',
            href: '/auto-transport',
            description: 'Licensed car shipping research',
          },
        ],
      },
      {
        title: 'Research tools',
        links: [
          {
            label: 'How we vet movers',
            href: '/about/how-we-score-movers',
            description: 'Scores, sources, and review policy',
          },
          {
            label: 'Popular route guides',
            href: '/resources/routes',
            description: 'Corridors and interstate planning',
          },
          {
            label: 'My Move',
            href: '/my-move',
            description: 'Saved plans, shortlists, and reports',
          },
        ],
      },
    ],
    cta: { label: 'Browse mover directory →', href: '/companies' },
  },
  {
    id: 'by-state',
    label: 'By State',
    href: '/local-movers',
    panelWidth: 'lg',
    columns: [
      {
        title: 'Popular states',
        links: BY_STATE_QUICK_LINKS.map((s) => ({
          label: s.label,
          href: s.href,
          description: 'County-level local mover guides',
        })),
      },
      {
        title: 'Coverage',
        links: [
          {
            label: 'Browse all states',
            href: '/local-movers',
            description: 'Full state directory and coverage map',
          },
          {
            label: 'Destinations hub',
            href: '/moving-to',
            description: 'Moving-to guides by metro and state',
          },
          {
            label: 'How county guides work',
            href: '/about/how-we-score-movers',
            description: 'Independent research — not a marketplace',
          },
        ],
      },
    ],
    cta: { label: 'Open local movers map →', href: '/local-movers' },
    note: 'County guides highlight local movers with licensing context for research only.',
  },
  {
    id: 'compare',
    label: 'Compare Movers',
    href: '/compare',
    panelWidth: 'sm',
    columns: [
      {
        title: 'Side-by-side research',
        links: [
          {
            label: 'Start a comparison',
            href: '/compare',
            description: 'Compare up to four carriers on one screen',
          },
          {
            label: 'Licensing & authority',
            href: '/verify-dot',
            description: 'Check USDOT / MC before you shortlist',
          },
          {
            label: 'Reputation & services',
            href: '/about/how-we-score-movers',
            description: 'How ratings and services are presented',
          },
        ],
      },
    ],
    cta: { label: 'Open compare tool →', href: '/compare' },
    note: 'Independent side-by-side research — not a booking marketplace.',
  },
  {
    id: 'verify-dot',
    label: 'Verify DOT',
    href: '/verify-dot',
    panelWidth: 'sm',
    columns: [
      {
        title: 'FMCSA lookup',
        links: [
          {
            label: 'Verify a DOT / MC number',
            href: '/verify-dot',
            description: 'Structured FMCSA SAFER context on this site',
          },
          {
            label: 'How we use FMCSA data',
            href: '/about/how-we-score-movers',
            description: 'Sources, limits, and re-check guidance',
          },
          {
            label: 'Leave a review',
            href: '/review',
            description: 'Moderated community feedback',
          },
        ],
      },
    ],
    cta: { label: 'Verify a DOT number →', href: '/verify-dot' },
    note: 'Always re-confirm authority on official FMCSA / state sources before you book.',
  },
];
