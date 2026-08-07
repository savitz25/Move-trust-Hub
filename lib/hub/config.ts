import type { HubConfig, HubId } from '@/lib/hub/types';
import { hubPath } from '@/lib/hub/paths';
import { MOVE_PRIMARY_NAV } from '@/lib/nav/move-primary-nav';
import { HEADER_TRUST_BADGE } from '@/lib/trust/site-messaging';

/** Bump when replacing Move brand logos to bust immutable CDN/browser cache. */
export const TRUST_HUB_LOGO_VERSION = '20260806e';
/** Bump when replacing public/insurance/brand/* so CDN/browser cache picks up the new mark. */
export const INSURANCE_LOGO_VERSION = '20260728r2';
/** Bump when replacing public/lender/brand/* for /lender section logos. */
export const LENDER_LOGO_VERSION = '20260727';

/**
 * Move Trust Hub logo — designer export
 * “MTH updated transparent logo.png” (brackets + hub + MOVE / TRUST HUB).
 * Transparent PNG for light UI; on-dark variant for navy footer.
 */
export const TRUST_HUB_LOGO = {
  /** Light surfaces (header) */
  src: `/brand/move-trust-hub-logo-header.png?v=${TRUST_HUB_LOGO_VERSION}`,
  headerSrc: `/brand/move-trust-hub-logo-header.png?v=${TRUST_HUB_LOGO_VERSION}`,
  /** Navy / dark surfaces (footer) — navy text lightened for contrast */
  footerSrc: `/brand/move-trust-hub-logo-on-dark.png?v=${TRUST_HUB_LOGO_VERSION}`,
  /** Raster for email + Open Graph */
  pngSrc: `/logo.png?v=${TRUST_HUB_LOGO_VERSION}`,
  alt: 'Move Trust Hub',
  width: 640,
  height: 160,
} as const;

/** InsuranceTrustHub brand mark — never use Move logo on insurance host. */
export const INSURANCE_HUB_LOGO = {
  src: `/insurance/brand/insurance-trust-hub-logo.png?v=${INSURANCE_LOGO_VERSION}`,
  headerSrc: `/insurance/brand/insurance-trust-hub-logo-header.png?v=${INSURANCE_LOGO_VERSION}`,
  footerSrc: `/insurance/brand/insurance-trust-hub-logo-stacked-sm.png?v=${INSURANCE_LOGO_VERSION}`,
  alt: 'InsuranceTrustHub',
  width: 759,
  height: 239,
} as const;

/** LenderTrustHub brand mark — used on /lender/* (not Move logo). */
export const LENDER_HUB_LOGO = {
  src: `/lender/brand/lender-trust-hub-logo.png?v=${LENDER_LOGO_VERSION}`,
  headerSrc: `/lender/brand/lender-trust-hub-logo-nav.png?v=${LENDER_LOGO_VERSION}`,
  footerSrc: `/lender/brand/lender-trust-hub-logo-light.png?v=${LENDER_LOGO_VERSION}`,
  stackedSrc: `/lender/brand/lender-trust-hub-logo-stacked.png?v=${LENDER_LOGO_VERSION}`,
  alt: 'LenderTrustHub',
  width: 714,
  height: 186,
} as const;

/** Absolute logo URL for emails, JSON-LD, and external embeds (PNG for client support). */
export function trustHubLogoUrl(baseUrl = 'https://www.movetrusthub.com'): string {
  const path = TRUST_HUB_LOGO.pngSrc.startsWith('/')
    ? TRUST_HUB_LOGO.pngSrc
    : `/${TRUST_HUB_LOGO.pngSrc}`;
  return `${baseUrl.replace(/\/$/, '')}${path}`;
}

export function insuranceHubLogoUrl(baseUrl = 'https://www.insurancetrusthub.com'): string {
  return `${baseUrl}/insurance/brand/insurance-trust-hub-logo.png?v=${INSURANCE_LOGO_VERSION}`;
}

