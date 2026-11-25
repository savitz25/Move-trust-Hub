/**
 * HUB-RETURN for Move. Ask validates return; this helper only attaches it
 * when the current path is a registered Move prefix and the URL is safe to send.
 */
export const MOVE_RETURN_PREFIXES = [
  '/companies',
  '/verify-dot',
  '/moving-calculator',
  '/my-move',
  '/auth/network-handoff',
] as const;

export const MOVE_SIGN_IN_ORIGIN = 'https://www.asktrusthub.com';

export const RETURN_URL_MAX_LENGTH = 512;

export const MOVE_INVITE_ONLY_TITLE = 'My TrustHub accounts are invitation-only.';

export const MOVE_SIGNED_OUT_SAVE_COPY =
  'Saved on this device. My TrustHub accounts are invitation-only for now.';

function signInBase(origin: string): string {
  return `${origin}/my/sign-in?next=/my`;
}

function matchesPrefix(pathname: string): boolean {
  return MOVE_RETURN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

const DOT_SEGMENT = /^(\.|%2e){1,2}$/i;

function rawPath(currentUrl: string, url: URL): string {
  const rest = currentUrl.slice(url.origin.length);
  const cut = rest.search(/[?#]/);
  return cut === -1 ? rest : rest.slice(0, cut);
}

function hasBackslash(value: string): boolean {
  return value.includes('\\') || /%5c/i.test(value);
}

function badSegment(path: string): boolean {
  return path.split('/').some(
    (segment) => segment === '.' || segment === '..' || DOT_SEGMENT.test(segment)
  );
}

function fullyDecode(path: string): { value: string; stillEncoded: boolean } {
  let current = path;
  for (let round = 0; round < 3; round += 1) {
    if (!/%[0-9a-fA-F]{2}/.test(current)) return { value: current, stillEncoded: false };
    let next: string;
    try {
      next = decodeURIComponent(current);
    } catch {
      return { value: current, stillEncoded: true };
    }
    if (next === current) return { value: current, stillEncoded: false };
    current = next;
  }
  if (!/%[0-9a-fA-F]{2}/.test(current)) return { value: current, stillEncoded: false };
  try {
    return { value: current, stillEncoded: decodeURIComponent(current) !== current };
  } catch {
    return { value: current, stillEncoded: true };
  }
}

function hostilePath(path: string): boolean {
  if (hasBackslash(path) || path.includes('//') || badSegment(path)) return true;
  const decoded = fullyDecode(path);
  if (decoded.stillEncoded) return true;
  return (
    hasBackslash(decoded.value) ||
    decoded.value.includes('//') ||
    decoded.value.includes('..') ||
    badSegment(decoded.value)
  );
}

function hostile(currentUrl: string, url: URL): boolean {
  if (url.username || url.password) return true;
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return true;
  const rest = currentUrl.slice(url.origin.length);
  if (/[\u0000-\u001F\u007F\\]/.test(currentUrl)) return true;
  if (rest.includes('..') || rest.includes('//')) return true;
  if (/%2e%2e|%2f%2f/i.test(rest)) return true;
  return hostilePath(rawPath(currentUrl, url)) || hostilePath(url.pathname);
}

/** Sign-in href. `return` is omitted outside the Move prefixes, or when the URL is hostile or longer than 512 characters. */
export function moveTrustHubSignInHref(
  currentUrl: string | null | undefined,
  signInOrigin: string = MOVE_SIGN_IN_ORIGIN
): string {
  const base = signInBase(signInOrigin);
  if (!currentUrl || currentUrl.length > RETURN_URL_MAX_LENGTH) return base;
  let url: URL;
  try {
    url = new URL(currentUrl);
  } catch {
    return base;
  }
  if (hostile(currentUrl, url) || !matchesPrefix(url.pathname)) return base;
  return `${base}&return=${encodeURIComponent(currentUrl)}`;
}
