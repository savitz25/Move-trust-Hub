/**
 * Read the project ref and role baked into a Supabase JWT key.
 * Returns null when the key is not a provable JWT. Never logs the key.
 */
export function readSupabaseKeyClaims(
  key: string | undefined
): { ref: string; role: string | null } | null {
  if (!key || key.startsWith('sb_')) return null;
  const parts = key.split('.');
  if (parts.length !== 3 || !parts[1]) return null;
  try {
    const payload = JSON.parse(decodeBase64Url(parts[1])) as {
      ref?: unknown;
      role?: unknown;
    };
    if (typeof payload.ref !== 'string' || !/^[a-z0-9]{20}$/.test(payload.ref)) return null;
    return {
      ref: payload.ref,
      role: typeof payload.role === 'string' ? payload.role : null,
    };
  } catch {
    return null;
  }
}

function decodeBase64Url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const base64 = padded + '='.repeat((4 - (padded.length % 4)) % 4);
  if (typeof atob === 'function') return atob(base64);
  return Buffer.from(base64, 'base64').toString('utf8');
}
