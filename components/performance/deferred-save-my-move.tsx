'use client';

import {
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';
import { Ctx, DEFERRED_FALLBACK, type SaveMyMoveContextValue } from '@/components/save-my-move/save-my-move-context';

/**
 * Routes that need auth/session soon after load (not the anonymous homepage).
 * Homepage must NOT pull Supabase/auth into the first 3–5s critical path.
 */
function needsAuthSoon(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === '/my-move' ||
    pathname.startsWith('/my-move/') ||
    pathname === '/portal' ||
    pathname.startsWith('/portal/')
  );
}

type ProviderComponent = ComponentType<{ onValue: (value: SaveMyMoveContextValue) => void }>;

/**
 * Lazily mounts SaveMyMoveProvider without blanking children.
 *
 * Homepage: wait for real user interaction (or long idle) before loading auth.
 * Auth-heavy routes: still deferred slightly, but not gated on interaction only.
 */
export function DeferredSaveMyMove({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const authRoute = needsAuthSoon(pathname);

  // Anonymous homepage: interaction-only so PSI mobile does not pull supabase early
  const ready = useDeferredLoad(
    authRoute
      ? { idleTimeout: 1500, maxWait: 5000, interactionOnly: false }
      : { idleTimeout: 12_000, maxWait: 45_000, interactionOnly: true }
  );

  const [value, setValue] = useState<SaveMyMoveContextValue>(DEFERRED_FALLBACK);
  const [Provider, setProvider] = useState<ProviderComponent | null>(null);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    void import('@/components/save-my-move/save-my-move-provider')
      .then((m) => {
        if (!cancelled) setProvider(() => m.SaveMyMoveProvider);
      })
      .catch(() => {
        // Children stay mounted; useSaveMyMove falls back to no-op loading state.
      });
    return () => {
      cancelled = true;
    };
  }, [ready]);

  // Keep the context and children at the same positions when deferred runtime
  // arrives. Changing Fragment -> Provider remounted inputs during first keydown.
  return <Ctx.Provider value={value}>
    {Provider ? <Provider onValue={setValue} /> : null}
    {children}
  </Ctx.Provider>;
}
