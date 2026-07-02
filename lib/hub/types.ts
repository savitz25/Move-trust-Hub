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

export type HubConfig = {
  id: HubId;
  /** URL prefix — empty string for Move (root) */
  basePath: string;
  siteName: string;
  shortName: string;
  tagline: string;
  logoSrc: string;
  logoAlt: string;
  accentClass: string;
  homeTitle: string;
  homeDescription: string;
  metadataTitleTemplate: string;
  navLinks: HubNavLink[];
  footerColumns: HubFooterColumn[];
  ctaLabel?: string;
  ctaHref?: string;
  trustBadge: string;
  verifyAuthority: { label: string; href: string };
};