export function lenderHubLogoUrl(baseUrl = 'https://www.lendertrusthub.com'): string {
  return `${baseUrl}/lender/brand/lender-trust-hub-logo.png?v=${LENDER_LOGO_VERSION}`;
}

/** Five high-intent items — detailed links live in footer and guide pages. */
const MOVE_NAV = [...MOVE_PRIMARY_NAV];

export const HUBS: Record<HubId, HubConfig> = {
  move: {
    id: 'move',
    basePath: '',
    siteName: 'Move Trust Hub',
    shortName: 'Move',
    tagline: 'Moving research only — FMCSA movers, verify, compare.',
    logoSrc: TRUST_HUB_LOGO.footerSrc,
    headerLogoSrc: TRUST_HUB_LOGO.headerSrc,
    logoAlt: TRUST_HUB_LOGO.alt,
    accentClass: 'text-primary',
    homeTitle: 'Compare FMCSA-Licensed Movers (2026) | Move Trust Hub',
    homeDescription:
      'Moving research only: compare FMCSA-licensed interstate movers by reviews, pricing, and safety data. Free calculator, county guides, and independent research — no lead fees. Not a multi-vertical directory.',
    metadataTitleTemplate: '%s | Move Trust Hub',
    applicationName: 'Move Trust Hub',
    category: 'moving services',
    navLinks: [...MOVE_NAV],
    // Four-column redesign: Directory | Tools & Trust | Destinations | Network & Legal (legal in footer chrome)
    footerColumns: [
      {
        title: 'DIRECTORY',
        links: [
          { href: '/companies', label: 'Find Movers' },
          { href: '/local-movers', label: 'Local Movers by State' },
          { href: '/auto-transport', label: 'Auto Transport' },
          { href: '/compare', label: 'Compare Movers' },
          { href: '/my-move', label: 'My Move' },
        ],
      },
      {
        title: 'TOOLS & TRUST',
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
        title: 'DESTINATIONS',
        links: [
          { href: '/moving-to', label: 'All Destinations' },
          { href: '/resources/routes', label: 'Route Guides' },
          { href: '/moving-to/florida', label: 'Florida' },
          { href: '/moving-to/texas', label: 'Texas' },
          { href: '/moving-to/south-carolina', label: 'South Carolina' },
        ],
      },
    ],
    legalLinks: { privacy: '/privacy-policy', terms: '/terms-of-service' },
    trustBadge: HEADER_TRUST_BADGE,
    verifyAuthority: { label: 'FMCSA', href: 'https://www.fmcsa.dot.gov/' },
  },
  lender: {
    id: 'lender',
    /** Historical monorepo prefix; public links use LENDER_SITE_URL via hubPath(). */
    basePath: '/lender',
    siteName: 'Lender Trust Hub',
    shortName: 'Lender',
    tagline: 'NMLS-verified mortgage lenders and county-level insights.',
    // Full-color wordmark for light chrome (HubFooter is bg-muted/20)
    logoSrc: LENDER_HUB_LOGO.src,
    headerLogoSrc: LENDER_HUB_LOGO.headerSrc,
    logoAlt: LENDER_HUB_LOGO.alt,
    accentClass: 'text-[#3B82F6]',
    homeTitle: 'Mortgage Lenders Directory (2026) | LenderTrustHub',
    homeDescription:
      'Compare NMLS-verified mortgage lenders by county. FDIC bank directory, free calculators, and zero paid placements. Independent financial directory.',
    metadataTitleTemplate: '%s | Lender Trust Hub',
    applicationName: 'Lender Trust Hub',
    category: 'financial services',
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
    basePath: '',
    siteName: 'InsuranceTrustHub',
    shortName: 'Insurance',
    tagline: 'Independent, verified insurance agent directory — no paid placements.',
    logoSrc: INSURANCE_HUB_LOGO.footerSrc,
    headerLogoSrc: INSURANCE_HUB_LOGO.headerSrc,
    logoAlt: INSURANCE_HUB_LOGO.alt,
    accentClass: 'text-emerald-600',
    homeTitle: 'Licensed Insurance Agents Directory (2026) | Insurance Trust Hub',
    homeDescription:
      'Independent research directory of state-licensed insurance agencies and agents. Re-check DOI / NAIC records. Educational ACA and Medicare tools. No paid placements. We do not sell policies.',
    metadataTitleTemplate: '%s | InsuranceTrustHub',
    applicationName: 'InsuranceTrustHub',
    category: 'insurance services',
    // Primary header links live in lib/nav/insurance-nav-config.ts (always-visible lg+).
    // These feed footer / legacy HubMobileNav fallbacks — apex-relative via hubPath.
    navLinks: [
      { href: hubPath('insurance', '/directory'), label: 'Directory' },
      { href: hubPath('insurance', '/calculators'), label: 'Calculators' },
      { href: hubPath('insurance', '/resources'), label: 'Guides' },
      { href: hubPath('insurance', '/methodology'), label: 'Methodology' },
      { href: hubPath('insurance', '/about'), label: 'Trust & Transparency' },
      { href: hubPath('insurance', '/my-insurance'), label: 'My Insurance' },
      { href: hubPath('insurance', '/contact'), label: 'Contact' },
    ],
    footerColumns: [
      {
        title: 'DIRECTORY',
        links: [
          { href: hubPath('insurance', '/directory'), label: 'All Agents' },
          { href: hubPath('insurance', '/hubs'), label: 'Health Hubs' },
          { href: hubPath('insurance', '/hubs/browse'), label: 'Browse by State' },
          { href: hubPath('insurance', '/destinations'), label: 'Destinations' },
        ],
      },
      {
        title: 'TOOLS',
        links: [
          {
            href: hubPath('insurance', '/tools/license-verification'),
            label: 'License Verification',
          },
          {
            href: hubPath('insurance', '/calculators/aca-subsidy'),
            label: 'ACA Subsidy Calculator',
          },
          {
            href: hubPath('insurance', '/tools/medicare-plan-finder'),
            label: 'Medicare Research Guide',
          },
          {
            href: hubPath('insurance', '/tools/needs-assessment'),
            label: 'Needs Assessment',
          },
          { href: hubPath('insurance', '/calculators'), label: 'All Calculators' },
        ],
      },
      {
        title: 'GUIDES',
        links: [
          { href: hubPath('insurance', '/resources'), label: 'All Guides' },
          {
            href: hubPath('insurance', '/resources/how-to-verify-insurance-agent-license'),
            label: 'Verify an Agent License',
          },
          {
            href: hubPath('insurance', '/resources/how-to-choose-insurance-agent'),
            label: 'Choose an Insurance Agent',
          },
          {
            href: hubPath('insurance', '/resources/medicare-advantage-vs-medigap'),
            label: 'Medicare Advantage vs Medigap',
          },
          {
            href: hubPath('insurance', '/resources/how-to-choose-health-insurance-plan'),
            label: 'Choose a Health Plan',
          },
          { href: hubPath('insurance', '/methodology'), label: 'Methodology' },
          { href: hubPath('insurance', '/about'), label: 'How We Verify' },
        ],
      },
    ],
    ctaLabel: 'Compare agencies',
    ctaHref: hubPath('insurance', '/directory'),
    legalLinks: {
      privacy: hubPath('insurance', '/privacy'),
      terms: hubPath('insurance', '/terms'),
    },
    trustBadge: 'INDEPENDENT DOI-VERIFIED DIRECTORY',
    verifyAuthority: { label: 'NAIC', href: 'https://www.naic.org/' },
  },
};

export const HUB_ORDER: HubId[] = ['move', 'lender', 'insurance'];

export function getHubConfig(hub: HubId): HubConfig {
  return HUBS[hub];
}