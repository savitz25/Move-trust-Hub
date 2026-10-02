/** Reviewed preview aliases for V2-3 isolated composition.
 * These are transport origins, not database connection targets.
 */
export const ASK_PREVIEW = 'https://conumers-trust-hub-git-mth-v2-3-pare-3127df-savitz25-s-projects.vercel.app';
export const MOVE_PREVIEW = 'https://move-trust-hub-git-mth-v2-3-move-cur-0a05f1-savitz25-s-projects.vercel.app';
export const PARENT_API_PATH = '/api/my-trusthub/profile-save';
export const SOURCE_PATH = PARENT_API_PATH + '/source';
export const GRANT_API_PATH = PARENT_API_PATH + '/current-grant';
export const GRANT_BROWSER_PATH = '/my/profile-save/current-grant';

/** Substrings that must never be selected as a My TrustHub Move source. */
export const FORBIDDEN_MOVE_TARGETS = ['arepfylnilkjmyduhwbz', 'qvvxvbcdmbjzrgvwjatw', 'tzzcogaricohtezsugjr'] as const;

export function containsForbiddenMoveTarget(value: string): boolean {
  return FORBIDDEN_MOVE_TARGETS.some(target => value.includes(target));
}
