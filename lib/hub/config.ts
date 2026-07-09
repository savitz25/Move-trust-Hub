import type { HubConfig, HubId } from '@/lib/hub/types';
import { hubPath } from '@/lib/hub/paths';

/** Canonical header/footer logo — shared across Move, Lender, and Insurance hubs. */
export const TRUST_HUB_LOGO = {
  src: '/logo.png',
  alt: 'Move Trust Hub — compare FMCSA-licensed interstate movers',
} as const;

const MOVE_NAV = [
  { href: '/companies', label: 'Movers Directory' },
  { href: '/local-movers', label: 'Local Movers' },
  { href: '/auto-transport', label: 'Auto Transport' },
  { href: '/moving-calculator', label: 'Move Calculator' },
  { href: '/verify-dot', label: 'Verify DOT' },
  { href: '/review', label: 'Reviews' },
  { href: '/compare', label: 'Compare' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const HUBS: Record<HubId, HubConfig> = {
  move: {
    id: 'move',
    basePath: '',
    siteName: 'Move Trust Hub',
    shortName: 'Move',
    tagline: 'Independent directory for trusted interstate movers.',
    logoSrc: TRUST_HUB_LOGO.src,
    logoAlt: TRUST_HUB_LOGO.alt,
    accentClass: 'text-primary',
    homeTitle: 'Compare FMCSA-Licensed Movers (2026) | Independent Moving Directory',
    homeDescription:
      'Research FMCSA-licensed interstate movers by reviews, pricing, and safety ratings. Free calculator, city guides, and county directories — no lead fees.',
    metadataTitleTemplate: '%s | Move Trust Hub',
    navLinks: [...MOVE_NAV],
    footerColumns: [
      {
        title: 'DIRECTORY',
        links: [
          { href: '/companies', label: 'All Companies' },
          { href: '/local-movers', label: 'Local Movers by State' },
          { href: '/compare', label: 'Compare Tool' },
        ],
      },
      {
        title: 'RESOURCES',
        links: [
          { href: '/resources', label: 'All Guides' },
          { href: '/moving-calculator', label: 'Moving Calculator' },
          { href: '/verify-dot', label: 'Verify DOT Number' },
        ],
      },
    ],
    ctaLabel: 'Moving Calculator',
    ctaHref: '/moving-calculator',
    legalLinks: { privacy: '/privacy-policy', terms: '/terms-of-service' },
    trustBadge: 'INDEPENDENT',
    verifyAuthority: { label: 'FMCSA', href: 'https://www.fmcsa.dot.gov/' },
  },
  lender: {
    id: 'lender',
    basePath: '/lender',
    siteName: 'Lender Trust Hub',
    shortName: 'Lender',
    tagline: 'NMLS-verified mortgage lenders and county-level insights.',
    logoSrc: TRUST_HUB_LOGO.src,
    logoAlt: TRUST_HUB_LOGO.alt,
    accentClass: 'text-[#3B82F6]',
    homeTitle: 'Trusted Local Mortgage Lenders (2026) | NMLS-Verified Directory',
    homeDescription:
      'Compare NMLS-verified mortgage lenders and brokers by county. Free mortgage calculators, FDIC bank directory, and zero paid placements.',
    metadataTitleTemplate: '%s | Lender Trust Hub',
    navLinks: [
      { href: hubPath('lender', '/local-lenders'), label: 'Mortgage Lenders' },
      { href: hubPath('lender', '/fdic-insured-banks'), label: 'FDIC Banks' },
      { href: hubPath('lender', '/calculators'), label: 'Calculators' },
      { href: hubPath('lender', '/resources'), label: 'Resources' },
      { href: hubPath('lender', '/about'), label: 'Trust & Transparency' },
      { href: hubPath('lender', '/contact'), label: 'Contact' },
    ],
    footerColumns: [
      {
        title: 'DIRECTORY',
        links: [
          { href: hubPath('lender', '/local-lenders'), label: 'Local Lenders' },
          { href: hubPath('lender', '/fdic-insured-banks'), label: 'FDIC Insured Banks' },
          { href: hubPath('lender', '/calculators'), label: 'Calculators' },
        ],
      },
      {
        title: 'RESOURCES',
        links: [
          { href: hubPath('lender', '/resources'), label: 'All Guides' },
          {
            href: hubPath('lender', '/resources/how-to-choose-mortgage-lender'),
            label: 'Choose a Lender',
          },
          { href: hubPath('lender', '/about'), label: 'How We Verify' },
          { href: hubPath('lender', '/about#nmls'), label: 'NMLS Guide' },
        ],
      },
    ],
    ctaLabel: 'Try Calculators',
    ctaHref: hubPath('lender', '/calculators'),
    legalLinks: {
      privacy: hubPath('lender', '/privacy'),
      terms: hubPath('lender', '/terms'),
    },
    trustBadge: 'NMLS VERIFIED',
    verifyAuthority: { label: 'NMLS Consumer Access', href: 'https://www.nmlsconsumeraccess.org/' },
  },
  insurance: {
    id: 'insurance',
    basePath: '/insurance',
    siteName: 'Insurance Trust Hub',
    shortName: 'Insurance',
    tagline: 'DOI-verified agents with health insurance hub coverage.',
    logoSrc: TRUST_HUB_LOGO.src,
    logoAlt: TRUST_HUB_LOGO.alt,
    accentClass: 'text-emerald-600',
    homeTitle: 'Trusted Local Insurance Agents (2026) | DOI-Verified Directory',
    homeDescription:
      'Compare DOI-verified insurance agents and agencies. Health insurance hubs, ACA and Medicare calculators, and zero paid placements.',
    metadataTitleTemplate: '%s | Insurance Trust Hub',
    navLinks: [
      { href: hubPath('insurance', '/directory'), label: 'Directories' },
      { href: hubPath('insurance', '/hubs'), label: 'Health Hubs' },
      { href: hubPath('insurance', '/hubs/browse'), label: 'State Browser' },
      { href: hubPath('insurance', '/calculators'), label: 'Calculators' },
      { href: hubPath('insurance', '/about'), label: 'Trust & Transparency' },
      { href: hubPath('insurance', '/contact'), label: 'Contact' },
    ],
    footerColumns: [
      {
        title: 'DIRECTORY',
        links: [
          { href: hubPath('insurance', '/directory'), label: 'All Agents' },
          { href: hubPath('insurance', '/hubs'), label: 'Health Hubs' },
          { href: hubPath('insurance', '/destinations'), label: 'Destinations' },
        ],
      },
      {
        title: 'RESOURCES',
        links: [
          { href: hubPath('insurance', '/resources'), label: 'Guides' },
          { href: hubPath('insurance', '/calculators'), label: 'Calculators' },
          { href: hubPath('insurance', '/about'), label: 'How We Verify' },
        ],
      },
    ],
    ctaLabel: 'Find Agents',
    ctaHref: hubPath('insurance', '/hubs/browse'),
    legalLinks: {
      privacy: hubPath('insurance', '/privacy'),
      terms: hubPath('insurance', '/terms'),
    },
    trustBadge: 'INDEPENDENT',
    verifyAuthority: { label: 'NAIC', href: 'https://www.naic.org/' },
  },
};

export const HUB_ORDER: HubId[] = ['move', 'lender', 'insurance'];

export function getHubConfig(hub: HubId): HubConfig {
  return HUBS[hub];
}