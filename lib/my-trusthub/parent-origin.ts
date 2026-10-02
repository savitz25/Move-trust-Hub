/**
 * Consumer-facing My TrustHub origin for links rendered by Move.
 *
 * Production links point at the canonical Ask origin. The reviewed isolated
 * preview pair swaps in the exact parent preview origin that the server-only
 * parent-save configuration already pins, so a preview never links a consumer
 * to the production account surface. Values are origins only; no secrets.
 */
export const PRODUCTION_PARENT_ORIGIN = 'https://www.asktrusthub.com';

type Env = Record<string, string | undefined>;

export function myTrustHubParentOrigin(env: Env = process.env): string {
  if (env.MTH_MOVE_PARENT_SAVE_MODE === 'isolated') {
    const origin = env.MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN?.trim();
    if (origin && /^https:\/\/[a-z0-9.-]+$/i.test(origin)) return origin;
  }
  return PRODUCTION_PARENT_ORIGIN;
}
