/**
 * Canonical company website URLs for storage, display, and scraping.
 * Google Places often returns city landing pages with long UTM query strings
 * that break scrapers and look ugly on profiles.
 */

const TRACKING_PARAM_KEYS = new Set([
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
  'dclid',
  'gclsrc',
  'mc_cid',
  'mc_eid',
  'igshid',
  'mkt_tok',
  'yclid',
  '_ga',
  '_gl',
  'ref',
  'referrer',
  'source',
  'campaign',
  'medium',
  'content',
  'term',
]);

export type NormalizeWebsiteUrlOptions = {
  /**
   * Always collapse to protocol + host (e.g. Google Places business website).
   * Path, query, and hash are dropped after validation.
   */
  preferOrigin?: boolean;
  /** Max length of returned URL (default 300). */
  maxLength?: number;
};

function hasTrackingSearchParams(url: URL): boolean {
  for (const key of url.searchParams.keys()) {
    const k = key.toLowerCase();
    if (k.startsWith('utm_')) return true;
    if (TRACKING_PARAM_KEYS.has(k)) return true;
  }
  return false;
}

/** Single-segment paths that are almost always marketing / CMS landings, not the site root. */
function isShallowMarketingPath(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length !== 1) return false;
  const s = segments[0]!.toLowerCase();
  if (['home', 'index', 'index.html', 'index.php', 'default.aspx', 'local', 'locations'].includes(s)) {
    return true;
  }
  // City / metro landings: /los-angeles, /orange-county, /sf-bay-area
  // Keep real site sections: /about, /contact, /services, …
  const keep = new Set([
    'about',
    'about-us',
    'contact',
    'contact-us',
    'services',
    'service',
    'service-areas',
    'areas-we-serve',
    'coverage',
    'locations',
    'moving',
    'movers',
    'blog',
    'faq',
    'quote',
    'get-quote',
    'request-quote',
  ]);
  if (keep.has(s)) return false;
  return /^[a-z][a-z0-9-]{1,48}$/i.test(s);
}

/**
 * Normalize a website URL:
 * - Ensures http(s)
 * - Strips query strings, UTM/tracking params, and fragments
 * - Optionally or smartly collapses to origin (clean company homepage)
 *
 * Examples:
 *   https://royalmovingco.com/los-angeles/?utm_source=google&utm_campaign=…
 *   → https://royalmovingco.com
 *
 *   https://example.com/contact-us
 *   → https://example.com/contact-us
 */
export function normalizeCompanyWebsiteUrl(
  raw: string | null | undefined,
  options: NormalizeWebsiteUrlOptions = {}
): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;

  const maxLength = options.maxLength ?? 300;

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProtocol);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

    // Drop credentials and tracking noise first.
    url.username = '';
    url.password = '';

    const hadSearch = Boolean(url.search && url.search.length > 1);
    const hadTracking = hadSearch && hasTrackingSearchParams(url);
    const pathBefore = url.pathname || '/';

    url.search = '';
    url.hash = '';

    const collapseToOrigin =
      options.preferOrigin === true ||
      hadTracking ||
      hadSearch ||
      isShallowMarketingPath(pathBefore);

    if (collapseToOrigin) {
      // Origin only — no trailing slash (matches existing contact cleaners).
      return `${url.protocol}//${url.host}`.slice(0, maxLength);
    }

    let path = pathBefore;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    if (!path || path === '/') {
      return `${url.protocol}//${url.host}`.slice(0, maxLength);
    }

    return `${url.protocol}//${url.host}${path}`.slice(0, maxLength);
  } catch {
    return null;
  }
}

/**
 * Display label without protocol (and without trailing slash).
 * Also strips residual query noise if present.
 */
export function formatWebsiteDisplayLabel(raw: string | null | undefined): string {
  const clean = normalizeCompanyWebsiteUrl(raw) || raw?.trim() || '';
  return clean.replace(/^https?:\/\//i, '').replace(/\/$/, '');
}

/**
 * Href-safe URL for anchors (adds https if missing, then normalizes).
 */
export function normalizeWebsiteHref(raw: string | null | undefined): string {
  return normalizeCompanyWebsiteUrl(raw) || '';
}
