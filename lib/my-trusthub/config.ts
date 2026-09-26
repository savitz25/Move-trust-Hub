/** Ask #185 7184f53706f6ab8b94d6151794a3b54f090a6662, transport v1.
 * Pair changes require a coordinated contract review, not a suffix allowlist.
 * This historical alias is NOT activation approval for the rebuilt branch.
 */
export const ASK_ORIGIN = 'https://conumers-trust-hub-git-mth-v2-3-pare-3127df-savitz25-s-projects.vercel.app';
export const MOVE_ORIGIN = 'https://move-trust-hub-git-mth-v2-3-move-par-71a0b3-savitz25-s-projects.vercel.app';
export const API_PATH = '/api/my-trusthub/profile-save';
export const SOURCE_PATH = API_PATH + '/source';
export const GRANT_API_PATH = API_PATH + '/current-grant';
export const FORM_PATH = '/my/profile-save';
export const GRANT_FORM_PATH = FORM_PATH + '/current-grant';
export const PROFILE = { hub: 'move', nativeId: 'usdot-1002530', profileClass: 'mover' } as const;
export const PROFILE_SLUG = 'hindman-isaacs-moving-storage-inc';
export const opaque = (v: unknown): v is string => typeof v === 'string' && /^[A-Za-z0-9_-]{43}$/.test(v);
export const exactObject = (v: unknown, keys: string[]): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).sort().join() === [...keys].sort().join();
export const exactProfile = (v: unknown): boolean => exactObject(v, ['hub', 'nativeId', 'profileClass']) && v.hub === PROFILE.hub && v.nativeId === PROFILE.nativeId && v.profileClass === PROFILE.profileClass;
export type Env = Record<string, string | undefined>;
export function serverGate(env: Env): boolean {
  return env.VERCEL_ENV === 'preview' && env.MTH_MOVE_PARENT_SAVE_MODE === 'isolated' &&
    env.NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED === '1' && env.NEXT_PUBLIC_MOVE_V23_LOCAL_ONLY === '1' &&
    env.MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED === 'true' &&
    env.MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN === MOVE_ORIGIN && env.MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN === ASK_ORIGIN;
}
