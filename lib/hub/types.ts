export type HubId = 'move' | 'lender' | 'insurance';

export type HubNavLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type HubFooterColumn = {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
};

export type HubLegalLinks = {
  privacy: string;
  terms: string;
};

export type HubConfig = {
  id: HubId;
  /** URL prefix — empty string for Move (root) */
  basePath: string;
  siteName: string;
  shortName: string;
  tagline: string;
  logoSrc: string;
  /** Lightweight logo for navbar LCP — footer keeps full logoSrc. */
  headerLogoSrc: string;
  logoAlt: string;
  accentClass: string;
  homeTitle: string;
  homeDescription: string;
  metadataTitleTemplate: string;
  navLinks: HubNavLink[];
  footerColumns: HubFooterColumn[];
  legalLinks: HubLegalLinks;
  ctaLabel?: string;
  ctaHref?: string;
  trustBadge: string;
  verifyAuthority: { label: string; href: string };
};