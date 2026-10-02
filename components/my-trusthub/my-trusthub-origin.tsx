'use client';

import { createContext, useContext, type ReactNode } from 'react';

/** One account across TrustHub: My TrustHub lives on Ask. Move links to it. */
const MyTrustHubOriginContext = createContext('https://www.asktrusthub.com');

/** Explicit opt-in: Keep in My TrustHub and the one-account presentation. */
export const PARENT_SAVE_ENABLED = process.env.NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED === '1';

export function MyTrustHubOriginProvider({ origin, children }: { origin: string; children: ReactNode }) {
  return <MyTrustHubOriginContext.Provider value={origin}>{children}</MyTrustHubOriginContext.Provider>;
}

export function useMyTrustHubOrigin(): string {
  return useContext(MyTrustHubOriginContext);
}

export function useMyTrustHubHref(path: '/my' | '/my/saved' | '/my/sign-in' = '/my'): string {
  return `${useMyTrustHubOrigin()}${path}`;
}
