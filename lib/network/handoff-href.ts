export type HubLinkId =
  | 'move'
  | 'insurance'
  | 'lender'
  | 'contractor'
  | 'senior'
  | 'investor';

export const SSO_HANDOFF_HUBS = new Set<HubLinkId>([
  'move',
  'insurance',
  'lender',
  'contractor',
]);

const HUB_URL: Record<HubLinkId, string> = {
  move: 'https://www.movetrusthub.com',
  insurance: 'https://www.insurancetrusthub.com',
  lender: 'https://www.lendertrusthub.com',
  contractor: 'https://www.contractortrusthub.com',
  senior: 'https://www.seniortrusthub.com',
  investor: 'https://www.investortrusthub.com',
};

const HUB_HOME: Record<HubLinkId, string> = {
  move: '/my-move',
  insurance: '/my-insurance',
  lender: '/my-lending',
  contractor: '/',
  senior: '/',
  investor: '/',
};

const HOST_TO_HUB: Array<{ fragment: string; id: HubLinkId }> = [
  { fragment: 'movetrusthub.com', id: 'move' },
  { fragment: 'insurancetrusthub.com', id: 'insurance' },
  { fragment: 'lendertrusthub.com', id: 'lender' },
  { fragment: 'contractortrusthub.com', id: 'contractor' },
  { fragment: 'seniortrusthub.com', id: 'senior' },
  { fragment: 'investortrusthub.com', id: 'investor' },
];

/** POST target only. Crawlable anchors must use publicHubUrl, not this path. */
export function networkHandoffStartHref(to: HubLinkId, next?: string): string {
  const path = next?.startsWith('/') ? next : HUB_HOME[to];
  return `/api/auth/network-handoff/start?to=${encodeURIComponent(to)}&next=${encodeURIComponent(path)}`;
}

function legacyMoveHubPath(pathname: string): HubLinkId | null {
  if (pathname === '/lender' || pathname.startsWith('/lender/')) return 'lender';
  if (pathname === '/local-lenders' || pathname.startsWith('/local-lenders/')) return 'lender';
  if (
    (pathname === '/insurance' || pathname.startsWith('/insurance/')) &&
    pathname !== '/insurance/admin' &&
    !pathname.startsWith('/insurance/admin/')
  ) {
    return 'insurance';
  }
  return null;
}

function stripHubPrefix(to: HubLinkId, pathAndQuery: string): string {
  const qIndex = pathAndQuery.indexOf('?');
  const path = qIndex === -1 ? pathAndQuery : pathAndQuery.slice(0, qIndex);
  const query = qIndex === -1 ? '' : pathAndQuery.slice(qIndex);
  let bare = path || '/';
  if (to === 'lender') {
    if (bare === '/lender') bare = '/';
    else if (bare.startsWith('/lender/')) bare = bare.slice('/lender'.length) || '/';
  }
  if (to === 'insurance') {
    const admin = bare === '/insurance/admin' || bare.startsWith('/insurance/admin/');
    if (!admin) {
      if (bare === '/insurance') bare = '/';
      else if (bare.startsWith('/insurance/')) bare = bare.slice('/insurance'.length) || '/';
    }
  }
  if (!bare.startsWith('/')) bare = `/${bare}`;
  return `${bare}${query}`;
}

/** Absolute public hub URL. Never a Move-host /lender, /insurance, or handoff path. */
export function publicHubUrl(to: HubLinkId, next?: string): string {
  const base = HUB_URL[to].replace(/\/$/, '');
  if (!next) return base;
  const withSlash = next.startsWith('/') ? next : `/${next}`;
  const hashIndex = withSlash.indexOf('#');
  const pathAndQuery = hashIndex === -1 ? withSlash : withSlash.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : withSlash.slice(hashIndex);
  const stripped = stripHubPrefix(to, pathAndQuery);
  if (stripped === '/' || stripped === '') return `${base}/${hash}`;
  return `${base}${stripped}${hash}`;
}

export function networkHubPublicUrl(to: HubLinkId): string {
  return publicHubUrl(to);
}

/**
 * Crawlable cross-hub href. Signed-in SSO stays on the click handler
 * (NetworkHandoffLink POST). The href itself is the public hub URL.
 */
export function networkHubHref(to: HubLinkId, _signedIn?: boolean, next?: string): string {
  return publicHubUrl(to, next);
}

export function crossHubTarget(
  href: string,
  currentHub: HubLinkId
): { to: HubLinkId; next: string } | null {
  if (!href) return null;
  try {
    const base =
      typeof window !== 'undefined' ? window.location.origin : HUB_URL[currentHub];
    const u = new URL(href, base);
    if (u.pathname === '/api/auth/network-handoff/start') {
      const to = u.searchParams.get('to') as HubLinkId | null;
      if (!to || !SSO_HANDOFF_HUBS.has(to) || to === currentHub) return null;
      return { to, next: u.searchParams.get('next') || HUB_HOME[to] };
    }
    const host = u.hostname.toLowerCase();
    for (const { fragment, id } of HOST_TO_HUB) {
      if (!host.includes(fragment)) continue;
      if (id === currentHub || !SSO_HANDOFF_HUBS.has(id)) return null;
      return { to: id, next: `${u.pathname}${u.search}` || HUB_HOME[id] };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Leave same-hub links relative. Other hubs become their public absolute URL.
 */
export function rewriteCrossHubHref(
  href: string,
  _signedIn: boolean,
  currentHub: HubLinkId
): string {
  if (!href) return href;
  try {
    const base =
      typeof window !== 'undefined' ? window.location.origin : HUB_URL[currentHub];
    const u = new URL(href, base);
    if (u.pathname === '/api/auth/network-handoff/start') {
      const to = u.searchParams.get('to') as HubLinkId | null;
      if (!to || !SSO_HANDOFF_HUBS.has(to)) return href;
      return publicHubUrl(to, u.searchParams.get('next') || HUB_HOME[to]);
    }
    const legacy = legacyMoveHubPath(u.pathname);
    if (legacy) return publicHubUrl(legacy, `${u.pathname}${u.search}${u.hash}`);
    const host = u.hostname.toLowerCase();
    for (const { fragment, id } of HOST_TO_HUB) {
      if (host.includes(fragment)) {
        if (id === currentHub) {
          return `${u.pathname}${u.search}${u.hash}` || '/';
        }
        if (!SSO_HANDOFF_HUBS.has(id)) return href;
        return publicHubUrl(id, `${u.pathname}${u.search}${u.hash}` || HUB_HOME[id]);
      }
    }
    return href;
  } catch {
    return href;
  }
}
