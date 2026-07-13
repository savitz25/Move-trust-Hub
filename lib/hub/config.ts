import type { HubConfig, HubId } from '@/lib/hub/types';
import { hubPath } from '@/lib/hub/paths';
import { MOVE_PRIMARY_NAV } from '@/lib/nav/move-primary-nav';
import { HEADER_TRUST_BADGE } from '@/lib/trust/site-messaging';

/** Bump when replacing public/logo.png to bust immutable CDN/browser cache. */
export const TRUST_HUB_LOGO_VERSION = '20260713';

/** Canonical header/footer logo — shared across Move, Lender, and Insurance hubs. */
export const TRUST_HUB_LOGO = {
  src: `/logo.png?v=${TRUST_HUB_LOGO_VERSION}`,
  alt: 'Move Trust Hub',
  width: 712,
  height: 192,
} as const;

/** Absolute logo URL for emails, JSON-LD, and external embeds. */
export function trustHubLogoUrl(baseUrl = 'https://www.movetrusthub.com'): string {
  return `${baseUrl}/logo.png?v=${TRUST_HUB_LOGO_VERSION}`;
}

/** Five high-intent items — detailed links live in footer and guide pages. */
const MOVE_NAV = [...MOVE_PRIMARY_NAV];

export const HUBS: Record<HubId, HubConfig> = {
  move: {
    id: 'move',
    basePath: '',
    siteName: 'Move Trust Hub',
    shortName: 'Move',
    tagline: 'Independent directory for trusted interstate movers.',
    logoSrc: TRUST_HUB_LOGO.src,
    headerLogoSrc: TRUST_HUB_LOGO.src,
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
          { href: '/companies', label: 'Find Movers' },
          { href: '/local-movers', label: 'Local Movers by State' },
          { href: '/auto-transport', label: 'Auto Transport' },
          { href: '/compare', label: 'Compare Tool' },
        ],
      },
      {
        title: 'RESOURCES',
        links: [
          { href: '/resources', label: 'Guides' },
          { href: '/moving-calculator', label: 'Calculator' },
          { href: '/my-move', label: 'My Move (optional)' },
          { href: '/verify-dot', label: 'Verify DOT' },
          { href: '/review', label: 'Leave a Review' },
          { href: '/about', label: 'About' },
          { href: '/about/how-we-score-movers', label: 'How We Score' },
          { href: '/contact', label: 'Contact' },
        ],
      },
      {
        title: 'DESTINATIONS',
        links: [
          { href: '/moving-to', label: 'All Destinations' },
          { href: '/resources/routes', label: 'Route Guides' },
          { href: '/moving-to/florida', label: 'Florida' },
          { href: '/moving-to/south-carolina', label: 'South Carolina' },
          { href: '/moving-to/north-carolina', label: 'North Carolina' },
          { href: '/moving-to/texas', label: 'Texas' },
        ],
      },
    ],
    legalLinks: { privacy: '/privacy-policy', terms: '/terms-of-service' },
    trustBadge: HEADER_TRUST_BADGE,
    verifyAuthority: { label: 'FMCSA', href: 'https://www.fmcsa.dot.gov/' },
  },
  lender: {
    id: 'lender',
    basePath: '/lender',
    siteName: 'Lender Trust Hub',
    shortName: 'Lender',
    tagline: 'NMLS-verified mortgage lenders and county-level insights.',
    logoSrc: TRUST_HUB_LOGO.src,
    headerLogoSrc: TRUST_HUB_LOGO.src,
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
    trustBadge: HEADER_TRUST_BADGE,
    verifyAuthority: { label: 'NMLS Consumer Access', href: 'https://www.nmlsconsumeraccess.org/' },
  },
  insurance: {
    id: 'insurance',
    basePath: '/insurance',
    siteName: 'Insurance Trust Hub',
    shortName: 'Insurance',
    tagline: 'DOI-verified agents with health insurance hub coverage.',
    logoSrc: TRUST_HUB_LOGO.src,
    headerLogoSrc: TRUST_HUB_LOGO.src,
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
      { href: hubPath('insurance', '/resources'), label: 'Resources' },
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
          { href: hubPath('insurance', '/resources'), label: 'All Guides' },
          {
            href: hubPath('insurance', '/resources/how-to-choose-health-insurance-plan'),
            label: 'Choose a Health Plan',
          },
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
    trustBadge: HEADER_TRUST_BADGE,
    verifyAuthority: { label: 'NAIC', href: 'https://www.naic.org/' },
  },
};

export const HUB_ORDER: HubId[] = ['move', 'lender', 'insurance'];

export function getHubConfig(hub: HubId): HubConfig {
  return HUBS[hub];
}