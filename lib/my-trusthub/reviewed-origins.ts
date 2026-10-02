/** Reviewed origin pairs for V2-3 composition.
 * These are transport origins, not database connection targets.
 */
export const ASK_PREVIEW = 'https://conumers-trust-hub-git-mth-v2-3-pare-3127df-savitz25-s-projects.vercel.app';
export const MOVE_PREVIEW = 'https://move-trust-hub-git-mth-v2-3-move-cur-0a05f1-savitz25-s-projects.vercel.app';
export const ASK_PRODUCTION = 'https://www.asktrusthub.com';
export const MOVE_PRODUCTION = 'https://www.movetrusthub.com';
export const PARENT_API_PATH = '/api/my-trusthub/profile-save';
export const SOURCE_PATH = PARENT_API_PATH + '/source';
export const GRANT_API_PATH = PARENT_API_PATH + '/current-grant';
export const GRANT_BROWSER_PATH = '/my/profile-save/current-grant';

/** Substrings that must never be selected as an ISOLATED My TrustHub Move source. */
export const FORBIDDEN_MOVE_TARGETS = ['arepfylnilkjmyduhwbz', 'qvvxvbcdmbjzrgvwjatw', 'tzzcogaricohtezsugjr'] as const;

export function containsForbiddenMoveTarget(value: string): boolean {
  return FORBIDDEN_MOVE_TARGETS.some(target => value.includes(target));
}

/**
 * A pair is the one reviewed (parent origin, Move origin, Move source project,
 * Ask assertion project, source backend name, runtime login) tuple the Move
 * runtime may bind to. The isolated pair is the existing preview pair. The
 * production pair is the canonical pair and is admitted only behind
 * MTH_MOVE_PARENT_SAVE_MODE=production with exact pins. No pair is ever
 * derived from a request, a hostname suffix or a Vercel environment alone.
 */
export type MovePair = {
  kind: 'isolated' | 'production';
  parentOrigin: string;
  moveOrigin: string;
  /** Move source database project (Supavisor username suffix). */
  project: string;
  /** Ask project that namespaces service-assertion issuers. */
  assertionProject: string;
  assertionEnvironment: 'isolated' | 'production';
  sourceBackend: string;
  login: string;
};
export const ISOLATED_PAIR: MovePair = { kind: 'isolated', parentOrigin: ASK_PREVIEW, moveOrigin: MOVE_PREVIEW, project: 'zvoijbohtyuhqfuvteoy',
  assertionProject: 'xkkiicsassizmakcvxml', assertionEnvironment: 'isolated', sourceBackend: 'isolated-move-reader', login: 'mth_move_v23_preview' };
export const PRODUCTION_MOVE_PROJECT = 'arepfylnilkjmyduhwbz';
export const PRODUCTION_SOURCE_BACKEND = 'production-move-reader';
export const PRODUCTION_PAIR: MovePair = { kind: 'production', parentOrigin: ASK_PRODUCTION, moveOrigin: MOVE_PRODUCTION, project: PRODUCTION_MOVE_PROJECT,
  assertionProject: 'qvvxvbcdmbjzrgvwjatw', assertionEnvironment: 'production', sourceBackend: PRODUCTION_SOURCE_BACKEND, login: 'mth_move_v23_prod' };

/** Exact pair lookup by origins; anything else is not reviewed. */
export function reviewedPair(parentOrigin: string, moveOrigin: string): MovePair | null {
  if (parentOrigin === ISOLATED_PAIR.parentOrigin && moveOrigin === ISOLATED_PAIR.moveOrigin) return ISOLATED_PAIR;
  if (parentOrigin === PRODUCTION_PAIR.parentOrigin && moveOrigin === PRODUCTION_PAIR.moveOrigin) return PRODUCTION_PAIR;
  return null;
}

/** Explicit production admission. Every pin is exact; a flag alone opens nothing. */
export function productionHandoffEnabled(env: Record<string, string | undefined>): boolean {
  return env.VERCEL_ENV === 'production' && env.MTH_MOVE_PARENT_SAVE_MODE === 'production' &&
    env.MTH_MOVE_PARENT_SAVE_PRODUCTION_APPROVED === 'true' && env.NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED === '1' &&
    env.MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN === MOVE_PRODUCTION && env.MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN === ASK_PRODUCTION &&
    env.MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND === PRODUCTION_SOURCE_BACKEND && env.MTH_MOVE_PARENT_SAVE_FORM_PATH === '/my/profile-save' &&
    env.MTH_MOVE_PARENT_SAVE_PRODUCTION_PROJECT === PRODUCTION_MOVE_PROJECT && env.MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED !== 'true';
}

/** The single pair this deployment may use, or null. Isolated still requires
 * every existing reviewed check downstream; this only names the pair. */
export function deploymentPair(env: Record<string, string | undefined>): MovePair | null {
  if (env.VERCEL_ENV === 'production') return productionHandoffEnabled(env) ? PRODUCTION_PAIR : null;
  return env.MTH_MOVE_PARENT_SAVE_MODE === 'isolated' ? ISOLATED_PAIR : null;
}
