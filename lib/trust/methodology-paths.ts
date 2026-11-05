/** Client-safe methodology paths — no server-only imports. */

/**
 * Canonical Trust Center / methodology URL (Phase 3).
 * All “how we score / how we vet / reputation” links must point here.
 * Aliases (301): /about/trust-center, /about/trust, /resources/how-we-score-movers
 */
export const METHODOLOGY_PAGE_PATH = '/about/how-we-score-movers';

/** Display name for the consolidated Trust Center destination */
export const TRUST_CENTER_TITLE = 'Move Trust Hub Trust Center';

export const METHODOLOGY_ANCHORS = {
  reputationScore: 'reputation-score',
  reviewAttribution: 'review-attribution',
  dataSources: 'data-sources',
  badges: 'badges',
  vetting: 'how-we-vet',
  independence: 'independence',
  corrections: 'corrections',
  limitations: 'limitations',
} as const;

export type MethodologyReturnContext = {
  /** Internal path only, e.g. `/companies/amerisafe-van-lines` */
  returnPath?: string;
  /** Short label for back button, e.g. company name */
  returnLabel?: string;
};

/**
 * Canonical methodology URL. Return context is not written into the query
 * string: crawlable links stay on the clean path. Back navigation uses the
 * referrer when a visitor arrived from another Move page.
 */
export function methodologyHref(
  anchor?: keyof typeof METHODOLOGY_ANCHORS,
  _opts?: MethodologyReturnContext
): string {
  const hash = anchor ? `#${METHODOLOGY_ANCHORS[anchor]}` : '';
  return `${METHODOLOGY_PAGE_PATH}${hash}`;
}

export function badgeLegendHref(badgeId: string, onProfile = false): string {
  if (onProfile) return `#badge-${badgeId}`;
  return `${methodologyHref('badges')}#badge-${badgeId}`;
}
