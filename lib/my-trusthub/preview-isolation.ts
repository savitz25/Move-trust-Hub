/** Build-scoped fence for the isolated V2-3 preview. Production activation is
 * independently denied server-side. This does not repoint general Move data. */
export function legacyClientDisabled(): boolean {
  return process.env.NEXT_PUBLIC_MOVE_V23_LOCAL_ONLY === '1';
}
export function previewRequestAllowed(method: string, pathname: string): boolean {
  if (!legacyClientDisabled()) return true;
  if (pathname === '/api/my-trusthub/profile-save' || pathname === '/api/my-trusthub/profile-save/source') return method === 'POST';
  if (pathname.startsWith('/api/')) return pathname === '/api/compare/companies' && method === 'GET';
  // No legacy login/callback can exchange a code or acquire a production session.
  if (/^\/(auth|login|signup|sign-in|sign-up|admin|api\/auth)(\/|$)/.test(pathname)) return false;
  return method === 'GET' || method === 'HEAD';
}
export const previewReadOnlyFetch: typeof fetch = async (input, init) => {
  if (legacyClientDisabled()) {
    const url = new URL(input instanceof Request ? input.url : String(input));
    const method = init?.method ?? (input instanceof Request ? input.method : 'GET');
    if (!['GET','HEAD'].includes(method.toUpperCase()) || !url.pathname.startsWith('/rest/v1/') || url.pathname.startsWith('/rest/v1/rpc/')) {
      throw new Error('Legacy write or Auth unavailable in isolated preview');
    }
  }
  return fetch(input, init);
};
