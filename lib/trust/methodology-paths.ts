/** Client-safe methodology paths — no server-only imports. */

export const METHODOLOGY_PAGE_PATH = '/about/how-we-score-movers';

export const METHODOLOGY_ANCHORS = {
  reputationScore: 'reputation-score',
  reviewAttribution: 'review-attribution',
  dataSources: 'data-sources',
  badges: 'badges',
  vetting: 'how-we-vet',
} as const;

export type MethodologyReturnContext = {
  /** Internal path only, e.g. `/companies/amerisafe-van-lines` */
  returnPath?: string;
  /** Short label for back button, e.g. company name */
  returnLabel?: string;
};

/**
 * Canonical methodology URL with optional return context for back-navigation.
 * Query params sit before the hash: `/about/how-we-score-movers?from=...#section`
 */
export function methodologyHref(
  anchor?: keyof typeof METHODOLOGY_ANCHORS,
  opts?: MethodologyReturnContext
): string {
  const hash = anchor ? `#${METHODOLOGY_ANCHORS[anchor]}` : '';
  const path = METHODOLOGY_PAGE_PATH;

  if (!opts?.returnPath || !opts.returnPath.startsWith('/') || opts.returnPath.startsWith('//')) {
    return `${path}${hash}`;
  }

  const params = new URLSearchParams();
  params.set('from', opts.returnPath);
  if (opts.returnLabel?.trim()) {
    params.set('fromLabel', opts.returnLabel.trim().slice(0, 80));
  }
  return `${path}?${params.toString()}${hash}`;
}

export function badgeLegendHref(badgeId: string, onProfile = false): string {
  if (onProfile) return `#badge-${badgeId}`;
  return `${methodologyHref('badges')}#badge-${badgeId}`;
}
