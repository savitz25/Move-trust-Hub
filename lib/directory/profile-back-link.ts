/** Only allow in-app mover hub return paths (prevents open redirects). */
export function sanitizeCompanyReturnPath(from: string | null | undefined): string | null {
  if (!from) return null;
  try {
    const decoded = decodeURIComponent(from);
    if (decoded.includes('://') || decoded.startsWith('//')) return null;
    if (!decoded.startsWith('/')) return null;

    if (decoded === '/companies' || decoded.startsWith('/companies?')) {
      return decoded;
    }

    const pathOnly = decoded.split(/[?#]/)[0] || '/';

    // Homepage My Move Plan wizard (state restored from sessionStorage)
    if (pathOnly === '/') {
      return decoded;
    }

    if (
      pathOnly === '/local-movers' ||
      pathOnly.startsWith('/local-movers/') ||
      pathOnly === '/moving-to' ||
      pathOnly.startsWith('/moving-to/') ||
      pathOnly === '/verify-dot' ||
      pathOnly.startsWith('/verify-dot/')
    ) {
      return decoded;
    }

    return null;
  } catch {
    return null;
  }
}

export function buildCompanyProfileHref(slug: string, returnPath?: string | null): string {
  const base = `/companies/${slug}`;
  const safeReturn = sanitizeCompanyReturnPath(returnPath ?? null);
  if (!safeReturn) return base;
  const params = new URLSearchParams({ from: safeReturn });
  return `${base}?${params.toString()}`;
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatCountySlugLabel(countySlug: string, stateSlug: string): string {
  const name = slugToTitle(countySlug);
  if (stateSlug === 'louisiana') {
    if (/\sParish$/i.test(name)) return name;
    return `${name} Parish`;
  }
  if (stateSlug === 'district-of-columbia') return name;
  if (/\s(County|Parish|Borough|City)$/i.test(name)) return name;
  return `${name} County`;
}

/** Human-readable back link label for a sanitized return path. */
export function companyProfileBackLabel(returnPath: string): string {
  try {
    const url = new URL(returnPath, 'https://www.movetrusthub.com');
    const pathname = url.pathname;

    const search = url.searchParams.get('search');
    if (pathname === '/companies') {
      return search ? `Back to results for “${search}”` : 'Back to Directory';
    }

    // My Move Plan wizard lives on the homepage
    if (pathname === '/' || pathname === '') {
      return 'Back to My Move Plan';
    }

    if (pathname === '/local-movers') {
      return 'Back to local movers';
    }

    const countyMatch = pathname.match(/^\/local-movers\/([^/]+)\/([^/]+)$/);
    if (countyMatch) {
      const [, stateSlug, countySlug] = countyMatch;
      return `Back to ${formatCountySlugLabel(countySlug, stateSlug)} movers`;
    }

    const stateMatch = pathname.match(/^\/local-movers\/([^/]+)$/);
    if (stateMatch) {
      return `Back to ${slugToTitle(stateMatch[1])} movers`;
    }

    if (pathname.startsWith('/moving-to/')) {
      const segments = pathname.slice('/moving-to/'.length).split('/').filter(Boolean);
      if (segments.length > 0) {
        return `Back to ${slugToTitle(segments[segments.length - 1])}`;
      }
      return 'Back to destinations';
    }

    if (pathname === '/moving-to') {
      return 'Back to destinations';
    }

    if (pathname.startsWith('/verify-dot')) {
      return 'Back to DOT verifier';
    }

    return 'Back';
  } catch {
    return 'Back';
  }
}