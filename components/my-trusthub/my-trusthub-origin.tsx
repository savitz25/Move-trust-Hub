'use client';

import { createContext, useContext, type ReactNode } from 'react';

/** One account across TrustHub: My TrustHub lives on Ask. Move links to it. */
const MyTrustHubOriginContext = createContext('https://www.asktrusthub.com');

/** Explicit opt-in: Keep in My TrustHub is offered for saved movers. */
export const PARENT_SAVE_ENABLED = process.env.NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED === '1';

/** Canary list. When set, the Keep control is offered only for these exact
 * profile slugs and every other surface keeps its current behaviour. When
 * unset, Keep is offered for every saved mover (the reviewed preview state). */
export const CANARY_SLUGS: readonly string[] = (process.env.NEXT_PUBLIC_MOVE_PARENT_SAVE_CANARY_SLUGS ?? '')
  .split(',').map((slug) => slug.trim()).filter(Boolean);

export function keepAllowedForSlug(slug: string): boolean {
  return PARENT_SAVE_ENABLED && (CANARY_SLUGS.length === 0 || CANARY_SLUGS.includes(slug));
}

/** The one-account presentation (header entry, My Move workspace card, Save
 * copy) follows the full rollout, not a canary. */
export const ONE_ACCOUNT_ENABLED = PARENT_SAVE_ENABLED && CANARY_SLUGS.length === 0;

export function MyTrustHubOriginProvider({ origin, children }: { origin: string; children: ReactNode }) {
  return <MyTrustHubOriginContext.Provider value={origin}>{children}</MyTrustHubOriginContext.Provider>;
}

export function useMyTrustHubOrigin(): string {
  return useContext(MyTrustHubOriginContext);
}

export function useMyTrustHubHref(path: '/my' | '/my/saved' | '/my/sign-in' = '/my'): string {
  return `${useMyTrustHubOrigin()}${path}`;
}
