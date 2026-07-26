'use client';

import {
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { useDeferredLoad } from '@/lib/hooks/use-deferred-load';

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

type ProviderComponent = ComponentType<{ children: ReactNode }>;

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

  if (!Provider) return <>{children}</>;
  return <Provider>{children}</Provider>;
}
